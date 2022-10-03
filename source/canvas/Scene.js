import { Scene as Object3D, Fog, CubeTexture } from 'three';

import Helpers from './objects/Helpers';
import Lighting from './objects/Lighting';
import Phone from './objects/Phone';
import Sky from './objects/Sky';
import Church from './objects/Church';
import Panorama from './objects/Panorama';
import Miniature from './objects/Miniature';
import Sphere from './objects/Sphere';
import Pattern from './objects/Pattern';
import Artwork from './objects/Artwork';
import OrbitControls from './objects/OrbitControls';
import Particles from './objects/Particles';
import Objects from './objects/Objects';

import { USDZExporter } from '~/vendors/three/USDZExporter';

export default class Scene extends Object3D {

	constructor() {

		super();

		this.parameters = Application.store.add( 'Scene', {

			near: { value: 5, max: 50 },
			far: { value: 10, max: 100 },
			color: '#000000'

		} );

		Application.events.add( this );

		this.fog = new Fog();

		this.lighting = new Lighting();
		this.add( this.lighting );

		this.orbitControls = new OrbitControls();
		this.add( this.orbitControls );

		this.sky = new Sky();
		this.add( this.sky );

		this.phone = new Phone();
		this.add( this.phone );

		this.church = new Church();
		this.add( this.church );

		this.panorama = new Panorama();
		this.add( this.panorama );

		this.sphere = new Sphere();
		this.add( this.sphere );

		this.particles = new Particles();
		this.add( this.particles );

		this.pattern = new Pattern();
		this.add( this.pattern );

		this.miniature = new Miniature();
		this.add( this.miniature );

		this.objects = new Objects();
		this.add( this.objects );

		this.artwork = new Artwork();
		this.add( this.artwork );

		this.helpers = new Helpers();
		this.add( this.helpers );

	}

	onViewChange() {

		this.parameters.near = 1e4;
		this.parameters.far = 1e4;

		if ( Application.store.path === '/projects' ) {

			this.parameters.near = 50;
			this.parameters.far = 200;

		}

		this.add( Application.camera );

	}

	onPreFrame() {

		const { near, far, color } = this.parameters;
		this.fog.color.set( color );
		this.fog.near = near;
		this.fog.far = far;

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
			child.geometry.scale( scale, scale, scale );

		} );

		this.add( object );

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

