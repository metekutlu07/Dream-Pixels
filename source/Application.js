import Reset from '~/global/Reset';
import Global from '~/global/Global';
import Animations from '~/global/Animations';

import Events from '~/utilities/Events';
import Time from '~/utilities/Time';
import Viewport from '~/utilities/Viewport';
import Assets from '~/utilities/Assets';
import Router from '~/utilities/Router';
import Audio from '~/utilities/Audio';
import Fullscreen from './utilities/Fullscreen';
import Editor from '~/utilities/Editor';
import Store from '~/utilities/Store';
import Pointer from '~/utilities/Pointer';

import Styles from './utilities/Styles';
import HTML from './utilities/HTML';
import Content from './utilities/Content';

import Renderer from '~/canvas/Renderer';
import Camera from '~/canvas/Camera';
import Scene from '~/canvas/Scene';
import PostProcessing from '~/canvas/PostProcessing';

import Meta from '~/components/Meta';
import Preloader from '~/components/Preloader';
import Header from '~/components/Header';
import Effects from './components/Effects';
import RotateDevice from './components/RotateDevice';
import Canvas from './components/Canvas';

import Home from '~/views/Home';
import Projects from '~/views/Projects';
import About from '~/views/About';
import Project from '~/views/Project';
import Update from '~/views/Update';

const Views = [ Home, Projects, About, Update, Project ];

class Application {

	constructor() {

		this.onServerSide = typeof global !== 'undefined';

	}

	initialize() {

		this.content = new Content();
		this.styles = new Styles();
		this.html = new HTML();

		this.events = new Events();
		this.router = new Router();
		this.store = new Store();

		Views.forEach( view => this.router.add( view.path ) );

		if ( this.onServerSide ) return;

		this.time = new Time();
		this.assets = new Assets();
		this.viewport = new Viewport();
		this.audio = new Audio();
		this.fullscreen = new Fullscreen();
		this.pointer = new Pointer();

		this.renderer = new Renderer();
		this.camera = new Camera();
		this.scene = new Scene();
		this.postProcessing = new PostProcessing();

		this.events.add( this );
		this.events.dispatch( 'onStart' );

	}

	onRouting() {

		const { route, parameters } = this.router.parseURL();
		const View = Views.find( view => view.path === route.path );
		const template = View.render( parameters );

		const node = this.html.render( template );
		const sibling = document.querySelector( '[ view ]:not( canvas )' );

		document.body.insertBefore( node, sibling );

	}

	render( url ) {

		const { route, parameters } = this.router.parseURL( url );
		const View = Views.find( view => view.path === route.path );
		this.store.path = url;

		return html`

		<html lang="en" loading>

			<head>
				${ Meta.render() }
				${ Reset.render() }
				${ Animations.render() }
				${ Global.render() }
			</head>

			<body>
				${ Canvas.render() }
				${ Header.render() }
				${ View.render( parameters ) }
				${ Preloader.render() }
				${ Effects.render() }
				${ RotateDevice.render() }
				${ Editor.render() }
			</body>

		</html>

		`;

	}

}

const application = new Application();
export default application;
application.initialize();
