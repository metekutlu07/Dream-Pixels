import {

	InstancedMesh,
	Matrix4,
	SphereGeometry,
	RGBADepthPacking

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

		for ( let i = 0; i < count; i++ ) {

			const x = Math.floor( i % width ) / width;
			const y = Math.floor( i / width ) / height;
			matrix.setPosition( x, y, 0 );

			this.setMatrixAt( i, matrix );

		}

		this.size = size;
		this.castShadow = true;
		this.receiveShadow = true;
		this.needsUpdate = true;

		this.customDepthMaterial = new ParticlesDepthMaterial();
		this.customDepthMaterial.depthPacking = RGBADepthPacking;
		this.simulation = new Simulation( width, height );

	}

	onLoad( files ) {

		if ( ! files[ 'common' ] ) return;

		const { models } = files[ 'common' ];
		const { geometries } = models[ 'Particle.glb' ];
		this.geometry = geometries[ 'Particle' ];
		this.geometry.scale( this.size, this.size, this.size );

	}

	onUpdate() {

		// if ( ! this.needsUpdate ) return;
		// this.needsUpdate = false;

		const { texture } = this.simulation.render();
		this.material.uniforms[ 'simulation' ].value = texture;
		this.customDepthMaterial.uniforms[ 'simulation' ].value = texture;

	}

	onAfterRender() {

		// if (this.renderTargetViewer) this.renderTargetViewer = new RenderTargetViewer();

		// const { directionalLight } = Application.scene.lighting;
		// this.renderTargetViewer.render( directionalLight.shadow.map );
		// this.renderTargetViewer.render( this.simulation.renderTargets[ 0 ] );

	}

	onKeyDown( parameters ) {

		const { code } = parameters;
		if ( code === 'Space' ) this.needsUpdate = ! this.needsUpdate;
		else if ( code === 'KeyS' ) this.export();

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
