import { Vector2 } from 'three';

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

		event.preventDefault();
		event.stopPropagation();

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
			handle.style.transform = `translate( -50%, ${ value * this.height }px )`;
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
			width: 132px;
			height: 470px;
			padding: 16px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			gap: 16px;
			border: var( --border-size ) solid var( --border-color );
			background: rgba( 0, 0, 0, .28 );
			backdrop-filter: blur( 10px );
			-webkit-backdrop-filter: blur( 10px );
			box-sizing: border-box;
			opacity: 0;
			transition: opacity 2s var( --timing-function );
			touch-action: none;

			@media ( max-width: 650px ) {
				right: var( --margin-s );
				width: 104px;
				height: 320px;
				padding: 14px;
				gap: 14px;
			}

			[ view-enter ][ list="particles" ][ particles="color-range" ][ ui-ready ]:not( [ pixel-experience-gate-visible ] ):not( [ pixel-experience-transitioning ] ) & {
				opacity: 1;
				pointer-events: all;
			}

			& canvas {
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				pointer-events: none;
			}

			& color-range-track {
				position: relative;
				width: 44px;
				flex: 1;
				display: flex;
				justify-content: center;
				pointer-events: all;
			}

		}

		color-range-header {
			width: calc( 100% + 32px );
			margin: -16px -16px 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 12px;

			@media ( max-width: 650px ) {
				width: calc( 100% + 28px );
				margin: -14px -14px 0;
			}
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
			padding: 16px 16px 0;

			@media ( max-width: 650px ) {
				font-size: var( --font-size-xs );
				padding: 14px 14px 0;
			}
		}

		color-range-divider {
			width: 100%;
			height: 1px;
			background: rgba( 255, 255, 255, .75 );
		}

		color-range-handle {
			--size: 36px;
			position: absolute;
			top: calc( var( --size ) * -.5 );
			left: 50%;
			width: 72px;
			height: var( --size );
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: grab;
			transform: translateX( -50% );
			pointer-events: all;
			z-index: 2;

			&[ grabbed ] {
				cursor: grabbing;
			}

			& span {
				position: relative;
				display: block;
				width: 26px;
				height: 3px;
				background: var( --color-white );

				&::before,
				&::after {
					content: '';
					position: absolute;
					top: 50%;
					transform: translateY( -50% );
					width: 0;
					height: 0;
					border-top: 6px solid transparent;
					border-bottom: 6px solid transparent;
				}

				&::before {
					left: -6px;
					border-left: 8px solid var( --color-white );
				}

				&::after {
					right: -6px;
					border-right: 8px solid var( --color-white );
				}
			}
		}

		color-range-band {
			position: relative;
			width: 5px;
			height: 100%;
			display: block;
		}

		`;

		return html`

		<projects-color-range blurred-background>

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
					</color-range-handle>

					<color-range-handle
						value="1"
						#handles
						@touch-start
						@mouse-down
					>
						<span></span>
					</color-range-handle>

					<canvas #>
				</color-range-band>
			</color-range-track>

		</projects-color-range>

		`;

	}

}

customElements.define( 'projects-color-range', ColorRange );
