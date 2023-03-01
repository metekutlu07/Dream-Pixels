import { Mesh, BufferGeometry, MeshStandardMaterial } from 'three';

export default class Cup extends Mesh {

	constructor() {

		const geometry = new BufferGeometry();
		const material = new MeshStandardMaterial();

		super( geometry, material );

		Application.events.add( this );

	}

	async onViewChange() {

		this.onModeChange();

	}

	async onModeChange() {

		const { path, list, places } = Application.store;
		this.visible = path === '/works' && list === 'places' && places === 'cosmos';
		if ( ! this.visible ) return;

		this.position.y = -500;

	}

	async onCosmosAnimation() {

		if ( this.animation ) this.animation.remove( this.position );

		this.animation = anime( {

			targets: this.position,
			easing: 'easeInOutExpo',
			duration: 3500,
			delay: 250,
			y: -1250,

		} );

		await this.animation.finished;
		this.visible = false;

	}

	onLoad( files ) {

		if ( ! files[ 'places' ] ) return;

		this.spheres = {};
		this.visible = false;

		const { models, textures } = Application.assets[ 'places' ];
		const { objects } = models[ 'Cup/Model.glb' ];
		this.copy( objects[ 'Cup' ] );

		const envMap = Application.assets[ 'EnvMap' ];

		textures[ 'Cup/Albedo.jpg' ].flipY = false;
		textures[ 'Cup/AO.jpg' ].flipY = false;
		textures[ 'Cup/Metalness.jpg' ].flipY = false;
		textures[ 'Cup/Normal.jpg' ].flipY = false;

		Object.assign( this.material, {

			envMap,
			map: textures[ 'Cup/Albedo.jpg' ],
			aoMap: textures[ 'Cup/AO.jpg' ],
			metalnessMap: textures[ 'Cup/Metalness.jpg' ],
			normalMap: textures[ 'Cup/Normal.jpg' ],
			roughness: .15

		} );

		this.scale.setScalar( 25 );

	}

}
