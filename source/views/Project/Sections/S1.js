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

			@media ( max-width: 768px ) {
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

		return html`

		<section-type-1 section ${ anchor ? `anchor="${ anchor }"` : '' }>

			${ content.media ? Video.render( content.media.source, { fullscreen: true } ) : '' }
			${ description ? Aside.render( html`

				<h3>${ title }</h3>
				<h4>${ subtitle }</h4>

				<ul>
					<li>Team / ${ team }</p>
					<li>Period / ${ period }</p>
					<li>Partners / ${ partners }</p>
					<li>Clients / ${ clients }</p>
				</ul>

				<p>${ description }</p>

			` ) : '' }

		</section-type-1>

		`;

	}

}
