export default class Accessibility {

	static render() {

		css`

			@media screen and ( prefers-reduced-motion: reduce ) {

			* {
				animation-duration: .001ms !important;
				animation-iteration-count: 1 !important;
				transition-duration: .001ms !important;
			}

			}

			@media ( prefers-contrast: high ) {}
			@media ( inverted-colors ) {}
			@media ( prefers-color-scheme: dark ) {}

		`;

		return html``;

	}

}
