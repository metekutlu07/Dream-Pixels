import { Vector2 } from 'three';

import ShaderPass from '~/canvas/post-processing/ShaderPass';

import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

export default class SlicePass extends ShaderPass {

	constructor() {

		super( {

			uniforms: {

				tDiffuse: { value: null },
				elapsedTime: { value: 1 },

				count: { value: 2 },
				offset: { value: .1 },
				speed: { value: new Vector2() }

			},

			vertexShader,
			fragmentShader

		} );

		Application.events.add( this );

	}

	onPreFrame() {

		const { elapsedTime } = Application.time;
		this.uniforms[ 'elapsedTime' ].value = elapsedTime * 1e-3;

		const { parameters } = Application.postProcessing;
		const { count, offset, speed, enabled } = parameters.slicesPass;
		this.uniforms[ 'count' ].value = count;
		this.uniforms[ 'offset' ].value = offset;
		this.uniforms[ 'speed' ].value.copy( speed );
		this.enabled = enabled;

	}

}

