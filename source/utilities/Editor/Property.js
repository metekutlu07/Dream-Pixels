import Title from './Title';

export default class Property extends HTMLElement {

	onPreFrame() {

		const { output } = this.elements;
		const { object, property, toFixed } = this.parameter;

		if ( ! object[ property ] ) return;
		output.textContent = object[ property ].toFixed( toFixed );

	}

	static render( parameters ) {

		css`

		editor-property {

			&[ disabled ] {
				opacity: .5;
			}

			& output {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			& label,
			& input[ type=range ]::-webkit-slider-thumb {
				border: 1px solid var( --font-color ) !important;
			}

		}

		`;

		return html`

		<editor-property identifier="${ parameters.identifier }" parameter>

			${ Title.render( parameters ) }
			<output #>-</output>

		</editor-property>

		`;

	}

}

customElements.define( 'editor-property', Property );
