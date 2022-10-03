
import View from '~/components/View';

export default class Contact extends View {

	static path = '/contact';
	static silent = false;

	static render() {

		css`

		contact-view {
			min-width: 100vw;
			min-height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 5rem;

			& a {
				color: var( --color-white );
				z-index: 0;

				@media (hover: hover) {
					&:hover {
						color: var( --color-yellow );
					}
				}
			}
		}

		`;

		const { mail } = Application.content;

		return html`

			<contact-view view>
				<h3>Contact</h3>
				<a href="mailto:${ mail }">${ mail }</a>
			</contact-view>

		`;

	}

}

customElements.define( 'contact-view', Contact );
