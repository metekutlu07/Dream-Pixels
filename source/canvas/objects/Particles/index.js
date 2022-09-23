import {

	Raycaster,
	InstancedMesh,
	SphereGeometry,
	RGBADepthPacking,
	Quaternion,
	Matrix4,
	Vector3,
	Color

} from 'three';

import ParticlesDepthMaterial from '~/canvas/materials/ParticlesDepthMaterial';
import ParticlesBasicMaterial from '~/canvas/materials/ParticlesBasicMaterial';
// import RenderTargetViewer from '~/canvas/utilities/RenderTargetViewer';

import Simulation from './Simulation';

export default class Particles extends InstancedMesh {

	constructor() {

		const width = 512;
		const height = 512;
		const count = width * height;

		const size = .025;
		const geometry = new SphereGeometry( size, 3, 2 );
		const material = new ParticlesBasicMaterial();

		super( geometry, material, count );

		Application.events.add( this );

		const matrix = new Matrix4().makeScale( 1, 1, 1 );
		const color = Color.get();
		const axis = Vector3.get();
		const quaternion = Quaternion.get();

		for ( let i = 0; i < count; i++ ) {

			const x = Math.floor( i % width ) / width;
			const y = Math.floor( i / width ) / height;

			const angle = Math.randFloat( -Math.PI, Math.PI );
			quaternion.setFromAxisAngle( axis.random(), angle );
			matrix.makeRotationFromQuaternion( quaternion );
			matrix.makeTranslation( x, y, 0 );

			this.setMatrixAt( i, matrix );
			this.setColorAt( i, color );

		}

		this.size = size;
		this.needsUpdate = true;
		this.raycaster = new Raycaster();

		this.customDepthMaterial = new ParticlesDepthMaterial();
		this.customDepthMaterial.depthPacking = RGBADepthPacking;
		this.simulation = new Simulation( width, height );

		Color.release( color );
		Vector3.release( axis );
		Quaternion.release( quaternion );

	}

	async onLoad( files ) {

		if ( ! files[ 'projects' ] ) return;

		const { models, jsons } = files[ 'projects' ];
		const { geometries } = models[ 'Particle.glb' ];

		this.geometry = geometries[ 'Particle' ];
		this.geometry.scale( this.size, this.size, this.size );

		const { colors } = jsons[ 'Colors.json' ];
		const color = Color.get();

		for ( let i = 0; i < this.count; i++ ) {

			const [ hex ] = colors[ i % colors.length ].split( '|' );
			this.setColorAt( i, color.setStyle( hex ) );

		}

		this.instanceColor.needsUpdate = true;

		Color.release( color );

	}

	onUpdate() {

		if ( ! this.needsUpdate ) return;
		this.needsUpdate = false;

		const { texture } = this.simulation.render();
		this.material.uniforms[ 'simulation' ].value = texture;
		this.customDepthMaterial.uniforms[ 'simulation' ].value = texture;

	}

	onPostUpdate() {

		this.setRaycaster();

	}

	onAfterRender() {

		// if ( this.renderTargetViewer ) {

		// 	const { directionalLight } = Application.scene.lighting;
		// 	this.renderTargetViewer.render( directionalLight.shadow.map );
		// 	this.renderTargetViewer.render( this.simulation.renderTargets[ 0 ] );

		// } else this.renderTargetViewer = new RenderTargetViewer();

	}

	onKeyDown( parameters ) {

		const { code } = parameters;
		if ( code === 'Space' ) this.needsUpdate = ! this.needsUpdate;
		else if ( code === 'KeyS' ) this.export();

	}

	setRaycaster() {

		if ( ! this.simulation.points ) return;

		const { camera, pointer } = Application;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		const { ray, near, far } = this.raycaster;
		const { points } = this.simulation;
		const closestPoint = Vector3.get();

		let minDistance;
		let index;

		for ( let i = 0; i < points.length; i += 4 ) {

			const point = points[ i ];

			if ( ray.distanceSqToPoint( point ) > 1e-2 ) continue;

			ray.closestPointToPoint( point, closestPoint );
			// closestPoint.applyMatrix4( this.matrixWorld );

			const distance = ray.origin.distanceTo( closestPoint );
			if ( distance < near || distance > far ) continue;
			if ( distance > minDistance ) continue;

			minDistance = distance;
			index = i;

		}

		Vector3.release( closestPoint );
		Application.store.set( 'pointer', index !== undefined );

	}

	export() {

		const { renderer } = Application;
		const { width, height } = this.simulation;

		const renderTarget = this.simulation.render();
		const data = new Float32Array( width * height * 4 );
		renderer.readRenderTargetPixels( renderTarget, 0, 0, width, height, data );

		const { buffer } = data;
		const parameters = { type: 'application/octet-stream' };
		const blob = new Blob( [ buffer ], parameters );

		const link = document.createElement( 'a' );
		link.href = URL.createObjectURL( blob );
		link.download = 'Particles.buffer';
		link.addEventListener( 'click', event => event.stopPropagation() );
		link.click();

	}

}
