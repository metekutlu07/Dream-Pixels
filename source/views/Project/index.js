import View from '~/components/View';

import S1 from './Sections/S1';
import S2 from './Sections/S2';
import S3 from './Sections/S3';
import S4 from './Sections/S4';
import S5 from './Sections/S5';
import S6 from './Sections/S6';
import S7 from './Sections/S7';
import S12 from './Sections/S12';
import S13 from './Sections/S13';
import S14 from './Sections/S14';
import S15 from './Sections/S15';
import S16 from './Sections/S16';

const Types = { S1, S2, S3, S4, S5, S6, S7, S8: S3, S9: S3, S10: S4, S11: S4, S12, S13, S14, S15, S16 };

export default class Project extends View {

	static path = '/:project';
	static silent = false;

	onConnected() {

		super.onConnected();

	}

	remove() {

		super.remove();

	}

	static render( parameters ) {

		css`

		project-view {
			width: 100vw;
			display: block;
			padding-bottom: 300px;

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

		</project-view>

		`;

	}

}

customElements.define( 'project-view', Project );
