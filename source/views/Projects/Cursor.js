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

		if ( ! this.hasAttribute( 'visible' ) ) return;
		Application.router.navigate( `/${ this.path }` );

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

	set( path, caption, tags ) {

		this.path = path;

		const { projects } = Application.content;
		const project = projects.find( project => project.path === path );
		const index = projects.indexOf( project );

		const title = project.title;
		const number = ( '00' + ( index + 1 ) ).substr( -2 );

		this.elements.title.innerHTML = `${ title } <span>| ${ number }</span>`;
		this.elements.caption.innerHTML = caption;
		this.elements.tags.innerHTML = tags.join( ', ' );

		this.setAttribute( 'visible', '' );

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
				font-size: var( --font-size-l );
				width: initial;
				margin-bottom: 2px;

				& span {
					font-family: var( --font-family-b );
					font-size: .9em;
					opacity: .25;
				}
			}

			& h4 {
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );
				margin-bottom: 4px;
			}

			& h5 {
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

		`;

		return html`

		<projects-cursor @click #cursor blurred-background>
			<h3 #title>Bistami <span>| 01</span></h3>
			<h4 #caption>Comparaison: Side by Side View</h4>
			<h5 #tags>Artificial Intelligence, Persian Miniature</h5>
		</projects-cursor>

		`;

	}

}

customElements.define( 'projects-cursor', Cursor );
