import Video from '~/components/Video';
import Aside from '~/components/Aside';

export default class S1 {

	static render( content ) {

		css`

		section-type-1 {
			display: flex;
			width: 100vw;
			height: 100vh;
			user-select: none;

			@media ( max-width: 768px ) {
				flex-direction: column;
				height: initial;
				pointer-events: none;
			}
		}

		`;

		const {

			title,
			subtitle,
			description

		} = content;

		const { source } = content.media[ 0 ];

		return html`

		<section-type-1 section>

			${ Video.render( source, { fullscreen: true } ) }
			${ description ? Aside.render( html`

				<h3 font-style-title>
					${ title }<br>
					${ subtitle }
				</h3>

				<p>${ description }</p>

			` ) : '' }

		</section-type-1>

		`;

	}

}
