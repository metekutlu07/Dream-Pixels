import ShaderPass from '../ShaderPass';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class CopyPass extends ShaderPass {

	constructor() {

		super( {

			vertexShader,
			fragmentShader,
			uniforms: {

				tDiffuse: { value: null },
				opacity: { value: 1 }
			}

		} );

	}

}
