import { Vector2, Vector3, Color } from 'three';

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
		if ( ! cursor ) return;

		const { pointer, camera } = Application;

		if ( this.parameters && this.parameters.mode === 'particle' ) {

			const { labelTitle, ring, label } = this.elements;
			if ( ! labelTitle || ! ring || ! label ) return;
			const position = Vector3.get().copy( this.parameters ).project( camera );
			const { size } = Application.viewport;

			position.y *= -1;
			position
				.addScalar( 1 )
				.divideScalar( 2 )
				.multiply( size );

			cursor.style.transform = `translate( ${ position.x }px, ${ position.y }px )`;
			labelTitle.textContent = this.parameters.title || '';
			ring.style.display = '';
			label.style.display = '';
			Vector3.release( position );
			return;

		}

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

		const { ring, label, card } = this.elements;
		if ( ! ring || ! label || ! card ) return;

		if ( parameters.mode === 'particle' ) {

			ring.style.display = '';
			label.style.display = '';
			card.style.display = 'none';
			this.toggleAttribute( 'visible', true );
			return;

		}

		const { projects } = Application.content;
		const project = projects.find( project => project.path === parameters.path );
		if ( ! project ) return;
		const index = projects.indexOf( project );
		const number = index + 1;

		const { color, code, cardTitle, caption, tags } = this.elements;
		if ( ! color || ! code || ! cardTitle || ! caption || ! tags ) return;
		cardTitle.innerHTML = `${ project.title } <span>| ${ number }</span>`;
		caption.innerHTML = parameters.caption || '';
		tags.innerHTML = ( parameters.tags || [] )
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
		ring.style.display = 'none';
		label.style.display = 'none';
		card.style.display = '';

		this.toggleAttribute( 'visible', true );

	}

	static render() {

		css`

		projects-cursor {
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			opacity: 0;
			pointer-events: none;

			@media ( hover: hover ) {
				canvas-block:hover ~ projects-view &[ visible ] {
					opacity: 1;
				}
			}

			cursor-card {
				background-color: var( --background-color );
				border: var( --border-size ) solid var( --border-color );
				display: flex;
				justify-content: center;
				align-items: stretch;
				max-width: 450px;
			}

			cursor-content {
				padding: var( --margin-s ) var(--margin-s) var(--margin-xs);

				& h3 {
					font-family: var( --font-family-c );
					font-size: var( --font-size-xs );
					font-weight: bold;

					& span {
						font-family: var( --font-family-b );
						font-size: .9em;
						opacity: .25;
						display: none;
					}
				}

				& h4 {
					margin-top: 6px;
					font-family: var( --font-family-c );
					font-size: var( --font-size-xs );
					font-style: italic;
					opacity: .5;

					& span {
						display: inline-block;
					}
				}

				& h5 {
					margin-top: 8px;
					font-family: var( --font-family-c );
					font-size: var( --font-size-m );
					font-weight: bold;
					text-align: right;
				}
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

		cursor-ring {
			position: absolute;
			width: 18px;
			height: 18px;
			border: 1px solid rgba( 255, 255, 255, .95 );
			border-radius: 50%;
			display: none;
			transform: translate( -50%, -50% );
		}

		cursor-label {
			position: absolute;
			top: calc( 100% + 10px );
			left: 50%;
			transform: translateX( -50% );
			display: none;
			font-family: var( --font-family-b );
			font-size: var( --font-size-m );
			font-weight: normal;
			text-align: center;
			white-space: nowrap;
			text-shadow: 0 0 12px rgba( 0, 0, 0, .9 );
		}

		`;

		return html`

		<projects-cursor #cursor>

			<cursor-ring #ring></cursor-ring>
			<cursor-label #label>
				<h5 #labelTitle></h5>
			</cursor-label>

			<cursor-card #card blurred-background>
				<cursor-color #color>
					<span>Hex code</span>
					<color-code #code></color-code>
				</cursor-color>

				<cursor-content>
					<h3 #caption>Comparaison: Side by Side View</h3>
					<h4 #tags>Artificial Intelligence, Persian Miniature</h4>
					<h5 #cardTitle>Bistami <span>| 1</span></h5>
				</cursor-content>
			</cursor-card>

		</projects-cursor>

		`;

	}

}

customElements.define( 'projects-cursor', Cursor );
