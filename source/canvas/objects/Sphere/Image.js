import {

	PlaneGeometry,
	MeshBasicMaterial,
	Mesh,
	Vector2

} from 'three';

export default class Image extends Mesh {

	constructor( map ) {

		// const [ name, map ] = entry;
		const { naturalWidth, naturalHeight } = map.image;
		const aspect = naturalWidth / naturalHeight;

		const parameters = { map, depthTest: false, fog: true, transparent: true };
		const material = new MeshBasicMaterial( parameters );
		const geometry = new PlaneGeometry( aspect, 1 );

		// const projectID = name.split( '/' ).shift();
		// mesh.project = Application.content.get( projectID );


		super( geometry, material );

		Application.events.add( this );

		// const source = children[ index % children.length ];
		// const clone = source.clone();
		// clone.material = source.material.clone();

		// const { aspect, project, scaleFactor } = source;
		this.radius = Math.randFloat( 50, 100 );
		this.aspect = aspect;
		this.offset = 1;
		this.offset = 0;

		this.velocity = new Vector2()
			.setX( Math.randFloat( -1, 1 ) )
			.setY( Math.randFloat( -1, 1 ) )
			.setLength( 1e-4 );

		this.scale.setScalar( 20 );
		// mesh.scaleFactor = ;

		// Object.assign( clone, { phi, theta, aspect, project, offset, scaleFactor } );

		// clone.initialState = { phi, theta };
		//
		// this.add( clone );

	}

	toggle( isVisible ) {

		if ( this.animation ) this.animation.remove( this );

		// const factor = isVisible ?
		// 	Math.floor( index / 10 ) :
		// 	Math.floor( ( this.children.length - index ) / 10 );

		const targets = this;
		const easing = 'easeOutQuint';
		const offset = isVisible ? 0 : 1;
		const duration = isVisible ? 1000 : 500;
		// const delay = isVisible ? 250 + factor * 50 : factor * 10;

		this.animation = anime( { targets, easing, duration, offset } );

		// child.theta = child.initialState.theta;
		// child.phi = child.initialState.phi;

	}

	onUpdate() {

		// const project = this.object ? this.object.project : null;
		// Application.store.set( 'crosshair', this.isVisible );
		// Application.store.set( 'object', this.object );
		// Application.store.set( 'project', project );

		// const {

		// 	position,
		// 	phi,
		// 	theta,
		// 	radius,
		// 	offset,
		// 	scaleFactor,
		// 	velocity

		// } = this;

		this.visible = this.offset < .95;
		this.material.opacity = 1 - this.offset;

		// this.phi += this.velocity.x;
		// this.theta += this.velocity.y;

		const radius = ( this.radius + this.offset * 5 );

		this.position.x = radius * Math.sin( this.phi ) * Math.sin( this.theta );
		this.position.y = radius * Math.cos( this.phi );
		this.position.z = radius * Math.sin( this.phi ) * Math.cos( this.theta );

		this.lookAt( Application.scene.position );

	}

}
