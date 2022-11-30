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
			font-size: var( --font-size-xl );
			pointer-events: none;
		}

		user-info-text {
			position: absolute;
			display: flex;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100vw;
			height: 100vh;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			text-align: center;
			transition: opacity 1s;
			background: rgba( 0, 0, 0, .8 );
			opacity: 0;

			& p {
				font-family: var( --font-family-c );
				font-size: var( --font-size-m );
				margin-top: 5px;
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
			<user-info-text #texts>
				<h5>${ tutorial[ 0 ].title }</h5>
			</user-info-text>
			<user-info-text #texts>
				<h5>${ tutorial[ 1 ].title }</h5>
				<p>${ tutorial[ 1 ].subtitle }</p>
			</user-info-text>
		</user-info>

		`;

	}

}

customElements.define( 'user-info', UserInfo );
