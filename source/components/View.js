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

			this.toggleAttribute( 'hidden' );

			// Preloading images and videos for /experiments and /{project}

			if ( view.tagName === 'PROJECTS-VIEW' || view.tagName === 'PROJECT-VIEW' ) {

				const elements = Array.from( view.getElementsByClassName( 'preloadMedia' ) );
				const images = elements.filter( element => element.tagName === 'IMG' && ! element.complete );
				const videos = elements.filter( element => element.tagName === 'VIDEO' );

				await Promise.allSettled( videos.map( this.preloadVideo ) );
				await Promise.allSettled( images.map( this.preloadImage ) );

			}

			Application.store.set( 'loading', false );

		}


	}

	preloadVideo( video ) {

		return new Promise( ( resolve ) => {

			video.oncanplaythrough = resolve;
			video.load();

		} );

	}

	preloadImage( image ) {

		return new Promise( ( resolve ) => {

			image.onload = image.onerror = resolve;

		} );

	}

	async load() {

		const { path, route } = Application.router.parseURL();

		Application.audio.play( '005.mp3' );
		Application.store.set( 'view-enter', false );
		Application.store.set( 'view-exit', true );

		Application.audio.play( '004.mp3' );
		Application.store.set( 'loading', true );

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
			else if ( list === 'sphere' ) packIDs.push( 'sphere' );

		} else {

			packIDs.push( packID );

		}

		if ( packID === 'photogrammetry' )
			packIDs.push( 'france-01-annunciation' );

		if ( packID === 'miniature-street-view' )
			packIDs.push( 'miniature-street-view-1' );

		return packIDs;

	}

}
