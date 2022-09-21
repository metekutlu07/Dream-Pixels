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

	static render( parameters ) {

		css`

		project-view {
			width: 100vw;
			display: block;
		}

		[ section ] {
			position: relative;
			min-width: 100%;
		}

		`;

		const {

			title,
			subtitle,
			sections,
			path,
			description

		} = Application.content.get( parameters.project );

		const blocks = sections.map( ( content, index ) => {

			const Section = Types[ content.type ];
			if ( ! index ) Object.assign( content, { title, subtitle, path, description } );
			return Section.render( content );

		} );

		return html`

		<project-view view>
			${ blocks }
		</project-view>

		`;

	}

}

customElements.define( 'project-view', Project );
