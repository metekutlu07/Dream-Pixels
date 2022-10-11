import MSDFText from '~/canvas/utilities/MSDFText';

export default class Title extends MSDFText {

	constructor( project, points, duration ) {

		const { jsons, textures } = Application.assets[ 'common' ];

		const SDFData = jsons[ 'Font/Data.json' ];
		const SDFMap = textures[ 'Font/Texture.png' ];

		super( SDFData, SDFMap );

		Application.events.add( this );

		const { title } = project;
		this.setParameters( title, { fontSize: .25 } );

		this.points = points;
		this.duration = duration;
		this.renderOrder = 1e5;

		this.material.opacity = 0;
		this.material.depthTest = false;
		this.material.transparent = true;
		this.material.emissive.set( '#666666' );

		this.position.copy( this.points[ 0 ] );

		this.onUpdate();

	}

	enter() {

		anime( {

			targets: this.material,
			easing: 'easeOutQuart',
			delay: this.points[ 0 ].progress * 1e3 * this.duration,
			duration: 1000,
			opacity: 1

		} ).finished;

	}

	onUpdate() {

		const { quaternion } = Application.overrideCamera || Application.camera;
		this.quaternion.slerp( quaternion, 1 );

		const { particles } = Application.store;
		const scale = particles === 'timeline' ? 1e-1 : 1;
		this.scale.setScalar( scale );

	}

}
