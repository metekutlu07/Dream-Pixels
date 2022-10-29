import {

	Color,
	Vector2,
	WebGLRenderTarget,
	HalfFloatType,
	RGBAFormat,
	LinearFilter,
	NearestFilter

} from 'three';

import CirclePacking from '~/canvas/utilities/CirclePacking';
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
		gl_FragColor = vec4( color, 1. );

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

		this.colors = [

			'#F2CF9A', '#FAEE96', '#FFBBC1',
			'#66FFFF', '#88C998', '#9E7E98'

		].map( hex => new Color( hex ) );

		this.parameters = {

			density: 0,
			velocity: 0,
			pressure: 0,
			iterations: 50,
			curl: 0,
			radius: 50,
			strength: 100

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

		this.colorID = 0;
		this.textures = {};
		this.resolutions = {};
		this.scales = {};

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

		this.circlePacking = new CirclePacking();


	}

	onLoad() {

		this.circles = new Array( 35 );

		for ( let i = 0; i < this.circles.length; i++ ) {

			const radius = Math.randFloat( 50, 100 );
			this.circles[ i ] = this.circlePacking.add( radius );

		}

		this.circlePacking.solve();
		this.circlePacking.draw();
		this.circles.forEach( circle => {

			const { size } = Application.viewport;
			const { radius, position } = circle;
			const coordinates = Vector2.get().copy( position );
			const color = this.colors[ this.colorID ];
			const strength = 1000;

			coordinates.x = Math.mapLinear( coordinates.x, 0, size.x, -1, 1 ),
			coordinates.y = Math.mapLinear( coordinates.y, 0, size.y, 1, -1 );

			this.setPerturbation( { color, coordinates, radius, strength } );

		} );

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

		this.colorID++;
		this.colorID %= this.colors.length;

	}

	onInputMove() {

		const { getCoordinates, isPressed } = Application.pointer;

		if ( ! isPressed ) return;

		const { radius, strength } = this.parameters;
		const force = Vector2.get().copy( this.coordinates );
		getCoordinates( this.coordinates, true );

		const coordinates = Vector2.get().copy( this.coordinates );
		const color = this.colors[ this.colorID ];

		force
			.sub( coordinates )
			.negate()
			.multiplyScalar( strength );

		this.setPerturbation( { color, coordinates, radius, strength } );

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

		const { width, height } = Application.viewport;

		Object
			.entries( this.renderTargets )
			.forEach( entry => {

				const [ type, renderTarget ] = entry;

				const isColor = type.match( /Color/g );
				const scale = isColor ? 1 : .5;
				const resolution = Vector2.get()
					.setX( width )
					.setY( height )
					.multiplyScalar( scale );

				renderTarget.setSize( resolution.x, resolution.y );

				this.resolutions[ type ] = resolution;
				this.scales[ type ] = scale;

			} );

		this.circlePacking.setSize( width, height );

	}

}
