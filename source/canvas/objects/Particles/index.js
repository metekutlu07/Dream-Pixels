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
		this.hasLoadedColors = false;
		this.raycaster = new Raycaster();

		this.frustumCulled = false;
		this.visible = false;

		this.setHelpers();

		Application.particles = this;

	}

	onPreFrame() {

		const common = Application.assets[ 'common' ];
		if ( this.hasLoadedColors || ! common?.jsons?.[ 'Colors.json' ] ) return;
		this.applyColors( common );

	}

	onLoad( files ) {

		if ( ! files[ 'common' ] ) return;
		this.applyColors( files[ 'common' ] );

	}

	applyColors( common ) {

		if ( this.hasLoadedColors || ! common?.jsons?.[ 'Colors.json' ] ) return;

		const { jsons } = common;
		const { images, colors } = jsons[ 'Colors.json' ];
		const { array } = this.geometry.attributes.color;
		const { count } = this.simulation.setPoints( this.points );

		this.projects = {};
		this.images = {};

		for ( let i = 0; i < count; i++ ) {

			const point = this.points[ i ];

			const [ hex, imageID ] = colors[ i % colors.length ].split( '|' );
			const { source, path, caption, tags } = images[ imageID ];
			const content = Application.content.get( path );
			const title = content?.title || '';
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

			Object.assign( point, { source, path, title, caption, tags, hex, hsl } );

		}

		this.titles = Object
			.entries( this.projects )
			.reverse()
			.map( project => {

				const [ path, { points } ] = project;
				const content = Application.content.get( path );
				const title = new Title( this.simulation, content, points[ 0 ] );
				this.add( title );

				return title;

			} );

		this.geometry.attributes.color.needsUpdate = true;
		this.hasLoadedColors = true;
		this.onModeChange();

	}

	onViewChange() {

		this.onModeChange();

	}

	onModeChange() {

		this.isHoverable = false;
		Application.cursor && Application.cursor.reset();

		const { path, list, particles } = Application.store;
		this.isVisible = (

			( path === '/experiments' && list === 'particles' ) ||
			( path === '/' || path === '/contact' || path === '/about' || path === '/mete-kutlu' )

		);

		const isColorRange = (

			path === '/experiments' &&
			list === 'particles' &&
			particles === 'color-range'

		);

		this.visible = this.isVisible;
		this.isHoverable = false;

		clearTimeout( this.introTimeout );
		clearTimeout( this.timeout );
		clearTimeout( this.infoTimeout );

		const shouldWaitForStart = (
			isColorRange &&
			! Application.store[ 'pixel-experience-started' ]
		);
		const shouldReuseColorRange = (
			isColorRange &&
			Application.store[ 'pixel-experience-started' ] &&
			this.hasCompletedColorRangeIntro
		);
		const shouldReuseExistingArchiveSimulation = (
			path === '/experiments' &&
			list === 'particles' &&
			Application.store[ 'pixel-experience-started' ] &&
			this.hasCompletedColorRangeIntro
		);

		this.visible = this.isVisible && ! shouldWaitForStart && this.hasLoadedColors;

		if ( shouldWaitForStart ) this.hasCompletedColorRangeIntro = false;
		if ( shouldWaitForStart || ! this.hasLoadedColors || ! this.isVisible ) return;

		if ( shouldReuseColorRange ) {

			Application.store.set( 'ui-ready', true );
			Application.store.set( 'intro-ready', false );
			return;

		}

		if ( shouldReuseExistingArchiveSimulation ) {

			if ( isColorRange ) {

				Application.store.set( 'ui-ready', true );
				Application.store.set( 'intro-ready', false );

			}
			return;

		}

		this.simulation.toggle( true );

		const duration = isColorRange ? 8 : 3;

		if ( isColorRange ) {

			Application.store.set( 'ui-ready', false );
			Application.store.set( 'intro-ready', false );

		}
		this.timeout = setTimeout( () => this.onAnimationEnd(), duration * 1e3 );

	}

	onUpdate() {

		const previewVisible = Application.imagePreview?.hasAttribute( 'visible' );
		Application.metrics.simulationState = previewVisible ? 'paused' : ( this.visible ? 'running' : 'hidden' );
		if ( ! this.visible || previewVisible ) return;

		this.simulation.render();

		const { texture } = this.simulation.renderTargets[ 0 ];
		this.material.uniforms[ 'simulation' ].value = texture;

		const { particles, list, path } = Application.store;
		const active = (
			( list === 'particles' && particles === 'timeline' ) ||
			( path === '/' || path === '/contact' || path === '/about' || path === '/mete-kutlu' )
		);

		const scale = active ? .25 : 1;
		this.material.size = this.size * scale;

		if ( this.tube ) this.tube.visible = list === 'particles' && particles === 'timeline';

	}

	onInputStart() {

		if ( this.visible && Application.cursor ) Application.cursor.reset();
		this.startTime = Application.time.elapsedTime;

	}

	onInputEnd() {

		const previewVisible = Application.imagePreview?.hasAttribute( 'visible' );
		if ( previewVisible || ! this.visible || ! this.hasLoadedColors ) return;

		const particlesInfo = document.querySelector(
			'user-info-text[name="Particles"][visible]:not([hidden])'
		);
		if ( particlesInfo ) return;

		if ( this.startTime && Application.time.elapsedTime - this.startTime > 250 ) {

			this.startTime = null;
			return;

		}

		this.startTime = null;
		this.updateBoxes();

		const index = this.getClosestIndex();
		const point = this.points[ index ];

		if ( ! point || ! Application.cursor ) {

			Application.cursor && Application.cursor.reset();
			return;

		}

		Application.cursor.parameters = point;

	}

	onPostUpdate() {

	}

	onAnimationEnd() {

		this.simulation.setPoints( this.points );

		const { path, list, particles } = Application.store;
		const isPixelLanding = (
			path === '/experiments' &&
			list === 'particles' &&
			particles === 'color-range'
		);

		if ( isPixelLanding ) {

			this.hasCompletedColorRangeIntro = true;
			Application.store.set( 'ui-ready', true );
			Application.store.set( 'intro-ready', false );

			if ( ! Application.store[ 'particle-user-info-seen' ] ) {

				this.infoTimeout = setTimeout( () => {

					Application.store.set( 'intro-ready', true );

				}, 2200 );

			}

		}

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

	updateBoxes() {

		if ( ! this.images ) return;

		this.simulation.setPoints( this.points );

		Object
			.values( this.images )
			.forEach( ( { box, points } ) => box.setFromPoints( points ) );

		Object
			.values( this.projects )
			.forEach( ( { box, points } ) => box.setFromPoints( points ) );

	}

	getClosestIndex() {

		const { pointer, camera } = Application;
		if ( ! this.visible || ! this.images || camera.isScrolling ) return;

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
		const camera = Application.camera;

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
			let pointSize = this.material.size * .5;

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
