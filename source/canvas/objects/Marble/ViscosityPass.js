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

	uniform sampler2D mVelocity;
	uniform sampler2D mViscosity;
	uniform float viscosity;
	uniform float deltaTime;
	uniform vec2 resolution;

	varying vec2 vUv;

	void main(){

		vec2 velocity = texture2D( mVelocity, vUv ).xy;
		vec2 cellSize = 1. / resolution;

		vec2 top = texture2D( mViscosity, vUv + vec2( 0, cellSize.y * 2. ) ).xy;
		vec2 right = texture2D( mViscosity, vUv + vec2( cellSize.x * 2., 0 ) ).xy;
		vec2 bottom = texture2D( mViscosity, vUv - vec2( 0, cellSize.y * 2. ) ).xy;
		vec2 left = texture2D( mViscosity, vUv - vec2( cellSize.x * 2., 0 ) ).xy;

		vec2 iteration = 4. * velocity + viscosity * deltaTime * ( right + left + top + bottom );
		iteration /= 4. * ( 1. + viscosity * deltaTime );

		gl_FragColor = vec4( iteration, 0., 1. );

	}

`;

export default class ViscosityPass extends ShaderPass {

	constructor() {

		const uniforms = {

			mVelocity: { value: null },
			mViscosity: { value: null },
			resolution: { value: new Vector2() },
			viscosity: { value: 30 },
			deltaTime: { value: 0 }

		};

		super( {

			uniforms,
			vertexShader,
			fragmentShader

		} );

		this.iterations = 25;

		Application.events.add( this );

	}

	setSize( width, height ) {

		super.setSize( width, height );

		this.uniforms[ 'resolution' ].value.set( width, height );

	}

	onPreRender() {

		const { deltaTime } = Application.time;
		this.uniforms[ 'deltaTime' ].value = Math.min( deltaTime * 1e-3, .01 );

	}

	render( simulation ) {

		const { renderer } = Application;
		const { renderTargets, textures, parameters } = simulation;
		const { viscosity } = parameters;

		// if ( viscosity === 0 ) return;

		for ( let i = 0; i < this.iterations; i++ ) {

			const readBufferID = i % 2 === 0 ? 'ViscosityA' : 'ViscosityB';
			const writeBufferID = i % 2 === 0 ? 'ViscosityB' : 'ViscosityA';

			this.uniforms[ 'mViscosity' ].value = textures[ readBufferID ];
			this.uniforms[ 'mVelocity' ].value = textures[ 'VelocityB' ];

			const writeBuffer = renderTargets[ writeBufferID ];
			super.render( renderer, writeBuffer );

		}

	}

}

