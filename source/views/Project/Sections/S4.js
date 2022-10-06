export default class S4 {

	static render( content ) {

		css`

		section-type-4 {
			display: flex;
			justify-content: center;
			align-items: flex-start;
			padding: calc( var( --margin-m ) * 2 );
			font-family: var( --font-family-c );

			@media ( max-width: 1280px ) {
			}

			@media ( max-width: 768px ) {
				padding: var( --margin-s );
				flex-direction: column;
			}

			& > p {
				max-width: 40vw;
				padding: var( --margin-m );
				font-size: var( --font-size-s );
				line-height: 1.6;

				@media ( max-width: 768px ) {
					padding: var( --margin-m ) 0;
					margin-top: var( --margin-s );
					max-width: initial;
				}
			}

			& video,
			& img {
				max-height: 750px;
				object-fit: cover;
			}

			& ul {
				margin-left: var( --margin-m );
				font-size: var( --font-size-xs );

				@media ( max-width: 768px ) {
					margin-left: 0;
					column-count: 2;
					margin-top: var( --margin-m );
					column-gap: var( --margin-m );
				}
			}

			& li {
				display: flex;
				flex-direction: column;

				&:not( :last-child ) {
					margin-bottom: var( --margin-xs );
				}

				& h5 {
					font-weight: bold;
				}

				& p {
					line-height: 1.5;
				}

			}

			& span {
				display: block;
				margin-top: var( --margin-s );
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );
			}

		}

		`;

		const { details, paragraphs, anchor } = content;
		const { source, caption } = content.media;

		const list = ! details ? '' : Object.entries( details )
			.map( ( [ name, value ] ) => html`
				<li>
					<h5>${ name }</h5>
					<p>${ value }</p>
				</li>
			` );

		const alt = caption
			.replace( /<br>/g, '-' )
			.replace( /\t/g, '' );

		return html`

		<section-type-4 section ${ anchor ? `anchor="${ anchor }"` : '' }>

			<div>
				<img src="${ source }" alt="${ alt }"/>
				<span>${ caption }</span>
			</div>

			${ details ? html`<ul>${ list }</ul>` : '' }
			${ paragraphs ? html`<p>${ paragraphs }</p>` : '' }

		</section-type-4>

		`;

	}

}
