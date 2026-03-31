import ShaderPass from '../ShaderPass';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class ChromaticAberrationPass extends ShaderPass {

	constructor() {

		super( {

			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			uniforms: {

				tDiffuse: { value: null },
				strength: { value: 0 }

			}

		} );

		Application.events.add( this );

	}

	onPreFrame() {

		const { chromaticAberrationPass } = Application.postProcessing.parameters;
		const { strength } = chromaticAberrationPass;
		this.uniforms[ 'strength' ].value = strength;
		this.enabled = Application.postProcessing.isPassEnabled( 'chromaticAberrationPass' );

	}

}
