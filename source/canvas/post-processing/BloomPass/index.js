import {

	Scene,
	Mesh,
	Color,
	Vector2,
	Vector3,
	LinearFilter,
	RGBAFormat,
	WebGLRenderTarget,
	UniformsUtils,
	ShaderMaterial,
	AdditiveBlending,
	OrthographicCamera,
	MeshBasicMaterial,
	PlaneGeometry

} from 'three';

import Pass from '../Pass';
import CopyPass from '../CopyPass';
import LuminosityHighPass from '../LuminosityHighPass';

import SeparableBlurShader from './SeparableBlurShader';
import CompositeShader from './CompositeShader';

export default class BloomPass extends Pass {

	constructor( strength = .5, radius = 1, threshold = .5, resolution = new Vector2( 256, 256 ) ) {

		super();

		this.strength = strength;
		this.threshold = threshold;
		this.resolution = resolution;
		this.radius = radius;
		this.mipmapCount = 5;

		this.bloomTintColors = [];

		for ( let i = 0, l = this.mipmapCount; i < l; i++ )
			this.bloomTintColors.push( new Vector3( 1, 1, 1 ) );

		this.createRenderTargets();

		this.materials = {

			basic: new MeshBasicMaterial(),
			luminosityHighPass: this.getLuminosityHighPassMaterial(),
			seperableBlurs: this.getSeparableBlurMaterials(),
			composite: this.getCompositeMaterial(),
			copy: this.getCopyMaterial()

		};

		this.enabled = true;
		this.needsSwap = false;

		this.clearColor = new Color();
		this.oldClearColor = new Color();
		this.oldClearAlpha = 1;

		this.camera = new OrthographicCamera( -1, 1, 1, -1, 0, 1 );
		this.scene = new Scene();

		this.quad = new Mesh( new PlaneGeometry( 2, 2 ), null );
		this.quad.frustumCulled = false;
		this.scene.add( this.quad );

		Application.events.add( this );

	}

	createRenderTargets() {

		const parameters = {

			minFilter: LinearFilter,
			magFilter: LinearFilter,
			format: RGBAFormat

		};

		this.renderTargetsHorizontal = [];
		this.renderTargetsVertical = [];

		let resolutionX = Math.round( this.resolution.x * .5 );
		let resolutionY = Math.round( this.resolution.y * .5 );

		this.renderTargetLuminosity = new WebGLRenderTarget( resolutionX, resolutionY, parameters );
		this.renderTargetLuminosity.texture.name = 'BloomPass.bright';
		this.renderTargetLuminosity.texture.generateMipmaps = false;

		for ( let i = 0; i < this.mipmapCount; i++ ) {

			const renderTargetHorizonal = new WebGLRenderTarget( resolutionX, resolutionY, parameters );
			renderTargetHorizonal.texture.name = 'BloomPass.h' + i;
			renderTargetHorizonal.texture.generateMipmaps = false;
			this.renderTargetsHorizontal.push( renderTargetHorizonal );

			const renderTargetVertical = new WebGLRenderTarget( resolutionX, resolutionY, parameters );
			renderTargetVertical.texture.name = 'BloomPass.v' + i;
			renderTargetVertical.texture.generateMipmaps = false;
			this.renderTargetsVertical.push( renderTargetVertical );

			resolutionX = Math.round( resolutionX * .5 );
			resolutionY = Math.round( resolutionY * .5 );

		}

	}

	getLuminosityHighPassMaterial() {

		const { material } = new LuminosityHighPass();

		Object.assign( material.uniforms, {

			threshold: { value: this.threshold },
			smoothWidth: { value: .01 }

		} );

		return material;

	}

	getSeparableBlurMaterial( kernelRadius ) {

		const material = new ShaderMaterial( SeparableBlurShader );
		material.uniforms = UniformsUtils.clone( SeparableBlurShader.uniforms );
		material.defines = { KERNEL_RADIUS: kernelRadius, SIGMA: kernelRadius };

		return material;

	}

	getSeparableBlurMaterials() {

		const materials = [];
		const kernelSizeArray = [ 3, 5, 7, 9, 11 ];

		let resolutionX = Math.round( this.resolution.x * .5 );
		let resolutionY = Math.round( this.resolution.y * .5 );

		for ( let i = 0; i < this.mipmapCount; i++ ) {

			const material = this.getSeparableBlurMaterial( kernelSizeArray[ i ] );
			material.uniforms[ 'textureSize' ].value.set( resolutionX, resolutionY );
			materials.push( material );

			resolutionX = Math.round( resolutionX * .5 );
			resolutionY = Math.round( resolutionY * .5 );

		}

		return materials;

	}

	getCompositeMaterial() {

		const material = new ShaderMaterial( CompositeShader );
		material.uniforms = UniformsUtils.clone( CompositeShader.uniforms );
		material.defines = { MIPMAP_COUNT: this.mipmapCount };
		material.needsUpdate = true;

		Object.assign( material.uniforms, {

			blurTexture1: { value: this.renderTargetsVertical[ 0 ].texture },
			blurTexture2: { value: this.renderTargetsVertical[ 1 ].texture },
			blurTexture3: { value: this.renderTargetsVertical[ 2 ].texture },
			blurTexture4: { value: this.renderTargetsVertical[ 3 ].texture },
			blurTexture5: { value: this.renderTargetsVertical[ 4 ].texture },
			bloomStrength: { value: this.strength },
			bloomFactors: { value: [ 1, .8, .6, .4, .2 ] },
			bloomTintColors: { value: this.bloomTintColors },
			bloomRadius: { value: .1 }

		} );

		return material;

	}

