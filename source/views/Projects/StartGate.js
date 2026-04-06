import Maximize from '~/assets/icons/Maximize';
import Minimize from '~/assets/icons/Minimize';
import Speaker from '~/assets/icons/Speaker';
import Muted from '~/assets/icons/Muted';

export default class StartGate extends HTMLElement {

	onDisconnected() {

		clearTimeout( this.startTimeout );
		clearTimeout( this.backgroundTimeout );

	}

	onConnected() {

		this.syncState();

	}

	onKeyDown( event ) {

		if ( event.code !== 'Enter' ) return;
		this.start();

	}

	onClick( event ) {

		const { currentTarget } = event;
		const { fullscreen, audio } = Application;

		if ( currentTarget.hasAttribute( 'fullscreen' ) ) fullscreen.toggle();
		if ( currentTarget.hasAttribute( 'audio' ) ) audio.toggle();
		if ( currentTarget.hasAttribute( 'enter' ) ) this.start();

		this.syncState();

	}

	onPreFrame() {

		this.syncState();

	}

	start() {

		const { path, list, particles } = Application.store;
		const isPixelLanding = (
			path === '/experiments' &&
			list === 'particles' &&
			particles === 'color-range'
		);

		if ( ! isPixelLanding ) return;
		if ( Application.store[ 'pixel-experience-started' ] ) return;

		Application.particles?.ensureColorsReady?.();

		Application.store.set( 'pixel-experience-gate-visible', false );
		Application.store.set( 'pixel-experience-background-visible', false );
		Application.store.set( 'pixel-experience-transitioning', true );

		clearTimeout( this.backgroundTimeout );
		clearTimeout( this.startTimeout );

		this.backgroundTimeout = setTimeout( () => {

			Application.store.set( 'pixel-experience-background-visible', true );

		}, 1000 );

		this.startTimeout = setTimeout( () => {

			Application.store.set( 'pixel-experience-started', true );
			Application.store.set( 'pixel-experience-transitioning', false );
			Application.events.dispatch( 'onModeChange' );

		}, 2000 );

	}

	syncState() {

		const { path, list, particles } = Application.store;
		const pixelExperienceTransitioning = Application.store[ 'pixel-experience-transitioning' ];
		const pixelExperienceGateVisible = Application.store[ 'pixel-experience-gate-visible' ];
		const isVisible = (
			path === '/experiments' &&
			list === 'particles' &&
			particles === 'color-range' &&
			pixelExperienceGateVisible &&
			! Application.store[ 'pixel-experience-started' ] &&
			! pixelExperienceTransitioning
		);

		this.toggleAttribute( 'visible', isVisible );

		const fullscreenOption = this.querySelector( 'start-gate-option[ fullscreen ]' );
		const audioOption = this.querySelector( 'start-gate-option[ audio ]' );

		if ( fullscreenOption ) fullscreenOption.toggleAttribute( 'active', Application.fullscreen.isActive );
		if ( audioOption ) audioOption.toggleAttribute( 'active', ! Application.audio.isMuted );

	}

