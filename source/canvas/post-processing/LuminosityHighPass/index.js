import { Color } from 'three';

import ShaderPass from '../ShaderPass';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class LuminosityHighPass extends ShaderPass {

	constructor() {

		super( {


			vertexShader,
			fragmentShader,
			uniforms: {

				tDiffuse: { value: null },
				color: { value: new Color( '#000000' ) },
				threshold: { value: 1 },
				smoothWidth: { value: 1 },
				opacity: { value: 1 }

			}

		} );

	}

}
