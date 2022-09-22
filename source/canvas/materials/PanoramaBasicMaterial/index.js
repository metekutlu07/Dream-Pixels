import { MeshBasicMaterial, UniformsUtils, ShaderLib } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class PanoramaBasicMaterial extends MeshBasicMaterial {

	constructor( parameters ) {

		super( parameters );

		this.type = 'BasicMaterial';
		this.uniforms = {

			mapLeft: { value: null },
			mapRight: { value: null }

		};

		const uniforms = UniformsUtils.clone( ShaderLib.basic.uniforms );
		Object.assign( this.uniforms, uniforms );

	}

	onBeforeCompile( shaders ) {

		Object.assign( shaders, { vertexShader, fragmentShader } );

	}

}
