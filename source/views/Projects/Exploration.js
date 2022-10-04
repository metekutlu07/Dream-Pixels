export default class Exploration extends HTMLElement {

	static render() {

		css`

		projects-exploration {
			z-index: 4;
			position: fixed;
			display: flex;
			flex-direction: column;
			background-color: var( --background-color );
			top: var( --margin-m );
			left: var( --margin-m );
			margin-top: 100px;
			border: var( --border-size ) solid var( --border-color );
			max-width: 450px;
			max-height: 600px;
			opacity: 0;
			transition: opacity 1s var( --timing-function );

			padding: var( --margin-m );
			font-family: var( --font-family-c );
			font-size: var( --font-size-s );
			line-height: 1.8;
			overflow: scroll;

			& h3 {
				line-height: 1;
				font-size: var( --font-size-xl );
				margin-bottom: var( --margin-s );
			}

			[ view-exit ][ list="sphere" ] &,
			[ view-exit ][ list="particles" ] & {
				opacity: 0;
			}

			[ view-enter ][ list="sphere" ] &,
			[ view-enter ][ list="particles" ] & {
				opacity: 1;
				transition-delay: .5s;
			}
		}

		`;

		const { exploration } = Application.content;

		return html`

		<projects-exploration blurred-background>

			<h3>${ exploration.title }</h3>
			<p>${ exploration.description }</p>

		</projects-exploration>

		`;

	}

}

customElements.define( 'projects-exploration', Exploration );
