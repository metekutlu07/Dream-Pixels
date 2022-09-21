import { Vector2 } from 'three';

import ShaderPass from '~/canvas/post-processing/ShaderPass';

import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

export default class LinesPass extends ShaderPass {

	constructor() {

		super( {

			uniforms: {

				tDiffuse: { value: null },
				elapsedTime: { value: 0 },
				resolution: { value: new Vector2() },

				size: { value: .9 },
				count: { value: 1 }

			},

			vertexShader,
			fragmentShader

		} );

		Application.events.add( this );

	}

	onPreFrame() {

		const { resolution } = Application.renderer;
		this.uniforms[ 'resolution' ].value.copy( resolution );

		const { parameters } = Application.postProcessing;
		const { size, count, enabled } = parameters.linesPass;
		this.uniforms[ 'size' ].value = size;
		this.uniforms[ 'count' ].value = count;
		this.enabled = enabled;

	}

}

