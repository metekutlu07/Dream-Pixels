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

	uniform vec2 position;
	uniform vec2 force;
	uniform float radius;
	uniform float strength;

	varying vec2 vUv;

	void main() {

		vec2 ratio = max( resolution.x, resolution.y ) / resolution;
		vec2 velocity = texture2D( mVelocity, vUv ).xy;

		#ifdef BFECC

		// First back trace
		vec2 previousPointA = vUv - velocity * deltaTime * ratio;
		vec2 velocityAtPreviousPoint = texture2D( mVelocity, previousPointA ).xy;

		// Forward trace
		vec2 forwardTrace = previousPointA + velocityAtPreviousPoint * deltaTime * ratio;
		vec2 error = forwardTrace - vUv;

		vec2 correctedPoint = vUv - error / 2.;
		vec2 correctedVelocity = texture2D( mVelocity, correctedPoint ).xy;

		// Second back trace
		vec2 previousPointB = correctedPoint - correctedVelocity * deltaTime * ratio;
		vec2 currentVelocity = texture2D( mVelocity, previousPointB ).xy;

		gl_FragColor = vec4( currentVelocity, 0. , 1. );

		#else

		vec2 coordinates = vUv - velocity * deltaTime * ratio;
		vec2 currentVelocity = texture2D( mVelocity, coordinates ).xy;

		gl_FragColor = vec4( currentVelocity, .0, 1. );

		#endif

		vec2 delta = position - ( vUv * 2. - 1. );
		delta *= resolution / radius;

		float cursor = 1. - min( length( delta ), 1. );
		gl_FragColor.xy += cursor * force * strength;

	}

`;

export default class AdvectionPass extends ShaderPass {

	constructor( simulation ) {

		const uniforms = {

			mVelocity: { value: null },
			resolution: { value: new Vector2() },
			position: { value: new Vector2() },
			force: { value: new Vector2() },
			radius: { value: 50 },
			strength: { value: 20 },
			deltaTime: { value: 0 }

		};

		const defines = { BFECC: false };

		super( {

			defines,
			uniforms,
			vertexShader,
			fragmentShader

		} );

		this.simulation = simulation;
		this.position = new Vector2();
		this.force = new Vector2();

		Application.events.add( this );

	}

	setSize( width, height ) {

		super.setSize( width, height );

		this.uniforms[ 'resolution' ].value.set( width, height );

	}

	onInputMove() {

		Application.pointer.getCoordinates( this.position, true );

	}

	onPreRender() {

		const { deltaTime } = Application.time;
		this.uniforms[ 'deltaTime' ].value = Math.min( deltaTime * 1e-3, .01 );

		this.force
			.sub( this.position )
			.negate()
			.divideScalar( 2 );

		this.uniforms[ 'position' ].value.copy( this.position );
		this.uniforms[ 'force' ].value.copy( this.force );

		this.force.copy( this.position );

	}

	render( simulation ) {

		const { renderer } = Application;
		const { renderTargets, textures, parameters } = simulation;
		const { radius, strength } = parameters.externalForce;

		this.uniforms[ 'radius' ].value = radius;
		this.uniforms[ 'strength' ].value = strength;
		this.uniforms[ 'mVelocity' ].value = textures[ 'VelocityA' ];

		const writeBuffer = renderTargets[ 'VelocityB' ];
		super.render( renderer, writeBuffer );

	}

}

