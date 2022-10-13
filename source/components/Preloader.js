export default class Preloader extends HTMLElement {

	onUpdate() {

		const { percentLoaded } = Application.assets;
		const { counter_text, circles } = this.elements;
		counter_text.textContent = ( '000' + percentLoaded ).substr( -3 );

		const circle = circles[ circles.length - 1 ];
		const circumference = circle.getAttribute( 'circumference' );
		const strokeDashoffset = circumference * ( 1 - percentLoaded / 100 );
		circle.style.strokeDashoffset = strokeDashoffset;

	}

	static render() {

		const radius = 30;
		const size = radius * 2.5;
		const center = size * .5;
		const circumference = 2 * Math.PI * radius;

		css`

		preloader-overlay {

			display: flex;
			position: fixed;
			z-index: 20;
			top: 0;
			left: 0;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 100vw;
			height: 100%;
			pointer-events: none;

			&::before {
				content: '';
				position: absolute;
				height: 100%;
				width: 100%;
				left: 0;
				top: 0;
				opacity: 0;
				background: var( --color-black );
				transition: opacity .5s var( --timing-function );
			}

			[ loading ] & {
				pointer-events: all;

				& h1,
				& h2,
				& svg,
				& text,
				& preloader-counter,
				& preloader-square {
					opacity: 1 !important;
					transform: scale( 1 ) !important;
				}

				&:before {
					opacity: 1;
				}

				& preloader-text {
					opacity: 1;
					transform: translateY( -50% );
				}
			}

			& h1 {
				font-size: 6rem;
				color: var( --color-white );
				font-family: var( --font-family-a );
				transition: all .9s var( --timing-function );
				opacity: 0;
				transform: scale( .95 );
			}

			& h2 {
				font-size: 2.5rem;
				color: var( --color-white );
				font-family: var( --font-family-b );
				transition: all .75s var( --timing-function );
				margin-bottom: var( --margin-xs );
				opacity: 0;
				transform: scale( .95 );
			}

			& preloader-square {
				--border: 2px dotted rgba( 255, 255, 255, .25 );
				appearance: none;
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 15px;
				transition: all .5s var( --timing-function );
				transform: scale( .8 );
				opacity: 0;
			}

			& preloader-text {
				position: absolute;
				top: 100%;
				font-family: var( --font-family-a );
				font-size: var( --font-size-m );
				text-transform: uppercase;
				display: block;
				padding: 2px 10px;
				transform: translateY( -35% );
				opacity: 0;
				transition: all .75s var( --timing-function );
				display: none;

				& span {
					animation: blink-2 1.5s infinite linear;
				}
			}

			& preloader-spinner {
				position: relative;
				width: ${ size }px;
				height: ${ size }px;
			}

			& [ reverse ] {
				animation: rotate 2s infinite linear;
				animation-direction: reverse;

				& svg {
					transform: scale( 1.1 );
					opacity: 0;
				}

				& circle {
					animation: blink-1 1s infinite linear;

					&:last-child {
						stroke-width: 1;
						stroke: rgba( 255, 255, 255, .1 );
						stroke-dasharray: ${ circumference * .25 };
						display: none;
					}
				}
			}

			& [ normal ] {
				animation: rotate 4s infinite linear;
				position: absolute;
				left: 0;
				top: 0;

				& svg {
					transform: scale( 1.1 );
					opacity: 0;
				}

				& circle {
					animation: blink-2 2s infinite linear;

					&:first-child {
						stroke-width: 1;
						stroke: rgba( 255, 255, 255, .25 );
						stroke-dasharray: ${ circumference * .2 };
					}

					&:nth-child( 2 ) {
						stroke-width: 1;
						stroke: rgba( 255, 255, 255, .25 );
						stroke-dasharray: ${ circumference };
					}

					&:last-child {
						stroke: rgba( 255, 255, 255, 1 );
						stroke-width: 1.5;
						stroke-dasharray: ${ circumference };
						stroke-dashoffset: ${ circumference };
					}
				}
			}

			& svg {
				width: ${ size }px;
				height: ${ size }px;
				transition: all 1s var( --timing-function );
			}

			& circle {
				fill: none;
				stroke-width: 1;
			}

			& preloader-counter {
				position: absolute;
				color: var( --color-white );
				font-family: var( --font-family-b );
				font-size: var( --font-size-xs );
				transform: scale( .8 );
				opacity: 0;
				transition: all 1s var( --timing-function );

				& counter-text {
					display: block;
					visibility: hidden;
					transition: all 1s var( --timing-function );

					[ loading ] & {
						visibility: visible;
						animation: blink-2 2s infinite linear;
					}
				}

			}

		}

		`;

		const viewBox = `0 0 ${ size } ${ size }`;
		const circle = ( center, radius ) => html`
			<circle
				circumference="${ circumference }"
				cx="${ center }"
				cy="${ center }"
				r="${ radius }"
				#circles
			>`;

		const { title, subtitle } = Application.content;

		return html`

		<preloader-overlay #>

			<h1>${ title }</h1>
			<h2>${ subtitle }</h2>

			<preloader-square>

				<preloader-counter>
					<counter-text #>000</counter-text>
				</preloader-counter>

				<preloader-spinner>

					<preloader-circles reverse>
						<svg viewBox="${ viewBox }">
							${ circle( center, radius * 1.2 ) }
						</svg>
					</preloader-circles>

					<preloader-circles normal>
						<svg viewBox="${ viewBox }">
							${ circle( center, radius * .8 ) }
							${ circle( center, radius ).repeat( 2 ) }
						</svg>
					</preloader-circles>

				</preloader-spinner>

				<preloader-text>
					<span>Loading</span>
				</preloader-text>

			</preloader-square>

		</preloader-overlay>

		`;

	}

}

customElements.define( 'preloader-overlay', Preloader );
