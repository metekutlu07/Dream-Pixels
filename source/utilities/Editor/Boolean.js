import Title from './Title';

export default class Boolean extends HTMLElement {

	onPreFrame() {

		const { input, output } = this.elements;
		input.toggleAttribute( 'checked', !! this.parameter.value );
		output.toggleAttribute( 'checked', !! this.parameter.value );
		output.value = !! this.parameter.value;

	}

	onInput() {

		const { input } = this.elements;
		this.parameter.value = input.checked;

	}

	static render( parameters ) {

		css`

		editor-boolean {

			& form {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			& label {
				display: block;
				position: absolute;
				top: -2px;
				left: -2px;
				width: 12px;
				height: 12px;
				background: var( --background-color );
				border: 1px solid var( --false-color );
				border-radius: 50%;
				box-shadow: var( --box-shadow );
				cursor: pointer;
			}

			& output {
				color: var( --false-color ) !important;

				&[ checked ] {
					color: var( --true-color ) !important;
				}
			}

			& input[ type=checkbox ] {
				position: absolute;
				top: 0;
				width: 100%;
				height: 100%;
				margin: 0;
				opacity: 0;
				cursor: pointer;

				&:checked + label {
					border: 1px solid var( --true-color );
					transform: translateX( 30px );
				}
			}

			& div {
				position: relative;
				width: 40px;
				height: 10px;
				margin-left: 10px;
				border: 1px solid var( --border-color );
				border-radius: 50px;
			}

		}

		`;

		return html`

		<editor-boolean identifier="${ parameters.identifier }" parameter>

			${ Title.render( parameters ) }

			<form>
				<output ${ parameters.value ? 'checked' : '' } #>
					${ parameters.value }
				</output>
				<div>
					<input
						${ parameters.value ? 'checked' : '' }
						type="checkbox"
						@input
					#/>
					<label for="boolean"></label>
				</div>
			</form>

		</editor-boolean>

		`;

	}

}

customElements.define( 'editor-boolean', Boolean );
