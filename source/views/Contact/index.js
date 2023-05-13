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
			background: rgba( 0, 0, 0, .5 );

			@media ( max-width: 1024px ) {
				font-size: var( --font-size-l );
			}

			& h4 {
				margin-bottom: var( --margin-s );
				font-size: var( --font-size-xxl );
				line-height: .9;

				@media ( max-width: 1024px ) {
					font-size: var( --font-size-l );
				}
			}

			& h3 {
				margin-top: var( --margin-s );
				font-family: var( --font-family-b );
				font-size: var( --font-size-m );
				line-height: 1.1;
			}

			& a {
				color: var( --color-white );
				font-family: var( --font-family-c );
				font-size: 100%;

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
			<a href="mailto:${ mail }">${ mail }</a>
			<h3>${ address }</h3>
		</contact-view>

		`;

	}

}

customElements.define( 'contact-view', Contact );
