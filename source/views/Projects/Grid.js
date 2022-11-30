import Item from './Item';

export default class Grid extends HTMLElement {

	onConnected() {

		this.onResize();

	}

	onPreFrame() {

		const element = document.body;
		const scrollTop = element.scrollTop;

		const heights = this.columns.map( column => column.clientHeight );
		const highest = Array.from( heights ).sort()[ heights.length - 1 ];

		this.columns.forEach( ( column, index ) => {

			const height = heights[ index ];
			const offset = ( highest / height - 1 );
			column.translateY = -( scrollTop - offset * scrollTop );
			column.style.transform = `translateY( ${ offset * scrollTop }px )`;

		} );

	}

	async onResize() {

		const { width } = Application.viewport;
		const length = width < 450 ? 1 :
			width < 1024 ? 2 :
				width < 1280 ? 2 : 4;

		if ( length === this.length ) return;
		this.length = length;

		const { items, grid } = this.elements;
		this.columns = Array.from( { length }, () => document.createElement( 'grid-column' ) );

		Array
			.from( items )
			.reverse()
			.forEach( ( item, index ) => {

				const columnID = index % length;
				this.columns[ columnID ].appendChild( item );

			} );

		const count = Math.round( items.length / this.length );

		this.columns.forEach( ( column, index ) => {

			const { children } = column;
			const { length } = children;
			const random = Array.from( { length }, () => Math.randFloat( .75, 1.25 ) );
			const sum = random.reduce( ( a, b ) => a + b, 0 );

			const scale = count / length - index % 2 * .15;
			const ratios = random.map( value => value / sum * length / scale );

			for ( let i = 0; i < ratios.length; i++ ) {

				children[ i ].columnID = index;
				children[ i ].style.setProperty( '--aspect-ratio', ratios[ i ] );

			}

		} );

		while ( grid.firstChild ) grid.removeChild( grid.lastChild );
		this.columns.forEach( column => grid.appendChild( column ) );
		this.hasHeight = false;

	}

	static render() {

		css`

		projects-grid {
			position: relative;
			display: flex;
			flex-direction: row;
			width: 100vw;
			padding: var( --margin-m );
			pointer-events: none;
			align-items: flex-start;
			margin-bottom: 100px;

			@media ( max-width: 1280px ) {
				padding: var( --margin-s );
			}

			[ list="grid" ] & {
				pointer-events: all;
			}
		}

		grid-column {
			width: 100%;

			&:not( :last-child ) {
				margin-right: var( --margin-m );
			}

			@media ( max-width: 1280px ) {
				&:not( :last-child ) {
					margin-right: var( --margin-s );
				}
			}
		}

		`;

		const cells = Application.content.grid.map( Item.render );

		return html`

		<projects-grid #grid>
			${ cells }
		</projects-grid>

		`;

	}

}

customElements.define( 'projects-grid', Grid );
