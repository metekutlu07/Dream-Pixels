
import {

	MeshBasicMaterial,
	SphereGeometry,
	BoxGeometry,
	PlaneGeometry,
	CylinderGeometry,
	BufferGeometry,
	BufferAttribute,
	Mesh,
	Vector3

} from 'three';

import {

	Vec3,
	Sphere,
	Box,
	Plane,
	ConvexPolyhedron,
	Trimesh,
	Heightfield,
	Shape

} from 'cannon';


const DebugRenderer = function ( scene, world ) {

	this.scene = scene;
	this.world = world;

	this._meshes = [];

	this._material = new MeshBasicMaterial( {

		color: '#e84c3c',
		wireframe: true

	} );

	this._sphereGeometry = new SphereGeometry( 1, 8, 8 );
	this._boxGeometry = new BoxGeometry( 1, 1, 1 );
	this._planeGeometry = new PlaneGeometry( 2, 2, 1, 1 );
	this._cylinderGeometry = new CylinderGeometry( 1, 1, 10, 10 );

};

DebugRenderer.prototype = {

	tmpVec0: new Vec3(),
	tmpVec1: new Vec3(),
	tmpVec2: new Vec3(),
	tmpQuat0: new Vec3(),

	update: function () {

		const bodies = this.world.bodies;
		const meshes = this._meshes;
		const shapeWorldPosition = this.tmpVec0;
		const shapeWorldQuaternion = this.tmpQuat0;

		let meshIndex = 0;

		for ( let i = 0; i !== bodies.length; i++ ) {

			const body = bodies[ i ];

			for ( let j = 0; j !== body.shapes.length; j++ ) {

				const shape = body.shapes[ j ];

				this._updateMesh( meshIndex, body, shape );

				const mesh = meshes[ meshIndex ];
				if ( ! mesh ) continue;

				if ( mesh ) {

					// Get world position
					body.quaternion.vmult( body.shapeOffsets[ j ], shapeWorldPosition );
					body.position.vadd( shapeWorldPosition, shapeWorldPosition );

					// Get world quaternion
					body.quaternion.mult( body.shapeOrientations[ j ], shapeWorldQuaternion );

					// Copy to meshes
					mesh.position.copy( shapeWorldPosition );
					mesh.quaternion.copy( shapeWorldQuaternion );

				}

				meshIndex++;

			}

		}

		for ( let i = meshIndex; i < meshes.length; i++ ) {

			const mesh = meshes[ i ];
			if ( mesh ) {

				this.scene.remove( mesh );

			}

		}

		meshes.length = meshIndex;

	},

	_updateMesh: function ( index, body, shape ) {

		let mesh = this._meshes[ index ];
		if ( ! this._typeMatch( mesh, shape ) ) {

			if ( mesh ) {

				this.scene.remove( mesh );

			}
			mesh = this._meshes[ index ] = this._createMesh( shape );

		}
		this._scaleMesh( mesh, shape );

	},

	_typeMatch: function ( mesh, shape ) {

		if ( ! mesh ) {

			return false;

		}
		const geo = mesh.geometry;
		return (
			( geo instanceof SphereGeometry && shape instanceof Sphere ) ||
												( geo instanceof BoxGeometry && shape instanceof Box ) ||
												( geo instanceof PlaneGeometry && shape instanceof Plane ) ||
												( geo.id === shape.geometryId && shape instanceof ConvexPolyhedron ) ||
												( geo.id === shape.geometryId && shape instanceof Trimesh ) ||
												( geo.id === shape.geometryId && shape instanceof Heightfield )
		);

	},

	_createMesh: function ( shape ) {

		let mesh;

		const material = this._material;
		const v0 = this.tmpVec0;
		const v1 = this.tmpVec1;
		const v2 = this.tmpVec2;

		switch ( shape.type ) {

		case Shape.types.SPHERE:
			mesh = new Mesh( this._sphereGeometry, material );
			break;

		case Shape.types.BOX:
			mesh = new Mesh( this._boxGeometry, material );
			// mesh.visible = false;
			break;

		case Shape.types.PLANE:
			mesh = new Mesh( this._planeGeometry, material );
			// mesh.visible = false;
			break;

		case Shape.types.CONVEXPOLYHEDRON:

			const geo = new BufferGeometry();
			const positions = [];
			const indices = [];

			for ( let i = 0; i < shape.vertices.length; i++ ) {

				const v = shape.vertices[ i ];
				positions.push( v.x, v.y, v.z );

			}

			for ( let i = 0; i < shape.faces.length; i++ ) {

				const face = shape.faces[ i ];
				const a = face[ 0 ];
				const b = face[ 1 ];
				const c = face[ 2 ];
				indices.push( a, b, c );

			}

			geo.setAttribute( 'position', new BufferAttribute( new Float32Array( positions ), 3 ) );
			geo.setIndex( new BufferAttribute( new Uint16Array( indices ), 1 ) );
			geo.computeBoundingSphere();
			geo.computeFaceNormals();

			mesh = new Mesh( geo, material );

			shape.geometryId = geo.id;
			break;

		case Shape.types.TRIMESH:

			for ( let i = 0; i < shape.indices.length / 3; i++ ) {

				shape.getTriangleVertices( i, v0, v1, v2 );
				geometry.vertices.push(
					new Vector3( v0.x, v0.y, v0.z ),
					new Vector3( v1.x, v1.y, v1.z ),
					new Vector3( v2.x, v2.y, v2.z )
				);
				const j = geometry.vertices.length - 3;
				geometry.faces.push( new Face3( j, j + 1, j + 2 ) );

			}
			geometry.computeBoundingSphere();
			geometry.computeFaceNormals();
			mesh = new Mesh( geometry, material );
			shape.geometryId = geometry.id;
			break;

		case Shape.types.HEIGHTFIELD:

			for ( let xi = 0; xi < shape.data.length - 1; xi++ ) {

				for ( let yi = 0; yi < shape.data[ xi ].length - 1; yi++ ) {

					for ( let k = 0; k < 2; k++ ) {

						shape.getConvexTrianglePillar( xi, yi, k === 0 );
						v0.copy( shape.pillarConvex.vertices[ 0 ] );
						v1.copy( shape.pillarConvex.vertices[ 1 ] );
						v2.copy( shape.pillarConvex.vertices[ 2 ] );
						v0.vadd( shape.pillarOffset, v0 );
						v1.vadd( shape.pillarOffset, v1 );
						v2.vadd( shape.pillarOffset, v2 );
						geometry.vertices.push(
							new Vector3( v0.x, v0.y, v0.z ),
							new Vector3( v1.x, v1.y, v1.z ),
							new Vector3( v2.x, v2.y, v2.z )
						);
						const i = geometry.vertices.length - 3;
						geometry.faces.push( new Face3( i, i + 1, i + 2 ) );

					}

				}

			}
			geometry.computeBoundingSphere();
			geometry.computeFaceNormals();
			mesh = new Mesh( geometry, material );
			shape.geometryId = geometry.id;
			break;

		}

		if ( mesh ) {

			mesh.castShadow = true;
			mesh.receiveShadow = true;

			if ( ! shape.invisible ) this.scene.add( mesh );

		}

		return mesh;

	},

	_scaleMesh: function ( mesh, shape ) {

		switch ( shape.type ) {

		case Shape.types.SPHERE:
			const radius = shape.radius;
			mesh.scale.set( radius, radius, radius );
			break;

		case Shape.types.BOX:
			mesh.scale.copy( shape.halfExtents );
			mesh.scale.multiplyScalar( 2 + 1e-2 );
			break;

		case Shape.types.CONVEXPOLYHEDRON:
			mesh.scale.set( 1, 1, 1 );
			break;

		case Shape.types.TRIMESH:
			mesh.scale.copy( shape.scale );
			break;

		case Shape.types.HEIGHTFIELD:
			mesh.scale.set( 1, 1, 1 );
			break;

		}

	}
};

export default DebugRenderer;
