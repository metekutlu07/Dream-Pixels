import MSDFText from '~/canvas/utilities/MSDFText';

export default class Text extends MSDFText {

	constructor( content ) {

		const { jsons, textures } = Application.assets[ 'common' ];

		const SDFData = jsons[ 'Font/Data.json' ];
		const SDFMap = textures[ 'Font/Texture.png' ];

		super( SDFData, SDFMap );

		this.setParameters( content, { fontSize: .2 } );
		this.position.set( 0, 0, 1e-3 );

		Application.events.add( this );

	}

	onUpdate() {

		const color = this.parent.isHovered ? '#55575e' : '#ffffff';
		this.material.color.set( color );

	}

}
