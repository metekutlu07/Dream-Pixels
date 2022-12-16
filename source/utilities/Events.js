export default class Events {

	constructor() {

		this.objects = [];
		this.add( this );

	}

	onStart() {

		const html = document.documentElement;
		const observer = new MutationObserver( mutations => {

			mutations.forEach( mutation => {

				const { addedNodes, removedNodes } = mutation;
				const connected = Array.from( addedNodes );
				const disconnected = Array.from( removedNodes );

				connected.forEach( this.traverse );
				disconnected.forEach( this.traverse );

			} );

		} );

		observer.observe( html, { childList: true, subtree: true } );

		this.traverse( html );

	}

	dispatch( type ) {

		if ( Array.isArray( type ) ) return type.forEach( this.dispatch );

		const parameters = Array.from( arguments ).slice( 1 );

		for ( const object of this.objects )
			object[ type ] && object[ type ]( ...parameters );

	}

	add( object ) {

		this.bind( object );
		this.objects.push( object );

	}

	remove( object ) {

		const index = this.objects.indexOf( object );
		if ( index !== -1 ) this.objects.splice( index, 1 );

	}

	traverse( element, index ) {

		const { isConnected, children, tagName } = element;
		const isCustomElement = tagName && customElements.get( tagName.toLowerCase() );

		if ( children ) Array.from( children ).forEach( this.traverse );

		if ( ! isCustomElement ) return;

		if ( isConnected ) {

			Application.html.parse( element );
			Application.events.add( element );
			element.onConnected && element.onConnected( index );

		} else {

			Application.events.remove( element );

			element.onDisconnected && element.onDisconnected( index );

		}

	}

	bind( object ) {

		const properties = this.getObjectProperties( object );

		for ( let i = 0, l = properties.length; i < l; i++ ) {

			const name = properties[ i ];
			const property = object[ name ];

			if ( name !== 'constructor' && typeof property === 'function' )
				object[ name ] = object[ name ].bind( object );

		}

		return object;

	}

	getObjectProperties( object ) {

		const properties = [];

		do {

			const propertiesB = Object.getOwnPropertyNames( object );

			for ( let i = 0, l = propertiesB.length; i < l; i++ ) {

				const property = propertiesB[ i ];
				const descriptor = Object.getOwnPropertyDescriptor( object, property );
				if ( descriptor[ 'get' ] || descriptor[ 'set' ] ) continue;
				properties.push( property );

			}

		} while ( object = Object.getPrototypeOf( object ) );

		return properties;

	}

}
