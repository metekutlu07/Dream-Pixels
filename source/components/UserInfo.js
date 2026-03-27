export default class UserInfo extends HTMLElement {

	onConnected() {

		this.syncStep();

	}

	onWheel() {

		this.hideOnInteraction();

	}

	onInputStart() {

		this.hideOnInteraction();

	}

	onPreFrame() {

		const { path, list, places } = Application.store;
		const introReady = Application.store[ 'intro-ready' ];
		const { texts } = this.elements;

		texts.forEach( text => {

			const name = text.getAttribute( 'name' );

			const isVisible = (

				( path === '/works' && list === 'sphere' && name === 'Images' ) ||
				( path === '/works' && list === 'particles' && name === 'Particles' ) ||
				( path === '/works' && list === 'places' && places === 'cosmos' && name === 'Cosmos' )

			);

			text.toggleAttribute( 'visible', isVisible );

			if ( ! isVisible ) {

				text.toggleAttribute( 'hidden', false );
				text.toggleAttribute( 'dismissed', false );
				text.setAttribute( 'step', '0' );
				this.syncStep( text );
				return;

			}

			if (
				name === 'Particles' &&
				introReady &&
				! text.hasAttribute( 'dismissed' )
			) text.toggleAttribute( 'hidden', false );

			if ( isVisible && ! text.hasAttribute( 'hidden' ) ) {

				const totalSteps = parseInt( text.getAttribute( 'steps' ) || '1' );
				const step = parseInt( text.getAttribute( 'step' ) || '0' );
				text.toggleAttribute( 'last-step', step >= totalSteps - 1 );

			}

		} );

	}

	onClick( event ) {

		const { currentTarget } = event;
		const text = currentTarget.closest( 'user-info-text' );
		if ( ! text ) return;

		if ( currentTarget.hasAttribute( 'next' ) ) {

			const step = parseInt( text.getAttribute( 'step' ) || '0' ) + 1;
			text.setAttribute( 'step', step );
			this.syncStep( text );
			return;

		}

		if ( currentTarget.hasAttribute( 'explore' ) ) {

			text.toggleAttribute( 'dismissed', true );
			this.hide();

		}

	}

	hideOnInteraction() {

		const { texts } = this.elements;
		const activeText = texts.find( text => text.hasAttribute( 'visible' ) && ! text.hasAttribute( 'hidden' ) );
		if ( ! activeText ) return;
		if ( activeText.getAttribute( 'name' ) === 'Particles' ) return;
		this.hide();

	}

	syncStep( target = this.elements.texts ) {

		const texts = Array.isArray( target ) ? target : [ target ];

		texts.forEach( text => {

			if ( ! text ) return;

			if ( ! text.steps ) {

				const { user_infos } = Application.content;
				const { steps } = user_infos[ text.getAttribute( 'name' ) ] || {};
				if ( steps ) text.steps = steps;

			}

			if ( ! text.steps ) return;

			const step = parseInt( text.getAttribute( 'step' ) || '0' );
			const index = Math.clamp( step, 0, text.steps.length - 1 );
			const { title, paragraphs } = text.steps[ index ];
			const titleElement = text.querySelector( 'h5' );
			const paragraphElement = text.querySelector( 'p' );
			const nextButton = text.querySelector( '[ next ]' );
			const exploreButton = text.querySelector( '[ explore ]' );

			if ( titleElement ) titleElement.innerHTML = title || '';
			if ( paragraphElement ) paragraphElement.innerHTML = paragraphs || '';
			if ( nextButton ) nextButton.toggleAttribute( 'hidden', index >= text.steps.length - 1 );
			if ( exploreButton ) exploreButton.toggleAttribute( 'visible', index >= text.steps.length - 1 );
			text.toggleAttribute( 'last-step', index >= text.steps.length - 1 );

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
    		height: calc(var(--vh, 1vh) * 100);
			font-size: 3rem;
			pointer-events: none;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
		}

		user-info-text {
			position: absolute;
			bottom: 180px;
			padding: var( --margin-s ) var( --margin-m );
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			transition: opacity .75s;
			opacity: 0;
			pointer-events: none;
			border: 1px solid var( --color-white );

			&[ name="Images" ] {
				bottom: 120px;
			}

			@media ( max-width: 1024px ) {
				bottom: 160px;
				padding: var( --margin-s );
				margin: 0 var( --margin-m );

				&[ name="Images" ] {
					bottom: 100px;
				}
			}

			& h5 {
				font-size: var( --font-size-l );
				font-family: var( --font-family-b );
				line-height: 1.4;

				@media ( max-width: 650px ) {
					font-size: var( --font-size-s );
					& br {
						display: none;
					}
				}
			}

			& p {
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );
				margin-top: var( --margin-xs );
				line-height: 1.6;

				@media ( max-width: 650px ) {
					font-size: var( --font-size-xxs );

					& br {
						display: none;
					}
				}
			}

			&[ visible ]:not( [ hidden ] ) {
				opacity: 1;
				pointer-events: all;
			}

			&[ hidden ] {
				opacity: 0;
				pointer-events: none;
			}

			[ path="/works" ][ list="particles" ]:not( [ intro-ready ] ) & {
				opacity: 0;
				pointer-events: none;
			}

			&[ name="Particles" ] {
				top: 50%;
				bottom: auto;
				left: 50%;
				transform: translate( -50%, -50% );
				width: min( 900px, calc( 100vw - 120px ) );
				min-height: 540px;
				padding: 34px 44px 32px;
				box-sizing: border-box;
				background: rgba( 6, 6, 8, .84 );
				border-color: rgba( 255, 255, 255, .22 );

				& h5 {
					font-size: clamp( 2.6rem, 2.2vw, 3.9rem );
					font-family: var( --font-family-a );
					line-height: 1.3;
					letter-spacing: .03em;
					max-width: none;
					width: 100%;
					text-align: left;
				}

				& p {
					margin-top: 24px;
					font-size: clamp( 1.4rem, 1.2vw, 1.9rem );
					line-height: 1.65;
					max-width: none;
					width: 100%;
					text-align: left;

					& strong {
						display: inline-block;
						font-family: var( --font-family-a );
						font-size: 1.05em;
						letter-spacing: .04em;
						text-transform: uppercase;
						color: rgba( 255, 255, 255, .96 );
					}
				}

				& user-info-actions {
					margin-top: auto;
					padding-top: 34px;
					display: flex;
					justify-content: center;
					gap: 12px;
				}

				& user-info-button {
					cursor: pointer;
					min-width: 200px;
					padding: 14px 24px;
					border: 1px solid rgba( 255, 255, 255, .3 );
					background: rgba( 0, 0, 0, .88 );
					font-family: var( --font-family-b );
					font-size: clamp( 1.45rem, 1vw, 1.8rem );
					letter-spacing: .12em;
					text-transform: uppercase;
					transition: background-color .35s var( --timing-function ), border-color .35s var( --timing-function ), opacity .35s var( --timing-function );

					@media ( hover: hover ) {
						&:hover {
							background: rgba( 255, 255, 255, .08 );
							border-color: rgba( 255, 255, 255, .5 );
						}
					}

					&[ hidden ] {
						display: none;
					}

					&:not( [ visible ] )[ explore ] {
						display: none;
					}
				}

				@media ( max-width: 1024px ) {
					width: calc( 100vw - 64px );
					min-height: 500px;
					padding: 28px 30px 26px;
				}

				@media ( max-width: 650px ) {
					width: calc( 100vw - 32px );
					min-height: 440px;

					& h5 {
						font-size: var( --font-size-m );
					}

					& p {
						font-size: var( --font-size-xxs );
					}

					& user-info-actions {
						padding-top: 28px;
					}

					& user-info-button {
						min-width: 170px;
						padding: 12px 18px;
					}
				}
			}
		}

		`;

		const list = Object
			.entries( user_infos )
			.map( ( [ name, { title, paragraphs, steps } ] ) => html`

			<user-info-text
				#texts
				name="${ name }"
				step="0"
				steps="${ steps ? steps.length : 1 }"
			>
				<h5>${ steps ? steps[ 0 ].title : ( title || '' ) }</h5>
				<p>${ steps ? steps[ 0 ].paragraphs : ( paragraphs || '' ) }</p>
				${ steps ? html`
					<user-info-actions>
						<user-info-button next @click|user-info>Continue</user-info-button>
						<user-info-button explore @click|user-info>Enter the Archive</user-info-button>
					</user-info-actions>
				` : '' }
			</user-info-text>

			` );

		return html`

		<user-info>${ list }</user-info>

		`;

	}

}

customElements.define( 'user-info', UserInfo );
