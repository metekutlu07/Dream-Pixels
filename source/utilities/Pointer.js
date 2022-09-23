import { Euler, Vector2 } from 'three';

export default class Pointer {

	constructor() {

		Application.events.bind( this );

		const parameters = { passive: false };

		addEventListener( 'keyup', this.onKeyUp );
		addEventListener( 'keydown', this.onKeyDown );

		addEventListener( 'click', this.onClick );
		addEventListener( 'mousedown', this.onMouseDown );
		addEventListener( 'mousemove', this.onMouseMove );
		addEventListener( 'mouseup', this.onMouseUp );
		addEventListener( 'mouseleave', this.onUp );

		addEventListener( 'touchstart', this.onTouchStart, parameters );
		addEventListener( 'touchmove', this.onTouchMove, parameters );
		addEventListener( 'touchend', this.onTouchEnd, parameters );
		addEventListener( 'gesturestart', this.preventGesture, parameters );

		addEventListener( 'mousewheel', this.onWheel, parameters );
		addEventListener( 'deviceorientation', this.onDeviceOrientation );

		this.buttons = [ 'main', 'auxiliary', 'secondary' ];
		this.hasHover = matchMedia( '(hover: hover)' ).matches;
		this.hasFirstInput = false;

		this.orientation = new Euler();
		this.wheel = new Vector2();
		this.mouse = new Vector2();

		this.touches = {};
		this.keys = {};

	}

	getCoordinates( target, normalize ) {

		const touch = Object.values( this.touches ).pop();
		target.copy( touch || this.mouse );

		if ( normalize ) {

			const { size } = Application.viewport;
			target.x = Math.mapLinear( target.x, 0, size.x, -1, 1 ),
			target.y = Math.mapLinear( target.y, 0, size.y, 1, -1 );

		}

		return target;

	}

	onFirstInput() {

		if ( this.hasFirstInput ) return;
		this.hasFirstInput = true;

		Application.events.dispatch( 'onUserFirstInput' );

	}

	onMouseDown() {

		const { clientX, clientY, button } = event;

		this.button = this.buttons[ button ];
		this.mouse.set( clientX, clientY );

		this.isPressed = true;
		this.onFirstInput();

		Application.events.dispatch( 'onInputStart', event );

	}

	onMouseMove( event ) {

		const { clientX, clientY } = event;
		this.mouse.set( clientX, clientY );

		Application.events.dispatch( 'onInputMove', event );

	}

	onMouseUp() {

		this.isPressed = false;

		Application.events.dispatch( 'onInputEnd', event );

	}

	onTouchStart( event ) {

		Array.from( event.touches ).forEach( event => {

			const { clientX, clientY, identifier } = event;

			const touch = new Vector2( clientX, clientY );
			this.touches[ identifier ] = touch;

		} );

		this.isPressed = true;

		Application.events.dispatch( 'onInputStart', event );

	}

	onTouchMove( event ) {

		Array.from( event.touches ).forEach( event => {

			const { clientX, clientY, identifier } = event;
			const touch = this.touches[ identifier ];
			touch.set( clientX, clientY );

		} );

		Application.events.dispatch( 'onInputMove', event );

	}

	onTouchEnd( event ) {

		Array.from( event.changedTouches ).forEach( event => {

			const { identifier } = event;
			delete this.touches[ identifier ];

		} );

		this.isPressed = !! Object.keys( this.touches ).length;
		this.onFirstInput();

		Application.events.dispatch( 'onInputEnd', event );

	}

	onKeyDown( { key, code } ) {

		this.keys[ code ] = true;

		Application.events.dispatch( 'onKeyDown', { key, code } );

	}

	onKeyUp( { key, code } ) {

		delete this.keys[ code ];
		Application.events.dispatch( 'onKeyUp', { key, code } );

	}

	onWheel( event ) {

		const { deltaX, deltaY } = event;
		this.wheel.set( deltaX, deltaY );

		Application.events.dispatch( 'onWheel', event );

	}

	onDeviceOrientation( event ) {

		const { gamma, beta, orientation } = event;

		switch ( orientation ) {

		case 0: this.orientation.set( gamma, -beta, 0 ); break;
		case 90: this.orientation.set( beta, gamma, 0 ); break;
		case -90: this.orientation.set( -beta, -gamma, 0 ); break;

		}

	}

	preventGesture( event ) {

		event.preventDefault();

	}

}
