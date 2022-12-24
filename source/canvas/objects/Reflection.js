import {

	Object3D,
	Plane,
	Vector3,
	Matrix4,
	Vector4,
	PerspectiveCamera,
	WebGLRenderTarget,
	Vector2

} from 'three';

import RenderPass from '../post-processing/RenderPass';
import ShaderPass from '../post-processing/ShaderPass';
import EffectComposer from '../post-processing/EffectComposer';

export default class Reflection extends Object3D {

	constructor( { clipBias = 1e-6 } = {} ) {

		super();

		this.rotation.x = -Math.PI * .5;
		this.clipBias = clipBias;

		this.plane = new Plane();
		this.normal = new Vector3();
		this.reflectionWorldPosition = new Vector3();
		this.cameraWorldPosition = new Vector3();
		this.rotationMatrix = new Matrix4();
		this.lookAtPosition = new Vector3( 0, 0, -1 );
		this.clipPlane = new Vector4();

		this.view = new Vector3();
		this.target = new Vector3();
		this.q = new Vector4();

		this.mapMatrix = new Matrix4();

		this.camera = new PerspectiveCamera();
		this.camera.matrixAutoUpdate = true;

		this.renderTargetA = new WebGLRenderTarget( 2048, 2048 );

		this.texture = this.renderTargetA.texture;
		// this.setEffectComposer();

	}

	setEffectComposer() {

		const { renderer, scene } = Application;

		this.verticalBlurPass = new ShaderPass( BlurShader );
		this.horizontalBlurPass = new ShaderPass( BlurShader );

		this.verticalBlurPass.uniforms[ 'direction' ].value.y =
		this.horizontalBlurPass.uniforms[ 'direction' ].value.x = 1;

		const size = 1024;
		this.verticalBlurPass.uniforms[ 'size' ].value.setScalar( size );
		this.horizontalBlurPass.uniforms[ 'size' ].value.setScalar( size );

		this.renderTargetB = new WebGLRenderTarget( size, size );
		this.composer = new EffectComposer( renderer, this.renderTargetB );

		this.renderPass = new RenderPass( scene, this.camera );
		this.composer.addPass( this.renderPass );

		for ( let i = 0, l = 10; i < l; i++ ) {

			this.composer.addPass( this.verticalBlurPass );
			this.composer.addPass( this.horizontalBlurPass );

		}

		this.composer.setSize( size, size );
		this.texture = this.renderTargetB.texture;

	}

