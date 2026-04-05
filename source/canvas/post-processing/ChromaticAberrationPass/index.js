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

		const { postProcessing } = Application;
		const { chromaticAberrationPass } = postProcessing.parameters;
		const target = postProcessing.getPassTarget( 'chromaticAberrationPass' );
		const multiplier = target && target !== true ? target.strengthMultiplier || 1 : 1;

		this.uniforms[ 'strength' ].value = chromaticAberrationPass.strength * multiplier;
		this.enabled = postProcessing.isPassEnabled( 'chromaticAberrationPass' );

	}

}
