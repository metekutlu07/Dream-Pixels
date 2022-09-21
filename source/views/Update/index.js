import View from '~/components/View';

export default class Update extends View {

	static path = '/update';
	static silent = false;

	static render() {

		return html`

			<update-view>
				<h2></h2>
			</update-view>

		`;

	}

}

customElements.define( 'update-view', Update );
