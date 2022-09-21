import Video from '~/components/Video';

export default class S3 {

	static render( content ) {

		css`

		section-type-3 {
			display: flex;
			justify-content: center;
			align-items: center;
			background: var( --color-black );

			section-type-3 + & {
				padding-top: var( --margin-s );
			}

			& img {
				object-fit: cover;
				width: 100%;
			}
		}

		`;

		const { source, caption, controls } = content.media[ 0 ];
		const isVideo = source.match( /mp4/g );

		return html`

		<section-type-3 section>

		${ isVideo ?

		Video.render( source, { controls, border: true } ) :
		html`<img src="${ source }" alt="${ caption }"/>` }

		</section-type-3>

		`;

	}

}
