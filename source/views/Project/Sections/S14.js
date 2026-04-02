export default class S14 {

	static render( content ) {

		css`

		section-type-14 {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: calc( var( --margin-m ) * 3 ) calc( var( --margin-m ) * 2 );
			background: var( --color-black );
			text-align: center;
		}

		section-type-14 article {
			width: min( 1600px, calc( 100vw - ( var( --margin-m ) * 2 ) ) );
		}

		section-type-14 h3 {
			margin-bottom: var( --margin-m );
			font-size: clamp( 2.25rem, 4vw, 4rem );
			text-align: center;
		}

		section-type-14 p {
			font-size: clamp( 2rem, 3vw, 3.25rem );
			font-family: var( --font-family-c );
			line-height: 2;
		}

		@media ( max-width: 1024px ) {
			section-type-14 {
				padding: calc( var( --margin-m ) * 2 ) var( --margin-s );
			}

			section-type-14 p {
				font-size: clamp( 1.5rem, 5vw, 2.25rem );
			}
		}

		`;

		const { title, paragraphs, anchor } = content;

		return html`

		<section-type-14 section ${ anchor ? `anchor="${ anchor }"` : '' }>
			<article>
				${ title ? html`<h3 font-style-title>${ title }</h3>` : '' }
				${ paragraphs ? html`<p>${ paragraphs }</p>` : '' }
			</article>
		</section-type-14>

		`;

	}

}
