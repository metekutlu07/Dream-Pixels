import {

	DataTexture,
	RGBAFormat,
	FloatType,
	ShaderMaterial,
	OrthographicCamera,
	Scene,
	Mesh,
	PlaneGeometry,
	WebGLRenderTarget,
	Vector3,
	CatmullRomCurve3,
	NearestFilter,
	NoBlending

} from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class Simulation {

	constructor() {

		Application.events.add( this );

		this.width = 512;
		this.height = 512;
		this.count = this.width * this.height;

		this.uniforms = {

			parametersA: { value: null },
			parametersB: { value: null },

			initialized: { value: 0 },
			curlSize: { value: 0 },
			deltaTime: { value: 0 }

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
			minFilter: NearestFilter

		};

		this.renderTargets = [

			new WebGLRenderTarget( this.width, this.height, parameters ),
			new WebGLRenderTarget( this.width, this.height, parameters )

		];

		this.curlSize = .1;
		this.deltaTime = 0;
		this.needsUpdate = true;

		this.setCurve();
		this.seed();

	}

	setCurve( vertices = [] ) {

		if ( vertices.length === 0 ) {

			const count = 25;

			for ( let i = 0; i < count; i++ ) {

				const point = new Vector3();
				const t = i / count * Math.PI * 2;

				const x = ( 2 + Math.cos( 3 * t ) ) * Math.cos( 2 * t );
				const y = ( 2 + Math.cos( 3 * t ) ) * Math.sin( 2 * t );
				const z = Math.sin( 3 * t ) * 2.5;

				point
					.set( x, y, z )
					.multiplyScalar( 2.5 );

				vertices.push( point );

			}

		}

		this.curve = new CatmullRomCurve3( vertices, true, 'chordal' );

	}

	setPoints( points ) {

		const { width, height, count } = this;
		const { renderer } = Application;

		const renderTarget = this.renderTargets[ 0 ];
		const data = new Float32Array( count * 4 );
		renderer.readRenderTargetPixels( renderTarget, 0, 0, width, height, data );

		for ( let i = 0; i < count; i++ ) {

			points[ i ]
				.setX( data[ i * 4 + 0 ] )
				.setY( data[ i * 4 + 1 ] )
				.setZ( data[ i * 4 + 2 ] );

		}

		return this;

	}

	seed( duration = 0 ) {

		const { width, height, count } = this;

		const point = new Vector3();
		const dataA = new Float32Array( count * 4 );
		const dataB = new Float32Array( count * 4 );

		for ( let i = 0; i < count; i++ ) {

			const t = i / count;
			const { x, y, z } = this.curve.getPointAt( t, point );
			const w = Math.randFloat( t, t + .25 ) * -duration;

			dataA[ i * 4 + 0 ] = x;
			dataA[ i * 4 + 1 ] = y;
			dataA[ i * 4 + 2 ] = z;
			dataA[ i * 4 + 3 ] = w - .25;

			dataB[ i * 4 + 0 ] = Math.randFloat( .95, 1 ) * 2;
			dataB[ i * 4 + 1 ] = .035 * 100;

		}

		const parametersA = new DataTexture( dataA, width, height, RGBAFormat, FloatType );
		parametersA.needsUpdate = true;

		const parametersB = new DataTexture( dataB, width, height, RGBAFormat, FloatType );
		parametersB.needsUpdate = true;

		this.timeFactor = 1;
		this.duration = duration;

		this.uniforms[ 'deltaTime' ].value = 0;
		this.uniforms[ 'parametersA' ].value = parametersA;
		this.uniforms[ 'parametersB' ].value = parametersB;
		this.renderTargets.forEach( this.render );

	}

	async toggle( isVisible ) {

		const { path, list, particles } = Application.store;
		const isColorRange = (

			path === '/works' &&
			list === 'particles' &&
			particles === 'color-range'

		);

		if ( isVisible ) this.seed( isColorRange ? 5 : 0 );

	}

	onPreFrame() {

		if ( ! this.needsUpdate ) return;

		const deltaTime = ( Application.time.deltaTime || 8 ) * this.timeFactor;
		this.uniforms[ 'deltaTime' ].value = deltaTime * 1e-3;
		this.uniforms[ 'parametersA' ].value = this.renderTargets[ 0 ].texture;
		this.uniforms[ 'curlSize' ].value = this.curlSize;

	}

	render() {

		if ( ! this.needsUpdate ) return ! this.renderTargets[ 0 ];

		this.renderTargets.unshift( this.renderTargets.pop() );

		const writeBuffer = this.renderTargets[ 0 ];

		const { renderer } = Application;
		renderer.setRenderTarget( writeBuffer );
		renderer.render( this.scene, this.camera );
		renderer.setRenderTarget( null );

		return writeBuffer;

	}

}
