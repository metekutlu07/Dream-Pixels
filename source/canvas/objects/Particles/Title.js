import MSDFText from '~/canvas/utilities/MSDFText';

export default class Title extends MSDFText {

	constructor( simulation, content, point ) {

		const { jsons, textures } = Application.assets[ 'common' ];

		const SDFData = jsons[ 'Font/Data.json' ];
		const SDFMap = textures[ 'Font/Texture.png' ];

		super( SDFData, SDFMap );

		Application.events.add( this );

		const { title, subtitle, date } = content;
		this.setParameters( `${ title }`, { fontSize: .25 } );

		this.simulation = simulation;
		this.content = content;
		this.point = point;
		this.renderOrder = 1e5;

		this.material.opacity = 0;
		this.material.depthTest = false;
		this.material.transparent = true;
		this.material.emissive.set( '#666666' );

		const { t } = this.point;
		this.simulation.curve.getPointAt( t, this.position );
		this.progress = t;

		const parameters = { fontSize: .15 };
		const lines = [

			new MSDFText( SDFData, SDFMap ).setParameters( subtitle, parameters ),
			new MSDFText( SDFData, SDFMap ).setParameters( date, parameters )

		];

		lines.forEach( ( line, index ) => {

			line.position.y = index * -.2 - .3;
			line.material = this.material;
			this.add( line );

		} );

	}

	async toggle() {

		const { t } = this.point;
		const delay = t * 1e3 * this.simulation.duration;

		if ( this.animation ) this.animation.remove( this.material );

		this.material.opacity = 0;

		this.animation = anime( {

			targets: this.material,
			easing: 'easeOutQuart',
			delay: delay,
			duration: 750,
			opacity: 1

		} );

	}

	onViewChange() {

		this.toggle();

	}

	onModeChange() {

		this.toggle();

	}

	onUpdate() {

		const { quaternion } = Application.overrideCamera || Application.camera;
		this.quaternion.copy( quaternion );

		const { particles } = Application.store;
		const scale = particles === 'timeline' ? .25 : 1;
		this.scale.setScalar( scale );

		this.visible = this.material.opacity > .01;

	}

}
