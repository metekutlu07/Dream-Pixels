import Chevron from '~/assets/icons/Chevron';

export default class Exploration extends HTMLElement {

	onClick() {

		this.toggleAttribute( 'open' );

	}

	static render() {

		css`

		projects-exploration {
			z-index: 4;
			position: fixed;
			display: flex;
			flex-direction: column;
			background-color: var( --background-color );
			top: var( --margin-m );
			left: var( --margin-m );
			margin-top: 50px;
			border: var( --border-size ) solid var( --border-color );
			max-width: 450px;
			opacity: 0;
			/* transition: opacity 1s var( --timing-function ); */
			font-family: var( --font-family-c );
			font-size: var( --font-size-s );
			line-height: 1.8;
			pointer-events: all;
			max-height: calc( 100% - var( --margin-m ) * 2 - 200px );

			& p {
				&:not( :last-child ) {
					margin-bottom: var( --margin-s );
				}
			}

			[ view-enter ][ list="sphere" ] &,
			[ view-enter ][ list="particles" ] &,
			[ view-enter ][ list="places" ][ places="cosmos" ] & {
				opacity: 1;
				/* transition-delay: .5s; */
				pointer-events: all;
			}

			@media ( max-width: 1024px ) {
				display: none;
			}
		}

		exploration-title {
			padding: var( --margin-s );
			display: flex;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;

			@media ( hover: hover ) {
				&:hover {
					background-color: rgba( 255, 255, 255, .25 );
				}
			}

			[ open ] & {
				border-bottom: var( --border-size ) solid var( --border-color );
			}

			& exploration-chevron {
				height: 25px;
				width: 25px;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			& svg {
				height: 20px;
				width: 20px;
				fill: var( --color-white );
				transform: rotate( 90deg );

				[ open ] & {
					transform: rotate( -90deg );
				}
			}

			& h3 {
				line-height: 1;
				font-size: var( --font-size-l );

				& + p {
					margin-top: var( --margin-s );
				}
			}
		}

		exploration-description {
			max-height: 0;
			overflow: hidden;
			padding: 0;
			overflow: scroll;

			[ open ] & {
				max-height: initial;
				padding: var( --margin-s );
			}
		}

		`;

		const { title, description } = Application.content.exploration;

		return html`

		<projects-exploration blurred-background @click>

			<exploration-title>
				<h3>${ title }</h3>
				<exploration-chevron>
					${ Chevron }
				</exploration-chevron>
			</exploration-title>

			<exploration-description>
				${ description.map( paragraph => html`<p>${ paragraph }</p>` ) }
			</exploration-description>

		</projects-exploration>

		`;

	}

}

customElements.define( 'projects-exploration', Exploration );
