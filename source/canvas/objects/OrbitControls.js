import { Vector2, Object3D, Spherical, Vector3 } from 'three';

export default class OrbitControls extends Object3D {

	constructor() {

		super();

		this.parameters = Application.store.add( 'OrbitControls', {

			enableRotate: true,
			rotateSpeed: { value: 4, max: 10 },
			dampingFactor: { value: .05, max: .2 },

			autoRotate: false,
			autoRotateDelay: { value: 6, min: 1, max: 10 },

			enableZoom: true,
			zoomSpeed: { value: 1. },

			minDistance: { value: 20, min: 5, max: 50 },
			maxDistance: { value: 35, min: 5, max: 50 },

			minAngle: { value: -1.25, min: -2, max: 2 },
			maxAngle: { value: 1.25, min: -2, max: 2 }

		} );

		Application.events.add( this );

		this.isGrabbed = false;

		this.initialState = new State();
		this.currentState = new State();
		this.lerpState = new State();
		this.deltaState = new State();
		this.offsetState = new State();

		this.lerpState.set( 0, 0, 0 );
		this.currentState.copy( this.lerpState );
		this.offsetState.set( 0, 0, 0 );

		this.offset = new Vector3();
		this.autoRotateDelay = 0;
		this.autoRotate = 0;

	}

	onUpdate() {

		const {

			enableRotate,
			dampingFactor,
			autoRotate,
			autoRotateDelay

		} = this.parameters;

		if ( autoRotate ) {

			this.autoRotateDelay += Application.time.deltaTime;
			this.autoRotate = this.autoRotateDelay > autoRotateDelay * 1e3 ?
				Math.lerp( this.autoRotate, -1e-3, .01 ) : 0;

			this.currentState.theta += this.autoRotate;

		}

		this.lerpState.phi = Math.lerp( this.lerpState.phi, this.currentState.phi, dampingFactor );
		this.lerpState.theta = Math.lerp( this.lerpState.theta, this.currentState.theta, dampingFactor );
		this.lerpState.radius = Math.lerp( this.lerpState.radius, this.currentState.radius, dampingFactor );

		const radius = this.lerpState.radius + this.offsetState.radius;
		const phi = this.lerpState.phi + this.offsetState.phi;
		const theta = this.lerpState.theta + this.offsetState.theta;

		this.offset.x = radius * Math.sin( Math.PI * .5 - phi ) * Math.sin( theta );
		this.offset.y = radius * Math.cos( Math.PI * .5 - phi );
		this.offset.z = radius * Math.sin( Math.PI * .5 - phi ) * Math.cos( theta );

		Application.store.set( 'grab', enableRotate && ! this.isGrabbed );
		Application.store.set( 'grabbing', enableRotate && this.isGrabbed );

	}

	onPostUpdate() {

		const { offset } = Application.camera.parameters;

		offset.x = this.offset.x;
		offset.y = this.offset.y;
		offset.z = this.offset.z;

	}

	async onViewChange() {

		this.lerpState.set( 10, 0, 0 );

		Object.assign( this.parameters, {

			rotateSpeed: 4,
			enableRotate: false,
			autoRotate: false,
			enableZoom: false,

			minAngle: -1.25,
			maxAngle: 1.25

		} );

		switch ( Application.store.path ) {

		case '/when-gaspard-paints-a-gospel':

			this.lerpState.set( 25, .25, 0 );

			Object.assign( this.parameters, {

				enableRotate: true,
				autoRotate: true,
				autoRotateDelay: 2

			} );

			break;

		case '/miniature-street-view':

			this.lerpState.set( 1, 0, 0 );

			Object.assign( this.parameters, {

				enableRotate: true,
				autoRotate: false,
				rotateSpeed: -2,
				autoRotateDelay: 2

			} );

			break;

		case '/virtual-miniature':

			this.lerpState.set( 25, .75, -.25 );
			this.offsetState.radius = 45 - this.lerpState.radius;
			this.offsetState.phi = .55 - this.lerpState.phi;
			this.offsetState.theta = 0 - this.lerpState.theta;

			Object.assign( this.parameters, {

				enableRotate: true,
				autoRotate: true,
				enableZoom: true,

				minAngle: .25,
				maxAngle: 1,

				minDistance: 20,
				maxDistance: 35

			} );

			break;

		case '/photogrammetry':

			this.lerpState.set( 50, 0, 0 );

			Object.assign( this.parameters, {

				rotateSpeed: 6,
				enableRotate: true,
				autoRotate: true,
				enableZoom: true,

				minDistance: 50,
				maxDistance: 100

			} );

			break;

		case '/projects':

			this.lerpState.set( 35, 0, 0 );
			// this.lerpState.set( 1, 0, 0 );

			Object.assign( this.parameters, {

				enableRotate: true,
				// autoRotate: true,
				enableZoom: true,

				// rotateSpeed: -2,
				rotateSpeed: 5,
				zoomSpeed: 5,

				autoRotateDelay: 2,
				minAngle: -1,
				maxAngle: 1,

				minDistance: 15,
				maxDistance: 75

			} );

			break;

		}

		Application.store.set( 'grab', false );
		Application.store.set( 'grabbing', false );

		this.currentState.copy( this.lerpState );
		this.autoRotateDelay = 0;

		if ( Application.store.path === '/virtual-miniature' ) {

			await anime( {

				targets: this.offsetState,
				easing: 'easeInOutExpo',
				duration: 3000,
				delay: 1000,
				radius: 0,
				phi: 0,
				theta: 0

			} ).finished;

			anime( {

				targets: this,
				easing: 'easeOutExpo',
				duration: 5000,
				speedFactor: 1

			} );

		}

	}

	onInputStart( event ) {

		if ( ! event.composedPath()[ 0 ].matches( 'canvas' ) ) return;
		if ( ! this.parameters.enableRotate ) return;

		this.initialState.copy( this.currentState );

		Application.pointer.getCoordinates( this.initialState.position );

		this.deltaState.copy( this.initialState );
		this.isGrabbed = true;

		this.setDelta();

	}

	onInputMove( event ) {

		if ( ! event.composedPath()[ 0 ].matches( 'canvas' ) ) return;

		const { isPressed } = Application.pointer;

		if ( ! this.parameters.enableRotate || ! isPressed ) return;

		this.setDelta();

		const { rotateSpeed, minAngle, maxAngle } = this.parameters;
		const { width } = Application.viewport;

		let speedFactor = rotateSpeed * 1e-3;
		speedFactor *= Math.mapLinear( width, 365, 1500, 2, 1 );

		this.currentState.theta = this.initialState.theta - this.deltaState.position.x * speedFactor;
		this.currentState.phi = this.initialState.phi + this.deltaState.position.y * speedFactor;
		this.currentState.phi = Math.clamp( this.currentState.phi, minAngle, maxAngle );

	}

	onInputEnd() {

		if ( ! this.parameters.enableRotate ) return;

		this.isGrabbed = false;

	}

	onWheel( event ) {

		if ( ! event.composedPath()[ 0 ].matches( 'canvas' ) ) return;

		if ( ! this.parameters.enableZoom ) return;

		this.currentState.radius += Application.pointer.wheel.y * 1e-2;
		this.currentState.radius = Math.clamp(

			this.currentState.radius,
			this.parameters.minDistance,
			this.parameters.maxDistance

		);

	}

	setDelta() {

		Application.pointer
			.getCoordinates( this.deltaState.position )
			.sub( this.initialState.position );

		this.autoRotateDelay = 0;

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
