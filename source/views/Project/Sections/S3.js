import Video from '~/components/Video';

export default class S3 {

	static render( content ) {

		const variant = content.type === 'S8' ? 'compact' :
			content.type === 'S9' ? 'medium' : '';
		const { anchor } = content;
		const { source, caption, explain, alt, controls, centered, centeredText, textCentered, preloadMedia, audible } = content.media;
		const isTextCentered = centeredText || textCentered;
		const plainCaption = caption ? caption
			.replace( /<[^>]*>/g, ' ' )
			.replace( /\s+/g, ' ' )
			.trim() : '';
		const plainAlt = alt || plainCaption || 'project media';

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
				padding-top: calc( var( --margin-s ) * 4 );

				@media ( max-width: 1024px ) {
					padding-top: 0;
				}
			}

			& img {
				object-fit: cover;
				width: 100%;
			}

			& content-frame {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			& media-frame {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;

				& > * {
					width: 100%;
				}
			}

			&[ compact ],
			&[ medium ] {
				padding: calc( var( --margin-s ) * 4 ) 0;

				& content-frame {
					width: min( 75vw, 1400px );
					align-items: flex-start;
				}

				& img,
				& video-block,
				& video {
					width: 100%;
				}

				& p {
					width: min( 50vw, 934px );
					margin: 18px 0 0;
					padding: 0 48px 0 0;
					box-sizing: border-box;
					text-align: left;
					align-self: flex-start;
				}
			}

			&[ compact ] {
				& content-frame {
					width: min( var( --archive-wide-width ), calc( 100vw - ( var( --margin-m ) * 2 ) ) );
				}

				& p {
					width: min( 788px, 100% );
					padding-right: 0;
				}
			}

			&[ medium ] {
				& content-frame {
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
				width: 1000px;
				margin: var( --margin-s ) 0 0;
				padding-left: 300px;
				box-sizing: content-box;
				align-self: flex-start;
				text-align: left;
				font-family: var( --font-family-c );
				font-size: var( --font-size-m );
				font-weight: 350;
				opacity: 1;

				@media ( max-width: 650px ) {
					width: 100%;
					margin: var( --margin-s ) 0 0;
					padding-bottom: calc( var( --margin-s ) * 2 );
					padding-left: 0;
					box-sizing: border-box;
					font-size: var( --font-size-s );
				}
			}

			& p[ centered-text ] {
				padding-left: 0;
				padding-right: 0;
				align-self: center;
				text-align: center;
			}

			&[ compact ] p[ centered-text ],
			&[ medium ] p[ centered-text ] {
				margin-left: auto;
				margin-right: auto;
				padding-left: 0;
				padding-right: 0;
				align-self: center;
				text-align: center;
			}

			&[ compact ] p[ centered-text ] {
				width: min( 788px, 100% );
			}

			&[ medium ] p[ centered-text ] {
				width: min( 54.67vw, 1067px );
			}

			& project-caption strong,
			& p strong {
				font-weight: inherit;
			}

			& project-caption {
				font-weight: 300;
			}

			& project-explain {
				font-weight: 300;
			}

			& project-caption + project-explain::before {
				content: ' ';
			}

			@media ( max-width: 1024px ) {
				&[ compact ],
				&[ medium ] {
					& content-frame {
						width: calc( 100vw - ( var( --margin-m ) * 2 ) );
					}

					& p {
						width: min( 100%, 1067px );
						padding-left: 72px;
						padding-right: 0;
					}
				}

				& p[ centered-text ] {
					padding-left: 0;
				}
			}

			@media ( max-width: 650px ) {
				&[ without-caption ] {
					padding-bottom: calc( var( --margin-s ) * 2 );
				}

				&[ compact ],
				&[ medium ] {
					padding: var( --margin-s ) 0;

					& content-frame {
						width: calc( 100vw - ( var( --margin-s ) * 2 ) );
					}

					& p {
						width: 100%;
						margin-top: calc( var( --margin-s ) * .5 );
						padding-left: 0;
						padding-right: 0;
					}
				}

				& > content-frame > p {
					margin-top: calc( var( --margin-s ) * .5 );
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

		<section-type-3 section ${ anchor ? `anchor="${ anchor }"` : '' } ${ attributes } ${ ! caption && ! explain ? 'without-caption' : '' }>

		<content-frame>
			<media-frame>
			${ isVideo ?

		Video.render( source, { controls, border: true, preloadMedia, audible } ) :
		html`<img src="${ source }" alt="${ plainAlt }" class="${ preloadMedia ? 'preloadMedia' : '' }" />` }
			</media-frame>

			${ caption || explain ? html`
				<p ${ isTextCentered ? 'centered-text' : '' }>
					${ caption ? html`<project-caption>${ caption }</project-caption>` : '' }
					${ explain ? html`<project-explain>${ explain }</project-explain>` : '' }
				</p>
			` : '' }
		</content-frame>

		</section-type-3>

		`;

	}

}
