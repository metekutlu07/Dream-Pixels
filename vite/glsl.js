import { readFileSync } from 'fs';
import { isAbsolute, resolve, dirname } from 'path';

export function getShaderChunk( source, sourceID, alias ) {

	return source.replace( /(?<!\/\/ )#include\s*"\S*/g, result => {

		const regExp = /(?<=(?<!\/\/\s)#include[\s\t]")[^\s"]*/g;
		const match = result.match( regExp ).pop();

		let path = Object
			.entries( alias )
			.reduce( ( source, alias ) => {

				const [ find, replacement ] = alias;
				return source.replace( find, replacement );

			}, `${ match }.glsl` );

		path = isAbsolute( path ) ? path : resolve( dirname( sourceID ), path );
		return readFileSync( path, 'utf8' );

	} );

}
