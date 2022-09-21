import {

	Texture,
	LinearFilter

} from 'three';

export default class SVGTexture extends Texture {

	constructor( svg, {

		width = 512,
		height = 512,
		flipY = false

	} = {} ) {

		const canvas = document.createElement( 'canvas' );

		canvas.width = width;
		canvas.height = height;

		super( canvas );

		this.minFilter = LinearFilter;
		this.magFilter = LinearFilter;
		this.flipY = flipY;

		this.generateMipmaps = true;
		this.transparent = true;

		this.svg = svg.cloneNode( true );
		this.width = width;
		this.height = height;

		this.serializer = new XMLSerializer();
		this.data = document.createElement( 'img' );
		this.context = canvas.getContext( '2d' );

	}

	copy( source ) {

		super.copy( source );

		this.svg = source.svg;
		this.width = source.width;
		this.height = source.height;

		return this;

	}

	setColor( query, color ) {

		const nodes = this.svg.querySelectorAll( query );

		if ( ! nodes.length ) return;

		for ( const node of nodes ) node.style.fill = color;

	}

	rasterize() {

		this.svg.setAttribute( 'width', this.width );
		this.svg.setAttribute( 'height', this.height );

		return new Promise( ( resolve ) => {

			const string = this.serializer.serializeToString( this.svg );
			const base64 = btoa( unescape( encodeURIComponent( string ) ) );
			const source = `data:image/svg+xml;base64,${ base64 }`;

			this.data.onload = () => {

				this.context.drawImage( this.data, 0, 0, this.width, this.height );
				this.needsUpdate = true;
				resolve();

			};

			this.data.setAttribute( 'src', source );

		} );

	}

}
