import { rm, mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { Color } from 'three';

import getPixels from 'image-pixels';
import sharp from 'sharp';

const assets = resolve( process.cwd(), 'source/assets' );
const output = resolve( assets, 'packs/projects' );

const images = [];
const colors = [];

export async function getSampledColors( buffer, imageID ) {

	const { data } = await getPixels( buffer );

	const results = [];

	for ( let i = 0; i < data.length / 4; i++ ) {

		const color = new Color();
		const r = data[ i * 4 + 0 ] / 255;
		const g = data[ i * 4 + 1 ] / 255;
		const b = data[ i * 4 + 2 ] / 255;
		color.setRGB( r, g, b );

		const { s, l } = color.getHSL( {} );
		if ( s < .15 || l < .15 ) continue;
		results.push( color );

	}

	const samples = Math.round( 512 * 512 / images.length );
	const count = results.length;
	const step = Math.round( count / samples );

	for ( let i = 0; i < results.length; i += step ) {

		const color = results[ i ];
		const string = `#${ color.getHexString() }|${ imageID }`;
		colors.push( string );

	}

}

export async function getColorList( content ) {

	const { projects } = content;

	const destination = resolve( output, 'images' );
	await rm( destination, { recursive: true, force: true } );
	await mkdir( destination, { recursive: true } );

	await Promise.all( projects.map( async project => {

		const { sections, path } = project;

		await Promise.all( sections
			.filter( section => section.media )
			.filter( section => section.media.tags )
			.map( async section => {

				const { source, tags, caption } = section.media;

				if ( source.match( /mp4/ ) ) {

					const path = resolve( assets, source + '.png' );

					if ( ! existsSync( path ) ) {

						console.log( `No image fallback for: ${ source }` );
						return;

					} else console.log( `Image fallback find for: ${ source }` );

				}

				images.push( { path, tags, source, caption } );

			} ) );

	} ) );

	await Promise.all( images.map( async ( image, index ) => {

		const { source } = image;

		const extension = source.match( /mp4/ ) ? '.png' : '';
		const name = resolve( destination, `${ index }.png` );
		const parameters = { width: 512, fit: 'contain' };

		const path = resolve( assets, source + extension );
		const result = await sharp( path ).resize( parameters );
		await result.toFile( name );

		const buffer = await result.toBuffer();
		await getSampledColors( buffer, index );

	} ) );

	const data = JSON.stringify( { images, colors } );
	await writeFile( resolve( output, 'Colors.json' ), data );

}
