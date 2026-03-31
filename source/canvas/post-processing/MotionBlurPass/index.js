import ShaderPass from '../ShaderPass';

import RenderTarget from './RenderTarget';
import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class MotionBlurPass extends ShaderPass {

	constructor() {

		super( {

			vertexShader,
			fragmentShader,
			defines: { SAMPLES: 5 },
			uniforms: {

				tDiffuse: { value: null },
				tVelocityMap: { value: null },
				strength: { value: 1 }

			}

		} );

		this.renderTarget = new RenderTarget();

		Application.events.add( this );

	}

	dispose() {

		super.dispose();

		this.renderTarget.dispose();

	}

	setSize( width, height ) {

		this.renderTarget.setSize( width, height );

	}

	render( renderer, writeBuffer, readBuffer ) {

		this.renderTarget.camera = Application.overrideCamera || Application.camera;
		this.renderTarget.scene = Application.scene;
		this.renderTarget.render( renderer );

		this.uniforms[ 'tVelocityMap' ].value = this.renderTarget.texture;

		super.render( renderer, writeBuffer, readBuffer );

	}

	onPreFrame() {

		const { motionBlurPass } = Application.postProcessing.parameters;
		const { strength } = motionBlurPass;
		this.uniforms[ 'strength' ].value = strength;
		this.enabled = Application.postProcessing.isPassEnabled( 'motionBlurPass' );

	}

}
