export default class Tabs extends HTMLElement {

	onConnected() {

		this.index = 0;

	}

	onClick( event ) {

		const { currentTarget } = event;
		const { titles } = this.elements;
		this.index = titles.indexOf( currentTarget );

	}

	onPreFrame() {

		const { titles, contents } = this.elements;
		titles.forEach( ( title, index ) => title.toggleAttribute( 'selected', index === this.index ) );
		contents.forEach( ( content, index ) => content.toggleAttribute( 'selected', index === this.index ) );

	}

	static render() {

		css`

		projects-tabs {
			z-index: 4;
			position: fixed;
			display: flex;
			flex-direction: column;
			background-color: var( --background-color );
			top: var( --margin-m );
			left: var( --margin-m );
			margin-top: 100px;
			border: var( --border-size ) solid var( --border-color );
			max-width: 450px;
			max-height: 600px;
			opacity: 0;
		}

		tab-header {
			display: flex;
			justify-content: space-around;
		}

		tab-title {
			--opacity: .2;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: var( --margin-s );
			font-family: var( --font-family-b );
			flex-grow: 1;
			cursor: pointer;
			border-bottom: var( --border-size ) solid rgba( 255, 255, 255, var( --opacity ) );

			& span {
				opacity: var( --opacity );
			}

			&[ selected ] {
				--opacity: 1;
			}

			&:not( :last-child ) {
				border-right: var( --border-size ) solid var( --border-color );
			}
		}

		tab-contents {
			display: block;
			overflow: scroll;
		}

		tab-content {
			display: block;
			padding: var( --margin-m );
			font-family: var( --font-family-c );
			font-size: var( --font-size-s );
			line-height: 1.8;
			visibility: hidden;

			&:not( :first-child ) {
				position: absolute;
				width: 100%;
				height: 100%;
			}

			&[ selected ] {
				visibility: visible;
			}
		}

		`;

		const { tabs } = Application.content;
		const titles = tabs.map( tab => {

			return html`

			<tab-title @click #titles>
				<span>${ tab.title }</span>
			</tab-title>

			`;

		} );

		const contents = tabs.map( tab => {

			return html`

			<tab-content #contents>
				${ tab.content }
			</tab-content>

			`;

		} );

		return html`

		<projects-tabs blurred-background>

			<tab-header>${ titles }</tab-header>
			<tab-contents>${ contents }</tab-contents>

		</projects-tabs>

		`;

	}

}

customElements.define( 'projects-tabs', Tabs );
