import MSDFText from '~/canvas/utilities/MSDFText';

export default class Title extends MSDFText {

	constructor( project, points ) {

		const { jsons, textures } = Application.assets[ 'common' ];

		const SDFData = jsons[ 'Font/Data.json' ];
		const SDFMap = textures[ 'Font/Texture.png' ];

		super( SDFData, SDFMap );

		Application.events.add( this );

		const { title } = project;
		this.setParameters( title, { fontSize: .25 } );

		this.points = points;
		// this.position.setScalar( 0 );
		// this.points.forEach( point => this.position.add( point ) );
		// this.position.divideScalar( this.points.length );

		this.position.copy( points[ 0 ] );

		this.renderOrder = 1e5;

		this.material.depthTest = false;
		this.material.emissive.set( '#666666' );

	}

	onUpdate() {

		const { quaternion } = Application.camera;
		this.quaternion.slerp( quaternion, .25 );

	}

}
