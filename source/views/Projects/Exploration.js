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
			margin-top: 50px;
			border: var( --border-size ) solid var( --border-color );
			max-width: 450px;
			opacity: 0;
			transition: opacity 1s var( --timing-function );

			padding: var( --margin-m );
			font-family: var( --font-family-c );
			font-size: var( --font-size-s );
			line-height: 1.8;
			overflow: scroll;
			pointer-events: none;

			& h3 {
				line-height: 1;
				font-size: var( --font-size-xl );
				margin-bottom: var( --margin-s );
			}

			& p {
				&:not( :last-child ) {
					margin-bottom: var( --margin-s );
				}
			}

			[ view-enter ][ list="sphere" ] &,
			[ view-enter ][ list="particles" ] & {
				opacity: 1;
				transition-delay: .5s;
				pointer-events: all;
			}
		}

		`;

		const { title, description } = Application.content.exploration;

		return html`

		<projects-exploration blurred-background>

			<h3>${ title }</h3>
			${ description.map( paragraph => html`<p>${ paragraph }</p>` ) }

		</projects-exploration>

		`;

	}

}

customElements.define( 'projects-exploration', Exploration );
