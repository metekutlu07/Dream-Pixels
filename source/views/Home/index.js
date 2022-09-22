import View from '~/components/View';
import Video from '~/components/Video';
import Aside from '~/components/Aside';

export default class Home extends View {

	static path = '/';
	static silent = false;

	static render() {

		css`

		home-view {
			width: 100vw;
			min-height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			@media ( max-width: 768px ) {
				position: relative !important;
			}

			& aside-block {
				padding-bottom: 20px;
			}

			& p {
				max-width: 400px !important;

				&:not( :last-child ) {
					margin-bottom: calc( var( --margin-m ) * .5 );
				}
			}
		}

		scrolling-text {
			font-size: 2rem;
			height: 50px;
			max-width: 400px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			overflow: auto;
			white-space: nowrap;

			& div {
				animation: scrolling 40s linear infinite;
			}

			& span:nth-child( even ) {
				font-family: var( --font-family-b );
				font-size: .9em;
			}

		}

		`;

		const { title, introduction, keywords } = Application.content;
		const paragraphs = introduction.map( paragraph => html`<p>${ paragraph }</p>` );
		const words = keywords.split( ',' ).concat( keywords.split( ',' ) )
			.map( keyword => html`<span>${ keyword }</span>` )
			.join( ' - ' );

		const source = 'public/common/Background.mp4';

		return html`

		<home-view view>

			${ Video.render( source, { fullscreen: true } ) }

			${ paragraphs ? Aside.render( html`

				<h3 font-style-title>
					${ title }
				</h3>

				${ paragraphs }

				<scrolling-text>
					<div>${ words }</div>
				</scrolling-text>

			` ) : '' }

		</home-view>

		`;

	}

}

customElements.define( 'home-view', Home );
