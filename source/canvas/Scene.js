import { Scene as Object3D, FogExp2, CubeTexture } from 'three';

import CameraA from './CameraA';
import CameraB from './CameraB';

// import Phone from './objects/Phone';
// import Pattern from './objects/Pattern';
import Church from './objects/Church';
import Helpers from './objects/Helpers';
import Lighting from './objects/Lighting';
import Sky from './objects/Sky';
import Panorama from './objects/Panorama';
import Miniature from './objects/Miniature';
import Artwork from './objects/Artwork';
import Cosmos from './objects/Cosmos';
import Cup from './objects/Cup';

import Sphere from './objects/Sphere';
import Objects from './objects/Objects';
import Particles from './objects/Particles';
import Images from './objects/Images';
import Map from './objects/Map';

import { USDZExporter } from '~/vendors/three/USDZExporter';

export default class Scene extends Object3D {

	constructor() {

		super();

		this.parameters = Application.store.add( 'Scene', {

			density: { value: 0, max: .1 },
			color: '#000000'

		} );

		Application.events.add( this );

		this.fog = new FogExp2();

		this.lighting = new Lighting();
		this.add( this.lighting );

		this.sky = new Sky();
		this.add( this.sky );

		// this.phone = new Phone();
		// this.add( this.phone );

		// this.pattern = new Pattern();
		// this.add( this.pattern );

		this.church = new Church();
		this.add( this.church );

		this.panorama = new Panorama();
		this.add( this.panorama );

		this.miniature = new Miniature();
		this.add( this.miniature );

		this.artwork = new Artwork();
		this.add( this.artwork );

		this.helpers = new Helpers();
		this.add( this.helpers );

		this.sphere = new Sphere();
		this.add( this.sphere );

		this.map = new Map();
		this.add( this.map );

		this.objects = new Objects();
		this.add( this.objects );

		this.images = new Images();
		this.add( this.images );

		this.particles = new Particles();
		this.add( this.particles );

		this.cosmos = new Cosmos();
		this.add( this.cosmos );

		this.cup = new Cup();
		this.add( this.cup );

		this.cameras = Object.fromEntries( [

			'Default',
			'Contact',
			'About',
			'Mete',
			'MeteSlow',

			'Radelska',
			'MiniatureStreetView',
			'VirtualMiniature',
			'Photogrammetry',

			'Cosmos',
			'World',
			'Sphere',
			'ColorRange',
			'Timeline'

		].map( cameraID => {

			const Camera = cameraID.match( /Timeline|Contact|About|Mete/g ) ? CameraB : CameraA;
			return [ cameraID, new Camera( cameraID ) ];

		} ) );

	}

