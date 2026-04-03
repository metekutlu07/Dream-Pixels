import Button from '~/components/Button';

export default class Header extends HTMLElement {

	onConnected() {

		this.onResize();
		this.setAnalytics();
		this.syncLandingState();

	}

	onRouting() {

		Application.store.set( 'display-menu', false );
		this.syncLandingState();

	}

	onLoad() {

		this.setAnalytics();
		this.syncLandingState();

	}

	onPreFrame() {

		this.syncLandingState();

	}

	setAnalytics() {

		if ( ! Application.assets[ 'common' ] ) return;

		const { jsons } = Application.assets[ 'common' ];
		const { analytics } = jsons[ 'Colors.json' ];

		const { projects, images, pixels } = this.elements;
		projects.textContent = analytics.projects;
		images.textContent = analytics.images;
		pixels.textContent = `${ analytics.pixels }`.replace( /\B(?=(\d{3})+(?!\d))/g, '.' );

	}

	async onClick() {

		const { currentTarget } = event;
		const { camera, fullscreen, scene, audio } = Application;
		const list = Application.store[ 'last-experiments-list' ] || 'particles';
		const particles = Application.store[ 'last-experiments-particles' ] || 'color-range';
		const places = Application.store[ 'last-experiments-places' ] || 'world';

		if ( currentTarget.hasAttribute( 'home' ) ) {

			Application.store.set( 'home-gate-seen', true );
			Application.store.set( 'home-gate-visible', false );
			Application.router.navigate( '/' );
			return;

		}

		if ( currentTarget.hasAttribute( 'works' ) ) {

			Application.particles?.ensureColorsReady?.();

			Application.store.set( 'list', list );
			Application.store.set( 'particles', particles );
			Application.store.set( 'places', places );
			Application.store.set( 'skip-particle-gate', list === 'particles' );
			Application.router.navigate( '/experiments' );
			return;

		}

		if ( currentTarget.hasAttribute( 'augmented-reality' ) ) scene.export();
		if ( currentTarget.hasAttribute( 'camera-mode' ) ) camera.setOrthography();
		if ( currentTarget.hasAttribute( 'fullscreen' ) ) fullscreen.toggle();
		if ( currentTarget.hasAttribute( 'display-points' ) ) scene.artwork.toggle();
		if ( currentTarget.hasAttribute( 'audio' ) ) audio.toggle();
		if ( currentTarget.hasAttribute( 'display-aside' ) ) Application.store.toggle( 'display-aside' );
		if ( currentTarget.hasAttribute( 'display-wireframe' ) ) Application.store.toggle( 'display-wireframe' );
		if ( currentTarget.hasAttribute( 'grid' ) ) Application.store.set( 'list', 'grid' );
		if ( currentTarget.hasAttribute( 'particles' ) ) Application.store.set( 'list', 'particles' );
		if ( currentTarget.hasAttribute( 'color-range' ) ) Application.store.set( 'particles', 'color-range' );
		if ( currentTarget.hasAttribute( 'timeline' ) ) Application.store.set( 'particles', 'timeline' );
		if ( currentTarget.hasAttribute( 'cosmos' ) ) Application.store.set( 'places', 'cosmos' );
		if ( currentTarget.hasAttribute( 'world' ) ) Application.store.set( 'places', 'world' );
		if ( currentTarget.hasAttribute( 'display-menu' ) ) Application.store.toggle( 'display-menu' );
		if ( currentTarget.hasAttribute( 'sphere' ) ) {

			await this.loadPack( 'sphere' );
			Application.store.set( 'list', 'sphere' );

		}
		if ( currentTarget.hasAttribute( 'places' ) ) {

			await this.loadPack( 'places' );
			Application.store.set( 'places', 'world' );
			Application.store.set( 'list', 'places' );

		}

	}

	async loadPack( packID ) {

		Application.store.set( 'loading', true );

		try {

			await Application.assets.load( packID, false );

		} catch ( error ) { console.log( error ) }

		Application.store.set( 'loading', false );

	}

	onResize() {

		const { header } = this.elements;
		if ( ! header ) return;
		const width = `${ header.clientWidth + 1 }px`;
		document.documentElement.style.setProperty( '--header-width', width );

	}

