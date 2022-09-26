// import { Vector2 } from 'three';

export default class Effects extends HTMLElement {

	onUpdate() {

		// const { noisePass, linesPass } = Application.postProcessing.parameters;
		// const { noise_effect, lines_effect } = this.elements;

		// const { x, y } = new Vector2()
		// 	.random()
		// 	.multiplyScalar( 100 );

		// noise_effect.toggleAttribute( 'enabled', noisePass.enabled );
		// noise_effect.style.setProperty( '--background-position', `${ x }% ${ y }%` );
		// noise_effect.style.setProperty( '--noise-strength', noisePass.strength );

		// lines_effect.toggleAttribute( 'enabled', linesPass.enabled );
		// lines_effect.style.setProperty( '--lines-strength', linesPass.strength );

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
			display: none;

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
				background-image: url( "/public/Common/Grid.svg" );
				background-size: 5vw;
				background-position: center center;
				transition: transform .5s var( --timing-function ), opacity .5s var( --timing-function );
				transform: scale( 1 );
				opacity: 0;

				[ loading ] & {
					opacity: .1;
					transform: scale( 1.2 );
				}
			}

			& lines-effect {
				background-image: url( "/public/common/line.svg" );
				background-size: 2px;
				background-position: center center;
				opacity: var( --lines-strength );
				opacity: .25;
				/* display: none;

				&[ enabled ] {
					display: block;
				} */
			}

			& noise-effect {
				background-image: url( "/public/common/noise.png" );
				background-position: var( --background-position );
				opacity: var( --noise-strength );
				display: none;

				&[ enabled ] {
					display: block;
				}
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
				<lines-effect #></lines-effect>
				<noise-effect #></noise-effect>
				<vignette-effect #></vignette-effect>
			</effects-overlay>
		`;

	}

}

customElements.define( 'effects-overlay', Effects );
