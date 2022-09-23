import {

	Object3D,
	PlaneGeometry,
	MeshBasicMaterial,
	Mesh,
	Vector2,
	Vector3,
	Raycaster,
	Spherical

} from 'three';

export default class Images extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

		this.raycaster = new Raycaster();

	}

	onLoad( files ) {

		if ( ! files[ 'projects' ] ) return;

		const { textures } = files[ 'projects' ];

		const children = Object.entries( textures ).map( entry => {

			const [ name, map ] = entry;
			const { naturalWidth, naturalHeight } = map.image;
			const aspect = naturalWidth / naturalHeight;

			const parameters = { map, depthTest: false, fog: true, transparent: true };
			const material = new MeshBasicMaterial( parameters );
			const geometry = new PlaneGeometry( aspect, 1 );
			const mesh = new Mesh( geometry, material );

			const projectID = name.split( '/' ).shift();
			mesh.project = Application.content.get( projectID );
			mesh.aspect = aspect;
			mesh.scaleFactor = 20;

			return mesh;

		} ).filter( Boolean );

		const count = children.length * 4;
		const points = this.getFibonacciSpherePoints( count );
		const spherical = new Spherical();

		points.forEach( ( point, index ) => {

			const source = children[ index % children.length ];
			const clone = source.clone();
			clone.material = source.material.clone();

			const { x, y, z } = point;
			const { phi, theta } = spherical.setFromCartesianCoords( x, y, z );
			const { aspect, project, scaleFactor } = source;
			const offset = 1;

			Object.assign( clone, { phi, theta, aspect, project, offset, scaleFactor } );

			clone.initialState = { phi, theta };
			clone.radius = Math.randFloat( 50, 100 );
			clone.velocity = new Vector2()
				.setX( Math.randFloat( -1, 1 ) )
				.setY( Math.randFloat( -1, 1 ) )
				.setLength( 1e-4 );

			this.add( clone );

		} );

		this.children.sort( ( a, b ) => a.radius - b.radius );
		this.children.forEach( ( child, index ) => child.renderOrder = this.children.length - index );

	}

	onPreUpdate() {

		const { path, list } = Application.store;
		const isVisible = path === '/projects' && list === 'sphere';

		if ( this.isVisible === isVisible || ! this.children.length ) return;
		this.isVisible = isVisible;

		this.children.map( ( child, index ) => {

			if ( child.animation ) child.animation.remove( child );

			const factor = this.isVisible ?
				Math.floor( index / 10 ) :
				Math.floor( ( this.children.length - index ) / 10 );

			const easing = 'easeOutQuint';
			const offset = this.isVisible ? 0 : 1;
			const duration = this.isVisible ? 1000 : 500;
			const delay = this.isVisible ? 250 + factor * 50 : factor * 10;

			child.animation = anime( { targets: child, easing, duration, delay, offset } );

		} );

		this.children.forEach( child => {

			child.theta = child.initialState.theta;
			child.phi = child.initialState.phi;

		} );

		this.object = null;

	}

	onUpdate() {

		const project = this.object ? this.object.project : null;
		Application.store.set( 'crosshair', this.isVisible );
		Application.store.set( 'object', this.object );
		Application.store.set( 'project', project );

		this.children.forEach( child => {

			const {

				position,
				phi,
				theta,
				radius,
				offset,
				scaleFactor,
				velocity

			} = child;

			child.visible = offset < .95;
			child.scale.setScalar( scaleFactor );
			child.material.opacity = 1 - offset;

			if ( ! this.isVisible ) return;

			child.phi += velocity.x;
			child.theta += velocity.y;

			const length = ( radius + offset * 5 );

			position.x = length * Math.sin( phi ) * Math.sin( theta );
			position.y = length * Math.cos( phi );
			position.z = length * Math.sin( phi ) * Math.cos( theta );

			child.lookAt( Application.scene.position );

		} );

	}

	onPostUpdate() {

		if ( ! this.isVisible ) return;

		const { camera, pointer } = Application;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		const intersect = this.raycaster.intersectObjects( this.children )[ 0 ];
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
