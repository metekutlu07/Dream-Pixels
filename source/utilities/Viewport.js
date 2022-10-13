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
		const hasChanged = this.width !== width || this.height !== height;

		if ( ! hasChanged ) return;

		this.width = width;
		this.height = height;
		this.aspect = this.width / this.height;
		this.size.set( this.width, this.height );

		this.devicePixelRatio = devicePixelRatio || 1;
		this.orientation = this.aspect > 1 ? 'landscape' : 'portrait';

		Application.store.set( '--viewport-height', `${ height }px` );
		Application.events.dispatch( 'onResize', this.size );

	}

	onStart() {

		this.onUpdate();

		Application.events.dispatch( 'onResize' );

	}

	onUpdate() {

		const { innerWidth, innerHeight } = window;
		this.setSize( innerWidth, innerHeight );

		const scrollTop = document.body.scrollTop;
		const x = innerWidth * .5;
		const y = innerHeight * .5 + scrollTop;
		Application.store.set( '--transform-origin', `${ x }px ${ y }px` );


	}

}
