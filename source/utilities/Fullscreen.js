export default class Fullscreen {

	constructor() {

		this.isSupported = document.documentElement.requestFullscreen;
		this.isActive = document.fullscreenElement !== null;

	}

	toggle() {

		this[ this.isActive ? 'exit' : 'enter' ]();

	}

	enter() {

		if ( this.isActive ) return;
		this.isActive = true;

		document.documentElement.requestFullscreen();

	}

	exit() {

		if ( ! this.isActive ) return;
		this.isActive = false;

		document.exitFullscreen();

	}

}
