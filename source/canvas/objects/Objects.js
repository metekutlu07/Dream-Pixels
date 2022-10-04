import { MeshStandardMaterial, Object3D, Vector3 } from 'three';

export default class Objects extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

	}

	onLoad( files ) {

		if ( ! files[ 'projects' ] ) return;

		const { models } = Application.assets[ 'projects' ];
		const { objects } = models[ 'Objects.glb' ];
		const envMap = Application.assets[ 'EnvMap' ];

		Application.content.grid
			.filter( child => child.objectID )
			.forEach( child => {

				const { objectID } = child;

				const clone = objects[ objectID ].clone();
				const material = new MeshStandardMaterial( {

					color: '#111111',
					transparent: true,
					metalness: .1,
					roughness: .8,
					envMap

				} );

				Object.assign( clone, {

					opacity: 0,
					material: material,
					objectID: objectID,
					castShadow: true,
					receiveShadow: true

				} );

				this.add( clone );

			} );

	}

	onViewChange() {

		this.children.forEach( child => {

			const { objectID } = child;
			const query = `[ object="${ objectID }" ]`;
			child.html = document.querySelector( query );

		} );

	}

	onPreUpdate() {

		const { path, list } = Application.store;
		const isVisible = path === '/projects' && list === 'grid';

		if ( this.isVisible === isVisible || ! this.children.length ) return;
		this.isVisible = isVisible;

		this.children.forEach( child => {

			if ( child.animation ) child.animation.remove( child );

			const targets = child;
			const opacity = this.isVisible ? 1 : 0;
			const duration = this.isVisible ? 1500 : 500;
			const delay = this.isVisible ? 500 : 0;
			const easing = 'easeOutQuint';

			child.animation = anime( { targets, delay, easing, duration, opacity } );

		} );

	}

	onUpdate() {

		this.children.forEach( ( child, index ) => {

			const { html, opacity } = child;
			const { camera } = Application;

			const vector = Vector3.get()
				.copy( html.offset )
				.setZ( .5 )
				.unproject( camera )
				.sub( camera.position )
				.normalize();

			const distance = -camera.position.z / vector.z;

			child.position
				.copy( camera.position )
				.add( vector.multiplyScalar( distance ) );

			const time = Application.time.elapsedTime * 1e-3;
			child.rotation.x = Math.sin( time + index ) * .25;
			child.rotation.z = Math.cos( time * 1.333 - index ) * .25;
			child.material.opacity = opacity;
			child.visible = opacity > .05;

			Vector3.release( vector );

		} );


	}

}
