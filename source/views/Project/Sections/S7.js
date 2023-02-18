export default class S7 extends HTMLElement {

	static render( content ) {

		css`

		section-type-7 {
			display: flex;
			padding: 0 10vw;
			background: var( --color-black );

			& h3 {
				text-align: center;
				font-size: var( --font-size-xxl );
				font-family: var( --font-family-a );

				@media ( max-width: 1280px ) {
					font-size: var( --font-size-xl );
				}

				@media ( max-width: 1024px ) {
					font-size: var( --font-size-l );
				}
			}

			& img {
				object-fit: cover;
				width: 100%;
			}

			& [col-one] {
				width: 30%;
				padding: 32px;
			}

			& [col-two] {
				width: 70%;
				padding: 32px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				row-gap: 16px;

				& div {
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					column-gap: 32px;
					padding: 32px;

					& a {
						width: 35%;
					}
				}
			}

			@media ( max-width: 650px ) {
				flex-direction: column;
				padding: 16px;

				& [col-one] {
					display: none;
				}

				& [col-two] {
					width: 100%;
					padding: 0;

					& div {
						padding: 16px;

						& a {
							width: 40%;
						}
					}
				}
			}

		}

		`;

		const { title, appStoreLink, previewImage, qr } = content;

		return html`<section-type-7 section>

			<div col-one>
				<img src="${ previewImage }" alt="App preview"/>
			</div>
			<div col-two>
				<h3>${ title }</h3>
				<div>
					<a href="${ appStoreLink }">
						<img src="/public/appstore-download.png" alt="Download app"/>
					</a>
					<a>
						<img src="${ qr }" alt="QR code"/>
					</a>
				</div>
			</div>
		</section-type-7>`;

	}

}

customElements.define( 'section-type-7', S7 );
