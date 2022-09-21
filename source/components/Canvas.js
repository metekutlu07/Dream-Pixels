export default class Canvas extends HTMLElement {

	constructor() {

		super();

		window.canvas = this.children[ 0 ];

	}

	onTouchMove( event ) {

		event.preventDefault();

	}

	static render() {

		css`

		canvas-block {
			position: fixed;
			z-index: -1;
			margin: auto;
			top: 0;
			left: 0;
		}

		`;

		return html`

		<canvas-block @touch-move>
			<canvas>
		</canvas-block>

		`;

	}

}

customElements.define( 'canvas-block', Canvas );
