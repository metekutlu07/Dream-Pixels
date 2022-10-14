export default class Canvas extends HTMLElement {

	constructor() {

		super();

		window.canvas = this.children[ 0 ];

	}

	onClick( event ) {

		const query = 'section-type-5, projects-sphere';
		const element = document.querySelector( query );
		if ( element ) element.onClick( event );
		if ( Application.cursor ) Application.cursor.onClick( event );

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

			@media ( hover: hover ) {

				[ path="/projects" ][ list="sphere" ] &,
				[ path="/projects" ][ list="particles" ] & {
					cursor: crosshair;
				}

			}

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
