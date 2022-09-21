import { MeshBasicMaterial, UniformsUtils, ShaderLib } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class PatternBasicMaterial extends MeshBasicMaterial {

	constructor( parameters ) {

		super( parameters );

		this.type = 'BasicMaterial';
		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;

		this.uniforms = Object.assign( {

			elapsedTime: { value: 0 }

		}, UniformsUtils.clone( ShaderLib.basic.uniforms ) );

		Application.events.add( this );

	}

	onUpdate() {

		const { elapsedTime } = Application.time;
		this.uniforms[ 'elapsedTime' ].value = elapsedTime * .0;

	}

}
