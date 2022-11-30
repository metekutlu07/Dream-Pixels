import {

	Raycaster,
	Float32BufferAttribute,
	Vector3,
	Color,
	Points,
	Box3,
	BufferGeometry,
	TubeGeometry,
	MeshBasicMaterial,
	Mesh,
	LineBasicMaterial,
	Line,
	AdditiveBlending

} from 'three';

import ParticlesMaterial from '~/canvas/materials/ParticlesMaterial';

import Simulation from './Simulation';
import Title from './Title';
import Camera from './Camera';

export default class Particles extends Points {

	constructor() {

		const size = .1;
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
		this.visible = false;

		this.raycaster = new Raycaster();
		this.camera = new Camera( this.simulation );

		this.setHelpers();

		Application.particles = this;

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
			const { source, path, caption, tags } = images[ imageID ];
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

			Object.assign( point, { source, path, caption, tags, hex, hsl } );

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
		const isVisible = ( path === '/works' && list === 'particles' ) ||
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

		if ( this.tube ) this.tube.visible = list === 'particles' && particles === 'timeline';

	}

	onPostUpdate() {

		if ( ! Application.cursor || ! this.isVisible ) return;

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

		} else this.visible = false;

	}

	setHelpers() {

		const isLine = false;

		if ( isLine ) {

			const vertices = this.simulation.curve.getPoints( 1e4 );
			const geometry = new BufferGeometry().setFromPoints( vertices );
			const material = new LineBasicMaterial( {

				color: '#ffffff',
				transparent: true,
				opacity: .5,
				fog: true

			} );

			this.line = new Line( geometry, material );
			this.add( this.line );

		} else {

			const path = this.simulation.curve;
			const tubularSegments = 1000;
			const radius = .01;
			const radialSegments = 5;

			const geometry = new TubeGeometry( path, tubularSegments, radius, radialSegments, true );
			const material = new MeshBasicMaterial( {

				color: '#ffffff',
				transparent: true,
				opacity: .25,
				blending: AdditiveBlending

			} );

			this.tube = new Mesh( geometry, material );
			this.add( this.tube );

		}

	}

	getClosestIndex() {

		if ( ! this.isHoverable ) return;

		const { pointer, scene } = Application;
		const { orbitControls } = scene;

		if ( ! this.isVisible || this.camera.isScrolling || orbitControls.isActive ) return;

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

		const { range } = Application.store;
		const camera = Application.overrideCamera || Application.camera;

		let minDistance;
		let index;

		const { size } = Application.viewport;
		const coordinatesA = Vector3.get();
		const coordinatesB = Vector3.get();
		const cursor = Vector3.get();

		Application.pointer
			.getCoordinates( cursor )
			.setZ( 0 );

		for ( let i = 0; i < points.length; i++ ) {

			const point = points[ i ];

			coordinatesA
				.copy( point )
				.project( camera );

			coordinatesA.y *= -1;

			coordinatesA
				.addScalar( 1 )
				.divideScalar( 2 )
				.multiply( size )
				.setZ( 0 );

			if ( cursor.distanceTo( coordinatesA ) > 40 ) continue;

			coordinatesB
				.copy( point )
				.applyMatrix4( camera.matrixWorldInverse );

			const scale = size.y * .5;
			let pointSize = this.size * .5;

			if ( this.material.sizeAttenuation ) pointSize *= ( scale / -coordinatesB.z );
			if ( cursor.distanceTo( coordinatesA ) > pointSize ) continue;

			const distance = point.distanceTo( camera.position );
			if ( distance > minDistance ) continue;

			const { h } = point.hsl;
			if ( h < range[ 0 ] || h > range[ 1 ] ) continue;

			minDistance = distance;
			index = point.i;

		}

		Vector3.release( coordinatesA, coordinatesB, cursor );

		return { index, minDistance };

	}

}
