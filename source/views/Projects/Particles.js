export default class Particles extends HTMLElement {

	onConnected() {
	}

	onClick() {
	}

	onUpdate() {
	}

	static render() {

		css`

		projects-particles {
			position: absolute;
			height: var( --viewport-height );
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			top: 0;
			left: 0;
			opacity: 0;
			transition: opacity 1s var( --timing-function );
			pointer-events: none;

			[ list="particles" ] & {
				opacity: 1;
			}
		}

		`;

		return html`

		<projects-particles @click>
		</projects-particles>

		`;

	}

}

customElements.define( 'projects-particles', Particles );
