import { readdir, stat } from 'fs/promises';
import { resolve, join } from 'path';
import { normalizePath } from 'vite';

import tinify from 'tinify';
tinify.key = 'DB3HnPLflNmDb1rclzC9Sf58DXd81Xbf';

const assets = resolve( process.cwd(), 'source/mete-optimize' );

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

export async function optimize() {

	const files = await getFiles( assets );
	const images = files.filter( file => file.match( /jpeg|jpg|png/g ) );

	await Promise.all( images.map( async path => {

		await tinify
			.fromFile( path )
			.toFile( path, function ( error ) {

				console.log( path );

				if ( error instanceof tinify.AccountError )
					console.log( 'The error message is: ' + error.message );

			} );

	} ) );

}

optimize();
