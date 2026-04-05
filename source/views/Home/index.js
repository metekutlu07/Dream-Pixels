import View from '~/components/View';
import Maximize from '~/assets/icons/Maximize';
import Minimize from '~/assets/icons/Minimize';
import Speaker from '~/assets/icons/Speaker';
import Muted from '~/assets/icons/Muted';

export default class Home extends View {

	static path = '/';
	static silent = false;

	constructor() {

		super();

		this.startParticlesExperience = this.startParticlesExperience.bind( this );
		this.playHoverSound = this.playHoverSound.bind( this );
		this.toggleFullscreen = this.toggleFullscreen.bind( this );
		this.toggleAudio = this.toggleAudio.bind( this );
		this.enterHome = this.enterHome.bind( this );
		this.queueRevealSequence = this.queueRevealSequence.bind( this );
		this.runRevealSequence = this.runRevealSequence.bind( this );

	}

	onConnected() {

		Application.store.set( 'list', 'particles' );
		Application.store.set( 'particles', 'color-range' );
		Application.store.set( 'pixel-experience-started', false );
		Application.store.set( 'pixel-experience-gate-visible', false );
		Application.store.set( 'pixel-experience-background-visible', false );
		Application.store.set( 'pixel-experience-transitioning', false );
		Application.store.set( 'skip-particle-gate', false );
		Application.store.set( 'particle-archive-entered', false );
		Application.store.set( 'ui-ready', false );
		Application.store.set( 'intro-ready', false );
		Application.store.set( 'home-gate-visible', ! Application.store[ 'home-gate-seen' ] );
		Application.store.set( 'home-nav-ready', false );
		Application.store.set( 'home-copy-ready', false );

		this.elements.start?.addEventListener( 'click', this.startParticlesExperience );
		this.elements.start?.addEventListener( 'mouseenter', this.playHoverSound );
		this.elements.fullscreen?.addEventListener( 'click', this.toggleFullscreen );
		this.elements.audio?.addEventListener( 'click', this.toggleAudio );
		this.elements.enter?.addEventListener( 'click', this.enterHome );

		this.syncGateState();

		super.onConnected();

	}

	onDisconnected() {

		clearTimeout( this.gateRevealTimeout );
		clearTimeout( this.gateExitTimeout );
		clearTimeout( this.revealTimeout );
		this.pendingReveal = false;

		this.elements.start?.removeEventListener( 'click', this.startParticlesExperience );
		this.elements.start?.removeEventListener( 'mouseenter', this.playHoverSound );
		this.elements.fullscreen?.removeEventListener( 'click', this.toggleFullscreen );
		this.elements.audio?.removeEventListener( 'click', this.toggleAudio );
		this.elements.enter?.removeEventListener( 'click', this.enterHome );

	}

	async onViewChange( view ) {

		await super.onViewChange( view );

		if ( view !== this ) return;
		if ( Application.store[ 'home-gate-visible' ] ) return;

		this.queueRevealSequence();

	}

	queueRevealSequence() {

		clearTimeout( this.revealTimeout );
		this.pendingReveal = true;
		this.revealQueuedAt = Application.time?.elapsedTime || 0;
		this.toggleAttribute( 'revealing', true );

	}

	runRevealSequence() {

		clearTimeout( this.revealTimeout );
		this.pendingReveal = false;
		this.revealQueuedAt = 0;

		Application.store.set( 'home-nav-ready', true );
		Application.store.set( 'home-copy-ready', true );

		this.revealTimeout = setTimeout( () => {

			this.toggleAttribute( 'revealing', false );

		}, 600 );

	}

	onPreFrame() {

		this.syncGateState();

		const particles = Application.particles;
		const particleColorsReady = particles?.ensureColorsReady?.() || particles?.hasLoadedColors;
		const particleSceneReady = particleColorsReady &&
			particles?.visible &&
			Application.metrics.simulationState === 'running';
		const revealWaitElapsed = (
			Application.time.elapsedTime - ( this.revealQueuedAt || 0 )
		) > 8000;

		if (
			this.pendingReveal &&
			Application.store.path === '/' &&
			! Application.store.loading &&
			( particleSceneReady || revealWaitElapsed )
		) this.runRevealSequence();

	}

