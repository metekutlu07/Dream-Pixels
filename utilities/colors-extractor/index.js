const { join } = require( 'path' );
const { readdir, stat, writeFile } = require( 'fs/promises' );
const { Color } = require( 'three' );

const getPixels = require( 'image-pixels' );

const source = `${ __dirname }/source`;
const output = '../../source/assets/packs/projects/Colors.json';
const images = [];

function getSortedColors( colors ) {

	const sorted = colors.sort( ( colorA, colorB ) => {

		const hslA = colorA.getHSL( {} );
		const hslB = colorB.getHSL( {} );

		return hslA.h - hslB.h;

	} );

	// const sorted = [ colors.shift() ];

	// while ( colors.length ) {

	// 	const colorA = colors.shift();
	// 	const colorC = { distance: Infinity };

	// 	for ( const [ index, colorB ] of Object.entries( sorted ) ) {

	// 		const average = Math.floor( (

	// 			Math.abs( colorA.r - colorB.r ) +
	// 			Math.abs( colorA.g - colorB.g ) +
	// 			Math.abs( colorA.b - colorB.b )

	// 		) * 255 / 3 );

	// 		if ( average > colorC.distance ) continue;

	// 		Object.assign( colorC, { distance: average, index } );

	// 	}

	// 	sorted.splice( colorC.index, 0, colorA );

	// }

	return sorted.reverse().map( color => `#${ color.getHexString() }|${ color.imageID }` );

}

async function getSampledColors( directory, colors = [] ) {

	const children = await readdir( directory );

	for ( const file of children ) {

		if ( file.startsWith( '.' ) ) continue;

		const path = join( directory, file );
		const stats = await stat( path );
		const isDirectory = stats.isDirectory();

		if ( ! isDirectory ) {

			// if ( ! path.match( 'matter' ) ) continue;

			const { data } = await getPixels( path );

			const count = data.length / 4;
			const sample = Math.round( count / ( 1e3 * 3 ) );
			const imageID = images.length;

			for ( let i = 0; i < data.length / 4; i++ ) {

				if ( i % sample ) continue;

				const color = new Color();
				color.imageID = imageID;

				const r = data[ i * 4 + 0 ] / 255;
				const g = data[ i * 4 + 1 ] / 255;
				const b = data[ i * 4 + 2 ] / 255;
				color.setRGB( r, g, b );

				const { s, l } = color.getHSL( {} );
				if ( s < .15 || l < .15 ) continue;

				colors.push( color );

			}

			const image = path.replace( source, '' );
			images.push( image );

			console.log( image );

		} else await getSampledColors( path, colors );

	}

	return colors;

}

async function initialize() {

	const samples = await getSampledColors( source );
	const colors = await getSortedColors( samples );
	const data = { images, colors };

	await writeFile( output, JSON.stringify( data ) );

}

initialize();
