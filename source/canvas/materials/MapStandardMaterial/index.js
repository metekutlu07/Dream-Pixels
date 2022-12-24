import { MeshStandardMaterial, UniformsUtils, ShaderLib } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class CustomStandardMaterial extends MeshStandardMaterial {

	constructor( parameters = {} ) {

		super( parameters );

		this.type = 'StandardMaterial';

		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;

		this.uniforms = Object.assign( {

			rimPower: { value: 1.5 },
			rimStrength: { value: 1 },

		}, UniformsUtils.clone( ShaderLib.standard.uniforms ) );

	}

}