	syncGateState() {

		const gateVisible = (
			Application.store.path === '/' &&
			Application.store[ 'home-gate-visible' ] &&
			! Application.store.loading
		);

		this.toggleAttribute( 'gate-visible', gateVisible );

		if ( gateVisible ) {

			if (
				! this.hasAttribute( 'gate-entered' ) &&
				! this.hasAttribute( 'gate-closing' ) &&
				! this.gateRevealTimeout
			) {

				this.gateRevealTimeout = setTimeout( () => {

					this.toggleAttribute( 'gate-entered', true );
					this.gateRevealTimeout = null;

				}, 60 );

			}

		} else {

			clearTimeout( this.gateRevealTimeout );
			this.gateRevealTimeout = null;
			this.toggleAttribute( 'gate-entered', false );
			this.toggleAttribute( 'gate-closing', false );

		}

		this.elements.fullscreen?.toggleAttribute( 'active', Application.fullscreen.isActive );
		this.elements.audio?.toggleAttribute( 'active', ! Application.audio.isMuted );

	}

	playHoverSound() {

		Application.audio.play( '007.mp3', { volume: .1 } );

	}

	async startParticlesExperience( event ) {

		event.preventDefault();
		event.stopPropagation();

		Application.particles?.ensureColorsReady?.();

		const list = Application.store[ 'last-experiments-list' ] || 'particles';
		const particles = Application.store[ 'last-experiments-particles' ] || 'color-range';
		const places = Application.store[ 'last-experiments-places' ] || 'world';

		Application.store.set( 'list', list );
		Application.store.set( 'particles', particles );
		Application.store.set( 'places', places );
		Application.store.set( 'skip-particle-gate', list === 'particles' );
		Application.router.navigate( '/experiments' );

	}

	toggleFullscreen( event ) {

		event.preventDefault();
		Application.fullscreen.toggle();
		this.syncGateState();

	}

	async toggleAudio( event ) {

		event.preventDefault();
		await Application.audio.toggle();
		this.syncGateState();

	}

	enterHome( event ) {

		event.preventDefault();

		if ( this.hasAttribute( 'gate-closing' ) ) return;

		this.toggleAttribute( 'gate-closing', true );
		this.toggleAttribute( 'gate-entered', false );

		clearTimeout( this.gateExitTimeout );

		this.gateExitTimeout = setTimeout( () => {

			Application.store.set( 'home-gate-visible', false );
			Application.store.set( 'home-gate-seen', true );
			this.toggleAttribute( 'gate-closing', false );
			this.queueRevealSequence();
			this.syncGateState();

		}, 450 );

	}

