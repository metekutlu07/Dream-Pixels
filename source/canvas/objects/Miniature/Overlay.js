import {

	Mesh,
	PlaneGeometry,
	MeshBasicMaterial,
	NotEqualStencilFunc,
	ReplaceStencilOp

} from 'three';

export default class Overlay extends Mesh {

	constructor() {

		const size = 100;
		const geometry = new PlaneGeometry( size, size );
		const material = new MeshBasicMaterial( {

			color: '#fac35e',
			fog: false,
			transparent: true,

			stencilRef: 0,
			stencilFunc: NotEqualStencilFunc,
			stencilZPass: ReplaceStencilOp,
			stencilFail: ReplaceStencilOp,
			stencilZFail: ReplaceStencilOp

		} );

		super( geometry, material );

		Application.events.add( this );

	}

	onPostUpdate() {

		const { quaternion, position } = Application.camera;

		this.quaternion.copy( quaternion );
		this.position
			.copy( position )
			.normalize()
			.multiplyScalar( 40 );

		const { visible } = Application.scene.miniature.artwork;
		this.visible = visible;

	}

}
