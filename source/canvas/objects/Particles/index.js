import {

	Raycaster,
	Float32BufferAttribute,
	Vector3,
	Color,
	Points,
	Box3,
	BufferGeometry,
	// LineBasicMaterial,
	// Line

} from 'three';

import ParticlesMaterial from '~/canvas/materials/ParticlesMaterial';

import Simulation from './Simulation';
import Title from './Title';
import Camera from './Camera';

export default class Particles extends Points {

	constructor() {

		const size = .02;
		const geometry = new BufferGeometry();
		const material = new ParticlesMaterial( { size } );
		const simulation = new Simulation();

		const { width, height, count } = simulation;
		const colors = new Array( count * 3 ).fill( 1 );
		const positions = [];
		const points = [];

		for ( let i = 0; i < count; i++ ) {

			const x = Math.floor( i % width ) / width;
			const y = Math.floor( i / width ) / height;
			const z = Math.randFloat( .35, 1 );
			positions.push( x, y, z );

			const t = i / count;
			const point = Object.assign( new Vector3(), { i, t } );
			points.push( point );

		}

		geometry.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
		geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

		super( geometry, material );

		Application.events.add( this );

		this.size = size;
		this.simulation = simulation;
		this.points = points;
		this.frustumCulled = false;

		this.raycaster = new Raycaster();
		this.camera = new Camera( this.simulation );

		this.add( this.camera );

	}

	async onLoad( files ) {

		if ( ! files[ 'common' ] ) return;

		const { jsons } = files[ 'common' ];
		const { images, colors } = jsons[ 'Colors.json' ];
		const { array } = this.geometry.attributes.color;
		const { count } = this.simulation.setPoints( this.points );

		this.projects = {};
		this.images = {};

		for ( let i = 0; i < count; i++ ) {

			const point = this.points[ i ];

			const [ hex, imageID ] = colors[ i % colors.length ].split( '|' );
			const { path, caption, tags } = images[ imageID ];
			const color = new Color();

			const project = { box: new Box3(), points: [] };
			this.projects[ path ] = this.projects[ path ] || project;
			this.projects[ path ].points.push( point );

			const image = { box: new Box3(), points: [] };
			this.images[ imageID ] = this.images[ imageID ] || image;
			this.images[ imageID ].points.push( point );

			const { r, g, b } = color.setStyle( hex );
			const hsl = color.getHSL( {} );
			array[ i * 3 + 0 ] = r;
			array[ i * 3 + 1 ] = g;
			array[ i * 3 + 2 ] = b;

			Object.assign( point, { path, caption, tags, hex, hsl } );

		}

		this.titles = Object
			.entries( this.projects )
			.map( project => {

				const [ path, { points } ] = project;
				const content = Application.content.get( path );
				const title = new Title( this.simulation, content, points[ 0 ] );
				this.add( title );

				return title;

			} );

		this.geometry.attributes.color.needsUpdate = true;

	}

	onPreUpdate() {

		const { path, list } = Application.store;
		const isVisible = ( path === '/projects' && list === 'particles' ) ||
			path === '/contact';

		if ( this.isVisible === isVisible || ! this.titles ) return;
		this.isVisible = isVisible;

		this.simulation.toggle( this.isVisible );

		if ( this.isVisible ) this.visible = true;
		this.isHoverable = false;

		clearTimeout( this.timeout );
		this.timeout = setTimeout( this.onAnimationEnd, 5 * 1e3 );

	}

	onUpdate() {

		this.simulation.render();

		const { texture } = this.simulation.renderTargets[ 0 ];
		this.material.uniforms[ 'simulation' ].value = texture;

		const { particles, list, path } = Application.store;
		const active = ( list === 'particles' && particles === 'timeline' ) || path === '/contact';
		const scale = active ? .5 : 1;
		this.material.size = this.size * scale;

	}

	onPostUpdate() {

		if ( ! Application.cursor ) return;

		const index = this.getClosestIndex();

		if ( index === this.index ) return;
		this.index = index;

		const color = this.points[ this.index ];
		if ( color ) Application.cursor.set( color );
		else Application.cursor.reset();

	}

	onAnimationEnd() {

		if ( this.isVisible ) {

			this.simulation.setPoints( this.points );
			this.isHoverable = true;

			Object
				.values( this.images )
				.map( ( { box, points } ) => box.setFromPoints( points ) );

			Object
				.values( this.projects )
				.map( ( { box, points } ) => box.setFromPoints( points ) );

			// const centers = Object
			// 	.values( this.projects )
			// 	.map( ( { box } ) => box.getCenter( new Vector3() ) );

			// this.simulation.setCurve( centers );

		} else this.visible = false;

		// const vertices = this.simulation.curve.getPoints( 1e4 );
		// const geometry = new BufferGeometry().setFromPoints( vertices );
		// const material = new LineBasicMaterial( { color: '#ff0000' } );
		// this.line = new Line( geometry, material );
		// this.add( this.line );

	}

	getClosestIndex() {

		if ( ! this.isHoverable ) return;

		const { pointer } = Application;

		if ( ! this.isVisible || this.camera.isScrolling || pointer.isPressed ) return;

		const camera = Application.overrideCamera || Application.camera;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		const { ray } = this.raycaster;

		return Object
			.values( this.images )
			.filter( ( { box } ) => ray.intersectsBox( box ) )
			.map( ( { points } ) => this.intersectsPoints( points ) )
			.filter( ( { index } ) => index !== undefined )
			.sort( ( a, b ) => b.minDistance - a.minDistance )
			.map( point => point.index )
			.pop();

	}

	intersectsPoints( points ) {

		const { ray, near, far } = this.raycaster;
		const { range } = Application.store;
		const closestPoint = Vector3.get();

		let minDistance;
		let index;

		for ( let i = 0; i < points.length; i++ ) {

			const point = points[ i ];

			if ( ray.distanceToPoint( point ) > this.size * 2 ) continue;
			ray.closestPointToPoint( point, closestPoint );

			const distance = ray.origin.distanceTo( closestPoint );
			if ( distance < near || distance > far ) continue;
			if ( distance > minDistance ) continue;

			const { h } = point.hsl;
			if ( h < range[ 0 ] || h > range[ 1 ] ) continue;

			minDistance = distance;
			index = point.i;

		}

		Vector3.release( closestPoint );

		return { index, minDistance };

	}

}
