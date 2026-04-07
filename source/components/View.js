export default class View extends HTMLElement {

	constructor() {

		super();

		this.toggleAttribute( 'hidden', true );

	}

	onConnected() {

		this.load();

	}

	async onViewChange( view ) {

		if ( view !== this ) {

			this.remove();

		} else {

			// Preloading images and videos for /experiments and /{project}

			if ( view.tagName === 'PROJECTS-VIEW' || view.tagName === 'PROJECT-VIEW' ) {

				const elements = Array.from( view.getElementsByClassName( 'preloadMedia' ) );
				const images = elements.filter( element => element.tagName === 'IMG' && ! element.complete );
				const videos = elements.filter( element => element.tagName === 'VIDEO' );

				await Promise.allSettled( videos.map( this.preloadVideo ) );
				await Promise.allSettled( images.map( this.preloadImage ) );

			}

			if ( view.tagName === 'PROJECT-VIEW' )
				await Application.time.wait( 2000 );

			if ( ! this.isConnected ) return;

			this.toggleAttribute( 'hidden' );
			Application.store.set( 'loading', false );

		}


	}

	preloadVideo( video ) {

		return new Promise( ( resolve ) => {

			const isMobile = typeof matchMedia !== 'undefined' &&
				matchMedia( '(max-width: 650px)' ).matches;
			const isSafari = typeof navigator !== 'undefined' &&
				/safari/i.test( navigator.userAgent ) &&
				! /chrome|android|crios|fxios/i.test( navigator.userAgent );
			const isGridThumbnail = !! video.closest( 'projects-grid' );
			const shouldAutoplayMuted = ! video.hasAttribute( 'controls' ) && ! video.hasAttribute( 'popin' );
			let fallbackTimeout;

			const done = () => {

				clearTimeout( fallbackTimeout );
				video.removeEventListener( 'loadeddata', onReady );
				video.removeEventListener( 'canplay', onReady );
				video.removeEventListener( 'canplaythrough', onReady );
				video.removeEventListener( 'playing', done );
				video.removeEventListener( 'timeupdate', done );
				video.removeEventListener( 'error', done );
				resolve();

			};

			const onReady = async () => {

				if ( ! shouldAutoplayMuted || ( isMobile && isGridThumbnail && ! isSafari ) ) {

					done();
					return;

				}

				try {

					video.defaultMuted = true;
					video.muted = true;
					video.playsInline = true;

					const playPromise = video.play();
					if ( playPromise?.catch ) await playPromise.catch( () => null );

				} catch ( error ) {}

				if ( ! video.paused && video.currentTime > 0 ) {

					done();
					return;

				}

				video.addEventListener( 'playing', done, { once: true } );
				video.addEventListener( 'timeupdate', done, { once: true } );

			};

			fallbackTimeout = setTimeout( done, 4000 );

			video.addEventListener( 'loadeddata', onReady, { once: true } );
			video.addEventListener( 'canplay', onReady, { once: true } );
			video.addEventListener( 'canplaythrough', onReady, { once: true } );
			video.addEventListener( 'error', done, { once: true } );
			if ( isMobile && isGridThumbnail && ! isSafari ) video.preload = 'metadata';
			video.load();

			if ( video.readyState >= 2 ) onReady();

		} );

	}

	preloadImage( image ) {

		return new Promise( ( resolve ) => {

			if ( image.complete ) {

				resolve();
				return;

			}

			const done = () => {

				image.removeEventListener( 'load', done );
				image.removeEventListener( 'error', done );
				resolve();

			};

			image.addEventListener( 'load', done, { once: true } );
			image.addEventListener( 'error', done, { once: true } );

		} );

	}

	async load() {

		const { path, route } = Application.router.parseURL();
		const isParticleExperimentsRoute =
			path === '/experiments' &&
			Application.store.list === 'particles';

		Application.audio.play( '005.mp3' );
		Application.store.set( 'view-enter', false );
		Application.store.set( 'view-exit', true );

		Application.audio.play( '004.mp3' );
		Application.store.set( 'loading', true );
		if ( isParticleExperimentsRoute ) {

			Application.store.set( 'ui-ready', false );
			Application.store.set( 'intro-ready', false );

		}

		try {

			await Application.assets.load( this.getPackIDs( path ) );

		} catch ( error ) { console.log( error ) }

		Application.store.set( 'path', path );
		Application.store.set( 'route', route.path );

		Application.store.set( 'view-exit', false );

		await Application.time.wait( 500 );

		Application.events.dispatch( 'onViewChange', this );

		const scrollingElement = document.scrollingElement || document.documentElement || document.body;
		scrollingElement.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
		window.scrollTo( 0, 0 );

		Application.store.set( 'view-enter', true );
		Application.audio.play( '003.mp3' );

		const content = Application.content.get( path );
		const { title } = Application.content;
		document.title = `${ content.title } - ${ title }`;

	}

	getPackIDs( path ) {

		const packID = path.replace( /\//g, '' );
		const packIDs = [ 'common', 'audio' ];
		const { list } = Application.store;
		const isExperimentsRoute = packID === 'experiments' || packID === 'works';

		if ( isExperimentsRoute ) {

			if ( list === 'places' ) packIDs.push( 'places' );
			else if ( list === 'sphere' ) packIDs.push( 'works' );

		} else {

			packIDs.push( packID );

		}

		if ( packID === 'photogrammetry' )
			packIDs.push( 'france-01-annunciation' );

		if ( packID === 'miniature-street-view' )
			packIDs.push( 'miniature-street-view-6' );

		return packIDs;

	}

}
