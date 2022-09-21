import { AudioListener, Audio as Node } from 'three';

export default class AudioInterface {

	constructor() {

		this.isMuted = true;
		this.volume = 1;
		this.cache = {};

		Application.events.add( this );

	}

	async getDecodedBuffer( buffer ) {

		return await ! this.audioListener ? buffer :
			this.audioListener.context.decodeAudioData( buffer );

	}

	async onUserFirstInput() {

		const { buffers } = Application.assets[ 'audio' ];

		this.audioListener = new AudioListener();
		this.audioListener.setMasterVolume( 0 );
		Application.camera.add( this.audioListener );

		const entries = Object.entries( buffers );
		await Promise.all( entries.map( async entry => {

			const [ key, value ] = entry;
			buffers[ key ] = await this.getDecodedBuffer( value );

		} ) );

		this.isLoaded = true;
		this.isMuted = true;

		this.loop = this.play( '/public/audio.m4a' );
		this.loop.play();

	}

	async onViewChange() {

		if ( ! this.loop ) return;

		const { path, route } = Application.store;
		const directory = route === '/:project' ? path : '';
		const source = `/public${ directory }/audio.m4a`;

		if ( this.loop.src.match( source ) ) return;

		await this.fade( this.loop, 0 );

		this.loop.src = source;
		this.loop.play();

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

	play( audioID, {

		volume = 1,
		playbackRate = 1,
		loop = false

	} = {} ) {

		if ( ! this.isLoaded ) return;

		const { buffers } = Application.assets[ 'audio' ];
		const audio = new Node( this.audioListener );
		const buffer = buffers[ audioID ];

		if ( buffer ) audio.setBuffer( buffers[ audioID ] );
		else audio.setMediaElementSource( new Audio( audioID ) );

		if ( audio.hasPlaybackControl ) {

			audio
				.setVolume( volume )
				.setPlaybackRate( playbackRate )
				.setLoop( loop )
				.play();

			return audio;

		} else return audio.source.mediaElement;

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
