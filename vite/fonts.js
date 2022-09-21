import { readFile } from 'fs/promises';

const TABLE_COUNT_OFFSET = 4;
const TABLE_HEAD_OFFSET = 12;
const TABLE_HEAD_SIZE = 16;
const TAG_OFFSET = 0;
const TAG_SIZE = 4;
const CHECKSUM_OFFSET = TAG_OFFSET + TAG_SIZE;
const CHECKSUM_SIZE = 4;
const CONTENTS_PTR_OFFSET = CHECKSUM_OFFSET + CHECKSUM_SIZE;
const CONTENTS_PTR_SIZE = 4;
const LENGTH_OFFSET = TABLE_HEAD_SIZE + CONTENTS_PTR_OFFSET;

const getCount = ( dataView ) => dataView.readUInt16BE( TABLE_COUNT_OFFSET );
const getOffset = ( dataView, name ) => getTableHead( dataView, name ).contents;

function fixed16dot16( fixed ) {

	if ( fixed & 0x80000000 ) fixed = -( ~ fixed + 1 );
	return fixed / 65536;

}

function getTableHead( dataView, name ) {

	const length = getCount( dataView );

	for ( let i = 0; i < length; ++i ) {

		const offset = TABLE_HEAD_OFFSET + i * TABLE_HEAD_SIZE;
		const tag = dataView.slice( offset, offset + CONTENTS_PTR_SIZE ).toString();

		if ( tag !== name ) continue;

		return {

			tag: tag,
			checksum: dataView.readUInt32BE( offset + CHECKSUM_OFFSET ),
			contents: dataView.readUInt32BE( offset + CONTENTS_PTR_OFFSET ),
			length: dataView.readUInt32BE( offset + LENGTH_OFFSET )

		};

	}

}

function getOS2( dataView ) {

	const VERSION_OFFSET = 0;
	const WEIGHT_CLASS_OFFSET = 4;
	const offset = getOffset( dataView, 'OS/2' );

	return {

		version: dataView.readUInt16BE( offset + VERSION_OFFSET ),
		weight: dataView.readUInt16BE( offset + WEIGHT_CLASS_OFFSET )

	};

}

function getData( dataView ) {

	const NAME_IDS = [

		'copyright',
		'fontFamily',
		'fontSubfamily',
		'uniqueID',
		'fullName',
		'version',
		'postScriptName',
		'trademark',
		'manufacturer',
		'designer',
		'description',
		'manufacturerURL',
		'designerURL',
		'license',
		'licenseURL',
		'reserved',
		'preferredFamily',
		'preferredSubfamily',
		'compatibleFullName',
		'sampleText',
		'postScriptFindFontName',
		'wwsFamily',
		'wwsSubfamily'

	];

	const offset = getOffset( dataView, 'name' );
	const offsetStorage = dataView.readUInt16BE( offset + 4 );
	const length = dataView.readUInt16BE( offset + 2 );
	const storage = offsetStorage + offset;
	const data = {};

	for ( let i = 0; i < length; i++ ) {

		const subOffset = offset + 6 + i * 12;
		const dataID = NAME_IDS[ dataView.readUInt16BE( subOffset + 6 ) ];
		const stringLength = dataView.readUInt16BE( subOffset + 8 );
		const stringOffset = dataView.readUInt16BE( subOffset + 10 );

		if ( data[ dataID ] ) continue;

		let string = '';

		for ( let j = 0; j < stringLength; j++ ) {

			const charCode = dataView[ storage + stringOffset + j ];
			if ( charCode === 0 ) continue;
			string += String.fromCharCode( charCode );

		}

		data[ dataID ] = string;

	}

	[

		'fontFamily',
		'fontSubfamily',
		'preferredFamily',
		'preferredSubfamily'

	].forEach( key => data[ key ] = getNormalizedName( data[ key ] ) );

	return data;

}

function getNormalizedName( name ) {

	if ( ! name ) return;

	Object.entries( {

		'Bl': 'Black',
		'UBd': 'UltraBold',
		'Bd': 'Bold',
		'Md': 'Medium',
		'Rg': 'Regular',
		'Su': 'Super',
		'Bk': 'Book',
		'Lt': 'Light',
		'Th': 'Thin',

		'It': 'Italic',
		'Ita': 'Italic',
		'Exp': 'Expanded',
		'Ext': 'Extended',
		'Cn': 'Condensed',
		'Cond': 'Condensed',
		'XCond': 'XCondensed',
		'XXCond': 'XXCondensed',
		'Cm': 'Compressed',
		'Ds': 'Display',
		'Txt': 'Text',
		'Lz': 'Lazer',
		'Ob': 'Oblique',
		'X': 'Extra',

		'Extra ': 'Extra',
		'No ': 'No',
		'Semi ': 'Semi',
		'ULt': 'UltraLight',
		'U Light': 'UltraLight',
		'U Bold': 'UltraBold',

		'Trial': '',
		'TRIAL': '',
		'Test ': '',
		'Unlicensed': ''

	} ).forEach( ( [ key, value ] ) => {

		const regExp = new RegExp( `\\b${ key }\\b`, 'g' );
		name = name.replace( regExp, value ).trim();
		name = name.replace( 'XXTrial', '' ).trim();

	} );

	return name;

}

function getPost( dataView ) {

	const FORMAT_OFFSET = 0;
	const ITALIC_ANGLE_OFFSET = FORMAT_OFFSET + 4;
	const UNDERLINE_POSITION_OFFSET = ITALIC_ANGLE_OFFSET + 8;
	const UNDERLINE_THICKNESS_OFFSET = UNDERLINE_POSITION_OFFSET + 2;
	const IS_FIXED_PITCH_OFFSET = UNDERLINE_THICKNESS_OFFSET + 2;

	const offset = getOffset( dataView, 'post' );

	return {

		format: fixed16dot16( dataView.readUInt32BE( offset + FORMAT_OFFSET ) ),
		italicAngle: fixed16dot16( dataView.readUInt32BE( offset + ITALIC_ANGLE_OFFSET ) ),
		underlinePosition: dataView.readInt16BE( offset + UNDERLINE_POSITION_OFFSET ),
		underlineThickness: dataView.readInt16BE( offset + UNDERLINE_THICKNESS_OFFSET ),
		isFixedPitch: dataView.readUInt32BE( offset + IS_FIXED_PITCH_OFFSET ),
		minMemType42: dataView.readUInt32BE( offset + 7 ),
		maxMemType42: dataView.readUInt32BE( offset + 9 ),
		minMemType1: dataView.readUInt32BE( offset + 11 ),
		maxMemType1: dataView.readUInt32BE( offset + 13 )

	};

}

export async function parseFontFile( path ) {

	const dataView = await readFile( path );

	if ( ! dataView.length ) return console.log( `Unable to read font file: ${ path }` );

	try {

		return Object.assign( {},

			getOS2( dataView ),
			getData( dataView ),
			getPost( dataView )

		);

	} catch ( error ) { console.log( error ) }

}
