import { Vector3 } from 'three';

export default class KMeanClustering {

	constructor( { maxStep = 100 } = {} ) {

		this.maxStep = maxStep;

	}

	set( points, count ) {

		this.points = points;
		this.count = count;

		this.isSolving = true;
		this.clusters = Array.from( { length: count }, () => new Cluster() );
		this.map = [];

		for ( let i = 0, l = this.clusters.length; i < l; i++ ) {

			const { centroid } = this.clusters[ i ];
			centroid.randomize( 100 );

		}

		this.solve();

	}

	solve() {

		this.stepCount = 0;

		while ( this.isSolving && this.stepCount < this.maxStep ) this.step();

	}

	getNearestCluster( point ) {

		let nearestCluster = null;
		let minDistance = Infinity;

		for ( const cluster of this.clusters ) {

			const distance = point.distanceTo( cluster.centroid );

			if ( distance < minDistance ) {

				nearestCluster = cluster;
				minDistance = distance;

			}

		}

		return nearestCluster;

	}

	step() {

		this.stepCount++;
		this.isSolving = false;

		for ( const cluster of this.clusters ) cluster.reset();

		for ( let i = 0, l = this.points.length; i < l; i++ ) {

			const point = this.points[ i ];
			const cluster = this.getNearestCluster( point );
			cluster.points.push( point );

			if ( this.map[ i ] !== cluster ) this.isSolving = true;
			this.map[ i ] = cluster;

		}

		for ( const cluster of this.clusters ) cluster.update();

	}

}

class Cluster {

	constructor() {

		this.centroid = new Vector3();
		this.radius = null;
		this.points = [];

	}

	reset() {

		this.points = [];

	}

	update() {

		this.getCentroid();
		this.getRadius();

	}

	getCentroid() {

		this.centroid.setScalar( 0 );
		for ( const point of this.points ) this.centroid.add( point );
		this.centroid.divideScalar( this.points.length || 1 );

		return this.centroid;

	}

	getRadius() {

		this.radius = -Infinity;

		for ( const point of this.points ) {

			const distance = this.centroid.distanceTo( point );
			if ( distance > this.radius ) this.radius = distance;

		}

		return this.radius;

	}

}
