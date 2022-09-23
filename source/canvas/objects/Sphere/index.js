import { Mesh, MeshBasicMaterial, IcosahedronGeometry } from 'three';

import Images from './Images';
import Frame from './Frame';

export default class Sphere extends Mesh {

	constructor() {

		const parameters = { wireframe: true, color: '#666666', fog: false };
		const geometry = new IcosahedronGeometry( 125, 16 );
		const material = new MeshBasicMaterial( parameters );

		super( geometry, material );

		Application.events.add( this );

		this.images = new Images();
		this.add( this.images );

		this.frame = new Frame();
		this.add( this.frame );

	}

	onPreFrame() {

		const { path, list } = Application.store;
		this.visible = path === '/projects';

		if ( ! this.visible ) return;

		const { parameters } = Application.scene.orbitControls;
		parameters.enableRotate = list !== 'grid';
		parameters.rotateSpeed = list === 'particles' ? 5 : -2.5;

	}

}
