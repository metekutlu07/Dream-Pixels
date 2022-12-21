export default class UserInfo extends HTMLElement {

	onWheel() {

		this.hide();

	}

	onInputStart() {

		this.hide();

	}

	onPreFrame() {

		const { path, list, places } = Application.store;
		const { texts } = this.elements;

		texts.forEach( text => {

			const name = text.getAttribute( 'name' );

			const isVisible = (

				( path === '/works' && list === 'sphere' && name === 'Images' ) ||
				( path === '/works' && list === 'particles' && name === 'Particles' ) ||
				( path === '/works' && list === 'places' && places === 'cosmos' && name === 'Cosmos' )

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

		const { user_infos } = Application.content;

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
			transition: opacity .75s;
			opacity: 0;
			border: 1px solid var( --color-white );

			&[ name="Images" ] {
				bottom: 100px;
			}

			& h5 {
				font-size: var( --font-size-l );
				font-family: var( --font-family-b );
				line-height: 1.4;
			}

			& p {
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );
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

		const list = Object
			.entries( user_infos )
			.map( ( [ name, { title, paragraphs } ] ) => html`

			<user-info-text #texts blurred-background name="${ name }">
				${ title ? html`<h5>${ title }</h5>` : '' }
				${ paragraphs ? html`<p>${ paragraphs }</p>` : '' }
			</user-info-text>

			` );

		return html`

		<user-info>${ list }</user-info>

		`;

	}

}

customElements.define( 'user-info', UserInfo );
