import MSDFText from '~/canvas/utilities/MSDFText';
import Symbol from './Symbol';

export default class Title extends MSDFText {

	constructor( titleID ) {

		const { jsons, textures } = Application.assets[ 'common' ];

		const SDFData = jsons[ 'Font/Data.json' ];
		const SDFMap = textures[ 'Font/Texture.png' ];

		super( SDFData, SDFMap );

		Application.events.add( this );

		const content = {

			EarthWireframe: 'Terra',
			Moon: 'Sphera\nLunae',
			Mercury: 'Sphera\nMercurii',
			Venus: 'Sphera\nVeneris',
			Sun: 'Sphera\nSolis',
			Mars: 'Sphera\nMartis',
			Jupiter: 'Sphera\nJovis',
			Saturn: 'Sphera\nSaturni',
			Stars: 'Sphere of the\nfixed stars',
			Zodiac: 'Sphera\nZodiaci',
			Imagination: 'World of\nImagination',
			Divine: 'Divine\nWorld'

		}[ titleID ] || titleID;

		this.setParameters( content, { fontSize: 8 } );

		this.material.opacity = 1;
		this.material.transparent = true;
		this.material.emissive.set( '#666666' );

		this.symbol = new Symbol( titleID );
		this.add( this.symbol );

	}

	onPreUpdate() {
	}

	onUpdate() {

		const { quaternion } = Application.overrideCamera || Application.camera;
		this.quaternion.copy( quaternion );

	}

}
