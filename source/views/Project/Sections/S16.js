export default class S16 {

	static render( content ) {

		css`

		section-type-16 {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 140px var( --margin-m );
			background: var( --color-black );
			text-align: center;
		}

		section-type-16 p {
			max-width: 1200px;
			font-family: var( --font-family-a );
			font-size: clamp( 2.8rem, 4vw, 5.2rem );
			line-height: 1.3;
			letter-spacing: .04em;
		}

		@media ( max-width: 650px ) {
			section-type-16 {
				padding: 88px var( --margin-s );
			}

			section-type-16 p {
				font-size: clamp( 2.2rem, 7vw, 3.4rem );
			}
		}

		`;

		const { anchor, text = '' } = content;

		return html`

		<section-type-16 section ${ anchor ? `anchor="${ anchor }"` : '' }>
			<p>${ text }</p>
		</section-type-16>

		`;

	}

}
