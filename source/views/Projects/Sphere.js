import { Vector2 } from 'three';

export default class Sphere extends HTMLElement {

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
		cursor.style.opacity = opacity;

		const { project } = Application.store;
		cursor.toggleAttribute( 'visible', project );
		if ( project ) this.setContent( project );

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

		projects-sphere {
			position: absolute;
			height: var( --viewport-height );
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			top: 0;
			left: 0;
			opacity: 0;
			transition: opacity 1s var( --timing-function );
			pointer-events: none;

			[ list="sphere" ] & {
				opacity: 1;
			}
		}

		projects-rectangle {
			position: relative;
			width: calc( 100% - var( --margin-m ) * 2 );
			height: calc( 100% - var( --margin-m ) * 2 );
			display: flex;
			justify-content: center;
			align-items: center;
			border: var( --border-size ) solid rgba( 255, 255, 255, .25);

			@media ( max-width: 768px ) {
				width: calc( 100% - var( --margin-s ) * 2 );
				height: calc( 100% - var( --margin-s ) * 2 );
			}
		}

		projects-cursor {
			font-size: var( --font-size-l );
			position: absolute;
			top: 0;
			left: 0;
			padding: var( --margin-s );
			background-color: var( --background-color );
			border: var( --border-size ) solid var( --border-color );
			display: none;
			justify-content: space-between;
			align-items: center;

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

		return html`

		<projects-sphere @click>
			<projects-rectangle></projects--rectangle>
			<projects-cursor #cursor blurred-background>
				<h3 font-style-title>
					<span #title></span><br/>
					<span #subtitle></span>
				</h3>
				<cursor-number #index></cursor-number>
			</projects-cursor>
		</projects-sphere>

		`;

	}

}

customElements.define( 'projects-sphere', Sphere );
