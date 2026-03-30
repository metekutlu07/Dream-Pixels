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
			range: { value: new Vector2( 0, 1 ) },
			meteFilter: { value: 0 },
			meteDensity: { value: .3 },
			neutralThreshold: { value: .22 },
			paleSaturationThreshold: { value: .55 },
			paleLightnessThreshold: { value: .68 }

		} );

	}

	onBeforeCompile( shaders ) {

		Object.assign( shaders.uniforms, this.uniforms );
		Object.assign( shaders, { vertexShader, fragmentShader } );

	}

	onPreRender() {

		this.uniforms.meteFilter.value = Application.store.path === '/mete-kutlu' ? 1 : 0;

		if ( ! Application.store.range ) return;
		const [ x, y ] = Application.store.range;
		this.uniforms.range.value.set( x, y );

	}

}
