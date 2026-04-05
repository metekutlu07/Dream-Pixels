import { Mesh, MeshBasicMaterial, IcosahedronGeometry } from 'three';

export default class Sphere extends Mesh {

	constructor() {

		const parameters = { wireframe: true, color: '#333333', fog: false };
		const geometry = new IcosahedronGeometry( 125, 24 );
		const material = new MeshBasicMaterial( parameters );

		super( geometry, material );

		Application.events.add( this );

	}

	onPreFrame() {

		const scale = Application.store.path === '/virtual-miniature' ? 2 : 1;
		this.scale.setScalar( scale );

	}

}
