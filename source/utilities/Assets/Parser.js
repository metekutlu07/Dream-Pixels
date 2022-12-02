import { Texture, LinearMipMapLinearFilter, LinearFilter } from 'three';
import { GLTFLoader } from '~/vendors/three/GLTFLoader';
import { DRACOLoader } from '~/vendors/three/DRACOLoader';

export default class Parser {

	constructor() {

		Application.events.add( this );

		this.map = [

			{ parser: this.getJSON, extensions: /.(json)/g },
			{ parser: this.getSVG, extensions: /.(svg)/g },
			{ parser: this.getTexture, extensions: /.(jpg|png)/g },
			{ parser: this.getAudioBuffer, extensions: /.(m4a|mp3)/g },
			{ parser: this.getModels, extensions: /.(glb|gltf)/g },

		];

		this.DOMParser = document.createElement( 'div' );
		this.GLTFloader = new GLTFLoader();

		this.DRACOLoader = new DRACOLoader();
		this.DRACOLoader.setDecoderPath( 'public/draco/' );
		this.GLTFloader.setDRACOLoader( this.DRACOLoader );

	}

	async unpack( buffer ) {

		const headers = new DataView( buffer, 0, 4 );
		const length = headers.getUint32( 0, true );
		const offset = 4 + length;
		const data = buffer.slice( 4, offset );
		const fileList = await this.getJSON( data );

		const files = fileList.map( async file => {

			const { position, size, path } = file;
			const type = this.map.find( parser => path.match( parser.extensions ) );
			const slice = buffer.slice( offset + position, offset + position + size );
			file.data = type ? await type.parser( slice ) : slice;

			return file;

		} );

		return Promise.all( files );

	}

	async getURI( buffer ) {

		const blob = new Blob( [ buffer ] );
		return URL.createObjectURL( blob );

	}

	async getJSON( buffer ) {

		const string = await this.getString( buffer );
		return JSON.parse( string );

	}

	async getString( buffer ) {

		if ( typeof buffer !== 'string' ) {

			const bytes = new Uint8Array( buffer );
			return new TextDecoder().decode( bytes );

		} else return string;

	}

	async getAudioBuffer( buffer ) {

		return Application.audio.getDecodedBuffer( buffer );

	}

	async getImage( buffer ) {

		const image = new Image();
		image.src = await this.getURI( buffer );
		await image.decode().catch( error => console.log( error ) );

		return image;

	}

	async getSVG( buffer ) {

		const onComplete = ( string ) => {

			this.DOMParser.innerHTML = string;
			return this.DOMParser.querySelector( 'svg' );

		};

		if ( typeof buffer !== 'string' ) {

			const string = await this.getString( buffer );
			return onComplete( string );

		} else onComplete( buffer );

	}

	async getTexture( buffer ) {

		const image = await this.getImage( buffer );
		const texture = new Texture( image );

		Object.assign( texture, {

			minFilter: LinearMipMapLinearFilter,
			magFilter: LinearFilter,
			generateMipmaps: true,
			needsUpdate: true,
			flipY: true

		} );

		return texture;

	}

	async getModels( buffer ) {

		const { scene, animations } = await new Promise( resolve => this.GLTFloader.parse( buffer, '', resolve ) );

		const model = {

			objects: {},
			geometries: {},
			materials: {},
			animations: {}

		};

		scene.traverse( object => {

			const name = object.name.match( 'fill' ) ? 'Fill' :
				object.name.match( 'base' ) ? 'Base' :
					object.name.match( /venice|vencie/g ) ? 'Base' :
						object.name;

			const { geometries, materials, objects } = model;
			const { geometry, material } = object;
			objects[ name ] = object;

			if ( geometry ) geometries[ name ] = geometry;
			if ( material ) materials[ material.name || material.type ] = material;

		} );

		for ( const animation of animations )
			model.animations[ `${ animation.name }` ] = value;

		return model;

	}

}
