import { WebGLRenderer, Vector2 } from 'three';

export default class Renderer extends WebGLRenderer {

	constructor() {

		super( {

			canvas: window.canvas,
			powerPreference: 'high-performance',
			logarithmicDepthBuffer: false,
			antialias: true,
			alpha: true

		} );

		this.domElement.toggleAttribute( 'view' );
		this.domElement.removeAttribute( 'data-engine' );
		this.domElement.removeAttribute( 'style' );

		this.resolution = new Vector2();
		this.shadowMap.enabled = true;
		this.autoClear = false;

		const { programs, memory, render } = this.info;
		this.parameters = Application.store.add( 'Renderer', {

			clearColor: '#222222',
			info: {
				programs: { object: programs, property: 'length' },
				geometries: { object: memory, property: 'geometries' },
				textures: { object: memory, property: 'textures' },
				drawcalls: { object: render, property: 'calls' },
				triangles: { object: render, property: 'triangles' }
			},

		} );

		Application.events.add( this );

	}

	onPreFrame() {

		const { clearColor } = this.parameters;
		this.setClearColor( clearColor, 1 );

	}

	onRender() {

		this.clear();

		if ( Application.postProcessing.parameters.enabled ) return;

		const camera = Application.overrideCamera || Application.camera;
		this.render( Application.scene, camera );

	}

	onResize() {

		const { size, width, height, devicePixelRatio } = Application.viewport;

		this.devicePixelRatio = devicePixelRatio;

		this.resolution
			.copy( size )
			.multiplyScalar( this.devicePixelRatio );

		this.setSize( width, height );
		this.setPixelRatio( this.devicePixelRatio );

	}

}

import Pool from '~/utilities/Pool';

import {

	MathUtils,
	Quaternion,
	Vector3,
	Vector4,
	Box2,
	Box3,
	Matrix3,
	Matrix4,
	Euler,
	Object3D,
	Color,
	Spherical

} from 'three';

Object.assign( Math, MathUtils );

Pool.create( Vector2, vector => vector.setScalar( 0 ) );
Pool.create( Vector3, vector => vector.setScalar( 0 ) );
Pool.create( Vector4, vector => vector.setScalar( 0 ) );

Pool.create( Quaternion, quaternion => quaternion.identity() );
Pool.create( Matrix3, matrix => matrix.identity() );
Pool.create( Matrix4, matrix => matrix.identity() );

Pool.create( Box2, box => box.makeEmpty() );
Pool.create( Box3, box => box.makeEmpty() );

Pool.create( Euler );
Pool.create( Object3D );
Pool.create( Color );
Pool.create( Spherical );
