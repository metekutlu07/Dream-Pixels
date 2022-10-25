import ShaderPass from '~/canvas/post-processing/ShaderPass';
import vertexShader from './vertexShader';

const fragmentShader = glsl`

	varying highp vec2 vUv;
	varying highp vec2 vLeft;
	varying highp vec2 vRight;
	varying highp vec2 vTop;
	varying highp vec2 vBottom;

	uniform sampler2D uPressure;
	uniform sampler2D uDivergence;

	void main () {

		float left = texture2D( uPressure, vLeft ).x;
		float right = texture2D( uPressure, vRight ).x;
		float top = texture2D( uPressure, vTop ).x;
		float bottom = texture2D( uPressure, vBottom ).x;

		float divergence = texture2D( uDivergence, vUv ).x;
		float pressure = ( left + right + bottom + top - divergence ) * .25;

		gl_FragColor = vec4( pressure, 0., 0., 1. );

	}

`;

export default class PressurePass extends ShaderPass {

	constructor() {

		const uniforms = {

			uPressure: { value: null },
			uDivergence: { value: null },
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
			resolutions,
			parameters

		} = simulation;

		const { renderer } = Application;
		const { iterations } = parameters;

		this.uniforms[ 'uDivergence' ].value = textures[ 'Divergence' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'Divergence' ];

		const length = Math.round( iterations / 2 ) * 2;

		for ( let i = 0; i < length; i++ ) {

			this.uniforms[ 'uPressure' ].value = textures[ 'PressureA' ];

			super.render( renderer, renderTargets[ 'PressureB' ] );

			simulation.switch( 'Pressure' );

		}

	}

}

