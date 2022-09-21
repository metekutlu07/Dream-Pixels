import { MeshStandardMaterial, UniformsUtils, ShaderLib } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class ParticlesStandardMaterial extends MeshStandardMaterial {

	constructor( parameters = {} ) {

		super( parameters );

		this.type = 'StandardMaterial';
		this.uniforms = { simulation: { value: null } };

		const uniforms = UniformsUtils.clone( ShaderLib.standard.uniforms );
		Object.assign( this.uniforms, uniforms );

	}

	onBeforeCompile( shaders ) {

		Object.assign( shaders, { vertexShader, fragmentShader } );

	}

}
