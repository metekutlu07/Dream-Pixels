import { Vector2 } from 'three';

export default class CirclePacking {

	constructor( { maxStep = 25 } = {} ) {

		this.maxStep = maxStep;

	}

	reset() {

		this.circles = [];
		return this;

	}

	set( radius ) {

		this.radius = radius;
		return this;

	}

	populate( count, radius = 50 ) {

		for ( let i = 0, l = count; i < l; i++ ) this.add( radius );
		return this;

	}

	add( radius, parameters = {} ) {

		const circle = new Circle( radius, parameters );
		circle.setActive( true );

		const scale = Math.randFloat( 0, this.radius - radius );
		if ( ! parameters.position ) circle.position.randomize( scale );
		if ( ! parameters.velocity ) circle.velocity.randomize();

		this.circles.push( circle );

	}

	solve( maxStep = this.maxStep ) {

		this.stepCount = 0;

		while ( this.isSolving() && this.stepCount < maxStep ) this.step();

		return this.circles;

	}

	step() {

		this.stepCount++;

		const { circles, radius } = this;
		for ( const circle of circles ) circle.setActive( false );
		for ( const circle of circles ) circle.applyCollisions( circles, radius );
		for ( const circle of circles ) circle.update();

	}

	isSolving() {

		let isSolving = false;
		for ( const circle of this.circles ) if ( circle.isActive ) isSolving = true;
		return isSolving;

	}

}

class Circle {

	constructor( radius = 50, {

		damping = .5,
		isStatic = false,
		hasAdaptativeRadius = false,

		position,
		acceleration,
		velocity

	} = {} ) {

		this.radius = radius;

		this.position = new Vector2();
		this.acceleration = new Vector2();
		this.velocity = new Vector2();

		this.damping = damping;
		this.isStatic = isStatic;
		this.hasAdaptativeRadius = hasAdaptativeRadius;

		if ( position ) this.position.copy( position );
		if ( acceleration ) this.acceleration.copy( acceleration );
		if ( velocity ) this.velocity.copy( velocity );


	}

	setActive( isActive ) {

		this.isActive = isActive;

	}

	applyCollisions( circles, radius ) {

		if ( this.isStatic ) return;

		const localForce = Vector2.get();
		const totalForce = new Vector2();

		let count = 0;

		for ( const circle of circles ) {

			if ( this === circle ) continue;

			const distance = this.position.distanceTo( circle.position );
			const depth = ( this.radius + circle.radius ) - distance;

			if ( depth > 0 ) {

				localForce
					.copy( this.position )
					.sub( circle.position )
					.normalize()
					.multiplyScalar( depth );

				totalForce.add( localForce );
				count++;

			}

		}

		const depth = ( this.position.length() + this.radius ) - radius;

		if ( depth > 0 ) {

			localForce
				.copy( this.position )
				.negate()
				.normalize()
				.multiplyScalar( depth );

			totalForce.add( localForce );
			count++;

		}

		totalForce.divideScalar( count || 1 );

		this.applyForce( totalForce );
		this.isActive = count > 0;

		if ( this.hasAdaptativeRadius && count ) this.radius *= .9;

		Vector2.release( localForce );

	}

	applyForce( force ) {

		this.acceleration.add( force );

	}

	update() {

		if ( this.isStatic ) return;

		this.velocity.add( this.acceleration );
		this.position.add( this.velocity );

		this.acceleration.multiplyScalar( 0 );
		this.velocity.multiplyScalar( this.damping );

	}

}
