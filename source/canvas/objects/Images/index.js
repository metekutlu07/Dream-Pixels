import {

	Object3D,
	Vector3,
	Raycaster

} from 'three';

import Image from './Image';

export default class Images extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

		this.maxCount = 250;
		this.raycaster = new Raycaster();

	}

	onLoad( files ) {

		if ( ! files[ 'works' ] ) return;

		const { textures } = files[ 'works' ];

		const entries = Object
			.entries( textures )
			.filter( entries => entries[ 0 ].match( 'Images' ) );

		if ( entries.length > this.maxCount ) {

			entries.shuffle();
			entries.length = this.maxCount;

		}

		const points = this
			.getFibonacciSpherePoints( entries.length )
			.sort( () => Math.random() - .5 );

		entries.forEach( ( entry, entryID ) => {

			const [ key, map ] = entry;
			const point = points[ entryID ];

			const index = key.match( /\d+/g )[ 0 ];
			const image = new Image( map, point, index );
			this.add( image );

		} );

		this.children.sort( ( a, b ) => a.radius - b.radius );
		this.children.forEach( ( child, index ) => child.renderOrder = this.children.length - index );

	}

	onPreUpdate() {

		const { path, list } = Application.store;
		const isVisible = path === '/works' && list === 'sphere';

		if ( this.isVisible === isVisible || ! this.children.length ) return;
		this.isVisible = isVisible;

		this.children.forEach( child => child.toggle( this.isVisible ) );

		Application.cursor.reset();

	}

	onPostUpdate() {

		if ( ! this.isVisible ) return;

		const { camera, pointer } = Application;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		const objects = this.children.filter( child => child.isVisible );
		const intersect = this.raycaster.intersectObjects( objects, false )[ 0 ];
		const object = intersect ? intersect.object : null;

		if ( ! object ) Application.cursor.reset();

		this.children.forEach( child => child.isHovered = child === object );

	}

	getFibonacciSpherePoints( count = 1, radius = 25 ) {

		const points = [];
		const offset = 2 / count;
		const increment = Math.PI * ( 3 - Math.sqrt( 5 ) );

		for ( let i = 0; i < count; i++ ) {

			let y = ( ( i * offset ) - 1 ) + ( offset / 2 );
			const distance = Math.sqrt( 1 - Math.pow( y, 2 ) );
			const phi = ( ( i + 1 ) % count ) * increment;

			let x = Math.cos( phi ) * distance;
			let z = Math.sin( phi ) * distance;

			x *= radius;
			y *= radius;
			z *= radius;

			points.push( new Vector3( x, y, z ) );

		}

		return points;

	}

}
