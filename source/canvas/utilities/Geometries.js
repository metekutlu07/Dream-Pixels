import {

	Vector3,
	Vector4,
	Uint16BufferAttribute,
	Float32BufferAttribute

} from 'three';

export function setAutomaticSkinWeights( geometry, bones, {

	bonesPerVertex = 1,
	maxDistance = Infinity

} = {} ) {

	const map = [];
	const vertex = Vector3.get();
	const skinWeight = Vector4.get();
	const buffer = geometry.attributes.position.array;

	let skinIndices = [];
	let skinWeights = [];

	for ( let i = 0, l = bones.length; i < l; i++ ) {

		map.push( { position: bones[ i ].position, index: i } );

	}

	for ( let i = 0; i < buffer.length / 3; i++ ) {

		vertex.set( buffer[ i * 3 + 0 ], buffer[ i * 3 + 1 ], buffer[ i * 3 + 2 ] );
		map.sort( ( dataA, dataB ) => {

			return dataA.position.distanceTo( vertex ) -
					dataB.position.distanceTo( vertex );

		} );

		const weights = [ 0, 0, 0, 0 ];
		const indices = [ 0, 0, 0, 0 ];

		for ( let i2 = 0, l2 = bonesPerVertex; i2 < l2; i2++ ) {

			const data = map[ i2 ];
			const distance = data.position.distanceTo( vertex ) || 1e-4;

			if ( distance < maxDistance ) {

				indices[ i2 ] = data.index;
				weights[ i2 ] = 1 / distance;

			}

		}

		skinWeight.fromArray( weights );

		if ( skinWeight.manhattanLength() ) skinWeight.normalize();
		else skinWeight.setScalar( 0 );

		skinIndices = skinIndices.concat( indices );
		skinWeights = skinWeights.concat( skinWeight.toArray() );

	}

	Vector3.release( vertex );
	Vector4.release( skinWeight );

	geometry.setAttribute( 'skinIndex', new Uint16BufferAttribute( skinIndices, 4 ) );
	geometry.setAttribute( 'skinWeight', new Float32BufferAttribute( skinWeights, 4 ) );

}

export function clone( source, target ) {

	function traverse( source, clone, callback ) {

		callback( source, clone );

		for ( let i = 0; i < source.children.length; i++ )
			traverse( source.children[ i ], clone.children[ i ], callback );

	}

	const maps = { lookup: new Map(), clone: new Map() };
	target.copy( source.clone() );

	traverse( source, target, ( sourceNode, clonedNode ) => {

		maps.lookup.set( clonedNode, sourceNode );
		maps.clone.set( sourceNode, clonedNode );

	} );

	target.traverse( function ( node ) {

		if ( ! node.isSkinnedMesh ) return;

		const clone = node;
		const source = maps.lookup.get( node );
		const bones = source.skeleton.bones;

		clone.skeleton = source.skeleton.clone();
		clone.bindMatrix.copy( source.bindMatrix );
		clone.skeleton.bones = bones.map( ( bone ) => maps.clone.get( bone ) );

		clone.bind( clone.skeleton, clone.bindMatrix );

	} );

	return target;

}

