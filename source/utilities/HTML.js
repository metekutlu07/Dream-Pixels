export default class HTML {

	render( string ) {

		const fragment = document
			.createRange()
			.createContextualFragment( string );

		const { children, firstChild } = fragment;
		return children.length > 1 ? children : firstChild;

	}

	parse( parent ) {

		const elements = {};
		const attributes = this.traverse( parent );
		const capitalize = string => string[ 0 ].toUpperCase() + string.substr( 1 );

		attributes.forEach( ( { name, element } ) => {

			const { tagName } = element;
			const isQuery = name.startsWith( '#' );
			const isListener = name.startsWith( '@' );

			const key = name.length > 1 ? name.substr( 1 ) :
				tagName.toLowerCase()
					.replace( /-/g, '_' );

			const [ string, selector ] = key.split( '|' );
			if ( !! selector && ! parent.matches( selector ) ) return;

			if ( isQuery ) {

				const value = elements[ string ];
				if ( Array.isArray( value ) ) elements[ string ].push( element );
				else if ( value ) elements[ string ] = [ value, element ];
				else elements[ string ] = element;

			}

			if ( isListener ) {

				const substrings = string.split( '-' );
				const type = substrings.join( '' );
				const listener = 'on' + substrings.map( capitalize ).join( '' );
				const callback = parent[ listener ].bind( parent );
				element.addEventListener( type, callback );

			}

			element.removeAttribute( name );

		} );

		if ( ! parent.elements ) parent.elements = {};
		Object.assign( parent.elements, elements );

	}

	traverse( element, results = [] ) {

		const { children, attributes } = element;

		Array
			.from( attributes )
			.map( attribute => attribute.name )
			.filter( name => name.match( /(@|#)/g ) )
			.forEach( name => results.push( { name, element } ) );

		Array
			.from( children )
			.forEach( element => this.traverse( element, results ) );

		return results;

	}

}
