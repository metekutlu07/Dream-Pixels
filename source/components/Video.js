export default class Video extends HTMLElement {

	onPreFrame() {

		const { video } = this.elements;
		this.elements.video.muted = Application.audio.isMuted;

		let section = this.parentNode;

		if ( section.matches( 'item-thumbnail' ) )
			section = section.parentNode.parentNode;

		if ( video.hasAttribute( 'controls' ) || video.hasAttribute( 'popin' ) ) return;

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

			[ fullscreen ] & {
				height: 100%;
			}

			[ border ] & {
				max-height: 100vh;
				object-fit: contain
			}
		}

		`;

		const { controls, fullscreen, border, poster } = parameters;
		const attributes = [ 'playsinline', 'muted', 'loop', 'preload' ];
		const type = [ fullscreen ? 'fullscreen' : '', border ? 'border' : '' ].join( ' ' );
		const src = source ? `src="${ source }#t=0.1"` : '';

		if ( controls ) attributes.push( 'controls' );
		if ( poster ) attributes.push( `poster="${ source.replace( 'mp4', 'png' ) }"` );

		return html`

		<video-block ${ type }>
			<video ${ src } ${ attributes.join( ' ' ) } #></video>
		</video-block>

		`;

	}

}

customElements.define( 'video-block', Video );
