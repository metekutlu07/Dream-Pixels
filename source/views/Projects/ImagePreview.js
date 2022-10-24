import Button from '~/components/Button';

export default class ImagePreview extends HTMLElement {

	onKeyDown( parameters ) {

		if ( parameters.code !== 'Escape' ) return;
		this.toggleAttribute( 'visible', false );

	}

	onClick( event ) {

		if ( ! Application.cursor ) return;

		const { currentTarget } = event;
		const { image } = this.elements;
		const { parameters } = Application.cursor;

		if ( currentTarget.matches( 'canvas' ) && parameters ) {

			this.parameters = parameters;
			image.src = parameters.source;
			image.onload = () => this.toggleAttribute( 'visible', true );

		}

		if ( currentTarget.hasAttribute( 'project' ) ) {

			const { path } = this.parameters;
			Application.router.navigate( `/${ path }` );

		}

		if ( currentTarget.hasAttribute( 'close' ) ) {

			this.parameters = null;
			this.toggleAttribute( 'visible', false );

		}

	}

	static render() {

		css`

		projects-image-preview {
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 15;
			background: rgba( 0, 0, 0, .5 );
			opacity: 0;
			transition: opacity .5s var( --timing-function );
			cursor: default;

			&[ visible ] {
				opacity: 1;
				pointer-events: all;
				& img {
					transform: scale( 1 );
				}

			}

			& img {
				width: 100%;
				max-height: 75vh;
				max-width: 1024px;
				transform: scale( 1.01 );
				transition: transform .5s var( --timing-function );
				border: var( --border-size ) solid var( --border-color );
			}
		}

		image-preview {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: flex-end;
		}

		image-preview-buttons {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: var( --margin-xs );
		}

		`;

		const buttons = [

			{ attributes: [ 'close', '@click|projects-image-preview' ] },
			{ attributes: [ 'project', '@click|projects-image-preview' ] }

		];

		return html`

		<projects-image-preview blurred-background>

			<image-preview>
				<image-preview-buttons>
					${ buttons.map( Button.render ) }
				</image-preview-buttons>
				<img src="/public/bistami/005.jpg" alt="Pixels Image Preview" #image/>
			</image-preview>

		</projects-image-preview>

		`;

	}

}

customElements.define( 'projects-image-preview', ImagePreview );
