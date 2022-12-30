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

			&[ centered ] {
				padding: 10vw;

				@media ( max-width: 1024px ) {
					padding: 0;
				}

			}

			section-type-3 + & {
				padding-top: var( --margin-s );
			}

			& img {
				object-fit: contain;
				width: 100%;
				max-height: 100vh;
			}

			& p {
				margin: var( --margin-s );
				font-family: var( --font-family-c );
				font-size: var( --font-size-m );
				opacity: .5;

				@media ( max-width: 650px ) {
					margin: var( --margin-s );
					font-size: var( --font-size-s );
				}

			}
		}

		`;

		const { anchor } = content;
		const { source, caption, controls, centered } = content.media;
		const isVideo = source.match( /mp4/g );
		const attributes = centered ? [ 'centered' ] : '';

		return html`

		<section-type-3 section ${ anchor ? `anchor="${ anchor }"` : '' } ${ attributes }>

		${ isVideo ?

		Video.render( source, { controls, border: true } ) :
		html`<img src="${ source }" alt="${ caption }"/>` }

		${ caption ? html`<p>${ caption }</p>` : '' }

		</section-type-3>

		`;

	}

}
