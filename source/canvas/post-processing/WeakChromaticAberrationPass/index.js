import ShaderPass from '../ShaderPass';

import vertexShader from '../ChromaticAberrationPass/vertexShader';
import fragmentShader from './fragmentShader';

export default class WeakChromaticAberrationPass extends ShaderPass {

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
		const { weakChromaticAberrationPass } = postProcessing.parameters;
		this.uniforms[ 'strength' ].value = weakChromaticAberrationPass.strength;
		this.enabled = postProcessing.isPassEnabled( 'weakChromaticAberrationPass' );

	}

}
