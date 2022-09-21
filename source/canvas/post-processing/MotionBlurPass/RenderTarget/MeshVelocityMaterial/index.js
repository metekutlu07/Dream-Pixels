import { MeshBasicMaterial, Matrix4, UniformsUtils, ShaderLib } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class MeshVelocityMaterial extends MeshBasicMaterial {

	constructor() {

		super();

		this.type = 'BasicMaterial';

		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;
		this.transparent = false;

		this.uniforms = Object.assign( {

			previousProjectionMatrix: { value: new Matrix4() },
			previousModelViewMatrix: { value: new Matrix4() },
			previousBoneTexture: { value: null },
			expandGeometry: { value: 5 },
			interpolateGeometry: { value: 1 }

		}, UniformsUtils.clone( ShaderLib.basic.uniforms ) );

	}

}

