import Button from '~/components/Button';
import Video from '~/components/Video';

export default class Popins extends HTMLElement {

	onKeyDown( parameters ) {

		if ( parameters.code !== 'Escape' ) return;
		Application.store.set( 'popin', null );

	}

	onClick() {

		Application.store.set( 'popin', null );

	}

	onPreFrame() {

		this.elements.popins.forEach( popin => {

			const attribute = Application.store.popin;
			const popinID = popin.getAttribute( 'name' );
			popin.toggleAttribute( 'visible', attribute === popinID );

		} );

	}

	static getPopin( name, content ) {

		const projects = content.projects ? content.projects.map( projectID => {

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

		} ) : '';

		const buttons = [ { attributes: [ 'close', '@click|projects-popins' ] } ];
		const { paragraphs } = content;

		return html`

		<projects-popin blurred-background name="${ name }" #popins>

			${ buttons.map( Button.render ) }

			<popin-block>

				<popin-columns>

					<popin-content>
						<h2>${ name }</h2>
						${ paragraphs.map( paragraph => html`<p>${ paragraph }</p>` ) }
					</popin-content>

					${ content.projects ? html`

					<popin-projects>
						<h2>Projects</h2>
						${ projects }
					</popin-projects>

					` : '' }

				</popin-columns>

			</popin-block>

		</projects-popin>

		`;

	}

	static render() {

		css`

		projects-popins {
			z-index: 20;
			position: absolute;

			& default-button {
				position: absolute;
				top: var( --margin-m );
				right: var( --margin-m );
				z-index: 2;
			}
		}

		projects-popin {
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
			transition: opacity .5s var( --timing-function ), visibility .5s var( --timing-function );
			cursor: default;
			opacity: 0;
			visibility: hidden;

			&[ visible ] {
				opacity: 1;
				visibility: visible;
				pointer-events: all;
			}

			& video-block {
				width: initial;
				margin-right: var( --margin-s );
				flex-shrink: 0;
			}

			& video {
				width: 100px !important;
				height: 100px !important;

				@media ( max-width: 650px ) {
					width: 75px !important;
					height: 75px !important;
				}
			}

			& a {
				display: flex;
				margin-bottom: var( --margin-s );
				align-items: center;
			}

			& h2 {
				font-size: var( --font-size-xl );
				font-family: var( --font-family-b );
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

				@media ( max-width: 650px ) {
					font-size: var( --font-size-m );
				}
			}

			& h4 {
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );
				line-height: 1.4;
				margin-bottom: 4px;

				@media ( max-width: 650px ) {
					font-size: var( --font-size-xs );
				}
			}

			& h5 {
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );
				opacity: .5;

				@media ( max-width: 650px ) {
					font-size: var( --font-size-xs );
				}
			}
		}


		popin-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: var( --margin-s );
		}

		popin-columns {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: flex-start;

			@media ( max-width: 1024px ) {
				flex-direction: column;
				justify-content: flex-start;
			}
		}

		popin-block {
				max-height: 100%;
				padding: calc( var( --margin-m ) * 2 );
				overflow: auto;

			@media ( max-width: 650px ) {
				padding: var( --margin-m ) !important;
				padding-top: calc( var( --margin-m ) * 3 ) !important;
			}
		}

		popin-content {
			max-width: 40%;
			padding-right: var( --margin-s );
			margin-right: var( --margin-m );

			@media ( max-width: 1024px ) {
				max-width: initial;
				margin-right: initial;
			}

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

		popin-projects {
			list-style: none;

			@media ( max-width: 1024px ) {
				margin-top: var( --margin-m );
			}
		}

		`;

		const popins = Object
			.entries( Application.content.popins )
			.map( entry => Popins.getPopin( ...entry ) );

		return html`

		<projects-popins>
			${ popins }
		</projects-popins>

		`;

	}

}

customElements.define( 'projects-popins', Popins );
