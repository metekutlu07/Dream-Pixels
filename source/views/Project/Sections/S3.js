import Video from '~/components/Video';

export default class S3 {

	static render( content ) {

		css`

		section-type-3 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: var( --color-black );

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
			}

			& img {
				object-fit: cover;
				width: 100%;
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
				opacity: 1

				@media ( max-width: 650px ) {
					margin: var( --margin-s );
					font-size: var( --font-size-s );
				}

			}
		}

		`;

		const { anchor } = content;
		const { source, caption, controls, centered, preloadMedia } = content.media;
		const isVideo = source.match( /mp4/g );
		const attributes = [];

		if ( ! source.length ) attributes.push( 'model' );
		if ( centered ) attributes.push( 'centered' );

		return html`

		<section-type-3 section ${ anchor ? `anchor="${ anchor }"` : '' } ${ attributes }>

		${ isVideo ?

		Video.render( source, { controls, border: true, preloadMedia } ) :
		html`<img src="${ source }" alt="${ caption }" class="${ preloadMedia ? 'preloadMedia' : '' }" />` }

		${ caption ? html`<p>${ caption }</p>` : '' }

		</section-type-3>

		`;

	}

}
