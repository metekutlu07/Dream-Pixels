import { Vector3, Box3 } from 'three';
import { World, Vec3, Material, ContactMaterial, SAPBroadphase } from 'cannon';

export default class Physics extends World {

	constructor() {

		super();

		this.parameters = {

			timeScale: { value: 1, min: .01, max: 2 },
			gravity: { value: 100, max: 100 }

		};

		this.nodes = [];
		this.timeScale = 1;
		this.allowSleep = false;

		this.broadphase = new SAPBroadphase( this );
		this.solver.iterations = 10;
		this.solver.tolerance = 1e-4;

		this.settings = { Arena: new Material(), Particles: new Material() };
		this.groups = { 'Arena': 1, 'Particles': 2 };

		const contactMaterials = [

			new ContactMaterial(

				this.settings[ 'Arena' ],
				this.settings[ 'Particles' ], {

					friction: .1,
					restitution: .5

				} )

		];

		Object.assign( this.defaultContactMaterial, {

			friction: .3,
			restitution: .2,
			contactEquationStiffness: 1e6,
			contactEquationRegularizationTime: 1

		} );

		for ( const name in this.settings )
			this.addMaterial( this.settings[ name ] );

		for ( let i = 0, l = contactMaterials.length; i < l; i++ )
			this.addContactMaterial( contactMaterials[ i ] );

	}

	initialize() {

		this.addEventListeners();

	}

	addEventListeners() {

		Application.addEventListener( 'physics', this.update );

	}

	add( body ) {

		this.nodes.push( body );

	}

	getHalfExtents( object ) {

		const boundingBox = new Box3();

		if ( object.isMesh || object.isObject3D ) boundingBox.setFromObject( object );
		else boundingBox.setFromArray( object.attributes.position.array );

		const size = boundingBox.getSize( new Vector3() );
		const center = boundingBox.getCenter( new Vector3() );
		const vector = new Vector3()
			.copy( size )
			.multiplyScalar( .5 );

		const halfExtents = new Vec3().copy( vector );

		return { size, center, halfExtents };

	}

	update() {

		for ( let i = 0, l = this.nodes.length; i < l; i++ ) {

			const body = this.nodes[ i ];
			this[ body.isDisabled ? 'removeBody' : 'addBody' ]( body );

		}

		const { timeScale, gravity } = this.parameters;
		this.timeScale = timeScale;
		this.gravity.set( 0, -gravity, 0 );

		this.step( 1 / 60 * this.timeScale );

	}

}
