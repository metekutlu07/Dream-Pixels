import View from '~/components/View';

import Grid from './Grid';
import Cursor from './Cursor';
import Exploration from './Exploration';
import Filters from './Filters';
import ColorRange from './ColorRange';
import Timeline from './Timeline';
import ImagePreview from './ImagePreview';
import Popins from './Popins';

export default class Projects extends View {

	static path = '/works';
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

			${ Cursor }
			${ Grid }
			${ ImagePreview }
			${ Exploration }
			${ Filters }
			${ ColorRange }
			${ Timeline }
			${ Popins }

		</projects-view>

		`;

	}

}

customElements.define( 'projects-view', Projects );
