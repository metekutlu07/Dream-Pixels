import {

	Vector3,
	Object3D,
	Box3,
	LinearEncoding,
	MeshStandardMaterial,
	Mesh,
	Points

} from 'three';

import ArtworkPointsMaterial from '../materials/ArtworkPointsMaterial';

export default class Artwork extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

		this.artworkID = 'france-01-annunciation';
		this.renderAsPoints = false;

	}

	clone( recursive ) {

		return new Object3D().copy( this, recursive );

	}

	onPreFrame() {

		this.children.forEach( child => {

			child.visible = (
				( child.isPoints && this.renderAsPoints ) ||
				( ! child.isPoints && ! this.renderAsPoints )
			);

		} );

	}

	onViewChange() {

		this.visible = Application.store.path === '/photogrammetry';

	}

	onLoad( files ) {

		if ( ! files[ 'france-01-annunciation' ] ) return;
		this.setArtwork( this.artworkID );

	}

	async setArtwork() {

		const { camera } = Application;
		const { lerpState, currentState } = camera.orbitControls;
		currentState.copy( lerpState.set( 50, 0, 0 ) );

		this.scale.setScalar( 1 );
		this.position.setScalar( 0 );
		this.remove( ...this.children );

		const { models, textures } = Application.assets[ this.artworkID ];
		const { objects } = models[ 'Model.glb' ];

		[ 'Base', 'Fill' ].forEach( value => {

			const object = objects[ value ];

			if ( ! object ) return;

			const map = textures[ `${ value }.jpg` ];
			Object.assign( map, { flipY: false, encoding: LinearEncoding } );

			const { geometry } = object;
			const mesh = this.getMesh( geometry, map );
			const points = this.getPoints( geometry, map );

			mesh.hasWireframe = true;

			this.add( mesh, points );

		} );

		const boundingBox = new Box3().setFromObject( this );
		const size = boundingBox.getSize( new Vector3() );
		const center = boundingBox.getCenter( new Vector3() );

		const maxSize = this.artworkID.match( /Kimono/ ) ? 35 :
			this.artworkID.match( /Venice/ ) ? 50 : 25;

		const scale = maxSize / size.y;

		this.scale.setScalar( scale );
		this.position
			.copy( center )
			.multiplyScalar( scale )
			.negate();

	}

	async load( artworkID ) {

		if ( this.artworkID === artworkID ) return;
		this.artworkID = artworkID;

		Application.store.set( 'loading', true );
		await Application.assets.load( this.artworkID );
		Application.store.set( 'loading', false );

		this.setArtwork( this.artworkID );

	}

	getMesh( geometry, map ) {

		const envMap = Application.assets[ 'EnvMap' ];

		return new Mesh( geometry, new MeshStandardMaterial( {

			map,
			envMap,
			metalness: 0,
			roughness: 1

		} ) );

	}

	getPoints( geometry, map ) {

		const { textures } = Application.assets[ 'photogrammetry' ];
		const alphaMap = textures[ 'Circle.png' ];
		const material = new ArtworkPointsMaterial( {

			size: .1,
			transparent: true,
			alphaMap,
			map

		} );

		return new Points( geometry, material );

	}

	toggle() {

		this.renderAsPoints = ! this.renderAsPoints;

	}

}
