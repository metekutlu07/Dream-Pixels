import { Vector3 } from 'three';

import Button from '~/components/Button';
// import Video from '~/components/Video';

import Next from '~/assets/icons/Next';

export default class Item extends HTMLElement {

	onConnected() {

		this.offset = new Vector3();

		const delay = Math.randFloat( .1, .5 );
		this.style.setProperty( '--transition-delay', `${ delay }s` );

	}

	onMouseEnter() {

		Application.audio.play( '007.mp3', { volume: .1 } );

	}

	onClick() {

		Application.audio.play( '006.mp3', { volume: .1 } );

	}

	onUpdate() {

		if ( ! this.hasAttribute( 'object' ) ) return;

		const { clientHeight, clientWidth } = this;
		const { offsetLeft, offsetTop, translateY } = this.parentNode;

		this.offset
			.setX( offsetLeft + clientWidth * .5 )
			.setY( offsetTop + clientHeight * .5 + translateY + this.offsetTop );

		const { size } = Application.viewport;
		this.offset.x = Math.mapLinear( this.offset.x, 0, size.x, -1, 1 ),
		this.offset.y = Math.mapLinear( this.offset.y, 0, size.y, 1, -1 );
		this.offset.z = .5;

	}

	static render( content ) {

		css`

		grid-item {
			display: block;
			list-style: none;
			page-break-inside: avoid;
			-webkit-column-break-inside: avoid;
			page-break-inside: avoid;
			break-inside: avoid;
			pointer-events: none;

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

		item-link,
		item-quote,
		item-object {
			opacity: 0;
			transform: scale( .925 );
			transition: transform .5s var( --timing-function ), opacity .5s var( --timing-function );
			transition-delay: var( --transition-delay );

			[ view-exit ][ list="grid" ] & {
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
		}

		`;

		return content.quote ? Item.getQuoteTemplate( content ) :
			content.objectID ? Item.getObjectTemplate( content ) :
				Item.getLinkTemplate( content );

	}

	static getQuoteTemplate( content ) {

		css`

		item-quote {
			display: flex;
			flex-direction: column;
			border: 1px solid rgba( 255, 255, 255, .5 );
			padding: var( --margin-m );
		}

		item-text {
			font-size: var( --font-size-xl );
			margin-bottom: var( --margin-s );
		}

		item-author {
			font-size: var( --font-size-l );
			font-family: var( --font-family-b );
		}

		`;

		const { quote, author } = content;

		return html`

		<grid-item quote #items|projects-grid>
			<item-quote>
				<item-text>${ quote }</item-text>
				<item-author>${ author }</item-author>
			</item-quote>
		</grid-item>

		`;

	}

	static getObjectTemplate( content ) {

		const { objectID } = content;

		css`

		item-object {
			display: block;
			/* border: 1px solid rgba( 255, 255, 255, .5 ); */
			aspect-ratio: 1;
			width: 100%;
		}

		`;

		return html`

		<grid-item object="${ objectID }" #items|projects-grid>
			<item-object></item-object>
		</grid-item>

		`;

	}

	static getLinkTemplate( content ) {

		css`

		item-link {
			display: block;
			color: var( --color-white );
			cursor: pointer;

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

		return html`

		<grid-item link @click @mouse-enter #items|projects-grid>
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
