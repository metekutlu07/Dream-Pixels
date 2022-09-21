import { Vector2 } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default {

	vertexShader,
	fragmentShader,

	defines: {
		KERNEL_RADIUS: null,
		SIGMA: null
	},

	uniforms: {
		tDiffuse: { value: null },
		textureSize: { value: new Vector2( .5, .5 ) },
		direction: { value: new Vector2( .5, .5 ) }
	}

};
