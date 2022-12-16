import {

	MeshStandardMaterial,
	Object3D,
	RepeatWrapping,
	Box3,
	Vector3

} from 'three';

import Title from './Title';

export default class Cosmos extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

	}

	onPreFrame() {

		const spreadX = 750;

		this.traverse( child => {

			const { name, isSphere, isTitle } = child;

			if ( ! isSphere && ! isTitle ) return;

			const sphereID = name.replace( /(Left|Right)/g, '' );
			const { spread, radius } = this.spheres[ sphereID ];

			const direction = name.match( /Right/g ) ? 1 : -1;
			const offsetX = spread * spreadX * direction;
			child.position.x = Math.lerp( 0, offsetX, 1 );

			if ( sphereID === 'Zodiac' ) child.position.x -= 25;
			if ( ! isTitle ) return;
			child.position.y = radius + 35;

		} );

		this.zodiacs && this.zodiacs.forEach( zodiac => {

			const { spread } = this.spheres[ 'Zodiac' ];
			const offsetX = spread * spreadX * -1;
			zodiac.position.x = Math.lerp( 0, offsetX, 1 );
			zodiac.position.x -= 25;

		} );

		this.position.x = spreadX * .25;

	}

	onLoad( files ) {

		if ( ! files[ 'works' ] ) return;

		this.spheres = {};

		const { models, textures } = Application.assets[ 'works' ];
		const { objects } = models[ 'Cosmos.glb' ];
		this.copy( objects[ 'Scene' ] );

		const box = Box3.get();
		const size = Vector3.get();

		this.traverse( child => {

			const { name } = child;
			child.material = new MeshStandardMaterial();

			const mapID = name.replace( /Left|Right/g, '' );
			const map = textures[ `Cosmos/Patterns/${ mapID }.jpg` ];
			const envMap = Application.assets[ 'EnvMap' ];

			if ( name.match( 'Right' ) ) child.visible = false;

			if ( map ) map.wrapT = map.wrapS = RepeatWrapping;

			Object.assign( child.material, {

				map: map || null,
				envMap,
				roughness: .65,
				metalness: .15

			} );


			if ( ! name.match( /(AxisMundi|Scene)/g ) ) {

				child.isSphere = true;

				box.setFromObject( child );
				box.getSize( size );

				const diameter = size.y;
				const radius = diameter * .5;
				const spread = Math.mapLinear( diameter, 270, 600, 0, 1 );
				const sphereID = name.replace( /(Left|Right)/g, '' );

				this.spheres[ sphereID ] = { radius, spread };

			}

		} );

		this.scale.setScalar( .5 );

		Object
			.entries( this.spheres )
			.forEach( entry => {

				const [ sphereID, { radius } ] = entry;
				const title = new Title( sphereID, radius );
				title.isTitle = true;
				title.name = sphereID;
				this.add( title );

			} );

		this.setZodiacs();

	}

	setZodiacs() {

		const { textures } = Application.assets[ 'works' ];
		const radius = this.spheres[ 'Zodiac' ].radius + 25;

		this.zodiacs = Object
			.entries( textures )
			.filter( entry => {

				const [ textureID ] = entry;
				return textureID.match( 'Cosmos/Zodiacs/' );

			} ).map( entry => {

				const [ textureID ] = entry;
				if ( ! textureID.match( 'Cosmos/Zodiacs/' ) ) return;

				const [ number, signID ] = textureID
					.replace( 'Cosmos/Zodiacs/', '' )
					.replace( /\s/g, '' )
					.replace( /.png/g, '' )
					.split( '-' );

				const index = parseInt( number );
				const step = Math.PI * 2 / 12;
				const angle = ( index + .5 ) * step;

				const title = new Title( signID );
				this.add( title );

				const y = Math.cos( angle ) * radius;
				const z = Math.sin( angle ) * radius;
				title.position.set( 0, y, z );

				return title;

			} );

	}

}
