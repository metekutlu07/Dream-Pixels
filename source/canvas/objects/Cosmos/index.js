import {

	MeshStandardMaterial,
	Object3D,
	RepeatWrapping,
	Box3,
	Vector3

} from 'three';

export default class Cosmos extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

	}

	onPreFrame() {

		this.traverse( child => {

			const { name } = child;

			if ( ! name.match( /(Left|Right)/g ) ) return;

			const direction = name.match( /Left/g ) ? -1 : 1;
			const offsetX = child.offsetRatio * 250 * direction;
			child.position.x = Math.lerp( 0, offsetX, 1 );

		} );

		this.position.x = 62.5;

	}

	onLoad( files ) {

		if ( ! files[ 'works' ] ) return;

		const { models, textures } = Application.assets[ 'works' ];
		const { objects } = models[ 'Cosmos.glb' ];
		this.copy( objects[ 'Scene' ] );

		const box = Box3.get();
		const size = Vector3.get();

		this.traverse( child => {

			const { name } = child;
			child.material = new MeshStandardMaterial();

			const mapID = name.replace( /Left|Right/g, '' );
			const map = textures[ `Cosmos/${ mapID }.jpg` ];

			if ( name.match( 'Right' ) ) child.visible = false;
			if ( map ) {

				Object.assign( child.material, { map, roughness: .95, metalness: .25 } );
				map.wrapT = map.wrapS = RepeatWrapping;

			}

			if ( name.match( /(Left|Right)/g ) ) {

				box.setFromObject( child );
				box.getSize( size );

				child.offsetRatio = Math.mapLinear( size.y, 290, 600, 0, 1 );

			}

		} );

		this.scale.setScalar( .5 );

	}

}
