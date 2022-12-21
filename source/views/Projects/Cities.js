import Button from '~/components/Button';
import Video from '~/components/Video';

export default class Cities extends HTMLElement {

	onKeyDown( parameters ) {

		if ( parameters.code !== 'Escape' ) return;
		Application.store.set( 'city', null );

	}

	onClick() {

		Application.store.set( 'city', null );

	}

	onPreFrame() {

		this.elements.cities.forEach( city => {

			const attribute = Application.store.city;
			const cityID = city.getAttribute( 'name' );
			city.toggleAttribute( 'visible', attribute === cityID );

		} );

	}

	static getCity( name, content ) {

		const projects = content.projects.map( projectID => {

			const {

				title,
				path,
				subtitle,
				location,
				date

			} = Application.content.get( `/${ projectID }` );

			const { projects } = Application.content;
			const index = projects.findIndex( project => project.path === path );
			const number = ( '00' + ( index + 1 ) ).substr( -2 );

			return html`

			<a href="/${ path }" internal>
				${ Video.render( `/public/${ path }/thumbnail.mp4` ) }
				<div>
					<h3>${ title }<span>| ${ number }</span></h3>
					<h4>${ subtitle }</h4>
					<h5> ${ location }, ${ date }</h5>
				</div>
			</a>

		`;

		} );

		const buttons = [ { attributes: [ 'close', '@click|projects-cities' ] } ];
		const { paragraphs } = content;

		return html`

		<projects-city blurred-background name="${ name }" #cities>

			${ buttons.map( Button.render ) }

			<city-block>

				<city-columns>

					<city-content>
						<h2>${ name }</h2>
						${ paragraphs.map( paragraph => html`<p>${ paragraph }</p>` ) }
					</city-content>

					<city-projects>
						<h2>Projects</h2>
						${ projects }
					</city-projects>

				</city-columns>

			</city-block>

		</projects-city>

		`;

	}

	static render() {

		css`

		projects-cities {
			& default-button {
				position: absolute;
				top: var( --margin-m );
				right: var( --margin-m );
			}
		}

		projects-city {
			position: fixed;
			top: 0;
			left: 0;
			height: 100vh;
			width: 100vw;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 15;
			background: rgba( 0, 0, 0, .5 );
			transition: opacity .5s var( --timing-function );
			opacity: 0;
			transition: opacity .5s var( --timing-function );
			cursor: default;

			&[ visible ] {
				opacity: 1;
				pointer-events: all;
			}

			& video-block {
				width: initial;
				margin-right: var( --margin-s );

				&:not( :last-child ) {
				}
			}

			& video {
				width: 100px !important;
				height: 100px !important;
			}

			& a {
				display: flex;
				margin-bottom: var( --margin-s );
				align-items: center;
			}

			& h2 {
				font-size: var( --font-size-xl );
				margin-bottom: var( --margin-s );
			}

			& h3 {
				font-family: var( --font-family-a );
				font-size: var( --font-size-l );
				width: initial;
				margin-bottom: 2px;

				& span {
					font-family: var( --font-family-b );
					font-size: .9em;
					opacity: .25;
				}
			}

			& h4 {
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );
				line-height: 1.4;
				margin-bottom: 4px;
			}

			& h5 {
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );
				opacity: .5;
			}
		}


		city-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: var( --margin-s );
		}

		city-columns {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: flex-start;
		}

		city-content {
			max-width: 500px;
			padding-right: var( --margin-s );
			margin-right: var( --margin-m );

			& p {
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );

				&:not( :last-child ) {
					margin-bottom: var( --margin-s );
				}

				&:last-child {
					font-style: italic;
				}
			}
		}

		city-projects {
			list-style: none;
		}

		`;

		const cities = Object
			.entries( Application.content.cities )
			.map( entry => Cities.getCity( ...entry ) );

		return html`

		<projects-cities>
			${ cities }
		</projects-cities>

		`;

	}

}

customElements.define( 'projects-cities', Cities );
