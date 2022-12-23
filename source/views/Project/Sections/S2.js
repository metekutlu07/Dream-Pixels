export default class S2 {

	static render( content ) {

		css`

		section-type-2 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			padding: calc( var( --margin-m ) * 2 );
			padding-left: calc( var( --margin-m ) * 4 );

			@media ( max-width: 1024px ) {
				flex-direction: column;
				padding: calc( var( --margin-m ) ) calc( var( --margin-s ) );
			}

			& > *:not( :last-child ) {
				margin-right: var( --margin-m );
			}

			& h3 {
				font-size: var( --font-size-xxl );
				text-align: left;
				margin-bottom: var( --margin-s );
				max-width: 85%;

				@media ( max-width: 1280px ) {
					font-size: var( --font-size-xl );
				}

				@media ( max-width: 1024px ) {
					text-align: left;
					margin-bottom: var( --margin-s );
					margin-right: 0 !important;

					& br {
						display: none;
					}
				}
			}

			& p {
				font-size: var( --font-size-l );
				font-family: var( --font-family-c );
				line-height: var( --line-height );
				max-width: 85%;

				@media ( max-width: 1024px ) {
					max-width: initial;
				}
			}

		}

		`;

		const { title, paragraphs, anchor } = content;

		return html`

		<section-type-2 section ${ anchor ? `anchor="${ anchor }"` : '' }>

			${ title ? html`<h3 font-style-title>${ title }</h3>` : '' }
			${ paragraphs ? html` <p>${ paragraphs }</p>` : '' }

		</section-type-2>

		`;

	}

}
