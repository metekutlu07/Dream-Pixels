import { MeshStandardMaterial, Matrix4, UniformsUtils, ShaderLib } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class GroundStandardMaterial extends MeshStandardMaterial {

	constructor( parameters = {} ) {

		super( parameters );

		this.type = 'StandardMaterial';

		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;

		this.uniforms = Object.assign( {

			reflectionMap: { value: null },
			reflectionMapMatrix: { value: new Matrix4() },
			reflectionStrength: { value: .5 }

		}, UniformsUtils.clone( ShaderLib.standard.uniforms ) );

	}

}
