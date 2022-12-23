import Video from '~/components/Video';
import Aside from '~/components/Aside';

export default class S1 {

	static render( content ) {

		css`

		section-type-1 {
			display: flex;
			width: 100vw;
			height: 100%;
			user-select: none;

			@media ( max-width: 650px ) {
				flex-direction: column;
				height: initial;
			}

			& h3 {
				font-size: var( --font-size-xl );
				font-family: var( --font-family-a );
			}

			& h4 {
				font-size: var( --font-size-l );
				font-family: var( --font-family-b );
			}

			& ul {
				margin-top: var( --margin-s );
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );

				& li {
					margin-bottom: 5px;
				}
			}

			& img {
				object-fit: cover;
				width: 100%;
			}
		}

		`;

		const {

			title,
			subtitle,
			anchor,
			description,
			team,
			period,
			partners,
			clients

		} = content;

		let media = '';

		if ( content.media ) {

			const { source, caption, controls, } = content.media;
			const isVideo = source.match( /mp4/g );

			media = isVideo ?
				Video.render( source, { controls, fullscreen: true } ) :
				html`<img src="${ source }" alt="${ caption }"/>`;

		}

		return html`

		<section-type-1 section ${ anchor ? `anchor="${ anchor }"` : '' }>

			${ media }
			${ description ? Aside.render( html`

				<h3>${ title }</h3>
				<h4>${ subtitle }</h4>

				<ul>
					${ team ? html`<li>Team / ${ team }</p>` : '' }
					${ period ? html`<li>Period / ${ period }</p>` : '' }
					${ partners ? html`<li>Partners / ${ partners }</p>` : '' }
					${ clients ? html`<li>Clients / ${ clients }</p>` : '' }
				</ul>

				<p>${ description }</p>

			` ) : '' }

		</section-type-1>

		`;

	}

}
