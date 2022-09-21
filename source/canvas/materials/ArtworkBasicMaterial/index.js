import { MeshBasicMaterial, UniformsUtils, ShaderLib } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class ArtworkBasicMaterial extends MeshBasicMaterial {

	constructor( parameters = {} ) {

		super( parameters );

		this.type = 'BasicMaterial';

		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;
		this.visibility = 1;

		this.uniforms = Object.assign( {

			visibility: { value: 0 }

		}, UniformsUtils.clone( ShaderLib.basic.uniforms ) );

		Application.events.add( this );


	}

	onPreFrame() {

		this.uniforms[ 'visibility' ].value = this.visibility;

	}

}
