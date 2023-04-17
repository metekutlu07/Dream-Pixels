import Chevron from '~/assets/icons/Chevron';

export default class Panels extends HTMLElement {

	onClick( event ) {

		event.currentTarget.toggleAttribute( 'open' );

	}

	static render() {

		css`

		projects-panel {
			z-index: 4;
			position: fixed;
			display: flex;
			flex-direction: column;
			background-color: var( --background-color );
			top: var( --margin-m );
			left: var( --margin-m );
			margin-top: 70px;
			border: var( --border-size ) solid var( --border-color );
			max-width: 450px;
			opacity: 0;
			font-family: var( --font-family-c );
			font-size: var( --font-size-s );
			line-height: 1.8;
			pointer-events: none;
			max-height: calc( 100% - var( --margin-m ) * 2 - 200px );

			& p {
				&:not( :last-child ) {
					margin-bottom: var( --margin-s );
				}
			}

			[ view-enter ][ list="sphere" ] &[ name="Images" ],
			[ view-enter ][ list="particles" ] &[ name="Pixels" ],
			[ view-enter ][ list="places" ][ places="world" ] &[ name="World" ],
			[ view-enter ][ list="places" ][ places="cosmos" ] &[ name="Cosmos" ] {
				opacity: 1;
				pointer-events: all;
			}

			@media ( max-width: 1024px ) {
				display: none;
				margin-top: 50px;
			}
		}

		panel-title {
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

			& panel-chevron {
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

		panel-description {
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


		const panels = Object
			.entries( Application.content.panels )
			.map( panel => {

				const [ name, { title, description } ] = panel;

				return html`

				<projects-panel blurred-background @click name="${ name }" open>

					<panel-title>
						<h3>${ title }</h3>
						<panel-chevron>
							${ Chevron }
						</panel-chevron>
					</panel-title>

					<panel-description>
						${ description.map( paragraph => html`<p>${ paragraph }</p>` ) }
					</panel-description>

				</projects-panel>

			`;

			} );

		return html`
			<projects-panels>
				${ panels }
			</projects-panels>
		`;

	}

}

customElements.define( 'projects-panel', Panels );
