import Title from './Title';

export default class Color extends HTMLElement {

	onPreFrame() {

		const { input } = this.elements;
		input.value = this.parameter.value;

	}

	onInput() {

		const { input } = this.elements;
		this.parameter.value = input.value;

	}

	static render( parameters ) {

		css`

		editor-color {

			& input {
				display: flex;
				justify-content: space-between;
				width: 100px;
				height: 12px;
				padding: 0;
				border-radius: 2px;
				box-shadow: var( --box-shadow );
				cursor: pointer;
				-webkit-appearance: none;
				border: 1px solid var( --border-color );

				&::-webkit-color-swatch-wrapper {
					padding: 0;
					border-radius: 0;
				}

				&::-webkit-color-swatch {
					border: none;
				}

				&:focus {
					outline: none;
				}
			}

		}

		`;

		return html`

		<editor-color identifier="${ parameters.identifier }" parameter>

			${ Title.render( parameters ) }
			<input
				value=${ parameters.value }
				type="color"
				@input
			#/>

		</editor-color>

		`;

	}

}

customElements.define( 'editor-color', Color );
