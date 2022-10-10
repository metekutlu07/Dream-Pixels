import {
	PerspectiveCamera, Vector3 } from 'three';

export default class Camera extends PerspectiveCamera {

	constructor( curve ) {

		super( 45, 1, 1, 25 );

		Application.events.add( this );

		this.curve = curve;

	}

	onUpdate() {

		const { aspect } = Application.viewport;
		this.aspect = aspect;

		const { elapsedTime } = Application.time;
		this.progress = elapsedTime * 1e-5 % 1;
		this.curve.getPointAt( this.progress, this.position );

		const lookAt = Vector3.get();
		this.curve.getPointAt( this.progress + 1e-3, lookAt );
		this.lookAt( lookAt );
		Vector3.release( lookAt );

		const tangent = Vector3.get();
		this.curve.getPointAt( this.progress, tangent );
		Vector3.release( tangent );

		const normal = Vector3.get()
			.set( 0, 1, 0 )
			.cross( tangent );

		this.matrix.lookAt( this.position, lookAt, normal );
		this.quaternion.setFromRotationMatrix( this.matrix );
		Vector3.release( normal );

	}

}
