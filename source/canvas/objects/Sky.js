import { Mesh, PlaneGeometry } from 'three';

import SkyBasicMaterial from '~/canvas/materials/SkyBasicMaterial';

export default class Sky extends Mesh {

	constructor() {

		const geometry = new PlaneGeometry( 2, 2 );
		const material = new SkyBasicMaterial();

		super( geometry, material );

		this.frustumCulled = false;
		this.renderOrder = -1;

	}

}
