import Button from '~/components/Button';

import Contact from '~/assets/icons/Contact';
import Back from '~/assets/icons/Back';
import Home from '~/assets/icons/Home';
import About from '~/assets/icons/About';
import List from '~/assets/icons/List';
import Menu from '~/assets/icons/Menu';
import Close from '~/assets/icons/Close';

import Grid from '~/assets/icons/Grid';
import Sphere from '~/assets/icons/Sphere';
import Particles from '~/assets/icons/Particles';

import Maximize from '~/assets/icons/Maximize';
import Minimize from '~/assets/icons/Minimize';
import Camera from '~/assets/icons/Camera';
import Speaker from '~/assets/icons/Speaker';
import Muted from '~/assets/icons/Muted';
import PointCloud from '~/assets/icons/PointCloud';
import Textured from '~/assets/icons/Textured';
import AugmentedReality from '~/assets/icons/AugmentedReality';
import Wireframe from '~/assets/icons/Wireframe';
import Normal from '~/assets/icons/Normal';

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
		else if ( currentTarget.hasAttribute( 'camera-mode' ) ) camera.setOrthography();
		else if ( currentTarget.hasAttribute( 'fullscreen' ) ) fullscreen.toggle();
		else if ( currentTarget.hasAttribute( 'display-points' ) ) scene.artwork.toggle();
		else if ( currentTarget.hasAttribute( 'audio' ) ) audio.toggle();
		else if ( currentTarget.hasAttribute( 'display-aside' ) ) Application.store.toggle( 'display-aside' );
		else if ( currentTarget.hasAttribute( 'display-wireframe' ) ) Application.store.toggle( 'display-wireframe' );
		else if ( currentTarget.hasAttribute( 'grid' ) ) Application.store.set( 'list', 'grid' );
		else if ( currentTarget.hasAttribute( 'sphere' ) ) Application.store.set( 'list', 'sphere' );
		else if ( currentTarget.hasAttribute( 'particles' ) ) Application.store.set( 'list', 'particles' );

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
			text-transform: uppercase;
			height: 100%;
			width: var( --width );
			padding: var( --margin-m );
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			transform: translateX( calc( var( --width ) * -1 ) );
			transition:
				transform .5s var( --timing-function ),
				opacity .5s var( --timing-function );

			[ display-menu ] & {
				transform: translateX( 0 );
			}

			& [ display-menu ],
			& [ display-aside ] {
				transform: translateX( var( --width ) );

				[ display-menu ] & {
					transform: translateX( 0 );
				}
			}

			&:before {
				content: '';
				height: 100%;
				width: 100%;
				background: rgba( 0, 0, 0, .85 );
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
				border-right: var( --border-size ) solid var( --border-color );
			}

			& default-button:not( [ visible ] ) {
				&:not( [ display-menu ] ) { display: none }
			}

			@media ( max-width: 1024px ) {
				padding: var( --margin-s );
			}

		}

		header-controls {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
		}

		header-title {
			margin-top: var( --margin-s );
			margin-bottom: var( --margin-xs );
			font-family: var( --font-family-c );
			text-transform: none;
			font-size: var( --font-size-xs );

			&:nth-of-type( 2 ) {
				display: none;

				[ path="/projects" ] & {
					display: initial;
				}
			}
		}

		header-credits {
			transition: opacity 1s var( --timing-function );
			font-size: var( --font-size-m );

			@media ( max-width: 1280px ) {
				position: relative;
				top: initial;
				right: initial;
			}
		}

		project-list-modes {
			top: var( --margin-m );
			right: var( --margin-m );

			@media ( max-width: 1280px ) {
				top: var( --margin-s );
				right: var( --margin-s );
			}
		}

		`;

		const navigation = [
			{ icons: [ Home ], attributes: [ 'home' ], link: { internal: true } },
			{ icons: [ Grid, Back ], attributes: [ 'projects' ], link: { internal: true } },
			{ icons: [ About ], attributes: [ 'about' ], link: { internal: true } },
			{ icons: [ Contact ], attributes: [ 'contact' ], link: {} }
		];

		const modes = [
			{ icons: [ Grid ], attributes: [ 'grid', '@click|header-block' ], },
			{ icons: [ Sphere ], attributes: [ 'sphere', '@click|header-block' ], },
			{ icons: [ Particles ], attributes: [ 'particles', '@click|header-block' ], }
		];

		const controls = [
			{ attributes: [ 'augmented-reality', '@click|header-block' ], icons: [ AugmentedReality ] },
			{ attributes: [ 'display-wireframe', '@click|header-block' ], icons: [ Wireframe, Normal ] },
			{ attributes: [ 'display-points', '@click|header-block' ], icons: [ PointCloud, Textured ] },
			{ attributes: [ 'camera-mode', '@click|header-block' ], icons: [ Camera ] },
			{ attributes: [ 'fullscreen', '@click|header-block' ], icons: [ Maximize, Minimize ] },
			{ attributes: [ 'audio', '@click|header-block' ], icons: [ Speaker, Muted ] }
		];

		const { copyright } = Application.content;

		return html`

		<header-block #header blurred-background>

			<header-controls>
				${ Button.render( { icons: [ Menu, Close ], attributes: [ 'display-menu', '@click|header-block' ] } ) }
				${ Button.render( { icons: [ List, List ], attributes: [ 'display-aside', '@click|header-block' ] } ) }
				<header-title>Navigation</header-title>
				${ navigation.map( Button.render ) }
				<header-title>Projects</header-title>
				${ modes.map( Button.render ) }
				<header-title>Settings</header-title>
				${ controls.map( Button.render ) }
			</header-controls>

			<header-credits font-style-title>
				${ copyright }
			</header-credits>

		</header-block>`;

	}

}

customElements.define( 'header-block', Header );
