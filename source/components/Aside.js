import Button from '~/components/Button';

export default class Aside extends HTMLElement {

	onConnected( index ) {

		this.index = index;

	}

	onClick() {

		Application.store.set( 'display-aside', false );
		this.exit();

	}

	exit() {

		if ( ! this.hasAttribute( 'visible' ) ) return;
		this.toggleAttribute( 'visible', false );

		Application.audio.play( '002.m4a' );
		Application.camera.setOffsetLeftFactor( 0 );

	}

	enter() {

		if ( this.hasAttribute( 'visible' ) ) return;
		this.toggleAttribute( 'visible', true );

		Application.audio.play( '001.m4a' );
		Application.camera.setOffsetLeftFactor( 1 );

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
					padding: var( --margin-m ) var( --margin-s );
					padding-top: calc( var( --margin-m ) * 3 );
				}

				@media ( max-width: 650px ) {
					bottom: 0;
					left: 0;
					right: 0;
					position: relative;
					overflow: visible;
					width: 100%;
					border: none;
				}
			}

			[ view-exit ] & {
				transition:
					transform .5s var( --timing-function ),
					opacity .5s var( --timing-function );
			}

			[ view-enter ] &:not( [ scrollable ] ),
			[ view-enter ][ display-aside ] &[ scrollable ],
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

		const button = { attributes: [ 'close', '@click|aside-block', 'reversed' ] };

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
