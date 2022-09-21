export default class Accessibility {

	static render() {

		css`

		@keyframes blink-1 {
			0% { opacity: 1 }
			1% { opacity: 0 }
			4% { opacity: .8 }
			8% { opacity: 0 }
			12% { opacity: 0 }
			15% { opacity: .4 }
			18% { opacity: 1 }
			21% { opacity: 0 }
			23% { opacity: 0 }
			31% { opacity: .6 }
			100% { opacity: 1 }
		}

		@keyframes blink-2 {
			0% { opacity: 1 }
			1% { opacity: 1 }
			2% { opacity: 1 }
			4% { opacity: 0 }
			10% { opacity: 1 }
			13% { opacity: .4 }
			15% { opacity: .4 }
			17% { opacity: 1 }
			20% { opacity: .5 }
			21% { opacity: .5 }
			25% { opacity: 1 }
			29% { opacity: 1 }
			30% { opacity: .8 }
			32% { opacity: 1 }
			85% { opacity: 1 }
			100% { opacity: 1 }
		}

		@keyframes blink-3 {
			0%  { opacity: 1 }
			1% { opacity: 1 }
			2% { opacity: 1 }
			4% { opacity: 0 }
			10% { opacity: 1 }
			13% { opacity: .4 }
			15% { opacity: .4 }
			17% { opacity: 1 }
			20% { opacity: .5 }
			21% { opacity: .5 }
			25% { opacity: 1 }
			29% { opacity: 1 }
			30% { opacity: .8 }
			32% { opacity: 1 }
			85% { opacity: 1 }
			100% { opacity: 1 }
		}

		@keyframes scrolling {
			100% {
				transform: translateX( -50% );
			}
		}

		@keyframes rotate {
			100% { transform: rotate( 360deg ) }
		}

		`;

		return html``;

	}

}