	onPreFrame() {

		const { list, path, places, particles } = Application.store;

		let cameraID = 'Default';

		if ( path === '/rasdelka' ) cameraID = 'Radelska';
		if ( path === '/miniature-street-view' ) cameraID = 'MiniatureStreetView';
		if ( path === '/virtual-miniature' ) cameraID = 'VirtualMiniature';
		if ( path === '/photogrammetry' ) cameraID = 'Photogrammetry';
		if ( path === '/' ) cameraID = 'Mete';
		if ( path === '/contact' ) cameraID = 'Contact';
		if ( path === '/about' ) cameraID = 'About';
		if ( path === '/mete-kutlu' ) cameraID = 'MeteSlow';

		if ( path === '/experiments' ) {

			if ( list === 'places' ) {

				if ( places === 'cosmos' ) cameraID = 'Cosmos';
				else if ( places === 'world' ) cameraID = 'World';

			}

			if ( list === 'particles' ) {

				if ( particles === 'color-range' ) cameraID = 'ColorRange';
				else if ( particles === 'timeline' ) cameraID = 'Timeline';

			}

			if ( list === 'sphere' ) cameraID = 'Sphere';

		}

		if ( cameraID !== this.cameraID ) {

			this.cameraID = cameraID;

			Application.store.set( 'grab', false );
			Application.store.set( 'grabbing', false );
			Application.camera = this.cameras[ cameraID ];

		}

		if ( ! path ) return;

		const isPlainBlackPage = path === '/about' || path === '/mete-kutlu';
		const isProjectPath = Application.content.projects
			.some( project => `/${ project.path }` === path );
		const hasProjectSphere = [ '/virtual-miniature', '/photogrammetry', '/miniature-street-view' ]
			.includes( path );
		const shouldHideProjectSphere = isProjectPath && !hasProjectSphere;

		this.objects.visible = false;
		this.images.visible = path === '/experiments' && list === 'sphere';
		this.map.visible = path === '/experiments' && list === 'places';
		this.sphere.visible = !isPlainBlackPage &&
			path !== '/' &&
			!( path === '/experiments' && list === 'grid' ) &&
			!( path === '/experiments' && list === 'places' && places === 'cosmos' ) &&
			!shouldHideProjectSphere;
		this.cosmos.visible = path === '/experiments' && list === 'places' && places === 'cosmos';

		const isParticleWorksView = path === '/experiments' && list === 'particles';
		const isParticleColorRange = isParticleWorksView && particles === 'color-range';
		const hasPixelExperienceStarted = Application.store[ 'pixel-experience-started' ];

		this.particles.visible = (
			( isParticleWorksView && ( ! isParticleColorRange || hasPixelExperienceStarted ) ) ||
			( path === '/' || path === '/contact' )
		) && this.particles.hasLoadedColors;

		this.parameters.density = 0;
		if ( path === '/experiments' && list === 'grid' ) this.parameters.density = 0;
		else if ( path === '/experiments' && list === 'sphere' ) this.parameters.density = .0075;
		else if ( path === '/experiments' && list === 'particles' && particles === 'color-range' ) this.parameters.density = .025;
		else if ( path === '/experiments' && list === 'particles' && particles === 'timeline' ) this.parameters.density = .1;

		const { color, density } = this.parameters;
		this.fog.color.set( color );
		this.fog.density = density;

	}

	onUpdate() {

		this.traverse( child => {

			if ( ! child.hasWireframe ) return;
			child.material.wireframe = Application.store[ 'display-wireframe' ];

		} );

	}

	onLoad( files ) {

		if ( ! files[ 'common' ] ) return;

		const { textures } = Application.assets[ 'common' ];
		const images = [ 'px', 'nx', 'py', 'ny', 'pz', 'nz' ]
			.map( side => textures[ `EnvMap/${ side }.jpg` ].image );

		const parameters = { images, needsUpdate: true };
		const texture = Object.assign( new CubeTexture(), parameters );
		Application.assets[ 'EnvMap' ] = texture;

	}

	async export() {

		let object;

		switch ( Application.store.path ) {

		case '/virtual-miniature':
			object = this.miniature.city.clone();
			break;

		case '/when-gaspard-paints-a-gospel':
			object = this.church.clone();
			break;

		case '/photogrammetry':
			object = this.artwork.clone();
			break;

		default:
			break;

		}

		object.traverseVisible( child => {

			if ( ! child.geometry ) return;

			const scale = .05;
			child.geometry = child.geometry.clone();
			child.geometry.scale( scale, scale, scale );

		} );

		const exporter = new USDZExporter();
		const arraybuffer = await exporter.parse( object );
		const parameters = { type: 'application/octet-stream' };
		const blob = new Blob( [ arraybuffer ], parameters );

		const path = Application.store.path.replace( '/', '' );
		const link = document.createElement( 'a' );

		Object.assign( link, {

			rel: 'ar',
			href: URL.createObjectURL( blob ),
			download: `${ path }.usdz`,

		} );

		const image = document.createElement( 'img' );
		image.src = '/public/share.png';
		link.appendChild( image );

		link.addEventListener( 'click', event => event.stopPropagation() );
		link.click();

	}

}
