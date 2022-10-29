import { Vector2 } from 'three';

export default class CirclePacking {

	constructor( maxStep = 50 ) {

		this.maxStep = maxStep;

		this.canvas = document.createElement( 'canvas' );
		this.context = this.canvas.getContext( '2d' );
		this.canvas.style.cssText = `

			position: fixed;
			top: 0;
			left: 0;
			z-index: 99999;
			pointer-events: none;

		`;

		document.body.appendChild( this.canvas );

		this.reset();

	}

	setSize( width, height ) {

		this.width = width;
		this.height = height;

	}

	reset() {

		this.circles = [];
		return this;

	}

	add( radius, parameters = {} ) {

		const circle = new Circle( radius, parameters );
		circle.setActive( true );
		circle.position
			.setX( Math.randFloat( 0, this.width ) )
			.setY( Math.randFloat( 0, this.height ) );

		this.circles.push( circle );

		return circle;

	}

	solve( maxStep = this.maxStep ) {

		this.steps = 0;

		while ( this.isSolving() && this.steps < maxStep ) this.step();

		return this.circles;

	}

	step() {

		this.steps++;

		const { circles, width, height } = this;

		for ( const circle of circles ) circle.setActive( false );
		for ( const circle of circles ) circle.applyCollisions( circles, width, height );
		for ( const circle of circles ) circle.update();

	}

	isSolving() {

		let isSolving = false;
		for ( const circle of this.circles ) if ( circle.isActive ) isSolving = true;
		return isSolving;

	}

	draw() {

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context.clearRect( 0, 0, this.width, this.height );

		this.circles.forEach( circle => {

			const { position, radius } = circle;

			this.context.strokeStyle = circle.isActive ? '#ff0000' : '#0000ff';
			this.context.beginPath();
			this.context.arc( position.x, position.y, radius, 0, 2 * Math.PI );
			this.context.stroke();

		} );

	}

}

class Circle {

	constructor( radius = 50, {

		friction = .75,
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

		this.friction = friction;
		this.isStatic = isStatic;
		this.hasAdaptativeRadius = hasAdaptativeRadius;

		if ( position ) this.position.copy( position );
		if ( acceleration ) this.acceleration.copy( acceleration );
		if ( velocity ) this.velocity.copy( velocity );

	}

	setActive( isActive ) {

		this.isActive = isActive;

	}

	applyCollisions( circles, width, height ) {

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

		const offsetTop = this.position.y - this.radius;
		const offsetRight = this.position.x + this.radius;
		const offsetBottom = this.position.y + this.radius;
		const offsetLeft = this.position.x - this.radius;

		if ( offsetTop < 0 ) {

			localForce.set( 0, -offsetTop );
			totalForce.add( localForce );
			count++;

		}

		if ( offsetRight > width ) {

			localForce.set( -( offsetRight - width ), 0 );
			totalForce.add( localForce );
			count++;

		}

		if ( offsetBottom > height ) {

			localForce.set( 0, -( offsetBottom - height ) );
			totalForce.add( localForce );
			count++;

		}

		if ( offsetLeft < 0 ) {

			localForce.set( -offsetLeft, 0 );
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

		this.velocity.add( this.acceleration );
		this.position.add( this.velocity );
		this.velocity.multiplyScalar( this.friction );
		this.acceleration.multiplyScalar( 0 );

	}

}
