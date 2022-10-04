import View from '~/components/View';

import Grid from './Grid';
import Cursor from './Cursor';
import Tabs from './Tabs';

export default class Projects extends View {

	static path = '/projects';
	static silent = false;

	static render() {

		css`

		projects-view {
			overflow: hidden;
			pointer-events: none;
		}

		`;

		return html`

		<projects-view view>
			${ Grid }
			${ Cursor }
			${ Tabs }
		</projects-view>

		`;

	}

}

customElements.define( 'projects-view', Projects );
