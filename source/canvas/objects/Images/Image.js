import {

	PlaneGeometry,
	MeshBasicMaterial,
	Mesh,
	Vector2,
	Spherical

} from 'three';

import Border from './Border';

export default class Image extends Mesh {

	constructor( map, point, index ) {

		const parameters = {

			map,
			fog: true,
			depthTest: false,
			transparent: true,
			opacity: 0
		};

		const material = new MeshBasicMaterial( parameters );
		const geometry = new PlaneGeometry();

		super( geometry, material );

		Application.events.add( this );

		this.border = new Border();
		this.add( this.border );

		this.map = map;
		this.point = point;
		this.index = index;

		const { naturalWidth, naturalHeight } = map.image;
		this.aspect = naturalWidth / naturalHeight;

		this.spherical = new Spherical();
		this.radius = Math.randFloat( 50, 100 );
		this.offset = 0;

		this.scale
			.set( this.aspect, 1 )
			.multiplyScalar( 20 );

		this.velocity = new Vector2()
			.setX( Math.randFloat( -1, 1 ) )
			.setY( Math.randFloat( -1, 1 ) )
			.setLength( 1e-4 );

		const { x, y, z } = this.point;
		this.spherical.setFromCartesianCoords( x, y, z );

		const { jsons } = Application.assets[ 'common' ];
		const { images } = jsons[ 'Colors.json' ];
		this.parameters = images[ index ];
		this.isDisabled = this.parameters.excludeFromSphere;

	}

	async toggle( isVisible ) {

		if ( this.isDisabled ) return;

		if ( this.isVisible === isVisible ) return;
		this.isVisible = isVisible;

		// if ( this.animation ) this.animation.remove( this );

		// const targets = this;
		// const easing = 'easeOutQuint';
		// const offset = isVisible ? 0 : 1;
		// const duration = isVisible ? 1000 : 500;
		// const delay = isVisible ? 500 + this.index * 5 : this.index * 5;

		// this.animation = anime( { targets, easing, duration, offset, delay } );
		// await this.animation.finished;

		// if ( ! isVisible ) {

		// 	const { x, y, z } = this.point;
		// 	this.spherical.setFromCartesianCoords( x, y, z );

		// }

	}

	onUpdate() {

		if ( this.isDisabled ) return this.visible = false;

		this.visible = this.offset < .95;
		this.material.opacity = 1 - this.offset;

		if ( ! this.isVisible ) return;

		this.spherical.phi += this.velocity.x;
		this.spherical.theta += this.velocity.y;

		const { phi, theta } = this.spherical;
		const radius = ( this.radius + this.offset * 5 );

		this.position.x = radius * Math.sin( phi ) * Math.sin( theta );
		this.position.y = radius * Math.cos( phi );
		this.position.z = radius * Math.sin( phi ) * Math.cos( theta );

		this.lookAt( Application.scene.position );

	}

	onPostUpdate() {

		if ( this.isDisabled ) return;

		this.border.visible = this.isHovered && this.offset < .05;

		if ( ! this.parent.isVisible ) return;

		if ( Application.filters ) {

			const { values } = Application.filters;
			const { tags } = this.parameters;

			if ( values.length ) {

				this.toggle( values.find( value => tags.includes( value ) ) );

			} else this.toggle( true );

		}

		if ( this.isHovered ) Application.cursor.set( this.parameters );

	}

}
