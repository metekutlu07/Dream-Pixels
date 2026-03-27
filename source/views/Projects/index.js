import View from '~/components/View';

import Grid from './Grid';
import Cursor from './Cursor';
import Exploration from './Exploration';
import Filters from './Filters';
import ColorRange from './ColorRange';
import Timeline from './Timeline';
import StartGate from './StartGate';
import ImagePreview from './ImagePreview';
import Popins from './Popins';

export default class Projects extends View {

	static path = '/works';
	static silent = false;

	onConnected() {

		const { list, particles } = Application.store;
		const isPixelLanding = list === 'particles' && particles === 'color-range';

		if ( isPixelLanding ) {

			Application.store.set( 'pixel-experience-started', false );
			Application.store.set( 'pixel-experience-gate-visible', false );
			Application.store.set( 'pixel-experience-background-visible', false );
			Application.store.set( 'pixel-experience-transitioning', false );
			Application.store.set( 'ui-ready', false );
			Application.store.set( 'intro-ready', false );

		}

		super.onConnected();

	}

	clearLandingSequence() {

		clearTimeout( this.introTimeout );
		clearTimeout( this.gateTimeout );

	}

	async onViewChange( view ) {

		await super.onViewChange( view );

		if ( view !== this ) return;

		const { list, particles } = Application.store;
		const isPixelLanding = list === 'particles' && particles === 'color-range';

		this.clearLandingSequence();

		if ( isPixelLanding ) {

			Application.store.set( 'pixel-experience-started', false );
			Application.store.set( 'pixel-experience-gate-visible', false );
			Application.store.set( 'pixel-experience-background-visible', false );
			Application.store.set( 'pixel-experience-transitioning', false );
			Application.store.set( 'ui-ready', false );
			Application.store.set( 'intro-ready', false );

			this.gateTimeout = setTimeout( () => {

				Application.store.set( 'pixel-experience-gate-visible', true );

			}, 1500 );

			return;

		}

		Application.store.set( 'pixel-experience-gate-visible', false );
		Application.store.set( 'pixel-experience-background-visible', false );
		Application.store.set( 'pixel-experience-transitioning', false );
		Application.store.set( 'ui-ready', true );
		Application.store.set( 'intro-ready', true );

	}

	onDisconnected() {

		this.clearLandingSequence();

	}

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
			${ StartGate }
			${ Popins }

		</projects-view>

		`;

	}

}

customElements.define( 'projects-view', Projects );
