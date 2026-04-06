import { Vector3 } from 'three';

import Button from '~/components/Button';
import Video from '~/components/Video';

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

			@media ( max-width: 650px ) {
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
				font-family: var( --font-family-a );
				font-size: var( --font-size-xl );
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
				font-size: var( --font-size-m );
				line-height: 1.4;
				margin-bottom: 4px;
			}

			& h5 {
				font-family: var( --font-family-c );
				font-size: var( --font-size-s );
				opacity: .5;
			}

			& video {
				transform: var( --transform );
				height: 100%;
			}
		}

		item-link,
		item-quote,
		item-object {
			opacity: 0;
			transform: scale( .975 );
			transition: transform .1s var( --timing-function ), opacity .1s var( --timing-function );
			transition-delay: 0s;

			[ view-exit ][ list="grid" ] & {
				transition-delay: 0s;
				transition: transform .1s var( --timing-function ), opacity .1s var( --timing-function );
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
		}

		item-text {
			font-size: var( --font-size-m );
			margin-bottom: var( --margin-s );
			font-family: var( --font-family-c );
			line-height: 1.8;
		}

		item-author {
			font-size: var( --font-size-m );
			font-family: var( --font-family-b );
		}

		`;

		const { quote, author } = content;

		return html`

		<grid-item
			quote
			#items|projects-grid
			#quotes|projects-grid
		>
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
			aspect-ratio: 1;
			width: 100%;
		}

		`;

		return html`

		<grid-item
			object="${ objectID }"
			#items|projects-grid
			#objects|projects-grid
		>
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
			margin-bottom: var( --margin-xs );

			[ view-enter ][ list="grid" ] & {
				animation: 1.5s linear var( --transition-delay ) var( --animation );
			}

			@media ( max-width: 1280px ) {
				margin-bottom: var( --margin-xs );
			}

		}

		item-thumbnail > img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		item-thumbnail video-block {
			position: relative;
			z-index: 1;
			pointer-events: none;
		}

		item-footer {
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
		}

		`;

		const {

			title,
			path,
			subtitle,
			location,
			date

		} = content;

		const { projects } = Application.content;
		const projectsLength = projects.length;
		const index = projects.findIndex( project => project.path === path );
		const number = ( '00' + ( index + 1 ) ).substr( -2 );
		const shouldPreloadThumbnail = index >= ( projectsLength - 8 );
		const thumbnailFallbacks = {
			marco: '/public/marco/venezia-catalogue01.jpg',
			robertus: '/public/robertus/t01.jpg'
		};
		const thumbnailImage = thumbnailFallbacks[ path ] || `/public/${ path }/thumbnail.png`;

		return html`

		<grid-item
			link
			@click
			@mouse-enter
			#items|projects-grid
			#links|projects-grid
		>
			<item-link href="/${ path }" internal>
				<item-thumbnail>
					<img
						src="${ thumbnailImage }"
						alt="${ title } thumbnail"
						class="${ shouldPreloadThumbnail ? 'preloadMedia' : '' }">
					${ Video.render( `/public/${ path }/thumbnail.mp4`, {
						preloadMedia: shouldPreloadThumbnail,
						preload: 'auto',
						startAt: false
					} ) }
					<item-overlay>
						${ Button.render( { attributes: [ 'label-visible' ], icons: [ Next ], } ) }
					</item-overlay>
				</item-thumbnail>
				<item-footer>
					<item-description>
						<h3>${ title }<span>| ${ number }</span></h3>
						<h4>${ subtitle }</h4>
						<h5> ${ location }, ${ date }</h5>
					</item-description>
				</item-footer>
			</item-link>
		</grid-item>

		`;

	}

}

customElements.define( 'grid-item', Item );
