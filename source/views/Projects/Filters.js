export default class Filters extends HTMLElement {

	onClick() {
	}

	onPreFrame() {
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
			pointer-events: none;
			transition: opacity 1s var( --timing-function );

			[ view-exit ][ list="sphere" ] & {
				opacity: 0;
			}

			[ view-exit ][ list="sphere" ] & {
				opacity: 1;
				transition-delay: .5s;
			}

			& li {
				display: flex;
				align-items: center;
				padding-right: 20px;
			}

			& input {
				appearance: none;
				border: var( --border-size ) solid var( --border-color );
				height: 15px;
				width: 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: var( --margin-xs );
				cursor: pointer;

				&:before {
					display: block;
					content: '';
					height: 5px;
					width: 5px;
					background: var( --color-white );
					opacity: 0;
				}

				&:checked {
					&:before {
						opacity: 1;
					}
				}
			}

			[ view-enter ][ list="sphere" ] & {
				opacity: 1;
				transition-delay: .5s;
				pointer-events: all;
			}
		}

		`;

		const { filters } = Application.content;

		const tags = filters.tags.map( tag => html`

			<li>
				<input type="checkbox"/>
				<label>${ tag }</label>
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