	syncLandingState() {

		const {
			loading,
			path,
			list,
			particles
		} = Application.store;

		const uiReady = Application.store[ 'ui-ready' ];
		const homeGateVisible = path === '/' && Application.store[ 'home-gate-visible' ];
		const homeNavReady = path === '/' && Application.store[ 'home-nav-ready' ];
		const pixelExperienceStarted = Application.store[ 'pixel-experience-started' ];
		const pixelExperienceGateVisible = Application.store[ 'pixel-experience-gate-visible' ];
		const pixelExperienceTransitioning = Application.store[ 'pixel-experience-transitioning' ];
		const isPixelLanding = (
			path === '/experiments' &&
			list === 'particles' &&
			particles === 'color-range'
		);

		const shouldHideArchiveUI = (
			loading ||
			homeGateVisible ||
			( path === '/' && ! homeNavReady ) ||
			(
				isPixelLanding &&
				(
					! pixelExperienceStarted ||
					! uiReady ||
					pixelExperienceGateVisible ||
					pixelExperienceTransitioning
				)
			)
		);

		this.toggleAttribute( 'landing-hidden', shouldHideArchiveUI );

		const sharedGroups = this.querySelectorAll(
			'header-small-screen, header-navigation, header-controls'
		);

		sharedGroups.forEach( group => {

			group.style.opacity = shouldHideArchiveUI ? '0' : '';
			group.style.pointerEvents = shouldHideArchiveUI ? 'none' : '';

		} );

		const analyticsGroup = this.querySelector( 'header-analytics' );
		const gridModesGroup = this.querySelector( 'header-grid-modes' );
		const gridModePanels = this.querySelectorAll( 'header-grid-modes > div' );
		const shouldHideArchivePanels = shouldHideArchiveUI || path === '/';

		if ( analyticsGroup ) {

			analyticsGroup.style.opacity = shouldHideArchivePanels ? '0' : '';
			analyticsGroup.style.pointerEvents = shouldHideArchivePanels ? 'none' : '';

		}

		if ( gridModesGroup ) {

			gridModesGroup.style.opacity = '';
			gridModesGroup.style.pointerEvents = shouldHideArchivePanels ? 'none' : '';

		}

		gridModePanels.forEach( panel => {

			panel.style.opacity = shouldHideArchivePanels ? '0' : '1';
			panel.style.pointerEvents = shouldHideArchivePanels ? 'none' : '';

		} );

	}

