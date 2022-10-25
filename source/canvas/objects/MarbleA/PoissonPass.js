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
	uniform sampler2D mDivergence;
	uniform vec2 resolution;

	varying vec2 vUv;

	void main(){

		vec2 cellSize = 1. / resolution;

		float top = texture2D( mPressure, vUv + vec2( 0, cellSize.y * 2.0  ) ).x;
		float right = texture2D( mPressure, vUv + vec2( cellSize.x * 2.0,  0 ) ).x;
		float bottom = texture2D( mPressure, vUv - vec2( 0, cellSize.y * 2.0  ) ).x;
		float left = texture2D( mPressure, vUv - vec2( cellSize.x * 2.0, 0 ) ).x;

		float divergence = texture2D( mDivergence, vUv ).x;
		gl_FragColor = vec4( ( right + left + top + bottom ) / 4. - divergence );

	}

`;

export default class PoissonPass extends ShaderPass {

	constructor() {

		const uniforms = {

			mPressure: { value: null },
			mDivergence: { value: null },
			resolution: { value: new Vector2() }

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

	render( simulation ) {

		const { renderer } = Application;
		const { renderTargets, textures, parameters } = simulation;
		const { iterations } = parameters;

		const length = Math.round( iterations / 2 ) * 2;

		for ( let i = 0; i < length; i++ ) {

			const readBufferID = i % 2 === 0 ? 'PressureB' : 'PressureA';
			const writeBufferID = i % 2 === 0 ? 'PressureA' : 'PressureB';

			this.uniforms[ 'mPressure' ].value = textures[ readBufferID ];
			this.uniforms[ 'mDivergence' ].value = textures[ 'Divergence' ];

			const writeBuffer = renderTargets[ writeBufferID ];
			super.render( renderer, writeBuffer );

		}

	}

}

