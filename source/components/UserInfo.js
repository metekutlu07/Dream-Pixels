export default class UserInfo extends HTMLElement {

	onWheel() {

		this.hide();

	}

	onInputStart() {

		this.hide();

	}

	onPreFrame() {

		if ( this.wasVisible ) return;

		const { list } = Application.store;
		if ( list !== 'sphere' && list !== 'particles' ) return;
		this.wasVisible = true;

		this.removeAttribute( 'hidden' );
		setTimeout( this.hide, 4000 );

	}

	hide() {

		this.toggleAttribute( 'hidden', true );

	}

	static render() {

		const { tutorial } = Application.content;

		css`

		user-info {
			position: fixed;
			z-index: 99;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100vw;
			height: 100vh;
			background: rgba( 0, 0, 0, .75 );
			font-size: var( --font-size-xl );
			text-align: center;
			transition: opacity .5s;
			cursor: default;
			pointer-events: none;

			&[ hidden ] {
				opacity: 0;
			}
		}

		`;

		return html`

		<user-info hidden>
			${ tutorial }
		</user-info>

		`;

	}

}

customElements.define( 'user-info', UserInfo );
