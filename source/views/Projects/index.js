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

	static path = '/experiments';
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
		const particleUserInfoSeen = Application.store[ 'particle-user-info-seen' ];

		if ( isPixelLanding ) {

			Application.particles?.ensureColorsReady?.();

			Application.store.set( 'pixel-experience-started', false );
			Application.store.set( 'pixel-experience-gate-visible', false );
			Application.store.set( 'pixel-experience-background-visible', false );
			Application.store.set( 'pixel-experience-transitioning', false );
			Application.store.set( 'particle-archive-entered', particleUserInfoSeen );
			Application.store.set( 'ui-ready', false );
			Application.store.set( 'intro-ready', false );

		}

		super.onConnected();
		this.previousList = Application.store.list;

	}

	async onModeChange() {

		if ( Application.store.path !== '/experiments' ) return;

		const { list, particles, places } = Application.store;
		Application.store.set( 'last-experiments-list', list );
		Application.store.set( 'last-experiments-particles', particles );
		Application.store.set( 'last-experiments-places', places );

		if ( list === 'grid' && this.previousList !== 'grid' )
			await this.ensureGridMediaReady();

		this.previousList = list;

	}

	async ensureGridMediaReady() {

		if ( this.gridMediaReady ) return;
		if ( this.gridMediaPromise ) return this.gridMediaPromise;

		const run = async () => {

			Application.store.set( 'loading', true );

			try {

				await Application.time.wait( 50 );
				if ( ! this.isConnected ) return;

				const videos = Array.from( this.querySelectorAll( 'projects-grid video.preloadMedia, projects-grid video' ) );
				const images = Array.from( this.querySelectorAll( 'projects-grid img.preloadMedia, projects-grid item-thumbnail > img' ) );

				await Promise.allSettled( [
					...videos.map( video => this.preloadVideo( video ) ),
					...images.map( image => this.preloadImage( image ) )
				] );

				this.gridMediaReady = true;

			} finally {

				this.gridMediaPromise = null;
				if ( this.isConnected && Application.store.path === '/experiments' && Application.store.list === 'grid' )
					Application.store.set( 'loading', false );

			}

		};

		this.gridMediaPromise = run();
		return this.gridMediaPromise;

	}

	beginParticleExperience() {

		Application.particles?.ensureColorsReady?.();

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
		const particleUserInfoSeen = Application.store[ 'particle-user-info-seen' ];
		this.previousList = list;

		this.clearLandingSequence();

		if ( isPixelLanding ) {

			Application.particles?.ensureColorsReady?.();

			Application.store.set( 'pixel-experience-started', false );
			Application.store.set( 'pixel-experience-gate-visible', false );
			Application.store.set( 'pixel-experience-background-visible', false );
			Application.store.set( 'pixel-experience-transitioning', false );
			Application.store.set( 'particle-archive-entered', particleUserInfoSeen );
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

		if ( list === 'grid' )
			await this.ensureGridMediaReady();

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
