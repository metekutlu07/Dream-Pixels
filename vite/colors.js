import { rm, mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Color } from 'three';

import getPixels from 'image-pixels';
import sharp from 'sharp';

const assets = resolve( process.cwd(), 'source/assets' );
const output = resolve( assets, 'packs/projects' );

const images = [];
const colors = [];
const filters = new Set();

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

	const samples = 2000;
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

				const { source, tags } = section.media;
				const image = resolve( assets, source );

				if ( image.match( /mp4/ ) ) return;

				const imageID = images.length;
				const name = resolve( destination, `${ imageID }.png` );
				const parameters = { width: 512, fit: 'contain' };

				images.push( { path, tags } );
				tags.forEach( tag => filters.add( tag ) );

				const result = await sharp( image ).resize( parameters );
				await result.toFile( name );

				const buffer = await result.toBuffer();
				await getSampledColors( buffer, imageID );

			} ) );

	} ) );

	const data = JSON.stringify( { images, colors } );
	await writeFile( resolve( output, 'Colors.json' ), data );

	return Array.from( filters );

}
