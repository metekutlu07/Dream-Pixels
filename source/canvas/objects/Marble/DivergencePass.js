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
	uniform float deltaTime;
	uniform vec2 resolution;

	varying vec2 vUv;

	void main(){

		vec2 cellSize = 1. / resolution;

		float top = texture2D( mVelocity, vUv + vec2( 0, cellSize.y ) ).y;
		float right = texture2D( mVelocity, vUv + vec2( cellSize.x, 0 ) ).x;
		float bottom = texture2D( mVelocity, vUv - vec2( 0, cellSize.y ) ).y;
		float left = texture2D( mVelocity, vUv - vec2( cellSize.x, 0 ) ).x;

		float divergence = ( right - left + top - bottom ) / 2.;

		gl_FragColor = vec4( divergence / deltaTime );

	}

`;

export default class DivergencePass extends ShaderPass {

	constructor() {

		const uniforms = {

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

	onPreRender() {

		const { deltaTime } = Application.time;
		this.uniforms[ 'deltaTime' ].value = Math.min( deltaTime * 1e-3, .01 );

	}

	render( simulation ) {

		const { renderer } = Application;
		const { renderTargets, textures, parameters } = simulation;
		const { viscosity } = parameters;

		const readBufferID = viscosity === 0 ? 'VelocityB' : 'ViscosityB';
		this.uniforms[ 'mVelocity' ].value = textures[ 'ViscosityB' ];

		const writeBuffer = renderTargets[ 'Divergence' ];
		super.render( renderer, writeBuffer );

	}

}

