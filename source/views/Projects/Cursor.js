import { Vector2, Color } from 'three';

export default class Cursor extends HTMLElement {

	onConnected() {

		this.position = new Vector2();

		Application.cursor = this;

	}

	onDisconnected() {

		Application.cursor = null;

	}

	onViewChange() {

		this.reset();

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

		this.parameters = null;
		this.removeAttribute( 'visible' );

	}

	set( parameters = {} ) {

		if ( this.parameters === parameters ) return;
		this.parameters = parameters;

		const { projects } = Application.content;
		const project = projects.find( project => project.path === parameters.path );
		const index = projects.indexOf( project );
		const number = ( '00' + ( index + 1 ) ).substr( -2 );

		const { color, code, title, caption, tags } = this.elements;
		title.innerHTML = `${ project.title } <span>| ${ number }</span>`;
		caption.innerHTML = parameters.caption;
		tags.innerHTML = parameters.tags
			.map( tag => html`<span>${ tag }</span>` )
			.join( ', ' );

		color.style.display = parameters.hex ? '' : 'none';
		color.style.background = parameters.hex;
		code.innerHTML = parameters.hex;

		const hsl = {};
		const colorA = Color.get();

		colorA.
			set( parameters.hex )
			.getHSL( hsl );

		Color.release( colorA );

		const textColor = hsl.l > .5 ? 'var( --color-black )' : 'var( --color-white )';
		color.style.setProperty( '--color', textColor );

		this.toggleAttribute( 'visible', true );

	}

	static render() {

		css`

		projects-cursor {
			position: fixed;
			top: 0;
			left: 0;
			background-color: var( --background-color );
			border: var( --border-size ) solid var( --border-color );
			display: flex;
			justify-content: center;
			align-items: stretch;
			opacity: 0;

			@media ( hover: hover ) {
				canvas-block:hover ~ projects-view &[ visible ] {
					opacity: 1;
				}
			}

			& h3 {
				font-family: var( --font-family-c );
				font-size: var( --font-size-xs );
				width: initial;
				font-weight: bold;
				/* margin-bottom: 2px; */

				& span {
					font-family: var( --font-family-b );
					font-size: .9em;
					opacity: .25;
					display: none;
				}
			}

			& h4 {
				margin-top: 4px;
				font-family: var( --font-family-c );
				font-size: var( --font-size-xs );
				max-width: 400px;

				& span {
					display: inline-block;
				}
			}

			& h5 {
				margin-top: 4px;
				font-family: var( --font-family-c );
				font-size: var( --font-size-xs );
				opacity: .5;
			}

		}

		cursor-content {
			padding: var( --margin-s );
		}

		cursor-number {
			margin-left: var( --margin-m );
			font-size: 3em;
			color: transparent;
			line-height: .65;
			-webkit-text-stroke: 1px rgba( 255, 255, 255, .75);
		}

		cursor-color {
			position: relative;
			padding: var( --margin-s );
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			border-right: var( --border-size ) solid var( --border-color );
			color: var( --color );

			& span {
				display: inline-block;
			}

			& color-code {
				font-size: var( --font-size-s );
				font-family: var( --font-family-c );
			}
		}

		`;

		return html`

		<projects-cursor #cursor blurred-background>

			<cursor-color #color>
				<span>Hex code</span>
				<color-code #code></color-code>
			</cursor-color>

			<cursor-content>
				<h3 #caption>Comparaison: Side by Side View</h3>
				<h4 #tags>Artificial Intelligence, Persian Miniature</h4>
				<h5 #title>Bistami <span>| 01</span></h5>
			</cursor-content>

		</projects-cursor>

		`;

	}

}

customElements.define( 'projects-cursor', Cursor );
