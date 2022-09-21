import Aside from '~/components/Aside';

export default class S6 extends HTMLElement {

	onClick( event ) {

		const { currentTarget } = event;
		const artworkID = currentTarget.getAttribute( 'artworkID' );
		Application.scene.artwork.load( artworkID );

	}

	static render( content ) {

		css`

		section-type-6 {
			display: flex;
			width: 100vw;
			height: 100vh;
			position: absolute;
			top: 0;

			& default-button {
				display: none !important;
			}

		}

		artwork-list {

			& li {
				cursor: pointer;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: var( --margin-m ) 0;
				transition: all .75s var( --timing-function );

				&:not( :last-child ) {
					border-bottom: var( --border-size ) solid var( --border-color );
				}
			}

			& artwork-description {
				margin-top: var( --margin-m );
				margin-left: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			& img {
				position: relative;
				max-height: 200px;
				object-fit: contain;
				object-position: center;
			}

			& h3 {
				font-size: var( --font-size-l ) !important;
				margin-bottom: 5px !important;
			}

			& p {
				line-height: 1.2em;
			}
		}

		`;

		const { artworks } = content;

		const list = Object.keys( artworks ).map( artworkID => {

			const { location, city, title } = artworks[ artworkID ];

			return html`

			<li
				artworkID="${ artworkID }"
				@click|section-type-6
			>

				<img
					src="${ `public/Photogrammetry/${ artworkID }.png` }"
					alt="${ title } - ${ location }, ${ city }"
				/>

				<artwork-description>
					<h3>${ title }</h3>
					<p>${ location }</p>
					<p>${ city }</p>
				</artwork-description>

			</li>

			`;

		} );

		const innerHTML = html`<artwork-list>${ list }</artwork-list>`;
		const aside = Aside.render( innerHTML, [ 'scrollable' ] );
		return html`<section-type-6 section>${ aside }</section-type-6>`;

	}

}

customElements.define( 'section-type-6', S6 );
