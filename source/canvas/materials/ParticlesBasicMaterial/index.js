import { ShaderMaterial, UniformsUtils, ShaderLib } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class ParticlesBasicMaterial extends ShaderMaterial {

	constructor() {

		const uniforms = UniformsUtils.clone( ShaderLib.shadow.uniforms );

		super( {

			vertexShader,
			fragmentShader,
			uniforms: Object.assign( { simulation: { value: null } }, uniforms )

		} );

		this.lights = true;
		this.fog = true;

	}

}
