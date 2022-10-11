export default class Timeline extends HTMLElement {

	onConnected() {
	}

	onClick() {
	}

	onPreFrame() {
	}

	static render() {

		css`

		project-timeline {
			position: fixed;
			right: var( --margin-m );
			top: 0;
			bottom: 0;
			margin: auto;
			height: 500px;
			opacity: 0;
			transition: opacity .1s var( --timing-function );
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: center;
			font-family: var( --font-family-c );
			font-size: var( --font-size-s );

			& li {
				text-align: right;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				&:not( :last-child ) {
					margin-bottom: var( --margin-xs );
				}

				&:after {
					content: '';
					display: block;
					width: 5px;
					height: 5px;
					background: var( --color-white );
					border-radius: 50%;
					margin-left: var( --margin-xs );
				}
			}

			[ view-enter ][ list="particles" ][ particles="timeline" ] & {
				opacity: 1;
				pointer-events: all;
			}
		}

		`;

		const { projects } = Application.content;
		const list = projects.map( project => {

			return html`<li>${ project.title }</li>`;

		} );

		return html`

		<project-timeline>
			<ul>${ list }</ul>
		</project-timeline>

		`;

	}

}

customElements.define( 'project-timeline', Timeline );
