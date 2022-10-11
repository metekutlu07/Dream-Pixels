import {

	Raycaster,
	Float32BufferAttribute,
	Vector3,
	Color,
	Points,
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

		const size = .01;
		const geometry = new BufferGeometry();
		const material = new ParticlesMaterial( { size } );
		const simulation = new Simulation();

		const { width, height, count } = simulation;
		const colors = new Array( count * 3 ).fill( 1 );
		const positions = [];

		for ( let i = 0; i < count; i++ ) {

			const x = Math.floor( i % width ) / width;
			const y = Math.floor( i / width ) / height;
			const z = Math.randFloat( .25, 1.25 );

			positions.push( x, y, z );

		}

		geometry.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
		geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

		super( geometry, material );

		Application.events.add( this );

		this.size = size;
		this.simulation = simulation;
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
		const { count, points } = this.simulation.setPoints();

		const color = new Color();
		const groupA = [];
		const groupB = {};
		this.colors = [];
		this.titles = [];

		for ( let i = 0; i < count; i++ ) {

			const [ hex, imageID ] = colors[ i % colors.length ].split( '|' );
			const { path, caption, tags } = images[ imageID ];

			groupA[ imageID ] = groupA[ imageID ] || [];
			groupA[ imageID ].push( points[ i ] );

			groupB[ path ] = groupB[ path ] || [];
			groupB[ path ].push( points[ i ] );

			const { r, g, b } = color.setStyle( hex );
			array[ i * 3 + 0 ] = r;
			array[ i * 3 + 1 ] = g;
			array[ i * 3 + 2 ] = b;

			this.colors[ i ] = { path, caption, tags, hex };

		}

		this.titles = Object
			.entries( groupB )
			.map( project => {

				const [ path, points ] = project;
				const content = Application.content.get( path );
				const title = new Title( this.simulation, content, points );
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

		setTimeout( () => {

			if ( this.isVisible ) this.simulation.setPoints();
			else this.visible = false;

		}, 2500 );

	}

	onUpdate() {

		this.simulation.render();

		const { texture } = this.simulation.renderTargets[ 0 ];
		this.material.uniforms[ 'simulation' ].value = texture;

		const { particles } = Application.store;
		const scale = particles === 'timeline' ? .5 : 1;
		this.material.size = this.size * scale;

	}

	onPostUpdate() {

		const index = this.getClosestIndex();

		if ( index === this.index ) return;
		this.index = index;

		const color = this.colors[ this.index ];
		if ( color ) Application.cursor.set( color );
		else Application.cursor.reset();

	}

	getClosestIndex() {

		if ( ! this.isVisible || this.camera.isScrolling ) return;

		const { pointer } = Application;
		const camera = Application.overrideCamera || Application.camera;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		if ( pointer.isPressed ) return null;

		const { ray, near, far } = this.raycaster;
		const closestPoint = Vector3.get();

		let minDistance;
		let index;

		for ( let i = 0; i < this.simulation.points.length; i++ ) {

			const point = this.simulation.points[ i ];

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
