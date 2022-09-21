import ShaderPass from '~/canvas/post-processing/ShaderPass';

import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

export default class RGBShiftPass extends ShaderPass {

	constructor() {

		super( {

			uniforms: {

				tDiffuse: { value: null },
				strength: { value: 0 },
				angle: { value: 0 },

			},

			vertexShader,
			fragmentShader

		} );

		Application.events.add( this );

	}

	onPreFrame() {

		const { parameters } = Application.postProcessing;
		const { strength, angle, enabled } = parameters.rgbShiftPass;
		this.uniforms[ 'strength' ].value = strength;
		this.uniforms[ 'angle' ].value = angle;
		this.enabled = enabled;

	}

}

