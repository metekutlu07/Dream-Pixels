import Performance from './Performance';

import Menu from './icons/Menu';
import Close from './icons/Close';
import Reset from './icons/Reset';
import Save from './icons/Save';
import Download from './icons/Download';

export default class Header extends HTMLElement {

	onClick() {
	}

	static render() {

		css`

		editor-header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			top: 10px;
			right: 10px;
			margin-bottom: 15px;
			width: 100%;

			& button {
				cursor: pointer;
				display: flex;
				position: relative;
				flex-direction: row;
				justify-content: flex-start;
				padding: 6px;
				background: var( --background-color );
				border-radius: 5px;
				border: 1px solid var( --border-color );

				&:not(:last-child) {
					margin-right: 5px;
				}

				&:last-child {
					visibility: visible;
				}

				&:active {
					transform: translateY(1px);
				}
			}

			& header-group-left,
			& header-group-right {
				display: flex;
			}

			& svg {
				width: 15px;
				height: 15px;
				fill: var( --font-color );
			}

			& [ switch ] {

				editor-block[ open ] & {
					border: 1px solid var( --border-color );

					& svg {
						&:first-child { visibility: hidden }
						&:last-child { visibility: visible }
					}
				}

				& svg {
					&:last-child {
						visibility: hidden;
						position: absolute;
						transform: rotate( 45deg );
					}
				}
			}
		}

		`;

		return html`

		<editor-header>

			<header-group-left>
				${ Performance }
			</header-group-left>

			<header-group-right>
				<button @click download>${ Download }</button>
				<button @click reset>${ Reset }</button>
				<button @click save>${ Save }</button>
				<button @click|editor-block switch>
					${ Menu }
					${ Close }
				</button>
			</header-group-right>

		</editor-header>

		`;

	}

}

customElements.define( 'editor-header', Header );
