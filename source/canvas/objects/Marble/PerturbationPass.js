import ShaderPass from '~/canvas/post-processing/ShaderPass';
import vertexShader from './vertexShader';

const fragmentShader = glsl`

	varying vec2 vUv;
	uniform sampler2D uSource;

	uniform vec2 resolution;
	uniform vec2 coordinates;
	uniform vec3 color;
	uniform float strength;
	uniform float scale;
	uniform float radius;
	uniform float isColor;

	void main () {

		vec2 delta = coordinates - ( vUv * 2. - 1. );
		delta *= resolution / radius;

		gl_FragColor = texture2D( uSource, vUv );

		if ( isColor > .0 ) {

			float ratio = 1. - min( length( delta ), 1. );
			ratio *= 25.;
			ratio = clamp( ratio, .0, 1. );

			gl_FragColor.xyz = mix( gl_FragColor.xyz, color, ratio );

		} else {

			float ratio = 1. - min( length( delta ), 1. );
			gl_FragColor.xy -= ratio * delta * strength;

		}
	}

`;

export default class PerturbationPass extends ShaderPass {

	constructor() {

		const uniforms = {

			uSource: { value: null },
			resolution: { value: null },
			scale: { value: null },
			color: { value: null },
			strength: { value: null },
			coordinates: { value: null },
			radius: { value: null },
			isColor: { value: null }

		};

		super( {

			uniforms,
			vertexShader,
			fragmentShader

		} );

		Application.events.add( this );

	}

	render( simulation, parameters ) {

		const {

			renderTargets,
			textures,
			resolutions,
			scales

		} = simulation;

		const { coordinates, radius, strength, color } = parameters;
		const { renderer } = Application;

		this.uniforms[ 'coordinates' ].value = coordinates;
		this.uniforms[ 'radius' ].value = radius;
		this.uniforms[ 'strength' ].value = strength;
		this.uniforms[ 'color' ].value = color;

		this.uniforms[ 'uSource' ].value = textures[ 'VelocityA' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'ColorB' ];
		this.uniforms[ 'scale' ].value = scales[ 'ColorB' ];
		this.uniforms[ 'isColor' ].value = 0;

		super.render( renderer, renderTargets[ 'VelocityB' ] );

		simulation.switch( 'Velocity' );

		this.uniforms[ 'uSource' ].value = textures[ 'ColorA' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'ColorB' ];
		this.uniforms[ 'scale' ].value = scales[ 'ColorB' ];
		this.uniforms[ 'isColor' ].value = 1;

		super.render( renderer, renderTargets[ 'ColorB' ] );

		simulation.switch( 'Color' );

	}

}

