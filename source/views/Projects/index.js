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

		const lastList = Application.store[ 'last-experiments-list' ] || 'particles';
		const lastParticles = Application.store[ 'last-experiments-particles' ] || 'color-range';
		const lastPlaces = Application.store[ 'last-experiments-places' ] || 'world';

		Application.store.set( 'list', lastList );
		Application.store.set( 'particles', lastParticles );
		Application.store.set( 'places', lastPlaces );

		const { list, particles } = Application.store;
		const isPixelLanding = list === 'particles' && particles === 'color-range';

		if ( isPixelLanding ) {

			Application.store.set( 'pixel-experience-started', false );
			Application.store.set( 'pixel-experience-gate-visible', false );
			Application.store.set( 'pixel-experience-background-visible', false );
			Application.store.set( 'pixel-experience-transitioning', false );
			Application.store.set( 'particle-archive-entered', false );
			Application.store.set( 'ui-ready', false );
			Application.store.set( 'intro-ready', false );

		}

		super.onConnected();

	}

	onModeChange() {

		if ( Application.store.path !== '/works' ) return;

		const { list, particles, places } = Application.store;
		Application.store.set( 'last-experiments-list', list );
		Application.store.set( 'last-experiments-particles', particles );
		Application.store.set( 'last-experiments-places', places );

	}

	beginParticleExperience() {

		Application.store.set( 'pixel-experience-gate-visible', false );
		Application.store.set( 'pixel-experience-background-visible', false );
		Application.store.set( 'pixel-experience-transitioning', true );
		Application.store.set( 'skip-particle-gate', false );

		clearTimeout( this.backgroundTimeout );
		clearTimeout( this.startTimeout );

		this.backgroundTimeout = setTimeout( () => {

			Application.store.set( 'pixel-experience-background-visible', true );

		}, 1000 );

		this.startTimeout = setTimeout( () => {

			Application.store.set( 'pixel-experience-started', true );
			Application.store.set( 'pixel-experience-transitioning', false );
			Application.events.dispatch( 'onModeChange' );

		}, 2000 );

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
			Application.store.set( 'particle-archive-entered', false );
			Application.store.set( 'ui-ready', false );
			Application.store.set( 'intro-ready', false );

			if ( Application.store[ 'skip-particle-gate' ] ) {

				this.beginParticleExperience();
				return;

			}

			this.gateTimeout = setTimeout( () => {

				Application.store.set( 'pixel-experience-gate-visible', true );

			}, 1500 );

			return;

		}

		Application.store.set( 'pixel-experience-gate-visible', false );
		Application.store.set( 'pixel-experience-background-visible', false );
		Application.store.set( 'pixel-experience-transitioning', false );
		Application.store.set( 'particle-archive-entered', true );
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
