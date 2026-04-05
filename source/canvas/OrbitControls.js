import { Vector2, Object3D, Spherical, Vector3 } from 'three';

export default class OrbitControls extends Object3D {

	constructor( camera ) {

		super();

		const controlsID = `${ camera.cameraID }Controls`;

		this.parameters = Application.store.add( controlsID, {

			enableRotate: true,
			rotateSpeed: { value: 4, max: 10 },
			dampingFactor: { value: .05, max: .2 },

			autoRotate: false,
			autoRotateSpeed: { value: 1, max: 5 },
			autoRotateDelay: { value: 6, min: 1, max: 10 },

			enableZoom: true,
			zoomSpeed: { value: 1. },

			enablePan: false,
			panSpeed: { value: .035 },
			maxPan: { value: 35 },

			minDistance: { value: 20, min: 5, max: 50 },
			maxDistance: { value: 35, min: 5, max: 50 },

			minAngle: { value: -1.25, min: -2, max: 2 },
			maxAngle: { value: 1.25, min: -2, max: 2 }

		} );

		Application.events.add( this );

		this.camera = camera;
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

		this.currentPan = new Vector3();
		this.lerpPan = new Vector3();
		this.initialPan = new Vector3();
		this.deltaPan = new Vector3();

		this.autoRotateDelay = 0;
		this.autoRotate = 0;
		this.isPinching = false;
		this.initialPinchDistance = 0;
		this.initialPinchRadius = 0;

	}

	onReset() {

		Object.assign( this.parameters, {

			rotateSpeed: 4,
			enableRotate: true,
			autoRotate: false,
			enableZoom: true,
			autoRotateSpeed: 1,

			minAngle: -1.25,
			maxAngle: 1.25

		} );

		switch ( this.camera.cameraID ) {

		case 'Radelska':

			this.lerpState.set( 25, .25, 0 );

			Object.assign( this.parameters, {

				autoRotate: true,
				autoRotateDelay: 5,
				autoRotateSpeed: .25,
				enableZoom: false

			} );

			break;

		case 'MiniatureStreetView':

			this.lerpState.set( 1, 0, .75 );

			Object.assign( this.parameters, {

				rotateSpeed: -2,
				autoRotateDelay: 2,
				minDistance: 1,
				maxDistance: 1

			} );

			break;

		case 'VirtualMiniature':

			this.lerpState.set( 25, .75, -.25 );
			this.offsetState.radius = 0;
			this.offsetState.phi = .55 - this.lerpState.phi;
			this.offsetState.theta = 0 - this.lerpState.theta;

			Object.assign( this.parameters, {

				autoRotate: true,
				minAngle: .25,
				maxAngle: 1,
				minDistance: 20,
				maxDistance: 35

			} );

			break;

		case 'Photogrammetry':

			this.lerpState.set( 50, 0, 0 );

			Object.assign( this.parameters, {

				rotateSpeed: 2,
				enableRotate: true,
				autoRotate: true,
				enableZoom: true,

				minDistance: 25,
				maxDistance: 75

			} );

			break;

		case 'Cosmos':

			this.lerpState.set( 600, .5, .5 );
			this.currentState.set( 600, .5, .5 );

			this.offsetState.radius = 750;
			this.offsetState.phi = -.75;
			this.offsetState.theta = -2.75;

			this.currentPan.y = -200;
			this.lerpPan.y = -200;

			Object.assign( this.parameters, {

				rotateSpeed: 5,
				zoomSpeed: 25,
				minAngle: .15,
				maxAngle: .65,
				minDistance: 500,
				maxDistance: 750,
				autoRotate: true,
				autoRotateDelay: 3

			} );

			break;

		case 'World':

			this.lerpState.set( 50, .75, 0 );

			Object.assign( this.parameters, {

				enableRotate: false,
				enablePan: true,
				rotateSpeed: 5,
				zoomSpeed: 5,
				minAngle: .25,
				minDistance: 25,
				maxDistance: 100

			} );

			break;

		case 'Default':

			this.lerpState.set( 25, 0, 0 );

			Object.assign( this.parameters, {

				enableRotate: false,
				enableZoom: false,

			} );

			break;

		case 'Sphere':

			this.lerpState.set( 25, 0, 0 );

			Object.assign( this.parameters, {

				autoRotate: true,

				autoRotateSpeed: .125,
				rotateSpeed: -2.5,
				zoomSpeed: 5,

				autoRotateDelay: 10,
				minAngle: -1,
				maxAngle: 1,

				minDistance: 15,
				maxDistance: 35

			} );

			break;

		case 'ColorRange':

			this.lerpState.set( 18.75, 0, 0 );

			Object.assign( this.parameters, {

				autoRotate: true,

				autoRotateSpeed: .125,
				rotateSpeed: 2.5,
				zoomSpeed: 5,

				autoRotateDelay: 10,
				minAngle: -1,
				maxAngle: 1,

				minDistance: 12,
				maxDistance: 35

			} );

			break;

		}

	}

