import { Vector2 } from 'three';

import Handle from '~/assets/icons/Handle';

export default class ColorRange extends HTMLElement {

	onConnected() {

		const { canvas } = this.elements;
		this.context = canvas.getContext( '2d' );

	}

	onMouseDown( event ) {

		this.onPointerDown( event );

	}

	onTouchStart( event ) {

		this.onPointerDown( event );

	}

	onTouchMove( event ) {

		if ( ! this.handle ) return;

		event.preventDefault();
		this.onInputMove( event );

	}

	onTouchEnd( event ) {

		this.onInputEnd( event );

	}

	onPointerDown( event ) {

		event.preventDefault();
		event.stopPropagation();

		const { currentTarget } = event;

		this.handle = currentTarget;
		this.value = parseFloat( currentTarget.getAttribute( 'value' ) );
		this.touchIdentifier = event.touches?.[ 0 ]?.identifier;

		const { clientX, clientY } = event.touches ? event.touches[ 0 ] : event;
		this.center = new Vector2( clientX, clientY );

	}

	onInputMove( event ) {

		if ( ! this.handle ) return;

		let coordinates = null;

		if ( event?.touches?.length ) {

			const touch = Array
				.from( event.touches )
				.find( touch => touch.identifier === this.touchIdentifier ) || event.touches[ 0 ];

			if ( touch ) coordinates = new Vector2( touch.clientX, touch.clientY );

		}

		if ( ! coordinates ) coordinates = Application.pointer.getCoordinates( new Vector2() );
		const delta = coordinates.sub( this.center );

		const { handles } = this.elements;
		const index = handles.indexOf( this.handle );
		const values = handles.map( handle => parseFloat( handle.getAttribute( 'value' ) ) );
		const min = index ? values[ 0 ] + .075 : 0;
		const max = index ? 1 : values[ 1 ] - .075;

		let value = this.value + delta.y / this.height;
		value = Math.clamp( value, parseFloat( min ), parseFloat( max ) );

		this.handle.setAttribute( 'value', value );

	}

	onInputEnd() {

		this.handle = null;
		this.touchIdentifier = null;

	}

	onPreFrame() {

		if ( ! this.gradient ) this.onResize();
		if ( ! Application.store.range ) return;

		const { handles } = this.elements;

		handles.forEach( ( handle, index ) => {

			const value = parseFloat( handle.getAttribute( 'value' ) );
			handle.style.transform = `translateY( ${ value * this.height }px )`;
			handle.children[ 0 ].textContent = Math.round( value * 360 ) + '°';
			handle.toggleAttribute( 'grabbed', handle === this.handle );

			Application.store.range[ index ] = value;

		} );

	}

	onResize() {

		const steps = 360;

		const { canvas } = this.elements;
		this.width = canvas.clientWidth;
		this.height = canvas.clientHeight;

		canvas.width = this.width;
		canvas.height = this.height;

		if ( this.width === 0 || this.height === 0 ) return;

		this.gradient = this.context.createLinearGradient( 0, 0, 0, this.height );

		for ( let i = 0; i < steps; i++ ) {

			const step = i / steps;
			const hue = Math.round( step * 360 );
			const hsl = `hsl( ${ hue }, 85%, 55% )`;
			this.gradient.addColorStop( step, hsl );

		}

		this.context.fillStyle = this.gradient;
		this.context.fillRect( 0, 0, this.width, this.height );

	}

	static render() {

		css`

		projects-color-range {
			position: fixed;
			right: var( --margin-m );
			top: 0;
			bottom: 0;
			margin: auto;
			width: 5px;
			height: 500px;
			display: none;
			opacity: 0;
			transition: opacity 1s var( --timing-function );
			touch-action: none;

			@media ( max-width: 650px ) {
				right: var( --margin-s );
				width: 5px;
				height: 320px;
			}

			[ view-enter ][ list="particles" ][ particles="color-range" ] & {
				display: flex;
			}

			[ view-enter ][ list="particles" ][ particles="color-range" ][ pixel-experience-started ][ ui-ready ]:not( [ pixel-experience-gate-visible ] ):not( [ pixel-experience-transitioning ] ) & {
				display: flex;
				opacity: 1;
				pointer-events: all;
			}

			& canvas {
				position: absolute;
				height: 100%;
				width: 100%;
				pointer-events: none;
			}

		}

		color-range-track {
			position: relative;
			width: 5px;
			height: 100%;
			display: block;
			pointer-events: all;
		}

		color-range-header {
			position: absolute;
			right: 0;
			top: calc( 100% + 33px );
			display: block;
		}

		color-range-label {
			font-family: var( --font-family-c );
			font-size: var( --font-size-m );
			font-weight: normal;
			letter-spacing: .04em;
			text-transform: uppercase;
			white-space: nowrap;
			text-align: center;
			line-height: 1;
			padding: 0;

			@media ( max-width: 650px ) {
				font-size: var( --font-size-xs );
				display: none;
			}
		}

		color-range-divider {
			display: none;
		}

		color-range-handle {
			--size: 24px;
			position: absolute;
			top: calc( var( --size ) * -.5 );
			right: calc( 100% + var( --margin-xs ) );
			display: flex;
			align-items: center;
			cursor: grab;
			border: var( --border-size ) solid var( --border-color );
			pointer-events: all;
			z-index: 2;
			touch-action: none;

			&[ grabbed ] {
				cursor: grabbing;
			}

			& span {
				display: block;
				padding: 5px 8px;
				font-family: var( --font-family-a );
				font-size: var( --font-size-s );
				border-right: var( --border-size ) solid var( --border-color );
				white-space: nowrap;
			}

			& svg {
				height: 25px;
				width: 25px;
				fill: var( --color-white );
			}

			@media ( max-width: 650px ) {
				right: calc( 100% + 8px );

				& span {
					padding: 4px 7px;
					font-size: var( --font-size-xs );
				}

				& svg {
					height: 22px;
					width: 22px;
				}
			}
		}

		color-range-band {
			display: contents;
		}

		`;

		return html`

		<projects-color-range @touch-move @touch-end>

			<color-range-header>
				<color-range-label>Spectrum</color-range-label>
				<color-range-divider></color-range-divider>
			</color-range-header>
			<color-range-track>
				<color-range-band>
					<color-range-handle
						value="0"
						#handles
						@touch-start
						@mouse-down
					>
						<span></span>
						${ Handle }
					</color-range-handle>

					<color-range-handle
						value="1"
						#handles
						@touch-start
						@mouse-down
					>
						<span></span>
						${ Handle }
					</color-range-handle>

					<canvas #>
				</color-range-band>
			</color-range-track>

		</projects-color-range>

		`;

	}

}

customElements.define( 'projects-color-range', ColorRange );
