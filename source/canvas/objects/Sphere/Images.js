import {

	Object3D,
	Vector3,
	Raycaster,
	Spherical

} from 'three';

import Image from './Image';

export default class Images extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

		this.raycaster = new Raycaster();

	}

	onLoad( files ) {

		if ( ! files[ 'projects' ] ) return;

		const { textures } = files[ 'projects' ];

		const images = Object.values( textures );

		images
			.map( ( map, index ) => new Image( map, index ) )
			.forEach( image => this.add( image ) );

		const points = this.getFibonacciSpherePoints( images.length );
		const spherical = Spherical.get();

		this.children.forEach( ( child, index ) => {

			const { x, y, z } = points[ index ];
			const { phi, theta } = spherical.setFromCartesianCoords( x, y, z );
			child.phi = phi;
			child.theta = theta;

		} );

		this.children.sort( ( a, b ) => a.radius - b.radius );
		this.children.forEach( ( child, index ) => child.renderOrder = this.children.length - index );

		Spherical.release( spherical );

	}

	onPreUpdate() {

		const { path, list } = Application.store;
		const isVisible = path === '/projects' && list === 'sphere';

		if ( this.isVisible === isVisible || ! this.children.length ) return;
		this.isVisible = isVisible;

		this.children.forEach( child => child.toggle( this.isVisible ) );

		// const position = this.isVisible ? index / 10 )
		// child.toggle(this.isVisible, this.position)
		// 	Math.floor(  :
		// 	Math.floor( ( this.children.length - index ) / 10 );

		this.object = null;

	}

	onUpdate() {

		// const project = this.object ? this.object.project : null;
		// Application.store.set( 'crosshair', this.isVisible );
		// Application.store.set( 'object', this.object );
		// Application.store.set( 'project', project );

	}

	onPostUpdate() {

		if ( ! this.isVisible ) return;

		const { camera, pointer } = Application;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		const objects = this.children.filter( child => child.offset < .025 );
		const intersect = this.raycaster.intersectObjects( objects )[ 0 ];
		const object = intersect && ! pointer.isPressed ? intersect.object : null;

		if ( object && object !== this.object ) Application.audio.play( '007.mp3', { volume: .1 } );
		this.object = object;

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

			points.push( { x, y, z } );

		}

		return points;

	}

}
