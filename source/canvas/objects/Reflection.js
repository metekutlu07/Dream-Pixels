import {

	Object3D,
	Plane,
	Vector3,
	Matrix4,
	Vector4,
	PerspectiveCamera,
	WebGLRenderTarget,
	LinearFilter

} from 'three';

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

		this.renderTarget = new WebGLRenderTarget( 1024, 1024, {

			minFilter: LinearFilter,
			magFilter: LinearFilter,
			generateMipmaps: false

		} );

		this.texture = this.renderTarget.texture;

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

		const { renderer, scene } = Application;
		renderer.setRenderTarget( this.renderTarget );
		renderer.render( scene, this.camera );
		renderer.setRenderTarget( null );

	}

}