	getCopyMaterial() {

		const { material } = new CopyPass();

		Object.assign( material, {

			blending: AdditiveBlending,
			depthTest: true,
			depthWrite: true,
			transparent: true

		} );

		material.uniforms[ 'opacity' ].value = 1;

		return material;

	}

	renderReadBuffer( renderer, readBuffer ) {

		this.quad.material = this.materials.basic;
		this.materials.basic.map = readBuffer.texture;

		renderer.setRenderTarget( null );
		renderer.clear();
		renderer.render( this.scene, this.camera );

	}

	renderLuminosityHighPass( renderer, readBuffer ) {

		const material = this.materials.luminosityHighPass;
		this.quad.material = material;

		Object.assign( material.uniforms, {

			tDiffuse: { value: readBuffer.texture },
			threshold: { value: this.threshold }

		} );

		renderer.setRenderTarget( this.renderTargetLuminosity );
		renderer.clear();
		renderer.render( this.scene, this.camera );

	}

	renderSeparableBlurs( renderer ) {

		let inputRenderTarget = this.renderTargetLuminosity;

		for ( let i = 0; i < this.mipmapCount; i++ ) {

			const material = this.materials.seperableBlurs[ i ];
			this.quad.material = material;

			Object.assign( material.uniforms, {

				tDiffuse: { value: inputRenderTarget.texture },
				direction: { value: BloomPass.BlurDirectionX }

			} );

			renderer.setRenderTarget( this.renderTargetsHorizontal[ i ] );
			renderer.clear();
			renderer.render( this.scene, this.camera );

			Object.assign( material.uniforms, {

				tDiffuse: { value: this.renderTargetsHorizontal[ i ].texture },
				direction: { value: BloomPass.BlurDirectionY }

			} );

			renderer.setRenderTarget( this.renderTargetsVertical[ i ] );
			renderer.clear();
			renderer.render( this.scene, this.camera );

			inputRenderTarget = this.renderTargetsVertical[ i ];

		}

	}

	renderComposite( renderer ) {

		const material = this.materials.composite;
		this.quad.material = material;

		Object.assign( material.uniforms, {

			bloomStrength: { value: this.strength },
			bloomRadius: { value: this.radius },
			bloomTintColors: { value: this.bloomTintColors }

		} );

		renderer.setRenderTarget( this.renderTargetsHorizontal[ 0 ] );
		renderer.clear();
		renderer.render( this.scene, this.camera );

	}

	renderCopy( renderer, readBuffer ) {

		const material = this.materials.copy;
		this.quad.material = material;

		material.uniforms[ 'tDiffuse' ].value = this.renderTargetsHorizontal[ 0 ].texture;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			renderer.render( this.scene, this.camera );

		} else {

			renderer.setRenderTarget( readBuffer );
			renderer.render( this.scene, this.camera );

		}

	}

	dispose() {

		for ( let i = 0; i < this.renderTargetsHorizontal.length; i++ )
			this.renderTargetsHorizontal[ i ].dispose();

		for ( let i = 0; i < this.renderTargetsVertical.length; i++ )
			this.renderTargetsVertical[ i ].dispose();

		this.renderTargetLuminosity.dispose();

	}

	setSize( width, height ) {

		let resolutionX = Math.round( width / 2 );
		let resolutionY = Math.round( height / 2 );

		this.renderTargetLuminosity.setSize( resolutionX, resolutionY );

		for ( let i = 0; i < this.mipmapCount; i++ ) {

			this.renderTargetsHorizontal[ i ].setSize( resolutionX, resolutionY );
			this.renderTargetsVertical[ i ].setSize( resolutionX, resolutionY );
			this.materials.seperableBlurs[ i ].uniforms[ 'textureSize' ].value.set( resolutionX, resolutionY );

			resolutionX = Math.round( resolutionX / 2 );
			resolutionY = Math.round( resolutionY / 2 );

		}

	}

	onPreFrame() {

		const { bloomPass } = Application.postProcessing.parameters;
		const { strength, radius, threshold } = bloomPass;

		this.enabled = Application.postProcessing.isPassEnabled( 'bloomPass' );
		this.strength = strength;
		this.radius = radius;
		this.threshold = threshold;

	}

	render( renderer, writeBuffer, readBuffer, deltaTime, maskActive ) {

		renderer.getClearColor( this.oldClearColor );

		this.oldClearAlpha = renderer.getClearAlpha();

		const oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;
		renderer.setClearColor( this.clearColor, 0 );

		if ( maskActive ) renderer.context.disable( renderer.context.STENCIL_TEST );

		if ( this.renderToScreen ) this.renderReadBuffer( renderer, readBuffer );

		this.renderLuminosityHighPass( renderer, readBuffer );
		this.renderSeparableBlurs( renderer );
		this.renderComposite( renderer );
		this.renderCopy( renderer, readBuffer );

		if ( maskActive ) renderer.context.enable( renderer.context.STENCIL_TEST );

		// Restore renderer settings
		renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );
		renderer.autoClear = oldAutoClear;

	}

}

BloomPass.BlurDirectionX = new Vector2( 1, 0 );
BloomPass.BlurDirectionY = new Vector2( 0, 1 );
