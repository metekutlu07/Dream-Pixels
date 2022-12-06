import {

	PlaneGeometry,
	MeshBasicMaterial,
	Mesh

} from 'three';

export default class Frame extends Mesh {

	constructor() {

		const parameters = { depthTest: false, fog: false, transparent: true };
		const material = new MeshBasicMaterial( parameters );
		const geometry = new PlaneGeometry();

		super( geometry, material );

		Application.events.add( this );

	}

	onUpdate() {

		const { aspect, renderOrder } = this.parent;
		const thickness = .005;

		this.renderOrder = renderOrder - 1;
		this.scale.set( 1 + thickness, 1 + thickness * aspect, 1 );

	}

}
