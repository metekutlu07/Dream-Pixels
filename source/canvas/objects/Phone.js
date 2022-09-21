import { Object3D, VideoTexture } from 'three';

export default class Phone extends Object3D {

	constructor() {

		super();

		Application.events.add( this );

	}

	onLoad( files ) {

		if ( ! files[ 'augustus-ar' ] ) return;

		const { models } = Application.assets[ 'augustus-ar' ];
		const { objects, materials } = models[ 'Phone.glb' ];
		const envMap = Application.assets[ 'EnvMap' ];

		Object.values( materials ).forEach( material => {

			const { name } = material;
			const color = '#26AB92';

			Object.assign( material, {

				envMap,
				roughness: .05,
				metalness: .25

			} );

			if ( name === 'CameraGlass' ) {

				material.transparent = true;
				material.opacity = .1;

			}

			if ( name === 'Lens' ) {

				material.roughness = .5;
				material.metalness = .1;
				material.color.set( '#000000' );

			}

			if ( name === 'CameraFrame' ) material.color.set( color );
			if ( name === 'LensFrame' ) material.color.set( color );
			if ( name === 'Sides' ) material.color.set( color );
			if ( name === 'Back' ) material.color.set( color );

			if ( name === 'Screen' ) {

				material.roughness = .15;
				material.metalness = 1;
				material.color.set( '#ffffff' );
				material.emissive.set( '#000000' );

			}

		} );

		this.copy( objects[ 'Scene' ] );

		this.position.set( 0, .25, 0 );
		this.rotation.set( -.25, 0, -.05 );

	}

	async onViewChange() {

		if ( ! Application.assets[ 'augustus-ar' ] ) return;

		const query = '[ src^="public/augustus-ar" ]';
		const video = document.body.querySelector( query );

		if ( ! video ) return;

		const { models } = Application.assets[ 'augustus-ar' ];
		const { materials } = models[ 'Phone.glb' ];
		const material = materials[ 'Screen' ];

		material.map = new VideoTexture( video );
		material.map.flipY = false;

	}

	onPreFrame() {

		const y = Application.viewport.width > 768 ? .25 : 1.25;
		this.position.set( 0, y, 0 );

		this.visible = Application.store.path === '/augustus-ar';

		const { elapsedTime } = Application.time;
		const x = Math.sin( elapsedTime * 1e-3 ) * .1;
		const z = Math.cos( elapsedTime * 1e-3 + 1 ) * .05;
		this.rotation.set( -.25 + x, 0, -.15 + z );

	}

}
