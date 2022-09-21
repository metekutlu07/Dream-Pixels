// It requires FontForge: brew install fontforge
const { readdir, stat, mkdir } = require( 'fs/promises' );
const { join } = require( 'path' );
const { exec } = require( 'child_process' )

const script = `${ __dirname }/font-forge.sh`;
const source = `${ __dirname }/source`;

const includes = /woff/g
const format = 'otf'

async function getFiles( directory ) {

	const children = await readdir( directory );

	for ( const file of children ) {

		if ( file.startsWith( '.' ) ) continue;

		const source = join( directory, file );
		const stats = await stat( source );
		const isDirectory = stats.isDirectory();

		if ( ! isDirectory ) {

			if ( ! file.match( includes ) ) continue;

			const output = directory.replace( 'source', 'output' );
			await mkdir( output, { recursive: true } )

			const destination = `${ output }/${ file }`.replace( includes, format );
			exec( `fontforge -script "${ script }" "${ source }" "${ destination }"` );

		} else await getFiles( source );

	}

}

getFiles( source );
