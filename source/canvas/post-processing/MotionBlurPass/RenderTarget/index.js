import {

	WebGLRenderTarget,
	LinearFilter,
	RGBAFormat,
	HalfFloatType,
	Matrix4,
	Color

} from 'three';

import MeshVelocityMaterial from './MeshVelocityMaterial';

export default class RenderTarget extends WebGLRenderTarget {

	constructor( scene, camera, { hasCameraInfluence = true } = {} ) {

		super( 256, 256, {

			minFilter: LinearFilter,
			magFilter: LinearFilter,
			format: RGBAFormat,
			type: HalfFloatType

		} );

		this.scene = scene;
		this.camera = camera;
		this.hasCameraInfluence = hasCameraInfluence;

		this.scale = 1;
		this.clearColor = new Color();
		this.clearAlpha = 0;

		this.oldClearColor = new Color();
		this.oldClearAlpha = 0;

		this.clear = true;
		this.clearDepth = false;
		this.needsSwap = false;

		this.previousProjectionMatrix = new Matrix4();
		this.previousMatrixWorldInverse = new Matrix4();
		this.objectStates = new Map();

	}

	dispose() {

		super.dispose();
		this.objectStates.clear();

	}

	setSize( width, height ) {

		super.setSize( width * this.scale, height * this.scale );

	}

	setObject( object, reset ) {

		if ( ! object.isMesh ) return;

		const objectState = this.getObjectPreviousState( object );

		if ( reset ) return object.material = objectState.material;

		object.material = objectState.velocityMaterial;

		const { previousProjectionMatrix, previousModelViewMatrix } = object.material.uniforms;

		if ( this.hasCameraInfluence ) {

			previousProjectionMatrix.value.copy( this.previousProjectionMatrix );
			previousModelViewMatrix.value.multiplyMatrices( this.previousMatrixWorldInverse, objectState.matrixWorld );

		} else {

			previousProjectionMatrix.value.copy( this.camera.projectionMatrix );
			previousModelViewMatrix.value.multiplyMatrices( this.camera.matrixWorldInverse, objectState.matrixWorld );

		}

		this.setObjectState( object );

	}

	getObjectPreviousState( object ) {

		const objectState = this.objectStates.get( object ) || {

			lastUsedFrame: -1,
			matrixWorld: object.matrixWorld.clone(),
			velocityMaterial: new MeshVelocityMaterial(),
			material: object.material,
			boneMatrices: null,
			boneTexture: null

		};

		this.objectStates.set( object, objectState );

		const isSkinnedMesh = object.isSkinnedMesh && objectState.material.skinning;
		const hasBoneMatrices = objectState.boneMatrices !== null;
		const bonesCountChanged = hasBoneMatrices && objectState.boneMatrices.length !== skeleton.boneMatrices.length;
		const boneTextureNeedsUpdate = ! hasBoneMatrices || bonesCountChanged;

		objectState.velocityMaterial.skinning = objectState.material.skinning;
		objectState.velocityMaterial.map = objectState.material.map;
		objectState.velocityMaterial.needsUpdate = true;

		if ( isSkinnedMesh && boneTextureNeedsUpdate ) {

			const boneMatrices = new Float32Array( object.skeleton.boneMatrices.length );
			boneMatrices.set( object.skeleton.boneMatrices );
			objectState.boneMatrices = boneMatrices;

			const size = Math.sqrt( object.skeleton.boneMatrices.length / 4 );
			const boneTexture = new DataTexture( boneMatrices, size, size, RGBAFormat, FloatType );
			boneTexture.needsUpdate = true;

			objectState.velocityMaterial.uniforms[ 'previousBoneTexture' ].value = boneTexture;
			objectState.boneTexture = boneTexture;

		}

		return objectState;

	}

	setObjectState( object ) {

		const objectState = this.objectStates.get( object );

		if ( objectState.boneMatrices !== null ) {

			objectState.boneMatrices.set( object.skeleton.boneMatrices );
			objectState.boneTexture.needsUpdate = true;

		}

		objectState.matrixWorld.copy( object.matrixWorld );

	}

	render( renderer ) {

		const oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		this.scene.traverse( object => this.setObject( object ) );

		if ( this.clearColor ) {

			renderer.getClearColor( this.oldClearColor );
			this.oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}

		if ( this.clearDepth ) renderer.clearDepth();
		renderer.setRenderTarget( this );

		const { autoClearColor, autoClearDepth, autoClearStencil } = renderer;
		if ( this.clear ) renderer.clear( autoClearColor, autoClearDepth, autoClearStencil );
		renderer.render( this.scene, this.camera );
		if ( this.clearColor ) renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );

		this.previousMatrixWorldInverse.copy( this.camera.matrixWorldInverse );
		this.previousProjectionMatrix.copy( this.camera.projectionMatrix );
		this.scene.traverse( object => this.setObject( object, true ) );

		renderer.autoClear = oldAutoClear;

	}

}
