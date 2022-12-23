export default class RotateDevice extends HTMLElement {

	onConnected() {

		RotateDevice.render();

	}

	static render() {

		css`

		rotate-device-overlay {
			z-index: 25;
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			justify-content: center;
			align-items: center;
			background: var( --color-black );
			font-size: var( --font-size-l );
			text-align: center;
			display: none;

			@media ( max-width: 650px ) {
				@media ( orientation: landscape ) {
					display: flex;
				}
			}

		}

		`;

		return html`

			<rotate-device-overlay font-style-title>
				This website is optimized for portrait mode. <br>
				Please rotate your device.
			</rotate-device-overlay>

		`;

	}

}

customElements.define( 'rotate-device-overlay', RotateDevice );
