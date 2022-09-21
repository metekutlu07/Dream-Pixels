export default class Time {

	constructor() {

		Application.events.add( this );

		this.currentFrame = 0;

		this.startTime = 0;
		this.previousTime = 0;
		this.currentTime = 0;

		this.deltaTime = 0;
		this.elapsedTime = 0;

		this.requestAnimationFrame();

	}

	onStart() {

		this.startTime = performance.now();
		this.previousTime = this.startTime;
		this.isStarted = true;

	}

	requestAnimationFrame() {

		requestAnimationFrame( this.requestAnimationFrame );

		if ( ! this.isStarted ) return;

		this.currentFrame++;

		this.currentTime = performance.now();
		this.deltaTime = this.currentTime - this.previousTime;
		this.previousTime = this.currentTime;
		this.elapsedTime += this.deltaTime;

		Application.events.dispatch( [

			'onPreFrame',
			'onPhysics',
			'onPreUpdate',
			'onUpdate',
			'onPostUpdate',
			'onPreRender',
			'onRender',
			'onPostRender',
			'onPostFrame'

		] );

	}

	async wait( delay = 1e3 ) {

		await new Promise( resolve => setTimeout( resolve, delay ) );

	}

}
