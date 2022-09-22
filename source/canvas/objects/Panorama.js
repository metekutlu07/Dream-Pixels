import {

	Mesh,
	SphereGeometry,
	BackSide,
	Raycaster,
	Vector3,
	RepeatWrapping

} from 'three';

import PanoramaBasicMaterial from '../materials/PanoramaBasicMaterial';

export default class Panorama extends Mesh {

	constructor() {

		const geometry = new SphereGeometry( 15 );
		const material = new PanoramaBasicMaterial( { side: BackSide } );

		super( geometry, material );

		this.raycaster = new Raycaster();
		this.rotation.y = Math.PI;
		this.artworkID = 'miniature-street-view-1';

		Application.events.add( this );

	}

	async load( textureID ) {

		if ( this.textureID === textureID ) return;
		this.textureID = textureID;

		Application.store.set( 'loading', true );
		await Application.assets.load( `miniature-street-view-${ textureID }` );
		Application.store.set( 'loading', false );

		this.setTexture( this.textureID );

	}

	setTexture( textureID ) {

		this.textureID = textureID;

		const { textures } = Application.assets.get( `miniature-street-view-${ textureID }` );
		const map = textures[ 'Left.jpg' ];
		Object.assign( this.material, { map, needsUpdate: true } );

		const mapLeft = textures[ 'Left.jpg' ];
		const mapRight = textures[ 'Right.jpg' ];
		mapLeft.repeat.set( -2, 1 );
		mapRight.repeat.set( -2, 1 );

		Object.assign( mapLeft, { wrapS: RepeatWrapping } );
		Object.assign( mapRight, { wrapS: RepeatWrapping } );

		this.material.uniforms[ 'mapLeft' ].value = mapLeft;
		this.material.uniforms[ 'mapRight' ].value = mapRight;

	}

	onLoad( files ) {

		if ( ! files[ 'miniature-street-view' ] ) return;

		this.setTexture( '1' );

	}

	onInputStart() {

		const { camera, pointer } = Application;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		// const intersect = this.raycaster.intersectObject( this );
		// console.log( intersect[ 0 ].point );

	}

	onViewChange() {

		this.visible = Application.store.path === '/miniature-street-view';

	}

}
