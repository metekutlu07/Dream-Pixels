import Title from './Title';

export default class Range extends HTMLElement {

	onPreFrame() {

		const { input, output } = this.elements;
		input.value = this.parameter.value;
		output.value = this.parameter.value;

	}

	onInput() {

		const { input } = this.elements;
		this.parameter.value = parseFloat( input.value );

	}

	static render( parameters ) {

		const { value, min, max, step } = parameters;

		css`

		editor-range {

			& form {
				display: flex;
				position: relative;
				align-items: center;
				justify-content: space-between;
			}

			& range-min,
			& range-max {
				position: absolute;
				z-index: 0;
				top: 2px;
				margin: 0 2px;
				opacity: .25;
				font-size: 9px;

				&:first-child {
					left: 0;
				}

				&:last-child {
					right: 0;
				}
			}

			& input[ type=range ] {
				position: relative;
				z-index: 1;
				width: 100px;
				background-color: transparent;
				-webkit-appearance: none;
				cursor: grab;

				&:active {
					cursor: grabbing;
				}

				&:focus {
					outline: none;
				}

				&::-webkit-slider-runnable-track {
					width: 100%;
					height: 1px;
					background: var( --border-color );
					border: 0 solid #000;
					border-radius: 0;
					box-shadow: none;
				}

				&::-webkit-slider-thumb {
					width: 12px;
					height: 12px;
					background: var( --slider-thumb-color );
					border: 1px solid var( --highlight-color );
					border-radius: 50%;
					box-shadow: var( --box-shadow );
					transform: translateY( -50% );
					-webkit-appearance: none;
				}
			}

			& div {
				position: relative;
				margin-left: 10px;
			}
		}
		`;

		return html`

		<editor-range identifier="${ parameters.identifier }" parameter>

			${ Title.render( parameters ) }

			<form>
				<output #>${ value }</output>
				<div>

					<range-min>${ min || 0 }</range-min>
					<input
						type="range"
						value="${ value }"
						min="${ min || 0 }"
						max="${ max }"
						step="${ step || ( max - ( min || 0 ) ) / 200 }"
						@input
					#/>
					<range-max>${ max }</range-max>

				</div>
			</form>

		</editor-range>

		`;

	}

}

customElements.define( 'editor-range', Range );
