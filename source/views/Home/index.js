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
		if ( name === 'places' ) Application.store.set( 'places', 'world' );
		Application.router.navigate( '/works' );

	}

	static render() {

		css`

		home-view {
			width: 100vw;
			height: 100vh;
    		height: calc(var(--vh, 1vh) * 100);
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			overflow-x: hidden;
			padding-top: calc(var(--vh, 1vh) * 14);
			padding-bottom: calc(var(--vh, 1vh) * 7);

			@media ( max-width: 1024px ) {
				justify-content: space-between;
			}

			& video-block {
				@media ( max-width: 650px ) {
					position: absolute !important;
				}
			}

			& video {
				opacity: .75;
			}

			& home-title {
				display: block;
				line-height: 1.25;
				text-align: center;

				& h3 {
					font-size: 8rem;
					font-family: var( --font-family-a );

					@media ( max-width: 650px ) {
						font-size: 5.5rem;
					}
				}

				& h4 {
					font-size: var( --font-size-xxl );
					font-family: var( --font-family-b );

					@media ( max-width: 650px ) {
						font-size: 3rem;
					}
				}
			}

			& p {
				max-width: 600px !important;
				font-size: var( --font-size-m );
				font-family: var( --font-family-c );
				line-height: var( --line-height );
				text-align: center;

				@media ( max-width: 650px ) {
					font-size: var( --font-size-xs );
				}
			}

			& img {
				position: relative;
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}

		home-buttons {
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 5px;

			@media ( max-width: 650px ) {
				flex-direction: column;
			}

			& default-button {
				font-size: var( --font-size-xxl );
				font-family: var( --font-family-a );
				border: none;

				&:not( :last-child ) {
					margin-right: -1px;
				}

				@media ( hover: hover ) {
					&:hover {
						--background-color: transparent;
					}
				}

				@media ( max-width: 650px ) {
					font-size: 4rem;
				}
			}

			& span {
				margin-bottom: -3px;

				@media ( max-width: 650px ) {
					margin-bottom: 0;
				}
			}
		}

		scrolling-text {
			--gap: 0.25rem;
			display: flex;
			overflow: hidden;
			user-select: none;
			gap: var( --gap );
			font-size: 3rem;

			& scrolling-animation {
				flex-shrink: 0;
				display: flex;
				justify-content: space-around;
				align-items: center;
				min-width: 90%;
				gap: var( --gap );
				animation: scroll 50s linear infinite;

				& span:nth-child( even ) {
					font-family: var( --font-family-b );
					font-size: 0.9em;
				}
			}

			@keyframes scroll {
				from {
					transform: translateX(0);
				}
				to {
					transform: translateX(calc(-100% - var(--gap)));
				}
			}

			@media ( max-width: 650px ) {
				font-size: 2.25rem;
			}
		}

		`;

		const { title, subtitle, themes, skills } = Application.content;

		const scrollingText = string => string.split( ',' )
			.map( keyword => html`<span class="keyword">${ keyword }</span> -` )
			.join( '' );

		const source = 'public/common/Background.mp4';
		const modes = [

			{ attributes: [ 'grid', 'link', '@click|home-view' ] },
			{ attributes: [ 'places', 'link', '@click|home-view' ] },
			{ attributes: [ 'sphere', 'link', '@click|home-view' ] },
			{ attributes: [ 'particles', 'link', '@click|home-view' ] }

		];

		return html`

		<home-view view>

			${ Video.render( source, { fullscreen: true } ) }

			<home-title>
				<h3>${ title }</h3>
				<h4>${ subtitle }</h4>
			</home-title>

			<home-buttons>
				${ modes.map( Button.render ) }
			</home-buttons>

			<div>
				<scrolling-text>
					<scrolling-animation>
						${ scrollingText( themes ) }
					</scrolling-animation>
					<scrolling-animation aria-hidden="true">
						${ scrollingText( themes ) }
					</scrolling-animation>
				</scrolling-text>

				<scrolling-text>
					<scrolling-animation>
						${ scrollingText( skills ) }
					</scrolling-animation>
					<scrolling-animation aria-hidden="true">
						${ scrollingText( skills ) }
					</scrolling-animation>
				</scrolling-text>
			</div>

		</home-view>

		`;

	}

}

customElements.define( 'home-view', Home );
