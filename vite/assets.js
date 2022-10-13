import { resolve, join } from 'path';
import { normalizePath } from 'vite';
import { existsSync } from 'fs';
import {

	stat,
	mkdir,
	readdir,
	readFile,
	writeFile,
	copyFile,
	unlink

} from 'fs/promises';

import tinify from 'tinify';
tinify.key = 'wzB57x2sZ18pxdZLdZY1r3PqKPxm3Q4D';

const build = resolve( process.cwd(), 'build' );
const assets = resolve( process.cwd(), 'source/assets' );
const fonts = {};
const packs = {};

let initialized = null;
let timeout = null;
let server = null;
let files = [];

export function setServer( socket ) { server = socket }
export function getFileList() { return JSON.stringify( { packs, fonts } ) }

export async function parseDirectory() {

	if ( initialized ) return;
	initialized = true;

	await writeFiles( await getFiles( assets ) );

}

export async function onFileChange( file ) {

	if ( ! file.match( assets ) ) return;

	files.push( file );
	clearTimeout( timeout );
	timeout = setTimeout( () => writeFiles( files ) && ( files = [] ), 10 );

}

async function writeFiles( files ) {

	const packs = new Set();
	const copies = files.map( async source => {

		const output = source.replace( assets, build );

		if ( /public|ttf|otf|woff/.test( source ) ) {

			const directory = output.match( /.*(?=\/)/ ).pop();
			await mkdir( directory, { recursive: true } );

			if ( ! existsSync( source ) ) {

				if ( existsSync( output ) )
					await unlink( output );

			} else {

				if ( output.match( /(png|jpeg|jpg)/g ) ) {

					// const source = await tinify.fromFile( source );
					// await source.toFile( output );

					copyFile( source, output );

				} await copyFile( source, output );

			}

		}

		if ( /packs/.test( source ) ) {

			const directory = source.match( /[\S\s]+packs\/\S[^/]+/ ).pop();
			packs.add( directory );

		}

	} );

	await Promise.all( [ ...packs ].map( writePack ) );
	await Promise.all( copies );

	server && server.send( { type: 'full-reload' } );

}

async function getFiles( directory, files = [] ) {

	const children = await readdir( directory );

	for ( const file of children ) {

		if ( file.startsWith( '.' ) ) continue;

		const path = normalizePath( join( directory, file ) );
		const stats = await stat( path );
		const isDirectory = stats.isDirectory();

		isDirectory ? await getFiles( path, files ) : files.push( path );

	}

	return files;

}

async function writePack( directory ) {

	const files = await getFiles( directory );
	const packID = directory.match( /(?<=packs\/)\S[^/]+/ );
	const buffers = [];
	const data = [];

	let position = 0;

	await Promise.all( files.map( async file => {

		const { size } = await stat( file );
		const path = file.split( /.*packs\/\S[^/]+\//g ).pop();
		const fileContent = await readFile( file );

		buffers.push( fileContent );
		data.push( { path, position, size } );
		position += size;

	} ) );

	const manifest = Buffer.from( JSON.stringify( data ) );
	const binary = Buffer.concat( buffers );
	const pack = Buffer.alloc( 4 + manifest.length + binary.length );

	pack.writeUInt32LE( manifest.length, 0 );
	manifest.copy( pack, 4 );
	binary.copy( pack, 4 + manifest.length );

	const { length } = binary;
	packs[ packID ] = { files, length };

	const path = `${ build }/packs`;

	await mkdir( path, { recursive: true } );
	await writeFile( `${ path }/${ packID }.pack`, pack );

	const fileSize = getFileSize( binary.length );
	console.log( `Pack "${ packID }" generated: ${ fileSize }` );

}

function getFileSize( fileSize ) {

	const unit = fileSize >= 1e6 ? 'mb' : 'kb';
	const factor = fileSize >= 1e6 ? 1e-4 : 1e-1;
	fileSize = Math.round( fileSize * factor ) * 1e-2;
	return `${ fileSize.toFixed( 2 ) } ${ unit }`;

}
