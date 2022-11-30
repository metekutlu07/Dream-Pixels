import View from '~/components/View';

import S1 from './Sections/S1';
import S2 from './Sections/S2';
import S3 from './Sections/S3';
import S4 from './Sections/S4';
import S5 from './Sections/S5';
import S6 from './Sections/S6';

import Navigation from './Navigation';

const Types = { S1, S2, S3, S4, S5, S6 };

export default class Project extends View {

	static path = '/:project';
	static silent = false;

	onConnected() {

		super.onConnected();

		document.body.appendChild( this.elements.navigation );

	}

	remove() {

		super.remove();

		this.elements.navigation.remove();

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

		`;

		const content = Application.content.get( parameters.project );

		const { sections } = content;
		const blocks = sections.map( ( section, index ) => {

			const Section = Types[ section.type ];
			if ( ! index ) Object.assign( section, content );
			return Section.render( section );

		} );

		return html`

		<project-view view>

			${ blocks }
			${ Navigation.render( parameters ) }

		</project-view>

		`;

	}

}

customElements.define( 'project-view', Project );
