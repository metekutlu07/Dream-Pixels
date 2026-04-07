import Aside from '~/components/Aside';

import Maps from '../Maps';
import Buttons from '../Buttons';

export default class S5 extends HTMLElement {

	onConnected() {

		clearTimeout( this.interactionTimeout );
		if ( Application.store.path === '/virtual-miniature' ) {

			Application.store.set( 'miniature-interaction-ready', false );
			this.interactionTimeout = setTimeout( () => {

				Application.store.set( 'miniature-interaction-ready', true );

			}, 12250 );

		} else Application.store.set( 'miniature-interaction-ready', true );

		this.updateControls();

	}

	onDisconnected() {

		clearTimeout( this.interactionTimeout );
		Application.store.set( 'miniature-interaction-ready', true );

	}

	onClick( event ) {

		if ( Application.store.path === '/virtual-miniature' && ! Application.store[ 'miniature-interaction-ready' ] ) return;

		const { currentTarget } = event;
		const { asides, buttons } = this.elements;
		const { points } = Application.scene.miniature;
		const action = currentTarget.getAttribute( 'action' );

		let index = -1;

		if ( action === 'export-ar' ) {

			Application.scene.export();
			return;

		}

		if ( action === 'toggle-orthographic' ) {

			Application.camera.setOrthography();
			this.updateControls();
			return;

		}

		if ( currentTarget.hasAttribute( 'panorama' ) ) {

			const index = currentTarget.getAttribute( 'panorama' );
			Application.scene.panorama.load( index );

		} else if ( buttons ) {

			index = buttons.indexOf( currentTarget );

		} else if ( index === -1 && points ) {

			const point = points.children.find( point => point.isHovered );
			if ( point ) index = point.index;

		}

		if ( index === -1 ) return;

		asides.forEach( aside => aside[ aside.index === index ? 'enter' : 'exit' ]() );

	}

	onPreFrame() {

		this.updateControls();

	}

	updateControls() {

		const orthographicButton = this.querySelector( '[ action="toggle-orthographic" ]' );
		if ( orthographicButton ) orthographicButton.toggleAttribute( 'active', Application.camera.isOrthographic );

	}

	static render( content ) {

		css`

			section-type-5 {
				display: flex;
				width: 100vw;
				height: 100%;
			position: absolute;
			top: 0;
			pointer-events: none;

			& > * {
				pointer-events: all;
			}

				& aside-block {
					& img {
						margin: var( --margin-m ) 0;
					}
				}

				& project-scene-controls {
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
						bottom: var( --margin-s );
					}
				}

				& project-scene-control {
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

		`;

		const { points, path } = content;

		const panelAttributes = [ 'scrollable', '#asides|section-type-5' ];
		if ( path === 'virtual-miniature' ) panelAttributes.push( 'floating-panel', 'tag-linked-panel' );
		const panels = points.map( point => {

			const {

				title,
				subtitle,
				paragraphs,
				media

			} = point;

			if ( ! paragraphs ) return '';

			const image = media ? `<img src="${ media.source }" alt="${ media.caption }"/>` : '';

			return Aside.render( html`

				${ image }
				<h3 font-style-title>${ title }</h3>
				<h4>${ subtitle }</h4>
				<p>${ paragraphs }</p>

			`, panelAttributes );

		} );

		const map = path === 'miniature-street-view' ? [

			Buttons.render( content ),
			Maps.render( content )

		] : '';

		const controls = path === 'virtual-miniature' ? html`
			<project-scene-controls blurred-background>
				<project-scene-control action="export-ar" @click|section-type-5>AR</project-scene-control>
				<project-scene-control action="toggle-orthographic" @click|section-type-5>Orthographic</project-scene-control>
			</project-scene-controls>
		` : '';

		return html`<section-type-5 section @click>

			${ panels }
			${ map }
			${ controls }

		</section-type-5>`;

	}

}

customElements.define( 'section-type-5', S5 );
