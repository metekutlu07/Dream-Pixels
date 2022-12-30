import { PerspectiveCamera, Object3D, Spherical, Vector2, Vector3 } from 'three';

export default class Camera extends PerspectiveCamera {

	constructor( cameraID ) {

		super( 45, 1, .01, 250 );

		Application.events.add( this );

		this.cameraID = cameraID;
		this.object = new Object3D();
		this.target = new Vector3();

		this.scroll = 0;
		this.progress = 0;
		this.friction = cameraID === 'Timeline' ? .1 : .025;

		this.initialState = new State();
		this.currentState = new State();
		this.lerpState = new State();
		this.deltaState = new State();
		this.offsetState = new State();

		this.currentPan = new Vector3();
		this.lerpPan = new Vector3();
		this.initialPan = new Vector3();
		this.deltaPan = new Vector3();

	}

	onPreFrame() {

		this.isEnabled = Application.camera === this;

	}

	onUpdate() {

		if ( ! Application.particles ) return;

		const { aspect } = Application.viewport;
		const { curve } = Application.particles.simulation;

		this.aspect = aspect;
		this.updateProjectionMatrix();

		const offsetY = .1;
		const scroll = this.scroll + this.currentPan.y;
		this.progress = Math.lerp( this.progress, scroll, .01 );

		const progress = Math.euclideanModulo( this.progress, 1 );
		const position = curve.getPointAt( progress, Vector3.get() );
		position.y += offsetY;
		this.position.lerp( position, this.friction );

		const target = curve.getPointAt( Math.euclideanModulo( progress + 1e-3, 1 ), Vector3.get() );
		target.y += offsetY;
		this.target.lerp( target, this.friction );
		this.lookAt( this.target );

		Vector3.release( position, target );

		this.isScrolling = this.position.distanceTo( position ) > .1;

		if ( this.cameraID !== 'Timeline' ) this.scroll += 1e-4;

	}

	onWheel( event ) {

		if ( ! this.isEnabled ) return;

		if ( ! event.composedPath()[ 0 ].matches( 'canvas' ) ) return;

		const { particles } = Application.store;
		if ( particles !== 'timeline' ) return;

		this.scroll += event.deltaY * 1e-5 * 2.5;

	}

	onInputStart( event ) {

		if ( ! this.isEnabled || ! this.isOverCanvas( event ) ) return;

		this.initialState.copy( this.currentState );
		this.initialPan.copy( this.currentPan );

		Application.pointer.getCoordinates( this.initialState.position );

		this.deltaState.copy( this.initialState );
		this.deltaPan.copy( this.initialPan );
		this.isGrabbed = true;

		this.setDelta();

	}

	onInputMove() {

		if ( ! this.isEnabled ) return;

		const { isPressed } = Application.pointer;

		if ( ! this.isGrabbed || ! isPressed ) return;

		this.setDelta();

		this.currentPan.y = this.initialPan.y + this.deltaState.position.y * 1e-4;

	}

	onInputEnd() {

		if ( ! this.isEnabled ) return;

		this.isGrabbed = false;

	}

	setDelta() {

		if ( ! this.isEnabled ) return;

		Application.pointer
			.getCoordinates( this.deltaState.position )
			.sub( this.initialState.position );

	}

	isOverCanvas( event ) {

		return event.composedPath()[ 0 ].matches( 'canvas,section-type-1' );

	}

}


class State extends Spherical {

	constructor( parameters ) {

		super( parameters );

		this.position = new Vector2();

	}

	copy( other ) {

		super.copy( other );

		this.radius = other.radius;
		this.position.copy( other.position );

	}

	clone() {

		return new this.constructor().copy( this );

	}

}
