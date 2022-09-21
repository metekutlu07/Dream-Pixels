import {

	OrthographicCamera,
	Scene,
	Mesh,
	MeshBasicMaterial,
	PlaneGeometry,
	Vector3

} from 'three';

export default class RenderTargetViewer {

	constructor( renderTarget, {

		position = new Vector3( 50, 50, 0 ),
		size = new Vector3( 256, 256, 0 ),
		transparent = false

	} = {} ) {

		this.position = position;
		this.size = size;

		this.scene = new Scene();
		this.camera = new OrthographicCamera( -1, 1, 1, -1, 1, 10 );
		this.camera.position.set( 0, 0, 2 );

		this.material = new MeshBasicMaterial( { transparent } );
		this.geometry = new PlaneGeometry( 1, 1 );
		this.mesh = new Mesh( this.geometry, this.material );
		this.scene.add( this.mesh );

		this.mesh.position
			.set( -window.innerWidth, 0, 0 )
			.add( this.size )
			.multiplyScalar( .5 )
			.add( this.position );

	}

	render( renderTarget ) {

		this.setSize();

		this.mesh.material.map = renderTarget.texture;

		const autoClear = Application.renderer.autoClear;
		Application.renderer.autoClear = false;

		Application.renderer.clearDepth();
		Application.renderer.render( this.scene, this.camera );

		Application.renderer.autoClear = autoClear;

	}

	setSize() {

		const { width, height } = Application.viewport;
		const halfWidth = width * .5;
		const halfHeight = height * .5;

		this.camera.left = -halfWidth;
		this.camera.right = halfWidth;
		this.camera.top = halfHeight;
		this.camera.bottom = -halfHeight;

		this.camera.near = .1;
		this.camera.far = 512;

		this.mesh.scale.set( this.size.x, this.size.y, 1. );
		this.mesh.position
			.set( -width, -height, 0 )
			.add( this.size )
			.multiplyScalar( .5 )
			.add( this.position );

		this.camera.updateProjectionMatrix();

	}

}
