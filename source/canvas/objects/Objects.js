import { MeshStandardMaterial, Object3D } from 'three';

export default class Objects extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

	}

	onLoad( files ) {

		if ( ! files[ 'works' ] ) return;
		this.visible = false;

		const { models, textures } = Application.assets[ 'works' ];
		const { objects } = models[ 'Objects/Objects.glb' ];
		const envMap = Application.assets[ 'EnvMap' ];

		Application.content.objects
			.filter( child => child.objectID )
			.forEach( child => {

				const { objectID } = child;

				const map = textures[ `Objects/${ objectID }.png` ];
				map.flipY = false;

				const rotationFactor = Math.random() > .5 ? -1 : 1;
				const clone = objects[ objectID ].clone();
				const material = new MeshStandardMaterial( {

					map,
					transparent: true,
					metalness: .1,
					roughness: .8,
					envMap

				} );

				Object.assign( clone, {

					opacity: 1,
					rotationFactor,
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
		const isVisible = path === '/works' && list === 'grid';

		if ( this.isVisible === isVisible || ! this.children.length ) return;
		this.isVisible = isVisible;

		this.children.forEach( ( child, index ) => {

			if ( child.animation ) child.animation.remove( child );

			const targets = child;
			const opacity = this.isVisible ? 1 : 0;
			const duration = this.isVisible ? 1500 : 500;
			const delay = this.isVisible ? index * 100 : 500;
			const easing = 'easeOutQuint';

			child.animation = anime( { targets, delay, easing, duration, opacity } );

		} );

	}

	onUpdate() {

		const { camera, viewport } = Application;
		const far = camera.far;
		camera.far = 25;
		camera.updateProjectionMatrix();

		this.children.forEach( ( child, index ) => {

			const { html, opacity } = child;

			if ( ! html ) return;

			child.position
				.copy( html.offset )
				.setZ( 1 )
				.unproject( camera );

			child.lookAt( camera.position );

			const time = Application.time.elapsedTime * 1e-3;
			child.rotation.order = 'YXZ';
			child.rotation.x += Math.sin( time + index ) * .1;
			child.rotation.z += Math.cos( time * 1.333 - index ) * .1;

			const direction = html.columnID % 2 * 2 - 1;
			const rotationY = html.offset.y * -.75 * direction;
			child.rotation.y += rotationY;

			child.material.opacity = opacity;
			child.visible = opacity > .05;

			const { aspect } = viewport;
			const scale = aspect < 1 ? 1.25 : 1;
			child.scale.setScalar( scale );

		} );

		camera.far = far;
		camera.updateProjectionMatrix();

	}

}
