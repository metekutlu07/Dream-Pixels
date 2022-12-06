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
			font-size: 5rem;
			background: rgba( 0, 0, 0, .75 );
		}

		`;

		return html`

			<about-view view>
				<h3>About</h3>
			</about-view>

		`;

	}

}

customElements.define( 'about-view', About );
