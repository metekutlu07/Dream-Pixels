import Aside from '~/components/Aside';

import Maps from '../Maps';
import Buttons from '../Buttons';

export default class S5 extends HTMLElement {

	onClick( event ) {

		const { currentTarget } = event;
		const { asides, buttons } = this.elements;
		let index = -1;

		const { points } = Application.scene.miniature;

		if ( currentTarget === this && points ) {

			index = points.children.findIndex( point => point.isHovered );

		} else index = buttons.indexOf( currentTarget );

		if ( index === -1 ) return;
		asides.forEach( aside => aside[ aside.index === index ? 'enter' : 'exit' ]() );

	}

	static render( content ) {

		css`

		section-type-5 {
			display: flex;
			width: 100vw;
			height: 100vh;
			position: absolute;
			top: 0;

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
				media,

			} = point;

			if ( ! paragraphs ) return '';

			const { source, caption } = media;

			return Aside.render( html`

				<img src="${ source }" alt="${ caption }"/>
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
