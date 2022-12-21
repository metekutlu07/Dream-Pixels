import { Object3D, Raycaster, Vector2, Vector3 } from 'three';

import Sphere from './Sphere';

export default class Cosmos extends Object3D {

	constructor() {

		super();

		this.raycaster = new Raycaster();
		this.coordinates = new Vector2();

		Application.events.add( this );

	}

	onPreUpdate() {

		if ( ! this.isHoverable ) return;

		const { places } = Application.store;

		if ( ! this.visible || ! this.spheres || places !== 'cosmos' ) return;

		const { camera, pointer } = Application;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		const intersects = this.raycaster.intersectObjects( this.targets, false );
		Application.store.set( 'pointer', !! intersects.length );

		this.popinID = ! intersects.length ? null :
			intersects[ 0 ].object.parent.sphereID;

	}

	onInputStart() {

		this.elapsedTime = Application.time.elapsedTime;
		Application.pointer.getCoordinates( this.coordinates );

	}

	onInputEnd( event ) {

		const currentTarget = event.composedPath()[ 0 ];
		if ( ! currentTarget.matches( 'canvas' ) ) return;

		const coordinates = Vector2.get();
		Application.pointer.getCoordinates( coordinates );
		Vector2.release( coordinates );

		const deltaTime = Application.time.elapsedTime - this.elapsedTime;
		const distance = this.coordinates.distanceTo( coordinates );

		if ( deltaTime > 250 || distance > 25 || ! this.popinID ) return;

		Application.store.set( 'popin', this.popinID );

	}

	async onViewChange() {

		this.onModeChange();

	}

	async onModeChange() {

		this.isHoverable = false;
		this.popin = null;

		Application.store.set( 'pointer', false );
		Application.store.set( 'popin', null );

		const { path, list, places } = Application.store;
		this.visible = path === '/works' && list === 'places' && places === 'cosmos';
		if ( ! this.visible ) return;

		if ( this.animation ) this.animation.remove( this.position );

		this.position.x = 0;

	}

	async onCosmosAnimation() {

		this.animation = anime( {

			targets: this.position,
			easing: 'easeInOutExpo',
			duration: 2500,
			delay: 1000,
			x: 190

		} );

		this.spheres.forEach( sphere => sphere.enter() );

		await this.animation.finished;
		await Application.time.wait( 1000 );

		this.isHoverable = true;

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
		this.targets = this.spheres
			.map( sphere => sphere.leftHalf )
			.filter( value => !! value );

		this.scale.setScalar( .5 );

	}

}
