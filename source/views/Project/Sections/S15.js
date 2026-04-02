export default class S15 extends HTMLElement {

	onConnected() {

		const trigger = this.querySelector( '[play-dailymotion]' );
		if ( !trigger ) return;

		trigger.addEventListener( 'click', () => {

			const player = this.querySelector( '[dailymotion-player]' );
			const embed = this.dataset.embed;
			if ( !player || !embed || player.querySelector( 'iframe' ) ) return;

			player.innerHTML = `
				<iframe
					src="${ embed }"
					title="Dailymotion video player"
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen>
				</iframe>
			`;

			this.toggleAttribute( 'playing', true );

		}, { once: true } );

	}

	static render( content ) {

		css`

		section-type-15 {
			padding: calc( var( --margin-m ) * 2 ) 0;
			display: flex;
			justify-content: center;
			background: var( --color-black );
		}

		dailymotion-frame {
			width: min( 80vw, 1440px );
			aspect-ratio: 16 / 9;
			display: block;
			position: relative;
			background:
				radial-gradient( circle at 50% 38%, rgba( 255, 255, 255, .08 ) 0%, rgba( 255, 255, 255, 0 ) 34% ),
				linear-gradient( 145deg, rgba( 24, 33, 50, 1 ) 0%, rgba( 0, 0, 0, 1 ) 100% );
			overflow: hidden;
		}

		dailymotion-frame::before {
			content: '';
			position: absolute;
			inset: 0;
			background:
				linear-gradient( 180deg, rgba( 0, 0, 0, .18 ) 0%, rgba( 0, 0, 0, .48 ) 100% ),
				var( --poster-image, none ) center center / cover no-repeat;
			opacity: .9;
			pointer-events: none;
		}

		dailymotion-frame iframe,
		dailymotion-frame button,
		dailymotion-frame [dailymotion-player] {
			width: 100%;
			height: 100%;
			display: block;
		}

		dailymotion-frame iframe {
			border: 0;
			background: #000;
		}

		dailymotion-frame button {
			border: 0;
			padding: 0;
			cursor: pointer;
			color: var( --color-white );
			background: transparent;
			position: relative;
			z-index: 1;
		}

		dailymotion-frame button span {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate( -50%, -50% );
			display: inline-flex;
			align-items: center;
			gap: 18px;
			padding: 22px 28px;
			border: 1px solid rgba( 255, 255, 255, .18 );
			background: rgba( 7, 9, 15, .72 );
			backdrop-filter: blur( 12px );
			font-family: var( --font-family-c );
			font-size: 1.4rem;
			letter-spacing: .12em;
			text-transform: uppercase;
		}

		dailymotion-frame button i {
			width: 70px;
			height: 50px;
			display: inline-block;
			position: relative;
			border-radius: 14px;
			background: rgba( 255, 255, 255, .16 );
		}

		dailymotion-frame button i::after {
			content: '';
			position: absolute;
			left: 50%;
			top: 50%;
			width: 0;
			height: 0;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			border-left: 16px solid #fff;
			transform: translate( -30%, -50% );
		}

		@media ( max-width: 650px ) {
			section-type-15 {
				padding: var( --margin-m ) 0;
			}

			dailymotion-frame {
				width: calc( 100vw - ( var( --margin-s ) * 2 ) );
			}

			dailymotion-frame button span {
				padding: 18px 20px;
				font-size: 1.15rem;
				gap: 14px;
			}

			dailymotion-frame button i {
				width: 58px;
				height: 42px;
			}
		}

		`;

		const { anchor, media = {} } = content;
		const { source = '', poster = '' } = media;
		const videoIDMatch = source.match( /(?:dai\.ly\/|dailymotion\.com\/video\/)([^_?&/]+)/ );
		const videoID = videoIDMatch ? videoIDMatch[ 1 ] : '';
		const embedURL = videoID ? `https://www.dailymotion.com/embed/video/${ videoID }?autoplay=1` : '';
		const posterStyle = poster ? `--poster-image: url('${ poster }');` : '';

		return html`

		<section-type-15
			section
			data-embed="${ embedURL }"
			${ anchor ? `anchor="${ anchor }"` : '' }>
			<dailymotion-frame style="${ posterStyle }">
				<div dailymotion-player>
					${ embedURL ? html`
						<button type="button" play-dailymotion aria-label="Play Dailymotion video">
							<span>
								<i></i>
								Watch Video
							</span>
						</button>
					` : '' }
				</div>
			</dailymotion-frame>
		</section-type-15>

		`;

	}

}

customElements.define( 'section-type-15', S15 );
