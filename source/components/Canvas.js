import { Vector2 } from 'three';

export default class Canvas extends HTMLElement {

	constructor() {

		super();

		window.canvas = this.children[ 0 ];
		this.coordinates = new Vector2();

	}

	onInputStart() {

		this.elapsedTime = Application.time.elapsedTime;
		Application.pointer.getCoordinates( this.coordinates );

	}

	onInputEnd( event ) {

		if ( Application.time.elapsedTime < ( Application.store[ 'block-image-preview-until' ] || 0 ) ) return;

		const currentTarget = event.composedPath()[ 0 ];
		if ( ! currentTarget.matches( 'canvas' ) ) return;

		const imagesIntro = document.querySelector(
			'user-info-text[name="Images"][visible]:not([hidden])'
		);

		if ( imagesIntro ) return;

		const coordinates = Vector2.get();
		Application.pointer.getCoordinates( coordinates );
		Vector2.release( coordinates );

		const deltaTime = Application.time.elapsedTime - this.elapsedTime;
		const distance = this.coordinates.distanceTo( coordinates );

		if ( deltaTime > 250 || distance > 25 ) return;

		const query = 'section-type-5, projects-image-preview';
		const element = document.querySelector( query );

		if ( element ) element.onClick( { currentTarget } );

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
			transition: opacity .45s var( --timing-function );

			[ path="/experiments" ][ list="particles" ]:not( [ pixel-experience-started ] ):not( [ pixel-experience-background-visible ] ) &,
			[ path="/experiments" ][ list="particles" ][ pixel-experience-transitioning ]:not( [ pixel-experience-background-visible ] ) & {
				opacity: 0;
				pointer-events: none;
			}

			[ path="/about" ] &,
			[ path="/mete-kutlu" ] & {
				opacity: 0;
				pointer-events: none;
			}

			@media ( hover: hover ) {

				[ path="/experiments" ][ list="sphere" ] &,
				[ path="/experiments" ][ list="particles" ] & {
					cursor: crosshair;
				}

			}

		}

		`;

		return html`

		<canvas-block @touch-move>
			<canvas></canvas>
		</canvas-block>

		`;

	}

}

customElements.define( 'canvas-block', Canvas );
