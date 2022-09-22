import View from '~/components/View';

import Grid from './Grid';
import Sphere from './Sphere';

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
			${ Sphere }
		</projects-view>

		`;

	}

}

customElements.define( 'projects-view', Projects );
