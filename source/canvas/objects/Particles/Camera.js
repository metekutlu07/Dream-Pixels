import { PerspectiveCamera, Vector3 } from 'three';

export default class Camera extends PerspectiveCamera {

	constructor( simulation ) {

		super( 45, 1, .01, 250 );

		Application.events.add( this );

		this.target = new Vector3();

		this.simulation = simulation;
		this.scroll = 0;
		this.progress = 0;
		this.friction = .1;

	}

	onUpdate() {

		const { aspect } = Application.viewport;
		const { curve } = this.simulation;
		this.aspect = aspect;
		this.updateProjectionMatrix();

		const offsetY = .1;

		this.progress = Math.lerp( this.progress, this.scroll, .01 );
		const progress = Math.euclideanModulo( this.progress, 1 );
		const position = curve.getPointAt( progress, Vector3.get() );
		position.y += offsetY;
		this.position.lerp( position, this.friction );

		const target = curve.getPointAt( Math.euclideanModulo( progress + 1e-3, 1 ), Vector3.get() );
		target.y += offsetY;
		this.target.lerp( target, this.friction );
		this.lookAt( this.target );

		Vector3.release( position, target );

		const { particles, list, path } = Application.store;
		const active = ( list === 'particles' && particles === 'timeline' ) || path === '/contact';
		Application.overrideCamera = active ? this : null;

		if ( path === '/contact' ) this.scroll += 1e-4;

		this.isScrolling = this.position.distanceTo( position ) > .1;

	}

	onWheel( event ) {

		if ( ! event.composedPath()[ 0 ].matches( 'canvas' ) ) return;

		const { particles } = Application.store;
		if ( particles !== 'timeline' ) return;

		this.scroll += event.deltaY * 1e-5 * 2.5;

	}

}
