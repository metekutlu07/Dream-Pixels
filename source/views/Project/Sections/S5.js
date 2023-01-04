import Aside from '~/components/Aside';

import Maps from '../Maps';
import Buttons from '../Buttons';

export default class S5 extends HTMLElement {

	onClick( event ) {

		const { currentTarget } = event;
		const { asides, buttons } = this.elements;
		const { points } = Application.scene.miniature;

		let index = -1;

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

		}

		`;

		const { points, path } = content;

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

			`, [ 'scrollable', '#asides|section-type-5' ] );

		} );

		const map = path === 'miniature-street-view' ? [

			Buttons.render( content ),
			Maps.render( content )

		] : '';

		return html`<section-type-5 section @click>

			${ panels }
			${ map }

		</section-type-5>`;

	}

}

customElements.define( 'section-type-5', S5 );
