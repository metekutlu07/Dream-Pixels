import { Object3D, Raycaster, Vector3 } from 'three';

import City from './City';
import Artwork from './Artwork';
import Overlay from './Overlay';
import Point from './Point';

export default class Miniature extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

		this.raycaster = new Raycaster();

		this.city = new City();
		this.add( this.city );

		this.overlay = new Overlay();
		this.add( this.overlay );

		this.artwork = new Artwork();
		this.add( this.artwork );

	}

	onLoad( files ) {

		if ( ! files[ 'virtual-miniature' ] ) return;

		const { models } = files[ 'virtual-miniature' ];
		const { objects } = models[ 'City.glb' ];
		const points = objects[ 'Points' ];

		this.points = new Object3D();
		this.add( this.points );

		points.traverse( object => {

			if ( ! object.isMesh ) return;

			const pointID = object.name.split( '_' ).pop();
			const index = parseInt( pointID );
			const point = new Point( object, index );
			this.points.add( point );

		} );

	}

	onUpdate() {

		this.visible = Application.store.path === '/virtual-miniature';

	}

	onInputMove() {

		if ( ! this.points || ! this.visible ) return;

		const { camera, pointer } = Application;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		const objects = this.points.children.filter( point => !! point.paragraphs );
		const intersect = this.raycaster.intersectObjects( objects )[ 0 ];
		objects.forEach( point => point.isHovered = intersect && intersect.object === point );

		Application.store.set( 'pointer', !! intersect );

	}

}

