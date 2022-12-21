import { Mesh, PlaneGeometry } from 'three';

import ReflectionStandardMaterial from '~/canvas/materials/ReflectionStandardMaterial';

import Reflection from './Reflection';

export default class Ground extends Mesh {

	constructor() {

		const geometry = new PlaneGeometry( 250, 250 );
		const material = new ReflectionStandardMaterial();

		super( geometry, material );

		this.reflection = new Reflection();
		this.rotation.x = -Math.PI * .5;
		this.position.y = 0;
		this.receiveShadow = true;

		Application.events.add( this );

	}

	onUpdate() {

		const { texture, mapMatrix } = Application.scene.reflection;
		this.material.uniforms[ 'reflectionMap' ].value = texture;
		this.material.uniforms[ 'reflectionMapMatrix' ].value.copy( mapMatrix );

	}

}
