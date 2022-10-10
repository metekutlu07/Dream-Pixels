import { BufferGeometry, Mesh, PlaneGeometry } from 'three';

import ArtworkBasicMaterial from '~/canvas/materials/ArtworkBasicMaterial';

export default class Artwork extends Mesh {

	constructor() {

		const material = new ArtworkBasicMaterial( {

			fog: false,
			transparent: true,

			stencilRef: 0,
			stencilWrite: true

		} );

		super( new BufferGeometry(), material );

		Application.events.add( this );

		this.renderOrder = -2;
		this.visible = false;

	}

	onLoad( files ) {

		if ( ! files[ 'virtual-miniature' ] ) return;

		const { textures } = files[ 'virtual-miniature' ];
		const texture = textures[ 'Artwork.png' ];

		const { naturalWidth, naturalHeight } = texture.image;
		const aspect = naturalWidth / naturalHeight;

		this.geometry = new PlaneGeometry( aspect * 15, 15 );
		this.material.map = texture;
		this.material.needsUpdate = true;

	}

	onPostUpdate() {

		const { quaternion, position } = Application.camera;
		this.quaternion.copy( quaternion );
		this.position
			.copy( position )
			.normalize()
			.multiplyScalar( 40 + 1e-1 );

	}

	async onViewChange() {

		if ( Application.store.path !== '/virtual-miniature' ) return;

		this.material.visibility = 1;
		this.visible = true;

		await anime( {

			targets: this.material,
			easing: 'easeInOutQuart',
			duration: 2500,
			visibility: 0

		} ).finished;

		this.visible = false;

	}

}
