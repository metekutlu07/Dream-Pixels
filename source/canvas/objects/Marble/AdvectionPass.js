import { Vector2 } from 'three';

import ShaderPass from '~/canvas/post-processing/ShaderPass';
import vertexShader from './vertexShader';

const fragmentShader = glsl`

	varying vec2 vUv;
	uniform sampler2D uVelocity;
	uniform sampler2D uTarget;

	uniform vec2 resolution;
	uniform float deltaTime;
	uniform float advection;

	void main () {

		vec2 texelSize = 1. / resolution;

		vec2 coordinates = vUv - deltaTime * texture2D( uVelocity, vUv ).xy * texelSize;
		vec4 source = texture2D( uTarget, coordinates );

		float decay = 1. + advection * deltaTime;
		gl_FragColor = source / decay;

	}

`;

export default class AdvectionPass extends ShaderPass {

	constructor( simulation ) {

		const uniforms = {

			uVelocity: { value: null },
			uTarget: { value: null },
			resolution: { value: null },
			deltaTime: { value: null },
			advection: { value: null }

		};

		super( {

			uniforms,
			vertexShader,
			fragmentShader

		} );

		this.simulation = simulation;
		this.position = new Vector2();
		this.force = new Vector2();

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
		const { velocity, density } = parameters;

		this.uniforms[ 'uVelocity' ].value = textures[ 'VelocityA' ];
		this.uniforms[ 'uTarget' ].value = textures[ 'VelocityA' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'VelocityA' ];

		this.uniforms[ 'deltaTime' ].value = deltaTime;
		this.uniforms[ 'advection' ].value = velocity;

		super.render( renderer, renderTargets[ 'VelocityB' ] );

		simulation.switch( 'Velocity' );

		this.uniforms[ 'uVelocity' ].value = textures[ 'VelocityA' ];
		this.uniforms[ 'uTarget' ].value = textures[ 'ColorA' ];
		this.uniforms[ 'resolution' ].value = resolutions[ 'VelocityA' ];
		this.uniforms[ 'advection' ].value = density;

		super.render( renderer, renderTargets[ 'ColorB' ] );

		simulation.switch( 'Color' );

	}

}

