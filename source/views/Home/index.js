import View from '~/components/View';
import Aside from '~/components/Aside';
// import Video from '~/components/Video';

export default class Home extends View {

	static path = '/';
	static silent = false;

	static render() {

		css`

		home-view {
			width: 100vw;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			@media ( max-width: 768px ) {
				position: relative !important;
			}

			& h3 {
				font-size: var( --font-size-xl );
				font-family: var( --font-family-a );
			}

			& h4 {
				font-size: var( --font-size-l );
				font-family: var( --font-family-b );
				margin-bottom: var( --margin-xs );
			}

			& p {
				max-width: 400px !important;
			}

			& img {
				position: relative;
				object-fit: cover;
				width: 100%;
				height: 100%;
			}

			& aside-block {
				/* display: none; */
			}
		}

		scrolling-text {
			font-size: 2rem;
			max-width: 400px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			overflow: auto;
			white-space: nowrap;
			margin-top: var( --margin-m );

			&:last-child {
				margin-top: 5px;

				& scrolling-animation {
					animation: scrolling 40s linear infinite;
				}
			}

			& scrolling-animation {
				animation: scrolling 50s linear infinite;
			}

			& span:nth-child( even ) {
				font-family: var( --font-family-b );
				font-size: .9em;
			}

		}

		`;

		const { title, introduction, subtitle, themes, skills } = Application.content;
		const paragraphs = introduction.map( paragraph => html`<p>${ paragraph }</p>` );

		const duplicate = string => `${ string }, ${ string },`
			.split( ',' )
			.map( keyword => html`<span>${ keyword }</span>` )
			.join( ' - ' );

		// const source = 'public/common/Background.mp4';
		// ${ Video.render( source, { fullscreen: true } ) }

		return html`

		<home-view view>

			<img src="public/common/Background.png" alt="Marbled Paper"/>

			${ paragraphs ? Aside.render( html`

				<h3>${ title }</h3>
				<h4>${ subtitle }</h4>

				${ paragraphs }

				<scrolling-text>
					<scrolling-animation>
						${ duplicate( themes ) }
					</scrolling-animation>
				</scrolling-text>

				<scrolling-text>
					<scrolling-animation>
						${ duplicate( skills ) }
					</scrolling-animation>
				</scrolling-text>

			` ) : '' }

		</home-view>

		`;

	}

}

customElements.define( 'home-view', Home );
