import { MeshStandardMaterial, UniformsUtils, ShaderLib, Color } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class MSDFTextMaterial extends MeshStandardMaterial {

	constructor( parameters = {} ) {

		MSDFTextMaterial.prototype.SDFMap = null;
		MSDFTextMaterial.prototype.strokeColor = null;
		MSDFTextMaterial.prototype.strokeWidth = null;
		MSDFTextMaterial.prototype.onlyStroke = null;
		MSDFTextMaterial.prototype.elapsedTime = null;

		super( parameters );

		this.type = 'StandardMaterial';

		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;
		this.transparent = true;

		this.uniforms = Object.assign( {

			SDFMap: { value: parameters.SDFMap },
			strokeColor: { value: new Color() },
			strokeWidth: { value: parameters.strokeWidth },
			onlyStroke: { value: parameters.onlyStroke },
			pixelRatio: { value: 1 },
			elapsedTime: { value: 0 }

		}, UniformsUtils.clone( ShaderLib.standard.uniforms ) );

		Application.events.add( this );

	}

	onPreFrame() {

		const { pixelRatio } = Application.renderer;
		const { elapsedTime } = Application.time;
		this.uniforms[ 'pixelRatio' ].value = pixelRatio;
		this.uniforms[ 'elapsedTime' ].value = elapsedTime;

	}

}
