export default class Video extends HTMLElement {

	onConnected() {

		const { video } = this.elements;
		if ( ! video ) return;
		this.onVideoReady = this.onVideoReady || this.updatePlayback.bind( this );
		video.addEventListener( 'loadeddata', this.onVideoReady );
		video.addEventListener( 'canplay', this.onVideoReady );
		video.addEventListener( 'playing', this.onVideoReady );
		this.setupObserver();
		const shouldAutoplayMuted = ! video.hasAttribute( 'controls' ) && ! video.hasAttribute( 'popin' );
		if ( ! shouldAutoplayMuted ) return;

		// Keep project videos muted so browsers allow inline autoplay
		// independently from the site's ambient audio toggle.
		video.defaultMuted = true;
		video.muted = true;
		video.playsInline = true;
		this.updatePlayback();

	}

	onDisconnected() {

		const { video } = this.elements;
		Video.observer?.unobserve( this );
		if ( ! video ) return;
		video.removeEventListener( 'loadeddata', this.onVideoReady );
		video.removeEventListener( 'canplay', this.onVideoReady );
		video.removeEventListener( 'playing', this.onVideoReady );
		video.pause();
		video.removeAttribute( 'src' );
		video.load();

	}

	onModeChange() {

		this.updatePlayback();

	}

	onViewChange() {

		this.updatePlayback();

	}

	onRouting() {

		this.updatePlayback();

	}

	setupObserver() {

		if ( ! Video.observer && typeof IntersectionObserver !== 'undefined' ) {

			Video.observer = new IntersectionObserver( entries => {

				entries.forEach( entry => entry.target.onIntersection( entry ) );

			}, {
				root: null,
				rootMargin: '200px 0px',
				threshold: 0.01
			} );

		}

		Video.observer?.observe( this );

	}

	onIntersection( entry ) {

		this.isInsideViewport = entry.isIntersecting || entry.intersectionRatio > 0;
		this.updatePlayback();

	}

	isPlayableInCurrentContext() {

		const view = this.closest( '[view]' );
		if ( view?.hasAttribute( 'hidden' ) ) return false;

		if ( this.closest( 'projects-grid' ) ) {

			return (
				Application.store.path === '/experiments' &&
				Application.store.list === 'grid'
			);

		}

		return true;

	}

	updatePlayback() {

		const { video } = this.elements;
		if ( ! video ) return;

		const shouldAutoplayMuted = ! video.hasAttribute( 'controls' ) && ! video.hasAttribute( 'popin' );
		if ( shouldAutoplayMuted ) {

			video.defaultMuted = true;
			video.muted = true;
			video.playsInline = true;

		}

		const isInside = this.isInsideViewport && this.isPlayableInCurrentContext();
		if ( video.hasAttribute( 'controls' ) ) {

			if ( ! video.paused && ! isInside ) video.pause();
			return;

		}

		if ( video.hasAttribute( 'popin' ) ) return;

		if ( video.paused && isInside ) {

			const playPromise = video.play();
			playPromise?.catch?.( () => null );

		} else if ( ! video.paused && ! isInside ) video.pause();

	}

	static render( source, parameters = {} ) {

		css`

		video-block {
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			display: block;

			[ path="/augustus-ar" ] & {
				visibility: hidden;
				position: absolute;
			}

			&[ fullscreen ] {
				position: absolute;
				padding: 0;
				border: none;

				@media ( max-width: 650px ) {
					position: relative;
				}

			}

			&[ border ] {
				height: auto;

				@media ( max-width: 650px ) {
					padding: 0;
				}
			}

		}

		video {
			width: 100%;
			top: 0;
			left: 0;
			object-fit: cover;

			&:not( [ controls ] )::-webkit-media-controls,
			&:not( [ controls ] )::-webkit-media-controls-panel,
			&:not( [ controls ] )::-webkit-media-controls-start-playback-button {
				display: none !important;
				-webkit-appearance: none;
				opacity: 0 !important;
			}

			[ fullscreen ] & {
				height: 100%;
			}

			[ border ] & {
				max-height: 100vh;
    			max-height: calc(var(--vh, 1vh) * 100);
				object-fit: contain
			}
		}

		`;

		const { controls, fullscreen, border, poster, preloadMedia, startAt, preload, audible } = parameters;
		const shouldAutoplayMuted = ! controls && ! audible;
		const isThumbnailVideo = /\/thumbnail\.mp4$/.test( source );
		const attributes = [
			'playsinline',
			'webkit-playsinline',
			'disablepictureinpicture',
			'disableremoteplayback'
		];
		if ( ! audible ) attributes.push( 'autoplay', 'muted', 'loop' );
		const type = [ fullscreen ? 'fullscreen' : '', border ? 'border' : '' ].join( ' ' );
		const offset = startAt ?? .1;
		const timeFragment = startAt === false ? '' : `#t=${ offset }`;
		const isMobile = typeof window !== 'undefined' &&
			typeof matchMedia !== 'undefined' &&
			matchMedia( '(max-width: 650px)' ).matches;
		const isSafari = typeof navigator !== 'undefined' &&
			/safari/i.test( navigator.userAgent ) &&
			! /chrome|android|crios|fxios/i.test( navigator.userAgent );
		const preloadMode = preload || (
			preloadMedia ||
			fullscreen ||
			( shouldAutoplayMuted && !( isMobile && isThumbnailVideo && ! isSafari ) ) ?
				'auto' :
				'metadata'
		);
		const resolvedSource = isMobile && source === 'public/latent-voxels/axo.mp4' ?
			'public/latent-voxels/cctv.mp4' :
			source;
		const src = resolvedSource ? `src="${ resolvedSource }${ timeFragment }"` : '';
		attributes.splice( 2, 0, `preload="${ preloadMode }"` );

		if ( controls ) attributes.push( 'controls' );
		if ( poster ) attributes.push( `poster="${ resolvedSource.replace( 'mp4', 'png' ) }"` );

		return html`

		<video-block ${ type }>
			<video ${ src } ${ attributes.join( ' ' ) } class="${ preloadMedia ? 'preloadMedia' : '' }" #></video>
		</video-block>

		`;

	}

}

customElements.define( 'video-block', Video );
