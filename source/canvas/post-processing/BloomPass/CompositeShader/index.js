import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default {

	vertexShader,
	fragmentShader,
	defines: { MIPMAP_COUNT: null },
	uniforms: {

		blurTexture1: { value: null },
		blurTexture2: { value: null },
		blurTexture3: { value: null },
		blurTexture4: { value: null },
		blurTexture5: { value: null },
		dirtTexture: { value: null },
		bloomStrength: { value: 1. },
		bloomFactors: { value: null },
		bloomTintColors: { value: null },
		bloomRadius: { value: 0.0 }

	},

};
