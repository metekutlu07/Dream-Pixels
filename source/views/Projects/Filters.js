import Chevron from '~/assets/icons/Chevron';

export default class Filters extends HTMLElement {

	onConnected() {

		Application.filters = this;

	}

	onDisconnected() {

		Application.filters = null;

	}

	onPreFrame() {

		const { inputs } = this.elements;
		this.values = inputs
			.filter( input => input.checked )
			.map( input => input.value );

	}

	onClick() {

		const { container } = this.elements;

		container.toggleAttribute( 'open' );

	}

	static render() {

		css`

		projects-filters {
			z-index: 4;
			position: fixed;
			display: flex;
			flex-direction: column;
			background-color: var( --background-color );
			top: var( --margin-m );
			right: var( --margin-m );
			margin-top: 70px;
			border: var( --border-size ) solid var( --border-color );
			/* transition: opacity 1s var( --timing-function ); */
			/* padding: var( --margin-m ); */
			font-family: var( --font-family-c );
			font-size: var( --font-size-s );
			line-height: 1.8;
			list-style: none;
			overflow: scroll;
			opacity: 0;
			/* transition: opacity 1s var( --timing-function ); */
			max-height: calc( 100% - var( --margin-m ) * 2 - 200px );

			[ view-enter ][ list="sphere" ] & {
				opacity: 1;
				/* transition-delay: .75s; */
				pointer-events: all;
			}

			@media ( max-width: 1024px ) {
				display: none;
				margin-top: 50px;
			}
		}

		projects-filters-title {
			padding: var( --margin-s );
			display: flex;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;

			@media ( hover: hover ) {
				&:hover {
					background-color: rgba( 255, 255, 255, .25 );
				}
			}

			[ open ] & {
				border-bottom: var( --border-size ) solid var( --border-color );
			}

			& projects-filters-chevron {
				height: 25px;
				width: 25px;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			& svg {
				height: 20px;
				width: 20px;
				fill: var( --color-white );
				transform: rotate( 90deg );

				[ open ] & {
					transform: rotate( -90deg );
				}
			}

			& h3 {
				line-height: 1;
				font-size: var( --font-size-l );

				& + p {
					margin-top: var( --margin-s );
				}
			}
		}

		projects-filters-description {
			max-height: 0;
			overflow: scroll;

			[ open ] & {
				max-height: initial;
				padding: var( --margin-s ) 0;
			}

			& div {
				padding: 0 var( --margin-s );

				& h4 {
					font-family: var( --font-family-b );
					font-size: 2rem;
					line-height: normal;
				}

				& ul {
					padding: var( --margin-xs ) var( --margin-s );
				}

				& li {
					display: flex;
					align-items: center;
					padding-right: 20px;
				}

				& label {
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}

				& input {
					appearance: none;
					border: var( --border-size ) solid rgba( 255, 255, 255, .25 );
					height: 15px;
					width: 15px;
					margin-right: var( --margin-xs );
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;

					&:before {
						display: block;
						content: '';
						height: 8px;
						width: 8px;
						background: var( --color-white );
						opacity: 0;
					}

					&:checked {
						&:before {
							opacity: 1;
						}
					}
				}
			}

			& hr {
				border-color: var( --border-color );
				margin-top: calc(0.5 * var( --margin-xs ));
				margin-bottom: var( --margin-s );
			}
		}

		`;

		const filters = {
			technologies: [
				'3D Miniature',
				'3D Scanning',
				'Augmented Reality',
				'Generative Design',
				'Machine Learning',
				'Particle Simulation',
				'Projection Mapping',
				'Virtual Reconstruction',
			],
			cultures: [
				'Byzantine',
				'French',
				'Korean',
				'Ottoman',
				'Roman',
				'Sumerian',
				'Timurid',
				'Venetian',
			],
			subjects: [
				'Architectural Heritage',
				'Botany',
				'Miniatures',
				'Mosaics',
				'Painting',
			],
		};

		const generateFilters = ( tags ) => tags.map( tag => html`

		<li>
			<label>
				<input
					type="checkbox"
					value="${ tag }"
					#inputs
				/>
				${ tag }
			</label>
		</li>

		` );

		return html`

		<projects-filters blurred-background open #container>
			<projects-filters-title @click>
				<h3>Filters</h3>
				<projects-filters-chevron>
					${ Chevron }
				</projects-filters-chevron>
			</project-filters-title>

			<projects-filters-description>
				<div>
					<h4>Technology</h4>
					<ul>${ generateFilters( filters.technologies ) }</ul>
				</div>
				<hr />
				<div>
					<h4>Culture</h4>
					<ul>${ generateFilters( filters.cultures ) }</ul>
				</div>
				<hr />
				<div>
					<h4>Subject</h4>
					<ul>${ generateFilters( filters.subjects ) }</ul>
				</div>
			</projects-filters-description>
		</projects-filters>

		`;

	}

}

customElements.define( 'projects-filters', Filters );
