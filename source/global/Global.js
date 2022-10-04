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

			--font-family-a: "Nord";
			--font-family-b: "Sud";
			--font-family-c: "SF Mono";

			--font-size-xxl: 6.5rem;
			--font-size-xl: 3.5rem;
			--font-size-l: 2.25rem;
			--font-size-m: 1.6rem;
			--font-size-s: 1.4rem;
			--font-size-xs: 1.2rem;

			--line-height: 1.8;
			--border-size: 1px;
			--border-color: transparent;
			--background-color: rgba( 0, 0, 0, .25 );
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
			[ path="/photogrammetry" ] &,
			[ path="/miniature-street-view" ] &,
			[ path="/projects" ][ list="sphere" ] &,
			[ path="/projects" ][ list="particles" ] & {
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
				font-size: 1.5em;
			}
		}

		[ blurred-background ] {
			--blur: blur( 10px );
			backdrop-filter: var( --blur );
			-webkit-backdrop-filter: var( --blur );
		}

		[ view ] {
			opacity: 0;
			transition: opacity .75s var( --timing-function );

			&[ hidden ] {
				display: none;
			}

			[ view-exit ] &:not( projects-views ) {
				opacity: 0;
				transition: opacity .75s var( --timing-function );
			}

			[ view-enter ] &:not( projects-views ) {
				opacity: 1;
				transition: opacity .75s var( --timing-function );
			}

		}

		@font-face {
			font-family: "Nord";
			src: url( "/fonts/Nord-Regular.otf") format( "opentype" );
			font-style: normal;
			font-weight: normal;
			font-display: swap;
		}

		@font-face {
			font-family: "Sud";
			src: url( "/fonts/Sud-Regular.otf") format( "opentype" );
			font-style: normal;
			font-weight: normal;
			font-display: swap;
		}

		@font-face {
			font-family: "SF Mono";
			src: url( "/fonts/SF-Mono-Regular.otf") format( "opentype" );
			font-style: normal;
			font-weight: normal;
			font-display: swap;
		}

		`;

		return '<link rel="preload" href="/fonts/SF-Mono-Regular.otf" as="font" type="font/otf" crossorigin>';

	}

}
