import { Vector2 } from 'three';

export default class Cursor extends HTMLElement {

	onConnected() {

		this.position = new Vector2();

	}

	onClick() {

		const { project } = Application.store;
		if ( ! project ) return;
		Application.router.navigate( `/${ project.path }` );

	}

	onUpdate() {

		const { cursor } = this.elements;
		const { pointer } = Application;

		const coordinates = pointer.getCoordinates( Vector2.get() );
		this.position.lerp( coordinates, .1 );
		Vector2.release( coordinates );

		const { x, y } = this.position;
		const distance = this.position.distanceTo( coordinates );
		const opacity = Math.clamp( 1 - distance / 200, 0, 1 );

		cursor.style.transform = `translate( ${ x + 10 }px, ${ y + 10 }px )`;
		// cursor.style.opacity = opacity;

		// const { project } = Application.store;
		// cursor.toggleAttribute( 'visible', project );
		// if ( project ) this.setContent( project );

	}

	setContent( project ) {

		const { title, subtitle, index } = this.elements;

		if ( project.title === title.textContent ) return;

		title.textContent = project.title;
		subtitle.textContent = project.subtitle;
		index.textContent = project.index + 1;

		Application.audio.play( '007.mp3', { volume: .1 } );

	}

	static render() {

		css`

		projects-cursor {
			/* font-size: var( --font-size-l ); */
			position: fixed;
			top: 0;
			left: 0;
			padding: var( --margin-s );
			background-color: var( --background-color );
			border: var( --border-size ) solid var( --border-color );
			/* display: none; */
			justify-content: space-between;
			align-items: center;

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

			@media ( hover: hover ) {
				&[ visible ] {
					display: flex;
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

		`;

		const {

			title,
			subtitle,
			path,
			location,
			date

		} = Application.content.projects[ 0 ];

		const { projects } = Application.content;
		const index = projects.findIndex( project => project.path === path );
		const number = ( '00' + ( index + 1 ) ).substr( -2 );

		return html`

		<projects-cursor @click #cursor blurred-background>
			<item-footer>
				<item-description>
					<h3>${ title }<span>| ${ number }</span></h3>
					<h4>${ subtitle }</h4>
					<h5> ${ location }, ${ date }</h5>
				</item-description>
			</item-footer>
		</projects-cursor>

		`;

	}

}

customElements.define( 'projects-cursor', Cursor );
