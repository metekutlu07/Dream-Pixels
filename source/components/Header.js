import Button from '~/components/Button';

export default class Header extends HTMLElement {

	onConnected() {

		this.onResize();

	}

	onRouting() {

		Application.store.set( 'display-menu', false );

	}

	onClick() {

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
		if ( currentTarget.hasAttribute( 'sphere' ) ) Application.store.set( 'list', 'sphere' );
		if ( currentTarget.hasAttribute( 'particles' ) ) Application.store.set( 'list', 'particles' );
		if ( currentTarget.hasAttribute( 'color-range' ) ) Application.store.set( 'particles', 'color-range' );
		if ( currentTarget.hasAttribute( 'timeline' ) ) Application.store.set( 'particles', 'timeline' );
		if ( currentTarget.hasAttribute( 'display-menu' ) ) Application.store.toggle( 'display-menu' );

	}

	onResize() {

		const { header } = this.elements;
		const width = `${ header.clientWidth + 1 }px`;
		document.documentElement.style.setProperty( '--header-width', width );

	}

	static render() {

		css`

		header-block {
			--width: 350px;
			z-index: 15;
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
			transition:
				transform .5s var( --timing-function ),
				opacity .5s var( --timing-function );

			& default-button:not( [ visible ] ) {
				&:not( [ display-menu ] ) { display: none }
			}

			& default-button[ display-menu ] {
				--blur: blur( 10px );
				backdrop-filter: var( --blur );
				-webkit-backdrop-filter: var( --blur );
			}

			@media ( max-width: 1024px ) {
				padding: var( --margin-s );
				justify-content: flex-start;

				&::before {
					content: '';
					position: absolute;
					height: 100%;
					width: 100%;
					left: 0;
					top: 0;
					opacity: 0;
					background: var( --color-black );
					transition: opacity .5s var( --timing-function );
					z-index: 1;

					[ display-menu ] & {
						opacity: .9;
					}
				}
			}

		}

		header-title {
			display: none;
		}

		header-small-screen,
		header-navigation,
		header-grid-modes,
		header-controls {
			display: flex;
			flex-direction: row;
			position: absolute;
			pointer-events: all;
		}

		header-small-screen,
		header-navigation,
		header-controls {
			@media ( max-width: 1024px ) {
				position: relative;
				flex-direction: column;
				backdrop-filter: none !important;
				justify-content: flex-start;
				align-items: flex-start;
				z-index: 1;

				&:not( :last-child ) {
					margin-bottom: var( --margin-s );
				}
			}
		}

		header-navigation,
		header-controls {
			@media ( max-width: 1024px ) {
				& default-button {
					transform: translateX( -200px );
					transition-delay: calc( var( --index ) * .02s ) !important;

					[ display-menu ] & {
						transform: translateX( 0 );
						transition-delay: calc( var( --index ) * .02s ) !important;
					}
				}
			}
		}

		header-navigation {
			left: var( --margin-m );
			top: var( --margin-m );

			@media ( max-width: 1024px ) {
				left: initial;
				top: initial;
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

			& > div {
				display: flex;
				justify-content: center;

				&:not( :last-child ) {
					margin-bottom: var( --margin-xs );
				}
			}

			@media ( max-width: 1024px ) {
				bottom: var( --margin-s );
			}

		}

		header-controls {
			right: var( --margin-m );
			bottom: var( --margin-m );

			@media ( max-width: 1024px ) {
				right: initial;
				bottom: initial;
			}
		}

		header-credits {
			position: absolute;
			top: var( --margin-m );
			right: var( --margin-m );
			font-size: var( --font-size-xs );
			font-family: var( --font-family-c );
			transition: opacity 1s var( --timing-function );
			opacity: 0;

			[ path="/home" ] &,
			[ path="/about" ] &,
			[ path="/contact" ] & {
				opacity: 1;
			}
		}

		`;

		const navigation = [
			{ attributes: [ 'home' ], link: { internal: true } },
			{ attributes: [ 'works' ], link: { internal: true } },
			{ attributes: [ 'about' ], link: { internal: true } },
			{ attributes: [ 'contact' ], link: { internal: true } },
		];

		const modes = [
			{ attributes: [ 'grid', '@click|header-block' ], },
			{ attributes: [ 'sphere', '@click|header-block' ], },
			{ attributes: [ 'particles', '@click|header-block' ], }
		];

		const submodes = [
			{ attributes: [ 'color-range', '@click|header-block' ], },
			{ attributes: [ 'timeline', '@click|header-block' ], },
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
					${ submodes.map( Button.render ) }
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

		</header-block>`;

	}

}

customElements.define( 'header-block', Header );
