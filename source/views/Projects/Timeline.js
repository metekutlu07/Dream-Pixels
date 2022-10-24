export default class Timeline extends HTMLElement {

	onConnected() {
	}

	onClick( event ) {

		const { currentTarget } = event;
		const { camera, titles } = Application.particles;
		const target = titles[ this.items.indexOf( currentTarget ) ].progress;

		const progress = Math.euclideanModulo( camera.scroll, 1 );
		const backwardDelta = 1 + progress - target;
		const forwardDelta = target - progress;

		if ( backwardDelta < forwardDelta ) camera.scroll -= backwardDelta;
		else if ( forwardDelta < backwardDelta ) camera.scroll += forwardDelta;

	}

	onPreFrame() {

		if ( ! this.items || ! Application.particles ) return;

		const { camera, titles } = Application.particles;
		const progress = Math.euclideanModulo( camera.progress, 1 );

		this.items.forEach( ( itemA, index ) => {

			const titleA = titles[ index ];
			const titleB = titles[ index + 1 ];

			const min = titleA ? titleA.progress : -Infinity;
			const max = titleB ? titleB.progress : Infinity;

			itemA.toggleAttribute( 'selected', progress > min && progress < max );

		} );

	}

	onLoad( files ) {

		if ( ! files[ 'common' ] ) return;

		this.projects = {};

		const { jsons } = files[ 'common' ];
		const { images, colors } = jsons[ 'Colors.json' ];

		for ( let i = 0; i < colors.length; i++ ) {

			const color = colors[ i ];
			const imageID = color.split( '|' )[ 1 ];

			const { path } = images[ imageID ];
			this.projects[ path ] = true;

		}

		this.items = this.elements.items.filter( item => {

			const path = item.getAttribute( 'id' );
			const keys = Object.keys( this.projects );
			const project = keys.find( key => key === path );

			if ( project ) item.progress = project.progress;
			else item.parentNode.removeChild( item );

			return project;

		} );

	}

	static render() {

		css`

		project-timeline {
			position: fixed;
			right: var( --margin-m );
			top: 0;
			bottom: 0;
			margin: auto;
			height: 500px;
			opacity: 0;
			transition: opacity .1s var( --timing-function );
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: center;
			font-family: var( --font-family-c );
			font-size: var( --font-size-s );
			pointer-events: none;

			& ul {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: flex-end;
				pointer-events: none;
			}

			& li {
				text-align: right;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				pointer-events: all;
				cursor: pointer;

				&:hover,
				&[ selected ] {
					&:after {
						transform: scale( 1.75 );
						background: var( --color-white );
					}
				}

				&:not( :last-child ) {
					margin-bottom: var( --margin-xs );
					&:before {
						content: '';
						position: absolute;
						display: block;
						top: 100%;
						right: 4px;
						width: 1px;
						height: var( --margin-xs );
						background: var( --color-white );
						opacity: .25;
					}
				}

				&:after {
					content: '';
					display: block;
					width: 10px;
					height: 10px;
					border: 1px solid var( --color-white );
					border-radius: 50%;
					margin-left: var( --margin-s );
					transition: background .25s var( --timing-function ),
						transform .25s var( --timing-function );
				}
			}

			[ view-enter ][ list="particles" ][ particles="timeline" ] & {
				opacity: 1;

				& li {
					pointer-events: all;
				}
			}
		}

		`;

		const { projects } = Application.content;
		const list = projects.map( project => html`
			<li id="${ project.path }" @click #items>
				${ project.title }
			</li>` );

		return html`

		<project-timeline>
			<ul>${ list }</ul>
		</project-timeline>

		`;

	}

}

customElements.define( 'project-timeline', Timeline );
