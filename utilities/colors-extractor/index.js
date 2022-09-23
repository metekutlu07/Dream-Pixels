const { join } = require( 'path' );
const { readdir, stat, writeFile } = require( 'fs/promises' );

const pixels = require( 'image-pixels' );
// const { extractColors } = require( 'extract-colors' );
// const getColors = require( 'get-image-colors' );

const source = `${ __dirname }/source`;
const output = '../../source/assets/packs/projects/Colors.json';
const results = {};

function sort( colors ) {

	const sorted = [ colors.shift() ];

	while ( colors.length ) {

		const colorA = colors.shift();
		const colorC = { distance: Infinity };

		for ( const [ index, colorB ] of Object.entries( sorted ) ) {

			const average = Math.floor( (

				Math.abs( colorA.red - colorB.red ) +
				Math.abs( colorA.green - colorB.green ) +
				Math.abs( colorA.blue - colorB.blue )

			) / 3 );

			if ( average > colorC.distance ) continue;

			Object.assign( colorC, { distance: average, index } );

		}

		sorted.splice( colorC.index, 0, colorA );

	}

	return sorted.reverse();

}

function componentToHex( value ) {

	const hex = value.toString( 16 );
	return hex.length == 1 ? '0' + hex : hex;

}

function getHexFromRGB( red, green, blue ) {

	return '#' +
		componentToHex( red ) +
		componentToHex( green ) +
		componentToHex( blue );

}

async function traverse( directory ) {

	const children = await readdir( directory );

	for ( const file of children ) {

		if ( file.startsWith( '.' ) ) continue;

		const path = join( directory, file );
		const stats = await stat( path );
		const isDirectory = stats.isDirectory();

		if ( ! isDirectory ) {

			const { data } = await pixels( path );

			// colors = colors.map( color => {

			// 	console.log( color );
			// 	const red = color[ 0 ];
			// 	const green = color[ 1 ];
			// 	const blue = color[ 2 ];
			// 	const hex = getHexFromRGB( red, green, blue );

			// 	return { hex, red, green, blue };

			// } );

			// const colors = await extractColors( path, {

			// 	pixels: 1e12,
			// 	distance: 1e-20,
			// 	saturationImportance: 0,
			// 	splitPower: 16

			// } );

			const colors = [];
			const count = data.length / 4;
			const sample = Math.round( count / 1e4 );

			for ( let i = 0; i < data.length / 4; i++ ) {

				if ( i % sample ) continue;

				const red = data[ i * 4 + 0 ];
				const green = data[ i * 4 + 1 ];
				const blue = data[ i * 4 + 2 ];
				const hex = getHexFromRGB( red, green, blue );

				colors.push( { hex, red, green, blue } );

			}

			const array = sort( colors ).map( color => color.hex );

			console.log( array.length );
			results[ path.replace( source, '' ) ] = array;

		} else await traverse( path );

	}

}

async function initialize() {

	await traverse( source );
	await writeFile( output, JSON.stringify( results ) );

}

initialize();
