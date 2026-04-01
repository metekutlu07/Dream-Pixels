import Aside from '~/components/Aside';

export default class S6 extends HTMLElement {

	onConnected() {

		this.updateControls();

	}

	onClick( event ) {

		const { currentTarget } = event;
		const action = currentTarget.getAttribute( 'action' );

		if ( action === 'load-artwork' ) {

			const artworkID = currentTarget.getAttribute( 'artworkID' );
			Application.scene.artwork.load( artworkID );
			return;

		}

		if ( action === 'export-ar' ) {

			Application.scene.export();
			return;

		}

		if ( action === 'toggle-wireframe' ) {

			Application.store.toggle( 'display-wireframe' );
			this.updateControls();
			return;

		}

		if ( action === 'toggle-render' ) {

			Application.scene.artwork.toggle();
			this.updateControls();

		}

	}

	updateControls() {

		const renderButton = this.querySelector( '[ action="toggle-render" ]' );
		const wireframeButton = this.querySelector( '[ action="toggle-wireframe" ]' );
		if ( renderButton ) {

			const label = Application.scene.artwork.renderAsPoints ? 'Solid' : 'Point Cloud';
			renderButton.textContent = label;
			renderButton.toggleAttribute( 'active', Application.scene.artwork.renderAsPoints );

		}

		if ( wireframeButton ) wireframeButton.toggleAttribute( 'active', Application.store[ 'display-wireframe' ] );

	}

	static render( content ) {

		css`

		section-type-6 {
			display: flex;
			width: 100vw;
			height: 100%;
			position: absolute;
			top: 0;

			& aside-block {
				pointer-events: all;
			}

			& photogrammetry-controls {
				position: fixed;
				left: 50%;
				bottom: var( --margin-m );
				transform: translateX( -50% );
				display: flex;
				align-items: stretch;
				justify-content: center;
				pointer-events: all;
				border: var( --border-size ) solid var( --border-color );
				background: rgba( 0, 0, 0, .28 );
				backdrop-filter: blur( 10px );
				-webkit-backdrop-filter: blur( 10px );

				@media ( max-width: 650px ) {
					left: 50%;
					bottom: var( --margin-s );
					transform: translateX( -50% );
				}
			}

			& photogrammetry-control {
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				min-height: 60px;
				padding: 0 24px;
				font-size: 1.65rem;
				font-family: var( --font-family-c );
				letter-spacing: .04em;
				text-transform: uppercase;
				white-space: nowrap;

				&:not( :last-child ) {
					border-right: var( --border-size ) solid var( --border-color );

					@media ( max-width: 650px ) {
						border-right: none;
						border-bottom: var( --border-size ) solid var( --border-color );
					}
				}

				@media ( hover: hover ) {
					&:hover {
						background: rgba( 255, 255, 255, .08 );
					}
				}

				&[ active ] {
					background: var( --color-white );
					color: var( --color-black );
				}
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
			}

			& p {
				line-height: 1.2em;
				margin-top: 5px;
			}
		}

		`;

		const { artworks } = content;

		const list = Object.keys( artworks ).map( artworkID => {

			const { location, city, title } = artworks[ artworkID ];

			return html`

			<li
				artworkID="${ artworkID }"
				action="load-artwork"
				@click|section-type-6
			>

				<img
					src="${ `public/photogrammetry/${ artworkID }.png` }"
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
		const aside = Aside.render( innerHTML, [ 'scrollable', 'floating-panel', 'photogrammetry-library' ] );
		const controls = html`
			<photogrammetry-controls blurred-background>
				<photogrammetry-control action="export-ar" @click|section-type-6>AR</photogrammetry-control>
				<photogrammetry-control action="toggle-wireframe" @click|section-type-6>Wireframe</photogrammetry-control>
				<photogrammetry-control action="toggle-render" @click|section-type-6>Point Cloud</photogrammetry-control>
			</photogrammetry-controls>
		`;
		return html`<section-type-6 section>${ aside }${ controls }</section-type-6>`;

	}

}

customElements.define( 'section-type-6', S6 );
