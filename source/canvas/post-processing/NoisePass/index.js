import { RepeatWrapping, Vector2 } from 'three';

import ShaderPass from '~/canvas/post-processing/ShaderPass';

import vertexShader from './vertexShader.glsl';
import fragmentShader from './fragmentShader.glsl';

export default class NoisePass extends ShaderPass {

	constructor() {

		super( {

			uniforms: {

				tDiffuse: { value: null },
				tNoise: { value: null },
				resolution: { value: new Vector2() },
				offset: { value: new Vector2() },
				scale: { value: 0 },
				strength: { value: 0 }

			},

			vertexShader,
			fragmentShader

		} );

		Application.events.add( this );

	}

	onLoad( files ) {

		if ( ! files[ 'common' ] ) return;

		const { textures } = files[ 'common' ];
		const map = textures[ 'Noise.jpg' ];
		map.wrapT = map.wrapS = RepeatWrapping;
		this.uniforms[ 'tNoise' ].value = map;

	}

	onPreFrame() {

		const { resolution } = Application.renderer;
		this.uniforms[ 'resolution' ].value.copy( resolution );
		this.uniforms[ 'offset' ].value.set( Math.random(), Math.random() );

		const { parameters } = Application.postProcessing;
		const { strength, scale, enabled } = parameters.noisePass;
		this.uniforms[ 'strength' ].value = strength;
		this.uniforms[ 'scale' ].value = scale;
		this.enabled = enabled;

	}

}

