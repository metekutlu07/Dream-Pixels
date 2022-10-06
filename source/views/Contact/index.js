
import View from '~/components/View';

export default class Contact extends View {

	static path = '/contact';
	static silent = false;

	static render() {

		css`

		contact-view {
			position: relative;
			min-width: 100vw;
			min-height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: var( --font-size-xl );
			text-align: center;
			user-select: text;

			& h4 {
				margin-bottom: var( --margin-s );
				font-size: var( --font-size-xxl );
				line-height: .9;
			}

			& a {
				color: var( --color-white );
				margin-top: var( --margin-s );
				font-family: var( --font-family-c );
				font-size: var( --font-size-m );
				z-index: 0;

				@media ( hover: hover ) {
					&:hover {
						color: var( --color-yellow );
					}
				}
			}
		}

		`;

		const { mail, address, contact } = Application.content;

		return html`

			<contact-view view>
				<h4>${ contact }</h4>
				<h3>${ address }</h3>
				<a href="mailto:${ mail }">${ mail }</a>
			</contact-view>

		`;

	}

}

customElements.define( 'contact-view', Contact );
