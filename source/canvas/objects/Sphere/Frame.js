import {

	PlaneGeometry,
	MeshBasicMaterial,
	Mesh

} from 'three';

export default class Frame extends Mesh {

	constructor() {

		const parameters = { depthTest: false, fog: false, transparent: true };
		const material = new MeshBasicMaterial( parameters );
		const geometry = new PlaneGeometry( 1, 1 );

		super( geometry, material );

		Application.events.add( this );

		this.visible = false;

	}

	onUpdate() {

		const { store, pointer } = Application;
		this.visible = !! store.object && pointer.hasHover;

		if ( ! this.visible ) return;

		const {

			position,
			quaternion,
			renderOrder,
			aspect

		} = Application.store.object;

		const thickness = .025;
		this.position.copy( position );
		this.quaternion.copy( quaternion );
		this.renderOrder = renderOrder - 1;
		this.scale.set( aspect + thickness, 1 + thickness );

	}

}
