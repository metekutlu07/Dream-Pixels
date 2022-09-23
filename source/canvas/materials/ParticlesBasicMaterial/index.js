import { MeshBasicMaterial, UniformsUtils, ShaderLib } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class BasicMaterial extends MeshBasicMaterial {

	constructor( parameters = {} ) {

		super( parameters );

		this.type = 'BasicMaterial';
		this.uniforms = { simulation: { value: null } };

		const uniforms = UniformsUtils.clone( ShaderLib.basic.uniforms );
		Object.assign( this.uniforms, uniforms );

	}

	onBeforeCompile( shaders ) {

		Object.assign( shaders, { vertexShader, fragmentShader } );

	}

}
