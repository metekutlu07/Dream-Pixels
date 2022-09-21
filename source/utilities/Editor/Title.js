import Chevron from './icons/Chevron';

export default class Title extends HTMLElement {

	static render( parameters ) {

		css`

		editor-title {

			cursor: pointer;
			display: flex;
			align-items: center;
			user-select: none;
			padding: 4px 0px;
			margin: 2px 0;
			text-transform: capitalize;

			& svg {
				height: 12px;
				width: 12px;
				margin-right: 5px;
				opacity: .5;

				& path {
					fill: var( --font-color );
					stroke: var( --font-color );
					stroke-width: .25;
				}
			}
		}

		`;

		return html`

		<editor-title @click|editor-list>
			${ Chevron }<span>${ parameters.name }</span>
		</editor-title>

		`;

	}

}

customElements.define( 'editor-title', Title );
