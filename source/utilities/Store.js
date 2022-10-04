export default class Parameter {

	constructor( name = 'store', parameters ) {

		Application.events.add( this );

		this.children = [];
		this.name = this.toCamelCase( name );
		this.identifier = this.toKebabCase( this.name );

		if ( parameters === undefined ) return;

		const { property, options, family, value } = parameters;

		if ( parameters[ 0 ] === '#' ) this.isColor = true;
		else if ( typeof family === 'string' ) this.isFont = true;
		else if ( typeof property === 'string' ) this.isProperty = true;
		else if ( typeof options === 'object' ) this.isSelect = true;
		else if ( typeof value === 'number' ) this.isRange = true;
		else if ( typeof value === 'string' ) this.isText = true;
		else if ( typeof parameters === 'boolean' ) this.isBoolean = true;
		else if ( typeof parameters === 'function' ) this.isButton = true;
		else if ( typeof parameters === 'object' ) this.isList = true;

		Object.assign( this, parameters );

		if ( this.isBoolean ) this.value = !! parameters;
		else if ( this.isColor ) this.value = parameters;
		else if ( this.isText ) this.value = parameters;
		else if ( this.isButton ) this.value = parameters;
		else if ( this.isRange ) this.value = value;
		else if ( this.isSelect ) this.value = value || options[ 0 ];

		if ( this.isList ) {

			if ( value === undefined ) this.add( parameters );
			else this.add( this.getVectorParameters( parameters ) );

		}

	}

	onStart() {

		this.set( 'ar', document.createElement( 'a' ).relList.supports( 'ar' ) );
		this.set( 'list', 'particles' );

	}

	set( name, value ) {

		const html = document.documentElement;

		if ( ! name.startsWith( '--' ) ) {

			if ( value === true ) html.toggleAttribute( name, value );
			else if ( typeof value === 'string' ) html.setAttribute( name, value );
			else html.removeAttribute( name );

		} else html.style.setProperty( name, value );

		this[ name ] = value;

	}

	toggle( name ) {

		this.set( name, ! this[ name ] );

	}

	add( name, parameters ) {

		if ( typeof name === 'string' ) {

			const group = {};
			group[ name ] = parameters;
			parameters = group;

		} else parameters = name;

		for ( const name in parameters ) {

			const child = this.setParameter( name, parameters[ name ] );
			this.children.push( child );

		}

		if ( typeof name === 'string' ) return this[ this.toCamelCase( name ) ];

	}

	setParameter( name, parameters ) {

		const child = new Parameter( name, parameters, this );

		Object.defineProperty( this, child.name, {

			get: () => child.isList ? child : child.value,
			set: value => { child.value = value }

		} );

		return child;

	}

	getVectorParameters( parameters ) {

		const { min, max, step, value } = parameters;

		const entries = [ 'x', 'y', 'z', 'w' ]
			.filter( component => value[ component ] !== undefined )
			.map( component => [ component, {

				value: value[ component ],
				min: min[ component ],
				max: max[ component ],
				step: step && step[ component ]

			} ] );

		return Object.fromEntries( entries );

	}

	toCamelCase( string ) {

		return string[ 0 ].toLowerCase() + string.substring( 1 );

	}

	toKebabCase( string ) {

		return string.replace( /[A-Z]/g, letter => `-${ letter.toLowerCase() }` );

	}

}
