import {

	InstancedMesh,
	InstancedBufferAttribute,
	Vector2,
	Vector3,
	Vector4,
	Box3,
	Object3D,
	PlaneGeometry,
	Sphere

} from 'three';

import Layout from './Layout';

import MSDFTextMaterial from './MSDFTextMaterial';

export default class MSDFText extends InstancedMesh {

	constructor( SDFData, SDFMap ) {

		const envMap = Application.assets[ 'EnvMap' ];

		const count = 35;
		const geometry = new PlaneGeometry();
		const material = new MSDFTextMaterial( {

			SDFMap,
			envMap,
			roughness: .95,
			metalness: .1

		} );

		super( geometry, material, count );

		this.SDFData = SDFData;
		this.SDFMap = SDFMap;

		this.objects = Array.from( { length: count }, () => new Object3D() );
		for ( const object of this.objects ) this.add( object );

		this.size = new Vector3();
		this.boundingBox = new Box3();
		this.boundingSphere = new Sphere();
		this.frustumCulled = true;

		this.coordinates = new InstancedBufferAttribute( new Float32Array( count * 4 ), 4 );
		this.geometry.setAttribute( 'coordinates', this.coordinates );

	}

	setParameters( content = 'Text', {

		fontSize = 1,
		textAlign = 'center',
		strokeColor = '#ffffff',
		strokeWidth = 0,
		lineHeight = 1,
		leaveWhiteSpace,
		wordLength

	} = {} ) {

		this.content = content;
		this.material.uniforms[ 'strokeColor' ].value.set( strokeColor );
		this.material.uniforms[ 'strokeWidth' ].value = strokeWidth;

		this.layout = new Layout( this.SDFData, content, {

			fontSize,
			textAlign,
			lineHeight,
			wordLength,
			leaveWhiteSpace

		} );

		this.style = this.layout.style;
		this.fontScale = this.layout.fontScale;

		this.instanceMatrix.needsUpdate = true;
		this.coordinates.needsUpdate = true;

		this.setLines();

	}

	setLines() {

		this.boundingBox.makeEmpty();

		for ( let i = 0, l = this.objects.length; i < l; i++ ) {

			const object = this.objects[ i ];
			object.scale.setScalar( 0 );
			object.position.setScalar( 0 );
			object.updateMatrixWorld();
			this.setMatrixAt( i, object.matrix );

		}

		this.y = .07 * this.style.fontSize;
		this.line = 0;
		this.index = 0;

		for ( let i = 0, l = this.layout.lines.length; i < l; i++ )
			this.setLine( this.layout.lines[ i ], i );

		this.boundingBox.getSize( this.size );
		this.boundingBox.getBoundingSphere( this.boundingSphere );
		this.geometry.boundingSphere = this.boundingSphere;

	}

	setLine( line ) {

		const position = Vector2.get();
		const coordinates = Vector4.get();
		const space = new RegExp( /[ ]/, 'g' );
		const { scaleW, scaleH } = this.SDFData.common;

		for ( let i = 0; i < line.characters.length; i++ ) {

			const character = line.characters[ i ];
			const glyph = character.glyph;
			const object = this.objects[ this.index ];

			position.x = line.characters[ i ].x;
			position.y = this.y;

			if ( space.test( glyph.char ) ) continue;

			if ( this.style.textAlign === 'center' ) position.x -= line.width * .5;
			else if ( this.style.textAlign === 'right' ) position.x -= line.width;

			position.x += glyph.xoffset * this.fontScale;
			position.x += glyph.width * this.fontScale * .5;

			let yOffset = glyph.yoffset * this.fontScale;
			yOffset += glyph.height * this.fontScale * .5;
			position.y -= yOffset - .5;

			const width = glyph.width * this.fontScale;
			const height = glyph.height * this.fontScale;

			const u = glyph.x / scaleW;
			const w = glyph.width / scaleW;
			const h = glyph.height / scaleH;
			const v = 1 - glyph.y / scaleH - h;

			object.scale.set( width, height, 1 );
			object.position.copy( position ).setZ( this.index * 1e-3 );
			object.updateMatrixWorld();

			coordinates.set( u, v, w, h );
			coordinates.toArray( this.coordinates.array, this.index * 4 );

			this.boundingBox.expandByPoint( position );
			this.setMatrixAt( this.index, object.matrix );

			this.index++;

		}

		this.y -= this.style.lineHeight * 1.2 * this.style.fontSize;
		this.line++;

		Vector2.release( position );
		Vector4.release( coordinates );

	}

}
