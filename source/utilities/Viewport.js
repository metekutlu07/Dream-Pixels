import { Vector2 } from 'three';

export default class Viewport {

	constructor() {

		Application.events.add( this );
		Application.store.add( 'Viewport', {

			width: { object: this, property: 'width' },
			height: { object: this, property: 'height' },
			aspect: { object: this, property: 'aspect', toFixed: 3 },
			pixelRatio: { object: this, property: 'devicePixelRatio' }

		} );

		this.size = new Vector2();

	}

	setSize( width, height ) {

		const { devicePixelRatio } = window;
		const isLocalHost = [ 'localhost', '127.0.0.1' ].includes( window.location.hostname );
		const maxPixelRatio = isLocalHost ? 1.25 : 2;
		const hasChanged = this.width !== width || this.height !== height;

		if ( ! hasChanged ) return;

		this.width = width;
		this.height = height;
		this.aspect = this.width / this.height;
		this.size.set( this.width, this.height );

		this.devicePixelRatio = Math.min( devicePixelRatio || 1, maxPixelRatio );
		this.orientation = this.aspect > 1 ? 'landscape' : 'portrait';

		Application.events.dispatch( 'onResize', this.size );

		this.set100vhFix( this.height );

	}

	set100vhFix( height ) {

		// fix 100vh issue on mobile devices
		const vh = height * 0.01;
		document.documentElement.style.setProperty( '--vh', `${ vh }px` );

	}

	onStart() {

		this.onUpdate();

		Application.events.dispatch( 'onResize' );

	}

	onUpdate() {

		const { innerWidth, innerHeight } = window;
		this.setSize( innerWidth, innerHeight );

	}

}
