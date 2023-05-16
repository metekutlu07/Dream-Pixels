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
			--font-size-xxs: 1rem;

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
			[ path="/photogrammetry" ] &,
			[ path="/miniature-street-view" ] &,
			[ path="/works" ][ list="places" ] &,
			[ path="/works" ][ list="sphere" ] &,
			[ path="/works" ][ list="particles" ] & {
				overflow: hidden;
			}

			@media ( max-width: 650px ) {
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

			&[ hidden ] {
				display: none;
			}

			[ view-exit ] &:not( projects-views ) {
				opacity: 0;
			}

			[ view-enter ] &:not( projects-views ) {
				opacity: 1;
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
			src: url('/fonts/JetBrainsMono-Bold.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-Bold.woff') format('woff');
			font-weight: bold;
			font-style: normal;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-ExtraBold.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-ExtraBold.woff') format('woff');
			font-weight: bold;
			font-style: normal;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-ExtraBoldItalic.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-ExtraBoldItalic.woff') format('woff');
			font-weight: bold;
			font-style: italic;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-ExtraLight.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-ExtraLight.woff') format('woff');
			font-weight: 200;
			font-style: normal;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-BoldItalic.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-BoldItalic.woff') format('woff');
			font-weight: bold;
			font-style: italic;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-Italic.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-Italic.woff') format('woff');
			font-weight: normal;
			font-style: italic;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-LightItalic.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-LightItalic.woff') format('woff');
			font-weight: 300;
			font-style: italic;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-SemiBoldItalic.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-SemiBoldItalic.woff') format('woff');
			font-weight: 600;
			font-style: italic;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-SemiBold.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-SemiBold.woff') format('woff');
			font-weight: 600;
			font-style: normal;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-ThinItalic.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-ThinItalic.woff') format('woff');
			font-weight: 100;
			font-style: italic;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-Medium.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-Medium.woff') format('woff');
			font-weight: 500;
			font-style: normal;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-Thin.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-Thin.woff') format('woff');
			font-weight: 100;
			font-style: normal;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-Light.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-Light.woff') format('woff');
			font-weight: 300;
			font-style: normal;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-MediumItalic.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-MediumItalic.woff') format('woff');
			font-weight: 500;
			font-style: italic;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-ExtraLightItalic.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-ExtraLightItalic.woff') format('woff');
			font-weight: 200;
			font-style: italic;
			font-display: swap;
		}

		@font-face {
			font-family: 'C';
			src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2'),
				url('/fonts/JetBrainsMono-Regular.woff') format('woff');
			font-weight: normal;
			font-style: normal;
			font-display: swap;
		}

		`;

		return `
			<link rel="preload" href="/fonts/A.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/B.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Regular.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Thin.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-ExtraLight.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Light.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Medium.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Bold.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-ExtraBold.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-ExtraBoldItalic.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-BoldItalic.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Italic.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-LightItalic.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-SemiBoldItalic.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-ThinItalic.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-MediumItalic.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-ExtraLightItalic.woff2" as="font" type="font/woff2" crossorigin>
			<link rel="preload" href="/fonts/A.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/B.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Regular.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Thin.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-ExtraLight.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Light.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Medium.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Bold.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-ExtraBold.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-ExtraBoldItalic.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-BoldItalic.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-Italic.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-LightItalic.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-SemiBoldItalic.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-ThinItalic.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-MediumItalic.woff" as="font" type="font/woff" crossorigin>
			<link rel="preload" href="/fonts/JetBrainsMono-ExtraLightItalic.woff" as="font" type="font/woff" crossorigin>
		`;

	}

}
