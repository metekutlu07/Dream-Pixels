import {

	DataTexture,
	RGBAFormat,
	FloatType,
	NearestFilter,
	ShaderMaterial,
	OrthographicCamera,
	Scene,
	Mesh,
	PlaneGeometry,
	WebGLRenderTarget,
	NoBlending

} from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class Simulation {

	constructor( width, height ) {

		Application.events.add( this );

		this.width = width;
		this.height = height;

		this.uniforms = {

			simulation: { value: null },
			initial: { value: null },

			speed: { value: 1 },
			dieSpeed: { value: 0 },
			radius: { value: 0 },
			curlSize: { value: 0 },
			attraction: { value: 0 },
			time: { value: 0 },

		};

		this.material = new ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			blending: NoBlending,
			depthTest: false,
			depthWrite: false,
			transparent: false

		} );

		this.camera = new OrthographicCamera( -1, 1, 1, -1, 0, 1 );
		this.scene = new Scene();

		this.quad = new Mesh( new PlaneGeometry( 2, 2 ), this.material );
		this.quad.frustumCulled = false;
		this.scene.add( this.quad );

		const parameters = {

			type: FloatType,
			format: RGBAFormat,
			depthWrite: false,
			depthBuffer: false,
			stencilBuffer: false,
			magFilter: NearestFilter,
			minFilter: NearestFilter,

		};

		this.renderTargets = [

			new WebGLRenderTarget( width, height, parameters ),
			new WebGLRenderTarget( width, height, parameters )

		];

		this.timeScale = .2;
		this.speed = .1;
		this.dieSpeed = .001;
		this.curlSize = 10;
		this.attraction = .1;

	}

	onLoad( files ) {

		if ( ! files[ 'projects' ] ) return;

		// const { arraybuffers } = files[ 'projects' ];
		// this.data = new Float32Array( arraybuffers[ 'Particles.buffer' ] );

		const dataTexture = this.getDataTexture( this.width, this.height );
		this.uniforms[ 'simulation' ].value = dataTexture;
		this.uniforms[ 'initial' ].value = dataTexture;

		this.renderTargets.forEach( this.render );

	}

	getPositionArray() {

		const count = this.width * this.height;
		const data = new Float32Array( count * 4 );

		for ( let i = 0; i < count; i++ ) {

			const radius = ( .5 + Math.random() * .5 ) * .1;
			const phi = ( Math.random() - .5 ) * Math.PI;
			const theta = Math.random() * Math.PI * 2;

			data[ i * 4 + 0 ] = radius * Math.cos( theta ) * Math.cos( phi );
			data[ i * 4 + 1 ] = radius * Math.sin( phi );
			data[ i * 4 + 2 ] = radius * Math.sin( theta ) * Math.cos( phi );
			data[ i * 4 + 3 ] = i / count;

		}

		return data;

	}

	getDataTexture( width, height ) {

		const data = this.data || this.getPositionArray();
		const texture = new DataTexture( data, width, height, RGBAFormat, FloatType );

		Object.assign( texture, {

			minFilter: NearestFilter,
			magFilter: NearestFilter,
			generateMipmaps: false,
			needsUpdate: true,
			flipY: false

		} );

		return texture;

	}

	onPreFrame() {

		const deltaTime = Application.time.deltaTime * this.timeScale;
		const deltaRatio = deltaTime / 16.6667;

		this.uniforms[ 'speed' ].value = this.speed * deltaRatio;
		this.uniforms[ 'dieSpeed' ].value = this.dieSpeed * deltaRatio;
		this.uniforms[ 'radius' ].value = this.radius;
		this.uniforms[ 'curlSize' ].value = this.curlSize;
		this.uniforms[ 'attraction' ].value = this.attraction;

		this.uniforms[ 'simulation' ].value = this.renderTargets[ 0 ].texture;
		this.uniforms[ 'time' ].value += deltaTime * 1e-3;

	}

	render( writeBuffer ) {

		this.renderTargets.unshift( this.renderTargets.pop() );
		this.quad.material = this.material;

		writeBuffer = writeBuffer || this.renderTargets[ 0 ];

		const { renderer } = Application;
		renderer.setRenderTarget( writeBuffer );
		renderer.render( this.scene, this.camera );
		renderer.setRenderTarget( null );

		return writeBuffer;

	}

}
