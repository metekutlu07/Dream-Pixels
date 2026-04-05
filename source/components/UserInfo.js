export default class UserInfo extends HTMLElement {

	onConnected() {

		this.syncStep();

	}

	onWheel( event ) {

		this.hideOnInteraction( event );

	}

	onInputStart( event ) {

		this.hideOnInteraction( event );

	}

	onPreFrame() {

		const { path, list, places, particles } = Application.store;
		const introReady = Application.store[ 'intro-ready' ];
		const pixelExperienceStarted = Application.store[ 'pixel-experience-started' ];
		const uiReady = Application.store[ 'ui-ready' ];
		const particleUserInfoSeen = Application.store[ 'particle-user-info-seen' ];
		const { texts } = this.elements;

		texts.forEach( text => {

			const name = text.getAttribute( 'name' );
			const wasVisible = text.hasAttribute( 'visible' );
			const seenOnce = text.hasAttribute( 'seen-once' );

			const isVisible = (

				( path === '/experiments' && list === 'sphere' && name === 'Images' ) ||
				(
					path === '/experiments' &&
					list === 'particles' &&
					name === 'Particles' &&
					pixelExperienceStarted &&
					uiReady
				) ||
				( path === '/experiments' && list === 'places' && places === 'world' && name === 'World' ) ||
				( path === '/experiments' && list === 'places' && places === 'cosmos' && name === 'Cosmos' )

			);

			text.toggleAttribute( 'visible', isVisible );

			if ( ! isVisible ) {

				if ( wasVisible ) text.toggleAttribute( 'seen-once', true );

				if ( text.hasAttribute( 'seen-once' ) || ( name === 'Particles' && particleUserInfoSeen ) ) {

					text.toggleAttribute( 'hidden', true );
					text.toggleAttribute( 'dismissed', true );

				} else {

					text.toggleAttribute( 'hidden', false );
					text.toggleAttribute( 'dismissed', false );

				}

				text.setAttribute( 'step', '0' );
				this.syncStep( text );
				return;

			}

			if ( seenOnce || ( name === 'Particles' && particleUserInfoSeen ) ) {

				text.toggleAttribute( 'hidden', true );
				text.toggleAttribute( 'dismissed', true );
				return;

			}

			if (
				name === 'Particles' &&
				particles === 'timeline'
			) {

				text.toggleAttribute( 'seen-once', true );
				text.toggleAttribute( 'hidden', true );
				text.toggleAttribute( 'dismissed', true );
				Application.store.set( 'particle-user-info-seen', true );
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
		event.preventDefault();
		event.stopPropagation();
		const text = currentTarget.closest( 'user-info-text' );
		if ( ! text ) return;

		if ( currentTarget.hasAttribute( 'next' ) ) {

			const step = parseInt( text.getAttribute( 'step' ) || '0' ) + 1;
			text.setAttribute( 'step', step );
			this.syncStep( text );
			return;

		}

		if ( currentTarget.hasAttribute( 'explore' ) ) {

			if ( text.getAttribute( 'name' ) === 'Images' ) {

				Application.store.set( 'block-image-preview-until', Application.time.elapsedTime + 400 );

			}

			text.toggleAttribute( 'seen-once', true );

			if ( text.getAttribute( 'name' ) === 'Particles' ) {

				Application.store.set( 'particle-archive-entered', true );
				Application.store.set( 'particle-user-info-seen', true );

			}
			text.toggleAttribute( 'dismissed', true );
			this.hide();

		}

		if ( currentTarget.hasAttribute( 'close' ) ) {

			text.toggleAttribute( 'seen-once', true );

			if ( text.getAttribute( 'name' ) === 'Particles' ) {

				Application.store.set( 'particle-archive-entered', true );
				Application.store.set( 'particle-user-info-seen', true );

			}

			text.toggleAttribute( 'dismissed', true );
			this.hide();

		}

	}

	hideOnInteraction( event ) {

		const isMobile = typeof matchMedia !== 'undefined' &&
			matchMedia( '(max-width: 650px)' ).matches;
		if ( isMobile ) return;

		const { texts } = this.elements;
		const activeText = texts.find( text => text.hasAttribute( 'visible' ) && ! text.hasAttribute( 'hidden' ) );
		if ( ! activeText ) return;
		if ( activeText.getAttribute( 'name' ) === 'Particles' ) return;
		if ( event?.composedPath?.().includes( activeText ) ) return;
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

			const isMobile = typeof matchMedia !== 'undefined' &&
				matchMedia( '(max-width: 650px)' ).matches;
			const name = text.getAttribute( 'name' );
			const step = parseInt( text.getAttribute( 'step' ) || '0' );
			const index = Math.clamp( step, 0, text.steps.length - 1 );
			const activeIndex = isMobile && name === 'Particles' ? 0 : index;
			const { title, paragraphs, cue } = text.steps[ activeIndex ];
			const titleElement = text.querySelector( 'h5' );
			const paragraphElement = text.querySelector( 'p' );
			const nextButton = text.querySelector( '[ next ]' );
			const exploreButton = text.querySelector( '[ explore ]' );
			const closeButton = text.querySelector( '[ close ]' );

			if ( titleElement ) titleElement.innerHTML = title || '';
			if ( paragraphElement ) paragraphElement.innerHTML = paragraphs || '';
			if ( cue ) text.setAttribute( 'cue', cue );
			else text.removeAttribute( 'cue' );
			if ( isMobile && name === 'Particles' ) text.setAttribute( 'cue', 'mobile' );
			if ( nextButton ) nextButton.toggleAttribute( 'hidden', isMobile && name === 'Particles' ? true : index >= text.steps.length - 1 );
			if ( exploreButton ) exploreButton.toggleAttribute( 'visible', isMobile && name === 'Particles' ? true : index >= text.steps.length - 1 );
			if ( closeButton ) closeButton.toggleAttribute( 'hidden', isMobile && name === 'Particles' ? true : index !== 0 );
			text.toggleAttribute( 'last-step', isMobile && name === 'Particles' ? true : index >= text.steps.length - 1 );

		} );

	}

	hide() {

		const { texts } = this.elements;
		texts.forEach( text => {

			if ( ! text.hasAttribute( 'visible' ) ) return;
			text.toggleAttribute( 'seen-once', true );
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
			transition: opacity 1s;
			opacity: 0;
			pointer-events: none;
			border: 1px solid var( --color-white );

			&[ name="World" ],
			&[ name="Cosmos" ] {
				top: 50%;
				left: 50%;
				bottom: auto;
				width: 780px;
				max-width: calc( 100vw - 64px );
				padding: 22px 28px 20px;
				box-sizing: border-box;
				overflow: hidden;
				isolation: isolate;
				transform: translate( -50%, -50% );
				background: rgba( 0, 0, 0, .28 );
				backdrop-filter: blur( 10px );
				-webkit-backdrop-filter: blur( 10px );
				border: var( --border-size ) solid var( --border-color );

				& h5 {
					display: none;
				}

				& p {
					margin-top: 0;
					font-size: 18px;
					line-height: 1.6;
				}

				& user-info-actions {
					padding-top: 36px;
					display: flex;
					justify-content: center;
				}

				& user-info-button {
					cursor: pointer;
					min-width: 0;
					padding: 12px 18px;
					border: var( --border-size ) solid var( --border-color );
					background: rgba( 0, 0, 0, .18 );
					font-family: var( --font-family-b );
					font-size: 16px;
					letter-spacing: .08em;
					text-transform: uppercase;
				}
			}

				&[ name="Images" ] {
					bottom: auto;
					top: 50%;
					left: 50%;
					overflow: hidden;
					isolation: isolate;
					transform: translate( -50%, -50% );
					width: min( 520px, calc( 100vw - 64px ) );
					padding: 20px 22px 18px;
					background: rgba( 0, 0, 0, .28 );
					backdrop-filter: blur( 10px );
					-webkit-backdrop-filter: blur( 10px );
					border: var( --border-size ) solid var( --border-color );

				& h5 {
					display: none;
				}

				& p {
					margin-top: 0;
					font-size: 18px;
					line-height: 1.6;
				}

				& user-info-actions {
					padding-top: 36px;
					display: flex;
					justify-content: center;
				}

					& user-info-button {
						cursor: pointer;
						min-width: 0;
						padding: 12px 18px;
						border: var( --border-size ) solid var( --border-color );
						background: rgba( 0, 0, 0, .18 );
						font-family: var( --font-family-b );
						font-size: 16px;
					letter-spacing: .08em;
					text-transform: uppercase;
				}
			}

			@media ( max-width: 1024px ) {
				bottom: 160px;
				padding: var( --margin-s );
				margin: 0 var( --margin-m );

				&[ name="World" ],
				&[ name="Cosmos" ] {
					top: 50%;
					bottom: auto;
					left: 50%;
					transform: translate( -50%, -50% );
				}

				&[ name="Images" ] {
					top: 50%;
					bottom: auto;
					left: 50%;
					transform: translate( -50%, -50% );
				}
			}

			@media ( max-width: 650px ) {
				&[ name="World" ],
				&[ name="Images" ],
				&[ name="Cosmos" ] {
					top: 50%;
					right: auto;
					bottom: auto;
					left: 50%;
					margin: 0;
					transform: translate( -50%, -50% );
					width: calc( 100vw - 40px );
					max-width: calc( 100vw - 40px );
					padding: 18px 18px 16px;

					& p {
						font-size: 15px;
						line-height: 1.5;
						text-align: center;
					}

					& user-info-actions {
						padding-top: 22px;
					}

					& user-info-button {
						width: auto;
						min-width: 120px;
						padding: 11px 18px;
						font-size: 15px;
					}
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

			[ path="/experiments" ][ list="particles" ]:not( [ intro-ready ] ) & {
				opacity: 0;
				pointer-events: none;
			}

			&[ name="Particles" ] {
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				transform: none;
				width: 100%;
				height: 100%;
				min-height: 0;
				padding: 0;
				box-sizing: border-box;
				background: none;
				border: none;
				pointer-events: none;

				& user-info-guide {
					position: absolute;
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 14px;
					max-width: 380px;
					transition: opacity 1s var( --timing-function );
					will-change: opacity;
					pointer-events: all;
					overflow: hidden;
					isolation: isolate;
					transform: translateZ( 0 );

					&::before {
						content: '';
						position: absolute;
						inset: 0;
						z-index: 0;
						transform: translateZ( 0 );
					}
				}

				& user-info-copy {
					position: relative;
					z-index: 1;
					padding: 22px 26px 20px;
					border: var( --border-size ) solid var( --border-color );
					text-align: center;
				}

				& h5 {
					display: none;
				}

				& p {
					margin-top: 0;
					font-size: 18px;
					line-height: 1.5;
					text-align: center;
				}

				& user-info-actions {
					padding-top: 36px;
					display: flex;
					justify-content: center;
					gap: 12px;
				}

				& user-info-button {
					cursor: pointer;
					min-width: 0;
					padding: 14px 20px;
					border: 1px solid rgba( 255, 255, 255, .9 );
					background: rgba( 0, 0, 0, .12 );
					font-family: var( --font-family-b );
					font-size: 18px;
					letter-spacing: .08em;
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

				& user-info-visual {
					position: relative;
					z-index: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					color: rgba( 255, 255, 255, .92 );
					font-family: var( --font-family-c );
					font-size: 3rem;
					letter-spacing: .04em;
				}

				&[ cue="intro" ] user-info-guide {
					top: 50%;
					left: 50%;
					transform: translate( -50%, -50% );
					width: 480px;
					max-width: calc( 100vw - 80px );
					min-height: 292px;
					box-sizing: border-box;
					padding: 22px 26px 20px;
					transition: opacity 1s var( --timing-function );
					background: rgba( 0, 0, 0, .28 );
					backdrop-filter: blur( 10px );
					-webkit-backdrop-filter: blur( 10px );
					border: var( --border-size ) solid var( --border-color );

					&::before {
						display: none;
					}
				}

				&[ cue="intro" ] user-info-copy {
					padding: 0;
					background: none;
					backdrop-filter: none;
					-webkit-backdrop-filter: none;
					border: none;
				}

				&[ cue="intro" ] user-info-copy {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					gap: 12px;
					width: 100%;
					height: 100%;
				}

				&[ cue="intro" ] p {
					width: 100%;
					max-width: 100%;
					overflow-wrap: anywhere;
					text-align: center;
				}

				&[ cue="intro" ] p {
					text-align: left;
				}

				&[ cue="intro" ] user-info-visual {
					display: none;
				}

				&[ cue="spectrum" ] user-info-guide {
					top: 50%;
					right: calc( var( --margin-m ) + 196px );
					transform: translateY( -50% );
					width: 380px;
					flex-direction: row;
					align-items: center;
					gap: 26px;
					background: rgba( 0, 0, 0, .28 );
					backdrop-filter: blur( 10px );
					-webkit-backdrop-filter: blur( 10px );
					border: var( --border-size ) solid var( --border-color );

					&::before {
						display: none;
					}

					& user-info-copy {
						order: 1;
						width: 520px;
						background: none;
						backdrop-filter: none;
						-webkit-backdrop-filter: none;
						border: none;
						text-align: left;
					}
				}

				&[ cue="spectrum" ] user-info-visual {
					order: 2;
					width: 72px;
					height: 72px;

					&::after {
						content: '→';
						font-size: 5.4rem;
						line-height: 1;
					}
				}

				&[ cue="viewpoint" ] user-info-guide {
					left: 50%;
					bottom: 270px;
					transform: translateX( -50% );
					width: 800px;
					max-width: calc( 100vw - 80px );
					height: 210px;
					background: rgba( 0, 0, 0, .28 );
					backdrop-filter: blur( 10px );
					-webkit-backdrop-filter: blur( 10px );
					border: var( --border-size ) solid var( --border-color );

					&::before {
						display: none;
					}
				}

				&[ cue="viewpoint" ] user-info-copy {
					order: 1;
					margin-bottom: 14px;
					width: 860px;
					background: none;
					backdrop-filter: none;
					-webkit-backdrop-filter: none;
					border: none;
				}

				&[ cue="viewpoint" ] user-info-visual {
					order: 2;
					width: 72px;
					height: 72px;
					transform: translateY( -10px );

					&::before {
						content: '↓';
						font-size: 5.4rem;
						line-height: 1;
					}
				}

				&[ cue="spectrum" ] p {
					text-align: left;
					white-space: nowrap;
				}

				&[ visible ]:not( [ hidden ] ) {
					opacity: 1;
					pointer-events: none;

					& user-info-guide {
						opacity: 1;
						pointer-events: all;
					}
				}

				&:not( [ visible ] ) {
					pointer-events: none;

					& user-info-guide {
						opacity: .001;
						pointer-events: none;
					}
				}

				&[ hidden ] {
					opacity: 1;
					pointer-events: none;

					& user-info-guide {
						opacity: .001;
						pointer-events: none;
					}
				}

				[ path="/experiments" ][ list="particles" ]:not( [ intro-ready ] ) & {
					opacity: 1;
					pointer-events: none;

					& user-info-guide {
						opacity: .001;
						pointer-events: none;
					}
				}

				@media ( max-width: 1024px ) {
					&[ cue="spectrum" ] user-info-guide {
						right: calc( var( --margin-m ) + 148px );
					}

					&[ cue="viewpoint" ] user-info-guide {
						bottom: 132px;
					}
				}

				@media ( max-width: 650px ) {
					left: 50%;
					right: auto;
					bottom: auto;
					margin: 0;
					transform: translate( -50%, -50% );
					width: calc( 100vw - ( var( --margin-s ) * 2 ) );
					max-width: calc( 100vw - ( var( --margin-s ) * 2 ) );
					padding: 18px 18px 16px;

					&[ name="World" ],
					&[ name="Images" ],
					&[ name="Cosmos" ] {
						top: 50%;
						left: 50%;
						bottom: auto;
						transform: translate( -50%, -50% );
						width: calc( 100vw - ( var( --margin-s ) * 2 ) );
						max-width: calc( 100vw - ( var( --margin-s ) * 2 ) );
						padding: 18px 18px 16px;

						& p {
							font-size: 15px;
							line-height: 1.55;
							text-align: center;
						}

						& user-info-actions {
							padding-top: 24px;
						}

						& user-info-button {
							width: auto;
							min-width: 120px;
							padding: 11px 18px;
							font-size: 15px;
						}
					}

					& user-info-guide {
						max-width: calc( 100vw - 32px );
					}

					& user-info-copy {
						padding: 18px 18px 16px;
					}

					& p {
						font-size: 16px;
					}

					& user-info-actions {
						padding-top: 18px;
						flex-wrap: wrap;
					}

					& user-info-button {
						width: 100%;
						font-size: 16px;
					}

					&[ cue="mobile" ] user-info-guide {
						top: calc( 50% + 18px );
						left: 50%;
						right: auto;
						bottom: auto;
						transform: translate( -50%, -50% );
						width: calc( 100vw - 40px );
						max-width: calc( 100vw - 40px );
						min-height: auto;
						padding: 18px 18px 16px;
						background: rgba( 0, 0, 0, .28 );
						backdrop-filter: blur( 10px );
						-webkit-backdrop-filter: blur( 10px );
						border: var( --border-size ) solid var( --border-color );
					}

					&[ cue="mobile" ] user-info-copy {
						width: 100%;
						padding: 0;
						background: none;
						backdrop-filter: none;
						-webkit-backdrop-filter: none;
						border: none;
					}

					&[ cue="mobile" ] user-info-visual {
						display: none;
					}

					&[ cue="mobile" ] p {
						font-size: 15px;
						line-height: 1.5;
						text-align: center;
					}

					&[ cue="mobile" ] user-info-actions {
						padding-top: 24px;
					}

					&[ cue="mobile" ] user-info-button {
						width: auto;
						min-width: 120px;
						padding: 11px 18px;
						font-size: 15px;
					}

					&[ cue="intro" ] user-info-guide {
						top: 50%;
						width: calc( 100vw - 32px );
						max-width: calc( 100vw - 32px );
						min-height: 240px;
					}

					&[ cue="spectrum" ] user-info-guide {
						right: calc( var( --margin-s ) + 84px );
						gap: 10px;

						& user-info-copy {
							width: 100%;
						}
					}

					&[ cue="viewpoint" ] user-info-guide {
						bottom: 156px;
					}

					&[ cue="intro" ] user-info-copy {
						width: 100%;
					}

					&[ cue="spectrum" ] p {
						white-space: normal;
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
				${ name === 'Particles' && steps ? html`
					<user-info-guide>
						<user-info-visual></user-info-visual>
						<user-info-copy>
							<h5>${ steps[ 0 ].title }</h5>
							<p>${ steps[ 0 ].paragraphs }</p>
							<user-info-actions>
								<user-info-button next @click|user-info>Next</user-info-button>
								<user-info-button close @click|user-info>Close</user-info-button>
								<user-info-button explore @click|user-info>Start</user-info-button>
							</user-info-actions>
						</user-info-copy>
					</user-info-guide>
					` : name === 'Images' && steps ? html`
						<h5>${ steps[ 0 ].title }</h5>
						<p>${ steps[ 0 ].paragraphs }</p>
						<user-info-actions>
							<user-info-button explore @click|user-info>Start</user-info-button>
						</user-info-actions>
					` : name === 'World' || name === 'Cosmos' ? html`
						<h5>${ title || '' }</h5>
						<p>${ paragraphs || '' }</p>
						<user-info-actions>
							<user-info-button explore @click|user-info>Start</user-info-button>
						</user-info-actions>
					` : html`
						<h5>${ steps ? steps[ 0 ].title : ( title || '' ) }</h5>
						<p>${ steps ? steps[ 0 ].paragraphs : ( paragraphs || '' ) }</p>
					${ steps ? html`
						<user-info-actions>
							<user-info-button next @click|user-info>Continue</user-info-button>
							<user-info-button explore @click|user-info>Enter the Archive</user-info-button>
						</user-info-actions>
					` : '' }
				` }
			</user-info-text>

			` );

		return html`

		<user-info>${ list }</user-info>

		`;

	}

}

customElements.define( 'user-info', UserInfo );
