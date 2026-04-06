import Video from '~/components/Video';

export default class S4 {

	static render( content ) {

		const variant = content.type === 'S10' ? 'ninety-vh' :
			content.type === 'S11' ? 'eighty-vh' : '';

		css`

		section-type-4 {
			display: flex;
			justify-content: center;
			align-items: flex-start;
			padding: calc( var( --margin-m ) * 2 );
			font-family: var( --font-family-c );

			@media ( max-width: 650px ) {
				padding: var( --margin-m );
				flex-direction: column;
			}

			& > p {
				max-width: 40vw;
				padding: var( --margin-m );
				font-size: var( --font-size-l );
				line-height: 1.8;

				@media ( max-width: 650px ) {
					padding: var( --margin-m ) 0;
					margin-top: var( --margin-s );
					max-width: initial;
				}
			}

			& media-column {
				width: fit-content;
				max-width: calc( 100vw - ( var( --margin-m ) * 4 ) );
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			& media-caption {
				width: 0;
				min-width: 100%;
				align-self: stretch;
			}

			& video-block,
			& video,
			& img {
				height: 90vh;
				max-height: 90vh;
				object-fit: cover;
			}

			&[ eighty-vh ] {
				& video-block,
				& video,
				& img {
					height: 80vh;
					max-height: 80vh;
				}
			}

			& ul {
				margin-left: var( --margin-m );
				font-size: var( --font-size-s );

				@media ( max-width: 650px ) {
					margin-left: 0;
					column-count: 2;
					margin-top: var( --margin-m );
					column-gap: var( --margin-m );
				}
			}

			& li {
				display: flex;
				flex-direction: column;

				&:not( :last-child ) {
					margin-bottom: var( --margin-xs );
				}

				& h5 {
					font-weight: bold;
				}

				& p {
					line-height: 1.5;
				}

			}

			& figcaption {
				display: block;
				width: min( 800px, 100% );
				margin-top: var( --margin-s );
				font-family: var( --font-family-c );
				font-size: var( --font-size-m );
				line-height: 1.6;
				text-align: left;
				align-self: flex-start;

				@media ( max-width: 650px ) {
					margin-bottom: calc( var( --margin-s ) * 2 );
				}
			}

			&[ text-centered ] {
				& media-caption {
					display: flex;
					justify-content: center;
				}

				& figcaption {
					text-align: center;
					align-self: center;
				}
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

		}

		`;

		const { details, paragraphs, anchor } = content;
		const { source, caption, explain, centeredText, controls, preloadMedia } = content.media;
		const isVideo = source.match( /mp4/g );

		const list = ! details ? '' : Object.entries( details )
			.map( ( [ name, value ] ) => html`
				<li>
					<h5>${ name }</h5>
					<p>${ value }</p>
				</li>
			` );

		const alt = ( caption || 'project media' )
			.replace( /<br>/g, '-' )
			.replace( /\t/g, '' );

		return html`

		<section-type-4 section ${ anchor ? `anchor="${ anchor }"` : '' } ${ variant } ${ centeredText ? 'text-centered' : '' }>

			<media-column>
				${ isVideo ?
					Video.render( source, { controls, border: true, preloadMedia } ) :
					html`<img src="${ source }" alt="${ alt }"/>`
				}
				${ caption || explain ? html`
					<media-caption>
						<figcaption>
							${ caption ? html`<project-caption>${ caption }</project-caption>` : '' }
							${ explain ? html`<project-explain>${ explain }</project-explain>` : '' }
						</figcaption>
					</media-caption>
				` : '' }
			</media-column>

			${ details ? html`<ul>${ list }</ul>` : '' }
			${ paragraphs ? html`<p>${ paragraphs }</p>` : '' }

		</section-type-4>

		`;

	}

}
