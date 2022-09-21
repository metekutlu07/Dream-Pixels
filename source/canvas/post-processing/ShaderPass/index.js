import {

	ShaderMaterial,
	UniformsUtils,
	PlaneGeometry,
	OrthographicCamera,
	Scene,
	Mesh

} from 'three';

import Pass from '../Pass';

export default class ShaderPass extends Pass {

	constructor( shader, textureID ) {

		super();

		this.textureID = ( textureID !== undefined ) ? textureID : 'tDiffuse';

		if ( shader instanceof ShaderMaterial ) {

			this.uniforms = shader.uniforms;
			this.defines = shader.defines;
			this.material = shader;

		} else if ( shader ) {

			this.uniforms = UniformsUtils.clone( shader.uniforms );

			this.material = new ShaderMaterial( {

				uniforms: this.uniforms,
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader

			} );

			this.defines = shader.defines;
			this.material.defines = this.defines;

		}

		this.camera = new OrthographicCamera( -1, 1, 1, -1, 0, 1 );
		this.scene = new Scene();

		this.quad = new Mesh( new PlaneGeometry( 2, 2 ), null );
		this.quad.frustumCulled = false; // Avoid getting clipped
		this.quad.material = this.material;
		this.scene.add( this.quad );

	}

	render( renderer, writeBuffer, readBuffer ) {

		if ( this.uniforms[ this.textureID ] )
			this.uniforms[ this.textureID ].value = readBuffer.texture;

		this.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			renderer.render( this.scene, this.camera );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
			renderer.render( this.scene, this.camera );

		}

	}

}