	onPreFrame() {

		this.isEnabled = Application.camera === this.camera;

	}

	onUpdate() {

		if ( ! this.isEnabled ) return;

		const {

			enablePan,
			enableRotate,
			dampingFactor,
			autoRotate,
			autoRotateSpeed,
			autoRotateDelay

		} = this.parameters;

		if ( autoRotate ) {

			this.autoRotateDelay += Application.time.deltaTime;
			this.autoRotate = this.autoRotateDelay > autoRotateDelay * 1e3 ?
				Math.lerp( this.autoRotate, -1e-3, .01 ) : 0;

			this.currentState.theta += this.autoRotate * autoRotateSpeed;

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

		this.lerpPan.lerp( this.currentPan, .05 );

		const vectorA = Vector3.get().setFromSpherical( this.currentState );
		const vectorB = Vector3.get().setFromSpherical( this.lerpState );
		this.isActive = vectorA.distanceTo( vectorB ) > .01;
		Vector3.release( vectorA, vectorB );

		if ( enablePan || enableRotate ) {

			Application.store.set( 'grab', ! this.isGrabbed );
			Application.store.set( 'grabbing', this.isGrabbed );

		}

	}

	onPostUpdate() {

		if ( ! this.isEnabled ) return;

		const { offset, target } = this.camera.parameters;

		offset.x = this.offset.x + this.lerpPan.x;
		offset.y = this.offset.y + this.lerpPan.y;
		offset.z = this.offset.z + this.lerpPan.z;

		target.x = this.lerpPan.x;
		target.y = this.lerpPan.y;
		target.z = this.lerpPan.z;

	}

	async onModeChange() {

		if ( this.camera.cameraID !== 'Cosmos' ) return;

		this.onReset();

		if ( this.wasClickedOnce ) Application.events.dispatch( 'onCosmosAnimation' );

	}

	async onCosmosAnimation() {

		if ( this.animation ) this.animation.remove( this.offsetState );

		this.animation = anime( {

			targets: [ this.offsetState, this.lerpPan, this.currentPan ],
			easing: 'easeInOutExpo',
			duration: 3500,
			delay: 250,
			y: 0,
			radius: 0,
			phi: 0,
			theta: 0

		} );

	}

	async onViewChange() {

		this.onReset();
		this.onModeChange();

		this.currentState.copy( this.lerpState );
		this.autoRotateDelay = 0;

		if ( Application.store.path === '/virtual-miniature' ) {

			await anime( {

				targets: this.offsetState,
				easing: 'easeInOutExpo',
				duration: 9000,
				delay: 3000,
				radius: 0,
				phi: 0,
				theta: 0

			} ).finished;

			anime( {

				targets: this,
				easing: 'easeOutExpo',
				duration: 15000,
				speedFactor: 1

			} );

		}

	}

	onInputStart( event ) {

		if ( ! this.isEnabled || ! this.isOverCanvas( event ) ) return;
		if ( ! Application.store[ 'particle-archive-entered' ] && this.camera.cameraID === 'ColorRange' ) return;

		if ( event.touches?.length >= 2 && this.parameters.enableZoom ) {

			this.isPinching = true;
			this.initialPinchDistance = this.getTouchDistance( event );
			this.initialPinchRadius = this.currentState.radius;
			this.autoRotateDelay = 0;
			return;

		}

		if ( this.camera.cameraID === 'Cosmos' && ! this.wasClickedOnce ) {

			this.wasClickedOnce = true;
			Application.events.dispatch( 'onCosmosAnimation' );

		}

		this.initialState.copy( this.currentState );
		this.initialPan.copy( this.currentPan );

		Application.pointer.getCoordinates( this.initialState.position );

		this.deltaState.copy( this.initialState );
		this.deltaPan.copy( this.initialPan );
		this.isGrabbed = true;

		this.setDelta();

	}

	onInputMove( event ) {

		if ( ! this.isEnabled ) return;
		if ( ! Application.store[ 'particle-archive-entered' ] && this.camera.cameraID === 'ColorRange' ) {

			this.isGrabbed = false;
			return;

		}

		if ( this.isPinching ) {

			if ( ! event?.touches?.length || event.touches.length < 2 ) return;
			if ( ! this.parameters.enableZoom ) return;

			const distance = this.getTouchDistance( event );
			const delta = distance - this.initialPinchDistance;
			const radius = this.initialPinchRadius - delta * this.parameters.zoomSpeed * .025;

			this.currentState.radius = Math.clamp(

				radius,
				this.parameters.minDistance,
				this.parameters.maxDistance

			);

			this.autoRotateDelay = 0;
			return;

		}

		const { isPressed } = Application.pointer;
		const { enableRotate, enablePan } = this.parameters;

		if ( ! this.isGrabbed || ! isPressed ) return;

		this.setDelta();

		const { maxPan, panSpeed, rotateSpeed, minAngle, maxAngle } = this.parameters;
		const { width } = Application.viewport;

		if ( enableRotate ) {

			let speedFactor = rotateSpeed * 1e-3;
			speedFactor *= Math.clamp( Math.mapLinear( width, 365, 1500, 1.5, 1 ), 1, 1.5 );

			this.currentState.theta = this.initialState.theta - this.deltaState.position.x * speedFactor;
			this.currentState.phi = this.initialState.phi + this.deltaState.position.y * speedFactor;
			this.currentState.phi = Math.clamp( this.currentState.phi, minAngle, maxAngle );

		}

		if ( enablePan ) {

			this.currentPan.z = this.initialPan.z - this.deltaState.position.y * panSpeed;
			this.currentPan.x = this.initialPan.x - this.deltaState.position.x * panSpeed;
			this.currentPan.x = Math.clamp( this.currentPan.x, -maxPan, maxPan );
			this.currentPan.z = Math.clamp( this.currentPan.z, -maxPan, maxPan );

		}

	}

	onInputEnd() {

		if ( ! this.isEnabled ) return;

		this.isGrabbed = false;
		this.isPinching = false;

	}

	onWheel( event ) {

		if ( ! this.isEnabled || ! this.isOverCanvas( event ) ) return;
		if ( ! Application.store[ 'particle-archive-entered' ] && this.camera.cameraID === 'ColorRange' ) return;
		if ( ! this.parameters.enableZoom ) return;

		const { zoomSpeed } = this.parameters;
		this.currentState.radius += Application.pointer.wheel.y * 1e-2 * zoomSpeed;
		this.currentState.radius = Math.clamp(

			this.currentState.radius,
			this.parameters.minDistance,
			this.parameters.maxDistance

		);

	}

	setDelta() {

		if ( ! this.isEnabled ) return;

		Application.pointer
			.getCoordinates( this.deltaState.position )
			.sub( this.initialState.position );

		this.autoRotateDelay = 0;

	}

	getTouchDistance( event ) {

		if ( ! event?.touches?.length || event.touches.length < 2 ) return 0;

		const [ touchA, touchB ] = event.touches;
		const x = touchA.clientX - touchB.clientX;
		const y = touchA.clientY - touchB.clientY;

		return Math.sqrt( x * x + y * y );

	}

	isOverCanvas( event ) {

		return event.composedPath()[ 0 ].matches( 'canvas, section-type-1, [ model ]' );

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
