export default class S17 extends HTMLElement {

	onConnected() {

		this.canvasBlock = document.querySelector( 'canvas-block' );
		this.placeholder = this.placeholder || document.createComment( 'rasdelka-canvas-placeholder' );

		if ( this.canvasBlock && ! this.placeholder.parentNode ) {

			this.canvasBlock.parentNode?.insertBefore( this.placeholder, this.canvasBlock );

		}

		const setActiveState = ( isActive ) => {

			Application.store.set( 'rasdelka-church-active', isActive );
			this.toggleAttribute( 'active', isActive );

			if ( !this.canvasBlock ) return;

			if ( isActive ) {

				this.appendChild( this.canvasBlock );

			} else if ( this.placeholder.parentNode ) {

				this.placeholder.parentNode.insertBefore( this.canvasBlock, this.placeholder );

			}

		};

		this.observer = new IntersectionObserver( ( entries ) => {

			const isActive = entries.some( entry => entry.isIntersecting );
			setActiveState( isActive );

		}, {
			threshold: .45
		} );

		this.observer.observe( this );
		setActiveState( false );

	}

	disconnectedCallback() {

		this.observer?.disconnect();
		Application.store.set( 'rasdelka-church-active', false );

		if ( this.canvasBlock && this.placeholder?.parentNode ) {

			this.placeholder.parentNode.insertBefore( this.canvasBlock, this.placeholder );

		}

	}

	static render( content ) {

		css`

		section-type-17 {
			display: flex;
			align-items: stretch;
			justify-content: stretch;
			position: relative;
			min-height: 100vh;
			background: var( --color-black );
			overflow: hidden;
		}

		section-type-17 canvas-block {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			pointer-events: all;
		}

		section-type-17 canvas {
			width: 100% !important;
			height: 100% !important;
		}

		section-type-17::after {
			content: '';
			position: absolute;
			inset: 0;
			border: 1px solid rgba( 255, 255, 255, .06 );
			pointer-events: none;
		}

		@media ( max-width: 650px ) {
			section-type-17 {
				min-height: 72vh;
			}
		}

		`;

		const { anchor } = content;

		return html`

		<section-type-17 section ${ anchor ? `anchor="${ anchor }"` : '' }></section-type-17>

		`;

	}

}

customElements.define( 'section-type-17', S17 );
