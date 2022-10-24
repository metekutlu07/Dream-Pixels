import {

	DirectionalLight,
	AmbientLight,
	HemisphereLight,
	Object3D,
	Vector3

} from 'three';

export default class Lighting extends Object3D {

	constructor() {

		super();

		this.parameters = Application.store.add( 'Lighting', {

			sky: {
				topColor: '#000000',
				bottomColor: '#000000'
			},

			ambientLight: {
				color: '#ffffff',
				intensity: { value: .15, max: 2 },
			},

			hemisphereLight: {
				skycolor: '#ffae5e',
				groundcolor: '#efc17c',
				intensity: { value: .1, max: 2 }
			},

			directionalLight: {
				color: '#ffffff',
				intensity: { value: .15, max: 2 },
				castShadow: false,
				shadowCameraSize: { value: 15, max: 100 },
				shadowCameraFar: { value: 50, max: 100 },
				shadowMapSize: { value: 2048, options: [ 1024, 2048, 4096 ] },
				position: {
					value: new Vector3( -10, 25, -5 ),
					min: new Vector3().setScalar( -50 ),
					max: new Vector3().setScalar( 50 )
				}
			}

		} );

		this.ambientLight = new AmbientLight();
		this.add( this.ambientLight );

		this.hemisphereLight = new HemisphereLight();
		this.hemisphereLight.position.set( 0, 50, 0 );
		this.add( this.hemisphereLight );

		this.directionalLight = new DirectionalLight();
		this.directionalLight.direction = new Vector3();
		this.directionalLight.castShadow = true;
		this.add( this.directionalLight );
		this.add( this.directionalLight.target );

		this.setShadowCameraSize( this.directionalLight, 10 );

		Application.events.add( this );

	}

	onPreFrame() {

		const {

			ambientLight,
			hemisphereLight,
			directionalLight

		} = this.parameters;

		this.ambientLight.intensity = ambientLight.intensity;
		this.ambientLight.color.set( ambientLight.color );

		this.hemisphereLight.intensity = hemisphereLight.intensity;
		this.hemisphereLight.color.set( hemisphereLight.skyColor );
		this.hemisphereLight.groundColor.set( hemisphereLight.groundColor );

		this.directionalLight.castShadow = directionalLight.castShadow;
		this.directionalLight.intensity = directionalLight.intensity;
		this.directionalLight.color.set( directionalLight.color );
		this.directionalLight.direction.copy( directionalLight.position );

		this.directionalLight.shadow.camera.far = directionalLight.shadowCameraFar;
		this.setShadowCameraSize( this.directionalLight, directionalLight.shadowCameraSize );

		const mapSize = parseInt( directionalLight.shadowMapSize );
		if ( this.mapSize !== mapSize ) this.setShadowMapSize( this.directionalLight, mapSize );

	}

	onUpdate() {

		const { position } = Application.camera.object;
		const target = Vector3.get().copy( position );

		this.directionalLight.target.position.copy( target );
		this.directionalLight.position
			.copy( target )
			.add( this.directionalLight.direction );

		Vector3.release( target );

	}

	onViewChange() {

		this.parameters.sky.topColor = '#000000';
		this.parameters.sky.bottomColor = '#000000';

		this.parameters.hemisphereLight.skyColor = '#e7c783';
		this.parameters.hemisphereLight.groundColor = '#ff80e3';

		switch ( Application.store.path ) {

		case '/when-gaspard-paints-a-gospel':

			this.parameters.sky.topColor = '#fea85f';
			this.parameters.sky.bottomColor = '#fcd49c';

			break;

		case '/augustus-ar':

			this.parameters.sky.topColor = '#fac35f';
			this.parameters.sky.bottomColor = '#25b69b';

			break;

		case '/photogrammetry':

			this.parameters.sky.topColor = '#000000';
			this.parameters.sky.bottomColor = '#111111';

			break;

		case '/works':

			this.parameters.sky.topColor = '#000000';
			this.parameters.sky.bottomColor = '#111111';

			break;

		case '/virtual-miniature':

			this.parameters.sky.topColor = '#FCD98F';
			this.parameters.sky.bottomColor = '#ff80e3';

			this.parameters.hemisphereLight.skyColor = '#e7c783';
			this.parameters.hemisphereLight.groundColor = '#ff80e3';

			break;

		default:
			break;

		}

	}

	setShadowCameraSize( light, size ) {

		const { camera } = light.shadow;

		camera.top = size;
		camera.right = size;
		camera.bottom = -size;
		camera.left = -size;

		camera.updateProjectionMatrix();

	}

	setShadowMapSize( light, size ) {

		this.mapSize = size;

		light.shadow.mapSize.width = size;
		light.shadow.mapSize.height = size;

		if ( ! light.shadow.map ) return;

		light.shadow.map.dispose();
		this.directionalLight.shadow.map = null;

	}

}
