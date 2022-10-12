import MSDFText from '~/canvas/utilities/MSDFText';

export default class Title extends MSDFText {

	constructor( simulation, content, points ) {

		const { jsons, textures } = Application.assets[ 'common' ];

		const SDFData = jsons[ 'Font/Data.json' ];
		const SDFMap = textures[ 'Font/Texture.png' ];

		super( SDFData, SDFMap );

		Application.events.add( this );

		const { title } = content;
		this.setParameters( title, { fontSize: .25 } );

		this.simulation = simulation;
		this.content = content;
		this.points = points;
		this.renderOrder = 1e5;

		this.material.opacity = 0;
		this.material.depthTest = false;
		this.material.transparent = true;
		this.material.emissive.set( '#666666' );

		const { t } = this.points[ 0 ];
		this.simulation.curve.getPointAt( t, this.position );

	}

	async toggle( isVisible ) {

		const { t } = this.points[ 0 ];
		const delay = t * 1e3 * this.simulation.duration;

		if ( this.animation ) this.animation.remove( this.material );

		this.animation = anime( {

			targets: this.material,
			easing: 'easeOutQuart',
			delay: isVisible ? 500 + delay : delay * .1,
			duration: isVisible ? 750 : 250,
			opacity: isVisible ? 1 : 0

		} );

	}

	onPreUpdate() {

		const { path, list } = Application.store;
		const isVisible = path === '/projects' && list === 'particles';

		if ( this.isVisible === isVisible ) return;
		this.isVisible = isVisible;

		this.toggle( this.isVisible );

	}

	onUpdate() {

		const { quaternion } = Application.overrideCamera || Application.camera;
		this.quaternion.copy( quaternion );

		const { particles } = Application.store;
		const scale = particles === 'timeline' ? 1e-1 : 1;
		this.scale.setScalar( scale );

		this.visible = this.material.opacity > .01;

	}

}
