import View from '~/components/View';

import Grid from './Grid';
import Cursor from './Cursor';
import Exploration from './Exploration';
import Filters from './Filters';
import ColorRange from './ColorRange';
import Timeline from './Timeline';

export default class Projects extends View {

	static path = '/projects';
	static silent = false;

	static render() {

		css`

		projects-view {
			overflow: hidden;
		}

		`;

		return html`

		<projects-view view>
			${ Cursor }
			${ Grid }
			${ Exploration }
			${ Filters }
			${ ColorRange }
			${ Timeline }
		</projects-view>

		`;

	}

}

customElements.define( 'projects-view', Projects );
