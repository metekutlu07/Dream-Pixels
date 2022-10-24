import Application from '~/Application';

export const rules = [];

export function css( template ) {

	let rule = '';

	const interpolations = Array.from( arguments ).slice( 1 );
	rule = template.reduce( ( a, b, i ) => a + b + ( interpolations[ i ] || '' ), '' ).trim();
	rule = rule.length ? getFormattedString( rule ) : '';

	const isDuplicated = rules.indexOf( rule ) > -1;
	if ( isDuplicated ) return;

	rules.push( rule );

}

export function getObjectFromString( string ) {

	let parentNode = { children: [] };

	string
		.replace( /\t/g, '' )
		.replace( /\n/g, ' ' )
		.replace( /\/\*[^*]+\*\//gm, '' )
		.match( /[^{};]+{|[^{};]+;|[^{};]+|}/g )
		.filter( value => /\S/g.test( value ) )
		.map( string => {

			const isSelector = /{/g.test( string );
			const isClosing = /}/g.test( string );
			const isProperty = ! ( isSelector || isClosing );
			const parameters = { children: [], parent: null };

			string = string.replace( /{|}/g, '' ).trim();

			if ( isProperty ) parameters.cssText = string;
			if ( isSelector ) parameters.selectorText = string;

			return parameters;

		} ).forEach( object => {

			if ( object.selectorText ) {

				parentNode.children.push( object );
				object.parent = parentNode;
				parentNode = object;

			} else if ( object.cssText ) {

				parentNode.children.push( object );
				object.parent = parentNode;

			} else parentNode = parentNode.parent;

		} );

	return parentNode;

}

export function getFlatObject( object, children = [], log ) {

	if ( /@key/g.test( object.selectorText ) ) return children.push( object );

	const properties = object.children.filter( child => child.cssText );

	if ( properties.length ) {

		const { selectorText, media } = getFlatSelector( object, log );
		const parameters = { selectorText, children: properties };
		if ( media ) parameters.media = media;
		children.push( parameters );

	}

	object.children
		.filter( child => child.selectorText )
		.forEach( child => getFlatObject( child, children, log ) );

	return Object.assign( {}, object, { children } );

}

export function getAtRules( selectorText, rules ) {

	for ( const rule in rules ) {

		const isRule = new RegExp( rule ).test( selectorText );
		if ( ! isRule ) continue;
		rules[ rule ].push( selectorText );
		return '&';

	}

	return selectorText;

}

export function getFlatSelector( object ) {

	const rules = { '@media': [] };
	let { selectorText } = object;
	let { parent } = object;

	selectorText = getAtRules( selectorText, rules );

	while ( parent ) {

		const replacement = getAtRules( parent.selectorText, rules );
		const selector = /,/.test( replacement ) ?
			`:is(${ replacement })` :
			replacement;

		selectorText = selectorText.replace( /&/g, selector );
		parent = parent.parent;

	}

	const media = rules[ '@media' ].map( ( value, index ) => {

		return value.replace( '@media', index ? '' : '@media' ).trim();

	} ).join( ' and ' );

	return { selectorText, media };

}

export function getStringFromObject( object, indent = 0 ) {

	const { children, cssText, selectorText } = object;

	const tab = '\t';
	const newLine = '\n';
	const openingTabs = tab.repeat( indent );

	if ( cssText ) return `${ openingTabs }${ cssText }`;
	if ( selectorText ) indent++;

	const newLines = newLine;
	const closingTabs = openingTabs;
	const substring = children
		.map( child => getStringFromObject( child, indent ) )
		.join( newLine );

	return selectorText ?

		`${ openingTabs }` +
		`${ selectorText.replace( /,\s/g, ',\n' ) } {` +
		`${ newLines }` +
		`${ substring }` +
		`${ newLines }` +
		`${ closingTabs }}` +
		`${ newLines }`

		: substring;

}

export function getFormattedString( string ) {

	const log = string.match( 'rotate-device-overlay' );
	let object = getObjectFromString( string, log );
	object = getFlatObject( object, [], log );
	object = setMediaRules( object, log );
	object = setFontFamilies( object, log );

	if ( ! Application.onServerSide ) return;
	else return getStringFromObject( object, 0, log );

}

export function insertRules( object ) {

	const styleSheet = document.querySelector( 'style' );
	const string = getStringFromObject( object );
	styleSheet.textContent += string;

	// const isDuplicate = styleSheet.textContent.indexOf( string );
	// if ( ! isDuplicate )styleSheet.textContent += string;

	// console.log( document.styleSheets );
	// const styleSheet = document.querySelector( 'style' );
	// const string = getStringFromObject( object );
	// const isDuplicate = styleSheet.textContent.indexOf( string ) > -1;
	// if ( ! isDuplicate ) styleSheet.textContent += string;

}

export function setMediaRules( object ) {

	const objects = object.children.filter( child => child.media );
	const media = {};

	for ( const object of objects ) {

		const selectorText = object.media;
		const array = media[ selectorText ] || { selectorText, children: [] };

		array.children.push( object );
		media[ selectorText ] = array;

	}

	object.children = object.children
		.filter( child => ! child.media )
		.concat( Object.values( media ) );

	return object;

}

export function setFontFamilies( object ) {

	return object;

}

export function setFontFaces( name ) {

	const { fonts } = Application.assets.manifest;

	return Object
		.values( fonts[ name ] )
		.map( font => {

			const { weight, url, format, italic } = font;

			return `

			@font-face {

				font-family: "${ name }";
				src: url( "${ url }") format( "${ format }" );
				font-style: ${ italic ? 'italic' : 'normal' };
				font-weight: ${ weight };
				font-display: swap;

			}`;

		} );

}
