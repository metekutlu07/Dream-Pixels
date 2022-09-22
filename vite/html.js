export function html( template ) {

	const interpolations = Array.from( arguments ).slice( 1 );

	const string = template.reduce( ( a, b, i ) => {

		const join = array => array.map( value => html`${ value }` ).join( '' );

		const interpolation = interpolations[ i ];
		const isArray = Array.isArray( interpolation );

		const isUndefined = ! interpolation;
		const isInstance = ! isUndefined && interpolation.render;

		const value =
			isArray ? join( interpolation ) :
				isInstance ? interpolation.render() :
					! isUndefined ? interpolation : '';

		return a + b + value;

	}, '' ).trim();

	return getFormattedString( string );

}

export function getNodeFromString( string ) {

	const attributes = string.match( /\S+="[^"]*"|[^\s</>]+/gm );
	const tagName = attributes.shift();

	const isComment = /<!--/g.test( string );
	if ( isComment ) return;

	const isTag = /<[^>]*>/g.test( string );
	const isClosing = isTag && /<\//g.test( string );
	const isSelfClosing = isSelfClosingTag( tagName );

	const parameters = {

		tagName,
		attributes,
		isSelfClosing,
		children: [],
		parent: null

	};

	return ! isTag ? { textContent: string } :
		isClosing ? { tagName, isClosing } :
			parameters;

}

export function getObjectFromString( string ) {

	let parentNode = { children: [], attributes: [] };

	string
		.replace( /[\t\n]/g, ' ' )
		.split( /(<[^>]*>)/g )
		.filter( value => /\S/g.test( value ) )
		.map( getNodeFromString )
		.filter( Boolean )
		.forEach( object => {

			if ( object.isSelfClosing || object.textContent ) {

				parentNode.children.push( object );
				object.parent = parentNode;

			} else if ( ! object.isClosing ) {

				parentNode.children.push( object );
				object.parent = parentNode;
				parentNode = object;

			} else parentNode = parentNode.parent;

			delete object.isSelfClosing;

		} );

	return parentNode;

}

export function getStringFromObject( object, indent = 0 ) {

	const tab = '\t';
	const newLine = '\n';
	const openingTabs = tab.repeat( indent );

	if ( object.textContent ) {

		const { children } = object.parent;
		const parentHasChild = children.some( child => ! child.textContent );
		const textContent = object.textContent;
		return `${ parentHasChild ? openingTabs : '' }${ textContent }`;

	}

	if ( ! object.tagName ) {

		return object.children
			.map( child => getStringFromObject( child, indent ) )
			.join( newLine );

	}

	indent++;

	const hasChildren = object.children.some( child => ! child.textContent );
	const newLines = hasChildren ? newLine : '';
	const closingTabs = hasChildren ? openingTabs : '';

	const isSelfClosing = isSelfClosingTag( object.tagName );
	const isDoctype = object.tagName.match( 'DOCTYPE' );
	const attributes = ( `${ object.tagName } ${ object.attributes.join( ' ' ) }` ).trim();
	const openingTag = `<${ attributes }${ isSelfClosing && ! isDoctype ? '/' : '' }>`;
	const closingTag = isSelfClosing ? '' : `</${ object.tagName }>`;

	const children = object.children
		.map( child => getStringFromObject( child, indent ) )
		.join( newLine );

	return (

		`${ openingTabs }` +
		`${ openingTag }` +
		`${ newLines }` +
		`${ children }` +
		`${ newLines }` +
		`${ closingTabs }` +
		`${ closingTag }`

	);

}

export function getOptimizedObject( object ) {

	if ( object.textContent ) return object;
	if ( object.children ) object.children.forEach( getOptimizedObject );

	object.attributes = object.attributes.filter( attribute => {

		return object.tagName.match( /(svg|path)/ ) ? ! [

			'version',
			'id',
			'class',
			'xmlns',
			'xmlns:xlink',
			'x',
			'y',
			'style',
			'xml:space',
			'fill'

		].includes( attribute.split( /="/g )[ 0 ] ) : true;

	} );

	if ( object.tagName ) {

		object.tagName = object.tagName.match( 'xml' ) ?
			undefined : object.tagName;

	}

	return object;

}

export function getFormattedString( string, minify = false ) {

	const object = getObjectFromString( string );
	return getStringFromObject( getOptimizedObject( object ), minify );

}

export function isSelfClosingTag( tagName ) {

	return [

		'!DOCTYPE',
		'area', 'base', 'br', 'col',
		'embed', 'hr', 'img', 'input',
		'link', 'meta', 'param', 'source',
		'path', 'circle', 'stop', 'polygon',
		'track', 'wbr'

	].includes( tagName );

}

try { customElements } catch { global.customElements = { define: () => {} } }
try { HTMLElement } catch { global.HTMLElement = Object }
