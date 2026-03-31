import { Color } from 'three';

import ShaderPass from '../ShaderPass';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class VignettePass extends ShaderPass {

	constructor() {

		super( {

			vertexShader,
			fragmentShader,
			uniforms: {

				tDiffuse: { value: null },
				color: { value: new Color() },
				strength: { value: .5 }

			},

		} );

		Application.events.add( this );

	}

	onPreFrame() {

		const { vignettePass } = Application.postProcessing.parameters;
		const { strength, color } = vignettePass;
		this.uniforms[ 'strength' ].value = strength;
		this.uniforms[ 'color' ].value.set( color );
		this.enabled = Application.postProcessing.isPassEnabled( 'vignettePass' );

	}

}
