export default class S13 {

	static render( content ) {

		css`

		section-type-13 {
			padding: calc( var( --margin-m ) * 2 ) 0;
			display: flex;
			justify-content: center;
			background: var( --color-black );
		}

		youtube-frame {
			width: min( 80vw, 1440px );
			aspect-ratio: 16 / 9;
			display: block;
			position: relative;
			background: #000;
			overflow: hidden;
		}

		youtube-frame iframe {
			width: 100%;
			height: 100%;
			border: 0;
			display: block;
			background: #000;
		}

		@media ( max-width: 650px ) {
			section-type-13 {
				padding: var( --margin-m ) 0;
			}

			youtube-frame {
				width: calc( 100vw - ( var( --margin-s ) * 2 ) );
			}
		}

		`;

		const { anchor, media = {} } = content;
		const { source = '' } = media;
		const videoIDMatch = source.match( /(?:youtu\.be\/|v=)([^?&]+)/ );
		const videoID = videoIDMatch ? videoIDMatch[ 1 ] : '';
		const embedURL = videoID ? `https://www.youtube-nocookie.com/embed/${ videoID }?autoplay=1&rel=0&modestbranding=1` : '';
		const posterURL = videoID ? `https://i.ytimg.com/vi/${ videoID }/maxresdefault.jpg` : '';
		const srcdoc = videoID ? `
			<style>
				html, body {
					margin: 0;
					width: 100%;
					height: 100%;
					overflow: hidden;
					background: #000;
				}
				a {
					position: relative;
					display: block;
					width: 100%;
					height: 100%;
					background:
						linear-gradient(180deg, rgba(0,0,0,.08) 0%, rgba(0,0,0,.24) 100%),
						url('${ posterURL }') center center / cover no-repeat;
					cursor: pointer;
				}
				span {
					position: absolute;
					left: 50%;
					top: 50%;
					width: 96px;
					height: 68px;
					transform: translate(-50%, -50%);
					border-radius: 18px;
					background: rgba(218, 40, 34, .95);
					box-shadow: 0 18px 40px rgba(0,0,0,.35);
				}
				span::after {
					content: '';
					position: absolute;
					left: 50%;
					top: 50%;
					width: 0;
					height: 0;
					border-top: 14px solid transparent;
					border-bottom: 14px solid transparent;
					border-left: 22px solid #fff;
					transform: translate(-35%, -50%);
				}
			</style>
			<a href="${ embedURL }">
				<span></span>
				</a>
			`.replace( /\n\s+/g, ' ' ).trim() : '';
		const escapedSrcdoc = srcdoc
			.replace( /&/g, '&amp;' )
			.replace( /"/g, '&quot;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' );

		return html`

		<section-type-13 section ${ anchor ? `anchor="${ anchor }"` : '' }>
			<youtube-frame>
				${ embedURL ? html`
						<iframe
							src="${ embedURL }"
							srcdoc="${ escapedSrcdoc }"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen>
					</iframe>
				` : '' }
			</youtube-frame>
		</section-type-13>

		`;

	}

}
