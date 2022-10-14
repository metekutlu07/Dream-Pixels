import Button from '~/components/Button';

import Arrow from '~/assets/icons/Arrow';

export default class Maps extends HTMLElement {

	onClick( event ) {

		const { currentTarget } = event;
		const { block } = this.elements;

		const pointID = currentTarget.getAttribute( 'pointID' );

		if ( pointID ) {

			const index = pointID.match( /\d+/g )[ 0 ];
			Application.scene.panorama.load( index );

		} else block.toggleAttribute( 'miniature' );

	}

	onPreFrame() {

		if ( ! this.elements.points ) return;

		const offsets = [ -2, -2.75, -1.65, 1.8, .15, -.5 ];

		this.elements.points.forEach( point => {

			const { panorama } = Application.scene;
			const pointID = point.getAttribute( 'pointID' );
			const isActive = panorama.textureID === pointID;
			point.toggleAttribute( 'active', isActive );

			if ( ! isActive ) return;

			const { theta } = Application.scene.orbitControls.lerpState;
			const angle = Math.radToDeg( -theta + offsets[ pointID - 1 ] );
			point.style.setProperty( '--angle', `${ angle }deg` );

		} );

	}

	onViewChange() {

		this.elements.maps.forEach( this.setPoints );
		Application.html.parse( this );

	}

	setPoints( map, index ) {

		const { svgs } = Application.assets.get( 'Miniature-Street-View' );

		const svg = svgs[ `Map_00${ index + 1 }.svg` ];
		const circles = svg.querySelectorAll( 'circle' );
		const isTopView = index === 0;

		const [ width, height ] = svg
			.getAttribute( 'viewBox' )
			.match( /[\d.]+/g )
			.slice( 2 );

		Array.from( circles ).map( ( circle, index ) => {

			const left = circle.getAttribute( 'cx' ) / width * 100;
			const top = circle.getAttribute( 'cy' ) / height * 100;

			return Application.html.render( html`

			<panorama-map-point
				style="left: ${ left }%; top: ${ top }%;"
				pointID="${ circle.getAttribute( 'id' ) }"
				@click|panorama-maps-block
				#points|panorama-maps-block
				blurred-background
			>

				<span>${ index + 1 }</span>
				${ isTopView ? Arrow : '' }

			</panorama-map-point>

			` );

		} ).forEach( point => map.appendChild( point ) );

	}

	static render() {

		css`

		panorama-map-point {
			position: absolute;
			transform: translate( -50%, -50% );
			align-items: center;
			justify-content: center;
			cursor: pointer;

			&[ active ] {

				& span {
					border: 2px solid white;
					background: black;
				}

				& svg { visibility: visible }

			}

			&:hover {
				transform: translate( -50%, -50% ) scale( 1.1 );
			}

			& svg {
				position: absolute;
				top: 0;
				left: 0;
				margin: auto;
				height: 100%;
				width: 100%;
				transform: rotate( var( --angle ) ) scale( 2 );
				visibility: hidden;

				& path { fill: url( #gradient ); }
			}

			& span {
				position: relative;
				z-index: 1;
				padding: 0;
				height: 30px;
				width: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				border: 1px solid white;
				font-family: var( --font-family-a );
				background-color: var( --background-color );
				font-size: var( --font-size-s );

				@media ( max-width: 1024px ) {
					height: 20px;
					width: 20px;
					font-size: var( --font-size-xs );
				}
			}
		}

		panorama-maps-block {
			position: absolute;
			top: var( --margin-m );
			right: var( --margin-m );
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			background-size: cover;
			cursor: default;

			& default-button {
				margin-top: var( --margin-s );
			}

			@media ( max-width: 1024px ) {
				top: var( --margin-s );
				right: var( --margin-s );
			}
		}

		panorama-map {
			position: relative;
			border: 1px solid rgba( 255, 255, 255, .5 );

			&:nth-child( 1 ) { display: flex }
			&:nth-child( 2 ) { display: none }

			[ miniature ] & {
				&:nth-child( 1 ) { display: none }
				&:nth-child( 2 ) { display: flex }
			}

			& img {
				max-height: 500px;
				@media ( max-width: 1024px ) {
					max-height: 35vh;
				}
			}
		}

		`;


		const path = '/public/miniature-street-view/';
		const button = {
			attributes: [
				'panorama-map-mode',
				'label-visible',
				'@click|panorama-maps-block'
			],
		};

		return html`<panorama-maps-block #block>

			<panorama-map #maps>
				<img src="${ path }Map_001.jpg" alt="Map - Top View"/>
			</panorama-map>

			<panorama-map #maps>
				<img src="${ path }/Map_002.jpg" alt="Map - Miniature View"/>
			</panorama-map>

			<div blurred-background>
				${ Button.render( button ) }
			</div>

		</panorama-maps-block>`;

	}

}

customElements.define( 'panorama-maps-block', Maps );
