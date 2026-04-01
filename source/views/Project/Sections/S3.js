import Video from '~/components/Video';

export default class S3 {

	static render( content ) {

		const variant = content.type === 'S8' ? 'compact' :
			content.type === 'S9' ? 'medium' : '';
		const { anchor } = content;
		const { source, caption, explain, controls, centered, preloadMedia } = content.media;
		const plainCaption = caption ? caption
			.replace( /<[^>]*>/g, ' ' )
			.replace( /\s+/g, ' ' )
			.trim() : '';

		css`

		section-type-3 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: var( --color-black );
			padding: 0;

			&[ model ] {
				height: 100vh;
    			height: calc(var(--vh, 1vh) * 100);
				width: 100vw;
				background: none;

				& img {
					visibility: hidden;
				}
			}

			section-type-3 + & {
				padding-top: var( --margin-s );

				@media ( max-width: 1024px ) {
					padding-top: 0;
				}
			}

			& img {
				object-fit: cover;
				width: 100%;
			}

			& media-frame {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				& > * {
					width: 100%;
				}
			}

			&[ compact ],
			&[ medium ] {
				padding: var( --margin-s ) 0;

				& media-frame {
					width: min( 75vw, 1400px );
				}

				& img,
				& video-block,
				& video {
					width: 100%;
				}

				& p {
					width: min( 50vw, 934px );
					margin: 18px 0 0;
					padding-left: 0;
					padding-right: 48px;
					box-sizing: border-box;
					text-align: left;
				}
			}

			&[ compact ] {
				& media-frame,
				& p {
					width: 1296px;
					max-width: calc( 100vw - ( var( --margin-m ) * 2 ) );
				}

				& p {
					padding-right: 0;
				}
			}

			&[ medium ] {
				& media-frame,
				& p {
					width: min( 82vw, 1600px );
				}

				& p {
					width: min( 54.67vw, 1067px );
					padding-left: 200px;
				}
			}

			&[ centered ] {
				padding-top: var( --margin-s );

				& img {
					object-fit: contain;
					max-width: 50vw;
					max-height: 100vh;

					@media ( max-width: 1024px ) {
						max-width: unset;
					}
				}
			}

			& p {
				margin: var( --margin-s );
				font-family: var( --font-family-c );
				font-size: var( --font-size-m );
				font-weight: 600;
				opacity: 1;

				@media ( max-width: 650px ) {
					margin: var( --margin-s );
					font-size: var( --font-size-s );
				}
			}

			& project-caption,
			& project-explain {
				display: block;
			}

			& project-caption strong,
			& p strong {
				font-weight: inherit;
			}

			& project-explain {
				margin-top: 12px;
				font-weight: 400;
			}

			& project-explain strong {
				font-weight: 600;
			}

			@media ( max-width: 1024px ) {
				&[ compact ],
				&[ medium ] {
					& media-frame,
					& p {
						width: calc( 100vw - ( var( --margin-m ) * 2 ) );
					}

					& p {
						padding-left: 72px;
						padding-right: 0;
					}
				}
			}

			@media ( max-width: 650px ) {
				&[ compact ],
				&[ medium ] {
					padding: var( --margin-s ) 0;

					& media-frame,
					& p {
						width: calc( 100vw - ( var( --margin-s ) * 2 ) );
					}

					& p {
						margin-top: var( --margin-s );
						padding-left: 0;
						padding-right: 0;
					}
				}
			}
		}

		`;

		const isVideo = source.match( /mp4/g );
		const attributes = [];

		if ( ! source.length ) attributes.push( 'model' );
		if ( centered ) attributes.push( 'centered' );
		if ( variant === 'compact' ) attributes.push( 'compact' );
		if ( variant === 'medium' ) attributes.push( 'medium' );

		return html`

		<section-type-3 section ${ anchor ? `anchor="${ anchor }"` : '' } ${ attributes }>

		<media-frame>
		${ isVideo ?

		Video.render( source, { controls, border: true, preloadMedia } ) :
		html`<img src="${ source }" alt="${ plainCaption }" class="${ preloadMedia ? 'preloadMedia' : '' }" />` }
		</media-frame>

		${ caption || explain ? html`
			<p>
				${ caption ? html`<project-caption>${ caption }</project-caption>` : '' }
				${ explain ? html`<project-explain>${ explain }</project-explain>` : '' }
			</p>
		` : '' }

		</section-type-3>

		`;

	}

}