	updateTextureMatrix() {

		const camera = Application.overrideCamera || Application.camera;
		camera.updateMatrixWorld();

		this.camera.copy( camera );
		this.camera.updateMatrixWorld();

		this.updateMatrixWorld();

		this.reflectionWorldPosition.setFromMatrixPosition( this.matrixWorld );
		this.cameraWorldPosition.setFromMatrixPosition( camera.matrixWorld );
		this.rotationMatrix.extractRotation( this.matrixWorld );

		this.normal.set( 0, 0, 1 );
		this.normal.applyMatrix4( this.rotationMatrix );

		this.view.subVectors( this.reflectionWorldPosition, this.cameraWorldPosition );
		this.view.reflect( this.normal ).negate();
		this.view.add( this.reflectionWorldPosition );

		this.rotationMatrix.extractRotation( camera.matrixWorld );

		this.lookAtPosition.set( 0, 0, -1 );
		this.lookAtPosition.applyMatrix4( this.rotationMatrix );
		this.lookAtPosition.add( this.cameraWorldPosition );

		this.target.subVectors( this.reflectionWorldPosition, this.lookAtPosition );
		this.target.reflect( this.normal ).negate();
		this.target.add( this.reflectionWorldPosition );

		this.up.set( 0, -1, 0 );
		this.up.applyMatrix4( this.rotationMatrix );
		this.up.reflect( this.normal ).negate();

		this.camera.position.copy( this.view );
		this.camera.up.set( 0, -1, 0 );
		this.camera.up.applyMatrix4( this.rotationMatrix );
		this.camera.up.reflect( this.normal ).negate();
		this.camera.lookAt( this.target );

		this.camera.updateProjectionMatrix();
		this.camera.updateMatrixWorld();

		// Update the texture matrix
		this.mapMatrix.set( .5, .0, .0, .5, .0, .5, .0, .5, .0, .0, .5, .5, .0, .0, .0, 1.0 );
		this.mapMatrix.multiply( this.camera.projectionMatrix );
		this.mapMatrix.multiply( this.camera.matrixWorldInverse );

		// Now update projection matrix with new clip plane, implementing code from: http://www.terathon.com/code/oblique.html
		// paper explaining this technique: http://www.terathon.com/lengyel/Lengyel-Oblique.pdf
		this.plane.setFromNormalAndCoplanarPoint( this.normal, this.reflectionWorldPosition );
		this.plane.applyMatrix4( this.camera.matrixWorldInverse );
		this.clipPlane.set( this.plane.normal.x, this.plane.normal.y, this.plane.normal.z, this.plane.constant );

		const { projectionMatrix } = this.camera;

		this.q.x = Math.sign( this.clipPlane.x ) + ( projectionMatrix.elements[ 8 ] / projectionMatrix.elements[ 0 ] );
		this.q.y = Math.sign( this.clipPlane.y ) + ( projectionMatrix.elements[ 9 ] / projectionMatrix.elements[ 5 ] );
		this.q.z = -1.0;
		this.q.w = ( 1.0 + projectionMatrix.elements[ 10 ] ) / projectionMatrix.elements[ 14 ];

		// Calculate the scaled plane vector
		this.clipPlane.multiplyScalar( 2.0 / this.clipPlane.dot( this.q ) );

		// Replacing the third row of the projection matrix
		projectionMatrix.elements[ 2 ] = this.clipPlane.x;
		projectionMatrix.elements[ 6 ] = this.clipPlane.y;
		projectionMatrix.elements[ 10 ] = this.clipPlane.z + 1.0 - this.clipBias;
		projectionMatrix.elements[ 14 ] = this.clipPlane.w;

	}

	render() {

		this.updateTextureMatrix();

		if ( this.composer ) {

			const { scene } = Application;
			this.renderPass.scene = scene;
			this.composer.render();

		} else {

			const { renderer, scene } = Application;
			renderer.setRenderTarget( this.renderTargetA );
			renderer.render( scene, this.camera );
			renderer.setRenderTarget( null );

		}

	}

}

const BlurShader = {

	uniforms: {

		tDiffuse: { value: null },
		size: { value: new Vector2() },
		direction: { value: new Vector2() }

	},

	vertexShader: `

	varying vec2 vUv;

	void main() {

		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );

	}

	`,

	fragmentShader: `
		varying vec2 vUv;
		uniform sampler2D tDiffuse;
		uniform vec2 size;
		uniform vec2 direction;

		void main() {

			vec4 color = vec4( .0 );
			vec2 offset1 = vec2( 1.411764705882353 ) * direction;
			vec2 offset2 = vec2( 3.2941176470588234 ) * direction;
			vec2 offset3 = vec2( 5.176470588235294 ) * direction;

			color += texture2D( tDiffuse, vUv ) * .1964825501511404;
			color += texture2D( tDiffuse, vUv + ( offset1 / size ) ) * .2969069646728344;
			color += texture2D( tDiffuse, vUv - ( offset1 / size ) ) * .2969069646728344;
			color += texture2D( tDiffuse, vUv + ( offset2 / size ) ) * .09447039785044732;
			color += texture2D( tDiffuse, vUv - ( offset2 / size ) ) * .09447039785044732;
			color += texture2D( tDiffuse, vUv + ( offset3 / size ) ) * .010381362401148057;
			color += texture2D( tDiffuse, vUv - ( offset3 / size ) ) * .010381362401148057;

			gl_FragColor = color;

		}
	`,
};
