import {

	AxesHelper,
	Object3D,
	GridHelper,
	DirectionalLightHelper,
	SpotLightHelper,
	CameraHelper,
	PerspectiveCamera,
	SkeletonHelper

} from 'three';

import OrbitControls from '~/vendors/three/OrbitControls';

export default class Helpers extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

		this.parameters = Application.store.add( 'Helpers', {

			visible: false,
			controls: {
				enabled: false,
				target: { options: [ 'Scene' ] }
			}

		} );

		this.objects = [];

		this.axesHelper = new AxesHelper( 25 );
		this.axesHelper.position.set( 0, 1e-2, 0 );
		this.axesHelper.renderOrder = Infinity;
		this.add( this.axesHelper );

		this.gridHelper = new GridHelper( 25, 25, '#444', '#444' );
		this.add( this.gridHelper );

		this.camera = new PerspectiveCamera( 45, 1, 1, 1e4 );
		this.camera.position.set( 0, 0, -100 );
		this.camera.updateProjectionMatrix();

		const { domElement } = Application.renderer;
		this.orbitControls = new OrbitControls( this.camera, domElement );
		this.orbitControls.update();

		Object.assign( this.orbitControls, {

			autoRotate: true,
			autoRotateSpeed: -.1,
			enableDamping: true,
			dampingFactor: .025

		} );

	}

	onStart() {

		Application.scene.traverse( this.onEachChild );

	}

	onEachChild( object ) {

		if ( object.type === 'DirectionalLight' ) {

			const directionalLightHelper = new DirectionalLightHelper( object );
			this.objects.push( directionalLightHelper );
			this.add( directionalLightHelper );

			if ( object.castShadow ) {

				const cameraHelper = new CameraHelper( object.shadow.camera );
				this.objects.push( cameraHelper );
				this.add( cameraHelper );

			}

		} else if ( object.type === 'SpotLight' ) {

			const spotLightHelper = new SpotLightHelper( object );
			this.spotLightHelpers.push( spotLightHelper );
			this.add( spotLightHelper );

			if ( object.castShadow ) {

				const cameraHelper = new CameraHelper( object.shadow.camera );
				this.objects.push( cameraHelper );
				this.add( cameraHelper );

			}

		} else if ( object.type === 'PerspectiveCamera' ) {

			const cameraHelper = new CameraHelper( object );
			this.objects.push( cameraHelper );
			this.add( cameraHelper );

		}

		if ( ! object.skeleton ) return;

		const skeletonHelper = new SkeletonHelper( object.parent );
		this.add( skeletonHelper );

	}

	onPreFrame() {

		const { controls, visible } = this.parameters;

		this.visible = visible;
		this.orbitControls.enabled = controls.enabled;
		this.orbitControls.update();

		Application.overrideCamera = this.orbitControls.enabled ? this.camera : null;

	}

	onPreRender() {

		for ( const helper of this.objects ) helper.update();

		this.camera.aspect = Application.viewport.aspect;
		this.camera.updateProjectionMatrix();

		this.orbitControls.update();

	}

}
