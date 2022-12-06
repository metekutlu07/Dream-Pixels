export default class Global {

	static render() {

		css`

		html {

			--timing-function: cubic-bezier( .55, 0, .1, 1 );

			--color-white: #eeeeee;
			--color-black: #000000;
			--color-grey: #666666;
			--color-green: #25b69b;
			--color-pink: #c679a7;
			--color-yellow: #fac35f;

			--font-family-a: "A";
			--font-family-b: "B";
			--font-family-c: "C";

			--font-size-xxl: 4.5rem;
			--font-size-xl: 3.5rem;
			--font-size-l: 2.25rem;
			--font-size-m: 1.6rem;
			--font-size-s: 1.4rem;
			--font-size-xs: 1.2rem;

			--line-height: 1.8;
			--border-size: 1px;
			--border-color: transparent;
			--background-color: rgba( 0, 0, 0, 0 );
			--border-color: rgba( 255, 255, 255, 1 );

			--margin-m: 40px;
			--margin-s: 20px;
			--margin-xs: 10px;

			text-rendering: geometricPrecision;
			-webkit-text-size-adjust: none;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;

			font-size: 10px;
			font-family: var( --font-family-a );
			color: var( --color-white );

			user-select: none;

		}

		body {
			font-size: var( --font-size-m );
			background-color: var( --color-black );

			[ path="/virtual-miniature" ] &,
			[ path="/contact" ] &,
			[ path="/about" ] &,
			[ path="/photogrammetry" ] &,
			[ path="/miniature-street-view" ] &,
			[ path="/works" ][ list="places" ] &,
			[ path="/works" ][ list="sphere" ] &,
			[ path="/works" ][ list="particles" ] & {
				overflow: hidden;
			}

			@media ( max-width: 768px ) {
				font-size: 9px;
			}
		}

		h3 {
			font-family: var( --font-family-b );
		}

		h4 {
			font-family: var( --font-family-a );
		}

		p {
			line-height: var( --line-height );
		}

		*::-webkit-scrollbar {
			display: none;
		}

		::selection {
			color: var( --color-white );
			background: var( --color-black );
		}

		[ font-style-title ] {
			font-family: var( --font-family-b );

			&:first-line {
				font-family: var( --font-family-a );
				font-size: 1.25em;
			}
		}

		[ blurred-background ] {
			--blur: blur( 10px );
			backdrop-filter: var( --blur );
			-webkit-backdrop-filter: var( --blur );
		}

		[ view ] {
			opacity: 0;
			/* transform: scale( .975 ); */
			/* transition: transform .75s var( --timing-function ), opacity .75s var( --timing-function ); */

			&:not( canvas ) {
				/* transform-origin: var( --transform-origin ); */
			}

			&[ hidden ] {
				display: none;
			}

			[ view-exit ] &:not( projects-views ) {
				opacity: 0;
				/* transform: scale( .975 ); */
			}

			[ view-enter ] &:not( projects-views ) {
				opacity: 1;
				/* transform: scale( 1 ); */
			}

		}

		@media ( hover: hover ) {

			[ grab ] { cursor: grab }
			[ grabbing ] { cursor: grabbing }
			[ pointer ] { cursor: pointer }
			[ crosshair ] { cursor: crosshair }

		}

		@font-face {
			font-family: 'A';
			src: url('/fonts/A.woff2') format('woff2'),
				url('/fonts/A.woff') format('woff');
			font-weight: normal;
			font-style: normal;
			font-display: swap;
		}

		@font-face {
			font-family: 'B';
			src: url('/fonts/B.woff2') format('woff2'),
				url('/fonts/B.woff') format('woff');
			font-weight: normal;
			font-style: normal;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/C.woff2') format('woff2'),
				url('/fonts/C.woff') format('woff');
			font-weight: normal;
			font-style: normal;
			font-display: swap;
		}

		`;

		return `
			<link rel="preload" href="/fonts/A.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/B.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/C.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/A.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/B.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/C.woff" as="font" type="font/woff" crossorigin>
		`;

	}

}