	static render() {

		css`

		projects-start-gate {
			position: fixed;
			inset: 0;
			z-index: 31;
			display: flex;
			align-items: center;
			justify-content: center;
			opacity: 0;
			pointer-events: none;
			transition: opacity .45s var( --timing-function );

			&[ visible ] {
				opacity: 1;
				pointer-events: all;
			}
		}

		start-gate-panel {
			width: min( 980px, calc( 100vw - 120px ) );
			padding: 60px 36px 48px;
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		start-gate-copy {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 28px;

			& h2 {
				font-family: var( --font-family-a );
				font-size: clamp( 3.2rem, 3.4vw, 5.2rem );
				line-height: 1.05;
				letter-spacing: .05em;
				text-transform: uppercase;
			}

			& p {
				font-family: var( --font-family-c );
				font-size: clamp( 1.6rem, 1.2vw, 2rem );
				line-height: 1.8;
				max-width: 34ch;
			}
		}

		start-gate-actions {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			margin-top: 50px;
		}

		start-gate-options {
			display: flex;
			align-items: flex-start;
			justify-content: center;
			gap: clamp( 52px, 7vw, 108px );
			width: 100%;
		}

		start-gate-option {
			cursor: pointer;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 18px;
			color: rgba( 255, 255, 255, .78 );
			transition: color .35s var( --timing-function );

			@media ( hover: hover ) {
				&:hover {
					color: var( --color-white );
					& start-gate-option-frame {
						box-shadow: inset 0 0 0 var( --border-size ) rgba( 255, 255, 255, 1 );
						background: rgba( 0, 0, 0, .95 );
					}
				}
			}

			&[ active ] {
				color: var( --color-green );

				& start-gate-option-frame {
					box-shadow: inset 0 0 0 var( --border-size ) currentColor;
				}
			}
		}

		start-gate-option-frame {
			width: clamp( 82px, 6vw, 98px );
			height: clamp( 82px, 6vw, 98px );
			display: flex;
			align-items: center;
			justify-content: center;
			border: none;
			box-shadow: inset 0 0 0 var( --border-size ) rgba( 255, 255, 255, 1 );
			background: rgba( 0, 0, 0, .9 );
			transition: box-shadow .35s var( --timing-function ), background-color .35s var( --timing-function ), color .35s var( --timing-function );

			& svg {
				width: 34px;
				height: 34px;
			}

			& path {
				fill: currentColor !important;
			}
		}

		start-gate-option-icon {
			display: flex;
			align-items: center;
			justify-content: center;

			& > *:nth-child( 2 ) {
				display: none;
			}

			[ active ] & > *:first-child {
				display: none;
			}

			[ active ] & > *:nth-child( 2 ) {
				display: block;
			}
		}

		start-gate-option-label {
			font-family: var( --font-family-b );
			font-size: clamp( 1.35rem, 1vw, 1.7rem );
			letter-spacing: .08em;
			text-transform: uppercase;
		}

		start-gate-enter {
			cursor: pointer;
			margin-top: 76px;
			padding: 16px 46px;
			min-width: 220px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: none;
			box-shadow: inset 0 0 0 var( --border-size ) rgba( 255, 255, 255, 1 );
			font-family: var( --font-family-b );
			font-size: clamp( 1.6rem, 1.1vw, 1.95rem );
			letter-spacing: .1em;
			text-transform: uppercase;
			color: var( --color-white );
			background: rgba( 0, 0, 0, .92 );
			transition: background-color .35s var( --timing-function ), box-shadow .35s var( --timing-function ), color .35s var( --timing-function );

			@media ( hover: hover ) {
				&:hover {
					background: rgba( 255, 255, 255, .08 );
					box-shadow: inset 0 0 0 var( --border-size ) rgba( 255, 255, 255, 1 );
				}
			}
		}

		@media ( max-width: 900px ) {
			start-gate-panel {
				width: calc( 100vw - 48px );
				padding: 48px 24px 40px;
			}

			start-gate-actions {
				margin-top: 42px;
			}

			start-gate-options {
				gap: 36px;
			}

			start-gate-enter {
				margin-top: 62px;
			}
		}

		@media ( max-width: 650px ) {
			start-gate-panel {
				width: calc( 100vw - 32px );
				padding: 40px 18px 32px;
			}

			start-gate-copy {
				& p {
					max-width: 24ch;
				}
			}

			start-gate-options {
				flex-direction: column;
				align-items: center;
				gap: 28px;
			}

			start-gate-enter {
				margin-top: 52px;
				min-width: 220px;
			}
		}

		`;

		return html`

		<projects-start-gate>
			<start-gate-panel>
				<start-gate-copy>
					<h2>Prepare the journey</h2>
					<p>For a better experience, switch on full screen and sound before entering the archive.</p>
				</start-gate-copy>

				<start-gate-actions>
					<start-gate-options>
						<start-gate-option fullscreen @click|projects-start-gate>
							<start-gate-option-frame>
								<start-gate-option-icon>
									${ Maximize }
									${ Minimize }
								</start-gate-option-icon>
							</start-gate-option-frame>
							<start-gate-option-label>Full Screen</start-gate-option-label>
						</start-gate-option>

						<start-gate-option audio @click|projects-start-gate>
							<start-gate-option-frame>
								<start-gate-option-icon>
									${ Muted }
									${ Speaker }
								</start-gate-option-icon>
							</start-gate-option-frame>
							<start-gate-option-label>Sound</start-gate-option-label>
						</start-gate-option>
					</start-gate-options>

					<start-gate-enter enter @click|projects-start-gate>Enter</start-gate-enter>
				</start-gate-actions>
			</start-gate-panel>
		</projects-start-gate>

		`;

	}

}

customElements.define( 'projects-start-gate', StartGate );
