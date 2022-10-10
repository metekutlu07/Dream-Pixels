import { PointsMaterial, Vector2 } from 'three';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export default class ParticlesMaterial extends PointsMaterial {

	constructor( parameters ) {

		Object.assign( parameters, { sizeAttenuation: true } );

		super( parameters );

		Application.events.add( this );

		this.uniforms = Object.assign( {

			simulation: { value: null },
			range: { value: new Vector2( 0, 1 ) }

		} );

	}

	onBeforeCompile( shaders ) {

		Object.assign( shaders.uniforms, this.uniforms );
		Object.assign( shaders, { vertexShader, fragmentShader } );

	}

	onPreRender() {

		const [ x, y ] = Application.store.range;
		this.uniforms.range.value.set( x, y );

	}

}
