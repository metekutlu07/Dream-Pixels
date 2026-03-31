import {

	UniformsUtils,
	ShaderMaterial,
	OrthographicCamera,
	Scene,
	Mesh,
	PlaneGeometry,
	DataTexture,
	RGBAFormat,
	FloatType

} from 'three';

import Pass from '~/canvas/post-processing/Pass';

import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

export default class GlitchPass extends Pass {

	constructor( size = 16 ) {

		super();

		this.uniforms = UniformsUtils.clone( {

			tDiffuse: { value: null },
			tDisplacement: { value: null },

			strength: { value: .15 },
			size: { value: 1e-4 },
			angle: { value: .02 },

			seed: { value: .02 },
			seedX: { value: .02 }, // -1, 1
			seedY: { value: .02 }, // -1, 1

			distortionX: { value: .1 },
			distortionY: { value: .1 }

		} );

		this.uniforms[ 'tDisplacement' ].value = this.getDisplacementTexture( size );

		this.material = new ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader

		} );

		this.camera = new OrthographicCamera( -1, 1, 1, -1, 0, 1 );
		this.scene = new Scene();

		this.quad = new Mesh( new PlaneGeometry( 2, 2 ), null );
		this.quad.frustumCulled = false;
		this.scene.add( this.quad );

		Application.events.add( this );

	}

	onPreFrame() {

		const { parameters } = Application.postProcessing;
		const { strength, size } = parameters.glitchPass;
		this.uniforms[ 'strength' ].value = strength;
		this.uniforms[ 'size' ].value = size;
		this.enabled = Application.postProcessing.isPassEnabled( 'glitchPass' );

	}

	getDisplacementTexture( size ) {

		const data = new Float32Array( size * size * 3 );
		const length = size * size;

		for ( let i = 0, l = length; i < l; i++ ) {

			data[ i * 3 + 0 ] =
			data[ i * 3 + 1 ] =
			data[ i * 3 + 2 ] = Math.randFloat( 0, 1 );

		}

		const texture = new DataTexture( data, size, size, RGBAFormat, FloatType );
		texture.needsUpdate = true;

		return texture;

	}

	render( renderer, writeBuffer, readBuffer ) {

		this.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
		this.uniforms[ 'seed' ].value = Math.random(); // Sefault seeding

		this.uniforms[ 'strength' ].value = Math.random() / 90;
		this.uniforms[ 'angle' ].value = Math.randFloat( -Math.PI, Math.PI );

		this.uniforms[ 'seedX' ].value = Math.randFloat( -.5, .5 );
		this.uniforms[ 'seedY' ].value = Math.randFloat( -.5, .5 );

		this.uniforms[ 'distortionX' ].value = Math.randFloat( 0, 5 );
		this.uniforms[ 'distortionY' ].value = Math.randFloat( 0, 5 );

		this.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			renderer.render( this.scene, this.camera );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
			renderer.render( this.scene, this.camera );

		}

	}

}
