import Title from './Title';

import Property from './Property';
import Font from './Font';
import Boolean from './Boolean';
import Button from './Button';
import Select from './Select';
import Range from './Range';
import Color from './Color';
import Text from './Text';

export default class List extends HTMLElement {

	onConnected() {

		const identifier = this.getIdentifier();
		const isOpen = localStorage.getItem( identifier ) === 'true';
		this.toggleAttribute( 'open', isOpen );

	}

	onClick() {

		this.toggleAttribute( 'open' );

		const identifier = this.getIdentifier();
		const isOpen = this.hasAttribute( 'open' );
		localStorage.setItem( identifier, isOpen );

	}

	add( parameter ) {

		parameter.children.forEach( child => {

			const Component = this.getComponent( child );

			if ( ! Component ) return;

			const template = Component.render( child );
			const element = Application.html.render( template );

			if ( child.isList ) element.add( child );
			else element.parameter = child;

			this.appendChild( element );

		} );

	}

	getComponent( parameters ) {

		const type = Object
			.getOwnPropertyNames( parameters )
			.find( value => value.substr( 0, 2 ) === 'is' );

		return type === undefined ? false : {

			Color, Font, Property, Select,
			Range, Text, Boolean, Button,
			List

		}[ type.replace( 'is', '' ) ];

	}

	getIdentifier() {

		let parent = this.parentNode;
		let identifier = this.getAttribute( 'identifier' );

		while ( parent.getAttribute( 'identifier' ) ) {

			identifier = `${ parent.getAttribute( 'identifier' ) }/${ identifier }`;
			parent = parent.parentNode;

		}

		return identifier || 'editor';

	}

	static render( parameters ) {

		css`

		editor-list {
			display: flex;
			position: relative;
			flex-direction: column;

			&::before {
				position: absolute;
				top: 0;
				left: 7px;
				width: 1px;
				height: 100%;
				background: var( --border-color );
				content: "";
			}

			& > editor-title {
				&:hover {
					color: var( --highlight-color );
				}
			}

			& > editor-list {
				padding-left: 18px;
			}

			&:not( [ open ] ) {
				& > editor-list,
				& > [ parameter ] {
					display: none;
				}
			}

			&[ open ] {

				& > editor-title svg {
					transform: rotate( 90deg );
					opacity: 1;

					& path {
						fill: var( --highlight-color );
						stroke: var( --highlight-color );
					}
				}
			}

			& [ parameter ] {
				display: flex;
				position: relative;
				justify-content: space-between;
				align-items: center;

				&::before {
					position: absolute;
					top: 0;
					left: 7px;
					width: 1px;
					height: 100%;
					background: var( --border-color );
					content: "";
				}

				& editor-title {
					font-weight: normal;

					& svg {
						visibility: hidden;
					}
				}
			}

		}

		`;

		return html`

		<editor-list identifier="${ parameters.identifier }">
			${ Title.render( parameters ) }
		</editor-list>

		`;

	}

}

customElements.define( 'editor-list', List );
