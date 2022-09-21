import {

	PerspectiveCamera,
	Vector3,
	Matrix4,
	Object3D,
	Frustum

} from 'three';

export default class Camera extends PerspectiveCamera {

	constructor() {

		super( 10, 1, 1, 400 );

		Application.events.add( this );

		this.frustum = new Frustum();
		this.object = new Object3D();
		this.target = new Vector3();
		this.offset = new Vector3();

		this.parameters = Application.store.add( 'Camera', {

			setShake: this.setShake,
			fov: { value: 5, min: 10, max: 120 },
			near: { value: 1, min: .1, max: 5 },
			far: { value: 500, min: 10, max: 1000 },

			target: {
				value: new Vector3( 0, 0, 0 ),
				min: new Vector3().setScalar( -150 ),
				max: new Vector3().setScalar( 150 )
			},

			offset: {
				value: new Vector3( 0, 0, 0 ),
				min: new Vector3().setScalar( -150 ),
				max: new Vector3().setScalar( 150 )
			},

		} );

		this.offsetLeftFactor = 0;
		this.initialDepthRatio = Math.tan( 45 / 2 * Math.PI / 180 ) * 2;
		this.isOrthographic = true;

	}

	onPreFrame() {

		const {

			fov,
			near,
			far,
			target,
			offset

		} = this.parameters;

		this.fov = fov;
		this.near = near;
		this.far = far;

		this.target.copy( target );
		this.offset.copy( offset );

		const depthRatio = Math.tan( fov / 2 * Math.PI / 180 ) * 2;
		this.offset.divideScalar( depthRatio / this.initialDepthRatio );

	}

	onUpdate() {

		this.aspect = Application.viewport.aspect;
		this.zoom = Math.mapLinear( this.aspect, 1, 1.6, 1, 1.2 );
		this.zoom = Math.clamp( this.zoom, 1, 1.2 );

		this.position
			.copy( this.object.position )
			.add( this.offset );

		const target = Vector3.get()
			.copy( this.object.position )
			.add( this.target );

		this.lookAt( target );
		this.setOffsetLeft();
		this.updateProjectionMatrix();
		this.setFrustum();

		Vector3.release( target );

	}

	onViewChange() {

		this.offsetLeftFactor = 0;

		Object.assign( this.parameters, { fov: 45, near: 1, far: 500 } );

		switch ( Application.store.path ) {

		case '/virtual-miniature':

			Object.assign( this.parameters, { fov: 5, near: 5, far: 500 } );
			this.isOrthographic = false;

			anime( {

				targets: this.parameters,
				duration: 3000,
				delay: 1000,
				easing: 'easeInOutExpo',
				fov: 45

			} );

			break;

		}

	}

	setOffsetLeftFactor( offsetLeftFactor ) {

		anime( {

			targets: this,
			easing: 'cubicBezier(.55, 0, .1, 1)',
			duration: 850,
			offsetLeftFactor

		} );

	}

	setOffsetLeft() {

		const panel = document.querySelector( 'aside-block' );

		if ( ! panel ) return;

		const distance = this.position.length();
		const height = 2. * distance * Math.tan( this.fov * .5 * ( Math.PI / 180 ) );
		const aspectCorrectedWidth = height * this.aspect;

		const { width } = Application.viewport;
		const { clientWidth } = panel;

		if ( clientWidth > width * .5 ) return;

		const x = clientWidth / width * aspectCorrectedWidth;
		const offsetLeft = -x * .45 * this.offsetLeftFactor;
		const offset = Vector3.get()
			.setX( offsetLeft )
			.applyQuaternion( this.quaternion );

		this.position.add( offset );

		Vector3.release( offset );

	}

	setOrthography() {

		this.isOrthographic = ! this.isOrthographic;

		anime( {

			targets: this.parameters,
			duration: 1000,
			easing: 'easeOutExpo',
			fov: this.isOrthographic ? 10 : 45

		} );

		Application.store.set( 'orthographic', this.isOrthographic );

	}

	setFrustum() {

		const matrix = Matrix4.get()
			.copy( this.projectionMatrix )
			.multiply( this.matrixWorldInverse );

		this.frustum.setFromProjectionMatrix( matrix );

		Matrix4.release( matrix );

	}

	setShake() { return new Shake( this, 500, .25 ) }

}

class Shake extends Vector3 {

	constructor( camera, duration = 500, amount ) {

		super();

		Application.events.add( this );

		this.camera = camera;
		this.duration = duration;
		this.amount = amount;

		const { elapsedTime } = Application.time;
		this.startTime = elapsedTime;

	}

	onPostUpdate() {

		const { elapsedTime } = Application.time;
		const deltaTime = elapsedTime - this.startTime;

		if ( deltaTime > this.duration ) return this.onDestroy();

		this.random().multiplyScalar( this.amount );
		this.camera.position.add( this );

	}

	onDestroy() {

		Application.events.remove( this );

	}

}
