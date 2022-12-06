import { Object3D, AxesHelper } from 'three';
import Sphere from './Sphere';

export default class Cosmos extends Object3D {

	constructor() {

		super();

		const axesHelper = new AxesHelper( 100 );
		axesHelper.setColors( '#ffffff', '#ffffff', '#ffffff' );
		this.add( axesHelper );

		Application.events.add( this );

	}

	onLoad( files ) {

		if ( ! files[ 'works' ] ) return;

		const { textures } = Application.assets[ 'works' ];

		// Moon;
		// Mercury;
		// Venus;
		// Sun;
		// Mars;
		// Jupiter;
		// Saturn;
		// Stars;
		// Imagination;
		// Divine;

		for ( let i = 0; i < 12; i++ ) {

			const map = textures[ `Spheres/${ i }.jpg` ];
			this.sphere = new Sphere( i, map );
			this.sphere.position.z = -i * 15;
			this.add( this.sphere );

		}

	}

}
