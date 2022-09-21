import Title from './Title';

import Close from './icons/Close';

export default class Font extends HTMLElement {

	onPreFrame() {

		const { options } = this.elements;

		options.forEach( option => {

			const isFamily = option.textContent === this.family;
			const isTypeface = option.textContent === this.typeface;
			option.toggleAttribute( 'selected', isFamily || isTypeface );

		} );

	}

	onInput( event ) {

		const { fonts } = Application.manfest;
		const { textContent } = event.currentTarget;

		if ( fonts[ textContent ] ) this.family = textContent;
		if ( fonts[ this.family ][ textContent ] ) this.typeface = textContent;

		const { typefaces } = this.elements;
		const string = this.getList( fonts[ this.family ] );
		const options = render( string );

		while ( typefaces.lastChild ) typefaces.removeChild( typefaces.lastChild );
		typefaces.append( ...options );

		this.elements = query( this.html );

	}

	onClick() {

		const { list, options } = this.elements;
		list.toggleAttribute( 'visible' );

		options
			.filter( option => option.hasAttribute( 'selected' ) )
			.forEach( option => option.parentNode.scrollTop = option.offsetTop - 20 );

	}

	static render( parameters ) {

		css`

		editor-font {

			& div {
				max-width: 200px;
				padding: 3px 10px;
				background: none;
				border: 1px solid var( --border-color );
				border-radius: 5px;
				color: var( --select-color );
				cursor: pointer;
				appearance: none;
				text-overflow: ellipsis;
				font-family: inherit;
				text-align: right;

				&:focus {
					outline: none;
				}
			}

			& button {
				cursor: pointer;
				position: absolute;
				display: flex;
				top: 15px;
				right: 15px;
				padding: 6px;
				background: var( --background-color );
				border-radius: 5px;
				border: 1px solid var( --border-color );
				z-index: 1;

				& svg {
					width: 15px;
					height: 15px;
					fill: var( --font-color );
					transform: rotate( 45deg );
				}

				&:active {
					transform: translateY(1px);
				}
			}

			& ul {
				max-height: 400px;
				position: fixed;
				top: 20px;
				right: 20px;
				border: 1px solid var( --border-color );
				background-color: var( --background-color );
				border-radius: 10px;
				z-index: 10;
				display: flex;
				flex-direction: row;
				visibility: hidden;

				&[ visible ] {
					visibility: visible;
				}

				& li {
					display: flex;
					flex-direction: column;
					overflow: scroll;
					cursor: pointer;
					padding: 0 15px;
					min-width: 250px;

					&:not( :last-child ) {
						border-right: 1px solid var( --border-color );
					}
				}

				& span {
					padding: 5px;

					&:first-child {
						margin-top: 15px;
					}

					&:last-child {
						margin-bottom: 15px;
					}

					&[ selected ],
					&:hover {
						color: var( --highlight-color );
					}
				}

			}

		}

		`;

		const { fonts } = Application.assets.manifest;
		const typefaces = fonts[ this.family ];

		return html`

		<editor-font identifier="${ parameters.identifier }" parameter>

			${ Title.render( parameters ) }

			<div @click #>
				<b>${ this.family }</b> ${ this.typeface }
			</div>

			<ul #list>
				<button @click>${ Close }</button>
				<li #foundries>${ this.getList( foundries ) }</li>
				<li #families>${ this.getList( fonts ) }</li>
				<li #typefaces>${ this.getList( typefaces ) }</li>
			</ul>

		</editor-font>

		`;

	}

	getList( object ) {

		const options = Object.keys( object ).sort();

		return options.map( option => html`

			<span @click #options>${ option }</span>

		` );

	}

}

customElements.define( 'editor-font', Font );
