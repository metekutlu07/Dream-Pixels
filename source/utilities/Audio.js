import { AudioListener, Audio as Node } from 'three';

export default class AudioInterface {

	constructor() {

		Application.events.add( this );

		this.onUnlock = this.onUnlock.bind( this );

		this.isMuted = true;
		this.volume = 1;
		this.cache = {};

		addEventListener( 'mousedown', this.onUnlock );
		addEventListener( 'touchstart', this.onUnlock );

	}

	async getDecodedBuffer( buffer ) {

		return await ! this.audioListener ? buffer :
			this.audioListener.context.decodeAudioData( buffer );

	}

	onLoad() {

		this.isLoaded = true;

	}

	async onUnlock() {

		if ( ! this.audioListener ) this.audioListener = new AudioListener();
		await this.audioListener.context.resume();

		if ( ! this.loop ) {

			this.loop = new Audio( '/public/horlogo.mp3' );
			this.loop.loop = true;
			this.loop.playsInline = true;
			this.loop.preload = 'auto';

			const node = new Node( this.audioListener );
			node.setMediaElementSource( this.loop );

		}

		try {

			await this.loop.play();

		} catch ( error ) {

			console.log( error );

		}

		removeEventListener( 'mousedown', this.onUnlock );
		removeEventListener( 'touchstart', this.onUnlock );

	}

	async onViewChange() {

		if ( ! this.loop ) return;

		const { path, route } = Application.store;
		const isProjectRoute = route === '/:project';
		const source = isProjectRoute ?
			`/public${ path }/audio.mp3` :
			'/public/horlogo.mp3';

		if ( this.loop.src.match( source ) ) return;
		if ( this.isSwitchingSource ) return;

		this.isSwitchingSource = true;

		try {

			await this.fade( this.loop, 0 );

			this.loop.pause();
			this.loop.currentTime = 0;
			this.loop.volume = 0;
			this.loop.src = source;
			this.loop.load();
			await this.loop.play();
			await this.fade( this.loop, 1 );

		} catch ( error ) {

			console.log( error );

			if ( isProjectRoute ) {

				this.loop.pause();
				this.loop.currentTime = 0;
				this.loop.volume = 0;
				this.loop.src = '/public/horlogo.mp3';
				this.loop.load();
				await this.loop.play();
				await this.fade( this.loop, 1 );

			}

		} finally {

			this.isSwitchingSource = false;

		}

	}

	onUpdate() {

		if ( ! this.audioListener ) return;

		const volume = this.isDisabled || this.isMuted ? 0 : this.volume;
		this.audioListener.setMasterVolume( volume );

	}

	onVisibilityChange() {

		this.isDisabled = document.hidden;

	}

	async play( audioID, {

		volume = 1,
		playbackRate = 1,
		loop = false

	} = {} ) {

		if ( ! this.audioListener ) return;

		const { buffers } = Application.assets[ 'audio' ];

		if ( ! buffers[ audioID ] ) return;
		if ( ! buffers[ audioID ].duration )
			buffers[ audioID ] = await this.getDecodedBuffer( buffers[ audioID ] );

		const audio = new Node( this.audioListener )
			.setBuffer( buffers[ audioID ] )
			.setVolume( volume )
			.setPlaybackRate( playbackRate )
			.setLoop( loop )
			.play();

		return audio;

	}

	pause( audioID ) {

		if ( ! this.cache[ audioID ] ) return;
		this.cache[ audioID ].pause();

	}

	async toggle() {

		this.isMuted = ! this.isMuted;
		if ( ! this.isMuted ) await this.onUnlock();

	}

	async fade( targets, volume ) {

		await anime( { duration: 500, easing: 'easeInOutExpo', targets, volume } );

	}

}
