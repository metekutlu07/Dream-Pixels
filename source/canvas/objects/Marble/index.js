import {

	WebGLRenderTarget,
	Vector2,
	FloatType,
	RGBAFormat

} from 'three';

import ShaderPass from '~/canvas/post-processing/ShaderPass';

import AdvectionPass from './AdvectionPass';
import ViscosityPass from './ViscosityPass';
import DivergencePass from './DivergencePass';
import PoissonPass from './PoissonPass';
import PressurePass from './PressurePass';

const vertexShader = glsl`

	varying vec2 vUv;

	void main() {

		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );

	}

`;

const fragmentShader = glsl`

	uniform sampler2D mVelocity;

	varying vec2 vUv;

	void main(){

		vec2 velocity = texture2D( mVelocity, vUv ).xy;
		float speed = length( velocity );
		velocity = velocity * .5 + .5;

		vec3 color = vec3( velocity.x, velocity.y, 1. );
		color = mix( vec3( .0 ), color, speed );

		gl_FragColor = vec4( color,  1. );

	}

`;

export default class Marble extends ShaderPass {

	constructor() {

		super( {

			uniforms: { mVelocity: { value: null } },
			vertexShader,
			fragmentShader

		} );

		Application.events.add( this );

		this.parameters = {

			viscosity: 30,
			BFECC: false,
			iterations: 25,
			externalForce: { radius: 50, strength: 20 },

		};

		this.textures = {};
		this.passes = [

			new AdvectionPass(),
			new ViscosityPass(),
			new DivergencePass(),
			new PoissonPass(),
			new PressurePass()

		];

		this.renderTargets = {

			VelocityA: null,
			VelocityB: null,
			ViscosityA: null,
			ViscosityB: null,
			Divergence: null,
			PressureA: null,
			PressureB: null

		};

		Object.keys( this.renderTargets ).forEach( name => {

			const renderTarget = new WebGLRenderTarget( 512, 512, {

				type: FloatType,
				format: RGBAFormat,
				depthWrite: false,
				depthBuffer: false,
				stencilBuffer: false

			} );

			this.renderTargets[ name ] = renderTarget;
			this.textures[ name ] = renderTarget.texture;

		} );

		this.renderToScreen = true;

	}

	onResize() {

		const { size } = Application.viewport;

		const resolution = new Vector2()
			.copy( size )
			.multiplyScalar( .5 )
			.round();

		const { width, height } = resolution;

		this.passes.forEach( pass => pass.setSize( width, height ) );

		Object
			.values( this.renderTargets )
			.forEach( renderTarget => renderTarget.setSize( width, height ) );

	}

	onRender() {

		if ( Application.router.path !== '/' ) return;

		const { deltaTime } = Application.time;
		this.deltaTime = Math.min( deltaTime * 1e-3, .01 );

		this.passes.forEach( pass => pass.render( this ) );
		this.uniforms[ 'mVelocity' ].value = this.textures[ 'VelocityA' ];
		this.render( Application.renderer );

	}

}
