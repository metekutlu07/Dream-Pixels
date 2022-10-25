import ShaderPass from '~/canvas/post-processing/ShaderPass';
import vertexShader from './vertexShader';

const fragmentShader = glsl`

	varying highp vec2 vUv;

	uniform sampler2D uPressure;
	uniform float pressure;

	void main () {

		gl_FragColor = pressure * texture2D( uPressure, vUv );

	}

`;

export default class ClearPass extends ShaderPass {

	constructor() {

		const uniforms = {

			uPressure: { value: null },
			resolution: { value: null },
			pressure: { value: null }

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
		const { pressure } = parameters;

		this.uniforms[ 'uPressure' ].value = textures[ 'PressureA' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'PressureA' ];
		this.uniforms[ 'pressure' ].value = pressure;

		super.render( renderer, renderTargets[ 'PressureB' ] );

		simulation.switch( 'Pressure' );

	}

}

