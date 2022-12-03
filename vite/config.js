import { resolve } from 'path';
import { readFile, writeFile, rm, mkdir } from 'fs/promises';
import { createServer } from 'vite';
import { buildSync } from 'esbuild';

import { getShaderChunk } from './glsl.js';

import {

	parseDirectory,
	setServer,
	onFileChange,
	getFileList

} from './assets.js';

export const root = resolve( process.cwd(), 'source' );
export const build = resolve( process.cwd(), 'build' );
export const vite = resolve( process.cwd(), 'vite' );

export const extensions = [ '.glsl', '.js', '.json', '.svg', '.yml' ];
export const alias = { 'vite': vite, '~': root };
export const host = '0.0.0.0';
export const port = 3000;

const configuration = {

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
			import { html, glsl } from 'vite/html';
			import { css, rules } from 'vite/css';
		`
	}

];

export const server = await createServer( {

	appType: 'custom',
	resolve: { extensions, alias },
	server: { middlewareMode: true },
	plugins: [ { resolveId, load, transform, enforce: 'pre' } ],

} );

export default async ( { command, mode } ) => {

	const isPreview = command === 'serve' && mode === 'production';
	Object.assign( configuration, { mode } );

	if ( ! isPreview ) {

		await rm( build, { recursive: true, force: true } );
		await mkdir( build, { recursive: true } );

	}

	await parseDirectory();

	return configuration;

};

export async function configureServer( { watcher, ws } ) {

	setServer( ws );

	const events = [ 'add', 'change', 'unlink' ];
	events.forEach( event => watcher.on( event, onFileChange ) );

}

export async function transformIndexHtml( scripts, { originalUrl } ) {

	return await render( scripts, originalUrl );

}

export async function resolveId( sourceID ) {

	if ( sourceID === 'manifest' ) return 'manifest';

}

export async function load( sourceID ) {

	if ( sourceID === 'manifest' ) return `export default ${ getFileList() }`;
	return /svg/.test( sourceID ) ? await readFile( sourceID, 'utf-8' ) : null;

}

export async function transform( source, sourceID ) {

	if ( /\.svg$/.test( sourceID ) ) return `export default \`${ source }\``;

	if ( /\.js$/.test( sourceID ) ) {

		for ( const { exclude, string } of global ) {

			const isExcluded = exclude.find( pattern => sourceID.match( pattern ) );
			if ( ! isExcluded ) source = `${ string }\n${ source }`;

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

export async function buildEnd() {

	server.close();

}

export async function getWorker( content ) {

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

export async function render( scripts, url ) {

	const module = await server.ssrLoadModule( '~/Application' );
	const Application = module.default;

	const { path } = Application.router.parseURL( url || '/' );
	const routes = Application.content.get( 'routes' );

	const views = await Promise.all( routes.map( async path => {

		const template = Application.render( path );

		const directory = `${ build }${ path }`;
		const href = 'href="/index.css"';
		const stylesheet = `<link rel="stylesheet" ${ href }></link>`;

		const tags = scripts + stylesheet;
		const html = template.replace( '<head>', `<head>${ tags }` );

		if ( configuration.mode === 'production' ) {

			await mkdir( directory, { recursive: true } );
			await writeFile( `${ directory }/index.html`, html );

		}

		return { path, html };

	} ) );

	const css = Application.styles.get();
	await writeFile( `${ build }/index.css`, css );

	return views.find( view => view.path === path ).html;

}
