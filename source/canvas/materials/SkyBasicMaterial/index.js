import { MeshBasicMaterial, UniformsUtils, ShaderLib, Color } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class SkyBasicMaterial extends MeshBasicMaterial {

	constructor() {

		super();

		this.type = 'BasicMaterial';
		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;
		this.depthTest = false;

		this.uniforms = Object.assign( {

			topColor: { value: new Color() },
			bottomColor: { value: new Color() },
			offset: { value: 30 },
			exponent: { value: .5 }

		}, UniformsUtils.clone( ShaderLib.standard.uniforms ) );

		Application.events.add( this );

	}

	onPreFrame() {

		const { parameters } = Application.scene.lighting;
		const { topColor, bottomColor } = parameters.sky;

		this.uniforms[ 'topColor' ].value.set( topColor );
		this.uniforms[ 'bottomColor' ].value.set( bottomColor );

	}

}
