import {

	Box3,
	Mesh,
	MeshStandardMaterial,
	Object3D,
	Raycaster,
	Sphere,
	Vector3,
	// MeshBasicMaterial,
	// SphereGeometry,

} from 'three';

import { mergeBufferGeometries } from '~/vendors/three/BufferGeometryUtils';

import ReflectionStandardMaterial from '~/canvas/materials/ReflectionStandardMaterial';

export default class Map extends Object3D {

	constructor() {

		super();

		this.raycaster = new Raycaster();

		Application.events.add( this );

	}

	onPreFrame() {

		this.children.forEach( child => {

			const isMap = child.name.match( 'Map' );
			const isTitles = child.name.match( 'Titles' );
			const hasMaterialB = child.material === this.materialB;
			child.visible = ! isMap && ! isTitles && ! hasMaterialB;

		} );

	}

	onPreUpdate() {

		if ( ! this.cities || ! this.visible ) return;

		const { camera, pointer } = Application;
		const position = pointer.getCoordinates( Vector3.get(), true );
		this.raycaster.setFromCamera( position, camera );
		Vector3.release( position );

		const city = this.cities.find( city => {

			const { name, boundingSphere } = city;
			const isIntersected = this.raycaster.ray.intersectsSphere( boundingSphere );
			if ( isIntersected ) return name;

		} );

		Application.store.set( 'pointer', !! city );

	}

	onUpdate() {

		const { places } = Application.store;
		const { cosmos } = Application.scene;

		if ( places !== 'cosmos' ) this.position.x = 0;
		else this.position.x = cosmos.position.x;

		if ( this.materialB ) {

			const { texture, mapMatrix } = Application.scene.reflection;
			const { uniforms } = this.materialB;
			uniforms[ 'reflectionMap' ].value = texture;
			uniforms[ 'reflectionMapMatrix' ].value.copy( mapMatrix );

		}

		this.traverse( child => {

			const isDisabled = child.name.match( /Mountain|Land|Islands|Ottoman/g );
			child.visible = ! isDisabled;

		} );

	}

	onLoad( files ) {

		if ( ! files[ 'works' ] ) return;

		const { models, textures } = Application.assets[ 'works' ];
		const { objects } = models[ 'Map/Model.glb' ];
		const envMap = Application.assets[ 'EnvMap' ];

		this.copy( objects[ 'Scene' ] );

		textures[ 'Map/Albedo.png' ].flipY = false;
		textures[ 'Map/Metalness.png' ].flipY = false;
		textures[ 'Map/Roughness.png' ].flipY = false;

		this.materialA = new MeshStandardMaterial( {

			envMap,
			map: textures[ 'Map/Albedo.png' ],
			metalnessMap: textures[ 'Map/Metalness.png' ],
			roughnessMap: textures[ 'Map/Roughness.png' ]

		} );

		this.materialB = new ReflectionStandardMaterial( {

			envMap,
			map: textures[ 'Map/Albedo.png' ],
			metalnessMap: textures[ 'Map/Metalness.png' ],
			roughnessMap: textures[ 'Map/Roughness.png' ]

		} );

		this.traverse( child => {

			if ( ! child.material ) return;

			const material = child.name.match( /Sea/g ) ? this.materialB : this.materialA;
			Object.assign( child, { material, castShadow: false, receiveShadow: false } );

		} );

		const { children } = this.getObjectByName( '001_Cities' );
		this.cities = children.map( child => {

			const { name } = child;
			const boundingBox = new Box3();
			const boundingSphere = new Sphere();
			boundingBox.setFromObject( child );
			boundingBox.getBoundingSphere( boundingSphere );

			boundingSphere.radius *= .5;
			boundingSphere.center.y -= 2;

			// const { radius, center } = boundingSphere;
			// const mesh = new Mesh( new SphereGeometry( radius ), new MeshBasicMaterial( { wireframe: true } ) );
			// mesh.position.copy( center );
			// this.add( mesh );

			return { name, boundingBox, boundingSphere };

		} );

		this.merge( '001_Cities' );
		this.merge( '002_Details' );
		this.merge( '004_Titles' );

	}

	merge( groupID = '001_Cities' ) {

		const object = this.getObjectByName( groupID );
		const geometries = object.children.map( child => {

			const { geometry } = child;
			child.updateMatrixWorld();
			geometry.applyMatrix4( child.matrixWorld );
			return geometry;

		} );

		const geometry = mergeBufferGeometries( geometries );
		const mesh = new Mesh( geometry, this.materialA );
		mesh.name = groupID;

		this.add( mesh );
		this.remove( object );

	}

}
