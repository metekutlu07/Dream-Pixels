import View from '~/components/View';

import Grid from './Grid';
import Cursor from './Cursor';
import Exploration from './Exploration';
import Filters from './Filters';
import ColorRange from './ColorRange';
import Timeline from './Timeline';
import ImagePreview from './ImagePreview';

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

		</projects-view>

		`;

	}

}

customElements.define( 'projects-view', Projects );
