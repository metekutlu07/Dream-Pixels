import {

	ShaderMaterial,
	OrthographicCamera,
	Scene,
	Mesh,
	PlaneGeometry,
	WebGLRenderTarget,
	RGBAFormat,
	NoBlending,
	NearestFilter

} from 'three';

const vertexShader = `

	varying vec2 vUv;

	void main() {

		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );

	}

`;

export default class Map {

	constructor( fragmentShader, uniforms = {} ) {

		this.uniforms = uniforms;

		this.material = new ShaderMaterial( {

			uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			blending: NoBlending,
			depthTest: false,
			depthWrite: false,
			transparent: false

		} );

		this.camera = new OrthographicCamera( -1, 1, 1, -1, 0, 1 );
		this.scene = new Scene();

		this.quad = new Mesh( new PlaneGeometry( 2, 2 ), this.material );
		this.quad.frustumCulled = false;
		this.scene.add( this.quad );

		this.renderTarget = new WebGLRenderTarget( 1024, 1024, {

			format: RGBAFormat,
			depthWrite: false,
			depthBuffer: false,
			stencilBuffer: false,
			magFilter: NearestFilter,
			minFilter: NearestFilter

		} );

	}

	setSize( width, height ) {

		if ( this.renderTargets ) {

			for ( let i = 0, l = this.renderTargets.length; i < l; i++ )
				this.renderTargets[ i ].setSize( width, height );

		} else this.renderTarget.setSize( width, height );

	}

	getTexture( index = 0 ) {

		const renderTarget = ( this.renderTargets && this.renderTargets[ index ] ) || this.renderTarget;
		return renderTarget.texture;

	}

	addRenderTarget() {

		! this.renderTargets && ( this.renderTargets = [ this.renderTarget ] );
		this.renderTargets.push( this.renderTarget.clone() );

	}

	render( renderer, renderTarget ) {

		if ( this.renderTargets ) {

			this.renderTargets.unshift( this.renderTargets.pop() );
			renderTarget = this.renderTargets[ 0 ];

		}

		const writeBuffer = renderTarget || this.renderTarget;

		this.quad.material = this.material;

		renderer.setRenderTarget( writeBuffer );
		renderer.render( this.scene, this.camera );
		renderer.setRenderTarget( null );

		return writeBuffer.texture;

	}

}
