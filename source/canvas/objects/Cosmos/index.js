import { Object3D } from 'three';

import Sphere from './Sphere';

export default class Cosmos extends Object3D {

	constructor() {

		super();

		this.spreadFactor = 0;

		Application.events.add( this );

	}

	async onViewChange() {

		this.onModeChange();

	}

	async onModeChange() {

		const { path, list, places } = Application.store;
		this.visible = path === '/works' && list === 'places' && places === 'cosmos';
		if ( ! this.visible ) return;

		this.spheres.forEach( sphere => sphere.enter() );

		if ( this.animation ) this.animation.remove( this.position );

		this.position.x = 0;

		this.animation = anime( {

			targets: this.position,
			easing: 'easeInOutExpo',
			duration: 2500,
			delay: 1000,
			x: 190

		} );

	}

	onLoad( files ) {

		if ( ! files[ 'works' ] ) return;

		this.spheres = {};

		const { models } = Application.assets[ 'works' ];
		const { objects } = models[ 'Cosmos/Model.glb' ];
		this.copy( objects[ 'Scene' ] );

		const parameters = {};

		this.traverse( child => {

			const { name } = child;

			if ( name.match( /(Scene)/g ) ) return;

			const envMap = Application.assets[ 'EnvMap' ];

			if ( name.match( /(AxisMundi)/g ) ) {

				return Object.assign( child.material, {

					envMap,
					roughness: .65,
					metalness: .15

				} );

			}

			const sphereID = name.replace( /(Left|Right)/g, '' );
			const matches = name.match( /(Left|Right)/g );
			const side = matches ? matches[ 0 ].toLowerCase() + 'Half' : 'mesh';

			if ( ! parameters[ sphereID ] ) parameters[ sphereID ] = {};
			parameters[ sphereID ][ side ] = child;

		}

		);

		this.spheres = Object
			.entries( parameters )
			.map( entry => {

				const [ sphereID, parameters ] = entry;
				const sphere = new Sphere( sphereID, parameters );
				this.add( sphere );

				return sphere;

			} ).sort( ( a, b ) => a.radius - b.radius );

		this.spheres.forEach( ( sphere, index ) => sphere.index = index );
		this.scale.setScalar( .5 );

	}

}
