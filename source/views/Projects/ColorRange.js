import Handle from '~/assets/icons/Handle';

export default class ColorRange extends HTMLElement {

	onConnected() {

		const { canvas } = this.elements;
		this.context = canvas.getContext( '2d' );
		this.range = [ 0, 1 ];

	}

	onClick() {
	}

	onPreFrame() {

		if ( ! this.gradient ) this.onResize();

		const { min, max } = this.elements;
		min.style.transform = `translateY( ${ this.range[ 0 ] * this.height }px )`;
		max.style.transform = `translateY( ${ this.range[ 1 ] * this.height }px )`;

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
			right: calc( var( --margin-m ) * 2 );
			top: 0;
			bottom: 0;
			margin: auto;
			width: 5px;
			height: 500px;
			opacity: 0;
			transition: opacity 1s var( --timing-function );

			[ view-exit ][ list="particles" ] & {
				opacity: 0;
			}

			[ view-enter ][ list="particles" ] & {
				opacity: 1;
				transition-delay: .5s;
			}

			& canvas {
				position: absolute;
				height: 100%;
				width: 100%;
			}

			& color-range-handle {
				--size: 24px;
				position: absolute;
				top: calc( var( --size ) * -.5 );
				right: calc( 100% + var( --margin-xs ) );
				height: var( --size );
				width: var( --size );
				cursor: grab;

				svg {
					height: 100%;
					width: 100%;
					fill: var( --color-white );
				}
			}
		}

		`;

		return html`

		<projects-color-range>
			<color-range-handle #min>${ Handle }</color-range-handle>
			<color-range-handle #max>${ Handle }</color-range-handle>
			<canvas #>
		</projects-color-range>

		`;

	}

}

customElements.define( 'projects-color-range', ColorRange );
