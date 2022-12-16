import { MeshStandardMaterial, Object3D } from 'three';

export default class Church extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

	}

	onLoad( files ) {

		if ( ! files[ 'rasdelka' ] ) return;

		const { textures, models } = files[ 'rasdelka' ];
		const { objects } = models[ 'Church.glb' ];
		const { children } = objects[ 'Scene' ];

		const colors = {

			'Blue': '#0000ff',
			'DarkBlue': '#6577c2',
			'DarkestBlue': '#5669af',
			'DoorGrey': '#8e8e8e',
			'Gold': '#ffe887',
			'LightBlue': '#aae7ff',
			'Orange': '#ffbc00',
			'Pink': '#ffd0f7',
			'Purple': '#bc00bc',
			'Red': '#ff0000',
			'White': '#f9f9f9',
			'WindowGrey': '#696969',
			'Ground': '#FEAC64'

		};

		children.forEach( child => {

			const mesh = child.clone();
			const colorID = child.name;

			const { attributes } = mesh.geometry;
			const aoMap = textures[ `${ colorID }.png` ] || null;
			const envMap = Application.assets[ 'EnvMap' ];
			aoMap.flipY = false;

			if ( aoMap ) attributes.uv2 = attributes.uv;

			mesh.castShadow = true;
			mesh.receiveShadow = true;

			mesh.material = new MeshStandardMaterial( {

				aoMap,
				envMap,
				color: colors[ colorID ],
				aoMapIntensity: 1,
				metalness: 0,
				roughness: .5

			} );

			this.add( mesh );

		} );

		this.scale.setScalar( 5 );

	}

	onPreFrame() {

		const y = Application.viewport.width > 768 ? -3 : -1;
		this.position.set( 0, y, 0 );

	}

	async onViewChange() {

		this.visible = Application.store.path === '/rasdelka';

	}

}
