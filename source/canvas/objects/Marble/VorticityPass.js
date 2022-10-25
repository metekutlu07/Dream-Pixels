import ShaderPass from '~/canvas/post-processing/ShaderPass';
import vertexShader from './vertexShader';

const fragmentShader = glsl`

	varying vec2 vUv;
	varying vec2 vLeft;
	varying vec2 vRight;
	varying vec2 vTop;
	varying vec2 vBottom;

	uniform sampler2D uVelocity;
	uniform sampler2D uCurl;

	uniform float curl;
	uniform float deltaTime;

	void main () {

		float left = texture2D( uCurl, vLeft ).x;
		float right = texture2D( uCurl, vRight ).x;
		float top = texture2D( uCurl, vTop ).x;
		float bottom = texture2D( uCurl, vBottom ).x;

		float center = texture2D( uCurl, vUv ).x;

		vec2 force = .5 * vec2( abs( top ) - abs( bottom ), abs( right ) - abs( left ) );
		force /= length( force ) + .0001;
		force *= curl * center;
		force.y *= -1.0;

		vec2 velocity = texture2D( uVelocity, vUv ).xy;
		velocity += force * deltaTime;
		velocity = min( max( velocity, -1000. ), 1000. );

		gl_FragColor = vec4( velocity, 0.0, 1. );

	}

`;

export default class VorticityPass extends ShaderPass {

	constructor() {

		const uniforms = {

			uVelocity: { value: null },
			uCurl: { value: null },
			resolution: { value: null },
			deltaTime: { value: null },
			curl: { value: null }

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
			deltaTime,
			resolutions,
			parameters

		} = simulation;

		const { renderer } = Application;
		const { curl } = parameters;

		this.uniforms[ 'uVelocity' ].value = textures[ 'VelocityA' ];
		this.uniforms[ 'uCurl' ].value = textures[ 'Curl' ];

		this.uniforms[ 'resolution' ].value = resolutions[ 'VelocityA' ];
		this.uniforms[ 'deltaTime' ].value = deltaTime;
		this.uniforms[ 'curl' ].value = curl;

		super.render( renderer, renderTargets[ 'VelocityB' ] );

		simulation.switch( 'Velocity' );

	}

}

