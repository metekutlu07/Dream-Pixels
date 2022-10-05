import { MeshBasicMaterial, UniformsUtils, ShaderLib, Vector2 } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class ParticlesBasicMaterial extends MeshBasicMaterial {

	constructor( parameters = {} ) {

		super( parameters );

		Application.events.add( this );

		this.type = 'BasicMaterial';

		this.uniforms = {

			simulation: { value: null },
			hue: { value: new Vector2( 0, 1 ) }

		};

		const uniforms = UniformsUtils.clone( ShaderLib.basic.uniforms );
		Object.assign( this.uniforms, uniforms );

	}

	onBeforeCompile( shaders ) {

		Object.assign( shaders, { vertexShader, fragmentShader } );

	}

	onPreRender() {

		const [ x, y ] = Application.store.hue;
		this.uniforms.hue.value.set( x, y );

	}

}
