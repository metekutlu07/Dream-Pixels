import {

	Raycaster,
	Float32BufferAttribute,
	Vector3,
	Color,
	Points,
	BufferGeometry,
	LineBasicMaterial,
	Line

} from 'three';

import ParticlesMaterial from '~/canvas/materials/ParticlesMaterial';

import Simulation from './Simulation';
import Title from './Title';
import Camera from './Camera';

export default class Particles extends Points {

	constructor() {

		const width = 128;
		const height = 128;
		const count = width * height;

		const size = .05;
		const geometry = new BufferGeometry();
		const material = new ParticlesMaterial( { size } );

		const positions = [];
		const points = [];
		const colors = [];

		for ( let i = 0; i < count; i++ ) {

			const x = Math.floor( i % width ) / width;
			const y = Math.floor( i / width ) / height;
			const z = 0;

			positions.push( x, y, z );
			colors.push( 1, 1, 1 );
			points.push( new Vector3() );

		}

		geometry.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
		geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

		super( geometry, material );

		Application.events.add( this );

		this.width = width;
		this.height = height;
		this.count = width * height;
		this.size = size;
		this.points = points;

		this.simulation = new Simulation( width, height );
		this.camera = new Camera( this.simulation.curve );
		this.raycaster = new Raycaster();

		this.add( this.camera );

	}

	async onLoad( files ) {

		if ( ! files[ 'projects' ] ) return;

		const { jsons } = files[ 'projects' ];
		const { images, colors } = jsons[ 'Colors.json' ];
		const { array } = this.geometry.attributes.color;

		this.simulation.setPoints( this.points );

		const color = new Color();
		this.groups = {};
		this.colors = [];

		for ( let i = 0; i < this.count; i++ ) {

			const [ hex, imageID ] = colors[ i % colors.length ].split( '|' );
			const { path, caption, tags } = images[ imageID ];

			this.groups[ path ] = this.groups[ path ] || [];
			this.groups[ path ].push( this.points[ i ] );

			const { r, g, b } = color.setStyle( hex );
			array[ i * 3 + 0 ] = r;
			array[ i * 3 + 1 ] = g;
			array[ i * 3 + 2 ] = b;

			this.colors[ i ] = { path, caption, tags, hex };

		}

		const entries = Object.entries( this.groups );

		for ( const [ path, indices ] of entries ) {

			const project = Application.content.get( path );
			const title = new Title( project, indices );
			this.add( title );

		}

		const points = this.simulation.curve.getPoints( 500 );
		const geometry = new BufferGeometry().setFromPoints( points );
		const material = new LineBasicMaterial( { color: 0xff0000 } );
		const line = new Line( geometry, material );
		this.add( line );

		this.geometry.attributes.color.needsUpdate = true;

	}

	onPreUpdate() {

		const { path, list } = Application.store;
		const isVisible = path === '/projects' && list === 'particles';

		if ( this.isVisible === isVisible ) return;
		this.isVisible = isVisible;

		// // if ( this.animation ) this.animation.remove( this.material );
		// if ( this.isVisible ) this.visible = true;

		// // const targets = this.material;
		// // const easing = 'easeOutQuint';
		// // const duration = this.isVisible ? 2000 : 500;
		// // const opacity = this.isVisible ? 1 : 0;
		// // const delay = this.isVisible ? 250 : 0;

		// // this.animation = anime( { targets, easing, duration, opacity, delay } );
		// // this.simulation.reset();

		// // this.needsUpdate = true;
		// // await this.animation.finished;
		// // this.needsUpdate = false;

		// if ( ! this.isVisible ) this.visible = false;

	}

	onUpdate() {

		// if ( this.needsUpdate ) this.simulation.render();

		const { texture } = this.simulation.renderTargets[ 0 ];
		this.material.uniforms[ 'simulation' ].value = texture;

	}

	onPostUpdate() {

		const index = this.getClosestIndex();

		if ( index === this.index ) return;
		this.index = index;

		const color = this.colors[ this.index ];
		if ( color ) Application.cursor.set( color );
		else Application.cursor.reset();

	}

	onKeyDown( parameters ) {

		const { code } = parameters;

		if ( code === 'Space' ) {

			this.needsUpdate = ! this.needsUpdate;
			this.simulation.setPoints();

		} else if ( code === 'KeyS' ) this.export();

	}

	getClosestIndex() {

		if ( ! this.points || ! this.isVisible ) return;

		const { camera, pointer } = Application;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		if ( pointer.isPressed ) return null;

		const { ray, near, far } = this.raycaster;
		const closestPoint = Vector3.get();

		let minDistance;
		let index;

		for ( let i = 0; i < this.points.length; i++ ) {

			const point = this.points[ i ];

			if ( ray.distanceToPoint( point ) > this.size * 2 ) continue;
			ray.closestPointToPoint( point, closestPoint );

			const distance = ray.origin.distanceTo( closestPoint );
			if ( distance < near || distance > far ) continue;
			if ( distance > minDistance ) continue;

			minDistance = distance;
			index = i;

		}

		Vector3.release( closestPoint );

		return index;

	}

}
