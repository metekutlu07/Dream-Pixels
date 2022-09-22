import { Vector3 } from 'three';

import Button from '~/components/Button';
import Eye from '~/assets/icons/Eye';

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
			position: fixed
			height: 100%;
			width: 100%;

			& default-button {
				top: 0;
				left: 0;
				pointer-events: all;
				position: fixed;
				transition: opacity 1s var( --timing-function ) !important;
				display: none;
			}
		}

		`;

		const innerHTML = content.points.map( point => {

			return Button.render( {

				icons: [ Eye ],
				labels: [ point.title ],
				attributes: [
					'@click|section-type-5',
					'#buttons|section-type-5',
					'#buttons|panorama-buttons',
					'label-visible',
				]

			} );

		} );

		return html`<panorama-buttons>${ innerHTML }</panorama-buttons>`;

	}

}

customElements.define( 'panorama-buttons', Buttons );
