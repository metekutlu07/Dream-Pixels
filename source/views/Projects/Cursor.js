import { Vector2 } from 'three';

export default class Cursor extends HTMLElement {

	onConnected() {

		this.position = new Vector2();

		Application.cursor = this;

	}

	onDisconnected() {

		Application.cursor = null;

	}

	onClick() {

		// if ( ! this.hasAttribute( 'visible' ) ) return;
		// Application.router.navigate( `/${ this.path }` );

	}

	onUpdate() {

		const { cursor } = this.elements;
		const { pointer } = Application;

		const coordinates = pointer.getCoordinates( Vector2.get() );
		this.position.lerp( coordinates, .1 );
		Vector2.release( coordinates );

		const { x, y } = this.position;
		cursor.style.transform = `translate( ${ x + 10 }px, ${ y + 10 }px )`;

	}

	reset() {

		this.removeAttribute( 'visible' );

	}

	set( parameters = {} ) {

		this.path = parameters.path;

		const { projects } = Application.content;
		const project = projects.find( project => project.path === parameters.path );
		const index = projects.indexOf( project );
		const number = ( '00' + ( index + 1 ) ).substr( -2 );

		const { color, hex, code, title, caption, tags } = this.elements;
		title.innerHTML = `${ project.title } <span>| ${ number }</span>`;
		caption.innerHTML = parameters.caption;
		tags.innerHTML = parameters.tags.join( ', ' );

		color.style.display = parameters.hex ? '' : 'none';
		hex.style.background = parameters.hex;
		code.innerHTML = parameters.hex;

		this.toggleAttribute( 'visible', true );

	}

	static render() {

		css`

		projects-cursor {
			position: fixed;
			top: 0;
			left: 0;
			padding: var( --margin-s );
			background-color: var( --background-color );
			border: var( --border-size ) solid var( --border-color );
			justify-content: space-between;
			align-items: center;
			visibility: hidden;

			@media ( hover: hover ) {
				canvas-block:hover ~ projects-view &[ visible ] {
					visibility: visible;
				}
			}

			& h3 {
				font-family: var( --font-family-a );
				font-size: var( --font-size-m );
				width: initial;
				margin-bottom: 2px;

				& span {
					font-family: var( --font-family-b );
					font-size: .9em;
					opacity: .25;
					display: none;
				}
			}

			& h4 {
				font-family: var( --font-family-c );
				font-size: var( --font-size-xs );
			}

			& h5 {
				margin-top: 5px;
				font-family: var( --font-family-c );
				font-size: var( --font-size-xs );
				opacity: .5;
			}
		}

		cursor-number {
			margin-left: var( --margin-m );
			font-size: 3em;
			color: transparent;
			line-height: .65;
			-webkit-text-stroke: 1px rgba( 255, 255, 255, .75);
		}

		cursor-color {
			display: flex;
			align-items: center;
			margin-bottom: 5px;

			& color-hex {
				width: 15px;
				height: 15px;
				margin-right: 5px;
				border: var( --border-size ) solid var( --border-color );
			}

			& color-code {
				font-size: var( --font-size-xs );
				font-family: var( --font-family-c );
			}
		}

		`;

		return html`

		<projects-cursor @click #cursor blurred-background>
			<cursor-color #color>
				<color-hex #hex></color-hex>
				<color-code #code></color-code>
			</cursor-color>
			<h3 #caption>Comparaison: Side by Side View</h3>
			<h4 #tags>Artificial Intelligence, Persian Miniature</h4>
			<h5 #title>Bistami <span>| 01</span></h5>
		</projects-cursor>

		`;

	}

}

customElements.define( 'projects-cursor', Cursor );
