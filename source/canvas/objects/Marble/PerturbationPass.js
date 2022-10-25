import { Vector2 } from 'three';

import ShaderPass from '~/canvas/post-processing/ShaderPass';
import vertexShader from './vertexShader';

const fragmentShader = glsl`

	varying vec2 vUv;
	uniform sampler2D uSource;

	uniform vec2 resolution;
	uniform vec3 perturbation;
	uniform vec2 coordinates;
	uniform float radius;

	void main () {

		vec2 delta = coordinates - ( vUv * 2. - 1. );
		delta *= resolution / radius;

		gl_FragColor = texture2D( uSource, vUv );

		float circle = 1. - min( length( delta ), 1. );
		gl_FragColor.xyz += circle * perturbation;

	}

`;

export default class PerturbationPass extends ShaderPass {

	constructor() {

		const uniforms = {

			uSource: { value: null },
			resolution: { value: new Vector2() },
			perturbation: { value: null },
			coordinates: { value: null },
			radius: { value: null }

		};

		super( {

			uniforms,
			vertexShader,
			fragmentShader

		} );

		Application.events.add( this );

	}

	render( simulation, parameters ) {

		const { renderer } = Application;
		const { renderTargets, textures, resolutions } = simulation;

		const { coordinates, radius, force, color } = parameters;
		this.uniforms[ 'coordinates' ].value = coordinates;
		this.uniforms[ 'radius' ].value = radius;

		this.uniforms[ 'uSource' ].value = textures[ 'VelocityA' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'ColorB' ];
		this.uniforms[ 'perturbation' ].value = force;

		super.render( renderer, renderTargets[ 'VelocityB' ] );

		simulation.switch( 'Velocity' );

		this.uniforms[ 'uSource' ].value = textures[ 'ColorA' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'ColorB' ];
		this.uniforms[ 'perturbation' ].value = color;

		super.render( renderer, renderTargets[ 'ColorB' ] );

		simulation.switch( 'Color' );

	}

}

