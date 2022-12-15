import View from '~/components/View';

export default class About extends View {

	static path = '/about';
	static silent = false;

	static render() {

		css`

		about-view {
			position: relative;
			min-width: 100vw;
			min-height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: var( --font-size-xl );
			background: rgba( 0, 0, 0, .75 );

			& p {
				max-width: 50%;
				font-family: var( --font-family-b );
				text-align: center;
				line-height: 1.2;
				padding-bottom: var( --margin-s );
			}
		}

		`;

		const { about } = Application.content;

		return html`

		<about-view view>
			${ about.map( paragraph => html`<p>${ paragraph }</p>` ) }
		</about-view>

		`;

	}

}

customElements.define( 'about-view', About );
