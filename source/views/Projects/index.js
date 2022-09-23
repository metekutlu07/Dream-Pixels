import View from '~/components/View';

import Grid from './Grid';
import Sphere from './Sphere';
import Particles from './Particles';

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
			${ Particles }
		</projects-view>

		`;

	}

}

customElements.define( 'projects-view', Projects );
