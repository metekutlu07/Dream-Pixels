export default class Button extends HTMLElement {

	onMouseEnter() {

		Application.audio.play( '007.mp3', { volume: .1 } );

	}

	onClick() {

		Application.audio.play( '006.mp3', { volume: .1 } );

	}

	onViewChange() {

		this.onPreFrame();

		const index = Array.from( this.parentNode.children )
			.filter( child => child.isVisible )
			.indexOf( this );

		this.style.setProperty( '--index', index );

	}

	onPreFrame() {

		const visibleIDs = [ 'audio', 'display-menu', 'home', 'works', 'about', 'contact' ];
		const selectedIDs = [];
		const activatedIDs = [];

		const { path, list, places, particles } = Application.store;

		switch ( path ) {

		case '/':
			selectedIDs.push( 'home' );
			break;

		case '/works':
			selectedIDs.push( 'works' );
			visibleIDs.push( 'places', 'grid', 'sphere', 'particles' );
			break;

		case '/about':
			selectedIDs.push( 'about' );
			break;

		case '/contact':
			selectedIDs.push( 'contact' );
			break;

		case '/when-gaspard-paints-a-gospel':
		case '/virtual-miniature':
			visibleIDs.push( 'augmented-reality' );
			visibleIDs.push( 'camera-mode' );
			break;

		case '/photogrammetry':
			visibleIDs.push( 'augmented-reality' );
			visibleIDs.push( 'display-points', 'display-aside', 'display-wireframe' );
			break;

		}

		switch ( list ) {

		case 'places':

			if ( path === '/works' ) visibleIDs.push( 'cosmos', 'world' );
			selectedIDs.push( 'places' ); break;

		case 'grid': selectedIDs.push( 'grid' ); break;
		case 'sphere': selectedIDs.push( 'sphere' ); break;
		case 'particles':


			if ( path === '/works' ) visibleIDs.push( 'color-range', 'timeline' );
			selectedIDs.push( 'particles' ); break;

		}

		switch ( particles ) {

		case 'color-range': selectedIDs.push( 'color-range' ); break;
		case 'timeline': selectedIDs.push( 'timeline' ); break;

		}

		switch ( places ) {

		case 'cosmos': selectedIDs.push( 'cosmos' ); break;
		case 'world': selectedIDs.push( 'world' ); break;

		}

		const { fullscreen, camera, audio } = Application;

		if ( fullscreen.isSupported ) visibleIDs.push( 'fullscreen' );
		if ( camera.isOrthographic ) activatedIDs.push( 'camera-mode' );
		if ( audio.isMuted ) activatedIDs.push( 'audio' );
		if ( fullscreen.isActive ) activatedIDs.push( 'fullscreen' );

		const { renderAsPoints } = Application.scene.artwork;
		if ( renderAsPoints ) activatedIDs.push( 'display-points' );

		if ( Application.store[ 'display-wireframe' ] ) activatedIDs.push( 'display-wireframe' );
		if ( Application.store[ 'display-aside' ] ) activatedIDs.push( 'display-aside' );
		if ( Application.store[ 'display-menu' ] ) activatedIDs.push( 'display-menu' );

		this.isVisible = visibleIDs.some( name => this.hasAttribute( name ) );
		this.isSelected = selectedIDs.some( name => this.hasAttribute( name ) );
		this.isActivated = activatedIDs.some( name => this.hasAttribute( name ) );

		this.toggleAttribute( 'visible', this.isVisible );
		this.toggleAttribute( 'selected', this.isSelected );
		this.toggleAttribute( 'activated', this.isActivated );

	}

	static render( parameters ) {

		css`

		default-button {
			cursor: pointer;
			color: var( --color-white );
			font-size: var( --font-size-m );
			font-family: var( --font-family-b );
			display: flex;
			flex-direction: row-reverse;
			align-items: stretch;
			background-color: var( --background-color );
			transition:
				transform .5s var( --timing-function ),
				opacity .5s var( --timing-function );
			border: var( --border-size ) solid var( --border-color );
			opacity: 0;

			[ view ] & {
				opacity: 0;
			}

			[ view-enter ] & {
				opacity: 1;
				transition:
					transform .5s var( --timing-function ),
					opacity .5s var( --timing-function );
			}

			&:nth-child( 3n+0 ) { --animation: blink-1 }
			&:nth-child( 3n+1 ) { --animation: blink-2 }
			&:nth-child( 3n+2 ) { --animation: blink-3 }

			&:not( :last-child ) {
				margin-right: -1px;

				@media ( max-width: 1024px ) {
					margin-bottom: -1px;
					margin-right: 0;
				}
			}

			@media ( hover: hover ) {
				&:hover {
					z-index: 2;
					--background-color: rgba( 255, 255, 255, .25 );

					& button-label {
						display: flex;
					}
				}
			}

			&:active {
				--background-color: rgba( 255, 255, 255, .75 );
			}

			&[ visible ] { display: flex }
			&[ disabled ] { color: var( --color-grey ) }
			&[ selected ] {
				z-index: 1;
				background: var( --color-white );
				color: var( --color-black );
			}

			[ miniature ] &,
			&[ activated ] {
				& button-label,
				& button-icon {
					& > *:first-child { display: none };
					& > *:last-child { display: flex };
				}
			}

			&[ label-hidden ] {
				& button-label {
					display: none;
				}
			}

			&[ reversed ],
			&[ reversed ] a {
				flex-direction: row;
			}

			& svg {
				width: 20px;
				height: 20px;
			}

			& path {
				fill: currentColor;
			}

			& a {
				height: 100%;
				width: 100%;
				display: flex;
				align-items: stretch;
				flex-direction: row-reverse
			}

			& img {
				visibility: hidden;
				height: 100%;
				width: 100%;
				position: absolute;
			}
		}

		button-label,
		button-icon {
			& > *:nth-child( 2 ) { display: none }
		}

		button-icon {
			height: var( --margin-m );
			width: var( --margin-m );
			display: flex;
			justify-content: center;
			align-items: center;

			[ view-enter ] & {
				animation: 1.5s linear var( --transition-delay ) var(  --animation );
			}
		}

		button-label {
			--border: var( --border-size ) solid var( --border-color );
			align-items: center;
			justify-content: center;
			padding: var( --margin-xs ) var( --margin-s );
			display: flex;
		}

		a {
			color: currentColor;
		}

		`;

		const { buttons, views } = Application.content;
		const { attributes, icons, link } = parameters;

		const buttonID = attributes[ 0 ];
		const texts = parameters.labels || buttons[ buttonID ];
		const labels = texts ? texts.map( value => `<span>${ value }</span>` ) : null;

		if ( link ) {

			if ( views[ buttonID ] ) {

				const path = views[ buttonID ].path;
				link.attributes = [ `href="${ path }"`, 'internal' ];

			}

		}

		return html`

		<default-button ${ attributes.join( ' ' ) } @click @mouse-enter>

			${ link ? `<a ${ link.attributes.join( ' ' ) }>` : '' }

				${ labels ? html`<button-label>${ labels }</button-label>` : '' }
				${ icons ? html`<button-icon>${ icons }</button-icon>` : '' }
				${ link && link.image ? html`<img src="${ link.image }"/>` : '' }

			${ link ? '</a>' : '' }

		</default-button>

		`;

	}

}

customElements.define( 'default-button', Button );
