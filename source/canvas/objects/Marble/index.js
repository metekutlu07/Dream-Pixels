import {

	Color,
	Vector2,
	WebGLRenderTarget,
	HalfFloatType,
	RGBAFormat,
	LinearFilter,
	NearestFilter

} from 'three';

import ShaderPass from '~/canvas/post-processing/ShaderPass';
import vertexShader from './vertexShader';

import CurlPass from './CurlPass';
import VorticityPass from './VorticityPass';
import DivergencePass from './DivergencePass';
import ClearPass from './ClearPass';
import PressurePass from './PressurePass';
import GradienSubtractPass from './GradienSubtractPass';
import AdvectionPass from './AdvectionPass';
import PerturbationPass from './PerturbationPass';

const fragmentShader = glsl`

	varying vec2 vUv;
	uniform sampler2D uColor;

	void main () {

		vec3 color = texture2D( uColor, vUv ).rgb;
		float opacity = max( color.r, max( color.g, color.b ) );
		gl_FragColor = vec4( color, opacity );

	}

`;

export default class Marble extends ShaderPass {

	constructor() {

		super( {

			uniforms: { uColor: { value: null } },
			vertexShader,
			fragmentShader

		} );

		Application.events.add( this );

		this.parameters = {

			density: 0,
			velocity: 0,
			pressure: 0,
			iterations: 100,
			curl: 0,
			radius: 50,
			strength: 1000

		};

		this.passes = [

			new CurlPass(),
			new VorticityPass(),
			new DivergencePass(),
			new ClearPass(),
			new PressurePass(),
			new GradienSubtractPass(),
			new AdvectionPass()

		];

		this.renderTargets = {

			ColorA: null,
			ColorB: null,
			VelocityA: null,
			VelocityB: null,
			Divergence: null,
			Curl: null,
			PressureA: null,
			PressureB: null

		};

		this.renderToScreen = true;
		this.perturbation = new PerturbationPass();
		this.coordinates = new Vector2();
		this.textures = {};
		this.resolutions = {};

		Object
			.keys( this.renderTargets )
			.forEach( type => {

				const isLinearFiltered = type.match( /(Color|Velocity)/g );
				const parameters = {

					type: HalfFloatType,
					format: RGBAFormat,
					depthWrite: false,
					depthBuffer: false,
					stencilBuffer: false,
					minFilter: isLinearFiltered ? LinearFilter : NearestFilter,
					magFilter: isLinearFiltered ? LinearFilter : NearestFilter

				};

				const renderTarget = new WebGLRenderTarget( 512, 512, parameters );
				this.renderTargets[ type ] = renderTarget;
				this.textures[ type ] = renderTarget.texture;

			} );

		// setInterval( () => {

		// 	console.log( 'Perturbation' );

		// 	for ( let i = 0; i < 1; i++ ) {

		// 		const radius = this.parameters.radius;
		// 		const color = new Color( '#ff0000' );
		// 		const coordinates = new Vector2().random();
		// 		const force = new Vector2()
		// 			.setX( Math.random() )
		// 			.setY( Math.random() )
		// 			.multiplyScalar( 100 );

		// 		this.setPerturbation( { color, coordinates, radius, force } );

		// 	}

		// }, 2 * 1e3 );

	}

	switch( renderTargetID ) {

		const { renderTargets, textures } = this;

		const typeA = `${ renderTargetID }A`;
		const typeB = `${ renderTargetID }B`;

		const renderTargetA = renderTargets[ typeA ];
		const renderTargetB = renderTargets[ typeB ];
		renderTargets[ typeA ] = renderTargetB;
		renderTargets[ typeB ] = renderTargetA;

		textures[ typeA ] = renderTargets[ typeA ].texture;
		textures[ typeB ] = renderTargets[ typeB ].texture;

	}

	setPerturbation( parameters ) {

		this.perturbation.render( this, parameters );

	}

	onInputStart() {

		const { getCoordinates } = Application.pointer;
		getCoordinates( this.coordinates, true );

	}

	onInputMove() {

		const { getCoordinates, isPressed } = Application.pointer;

		if ( ! isPressed ) return;

		const { radius, strength } = this.parameters;

		const force = Vector2.get().copy( this.coordinates );
		getCoordinates( this.coordinates, true );
		const coordinates = Vector2.get().copy( this.coordinates );

		force
			.sub( coordinates )
			.negate()
			.multiplyScalar( strength );

		const color = new Color( '#ff0000' );

		this.setPerturbation( { color, coordinates, radius, force } );

		Vector2.release( force, coordinates );

	}

	onRender() {

		if ( Application.store.path !== '/' ) return;

		const { deltaTime } = Application.time;
		this.deltaTime = Math.min( deltaTime * 1e-3, .01 );

		this.passes.forEach( pass => pass.render( this ) );
		this.uniforms[ 'uColor' ].value = this.textures[ 'ColorA' ];
		this.render( Application.renderer );

	}

	onResize() {

		Object
			.entries( this.renderTargets )
			.forEach( entry => {

				const { width, height } = Application.viewport;
				const [ type, renderTarget ] = entry;

				const isColor = type.match( /Color/g );
				const resolution = isColor ? 1024 : 128;

				let aspect = width / height;
				if ( aspect < 1 ) aspect = 1. / aspect;

				const min = Math.round( resolution );
				const max = Math.round( resolution * aspect );

				const size = new Vector2()
					.setX( width > height ? max : min )
					.setY( width > height ? min : max );

				const { x, y } = size;
				renderTarget.setSize( x, y );

				this.resolutions[ type ] = size;

			} );

	}

}
