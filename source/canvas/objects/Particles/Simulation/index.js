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

	constructor( width, height ) {

		Application.events.add( this );

		this.width = width;
		this.height = height;
		this.count = width * height;

		this.uniforms = {

			current: { value: null },
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
			minFilter: NearestFilter

		};

		this.renderTargets = [

			new WebGLRenderTarget( width, height, parameters ),
			new WebGLRenderTarget( width, height, parameters )

		];

		this.timeScale = .2;
		this.speed = .1;
		this.dieSpeed = .001;
		this.curlSize = .1;
		this.attraction = .5;

		this.setCurve();

	}

	setCurve() {

		const center = new Vector3();
		const vertices = Array.from( { length: 10 }, () => {

			const vertex = new Vector3()
				.randomDirection()
				.multiplyScalar( 10 );

			center.add( vertex );
			return vertex;

		} );

		center.divideScalar( vertices.length );
		vertices.forEach( vertex => vertex.sub( center ) );

		this.curve = new CatmullRomCurve3( vertices, true, 'catmullrom', 1 );

	}

	onStart() {

		const { width, height, count } = this;
		const data = new Float32Array( count * 4 );
		const point = new Vector3();

		for ( let i = 0; i < count; i++ ) {

			const t = i / count;
			const { x, y, z } = this.curve.getPointAt( t, point );

			data[ i * 4 + 0 ] = x;
			data[ i * 4 + 1 ] = y;
			data[ i * 4 + 2 ] = z;
			data[ i * 4 + 3 ] = 1;

		}

		this.texture = new DataTexture( data, width, height, RGBAFormat, FloatType );
		this.texture.needsUpdate = true;
		this.uniforms[ 'current' ].value = this.texture;

		this.renderTargets.forEach( this.render );

	}

	setPoints( points ) {

		const { width, height, count } = this;
		const { renderer } = Application;

		const renderTarget = this.renderTargets[ 0 ];
		const data = new Float32Array( count * 4 );
		renderer.readRenderTargetPixels( renderTarget, 0, 0, width, height, data );

		for ( let i = 0; i < data.length / 4; i++ ) {

			points[ i ]
				.setX( data[ i * 4 + 0 ] )
				.setY( data[ i * 4 + 1 ] )
				.setZ( data[ i * 4 + 2 ] );

		}

	}

	// onPreFrame() {

	// const deltaTime = Application.time.deltaTime * this.timeScale;
	// const deltaRatio = deltaTime / 16.6667;

	// this.uniforms[ 'speed' ].value = this.speed * deltaRatio;
	// this.uniforms[ 'dieSpeed' ].value = this.dieSpeed * deltaRatio;
	// this.uniforms[ 'radius' ].value = this.radius;
	// this.uniforms[ 'curlSize' ].value = this.curlSize;
	// this.uniforms[ 'attraction' ].value = this.attraction;

	// this.uniforms[ 'current' ].value = this.renderTargets[ 0 ].texture;
	// this.uniforms[ 'time' ].value += deltaTime * 1e-3;

	// }

	render() {

		this.renderTargets.unshift( this.renderTargets.pop() );

		const writeBuffer = this.renderTargets[ 0 ];

		const { renderer } = Application;
		// renderer.clear();
		renderer.setRenderTarget( writeBuffer );
		renderer.render( this.scene, this.camera );
		renderer.setRenderTarget( null );

		return writeBuffer;

	}

}
