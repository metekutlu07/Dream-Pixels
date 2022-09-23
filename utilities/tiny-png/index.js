const { readdir, stat } = require( 'fs/promises' );
const { join } = require( 'path' );
const tinify = require( 'tinify' );

const source = `${ __dirname }/source`;

tinify.key = 'wzB57x2sZ18pxdZLdZY1r3PqKPxm3Q4D';

async function getFiles( directory ) {

	const children = await readdir( directory );

	for ( const file of children ) {

		if ( file.startsWith( '.' ) ) continue;

		const source = join( directory, file );
		const stats = await stat( source );
		const isDirectory = stats.isDirectory();

		if ( ! isDirectory ) {

			if ( ! source.match( /png|jpeg|jpg/ ) ) continue;

			tinify.fromFile( source ).toFile( source, function ( error ) {

				if ( error instanceof tinify.AccountError ) {

					console.log( 'The error message is: ' + error.message );

				}

			} );


		} else await getFiles( source );

	}

}

getFiles( source );
