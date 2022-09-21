import Title from './Title';

export default class Text extends HTMLElement {

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

		editor-text {

			& input {
				width: 100px;
				height: 15px;
				padding-right: 5px;
				background: none;
				border: 0;
				border-bottom: 1px solid var(--border-color);
				border-radius: 2px;
				font-family: Menlo;
				color: var(--highlight-color);
				text-align: right;
				text-decoration: none;

				&:focus {
					outline: none;
					-webkit-appearance: none;
				}
			}

		}

		`;

		return html`

		<editor-text identifier="${ parameters.identifier }" parameter>

			${ Title.render( parameters ) }
			<input type="text" @input #/>

		</editor-text>

		`;

	}

}

customElements.define( 'editor-text', Text );
