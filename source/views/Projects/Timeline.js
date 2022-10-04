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
		}

		`;

		return html`

		<project-timeline>
		</project-timeline>

		`;

	}

}

customElements.define( 'project-timeline', Timeline );
