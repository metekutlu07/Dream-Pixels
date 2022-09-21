import { Vector2 } from 'three';

export default class Spring {

	constructor() {

		this.stiffness = .01;
		this.restLength = 0;
		this.friction = .95;

		this.target = new Vector2();
		this.position = new Vector2();
		this.velocity = new Vector2();

	}

	set( x = 0, y = 0 ) {

		this.target.set( x, y );

	}

	update() {

		const delta = Vector2.get()
			.copy( this.target )
			.sub( this.position );

		delta.setLength( delta.length() - this.restLength );

		const force = delta.multiplyScalar( this.stiffness );
		this.velocity.add( force );

		this.velocity.multiplyScalar( this.friction );
		this.position.add( this.velocity );

		Vector2.release( delta );

	}

}
