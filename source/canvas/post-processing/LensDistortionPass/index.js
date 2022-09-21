import ShaderPass from '../ShaderPass';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class LensDistortionPass extends ShaderPass {

	constructor() {

		super( {

			vertexShader,
			fragmentShader,
			uniforms: {

				tDiffuse: { value: null },
				strength: { value: 1.1 },
				aspect: { value: 1 }

			},

		} );

		Application.addEventListener( 'update', this.update );

	}

	update() {

		const { lensDistortionPass } = Application.postProcessing.parameters;
		const { strength, enabled } = lensDistortionPass;
		const { aspect } = Application.viewport;
		this.uniforms[ 'strength' ].value = strength;
		this.uniforms[ 'aspect' ].value = aspect;
		this.enabled = enabled;

	}

}

