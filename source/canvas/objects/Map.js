import {

	Box3,
	Mesh,
	MeshStandardMaterial,
	Object3D,
	Raycaster,
	Sphere,
	Vector2,
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
		this.coordinates = new Vector2();

		this.cityIDs = Application.content.cities;
		Application.events.add( this );

	}

	onViewChange() {

		this.onModeChange();

	}

	onModeChange() {

		this.city = null;
		Application.store.set( 'pointer', false );
		Application.store.set( 'city', null );

	}

	onInputStart() {

		this.elapsedTime = Application.time.elapsedTime;
		Application.pointer.getCoordinates( this.coordinates );

	}

	onInputEnd( event ) {

		const currentTarget = event.composedPath()[ 0 ];
		if ( ! currentTarget.matches( 'canvas' ) ) return;

		const coordinates = Vector2.get();
		Application.pointer.getCoordinates( coordinates );

		const deltaTime = Application.time.elapsedTime - this.elapsedTime;
		const distance = this.coordinates.distanceTo( coordinates );

		if ( deltaTime > 250 || distance > 25 || ! this.cityID ) return;

		Application.store.set( 'city', this.cityID );

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

		const match = this.cities.find( city => {

			const { boundingSphere } = city;
			return this.raycaster.ray.intersectsSphere( boundingSphere );

		} );

		this.cityID = match ? match.name : null;
		Application.store.set( 'pointer', !! ( this.cityID && this.cityIDs[ this.cityID ] ) );

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

			if ( child === this ) return;
			// const isDisabled = child.name.match( /Mountain|Land|Islands|Ottoman/g );
			// child.visible = ! isDisabled;
			child.visible = true;

		} );

		this.children.forEach( child => {

			child.visible = places !== 'cosmos' || child.name === '003_Map';

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
			Object.assign( child, { material, castShadow: true, receiveShadow: true } );

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
