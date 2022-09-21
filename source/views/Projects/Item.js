import Button from '~/components/Button';
// import Video from '~/components/Video';

import Next from '~/assets/icons/Next';

export default class Item extends HTMLElement {

	onMouseEnter() {

		Application.audio.play( '007.mp3', { volume: .1 } );

	}

	onClick() {

		Application.audio.play( '006.mp3', { volume: .1 } );

	}

	static render( content ) {

		css`

		grid-item {
			--transition-delay: calc( var( --index ) * .05s );
			--border-color: var( --color-white );

			display: block;
			list-style: none;
			page-break-inside: avoid;
			-webkit-column-break-inside: avoid;
			page-break-inside: avoid;
			break-inside: avoid;
			pointer-events: none;
			cursor: pointer;

			&:not( :last-child ) {
				margin-bottom: 40px;
			}

			@media ( max-width: 768px ) {
				transform: none !important;
			}

			&:nth-child( 3n+0 ) item-thumbnail { --animation: blink-1; }
			&:nth-child( 3n+1 ) item-thumbnail { --animation: blink-2; }
			&:nth-child( 3n+2 ) item-thumbnail { --animation: blink-3; }

			&:nth-child( 3n+0 ) item-thumbnail { --animation: blink-1; }
			&:nth-child( 3n+1 ) item-thumbnail { --animation: blink-2; }
			&:nth-child( 3n+2 ) item-thumbnail { --animation: blink-3; }

			&:active { opacity: .75 }

			[ list="grid" ] & {
				pointer-events: all;
			}

			& h3 {
				font-size: var( --font-size-l );
				width: initial;
			}

			& video {
				transform: var( --transform );
			}
		}

		item-link {
			display: block;
			color: var( --color-white );
			transform: scale( .925 );
			transition: transform .5s var( --timing-function ), opacity .5s var( --timing-function );
			transition-delay: var( --transition-delay );
			opacity: 0;

			[ view-exit ][ list="grid" ] & {
				transform: scale( .925 );
				transition-delay: var( --transition-delay );
				opacity: 0;
			}

			[ view-enter ][ list="grid" ] & {
				opacity: 1;
				transform: scale( 1 );
				transition:
					transform 1s var( --timing-function ),
					opacity 1s var( --timing-function );
				transition-delay: var( --transition-delay );
			}

			@media ( hover: hover ) {

				&:hover {
					& item-overlay {
						opacity: 1;
					}

					& item-thumbnail {
						border: 1px solid var( --color-white );
					}

					& default-button {
						animation: 1s linear var( --animation );
					}
				}

			}

		}

		item-overlay {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			opacity: 0;

			& default-button {
				position: absolute;
				bottom: 15px;
				right: 15px;
			}
		}

		item-thumbnail {
			position: relative;
			display: block;
			overflow: hidden;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			aspect-ratio: var( --aspect-ratio );
			border: 1px solid transparent;
			background: #222;

			[ view-enter ][ list="grid" ] & {
				animation: 1.5s linear var( --transition-delay ) var( --animation );
			}

		}

		item-footer {
			margin-top: var( --margin-xs );
			display: flex;
			justify-content: space-between;
			align-items: center;

			& h3 { flex-grow: 1; }

			@media ( max-width: 1280px ) {
				margin-top: var( --margin-xs );
			}
		}

		item-number {
			font-size: 5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			color: transparent;
			line-height: .65;
			height: 50px;
			-webkit-text-stroke: 1px var( --color-white );

			@media ( max-width: 1280px ) {
				font-size: 4rem;
			}

			@media ( max-width: 450px ) {
				display: none;
			}
		}

		`;

		const {

			title,
			subtitle,
			path,
			index

		} = content;

		const style = [ `--index: ${ index };` ];

		return html`

		<grid-item style="${ style.join( ' ' ) }" @click @mouse-enter #items|projects-grid>
			<item-link href="/${ path }" internal>
				<item-thumbnail>
					<item-overlay>
						${ Button.render( { attributes: [ 'label-visible' ], icons: [ Next ], } ) }
					</item-overlay>
				</item-thumbnail>
				<item-footer>
					<h3 font-style-title>${ title }<br/>${ subtitle }</h3>
					<item-number>${ index + 1 }</item-number>
				</item-footer>
			</item-link>
		</grid-item>

		`;

	}

}

customElements.define( 'grid-item', Item );
