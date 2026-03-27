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
		const pixelExperienceStarted = Application.store[ 'pixel-experience-started' ];
		const pixelExperienceGateVisible = Application.store[ 'pixel-experience-gate-visible' ];
		const pixelExperienceTransitioning = Application.store[ 'pixel-experience-transitioning' ];
		const isPixelLanding = (
			path === '/works' &&
			list === 'particles' &&
			particles === 'color-range'
		);

		const shouldHideArchiveUI = (
			loading ||
			path === '/' ||
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

		const groups = this.querySelectorAll(
			'header-small-screen, header-navigation, header-grid-modes, header-controls, header-analytics'
		);

		groups.forEach( group => {

			group.style.opacity = shouldHideArchiveUI ? '0' : '';
			group.style.pointerEvents = shouldHideArchiveUI ? 'none' : '';

		} );

	}

	static render() {

		css`

		header-block {
			--width: 350px;
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
		}

		header-analytics {
			position: absolute;
			display: block;
			pointer-events: all;
			opacity: 1;
			transition: opacity 2s var( --timing-function );
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
		[ path="/" ] &,
		[ path="/works" ][ list="particles" ]:not( [ ui-ready ] ) &,
		[ path="/works" ][ list="particles" ][ pixel-experience-gate-visible ] &,
		[ path="/works" ][ list="particles" ][ pixel-experience-transitioning ] &,
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
			left: var( --margin-m );
			top: var( --margin-m );
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

				&:not( :last-child ) {
					margin-bottom: var( --margin-xs );
				}
			}
		}

		header-controls {
			right: var( --margin-m );
			top: var( --margin-m );
			bottom: auto;
		}

		header-credits {
			position: absolute;
			top: var( --margin-m );
			right: var( --margin-m );
			font-size: var( --font-size-xs );
			font-family: var( --font-family-c );
			opacity: 0;

			@media ( max-width: 650px ) {
				display: none;
			}

			[ path="/contact" ] & {
				opacity: 1;
			}
		}

		header-analytics {
			position: absolute;
			bottom: var( --margin-m );
			right: var( --margin-m );
			font-size: var( --font-size-m );
			font-family: var( --font-family-c );
			opacity: 0;
			text-align: right;

			[ path="/works" ] &,
			[ path="/contact" ] & {
				opacity: 1;
			}

			& li {
				list-style: none;

				&:not(:last-child) {
					margin-bottom: 5px;
				}

				&:first-child {
					font-family: var( --font-family-a );
					font-size: var( --font-size-l );
				}
			}

			@media ( max-width: 1024px ) {
				display: none;
				font-size: var( --font-size-xs );

				& li {
					&:first-child {
						font-size: var( --font-size-m );
					}
				}
			}
		}

		header-socials {
			position: absolute;
			bottom: var( --margin-m );
			left: var( --margin-m );
			font-size: var( --font-size-s );
			font-family: var( --font-family-c );
			pointer-events: all;
			display: none;

			[ path="/" ] & {
				display: block;
			}

			@media ( max-width: 1024px ) {
				bottom: var( --margin-s );
				left: var( --margin-s );
			}

			div {
				font-weight: 600;
			}
		}

		`;

		const navigation = [
			{ attributes: [ 'works' ], link: { internal: true } },
			{ attributes: [ 'about' ], link: { internal: true } },
			{ attributes: [ 'empire' ], link: { attributes: [ 'href="https://www.empireofclouds.com"', 'target="_blank"', 'rel="noreferrer"' ] } },
			{ attributes: [ 'contact' ], link: { internal: true } },
		];

		const modes = [
			{ attributes: [ 'particles', '@click|header-block' ], },
			{ attributes: [ 'sphere', '@click|header-block' ], },
			{ attributes: [ 'places', '@click|header-block' ], },
			{ attributes: [ 'grid', '@click|header-block' ], },
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
			{ attributes: [ 'augmented-reality', '@click|header-block' ] },
			{ attributes: [ 'display-wireframe', '@click|header-block' ] },
			{ attributes: [ 'display-points', '@click|header-block' ] },
			{ attributes: [ 'camera-mode', '@click|header-block' ] },
			{ attributes: [ 'fullscreen', '@click|header-block' ] },
			{ attributes: [ 'audio', '@click|header-block' ] }
		];

		const { copyright } = Application.content;

		return html`

		<header-block #header>

			<header-small-screen blurred-background>
				${ Button.render( { attributes: [ 'display-menu', '@click|header-block' ] } ) }
				${ Button.render( { attributes: [ 'display-aside', '@click|header-block' ] } ) }
			</header-small-screen>

			<header-navigation blurred-background>
				${ navigation.map( Button.render ) }
			</header-navigation>

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

			<header-controls blurred-background>
				${ controls.map( Button.render ) }
			</header-controls>

			<header-credits>
				${ copyright }
			</header-credits>

			<header-analytics>
				<li>Archive Analytics</li>
				<li>Projects: <span #projects>20</span></li>
				<li>Images: <span #images>122</span></li>
				<li>Pixels: <span #pixels>4 543 456 345</span></li>
			</header-analytics>

			<header-socials>
				<div>Follow us:</div>
				<a href="https://www.instagram.com/dreampixels.fr/" target="_blank" rel="noreferrer">
					@dreampixels.fr
				</a>
			</header-socials>

		</header-block>`;

	}

}

customElements.define( 'header-block', Header );
