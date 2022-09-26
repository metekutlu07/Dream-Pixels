import { MeshStandardMaterial, Object3D } from 'three';

export default class City extends Object3D {

	constructor() {

		super();

		this.parameters = Application.store.add( 'Miniature', {

			aoMapIntensity: { value: .65, max: 1 },
			colors: {
				Grey: '#959595',
				Blue: '#5B5F82',
				Brown: '#F2CF9A',
				White: '#ffffff',
				Black: '#434343',
				Gold: '#FAEE96',
				Pink: '#FFBBC1',
				Turquoise: '#66FFFF',
				Green: '#88C998',
				Purple: '#9E7E98',
				LightGrey: '#CBCCCC'
			}

		} );

		Application.events.add( this );

	}

	clone( recursive ) {

		return new Object3D().copy( this, recursive );

	}

	onLoad( files ) {

		if ( ! files[ 'virtual-miniature' ] ) return;

		const { textures, models } = files[ 'virtual-miniature' ];
		const { objects } = models[ 'City.glb' ];
		const { children } = objects[ 'City' ];
		const envMap = Application.assets[ 'EnvMap' ];

		children.forEach( child => {

			if ( ! child.isMesh ) return;

			const mesh = child.clone();
			const colorID = child.name.split( '-' ).shift();
			const aoMap = textures[ `${ colorID }.png` ] || null;

			if ( aoMap ) mesh.geometry.attributes.uv2 = mesh.geometry.attributes.uv;
			aoMap.flipY = false;

			mesh.material = new MeshStandardMaterial( {

				aoMap,
				envMap,
				metalness: .05,
				roughness: .5

			} );

			mesh.colorID = colorID;
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			this.add( mesh );

		} );

		this.position.set( -1, 0, 0 );

	}

	onPreFrame() {

		this.visible = Application.store.path === '/virtual-miniature';

		this.children.forEach( child => {

			const { aoMapIntensity, colors } = this.parameters;
			const { colorID } = child;
			child.material.aoMapIntensity = aoMapIntensity;
			child.material.color.set( colors[ colorID.toLowerCase() ] );

		} );

	}

}
