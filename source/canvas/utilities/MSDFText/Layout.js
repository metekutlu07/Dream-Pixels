const linebreak = new RegExp( /[\n\r]/, 'g' );
const space = new RegExp( /[ ]/, 'g' );

export default class Layout {

	constructor( data, text, style ) {

		this.data = data;

		this.fontHeight = this.data.common.lineHeight;
		this.fontBaseline = this.data.common.base;
		this.fontScaleH = this.data.common.scaleH;
		this.fontScaleW = this.data.common.scaleW;

		this.style = {

			fontSize: 1,
			letterSpacing: 0,
			wordSpacing: 0,
			lineHeight: 1,
			maxWidth: Infinity,
			wordBreak: false,
			textAlign: 'left'

		};

		// this.wordLength = style.wordLength;
		this.leaveWhiteSpace = style.leaveWhiteSpace;

		this.getGlyphCount( text );
		this.getGlyphMap();
		this.setStyle( style );
		this.getXHeight( style );
		this.compute();

	}

	getXHeight() {

		const glyph = this.map[ 'e' ];
		this.xHeight = glyph.height * this.fontScale;
		this.xPosition = ( glyph.height * .5 + glyph.yoffset ) * this.fontScale;

	}

	getGlyphCount( text = '' ) {

		if ( text === this.text ) return;

		this.text = text;
		this.glyphCount = text.replace( /[ \n]/g, '' ).length;

	}

	getGlyphMap() {

		if ( this.map ) return;

		this.map = this.data.chars.reduce( ( accumulator, value ) => {

			accumulator[ value.char ] = value;
			return accumulator;

		}, {} );

	}

	setStyle( style = {} ) {

		this.style = Object.assign( {}, this.style, style );
		this.fontScale = this.style.fontSize / this.fontBaseline;

	}

	getKerning( a, b ) {

		for ( let i = 0, l = this.data.kernings.length; i < l; i++ ) {

			const kern = this.data.kernings[ i ];

			if (

				( kern.first === a && kern.second === b ) ||
				( kern.first === b && kern.second === a )

			) return kern.amount;

		}

		return 0;

	}

	addLine() {

		const line = { width: 0, characters: [] };
		this.word = 0;
		this.lines.push( line );

		return line;

	}

	cleanLine( line ) {

		if ( this.leaveWhiteSpace ) return;

		let last = line.characters.getLast();

		while ( last.glyph.char === ' ' ) {

			const glyph = last.glyph;
			const advance = this.style.wordSpacing * this.style.fontSize + glyph.xadvance * this.fontScale;
			line.width -= advance;
			line.characters.pop();

			last = line.characters.getLast();

		}

	}

	compute() {

		this.lines = [];

		let pointer = 0;
		let line = this.addLine( pointer );

		while ( pointer < this.text.length ) {

			let advance = 0;

			const char = this.text[ pointer ];
			const glyph = this.map[ char ];

			if ( linebreak.test( char ) ) {

				pointer++;
				this.cleanLine( line );
				line = this.addLine( pointer );
				continue;

			}

			// Skip whitespace at start of line
			if ( ! this.leaveWhiteSpace && line.width === 0 && space.test( char ) ) {

				pointer++;
				continue;

			}

			if ( glyph === undefined ) {

				pointer++;
				continue;

			}

			line.characters.push( { glyph, x: line.width } );

			if ( space.test( char ) ) {

				advance += this.style.wordSpacing * this.style.fontSize;

			} else advance += this.style.letterSpacing * this.style.fontSize;

			advance += glyph.xadvance * this.fontScale;
			line.width += advance;
			pointer++;

		}

		if ( ! line.width ) this.lines.pop();

	}

}