	static render() {

		css`

		header-block {
			--width: 350px;
			--top-panel-gap: calc( var( --margin-xs ) / 2 );
			z-index: 20;
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: var( --width );
			padding: var( --margin-m );
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			width: 100%;
			height: 100%;
			pointer-events: none;
			transition: opacity .5s var( --timing-function );

			@media ( max-width: 650px ) {
				padding: var( --margin-s );
			}

			& default-button:not( [ visible ] ) {
				&:not( [ display-menu ] ) { display: none }
			}

			 @media ( max-width: 1024px ) {
				justify-content: flex-start;
				align-items: flex-start;

				&::before {
					content: '';
					position: absolute;
					height: 100%;
					width: 100%;
					left: 0;
					top: 0;
					opacity: 0;
					background: var( --color-black );
					z-index: 1;
					transition: opacity .5s var( --timing-function );

					[ display-menu ] & {
						opacity: .9;
						pointer-events: all;
					}
				}
			}

		}

		header-small-screen,
		header-navigation,
		header-grid-modes,
		header-controls {
			display: flex;
			flex-direction: row;
			position: absolute;
			pointer-events: all;
			opacity: 1;
			transition: opacity 2s var( --timing-function );

			[ path="/" ] & {
				transition: none;
			}
		}

		header-analytics {
			position: absolute;
			display: block;
			pointer-events: all;
			opacity: 1;
			transition: opacity 2s var( --timing-function );

			[ path="/" ] & {
				transition: none;
			}
		}

		header-top-row {
			position: absolute;
			top: var( --margin-m );
			left: 50%;
			transform: translateX( -50% );
			display: flex;
			width: min( calc( 100vw - ( var( --margin-m ) * 2 ) ), var( --archive-wide-width ) );
			justify-content: space-between;
			align-items: flex-start;
			flex-wrap: nowrap;
			gap: 14px;
			pointer-events: none;

			@media ( max-width: 1024px ) {
				position: relative;
				top: initial;
				left: initial;
				transform: none;
				display: contents;
			}
		}

		header-small-screen {
			top: 95px;

			& [ display-menu ] {
				display: none !important;

				@media ( max-width: 1024px ) {
					display: flex !important;
				}
			}
		}

		header-small-screen,
		header-navigation,
		header-controls {
			@media ( max-width: 1024px ) {
				position: relative;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				z-index: 1;
				left: initial;
				top: initial;
				right: initial;
				bottom: initial;

				&:not( :last-child ) {
					margin-bottom: var( --margin-s );
				}
			}
		}

		header-navigation,
		header-controls {
			@media ( max-width: 1024px ) {
				opacity: 0;
				pointer-events: none;

				[ display-menu ] & {
					opacity: 1;
					pointer-events: all;
				}
			}
		}

		[ loading ] &,
		[ path="/experiments" ][ list="particles" ]:not( [ ui-ready ] ) &,
		[ path="/experiments" ][ list="particles" ][ pixel-experience-gate-visible ] &,
		[ path="/experiments" ][ list="particles" ][ pixel-experience-transitioning ] &,
		&[ landing-hidden ] {
			& header-small-screen,
			& header-navigation,
			& header-grid-modes,
			& header-controls,
			& header-analytics {
				opacity: 0;
				pointer-events: none;
			}
		}

		header-navigation {
			left: 0;
			top: 0;
			position: relative;
			flex-wrap: nowrap;

			& default-button {
				position: relative;
				overflow: hidden;
				isolation: isolate;
				transform: translateZ( 0 );
				font-family: var( --font-family-c );
				font-size: 1.65rem;
				letter-spacing: .04em;

				&::before {
					content: '';
					position: absolute;
					inset: 0;
					z-index: 0;
					background: rgba( 8, 8, 8, .34 );
					backdrop-filter: blur( 10px );
					-webkit-backdrop-filter: blur( 10px );
					transform: translateZ( 0 );
				}

				& button-label,
				& button-icon,
				& a {
					position: relative;
					z-index: 1;
				}

				&[ selected ]::before {
					display: none;
				}
			}

			& default-button[ home ] {
				font-family: var( --font-family-b );
				font-size: 2.6rem;
				font-weight: 800;
				letter-spacing: .02em;
			}

			& button-label,
			& button-label span {
				white-space: nowrap;
			}

			& default-button button-label {
				min-height: 60px;
				box-sizing: border-box;
			}

			& default-button[ home ] button-label {
				padding-left: 30px;
				padding-right: 72px;
			}

			& default-button[ back ] {
				margin-right: 14px;

				@media ( max-width: 1024px ) {
					margin-right: 0;
					margin-bottom: 14px;
				}
			}

			& default-button[ home ]:hover {
				--background-color: transparent;
				z-index: 1;
			}
		}

		header-grid-modes {
			left: 0;
			right: 0;
			margin: auto;
			bottom: var( --margin-m );
			justify-content: center;
			flex-direction: column;
			align-items: center;

			& default-button {
				margin-bottom: 0 !important;

				&:not( :last-child ) {
					margin-right: 0;
					border-right: none;
				}
			}

			& > div {
				display: flex;
				justify-content: center;
				position: relative;
				opacity: 1;
				transition: opacity 2s var( --timing-function );

				&:not( :last-child ) {
					margin-bottom: calc( var( --margin-xs ) / 2 );
				}
			}

			& default-button {
				position: relative;
				overflow: hidden;
				isolation: isolate;
				transform: translateZ( 0 );

				&::before {
					content: '';
					position: absolute;
					inset: 0;
					z-index: 0;
					background: rgba( 8, 8, 8, .34 );
					backdrop-filter: blur( 10px );
					-webkit-backdrop-filter: blur( 10px );
					transform: translateZ( 0 );
				}

				& button-label,
				& button-icon,
				& a {
					position: relative;
					z-index: 1;
				}

				&[ selected ]::before {
					display: none;
				}
			}
		}

		header-controls {
			left: 0;
			top: 0;
			bottom: auto;
			right: auto;
			position: relative;
			flex-wrap: nowrap;

			& default-button {
				position: relative;
				overflow: hidden;
				isolation: isolate;
				transform: translateZ( 0 );
				font-family: var( --font-family-c );
				font-size: 1.65rem;
				letter-spacing: .04em;

				&::before {
					content: '';
					position: absolute;
					inset: 0;
					z-index: 0;
					background: rgba( 8, 8, 8, .34 );
					backdrop-filter: blur( 10px );
					-webkit-backdrop-filter: blur( 10px );
					transform: translateZ( 0 );
				}

				& button-label,
				& button-icon,
				& a {
					position: relative;
					z-index: 1;
				}

				&[ selected ]::before {
					display: none;
				}
			}

			& button-label,
			& button-label span {
				white-space: nowrap;
			}

			& default-button button-label {
				min-height: 60px;
				box-sizing: border-box;
			}
		}

		header-credits {
			display: none;
		}

		header-analytics {
			position: absolute;
			bottom: var( --margin-m );
			right: var( --margin-m );
			font-size: var( --font-size-m );
			font-family: var( --font-family-c );
			opacity: 0;
			padding: 16px;
			border: var( --border-size ) solid var( --border-color );
			background: rgba( 0, 0, 0, .2 );
			text-align: left;
			min-width: 320px;

			[ path="/experiments" ][ list="particles" ] & {
				opacity: 1;
			}

			& li {
				list-style: none;

				&:not(:last-child) {
					margin-bottom: 5px;
				}
			}

			@media ( max-width: 1024px ) {
				display: none;
				font-size: var( --font-size-xs );
			}
		}

		header-analytics-title {
			width: calc( 100% + 32px );
			margin: -16px -16px 12px;
			padding: 16px 16px 12px;
			margin-bottom: 12px;
			border-bottom: var( --border-size ) solid rgba( 255, 255, 255, .75 );
			display: block;
			font-family: var( --font-family-c );
			font-size: var( --font-size-m );
			font-weight: normal;
			letter-spacing: .04em;
			text-align: left;

			@media ( max-width: 1024px ) {
				font-size: var( --font-size-xs );
			}
		}

		`;

		const navigation = [
			{ attributes: [ 'home', '@click|header-block' ], link: { internal: true } },
			{ attributes: [ 'about' ], link: { internal: true } },
			{ attributes: [ 'works', '@click|header-block' ], labels: [ 'Experiments' ] },
			{ attributes: [ 'empire' ], link: { attributes: [ 'href="https://www.empireofclouds.com"', 'target="_blank"', 'rel="noreferrer"' ] } },
			{ attributes: [ 'mete' ], link: { internal: true } },
			{ attributes: [ 'contact' ], link: { internal: true } },
		];

		const modes = [
			{ attributes: [ 'particles', '@click|header-block' ], },
			{ attributes: [ 'grid', '@click|header-block' ], },
			{ attributes: [ 'sphere', '@click|header-block' ], },
			{ attributes: [ 'places', '@click|header-block' ], },
		];

		const particles = [
			{ attributes: [ 'color-range', '@click|header-block' ], },
			{ attributes: [ 'timeline', '@click|header-block' ], },
		];

		const places = [
			{ attributes: [ 'cosmos', '@click|header-block' ], },
			{ attributes: [ 'world', '@click|header-block' ], },
		];

		const controls = [
			{ attributes: [ 'fullscreen', '@click|header-block' ] },
			{ attributes: [ 'audio', '@click|header-block' ] },
			{ attributes: [ 'augmented-reality', '@click|header-block' ] },
			{ attributes: [ 'display-wireframe', '@click|header-block' ] },
			{ attributes: [ 'display-points', '@click|header-block' ] },
			{ attributes: [ 'camera-mode', '@click|header-block' ] }
		];

		const { copyright } = Application.content;

		return html`

		<header-block #header>

			<header-small-screen blurred-background>
				${ Button.render( { attributes: [ 'display-menu', '@click|header-block' ] } ) }
				${ Button.render( { attributes: [ 'display-aside', '@click|header-block' ] } ) }
			</header-small-screen>

			<header-top-row>
				<header-navigation blurred-background #navigation>
					${ navigation.map( Button.render ) }
				</header-navigation>

				<header-controls blurred-background #controls>
					${ controls.map( Button.render ) }
				</header-controls>
			</header-top-row>

			<header-grid-modes>
				<div blurred-background>
					${ particles.map( Button.render ) }
				</div>
				<div blurred-background>
					${ places.map( Button.render ) }
				</div>
				<div blurred-background>
					${ modes.map( Button.render ) }
				</div>
			</header-grid-modes>

			<header-credits>
				${ copyright }
			</header-credits>

			<header-analytics blurred-background>
				<header-analytics-title>ANALYTICS</header-analytics-title>
				<li>Projects: <span #projects>20</span></li>
				<li>Images: <span #images>122</span></li>
				<li>Pixels: <span #pixels>4 543 456 345</span></li>
			</header-analytics>

		</header-block>`;

	}

}

customElements.define( 'header-block', Header );
