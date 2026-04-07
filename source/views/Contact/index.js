import View from '~/components/View';

export default class Contact extends View {

	static path = '/contact';
	static silent = false;

	constructor() {

		super();

		this.runRevealSequence = this.runRevealSequence.bind( this );

	}

	onDisconnected() {

		clearTimeout( this.revealTimeout );

	}

	async onViewChange( view ) {

		await super.onViewChange( view );

		if ( view !== this ) return;

		this.runRevealSequence();

	}

	runRevealSequence() {

		clearTimeout( this.revealTimeout );

		this.toggleAttribute( 'revealing', true );

		this.revealTimeout = setTimeout( () => {

			this.toggleAttribute( 'revealing', false );

		}, 600 );

	}

	static render() {

		css`

		contact-view {
			position: relative;
			min-width: 100vw;
			min-height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: var( --font-size-xl );
			text-align: center;
			user-select: text;
			background: rgba( 0, 0, 0, .5 );

			@media ( max-width: 1024px ) {
				font-size: var( --font-size-l );
			}

			& h4 {
				margin-bottom: var( --margin-m );
				font-size: calc( var( --font-size-xxl ) * 1.5 );
				line-height: .9;

				@media ( max-width: 1024px ) {
					font-size: calc( var( --font-size-l ) * 1.5 );
				}

				@media ( max-width: 650px ) {
					line-height: 1.5;
				}
			}

			& contact-mobile-break {
				display: none;

				@media ( max-width: 650px ) {
					display: block;
				}
			}

			& h3 {
				font-family: var( --font-family-c );
				line-height: 1.1;
			}

			& a {
				margin-bottom: var( --margin-m );
				color: var( --color-white );
				font-family: var( --font-family-c );
				font-size: 100%;

				@media ( hover: hover ) {
					&:hover {
						color: var( --color-yellow );
					}
				}
			}
		}

		contact-reveal {
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

		contact-credit {
			position: fixed;
			right: 18px;
			bottom: 18px;
			z-index: 2;
			font-family: var( --font-family-c );
			font-size: 1.5rem;
			letter-spacing: .04em;
			color: rgba( 255, 255, 255, .78 );
			pointer-events: none;

			@media ( max-width: 650px ) {
				right: 14px;
				bottom: 14px;
			}
		}

		`;

		const { mail, address, contact } = Application.content;
		const contactTitle = contact.replace( ' or reach out?', '<contact-mobile-break></contact-mobile-break>or reach out?' );

		return html`

		<contact-view view>
			<contact-reveal></contact-reveal>
			<h4>${ contactTitle }</h4>
			<a href="mailto:${ mail }">${ mail }</a>
			<h3>${ address }</h3>
			<contact-credit>© Mete Kutlu, 2026</contact-credit>
		</contact-view>

		`;

	}

}

customElements.define( 'contact-view', Contact );
