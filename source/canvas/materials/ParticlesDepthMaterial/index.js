import { MeshDepthMaterial, UniformsUtils, ShaderLib } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class ParticlesDepthMaterial extends MeshDepthMaterial {

	constructor( parameters = {} ) {

		super( parameters );

		this.type = 'MeshDepthMaterial';
		this.uniforms = { simulation: { value: null } };

		const uniforms = UniformsUtils.clone( ShaderLib.depth.uniforms );
		Object.assign( this.uniforms, uniforms );

	}

	onBeforeCompile( shaders ) {

		Object.assign( shaders, { vertexShader, fragmentShader } );

	}

}
