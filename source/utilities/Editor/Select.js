import Title from './Title';

export default class Select extends HTMLElement {

	onPreFrame() {

		const { select } = this.elements;
		select.value = this.parameter.value;

	}

	onInput() {

		const { select } = this.elements;
		this.parameter.value = select.value;

	}

	static render( parameters ) {

		const options = parameters.options.map( option => {

			const selected = parameters.value === option ? 'selected' : '';
			return html`

			<option ${ selected } value=${ option }>
				${ option }
			</option>

			`;

		} );

		css`

		editor-select {

			& select {
				min-width: 50px;
				padding: 3px 10px;
				background: none;
				font-size: inherit;
				border: 1px solid var( --border-color );
				border-radius: 5px;
				color: var( --select-color );
				cursor: pointer;
				appearance: none;
				text-overflow: ellipsis;
				font-family: inherit;
				text-align: right;
				font-weight: 600;

				&:focus {
					outline: none;
				}
			}

		}

		`;

		return html`

		<editor-select identifier="${ parameters.identifier }" parameter>

			${ Title.render( parameters ) }
			<select @input #>
				${ options }
			</select>

		</editor-select>

		`;

	}

}

customElements.define( 'editor-select', Select );
