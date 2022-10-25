import ShaderPass from '~/canvas/post-processing/ShaderPass';
import vertexShader from './vertexShader';

const fragmentShader = glsl`

	varying highp vec2 vUv;
	varying highp vec2 vLeft;
	varying highp vec2 vRight;
	varying highp vec2 vTop;
	varying highp vec2 vBottom;

	uniform sampler2D uVelocity;

	void main () {

		float left = texture2D( uVelocity, vLeft ).x;
		float right = texture2D( uVelocity, vRight ).x;
		float top = texture2D( uVelocity, vTop ).y;
		float bottom = texture2D( uVelocity, vBottom ).y;

		vec2 center = texture2D( uVelocity, vUv ).xy;

		if ( vLeft.x < 0. ) { left = -center.x; }
		if ( vRight.x > 1. ) { right = -center.x; }
		if ( vTop.y > 1. ) { top = -center.y; }
		if ( vBottom.y < 0. ) { bottom = -center.y; }

		float divergence = .5 * ( right - left + top - bottom );
		gl_FragColor = vec4( divergence, 0., 0., 1. );

	}

`;

export default class DivergencePass extends ShaderPass {

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

		const { renderer } = Application;
		const { renderTargets, textures, resolutions } = simulation;

		this.uniforms[ 'uVelocity' ].value = textures[ 'VelocityA' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'VelocityA' ];

		super.render( renderer, renderTargets[ 'Divergence' ] );

	}

}

