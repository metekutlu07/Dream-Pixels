import { PerspectiveCamera, Vector3 } from 'three';

export default class Camera extends PerspectiveCamera {

	constructor( simulation ) {

		super( 45, 1, .01, 250 );

		Application.events.add( this );

		this.target = new Vector3();

		this.simulation = simulation;
		this.scroll = 0;
		this.progress = 0;
		this.friction = .025;

	}

	onUpdate() {

		const { aspect } = Application.viewport;
		const { curve } = this.simulation;
		this.aspect = aspect;
		this.updateProjectionMatrix();

		this.progress = Math.lerp( this.progress, this.scroll, .01 );
		const progress = Math.euclideanModulo( this.progress, 1 );
		const position = curve.getPointAt( progress, Vector3.get() );
		this.position.lerp( position, this.friction );

		const target = curve.getPointAt( Math.euclideanModulo( progress + 1e-3, 1 ), Vector3.get() );
		this.target.lerp( target, this.friction );
		this.lookAt( this.target );

		Vector3.release( position, target );

		const { particles, list, path } = Application.store;
		const active = ( list === 'particles' && particles === 'timeline' ) || path === '/contact';
		Application.overrideCamera = active ? this : null;

		if ( path === '/contact' ) this.scroll += 1e-4;
		else this.scroll += 1e-5;

		this.isScrolling = this.position.distanceTo( position ) > .25;

	}

	onWheel( event ) {

		const { particles } = Application.store;
		if ( particles !== 'timeline' ) return;

		this.scroll += event.deltaY * 1e-5;

	}

}
