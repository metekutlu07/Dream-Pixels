import {

	Mesh,
	SphereGeometry,
	MeshBasicMaterial,
	BackSide,
	Raycaster,
	Vector3,
	RepeatWrapping

} from 'three';

export default class Panorama extends Mesh {

	constructor() {

		const geometry = new SphereGeometry( 15 );
		const material = new MeshBasicMaterial( { side: BackSide } );

		super( geometry, material );

		this.raycaster = new Raycaster();

		Application.events.add( this );

	}

	setTexture( textureID ) {

		this.textureID = textureID;

		const { textures } = Application.assets.get( 'miniature-street-view' );
		const map = textures[ `${ textureID }.jpg` ];
		map.repeat.set( -1, 1 );

		Object.assign( map, { wrapS: RepeatWrapping } );
		Object.assign( this.material, { map, needsUpdate: true } );

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
