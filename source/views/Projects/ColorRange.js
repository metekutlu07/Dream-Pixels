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

	onPointerDown( event ) {

		const { currentTarget } = event;

		this.handle = currentTarget;
		this.value = parseFloat( currentTarget.getAttribute( 'value' ) );

		const { clientX, clientY } = event.touches ? event.touches[ 0 ] : event;
		this.center = new Vector2( clientX, clientY );

	}

	onInputMove() {

		if ( ! this.handle ) return;

		const { pointer } = Application;
		const coordinates = pointer.getCoordinates( new Vector2() );
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

	}

	onPreFrame() {

		if ( ! this.gradient ) this.onResize();
		if ( ! Application.store.range ) return;

		const { handles } = this.elements;

		handles.forEach( ( handle, index ) => {

			const value = parseFloat( handle.getAttribute( 'value' ) );
			handle.style.transform = `translateY( ${ value * this.height }px )`;
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
		this.context.fillRect( 0, 0, 5, 500 );

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
			opacity: 0;
			transition: opacity 2s var( --timing-function );

			@media ( max-width: 650px ) {
				right: var( --margin-s );
				height: 250px;
			}

			[ view-enter ][ list="particles" ][ particles="color-range" ][ ui-ready ]:not( [ pixel-experience-gate-visible ] ):not( [ pixel-experience-transitioning ] ) & {
				opacity: 1;
				pointer-events: all;
			}

			& canvas {
				position: absolute;
				height: 100%;
				width: 100%;
			}

			& color-range-label {
				position: absolute;
				bottom: calc( 100% + 19px );
				right: 50%;
				transform: translateX( 50% );
				font-family: var( --font-family-a );
				font-size: var( --font-size-m );
				letter-spacing: .08em;
				text-transform: uppercase;
				white-space: nowrap;
			}

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

			&[ grabbed ] {
				cursor: grabbing;
			}

			& span {
				display: none;
			}

			& svg {
				height: 25px;
				width: 25px;
				fill: var( --color-white );
			}
		}

		`;

		return html`

		<projects-color-range>

			<color-range-label>Spectrum</color-range-label>

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

		</projects-color-range>

		`;

	}

}

customElements.define( 'projects-color-range', ColorRange );
