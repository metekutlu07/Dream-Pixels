import Handle from '~/assets/icons/Handle';

export default class Timeline extends HTMLElement {

	constructor() {

		super();
		this.selectedTimelineItem = null;
		this.previousSelectedTimelineItem = null;

	}

	onConnected() {

		this.setProjects();

	}

	onClick( event ) {

		const { currentTarget } = event;

		if ( currentTarget.hasAttribute( 'scroll-top' ) ) {

			this.scrollTimeline( 'top' );
			return;

		}

		if ( currentTarget.hasAttribute( 'scroll-bottom' ) ) {

			this.scrollTimeline( 'bottom' );
			return;

		}

		const { titles } = Application.particles;
		const camera = Application.scene.cameras[ 'Timeline' ];
		const target = titles[ this.items.indexOf( currentTarget ) ].progress;

		const progress = Math.euclideanModulo( camera.scroll, 1 );
		const backwardDelta = 1 + progress - target;
		const forwardDelta = target - progress;

		if ( backwardDelta < forwardDelta ) camera.scroll -= backwardDelta;
		else if ( forwardDelta < backwardDelta ) camera.scroll += forwardDelta;

	}

	scrollTimeline( direction ) {

		if ( direction == 'top' ) {

			this.elements.container.scrollTop -= 250;

		} else {

			this.elements.container.scrollTop += 250;

		}

	}

	onPreFrame() {

		if ( ! Application.particles ) return;

		const { titles } = Application.particles;
		const camera = Application.scene.cameras[ 'Timeline' ];
		const progress = Math.euclideanModulo( camera.progress, 1 );

		if ( ! this.items ) return;

		this.items.forEach( ( itemA, index ) => {

			const titleA = titles[ index ];
			const titleB = titles[ index - 1 ];

			const min = titleA ? titleA.progress : -Infinity;
			const max = titleB ? titleB.progress : Infinity;

			itemA.toggleAttribute( 'selected', progress > min && progress < max );

		} );

		// Autoscroll to active timeline item on canvas scroll
		this.selectedTimelineItem = this.items.find( item => item.hasAttribute( 'selected' ) );
		if ( this.selectedTimelineItem && this.previousSelectedTimelineItem !== this.selectedTimelineItem ) {

			this.selectedTimelineItem.scrollIntoView();
			this.previousSelectedTimelineItem = this.selectedTimelineItem;

		}

	}

	onLoad() {

		this.setProjects();

		// scroll to beginning date onload
		setTimeout( () => {

			this.elements.beginning.scrollIntoView();

		}, 1000 );

	}

	setProjects() {

		if ( ! Application.assets[ 'common' ] ) return;

		this.projects = {};

		const { jsons } = Application.assets[ 'common' ];
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

			if ( ! project ) {

				item.style.display = 'none';
				return false;

			}

			return true;

		} );

		this.items.forEach( ( item, index ) => {

			const { titles } = Application.particles;
			const { progress } = titles[ index ];
			item.progress = progress;

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
			display: flex;
			align-items: center;
			font-family: var( --font-family-c );
			font-size: var( --font-size-s );
			pointer-events: none;

			@media ( max-width: 1024px ) {
				height: 300px;
			}

			@media ( max-width: 650px ) {
				right: var( --margin-s );
			}

			timeline-navigation {
				position: absolute;
				right: 0;
				display: flex;
				align-items: center;
				cursor: pointer;
				pointer-events: all;
				border: var( --border-size ) solid var( --border-color );

				@media ( hover: hover ) {
					&:hover {
						background-color: rgba( 255, 255, 255, .25 );
					}
				}

				& svg {
					height: 32px;
					width: 32px;
					fill: var( --color-white );
				}

				&[ scroll-top ] {
					top: -48px;

					& svg {
						transform: rotate(270deg);
					}
				}

				&[ scroll-bottom ] {
					bottom: -48px;

					& svg {
						transform: rotate(90deg);
					}
				}
			}

			& ul {
				height: 100%;
				padding-right: 8px;
				pointer-events: none;
				overflow-y: scroll;
				scroll-behavior: smooth;
			}

			& li {
				text-align: right;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				cursor: pointer;

				@media ( hover: hover ) {
					&:hover {
						&:after {
							transform: scale( 1.75 );
							background: var( --color-white );
						}
					}
				}

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
					/* transition: background .25s var( --timing-function ),
						transform .25s var( --timing-function ); */
				}

				&:first-child,
				&:last-child {
					pointer-events: none !important;

					&:after {
						width: 5px;
						height: 5px;
						border: none;
						background: var( --color-white );
					}
				}
			}

			& span {
				display: flex;
				flex-direction: column;
				font-size: var( --font-size-m );
				font-family: var( --font-family-a );
			}

			& h6 {
				font-size: var( --font-size-xs );
				font-family: var( --font-family-c );
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

		const list = Array.from( projects ).reverse().map( project => html`
			<li id="${ project.path }" @click #items>
				<span>
					<h5>${ project.title }</h5>
					<h6>${ project.date }</h6>
				</span>
			</li>` );

		const date = new Date();
		const year = 1900 + date.getYear();
		const month = [

			'January', 'February', 'March',
			'April', 'May', 'June',
			'July', 'August', 'September',
			'October', 'November', 'December'

		][ date.getMonth() ];

		return html`

		<project-timeline>
			<timeline-navigation scroll-top @click>
				${ Handle }
			</timeline-navigation>
			<ul #container>
				<li>
					<span>
						<h5>Current Date</h5>
						<h6>${ month } ${ year }</h6>
					</span>
				</li>
				${ list }
				<li #beginning>
					<span>
						<h5>Doctorat Beginning</h5>
						<h6>December 2018</h6>
					</span>
				</li>
			</ul>
			<timeline-navigation scroll-bottom @click>
				${ Handle }
			</timeline-navigation>
		</project-timeline>

		`;

	}

}

customElements.define( 'project-timeline', Timeline );
