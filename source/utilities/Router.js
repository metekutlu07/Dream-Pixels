export default class Router {

	constructor() {

		Application.events.add( this );

		this.routes = [];
		this.regExp = /(:[^/]+)/g;

		if ( typeof location === 'undefined' ) return;

		const { origin, href } = location;
		this.url = href.replace( origin, '' );

	}

	onStart() {

		addEventListener( 'click', this.onClick );
		addEventListener( 'popstate', this.onPopState );

	}

	onPopState() {

		const { origin, href } = window.location;
		const path = href.replace( origin, '' );
		this.navigate( path );

	}

	onClick( event ) {

		const { metaKey, ctrlKey, shiftKey } = event;

		if ( metaKey || ctrlKey || shiftKey ) return;

		const target = event.composedPath()
			.filter( node => node.hasAttribute )
			.find( node => node.hasAttribute( 'internal' ) );

		if ( ! target ) return;

		event.preventDefault();
		event.stopPropagation();

		this.navigate( target.getAttribute( 'href' ) );

	}

	parseURL( url = this.url ) {

		const [ path, queryString ] = url.split( '?' );

		const route = this.getRoute( path );
		const parameters = this.getParameters( route, path );
		const queries = this.getQueryParameters( queryString );

		return { path, route, parameters, queries };

	}

	navigate( url ) {

		if ( url === this.url ) return;

		const route = this.parseURL( url );
		if ( ! route ) return this.navigate( '/' );

		this.setHistory( url );

		Application.events.dispatch( 'onRouting' );

	}

	add( path ) {

		const regExp = new RegExp( path.replace( this.regExp, '([^/]+)' ) + '$' );
		const parameters = ( path.match( this.regExp ) || [] ).map( match => match.substring( 1 ) );

		this.routes.push( { regExp, parameters, path } );

		return this;

	}

	getRoute( path ) {

		return this.routes.find( route => path.match( route.regExp ) );

	}

	getParameters( route, path ) {

		const matches = path.match( route.regExp );

		if ( ! route || ! matches ) return false;

		return route.parameters.reduce( ( parameters, parameterID, index ) => {

			parameters[ parameterID ] = decodeURIComponent( matches[ index + 1 ] );
			return parameters;

		}, {} );

	}

	getQueryParameters( queryString = '' ) {

		return queryString
			.split( '&' )
			.filter( parts => parts.length )
			.reduce( ( parameters, part ) => {

				const [ key, value ] = part.split( '=' );
				parameters[ decodeURIComponent( key ) ] = decodeURIComponent( value );
				return parameters;

			}, {} );

	}

	setHistory( url, silent ) {

		const state = { previous: this.url, url };
		history.pushState( state, '', silent ? null : url );

		this.url = url;

	}

}
