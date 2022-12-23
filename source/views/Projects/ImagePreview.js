import Button from '~/components/Button';

export default class ImagePreview extends HTMLElement {

	onKeyDown( parameters ) {

		if ( parameters.code !== 'Escape' ) return;
		this.parameters = null;
		this.toggleAttribute( 'visible', false );

	}

	onClick( event ) {

		if ( ! Application.cursor ) return;

		const { currentTarget } = event;
		const { image } = this.elements;
		const { parameters } = Application.cursor;

		if ( currentTarget.matches( 'canvas' ) && parameters ) {

			this.parameters = Object.assign( {}, parameters );
			image.src = parameters.source;
			if ( image.src.match( 'mp4' ) ) image.src += '.png';
			image.onload = () => this.toggleAttribute( 'visible', true );

			const { title, caption, tags } = this.elements;
			const { projects } = Application.content;

			const project = projects.find( project => project.path === parameters.path );
			const index = projects.indexOf( project );
			const number = ( '00' + ( index + 1 ) ).substr( -2 );

			title.innerHTML = `${ project.title } <span>| ${ number }</span>`;
			caption.innerHTML = parameters.caption;
			tags.innerHTML = parameters.tags
				.map( tag => html`<span>${ tag }</span>` )
				.join( ', ' );

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
			z-index: 20;
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
				transform: scale( 1.025 );
				transition: transform .5s var( --timing-function );
			}
		}

		image-preview {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: flex-end;
			margin: var( --margin-m );

			@media ( max-width: 650px ) {
				margin: var( --margin-s );
			}
		}

		image-preview-buttons {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: var( --margin-xs );
		}

		image-preview-footer {
			align-self: flex-start;
			margin-top: var( --margin-xs );

			& h3 {
				font-family: var( --font-family-a );
				font-size: var( --font-size-m );
				width: initial;
				margin-bottom: 2px;

				& span {
					font-family: var( --font-family-b );
					font-size: .9em;
					opacity: .25;
					display: none;
				}
			}

			& h4 {
				font-family: var( --font-family-c );
				font-size: var( --font-size-xs );
				max-width: 400px;

				& span {
					display: inline-block;
				}
			}

			& h5 {
				margin-top: 5px;
				font-family: var( --font-family-c );
				font-size: var( --font-size-xs );
				opacity: .5;
			}
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

				<image-preview-footer>
					<h3 #caption>Comparaison: Side by Side View</h3>
					<h4 #tags>Artificial Intelligence, Persian Miniature</h4>
					<h5 #title>Bistami <span>| 01</span></h5>
				</image-preview-footer>

			</image-preview>

		</projects-image-preview>

		`;

	}

}

customElements.define( 'projects-image-preview', ImagePreview );
