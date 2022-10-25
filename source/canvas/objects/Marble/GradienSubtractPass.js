import ShaderPass from '~/canvas/post-processing/ShaderPass';
import vertexShader from './vertexShader';

const fragmentShader = glsl`

	varying highp vec2 vUv;
	varying highp vec2 vLeft;
	varying highp vec2 vRight;
	varying highp vec2 vTop;
	varying highp vec2 vBottom;

	uniform sampler2D uPressure;
	uniform sampler2D uVelocity;

	void main () {

		float left = texture2D( uPressure, vLeft ).x;
		float right = texture2D( uPressure, vRight ).x;
		float top = texture2D( uPressure, vTop ).x;
		float bottom = texture2D( uPressure, vBottom ).x;

		vec2 velocity = texture2D( uVelocity, vUv ).xy;
		velocity.xy -= vec2( right - left, top - bottom );

		gl_FragColor = vec4( velocity, 0., 1. );

	}

`;

export default class GradienSubtractPass extends ShaderPass {

	constructor() {

		const uniforms = {

			uVelocity: { value: null },
			uPressure: { value: null },
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

		this.uniforms[ 'uPressure' ].value = textures[ 'PressureA' ];
		this.uniforms[ 'uVelocity' ].value = textures[ 'VelocityA' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'VelocityA' ];

		super.render( renderer, renderTargets[ 'VelocityB' ] );

		simulation.switch( 'Velocity' );

	}

}

