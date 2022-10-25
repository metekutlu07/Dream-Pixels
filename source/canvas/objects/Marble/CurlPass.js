import ShaderPass from '~/canvas/post-processing/ShaderPass';
import vertexShader from './vertexShader';

const fragmentShader = glsl`

	varying vec2 vUv;
	varying vec2 vLeft;
	varying vec2 vRight;
	varying vec2 vTop;
	varying vec2 vBottom;

	uniform sampler2D uVelocity;

	void main () {

		float left = texture2D( uVelocity, vLeft ).y;
		float right = texture2D( uVelocity, vRight ).y;
		float top = texture2D( uVelocity, vTop ).x;
		float bottom = texture2D( uVelocity, vBottom ).x;

		float vorticity = right - left - top + bottom;
		gl_FragColor = vec4( .5 * vorticity, 0., 0., 1. );

	}

`;

export default class CurlPass extends ShaderPass {

	constructor() {

		const uniforms = {

			uVelocity: { value: null },
			resolution: { value: null }

		};

		super( {

			uniforms,
			vertexShader,
			fragmentShader

		} );

		Application.events.add( this );

	}

	render( simulation ) {

		const {

			renderTargets,
			textures,
			resolutions

		} = simulation;

		const { renderer } = Application;

		this.uniforms[ 'uVelocity' ].value = textures[ 'VelocityA' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'VelocityA' ];

		super.render( renderer, renderTargets[ 'Curl' ] );

	}

}

