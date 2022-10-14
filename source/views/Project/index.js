import View from '~/components/View';

import S1 from './Sections/S1';
import S2 from './Sections/S2';
import S3 from './Sections/S3';
import S4 from './Sections/S4';
import S5 from './Sections/S5';
import S6 from './Sections/S6';

const Types = { S1, S2, S3, S4, S5, S6 };

export default class Project extends View {

	static path = '/:project';
	static silent = false;

	onClick( event ) {

		const { currentTarget } = event;

		const query = `[anchor="${ currentTarget.textContent }"]`;
		const element = document.querySelector( query );
		const top = element.offsetTop;

		document.body.scrollTo( { top, behavior: 'smooth' } );

	}

	static render( parameters ) {

		css`

		project-view {
			width: 100vw;
			display: block;

			[ path="/miniature-street-view" ] &,
			[ path="/virtual-miniature" ] &,
			[ path="/photogrammetry" ] & {
				z-index: 25;
				position: relative;
			}

			[ path="/when-gaspard-paints-a-gospel" ] &,
			[ path="/miniature-street-view" ] &,
			[ path="/virtual-miniature" ] &,
			[ path="/photogrammetry" ] &,
			[ path="/augustus-ar" ] & {
				pointer-events: none;
			}

		}

		[ section ] {
			position: relative;
			min-width: 100%;
		}

		project-navigation {
			z-index: 2;
			position: fixed;
			font-size: var( --font-size-s );
			font-family: var( --font-family-c );
			right: var( --margin-m );
			top: calc( var( --margin-m ) * 4 );
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: flex-end;
		}

		project-anchor {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: var( --margin-xs );
			cursor: pointer;

			&:after {
				content: '';
				display: block;
				height: 10px;
				width: 10px;
				border: 1px solid white;
				border-radius: 50%;
				margin-left: 10px;
			}
		}

		`;

		const content = Application.content.get( parameters.project );
		const { sections } = content;

		const anchors = sections
			.filter( section => section.anchor )
			.map( section => html`<project-anchor @click>${ section.anchor }</project-anchor>` );

		const blocks = sections.map( ( section, index ) => {

			const Section = Types[ section.type ];
			if ( ! index ) Object.assign( section, content );
			return Section.render( section );

		} );

		return html`

		<project-view view>
			<project-navigation>${ anchors }</project-navigation>
			${ blocks }
		</project-view>

		`;

	}

}

customElements.define( 'project-view', Project );
