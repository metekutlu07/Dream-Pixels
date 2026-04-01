import {

	Mesh,
	MeshBasicMaterial,
	BufferGeometry,
	FrontSide,
	Shape,
	ShapeGeometry

} from 'three';

import Text from './Text';

export default class Point extends Mesh {

	constructor( object, index ) {

		const geometry = new BufferGeometry();
		const material = new MeshBasicMaterial( { shadowSide: FrontSide } );

		super( geometry, material );

		Application.events.add( this );

		this.index = index;
		this.scaleFactor = 0;
		this.dampingFactor = .25;
		this.castShadow = true;
		this.object = object;

		const { sections } = Application.content.get( 'virtual-miniature' );
		const { title, paragraphs, color } = sections[ 0 ].points[ index ];

		this.title = title;
		this.paragraphs = paragraphs;

		this.text = new Text( title );
		this.add( this.text );

		this.color = {

			pink: '#fcb0b1',
			blue: '#87d8dc',
			green: '#b6c9b8',
			yellow: '#efc68c'

		}[ color ];

		this.setGeometry();

	}

	setGeometry() {

		const shape = new Shape();

		const width = this.text.size.x + .65;
		const height = .525;
		const radius = .25;

		const x = -width * .5;
		const y = height * .25;

		shape
			.moveTo( x, y + radius )
			.lineTo( x, y + height - radius )
			.quadraticCurveTo( x, y + height, x + radius, y + height )
			.lineTo( x + width - radius, y + height )
			.quadraticCurveTo( x + width, y + height, x + width, y + height - radius )
			.lineTo( x + width, y + radius )
			.quadraticCurveTo( x + width, y, x + width - radius, y )
			.lineTo( x + radius, y )
			.quadraticCurveTo( x, y, x, y + radius );

		this.geometry = new ShapeGeometry( shape );

	}

	onUpdate() {

		const color = this.isHovered ? '#f7f3ee' : this.color;
		this.material.color.set( color );

		const { camera } = Application;
		this.scale.setScalar( this.scaleFactor );
		this.quaternion.slerp( camera.quaternion, this.dampingFactor );

		const { elapsedTime } = Application.time;
		const offsetY = Math.sin( this.index + elapsedTime * 1e-3 ) * .1;

		this.position
			.set( -1, -.25 + offsetY, 0 )
			.add( this.object.position );

	}

	onViewChange() {

		this.scaleFactor = 0;

		if ( Application.store.path !== '/virtual-miniature' ) return;

		anime( {

			targets: this,
			duration: 6000,
			easing: 'easeOutElastic( 1, .65 )',
			delay: 7500 + this.index * 300,
			scaleFactor: 1

		} );

	}

}
