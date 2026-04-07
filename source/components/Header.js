import Button from '~/components/Button';

export default class Header extends HTMLElement {

	onConnected() {

		if ( ! this.boundOnWindowScroll ) this.boundOnWindowScroll = this.onWindowScroll.bind( this );
		this.bindScrollEvents();
		this.onResize();
		this.setAnalytics();
		this.syncLandingState();
		this.syncMobileGridState();

	}

	onRouting() {

		Application.store.set( 'display-menu', false );
		this.mobileHeaderHidden = false;
		this.mobileGridUIHidden = false;
		this.previousScrollY = 0;
		this.syncLandingState();
		this.syncMobileGridState();

	}

	onLoad() {

		this.setAnalytics();
		this.syncLandingState();
		this.syncMobileGridState();

	}

	onDisconnected() {

		this.unbindScrollEvents();

	}

	onModeChange() {

		this.syncLandingState();
		this.syncMobileGridState();

	}

	onPreFrame() {

		this.syncLandingState();
		this.syncMobileGridState();

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
			const isAlreadyExperiments = Application.store.path === '/experiments';
			Application.store.set( 'skip-particle-gate', list === 'particles' );
			if ( list === 'particles' && ! isAlreadyExperiments ) {

				Application.store.set( 'ui-ready', false );
				Application.store.set( 'intro-ready', false );

			} else if ( list === 'particles' && isAlreadyExperiments ) {

				Application.store.set( 'ui-ready', true );
				Application.store.set( 'intro-ready', true );
				Application.store.set( 'pixel-experience-gate-visible', false );
				Application.store.set( 'pixel-experience-transitioning', false );

			}
			Application.router.navigate( '/experiments' );
			Application.store.set( 'display-menu', false );
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

			Application.store.set( 'loading', true );
			try {

				await this.loadPack( 'works' );
				Application.store.set( 'list', 'sphere' );

			} finally {

				Application.store.set( 'loading', false );

			}

		}
		if ( currentTarget.hasAttribute( 'places' ) ) {

			Application.store.set( 'loading', true );
			try {

				await this.loadPack( 'places' );
				Application.store.set( 'places', 'world' );
				Application.store.set( 'list', 'places' );

			} finally {

				Application.store.set( 'loading', false );

			}

		}

	}

	async loadPack( packID ) {

		try {

			await Application.assets.load( packID, false );

		} catch ( error ) { console.log( error ) }

	}

	onResize() {

		const { header } = this.elements;
		if ( ! header ) return;
		const width = `${ header.clientWidth + 1 }px`;
		document.documentElement.style.setProperty( '--header-width', width );
		this.syncMobileGridState();

	}

	bindScrollEvents() {

		if ( this.hasBoundScrollEvents ) return;
		window.addEventListener( 'scroll', this.boundOnWindowScroll, { passive: true } );
		window.addEventListener( 'resize', this.boundOnWindowScroll, { passive: true } );
		this.hasBoundScrollEvents = true;

	}

	unbindScrollEvents() {

		if ( ! this.hasBoundScrollEvents ) return;
		window.removeEventListener( 'scroll', this.boundOnWindowScroll );
		window.removeEventListener( 'resize', this.boundOnWindowScroll );
		this.hasBoundScrollEvents = false;

	}

	onWindowScroll() {

		this.syncMobileGridState();

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
		const shouldHideArchivePanels = shouldHideArchiveUI || path === '/';

		this.syncStateAttribute( 'landing-hidden', shouldHideArchiveUI );
		this.syncStateAttribute( 'archive-panels-hidden', shouldHideArchivePanels );

	}

	syncMobileGridState() {

		const isMobile = typeof matchMedia !== 'undefined' &&
			matchMedia( '(max-width: 1024px)' ).matches;
		const isMenuOpen = !! Application.store[ 'display-menu' ];
		const isScrollableMobilePage = isMobile && ! isMenuOpen;
		const isMobileGrid = isMobile &&
			Application.store.path === '/experiments' &&
			Application.store.list === 'grid';
		const scrollingElement = document.scrollingElement || document.documentElement || document.body;
		const scrollY = Math.max( window.scrollY || 0, scrollingElement?.scrollTop || 0 );

		if ( ! isScrollableMobilePage ) {

			this.mobileHeaderHidden = false;
			this.mobileGridUIHidden = false;

		} else {

			const previousScrollY = this.previousScrollY ?? scrollY;
			const delta = scrollY - previousScrollY;
			const shouldHide = scrollY > 24 && delta > 2 ? true :
				scrollY <= 24 ? false :
					delta < -2 ? false :
						!! this.mobileHeaderHidden;

			this.mobileHeaderHidden = shouldHide;
			this.mobileGridUIHidden = shouldHide && isMobileGrid;

		}

		if ( ! isMobileGrid ) this.mobileGridUIHidden = false;
		else {
			this.mobileGridUIHidden = !! this.mobileHeaderHidden;

		}

		this.previousScrollY = scrollY;
		this.syncStateAttribute( 'mobile-page-scrolled', !! this.mobileHeaderHidden );
		this.syncStateAttribute( 'mobile-grid-scrolled', !! this.mobileGridUIHidden );

	}

	syncStateAttribute( attribute, value ) {

		if ( this.hasAttribute( attribute ) === !! value ) return;
		this.toggleAttribute( attribute, !! value );

	}

	static render() {

		css`

		header-block {
			--width: 350px;
			--top-panel-gap: calc( var( --margin-xs ) / 2 );
			--header-panel-background: rgba( 0, 0, 0, .22 );
			--header-panel-backdrop-filter: blur( 10px );
			--header-panel-webkit-backdrop-filter: blur( 10px );
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

			[ display-menu ] & {
				z-index: 45;
			}

			[ loading ] &,
			[ path="/experiments" ][ list="particles" ]:not( [ ui-ready ] ) &,
			[ path="/experiments" ][ list="particles" ][ pixel-experience-gate-visible ] &,
			[ path="/experiments" ][ list="particles" ][ pixel-experience-transitioning ] &,
			&[ landing-hidden ] {
				opacity: 0;
				visibility: hidden;
				pointer-events: none;
				transition: none;
				z-index: 0;
			}

			@media ( max-width: 650px ) {
				padding: var( --margin-s );
			}

			& default-button:not( [ visible ] ) {
				&:not( [ display-menu ] ) { display: none }
			}

			[ path="/experiments" ][ list="particles" ] &,
			[ path="/experiments" ][ list="grid" ] & {
				--header-panel-background: rgba( 0, 0, 0, 1 );
				--header-panel-backdrop-filter: none;
				--header-panel-webkit-backdrop-filter: none;
			}

			[ path="/experiments" ][ list="places" ] & {
				--header-panel-background: #8f73c8;
				--header-panel-backdrop-filter: none;
				--header-panel-webkit-backdrop-filter: none;
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
			transition: opacity .2s linear;

			[ path="/" ] & {
				transition: none;
			}

			& default-button {
				transition: none;
				will-change: auto;
			}
		}

		header-analytics {
			position: absolute;
			display: block;
			pointer-events: all;
			opacity: 1;
			transition: opacity .2s linear;

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
			padding: 0;
			border: none;
			background: none;
			overflow: visible;
			isolation: auto;

			@media ( max-width: 1024px ) {
				position: relative;
				top: initial;
				left: initial;
				transform: none;
				display: contents;
				padding: 0;
				border: none;
				background: none;
				backdrop-filter: none;
				-webkit-backdrop-filter: none;
				overflow: visible;
				isolation: auto;
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

			@media ( max-width: 1024px ) {
				& default-button {
					background: var( --header-panel-background );
					backdrop-filter: var( --header-panel-backdrop-filter );
					-webkit-backdrop-filter: var( --header-panel-webkit-backdrop-filter );
					overflow: visible;
					isolation: auto;
					transform: none;
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
					z-index: 2;
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

				& default-button {
					background: var( --header-panel-background );
					backdrop-filter: var( --header-panel-backdrop-filter );
					-webkit-backdrop-filter: var( --header-panel-webkit-backdrop-filter );
					overflow: visible;
					isolation: auto;
					transform: none;
					border: none;
					margin: 0;
				}

				& default-button:not( :last-child ) {
					margin-bottom: var( --margin-xs );
				}

				& default-button a,
				& default-button button-label {
					border: none;
					box-shadow: inset 0 0 0 var( --border-size ) rgba( 255, 255, 255, 1 );
					box-sizing: border-box;
				}

				& default-button a {
					width: auto;
				}
			}
		}

		[ loading ] &,
		[ path="/experiments" ][ list="particles" ]:not( [ ui-ready ] ) &,
		[ path="/experiments" ][ list="particles" ][ pixel-experience-gate-visible ] &,
		[ path="/experiments" ][ list="particles" ][ pixel-experience-transitioning ] &,
		&[ landing-hidden ] {
			& header-top-row,
			& header-small-screen,
			& header-navigation,
			& header-grid-modes,
			& header-controls,
			& header-analytics {
				opacity: 0;
				visibility: hidden;
				pointer-events: none;
				transition: none;
			}
		}

		@media ( max-width: 1024px ) {
			&[ mobile-page-scrolled ] {
				& header-small-screen {
					opacity: 0;
					visibility: hidden;
					pointer-events: none;
				}
			}

			&[ mobile-grid-scrolled ] {
				& header-grid-modes,
				& header-grid-modes > div {
					opacity: 0;
					visibility: hidden;
					pointer-events: none;
				}
			}
		}

		&[ archive-panels-hidden ] {
			& header-analytics,
			& header-grid-modes > div {
				opacity: 0;
				visibility: hidden;
				pointer-events: none;
			}
		}

		header-navigation {
			left: 0;
			top: 0;
			position: relative;
			flex-wrap: nowrap;
			background: var( --header-panel-background );
			border: none;
			box-shadow: inset 0 0 0 var( --border-size ) rgba( 255, 255, 255, 1 );
			padding-right: 0;
			flex-shrink: 0;
			overflow: hidden;
			backdrop-filter: var( --header-panel-backdrop-filter );
			-webkit-backdrop-filter: var( --header-panel-webkit-backdrop-filter );

			& default-button {
				font-family: var( --font-family-c );
				font-size: 1.65rem;
				letter-spacing: .04em;
				background: transparent;
				backdrop-filter: none;
				-webkit-backdrop-filter: none;
				border: none;
				margin-right: -1px;
			}

			& default-button[ selected ] {
				backdrop-filter: none;
				-webkit-backdrop-filter: none;
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

			& default-button + default-button {
				border-left: var( --border-size ) solid rgba( 255, 255, 255, 1 );
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

			@media ( hover: hover ) {
				& default-button:not( [ selected ] ):not( [ home ] ):hover {
					background: rgba( 255, 255, 255, .08 );
				}
			}

			@media ( max-width: 1024px ) {
				padding-right: 0;
				border: none;
				box-shadow: none;
				background: transparent;
				backdrop-filter: none;
				-webkit-backdrop-filter: none;
				overflow: visible;

				& default-button + default-button {
					border-left: none;
				}
			}
		}

		header-grid-modes {
			left: 0;
			right: 0;
			margin: auto;
			bottom: var( --margin-m );
			display: none;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			z-index: 0;

			[ path="/experiments" ] & {
				display: flex;
			}

			& default-button {
				margin-bottom: 0 !important;

				&:not( :last-child ) {
					margin-right: 0;
					border-right: none;
				}
			}

			& > div {
				display: none;
				justify-content: center;
				position: relative;
				background: var( --header-panel-background );
				border: var( --border-size ) solid rgba( 255, 255, 255, 1 );
				backdrop-filter: var( --header-panel-backdrop-filter );
				-webkit-backdrop-filter: var( --header-panel-webkit-backdrop-filter );
				opacity: 1;
				transition: opacity .2s linear;

				&:not( :last-child ) {
					margin-bottom: var( --margin-xs );
				}
			}

			[ path="/experiments" ] & #modeTabs {
				display: flex;
			}

			[ path="/experiments" ][ list="particles" ] & #particleModes {
				display: flex;
			}

			[ path="/experiments" ][ list="places" ] & #placeModes {
				display: flex;
			}

			& default-button {
				background: transparent;
				backdrop-filter: none;
				-webkit-backdrop-filter: none;
			}

			& default-button[ selected ] {
				backdrop-filter: none;
				-webkit-backdrop-filter: none;
			}

			@media ( hover: hover ) {
				& default-button:not( [ selected ] ):hover {
					background: rgba( 255, 255, 255, .08 );
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
			background: var( --header-panel-background );
			margin-left: 0;
			padding-left: 0;
			flex-shrink: 0;
			border: none;
			box-shadow: inset 0 0 0 var( --border-size ) rgba( 255, 255, 255, 1 );
			overflow: hidden;
			backdrop-filter: var( --header-panel-backdrop-filter );
			-webkit-backdrop-filter: var( --header-panel-webkit-backdrop-filter );

			& default-button {
				font-family: var( --font-family-c );
				font-size: 1.65rem;
				letter-spacing: .04em;
				background: transparent;
				backdrop-filter: none;
				-webkit-backdrop-filter: none;
				border: none;
				margin-right: -1px;
			}

			& default-button[ selected ] {
				backdrop-filter: none;
				-webkit-backdrop-filter: none;
			}

			& button-label,
			& button-label span {
				white-space: nowrap;
			}

			& default-button button-label {
				min-height: 60px;
				box-sizing: border-box;
			}

			& default-button + default-button {
				border-left: var( --border-size ) solid rgba( 255, 255, 255, 1 );
			}

			& default-button[ fullscreen ] {
				width: auto;
			}

			& default-button[ audio ] {
				width: auto;
			}

			@media ( max-width: 1024px ) {
				margin-left: 0;
				padding-left: 0;
				border: none;
				box-shadow: none;
				background: transparent;
				backdrop-filter: none;
				-webkit-backdrop-filter: none;
				overflow: visible;

				& default-button + default-button {
					border-left: none;
				}

				& default-button[ fullscreen ] {
					display: none !important;
				}
			}

			@media ( hover: hover ) {
				& default-button:not( [ selected ] ):hover {
					background: rgba( 255, 255, 255, .08 );
				}
			}
		}

		header-credits {
			display: none;
		}

		header-analytics {
			position: absolute;
			bottom: var( --margin-m );
			left: var( --margin-m );
			font-size: var( --font-size-m );
			font-family: var( --font-family-c );
			opacity: 0;
			padding: 0;
			text-align: left;
			min-width: auto;

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
			width: auto;
			margin: 0 0 12px;
			padding: 0;
			margin-bottom: 12px;
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

			<header-small-screen>
				${ Button.render( { attributes: [ 'display-menu', '@click|header-block' ] } ) }
				${ Button.render( { attributes: [ 'display-aside', '@click|header-block' ] } ) }
			</header-small-screen>

			<header-top-row>
				<header-navigation #navigation>
					${ navigation.map( Button.render ) }
				</header-navigation>

				<header-controls #controls>
					${ controls.map( Button.render ) }
				</header-controls>
			</header-top-row>

			<header-grid-modes>
				<div id="particleModes">
					${ particles.map( Button.render ) }
				</div>
				<div id="placeModes">
					${ places.map( Button.render ) }
				</div>
				<div id="modeTabs">
					${ modes.map( Button.render ) }
				</div>
			</header-grid-modes>

			<header-credits>
				${ copyright }
			</header-credits>

			<header-analytics>
				<header-analytics-title>ANALYTICS</header-analytics-title>
				<li>Projects: <span #projects>20</span></li>
				<li>Images: <span #images>122</span></li>
				<li>Pixels: <span #pixels>4 543 456 345</span></li>
			</header-analytics>

		</header-block>`;

	}

}

customElements.define( 'header-block', Header );
