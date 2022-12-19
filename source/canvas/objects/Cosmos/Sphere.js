import {

	Object3D,
	MeshStandardMaterial,
	RepeatWrapping,
	Box3,
	Vector3

} from 'three';

import Title from './Title';

export default class Sphere extends Object3D {

	constructor( sphereID, parameters ) {

		super();

		Application.events.add( this );

		this.titles = [];

		const { textures } = Application.assets[ 'works' ];
		const envMap = Application.assets[ 'EnvMap' ];
		const map = textures[ `Cosmos/Patterns/${ sphereID }.jpg` ];
		if ( map ) map.wrapT = map.wrapS = RepeatWrapping;

		const material = new MeshStandardMaterial( {

			map: map || null,
			envMap,
			transparent: true,
			roughness: .65,
			metalness: .15

		} );

		if ( parameters.rightHalf ) {

			this.rightHalf = parameters.rightHalf;
			this.add( this.rightHalf );

			this.leftHalf = parameters.leftHalf;
			this.add( this.leftHalf );

		} else {

			this.mesh = parameters.mesh;
			this.add( this.mesh );

		}

		this.traverse( child => child.material = material.clone() );

		this.boundingBox = new Box3();
		this.size = new Vector3();

		this.boundingBox.setFromObject( this );
		this.boundingBox.getSize( this.size );
		this.radius = this.size.y * .5;

		this.title = new Title( sphereID );
		this.title.position.y = this.radius + 35;
		this.titles.push( this.title );
		this.add( this.title );

		if ( sphereID === 'Zodiac' ) this.setZodiacs();

	}

	async enter() {

		const delay = 1250 + ( 11 - this.index ) * 75;
		if ( this.leftHalf ) this.setHalves( delay );
		this.titles.forEach( title => title.enter( delay ) );

	}

	setHalves( delay ) {

		this.leftHalf.position.x = 0;
		this.rightHalf.position.x = 0;
		this.rightHalf.material.opacity = 1;

		const targets = [

			this.leftHalf.position,
			this.rightHalf.position,
			this.rightHalf.material

		];

		if ( this.animations ) {

			this.animations.forEach( animation => animation.remove( targets ) );
			this.animations = null;

		}

		const x = ( this.index + 1 ) / 12 * 750;
		const opacity = 0;
		const parameters = {

			delay,
			easing: 'easeInOutExpo',
			duration: 2000,

		};

		this.animations = [

			anime( { ...parameters, targets: this.leftHalf.position, x: -x } ),
			anime( { ...parameters, targets: this.rightHalf.position, x } ),
			anime( { ...parameters, targets: this.rightHalf.material, opacity } ),

		];

	}

	setZodiacs() {

		const { textures } = Application.assets[ 'works' ];
		const radius = this.radius + 25;

		Object.entries( textures ).filter( entry => {

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

			this.titles.push( title );

			return title;

		} );

	}

	onPreFrame() {

		const { x } = ( this.leftHalf || this.mesh ).position;
		this.titles.forEach( title => title.position.x = x );

	}

}
