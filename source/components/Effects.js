import { Vector2 } from 'three';

export default class Effects extends HTMLElement {

	onUpdate() {

		const { noise_effect } = this.elements;

		const { x, y } = new Vector2()
			.random()
			.multiplyScalar( 100 );

		noise_effect.style.setProperty( '--background-position', `${ x }% ${ y }%` );

	}

	static render() {

		css`

		effects-overlay {
			z-index: 30;
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			pointer-events: none;
			/* display: none; */

			& grid-effect,
			& noise-effect,
			& vignette-effect,
			& lines-effect {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}

			& grid-effect {
				background-image: url( "/public/common/Grid.svg" );
				background-size: 25px;
				background-position: center center;
				transition: transform .5s var( --timing-function ), opacity .5s var( --timing-function );
				transform: scale( 1 );
				opacity: 0;

				[ loading ] & {
					opacity: .25;
					transform: scale( 1.05 );
				}
			}

			& lines-effect {
				background-image: url( "/public/common/Line.svg" );
				background-size: 2px;
				background-position: center center;
				opacity: .25;
			}

			& noise-effect {
				background-image: url( "/public/common/Noise.png" );
				background-position: var( --background-position );
				opacity: .25;
			}

			& vignette-effect {
				background: radial-gradient( rgba( 0, 0, 0, 0 ), rgba( 0, 0, 0, 1 ) );
				opacity: 0;
				transition: all 1s var( --timing-function );

				[ loading ] & {
					opacity: 1;
				}
			}

		}

		`;

		return html`
			<effects-overlay #>
				<grid-effect #></grid-effect>
				<noise-effect #></noise-effect>
				<lines-effect #></lines-effect>
				<vignette-effect #></vignette-effect>
			</effects-overlay>
		`;

	}

}

customElements.define( 'effects-overlay', Effects );
