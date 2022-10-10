import { Mesh, PlaneGeometry } from 'three';

import PatternBasicMaterial from '~/canvas/materials/PatternBasicMaterial';

export default class Pattern extends Mesh {

	constructor() {

		const geometry = new PlaneGeometry( 20, 20 );
		const material = new PatternBasicMaterial( { transparent: true } );

		super( geometry, material );

		this.position.set( 0, 0, -2 );
		this.receiveShadow = true;

		Application.events.add( this );

	}

	onViewChange() {

		this.visible = Application.store.path === '/augustus-ar';

	}

	onUpdate() {

		this.quaternion.copy( Application.camera.quaternion );

	}

}
