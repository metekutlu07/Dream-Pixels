import {

	UniformsUtils,
	WebGLRenderTarget,
	LinearFilter,
	NearestFilter,
	RGBAFormat,
	ShaderMaterial,
	Scene,
	OrthographicCamera,
	PlaneGeometry,
	Mesh,
	MeshBasicMaterial

} from 'three';

import Pass from '~/canvas/post-processing/Pass';

import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

export default class AfterImagePass extends Pass {

	constructor() {

		super();

		this.uniforms = UniformsUtils.clone( {

			strength: { value: .96 },
			tPrevious: { value: null },
			tDiffuse: { value: null }

		} );

		this.currentFrame = new WebGLRenderTarget( null, null, {

			minFilter: LinearFilter,
			magFilter: NearestFilter,
			format: RGBAFormat

		} );

		this.previousFrame = new WebGLRenderTarget( null, null, {

			minFilter: LinearFilter,
			magFilter: NearestFilter,
			format: RGBAFormat

		} );

		this.material = new ShaderMaterial( {

			uniforms: this.uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader

		} );

		this.sceneA = new Scene();
		this.sceneB = new Scene();

		this.camera = new OrthographicCamera( -1, 1, 1, -1, 0, 1 );

		const geometry = new PlaneGeometry( 2, 2 );

		this.quad = new Mesh( geometry, this.material );
		this.sceneA.add( this.quad );

		const material = new MeshBasicMaterial( { map: this.currentFrame.texture } );

		const quad = new Mesh( geometry, material );
		this.sceneB.add( quad );

		Application.events.add( this );

	}

	onPreFrame() {

		const { parameters } = Application.postProcessing;
		const { strength } = parameters.afterImagePass;
		this.uniforms[ 'strength' ].value = strength;
		this.enabled = Application.postProcessing.isPassEnabled( 'afterImagePass' );

	}

	setSize( width, height ) {

		this.currentFrame.setSize( width, height );
		this.previousFrame.setSize( width, height );

	}

	render( renderer, writeBuffer, readBuffer ) {

		this.uniforms[ 'tPrevious' ].value = this.previousFrame.texture;
		this.uniforms[ 'tDiffuse' ].value = readBuffer.texture;

		this.quad.material = this.material;

		renderer.setRenderTarget( this.currentFrame );
		renderer.render( this.sceneA, this.camera );

		renderer.setRenderTarget( this.previousFrame );
		renderer.render( this.sceneB, this.camera );

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			renderer.render( this.sceneB, this.camera );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
			renderer.render( this.sceneB, this.camera );

		}

	}

}
