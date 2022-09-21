import Title from './Title';

import Play from './icons/Play';

export default class Button extends HTMLElement {

	onClick() {

		this.parameter.value();

	}

	static render( parameters ) {

		css`

		editor-button {

			& button {
				border: 1px solid var( --border-color );
				color: var( --font-color );
				padding: 4px;
				background: none;
				border-radius: 5px;
				font-family: inherit;
				font-weight: normal;
				display: flex;
				justify-content: center;
				align-items: center;

				cursor: pointer;
				transition: transform .3s cubic-bezier( .25, .8, .25, 1 );
				text-align: center;
				text-decoration: none;
				text-transform: capitalize;
				pointer-events: all;
				appearance: none;

				& svg {
					height: 12px;
					width: 12px;
					fill: var( --highlight-color );
				}

				&:not(:last-child) {
					margin-right: 5px;
				}

				&:active {
					transform: translateY( 1px );

					svg {
						fill: var( --font-color );
					}

				}
			}

		}

		`;

		return html`

		<editor-button identifier="${ parameters.identifier }" parameter>

			${ Title.render( parameters ) }
			<button @click>${ Play }</button>

		</editor-button>

		`;

	}

}

customElements.define( 'editor-button', Button );
