import Video from '~/components/Video';

export default class S1 {

	static render( content ) {

		css`

		section-type-1 {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100vw;
			min-height: 100vh;
			min-height: calc( var( --vh, 1vh ) * 100 );
			margin-bottom: calc( var( --margin-m ) * 2 );
			overflow: hidden;
			background: var( --color-black );
			user-select: none;

			& hero-media,
			& hero-overlay,
			& hero-lines {
				position: absolute;
				inset: 0;
			}

			& hero-media {
				z-index: 0;
			}

			& hero-lines {
				z-index: 1;
				background:
					linear-gradient( 180deg, rgba( 0, 0, 0, .42 ) 0%, rgba( 0, 0, 0, .42 ) 100% ),
					repeating-linear-gradient(
						180deg,
						rgba( 255, 255, 255, .075 ) 0,
						rgba( 255, 255, 255, .075 ) 2px,
						rgba( 255, 255, 255, 0 ) 2px,
						rgba( 255, 255, 255, 0 ) 6px
					);
				mix-blend-mode: normal;
				opacity: 1;
				pointer-events: none;
			}

			& hero-overlay {
				z-index: 2;
				position: relative;
				width: min( 980px, calc( 100vw - 80px ) );
				padding: 80px 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;
				color: var( --color-white );
				pointer-events: none;
			}

			& hero-index {
				margin-bottom: 22px;
				font-family: var( --font-family-c );
				font-size: 1.6rem;
				font-weight: 400;
				letter-spacing: .18em;
				text-transform: uppercase;
				opacity: .8;
			}

			& h3 {
				font-size: clamp( 4.8rem, 7vw, 9.6rem );
				font-family: var( --font-family-a );
				line-height: .95;
				letter-spacing: .02em;
			}

			& h4 {
				margin-top: 12px;
				font-size: clamp( 2.2rem, 2.3vw, 3.5rem );
				font-family: var( --font-family-b );
				letter-spacing: .06em;
				text-transform: uppercase;
			}

			& hero-meta {
				margin-top: 24px;
				font-family: var( --font-family-c );
				font-size: clamp( 1.6rem, 1.25vw, 2rem );
				font-weight: 300;
				letter-spacing: .08em;
				text-transform: uppercase;
				opacity: .78;
			}

			& video-block,
			& img {
				width: 100%;
				height: 100%;
			}

			& video,
			& img {
				object-fit: cover;
				width: 100%;
				height: 100%;
			}

			@media ( max-width: 650px ) {
				margin-bottom: var( --margin-m );

				& hero-overlay {
					width: calc( 100vw - 32px );
					padding: 64px 0;
				}

				& hero-index {
					margin-bottom: 18px;
					font-size: 1.3rem;
				}

				& hero-meta {
					margin-top: 18px;
					font-size: 1.3rem;
					line-height: 1.6;
				}
			}
		}

		`;

		const {

			title,
			subtitle,
			path,
			anchor,
			location,
			date

		} = content;
		const projectIndex = Application.content.projects
			.findIndex( project => project.path === path );
		const projectNumber = projectIndex === -1 ? '' :
			`${ projectIndex + 1 }`.padStart( 2, '0' );
		const meta = [ date, location ].filter( Boolean ).join( ' / ' );

		let media = '';

		if ( content.media ) {

			const { source, caption, controls, preloadMedia } = content.media;
			const isVideo = source.match( /mp4/g );

			media = isVideo ?
				Video.render( source, { controls, fullscreen: true, preloadMedia } ) :
				html`<img src="${ source }" alt="${ caption }" class="${ preloadMedia ? 'preloadMedia' : '' }" />`;

		}

		return html`

		<section-type-1 section ${ anchor ? `anchor="${ anchor }"` : '' }>

			<hero-media>${ media }</hero-media>
			<hero-lines></hero-lines>
			<hero-overlay>
				${ projectNumber ? html`<hero-index>Experiment ${ projectNumber }</hero-index>` : '' }
				<h3>${ title }</h3>
				${ subtitle ? html`<h4>${ subtitle }</h4>` : '' }
				${ meta ? html`<hero-meta>${ meta }</hero-meta>` : '' }
			</hero-overlay>

		</section-type-1>

		`;

	}

}
