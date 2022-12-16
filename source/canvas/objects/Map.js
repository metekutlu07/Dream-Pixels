import { MeshStandardMaterial, Object3D } from 'three';

export default class Map extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

	}

	onPreFrame() {

		const { places } = Application.store;
		const { cosmos } = Application.scene;

		if ( places !== 'cosmos' ) this.position.x = 0;
		else this.position.x = cosmos.position.x;

		this.children.forEach( child => {

			child.visible = places !== 'cosmos' || child.name === 'MAP';

		}, false );

	}

	onLoad( files ) {

		if ( ! files[ 'works' ] ) return;

		const { models } = Application.assets[ 'works' ];
		const { objects } = models[ 'Map.glb' ];
		const envMap = Application.assets[ 'EnvMap' ];

		this.copy( objects[ 'Scene' ] );

		this.traverse( child => {

			if ( ! child.material ) return;

			child.material = new MeshStandardMaterial( {

				envMap,
				color: '#cccccc',
				roughness: .75,
				metalness: .25

			} );

			child.castShadow = true;
			child.receiveShadow = true;

		} );

	}

}
