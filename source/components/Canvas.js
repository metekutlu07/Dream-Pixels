export default class Canvas extends HTMLElement {

	constructor() {

		super();

		window.canvas = this.children[ 0 ];

	}

	onClick( event ) {

		const section = document.querySelector( 'section-type-5' );
		if ( section ) section.onClick( event );

		const sphere = document.querySelector( 'projects-sphere' );
		if ( sphere ) sphere.onClick( event );

	}

	onTouchMove( event ) {

		event.preventDefault();

	}

	static render() {

		css`

		canvas-block {
			position: fixed;
			margin: auto;
			top: 0;
			left: 0;
		}

		`;

		return html`

		<canvas-block @touch-move @click>
			<canvas>
		</canvas-block>

		`;

	}

}

customElements.define( 'canvas-block', Canvas );
