import Button from '~/components/Button';

export default class Aside extends HTMLElement {

	onConnected( index ) {

		this.index = index;
		if ( ! this.hasAttribute( 'tag-linked-panel' ) ) Application.store.set( 'display-aside', true );

	}

	onClick() {

		Application.store.set( 'display-aside', false );
		this.exit();

	}

	exit() {

		if ( ! this.hasAttribute( 'visible' ) ) return;
		this.toggleAttribute( 'visible', false );

		Application.audio.play( '002.mp3' );
		Application.camera.setOffsetLeftFactor( 0 );

	}

	enter() {

		if ( this.hasAttribute( 'visible' ) ) return;
		this.toggleAttribute( 'visible', true );

		Application.audio.play( '001.mp3' );
		Application.camera.setOffsetLeftFactor( this.hasAttribute( 'floating-panel' ) ? 0 : 1 );

	}

	static render( innerHTML, attributes = [] ) {

		css`

		aside-block {
			z-index: 4;
			position: absolute;
			background-color: var( --background-color );
			bottom: var( --margin-m );
			left: var( --margin-m );
			padding: var( --margin-m );
			overflow: scroll;
			transition:
				transform .5s var( --timing-function ),
				opacity .5s var( --timing-function );
			border: var( --border-size ) solid var( --border-color );

			&:not( [ scrollable ] ) {

				@media ( max-width: 650px ) {
					padding: var( --margin-s );
					left: var( --margin-s );
					right: var( --margin-s );

					& scrolling-block {
						& ul {
							display: none;
						}
					}
				}
			}

			[ view-exit ] & {
				transition:
					transform .5s var( --timing-function ),
					opacity .5s var( --timing-function );
			}

			[ view-enter ] &:not( [ scrollable ] ),
			[ view-enter ][ display-aside ] &[ scrollable ]:not( [ tag-linked-panel ] ),
			[ view-enter ]  &[ visible ][ scrollable ] {
				transform: translateX( 0 );
			}

			&[ scrollable ] {
				transform: translateX( -125% );
				max-width: 450px;
				bottom: initial;
				left: 0;
				top: 0;
				bottom: 0;
				max-height: 100%;
				overflow-y: auto;
				overflow-x: hidden;
				border: none;
				border-right: var( --border-size ) solid var( --border-color );
				transition:
				transform .85s var( --timing-function ),
					opacity .85s var( --timing-function );
				opacity: 1;

				& default-button {
					display: flex;
					right: var( --margin-m );
					top: var( --margin-m );

					@media ( max-width: 1024px ) {
						right: var( --margin-s );
						top: var( --margin-s );
					}
				}

				& scrolling-block {
					padding: var( --margin-m ) 0;
				}

				@media ( max-width: 650px ) {
					width: 100%;
					border-right: none;
				}
			}

			&[ scrollable ][ floating-panel ] {
				transform: translateX( calc( -100% - var( --margin-m ) - 16px ) );
				top: calc( var( --margin-m ) + 84px );
				bottom: var( --margin-m );
				left: var( --margin-m );
				width: min( 420px, calc( 100vw - 180px ) );
				max-width: min( 420px, calc( 100vw - 180px ) );
				max-height: calc( 100vh - 84px - ( var( --margin-m ) * 2 ) );
				border: var( --border-size ) solid var( --border-color );
				border-right: var( --border-size ) solid var( --border-color );
				background: rgba( 0, 0, 0, .28 );
				backdrop-filter: blur( 10px );
				-webkit-backdrop-filter: blur( 10px );
				scrollbar-width: thin;
				scrollbar-color: rgba( 255, 255, 255, .45 ) rgba( 255, 255, 255, .08 );

				&::-webkit-scrollbar {
					display: block;
					width: 8px;
				}

				&::-webkit-scrollbar-track {
					background: rgba( 255, 255, 255, .08 );
				}

				&::-webkit-scrollbar-thumb {
					background: rgba( 255, 255, 255, .45 );
					border-radius: 999px;
				}

				& default-button {
					display: flex;
					top: 12px;
					right: 12px;
					z-index: 1;
					background: rgba( 255, 255, 255, .08 );
					backdrop-filter: blur( 10px );
					-webkit-backdrop-filter: blur( 10px );
					border: var( --border-size ) solid rgba( 255, 255, 255, .28 );

					& button-label {
						padding: 8px 12px;
						font-size: var( --font-size-s );
						font-family: var( --font-family-b );
						line-height: 1;
						letter-spacing: .04em;
						text-transform: uppercase;
					}
				}

				@media ( max-width: 1024px ) {
					width: min( 380px, calc( 100vw - ( var( --margin-m ) * 2 ) ) );
					max-width: min( 380px, calc( 100vw - ( var( --margin-m ) * 2 ) ) );
				}

				@media ( max-width: 650px ) {
					top: calc( var( --margin-s ) + 84px );
					right: var( --margin-s );
					bottom: 180px;
					left: var( --margin-s );
					width: auto;
					max-width: none;
					max-height: none;
				}
			}

			&[ scrollable ][ photogrammetry-library ] {
				@media ( max-width: 650px ) {
					position: fixed;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					width: 100vw;
					height: 100vh;
					height: 100dvh;
					height: calc( var( --vh, 1vh ) * 100 );
					max-width: none;
					max-height: none;
					min-height: 100vh;
					min-height: 100dvh;
					min-height: calc( var( --vh, 1vh ) * 100 );
					padding: 0;
					box-sizing: border-box;
					background: rgba( 0, 0, 0, .96 );
					backdrop-filter: none;
					-webkit-backdrop-filter: none;
					border: none;
					scrollbar-width: none;
					transform: translateX( -100% );

					& default-button {
						display: none;
					}

					& scrolling-block {
						min-height: 100%;
						padding:
							calc( 54px + var( --margin-s ) * 2 )
							var( --margin-s )
							120px;
						box-sizing: border-box;
					}
				}
			}

			[ view-enter ][ display-aside ] &[ scrollable ][ photogrammetry-library ] {
				@media ( max-width: 650px ) {
					transform: translateX( 0 );
				}
			}

			&[ scrollable ][ tag-linked-panel ] {
				& default-button {
					display: flex;
				}

				@media ( max-width: 650px ) {
					position: fixed;
					top: 50%;
					right: auto;
					bottom: auto;
					left: 50%;
					width: min( 420px, calc( 100vw - ( var( --margin-s ) * 2 ) ) );
					max-width: min( 420px, calc( 100vw - ( var( --margin-s ) * 2 ) ) );
					max-height: min( calc( ( var( --vh, 1vh ) * 100 ) - ( var( --margin-s ) * 2 ) ), 70vh );
					padding: calc( 52px + var( --margin-s ) ) var( --margin-s ) var( --margin-s );
					transform: translate( -50%, calc( -50% - 8px ) );

					& default-button {
						position: absolute;
						top: var( --margin-s );
						right: var( --margin-s );
						left: auto;
						margin: 0;
						z-index: 2;
						width: fit-content;
					}

					& scrolling-block {
						padding: 0;
						height: 100%;
					}
				}
			}

			&[ scrollable ][ tag-linked-panel ] {
				opacity: 0;
				visibility: hidden;
				pointer-events: none;
			}

			[ view-enter ] &[ scrollable ][ tag-linked-panel ][ visible ] {
				opacity: 1;
				visibility: visible;
				pointer-events: all;

				@media ( max-width: 650px ) {
					transform: translate( -50%, -50% );
				}
			}

			& scrolling-block {
				position: relative;
				display: flex;
				flex-direction: column;
			}

			& default-button {
				display: none;
				position: absolute
			}

			& h3,
			& h4 {
				font-size: var( --font-size-xl );
				max-width: 600px;

				@media ( max-width: 650px ) {
					font-size: var( --font-size-l );
				}
			}

			& h4 {
				margin-top: 2px;
			}

			& p {
				max-width: 600px;
				font-size: var( --font-size-s );
				font-family: var( --font-family-c );
				line-height: var( --line-height );
				margin-top: var( --margin-s );
			}

		}

		`;

		const buttonAttributes = [ 'close', '@click|aside-block', 'reversed' ];
		const button = { attributes: buttonAttributes };

		if ( attributes.includes( 'tag-linked-panel' ) ) {

			button.attributes.push( 'floating-close' );
			button.labels = [ 'Close' ];

		}

		return html`

		<aside-block ${ attributes.join( ' ' ) } blurred-background>

			<scrolling-block>
				${ innerHTML }
			</scrolling-block>

			${ Button.render( button ) }

		</aside-block>

		`;

	}

}

customElements.define( 'aside-block', Aside );
