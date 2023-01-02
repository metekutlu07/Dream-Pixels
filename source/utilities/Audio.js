import { AudioListener, Audio as Node } from 'three';

export default class AudioInterface {

	constructor() {

		Application.events.add( this );

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

		if ( ! Application.assets ) return;

		this.audioListener = new AudioListener();
		this.loop = new Audio( '/public/audio.mp3' );
		this.loop.play();

		const node = new Node( this.audioListener );
		node.setMediaElementSource( this.loop );

		this.isMuted = false;

		removeEventListener( 'mousedown', this.onUnlock );
		removeEventListener( 'touchstart', this.onUnlock );

	}

	async onViewChange() {

		if ( ! this.loop ) return;

		const { path, route } = Application.store;
		const directory = route === '/:project' ? path : '';
		const source = `/public${ directory }/audio.mp3`;

		if ( this.loop.src.match( source ) ) return;

		await this.fade( this.loop, 0 );

		try {

			this.loop.src = source;
			this.loop.play();

		} catch ( error ) { console.log( error ) }

		await this.fade( this.loop, 1 );

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

	toggle() {

		this.isMuted = ! this.isMuted;

	}

	async fade( targets, volume ) {

		await anime( { duration: 500, easing: 'easeInOutExpo', targets, volume } );

	}

}
