export default class Video extends HTMLElement {

	onConnected() {

		const { video } = this.elements;
		if ( ! video ) return;
		const shouldAutoplayMuted = ! video.hasAttribute( 'controls' ) && ! video.hasAttribute( 'popin' );
		if ( ! shouldAutoplayMuted ) return;

		// Keep project videos muted so browsers allow inline autoplay
		// independently from the site's ambient audio toggle.
		video.defaultMuted = true;
		video.muted = true;
		video.playsInline = true;

	}

	onDisconnected() {

		const { video } = this.elements;
		if ( ! video ) return;
		video.pause();

	}

	onPreFrame() {

		const { video } = this.elements;
		const shouldAutoplayMuted = ! video.hasAttribute( 'controls' ) && ! video.hasAttribute( 'popin' );
		if ( shouldAutoplayMuted ) {
			video.defaultMuted = true;
			video.muted = true;
		}

		let section = this.parentNode;

		if ( section.matches( 'item-thumbnail' ) )
			section = section.parentNode.parentNode;

		let element = this;
		let clientTop = 0;

		do {

			clientTop += element.offsetTop || 0;
			element = element.offsetParent;

		} while ( element );

		if ( section.parentNode.offsetY ) clientTop -= section.parentNode.offsetY;

		const { height } = Application.viewport;
		const scrollTop = Math.round( document.body.scrollTop );

		const offsetBottom = ( clientTop + this.offsetHeight ) - scrollTop;
		const offsetTop = clientTop - scrollTop;
		const isInside = offsetTop + 100 < height && offsetBottom - 100 > 0;
		if ( video.hasAttribute( 'controls' ) ) {

			if ( ! video.paused && ! isInside ) video.pause();
			return;

		}
		if ( video.hasAttribute( 'popin' ) ) return;

		if ( video.paused && isInside ) video.play();
		else if ( ! video.paused && ! isInside ) video.pause();

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

			&::-webkit-media-controls,
			&::-webkit-media-controls-panel,
			&::-webkit-media-controls-start-playback-button {
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
		const preloadMode = preload || ( preloadMedia || fullscreen ? 'auto' : 'metadata' );
		const attributes = [
			'playsinline',
			'webkit-playsinline',
			`preload="${ preloadMode }"`,
			'disablepictureinpicture',
			'disableremoteplayback'
		];
		if ( ! audible ) attributes.push( 'autoplay', 'muted', 'loop' );
		const type = [ fullscreen ? 'fullscreen' : '', border ? 'border' : '' ].join( ' ' );
		const offset = startAt ?? .1;
		const src = source ? `src="${ source }#t=${ offset }"` : '';

		if ( controls ) attributes.push( 'controls' );
		if ( poster ) attributes.push( `poster="${ source.replace( 'mp4', 'png' ) }"` );

		return html`

		<video-block ${ type }>
			<video ${ src } ${ attributes.join( ' ' ) } class="${ preloadMedia ? 'preloadMedia' : '' }" #></video>
		</video-block>

		`;

	}

}

customElements.define( 'video-block', Video );
