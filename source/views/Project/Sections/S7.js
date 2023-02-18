export default class S7 extends HTMLElement {

	static render( content ) {

		css`

		section-type-7 {
			display: flex;
			padding: 0 20vw;

			& h3 {
				text-align: center;
				font-size: var( --font-size-xl );
				font-family: var( --font-family-a );

				@media ( max-width: 1280px ) {
					font-size: var( --font-size-l );
				}
			}

			& img {
				object-fit: cover;
				width: 100%;
			}

			& [col-one] {
				width: 30%;
				padding: 16px;
			}

			& [col-two] {
				width: 70%;
				padding: 16px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				row-gap: 32px;

				& div {
					display: flex;
					align-items: center;

					& a {
						width: 50%;
						padding: 16px;
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
