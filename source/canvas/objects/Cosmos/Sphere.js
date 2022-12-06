import {

	Object3D,
	Mesh,
	SphereGeometry,
	MeshStandardMaterial,
	RepeatWrapping,
	DoubleSide

} from 'three';

export default class Sphere extends Object3D {

	constructor( index, map ) {

		super();

		Application.events.add( this );

		const outerRadius = 60 + index * 8;
		// const thickness = 2.5;
		// const innerRadius = outerRadius - thickness;

		const widthSegments = index === 0 ? 16 : 32;
		const heightSegments = index === 0 ? 16 : 32;

		const geometry = new SphereGeometry( outerRadius, widthSegments, heightSegments );
		const material = new MeshStandardMaterial( { side: DoubleSide } );
		this.exterior = new Mesh( geometry, material );
		this.add( this.exterior );

		// this.interior = new Mesh( new SphereGeometry( innerRadius, widthSegments, heightSegments ) );
		// this.add( this.interior );

		// this.ring = new Mesh( new RingGeometry( innerRadius, outerRadius ) );
		// this.add( this.ring );

		if ( map ) {

			map.wrapT = map.wrapS = RepeatWrapping;
			map.repeat.set( 4, 4 );
			material.map = map;

		} else if ( index === 0 ) {

			material.wireframe = true;
			material.emissive.set( '#ffffff' );

		} else this.visible = false;

		material.onBeforeCompile = this.onBeforeCompile;

	}

	onBeforeCompile( shader ) {

		const replacement = `

			#ifdef USE_MAP

			vec4 sampledDiffuseColor = texture2D( map, vUv );
			if ( vUv.x < 2. ) discard;
			diffuseColor *= sampledDiffuseColor;

			#endif

		`;

		shader.fragmentShader = shader.fragmentShader.replace( '#include <map_fragment>', replacement );

	}

}
