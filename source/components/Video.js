export default class Video extends HTMLElement {

	onPreFrame() {

		const { video } = this.elements;
		this.elements.video.muted = Application.audio.isMuted;

		let section = this.parentNode;
		if ( section.matches( 'item-thumbnail' ) ) section = section.parentNode;

		if ( video.hasAttribute( 'controls' ) ) return;

		const { height } = Application.viewport;
		const scrollTop = document.body.scrollTop;
		const scrollRatio = scrollTop / height;
		const offsetBottom = ( section.offsetTop + this.height ) / height;
		const offsetTop = section.offsetTop / height;

		const isOutsideViewport = offsetBottom - scrollRatio < .1 || offsetTop - scrollRatio > .9;
		if ( video.paused && ! isOutsideViewport ) video.play();
		else if ( ! video.paused && isOutsideViewport ) video.pause();

	}

	onResize() {

		this.height = this.clientHeight;

	}

	static render( source, parameters = {} ) {

		css`

		video-block {
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;

			[ path="/augustus-ar" ] & {
				visibility: hidden;
				position: absolute;
			}

			&[ fullscreen ] {
				position: absolute;
				padding: 0;
				border: none;

				@media ( max-width: 768px ) {
					position: relative;
					height: 50vh;

					[ path="/when-gaspard-paints-a-gospel" ] &,
					[ path="/augustus-ar" ] & {
						height: 65vh;
					}
				}

			}

			&[ border ] {
				padding: var( --margin-m );
				height: auto;

				@media ( max-width: 768px ) {
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
				border: var( --border-size ) solid rgba( 255, 255, 255, .15 );
			}
		}

		`;

		const { controls, fullscreen, border } = parameters;
		const attributes = [ 'playsinline', 'muted', 'loop' ];
		const type = [ fullscreen ? 'fullscreen' : '', border ? 'border' : '' ].join( ' ' );
		const src = source ? `src="${ source }#t=0.1"` : '';

		if ( controls ) attributes.push( 'controls' );

		return html`

		<video-block ${ type }>
			<video ${ src } ${ attributes.join( ' ' ) } #></video>
		</video-block>

		`;

	}

}

customElements.define( 'video-block', Video );
