export default class View extends HTMLElement {

	constructor() {

		super();

		this.toggleAttribute( 'hidden', true );

	}

	onConnected() {

		this.load();

	}

	async onViewChange( view ) {

		await Application.time.wait( 10 );

		if ( view !== this ) this.remove();
		else this.toggleAttribute( 'hidden' );

	}

	async load() {

		const { path, route } = Application.router.parseURL();

		Application.audio.play( '005.m4a' );
		Application.store.set( 'view-enter', false );
		Application.store.set( 'view-exit', true );

		await Application.time.wait( 500 );

		Application.audio.play( '004.m4a' );
		Application.store.set( 'loading', true );

		await Application.assets.load( this.getPackIDs( path ) );

		Application.store.set( 'path', path );
		Application.store.set( 'route', route.path );

		Application.events.dispatch( 'onViewChange', this );
		Application.store.set( 'loading', false );
		Application.store.set( 'view-exit', false );

		await Application.time.wait( 100 );

		document.body.scrollTop = 0;
		Application.audio.play( '003.m4a' );
		Application.store.set( 'view-enter', true );

		const content = Application.content.get( path );
		const { title } = Application.content;
		document.title = `${ content.title } - ${ title }`;

	}

	getPackIDs( path ) {

		const packID = path.replace( /\//g, '' );
		const packIDs = [ 'common', 'audio', packID ];

		if ( packID === 'photogrammetry' )
			packIDs.push( 'france-01-annunciation' );

		if ( packID === 'miniature-street-view' )
			packIDs.push( 'miniature-street-view-1' );

		return packIDs;

	}

}

