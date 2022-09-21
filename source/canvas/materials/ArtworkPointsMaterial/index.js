import { PointsMaterial } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class ArtworkPointsMaterial extends PointsMaterial {

	onBeforeCompile( shaders ) {

		shaders.vertexShader = vertexShader;
		shaders.fragmentShader = fragmentShader;

	}

}
