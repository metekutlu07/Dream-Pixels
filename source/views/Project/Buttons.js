import { Vector3 } from 'three';

export default class Buttons extends HTMLElement {

	onConnected() {

		this.content = Application.content.get( 'miniature-street-view' );

	}

	onPreFrame() {

		const { points } = this.content.sections[ 0 ];
		const { buttons } = this.elements;
		const coordinates = Vector3.get();

		buttons.forEach( ( button, index ) => {

			const { positions } = points[ index ];
			const { panorama } = Application.scene;
			const position = positions[ panorama.textureID ];
			button.toggleAttribute( 'visible', !! position );
			button.needsUpdate = false;

			if ( ! position ) return;

			const { camera, viewport } = Application;
			const { width, height } = Application.viewport;

			if ( ! camera.frustum.containsPoint( position ) ) {

				button.toggleAttribute( 'visible', false );
				return;

			}

			coordinates
				.copy( position )
				.project( camera )
				.divideScalar( 2 )
				.multiply( viewport.size );

			const { x, y } = coordinates;

			button.style.transform =
				`translate( ${ width * .5 + x }px, ${ height * .5 + -y }px )` +
				'translate( -50%, -50% )';

		} );

		Vector3.release( coordinates );

	}

	static render( content ) {

		css`

		panorama-buttons {
			pointer-events: none;
			position: fixed;
			height: 100%;
			width: 100%;

			& button {
				top: 0;
				left: 0;
				pointer-events: all;
				position: fixed;
				transition: opacity .5s var( --timing-function );
				opacity: 0;
				display: flex;
				flex-direction: column;
				pointer-events: none;

				&[ clickable ] {
					cursor: pointer;
				}

				&[ visible ] {
					opacity: 1;
					pointer-events: all;
				}
			}

			& img {
				max-width: 250px;

				&:not( :last-child ) {
					margin-bottom: 5px;
				}
			}
		}

		`;

		const innerHTML = content.points.map( point => {

			const attributes = [

				'@click|section-type-5',
				'#buttons|section-type-5',
				'#buttons|panorama-buttons'

			];

			const { title, paragraphs } = point;
			const path = `/public/miniature-street-view/Titles/${ title }`;

			if ( paragraphs ) attributes.push( 'clickable' );

			return html`

				<button ${ attributes.join( ' ' ) }>
					<img src="${ path }/en.png" alt="${ point.title }" onerror='this.style.display = "none"'>
					<img src="${ path }/ot.png" alt="${ point.title }" onerror='this.style.display = "none"'>
					<img src="${ path }/gr.png" alt="${ point.title }" onerror='this.style.display = "none"'>
				</button>

			`;

		} );

		return html`<panorama-buttons>${ innerHTML }</panorama-buttons>`;

	}

}

customElements.define( 'panorama-buttons', Buttons );
