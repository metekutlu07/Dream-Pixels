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

		const object = Application.scene.city;
		const scene = new Scene();
		scene.add( object.getSimplifiedVersion() );

		const exporter = new USDZExporter();
		const arraybuffer = await exporter.parse( scene );
		const parameters = { type: 'application/octet-stream' };
		const blob = new Blob( [ arraybuffer ], parameters );

		const link = element.querySelector( 'a' );
		link.href = URL.createObjectURL( blob );
		link.addEventListener( 'click', event => event.stopPropagation() );
		link.click();

	}

}

