import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

export default class Symbol extends Mesh {

	constructor( symbolID ) {

		const geometry = new PlaneGeometry( 20, 20 );
		const material = new MeshBasicMaterial( {

			opacity: 1,
			transparent: true

		} );

		super( geometry, material );

		this.position.y = 15;
		this.symbolID = symbolID;

		Application.events.add( this );

	}

	onPreFrame() {

		this.material.opacity = this.parent.material.opacity;

	}

	onLoad( files ) {

		if ( ! files[ 'works' ] ) return;

		const { textures } = Application.assets[ 'works' ];
		const map = Object
			.entries( textures )
			.filter( entry => entry[ 0 ].match( /Planets|Zodiacs/g ) )
			.filter( entry => entry[ 0 ].match( this.symbolID ) )
			.map( entry => entry[ 1 ] )
			.pop();

		if ( map ) Object.assign( this.material, { map } );
		else this.visible = false;

	}

}
