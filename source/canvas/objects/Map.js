import { MeshStandardMaterial, Object3D } from 'three';

export default class Map extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

	}

	onLoad( files ) {

		if ( ! files[ 'works' ] ) return;

		const { models } = Application.assets[ 'works' ];
		const { objects } = models[ 'Scene.glb' ];
		const envMap = Application.assets[ 'EnvMap' ];

		this.copy( objects[ 'Scene' ] );

		this.traverse( child => {

			if ( ! child.material ) return;

			const { color } = child.material;

			child.material = new MeshStandardMaterial( {

				envMap,
				color,
				roughness: .15,
				metalness: .75

			} );

			child.castShadow = true;
			child.receiveShadow = true;

		} );

	}

}
