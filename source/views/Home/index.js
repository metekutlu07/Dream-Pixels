import View from '~/components/View';
import Video from '~/components/Video';
import Button from '~/components/Button';

export default class Home extends View {

	static path = '/';
	static silent = false;

	onClick( event ) {

		const { currentTarget } = event;
		const { name } = currentTarget.attributes[ 0 ];
		Application.store.set( 'list', name );
		Application.router.navigate( '/works' );

	}

	static render() {

		css`

		home-view {
			width: 100vw;
			height: 100vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			@media ( max-width: 768px ) {
				position: relative !important;
			}

			& h3 {
				font-size: var( --font-size-xxl );
				font-family: var( --font-family-a );
			}

			& h4 {
				font-size: var( --font-size-xl );
				font-family: var( --font-family-b );
			}

			& p {
				max-width: 600px !important;
				font-size: var( --font-size-m );
				font-family: var( --font-family-c );
				line-height: var( --line-height );
				text-align: center;
			}

			& img {
				position: relative;
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}

		home-buttons {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: var( --margin-m ) 0;

			& default-button {
				font-size: var( --font-size-xl );
				padding: var( --margin-s );

				&:not( :last-child ) {
					margin-right: -1px;
				}
			}
		}

		scrolling-text {
			font-size: 2rem;
			max-width: 600px;
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

		const source = 'public/common/Background.mp4';
		const modes = [

			{ attributes: [ 'places', 'link', '@click|home-view' ] },
			{ attributes: [ 'grid', 'link', '@click|home-view' ] },
			{ attributes: [ 'sphere', 'link', '@click|home-view' ] },
			{ attributes: [ 'particles', 'link', '@click|home-view' ] }

		];

		return html`

		<home-view view>

			${ Video.render( source, { fullscreen: true } ) }

			<h3>${ title }</h3>
			<h4>${ subtitle }</h4>

			<home-buttons blurred-background>
				${ modes.map( Button.render ) }
			</home-buttons>

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

		</home-view>

		`;

	}

}

customElements.define( 'home-view', Home );
