import { resolve } from 'path';
import { readFile, writeFile, rm, mkdir } from 'fs/promises';
import { createServer } from 'vite';
import { buildSync } from 'esbuild';

import { getFormattedString } from './html.js';
import { getShaderChunk } from './glsl.js';

import {

	parseDirectory,
	setServer,
	onFileChange,
	getFileList

} from './assets.js';

const root = resolve( process.cwd(), 'source' );
const build = resolve( process.cwd(), 'build' );
const vite = resolve( process.cwd(), 'vite' );

export default async ( { command, mode } ) => {

	const isPreview = command === 'serve' && mode === 'production';
	const extensions = [ '.glsl', '.js', '.json', '.svg', '.yml' ];
	const alias = { 'vite': vite, '~': root };
	const host = '0.0.0.0';
	const port = 3000;

	if ( ! isPreview ) {

		await rm( build, { recursive: true, force: true } );
		await mkdir( build, { recursive: true } );

	}

	await parseDirectory();

	const configuration = {

		mode,
		root,
		publicDir: build,

		server: { host, port },
		preview: { host, port },
		resolve: { extensions, alias },

		build: {
			assetsDir: '',
			outDir: build,
			emptyOutDir: false,
			polyfillModulePreload: false,
			chunkSizeWarningLimit: 750,
		},

		plugins: [ {

			enforce: 'pre',
			configureServer,
			transformIndexHtml,
			transform,
			resolveId,
			load,
			buildEnd

		} ]

	};

	const global = [

		{
			exclude: [ /Application/g, /vite/g, /node_modules/g ],
			string: 'import Application from \'~/Application\'',
		},
		{
			exclude: [ /Application/g, /vite/g, /node_modules/g ],
			string: 'import anime from \'animejs\'',
		},
		{
			exclude: [ /vite/g, /node_modules/g ],
			string: `
				import { html } from 'vite/html';
				import { css, rules } from 'vite/css';
			`
		}

	];

	const server = await createServer( {

		appType: 'custom',
		resolve: { extensions, alias },
		server: { middlewareMode: true },
		plugins: [ { resolveId, load, transform, enforce: 'pre' } ],

	} );

	async function configureServer( { watcher, ws } ) {

		setServer( ws );

		const events = [ 'add', 'change', 'unlink' ];
		events.forEach( event => watcher.on( event, onFileChange ) );

	}

	async function transformIndexHtml( scripts, { originalUrl } ) {

		return await render( scripts, originalUrl );

	}

	async function resolveId( sourceID ) {

		if ( sourceID === 'manifest' ) return 'manifest';

	}

	async function load( sourceID ) {

		if ( sourceID === 'manifest' ) return `export default ${ getFileList() }`;
		return /svg/.test( sourceID ) ? await readFile( sourceID, 'utf-8' ) : null;

	}

	async function transform( source, sourceID ) {

		if ( /\.svg$/.test( sourceID ) ) {

			const string = getFormattedString( source, mode === 'production' );
			return `export default \`${ string }\``;

		}

		if ( /\.js$/.test( sourceID ) ) {

			for ( const { exclude, string } of global ) {

				const isExcluded = exclude.find( pattern => sourceID.match( pattern ) );
				if ( ! isExcluded ) source = `${ string }\n${ source }`;

			}

			if ( mode !== 'production' ) {

				const define = /\/\/ #ifdef PRODUCTION[\s\S]*?\/\/ #endif/g;
				source = source.replace( define, '' );

			}

			return source;

		}

		if ( /\.glsl$/.test( sourceID ) ) {

			const string = getShaderChunk( source, sourceID, alias );
			return `export default ${ JSON.stringify( string ) }`;

		}

		if ( /\.worker/.test( sourceID ) ) {

			const parameters = { entryPoints: [ sourceID ], bundle: true, write: false };
			const result = buildSync( parameters ).outputFiles[ 0 ];
			return getWorker( Buffer.from( result.text ) );

		}

	}

	async function buildEnd() {

		server.close();

	}

	async function getWorker( content ) {

		const base64 = content.toString( 'base64' );
		const type = '{ type: \'text/javascript;charset=utf-8\' }';

		return `
			const blob = new Blob( [ atob("${ base64 }" ) ], ${ type } );
			export default function Wrapper() {
				const objectURL = ( window.URL || window.webkitURL ).createObjectURL( blob );
				try {
					return new Worker( objectURL );
				} finally {
					( window.URL || window.webkitURL ).revokeObjectURL( objectURL );
				}
			}

		`;

	}

	async function render( scripts, url ) {

		const module = await server.ssrLoadModule( '~/Application' );
		const Application = module.default;

		const { path } = Application.router.parseURL( url || '/' );
		const routes = Application.content.get( 'routes' );

		const views = await Promise.all( routes.map( async path => {

			const template = Application.render( path );

			const directory = `${ build }${ path }`;
			// const href = `href="${ originalUrl === '/' ? '' : originalUrl }/index.css"`;
			const href = 'href="/index.css"';
			const stylesheet = `<link rel="stylesheet" ${ href }></link>`;

			const tags = scripts + stylesheet;
			const html = template.replace( '<head>', `<head>${ tags }` );

			if ( mode === 'production' ) {

				await mkdir( directory, { recursive: true } );
				await writeFile( `${ directory }/index.html`, html );
				// await writeFile( `${ directory }/index.css`, css );

			}

			return { path, html };

		} ) );

		const css = Application.styles.get();
		await writeFile( `${ build }/index.css`, css );

		return views.find( view => view.path === path ).html;

	}

	return configuration;

};
