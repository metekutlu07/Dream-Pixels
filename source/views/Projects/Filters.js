export default class Filters extends HTMLElement {

	onConnected() {

		Application.filters = this;

	}

	onDisconnected() {

		Application.filters = null;

	}

	onPreFrame() {

		const { inputs } = this.elements;
		this.values = inputs
			.filter( input => input.checked )
			.map( input => input.value );

	}

	static render() {

		css`

		projects-filters {
			z-index: 4;
			position: fixed;
			display: flex;
			flex-direction: column;
			background-color: var( --background-color );
			top: var( --margin-m );
			right: var( --margin-m );
			border: var( --border-size ) solid var( --border-color );
			transition: opacity 1s var( --timing-function );
			padding: var( --margin-m );
			font-family: var( --font-family-c );
			font-size: var( --font-size-s );
			line-height: 1.8;
			list-style: none;
			overflow: scroll;
			opacity: 0;
			transition: opacity 1s var( --timing-function );
			margin-top: 50px;

			[ view-enter ][ list="sphere" ] & {
				opacity: 1;
				transition-delay: .75s;
				pointer-events: all;
			}

			& li {
				display: flex;
				align-items: center;
				padding-right: 20px;
			}

			& label {
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
			}

			& input {
				appearance: none;
				border: var( --border-size ) solid rgba( 255, 255, 255, .25 );
				height: 15px;
				width: 15px;
				margin-right: var( --margin-xs );
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;

				&:before {
					display: block;
					content: '';
					height: 8px;
					width: 8px;
					background: var( --color-white );
					opacity: 0;
				}

				&:checked {
					&:before {
						opacity: 1;
					}
				}
			}

			@media ( max-width: 1024px ) {
				display: none;
			}
		}

		`;

		const { filters } = Application.content;

		const tags = filters.tags.map( tag => html`

			<li>
				<label>
					<input
						type="checkbox"
						value="${ tag }"
						#inputs
					/>
					${ tag }
				</label>
			</li>

		` );

		return html`

		<projects-filters blurred-background>
			${ tags }
		</projects-filters>

		`;

	}

}

customElements.define( 'projects-filters', Filters );
