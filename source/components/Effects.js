//import { Vector2 } from 'three';

export default class Effects extends HTMLElement {

	onUpdate() {

		//const { noise_effect } = this.elements;

		//const { x, y } = new Vector2()
		//			.random()
		//			.multiplyScalar( 100 );

		//		noise_effect.style.setProperty( '--background-position', `${ x }% ${ y }%` );

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
				background-size: 50px;
				background-position: center center;
				transition: opacity .5s var( --timing-function );
				opacity: 0;

				[ loading ] &,
				[ path="/works" ][ list="particles" ]:not( [ pixel-experience-started ] ):not( [ pixel-experience-transitioning ] ) & {
					opacity: .25;
				}
			}

			& lines-effect {
				background-image: url( "/public/common/Line.svg" );
				background-size: 2px;
				background-position: center center;
				opacity: .25;
				display: none;
			}

			& noise-effect {
				background-image: url( "/public/common/Noise.png" );
				background-position: var( --background-position );
				opacity: .25;
				display: none;
			}

			& vignette-effect {
				background: radial-gradient( rgba( 0, 0, 0, 0 ), rgba( 0, 0, 0, 1 ) );
				opacity: 0;
				transition: all 1s var( --timing-function );

				[ loading ] & {
					opacity: 1;
					display: none;

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
