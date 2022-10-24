import { Vector2 } from 'three';

import ShaderPass from '~/canvas/post-processing/ShaderPass';

const vertexShader = glsl`

	varying vec2 vUv;

	void main() {

		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );

	}

`;

const fragmentShader = glsl`

	precision highp float;

	uniform sampler2D mPressure;
	uniform sampler2D mVelocity;

	uniform float deltaTime;
	uniform vec2 resolution;

	varying vec2 vUv;

	void main() {

		float step = 1.;

		vec2 cellSize = 1. / resolution;

		float right = texture2D( mPressure, vUv + vec2( cellSize.x * step, 0 ) ).x;
		float left = texture2D( mPressure, vUv - vec2( cellSize.x * step, 0 ) ).x;
		float top = texture2D( mPressure, vUv + vec2( 0, cellSize.y * step ) ).x;
		float bottom = texture2D( mPressure, vUv - vec2( 0, cellSize.y * step ) ).x;

		vec2 velocity = texture2D( mVelocity, vUv ).xy;
		vec2 gradient = vec2( right - left, top - bottom ) * .5;

		velocity = velocity - deltaTime * gradient;

		gl_FragColor = vec4( velocity, .0, 1. );

	}

`;

export default class PressurePass extends ShaderPass {

	constructor() {

		const uniforms = {

			mPressure: { value: null },
			mVelocity: { value: null },
			resolution: { value: new Vector2() },
			deltaTime: { value: 0 }

		};

		super( {

			uniforms,
			vertexShader,
			fragmentShader

		} );

		Application.events.add( this );

	}

	setSize( width, height ) {

		super.setSize( width, height );

		this.uniforms[ 'resolution' ].value.set( width, height );

	}

	render( simulation ) {

		const { renderer } = Application;
		const { renderTargets, textures, deltaTime } = simulation;

		this.uniforms[ 'deltaTime' ].value = deltaTime;
		this.uniforms[ 'mPressure' ].value = textures[ 'PressureB' ];
		this.uniforms[ 'mVelocity' ].value = textures[ 'ViscosityB' ];

		const writeBuffer = renderTargets[ 'VelocityA' ];
		super.render( renderer, writeBuffer );

	}

}

