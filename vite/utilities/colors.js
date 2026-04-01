import { rm, mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { Color } from 'three';

import getPixels from 'image-pixels';
import sharp from 'sharp';
import tinify from 'tinify';

// tinify.key = 'wzB57x2sZ18pxdZLdZY1r3PqKPxm3Q4D';
tinify.key = 'BD8sD0ZXRT6rBfYx0BhKrJ8tx1j1zZ9p';

import { server } from '../config.js';

const optimize = true;
const images = [];
const colors = [];

const assets = resolve( process.cwd(), 'source/assets' );
const module = await server.ssrLoadModule( '~/Application' );
const Application = module.default;
await getColorList( Application.content );

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

	return data.length;

}

export async function getColorList( content ) {

	const { projects } = content;

	const destination = resolve( assets, 'packs/works/Images' );
	await rm( destination, { recursive: true, force: true } );
	await mkdir( destination, { recursive: true } );

	Promise.all( projects.map( project => {

		const { sections, path } = project;

		Promise.all( sections
			.filter( section => section.media )
			.filter( section => section.media.tags )
			.map( section => {

				const {

					source,
					tags,
					caption,
					explain,
					excludeFromSphere

				} = section.media;

				if ( source.match( /mp4/ ) ) {

					const path = resolve( assets, source + '.png' );

					if ( ! existsSync( path ) ) {

						console.log( `No image fallback for: ${ source }` );
						return;

					} else console.log( `Image fallback find for: ${ source }` );

				}

				if ( ! existsSync( resolve( assets, source ) ) ) {

					console.log( `${ source }` );
					return;

				}

				images.push( { path, tags, source, caption, explain, excludeFromSphere } );

			} ) );

	} ) );

	const analytics = { projects: 0, pixels: 0, images: 0 };
	analytics.projects = projects.length;
	analytics.images = images.length;

	await Promise.all( images.map( async ( image, index ) => {

		const { source } = image;

		const extension = source.match( /mp4/ ) ? '.png' : '';
		const name = resolve( destination, `${ index }.png` );
		const parameters = { width: 512, fit: 'contain' };

		const path = resolve( assets, source + extension );
		const result = await sharp( path ).resize( parameters );
		const buffer = await result.toBuffer();

		if ( optimize ) {

			await tinify
				.fromBuffer( buffer )
				.toFile( name, function ( error ) {

					if ( error instanceof tinify.AccountError )
						console.log( 'The error message is: ' + error.message );

				} );

		} else await result.toFile( name );

		analytics.pixels += await getSampledColors( buffer, index );

	} ) );

	console.log( analytics );
	server.close();

	const data = JSON.stringify( { analytics, images, colors } );
	await writeFile( resolve( assets, 'packs/common/Colors.json' ), data );

}