	static render() {

		css`

		home-view {
			position: relative;
			min-width: 100vw;
			min-height: 100vh;
			min-height: calc( var( --vh, 1vh ) * 100 );
			display: flex;
			align-items: center;
			justify-content: center;
			padding: calc( var( --margin-m ) * 2 );
			overflow: hidden;

			@media ( max-width: 650px ) {
				padding: calc( var( --margin-m ) * 2 ) var( --margin-s );
			}
		}

		home-content {
			position: relative;
			z-index: 35;
			width: min( 1720px, calc( 100vw - 120px ) );
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			color: var( --color-white );
			pointer-events: none;

			[ path="/" ][ home-copy-ready ] & {
				pointer-events: all;
			}

			@media ( max-width: 650px ) {
				width: calc( 100vw - 40px );
			}
		}

		home-reveal {
			position: fixed;
			inset: 0;
			z-index: 39;
			background: var( --color-black );
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
			transition:
				opacity 1.8s var( --timing-function ),
				visibility 0s linear 1.8s;

			[ revealing ] & {
				opacity: 1;
				visibility: visible;
				transition: none;
			}
		}

		home-title {
			font-family: var( --font-family-a );
			font-size: clamp( 4.2rem, 4.9vw, 8.2rem );
			line-height: 1.02;
			letter-spacing: .04em;
			text-transform: none;
			white-space: nowrap;
			opacity: 0;
			visibility: hidden;

			[ path="/" ][ home-copy-ready ] & {
				opacity: 1;
				visibility: visible;
			}

			[ path="/" ][ home-gate-visible ] & {
				opacity: 0;
				visibility: hidden;
			}

			@media ( max-width: 650px ) {
				max-width: 13.2ch;
				font-size: clamp( 4rem, 9.4vw, 5.2rem );
				line-height: 1.06;
				letter-spacing: .03em;
				white-space: normal;
				text-wrap: balance;
			}
		}

		home-copy {
			margin-top: 28px;
			font-family: var( --font-family-c );
			font-size: clamp( 1.9rem, 1.6vw, 3rem );
			line-height: 1.6;
			text-transform: none;
			opacity: 0;
			visibility: hidden;

			[ path="/" ][ home-copy-ready ] & {
				opacity: 1;
				visibility: visible;
			}

			[ path="/" ][ home-gate-visible ] & {
				opacity: 0;
				visibility: hidden;
			}

			& span {
				display: block;
				white-space: nowrap;
			}

			@media ( max-width: 650px ) {
				max-width: 28ch;
				margin-top: 20px;
				font-size: 1.95rem;
				line-height: 1.5;

				& span {
					white-space: normal;
				}
			}
		}

		home-mobile-break {
			display: none;

			@media ( max-width: 650px ) {
				display: block;
			}
		}

		home-mobile-only {
			display: none;

			@media ( max-width: 650px ) {
				display: block;
			}
		}

		home-desktop-only {
			display: block;

			@media ( max-width: 650px ) {
				display: none;
			}
		}

		home-start {
			cursor: pointer;
			position: relative;
			z-index: 36;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			pointer-events: all;
			margin-top: 84px;
			padding: 18px;
			border: var( --border-size ) solid var( --border-color );
			overflow: hidden;
			isolation: isolate;
			font-family: var( --font-family-b );
			font-size: clamp( 2.1rem, 1.5vw, 2.4rem );
			letter-spacing: .1em;
			text-transform: uppercase;
			color: var( --color-white );
			background: transparent;
			opacity: 0;
			transform: translateZ( 0 );
			visibility: hidden;
			will-change: opacity, transform;
			transition:
				background-color .25s var( --timing-function ),
				border-color .25s var( --timing-function );

			[ path="/" ][ home-copy-ready ] & {
				opacity: 1;
				transform: translateZ( 0 );
				visibility: visible;
			}

			[ path="/" ][ home-gate-visible ] & {
				opacity: 0;
				transform: translateZ( 0 );
				visibility: hidden;
			}

			&::before {
				content: '';
				position: absolute;
				inset: 0;
				z-index: -1;
				background: rgba( 8, 8, 8, .34 );
				backdrop-filter: blur( 10px );
				-webkit-backdrop-filter: blur( 10px );
				transform: translateZ( 0 );
				will-change: opacity;
			}

			@media ( hover: hover ) {
				&:hover {
					border-color: rgba( 255, 255, 255, .5 );

					&::before {
						background: rgba( 255, 255, 255, .16 );
					}
				}
			}

			@media ( max-width: 650px ) {
				width: auto;
				max-width: calc( 100vw - 32px );
				margin-top: 44px;
				padding: 16px;
				font-size: 1.8rem;
				letter-spacing: .08em;
			}
		}

		home-gate {
			position: fixed;
			inset: 0;
			z-index: 40;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 48px;
			background: var( --color-black );
			pointer-events: none;
			visibility: hidden;
			transition: visibility 0s linear .45s;

			&::before {
				content: '';
				position: absolute;
				inset: 0;
				background-image: url( "/public/common/Grid.svg" );
				background-size: 50px;
				background-position: center center;
				opacity: .25;
			}

			[ path="/" ][ home-gate-visible ] & {
				pointer-events: all;
				visibility: visible;
				transition-delay: 0s;
			}

			[ gate-closing ] & {
				pointer-events: none;
			}

			@media ( max-width: 650px ) {
				padding: 24px 16px;
			}
		}

		home-gate-panel {
			position: relative;
			z-index: 1;
			width: min( 980px, calc( 100vw - 120px ) );
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			color: var( --color-white );

			@media ( max-width: 900px ) {
				width: calc( 100vw - 48px );
			}

			@media ( max-width: 650px ) {
				width: calc( 100vw - 32px );
			}
		}

		home-gate-copy {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 28px;
			opacity: 0;
			transform: translateY( 16px );
			transition: opacity .6s var( --timing-function ), transform .6s var( --timing-function );

			[ gate-entered ] & {
				opacity: 1;
				transform: none;
			}

			& h2 {
				font-family: var( --font-family-a );
				font-size: clamp( 3.2rem, 3.4vw, 5.2rem );
				line-height: 1.05;
				letter-spacing: .05em;
				text-transform: uppercase;
			}

			& p {
				max-width: 34ch;
				font-family: var( --font-family-c );
				font-size: clamp( 1.6rem, 1.2vw, 2rem );
				line-height: 1.8;
			}
		}

		home-gate-actions {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			margin-top: 50px;
		}

		home-gate-options {
			display: flex;
			align-items: flex-start;
			justify-content: center;
			gap: clamp( 52px, 7vw, 108px );
			width: 100%;
			opacity: 0;
			transform: translateY( 16px );
			transition: opacity .6s var( --timing-function ), transform .6s var( --timing-function );

			[ gate-entered ] & {
				opacity: 1;
				transform: none;
				transition-delay: .12s;
			}

			@media ( max-width: 650px ) {
				flex-direction: column;
				align-items: center;
				gap: 28px;

				& button:first-child {
					display: none;
				}
			}
		}

		[ home-gate-option ] {
			cursor: pointer;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 18px;
			padding: 0;
			border: none;
			background: transparent;
			color: rgba( 255, 255, 255, .78 );
			transition: color .35s var( --timing-function );

			@media ( hover: hover ) {
				&:hover {
					color: var( --color-white );

					& home-gate-option-frame {
						border-color: rgba( 255, 255, 255, .42 );
						background: rgba( 0, 0, 0, .95 );
					}
				}
			}

			&[ active ] {
				color: var( --color-green );

				& home-gate-option-frame {
					border-color: currentColor;
				}
			}
		}

		home-gate-option-frame {
			width: clamp( 82px, 6vw, 98px );
			height: clamp( 82px, 6vw, 98px );
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid rgba( 255, 255, 255, .18 );
			background: rgba( 0, 0, 0, .9 );
			transition: border-color .35s var( --timing-function ), background-color .35s var( --timing-function ), color .35s var( --timing-function );

			& svg {
				width: 34px;
				height: 34px;
			}

			& path {
				fill: currentColor !important;
			}
		}

		home-gate-option-icon {
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

		home-gate-option-label {
			font-family: var( --font-family-b );
			font-size: clamp( 1.35rem, 1vw, 1.7rem );
			letter-spacing: .08em;
			text-transform: uppercase;
		}

		[ home-gate-enter ] {
			cursor: pointer;
			margin-top: 76px;
			padding: 16px 46px;
			min-width: 220px;
			border: 1px solid rgba( 255, 255, 255, .3 );
			background: rgba( 0, 0, 0, .92 );
			font-family: var( --font-family-b );
			font-size: clamp( 1.6rem, 1.1vw, 1.95rem );
			letter-spacing: .1em;
			text-transform: uppercase;
			color: var( --color-white );
			opacity: 0;
			transform: translateY( 16px );
			transition:
				background-color .35s var( --timing-function ),
				border-color .35s var( --timing-function ),
				color .35s var( --timing-function ),
				opacity .6s var( --timing-function ),
				transform .6s var( --timing-function );

			[ gate-entered ] & {
				opacity: 1;
				transform: none;
				transition-delay: .22s;
			}

			@media ( hover: hover ) {
				&:hover {
					background: rgba( 255, 255, 255, .08 );
					border-color: rgba( 255, 255, 255, .5 );
				}
			}

			@media ( max-width: 900px ) {
				margin-top: 62px;
			}

			@media ( max-width: 650px ) {
				margin-top: 52px;
			}
		}

		home-credit {
			position: fixed;
			right: 18px;
			bottom: 18px;
			z-index: 2;
			font-family: var( --font-family-c );
			font-size: 1.5rem;
			letter-spacing: .04em;
			color: rgba( 255, 255, 255, .78 );
			opacity: 0;
			pointer-events: none;
			visibility: hidden;

			[ path="/" ][ home-copy-ready ] & {
				opacity: 1;
				visibility: visible;
			}

			@media ( max-width: 650px ) {
				right: 14px;
				bottom: 14px;
				font-size: 1.3rem;
			}
		}

		`;

		return html`

		<home-view view>
			<home-reveal></home-reveal>
			<home-gate>
				<home-gate-panel>
					<home-gate-copy>
						<h2>Prepare the journey</h2>
						<p>
							<home-desktop-only>For a better experience, switch on full screen and sound before entering the archive.</home-desktop-only>
							<home-mobile-only>For a better experience, switch on sound before entering the archive.</home-mobile-only>
						</p>
					</home-gate-copy>

					<home-gate-actions>
						<home-gate-options>
							<button #fullscreen type="button" home-gate-option>
								<home-gate-option-frame>
									<home-gate-option-icon>
										${ Maximize }
										${ Minimize }
									</home-gate-option-icon>
								</home-gate-option-frame>
								<home-gate-option-label>Full Screen</home-gate-option-label>
							</button>

							<button #audio type="button" home-gate-option>
								<home-gate-option-frame>
									<home-gate-option-icon>
										${ Muted }
										${ Speaker }
									</home-gate-option-icon>
								</home-gate-option-frame>
								<home-gate-option-label>Sound</home-gate-option-label>
							</button>
						</home-gate-options>

						<button #enter type="button" home-gate-enter>Enter</button>
					</home-gate-actions>
				</home-gate-panel>
			</home-gate>

			<home-content>
				<home-title>An Archive of the Age of AI</home-title>
				<home-copy>
					<span>Experiments from my doctoral thesis, <em>Empire of Clouds.</em></span>
					<span>Six years of research<home-mobile-break></home-mobile-break>entangling cosmos<home-mobile-break></home-mobile-break>and algorithm.</span>
					<span>An iridescent data breeze.</span>
				</home-copy>
				<home-start #start blurred-background start>Explore the Experiments</home-start>
			</home-content>
			<home-credit>© Mete Kutlu, 2026</home-credit>
		</home-view>

		`;

	}

}

customElements.define( 'home-view', Home );
