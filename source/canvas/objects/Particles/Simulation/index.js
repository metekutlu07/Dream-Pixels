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

		this.points = [];
		this.width = 512;
		this.height = 512;
		this.count = this.width * this.height;

		for ( let i = 0; i < this.count; i++ )
			this.points.push( new Vector3() );

		this.uniforms = {

			current: { value: null },
			initial: { value: null },

			reset: { value: 0 },
			initialized: { value: 0 },
			speed: { value: 1 },
			curlSize: { value: 0 },
			attraction: { value: 0 },
			deltaTime: { value: 0 },
			duration: { value: 0 }

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

		this.speed = 1.5;
		this.curlSize = .2;
		this.attraction = .5;
		this.duration = 1.5;

		this.time = 0;
		this.deltaTime = 0;
		this.needsUpdate = true;

		this.setCurve();

	}

	setCurve( vertices = [] ) {

		if ( ! vertices.length ) {

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

		this.curve = new CatmullRomCurve3( vertices, true, 'centripetal' );

	}

	setPoints() {

		const { width, height, count } = this;
		const { renderer } = Application;

		const renderTarget = this.renderTargets[ 0 ];
		const data = new Float32Array( count * 4 );
		renderer.readRenderTargetPixels( renderTarget, 0, 0, width, height, data );

		for ( let i = 0; i < count; i++ ) {

			this.points[ i ]
				.setX( data[ i * 4 + 0 ] )
				.setY( data[ i * 4 + 1 ] )
				.setZ( data[ i * 4 + 2 ] );

			this.points[ i ].progress = i / count;

		}

		return this;

	}

	onStart() {

		const { width, height, count } = this;
		const point = new Vector3();

		const dataA = new Float32Array( count * 4 );
		const dataB = new Float32Array( count * 4 );

		for ( let i = 0; i < count; i++ ) {

			const t = i / count;
			const { x, y, z } = this.curve.getPointAt( t, point );

			dataA[ i * 4 + 0 ] = x;
			dataA[ i * 4 + 1 ] = y;
			dataA[ i * 4 + 2 ] = z;
			dataA[ i * 4 + 3 ] = 0;

			dataB[ i * 4 + 0 ] = t + Math.random() * .1;
			dataB[ i * 4 + 1 ] = Math.randFloat( .5, 2.5 );
			dataB[ i * 4 + 2 ] = Math.randFloat( .5, 1 );

		}

		const textureA = new DataTexture( dataA, width, height, RGBAFormat, FloatType );
		textureA.needsUpdate = true;

		const textureB = new DataTexture( dataB, width, height, RGBAFormat, FloatType );
		textureB.needsUpdate = true;

		this.uniforms[ 'current' ].value = textureA;
		this.uniforms[ 'initial' ].value = textureB;

		this.renderTargets.forEach( this.render );
		this.prerender();

	}

	onPreFrame() {

		if ( ! this.needsUpdate ) return;

		const deltaTime = ( Application.time.deltaTime || 8 ) * 1e-3;
		const ratio = this.time / 16.6667;

		this.deltaTime = deltaTime;
		this.time += deltaTime;

		this.uniforms[ 'current' ].value = this.renderTargets[ 0 ].texture;
		this.uniforms[ 'speed' ].value = this.speed * ratio;
		this.uniforms[ 'curlSize' ].value = this.curlSize;
		this.uniforms[ 'attraction' ].value = this.attraction;
		this.uniforms[ 'deltaTime' ].value = this.deltaTime;
		this.uniforms[ 'duration' ].value = this.duration;

	}

	prerender() {

		this.uniforms[ 'reset' ].value = true;
		this.onPreFrame();
		this.render();

		this.uniforms[ 'reset' ].value = false;
		this.uniforms[ 'initialized' ].value = true;
		this.needsUpdate = false;

		console.log( 'here' );

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
