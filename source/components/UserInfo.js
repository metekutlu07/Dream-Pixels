export default class UserInfo extends HTMLElement {

	onWheel() {

		this.hide();

	}

	onInputStart() {

		this.hide();

	}

	onPreFrame() {

		const { list, path } = Application.store;
		const { texts } = this.elements;

		texts.forEach( ( text, index ) => {

			const isVisible = path === '/works' && (

				( list === 'sphere' && index === 0 ) ||
				( list === 'particles' && index === 1 )

			);

			text.toggleAttribute( 'visible', isVisible );

		} );

	}

	hide() {

		const { texts } = this.elements;
		texts.forEach( text => {

			if ( ! text.hasAttribute( 'visible' ) ) return;
			text.toggleAttribute( 'hidden', true );

		} );

	}

	static render() {

		const { tutorial } = Application.content;

		css`

		user-info {
			position: fixed;
			z-index: 15;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			font-size: 3rem;
			pointer-events: none;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
		}

		user-info-text {
			position: absolute;
			bottom: 160px;
			padding: var( --margin-s ) var( --margin-m );
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			transition: opacity .1s;
			opacity: 0;
			border: 1px solid var( --color-white );

			&:first-child {
				bottom: 100px;
			}

			& h5 {
				font-size: var( --font-size-m );
			}

			& p {
				font-family: var( --font-family-c );
				font-size: var( --font-size-xs );
				margin-top: var( --margin-xs );
				line-height: 1.6;
			}

			&[ visible ] {
				opacity: 1;
			}

			&[ hidden ] {
				opacity: 0;
			}
		}

		`;

		return html`

		<user-info>
			<user-info-text #texts blurred-background>
				<h5>${ tutorial[ 0 ].title }</h5>
			</user-info-text>
			<user-info-text #texts blurred-background>
				<h5>${ tutorial[ 1 ].title }</h5>
				<p>${ tutorial[ 1 ].subtitle }</p>
			</user-info-text>
		</user-info>

		`;

	}

}

customElements.define( 'user-info', UserInfo );
