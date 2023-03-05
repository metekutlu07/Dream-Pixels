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
			column.offsetY = -offset * scrollTop;
			column.style.transform = `translateY( ${ offset * scrollTop }px )`;

		} );

	}

	async onResize() {

		const { width } = Application.viewport;
		const length = width < 450 ? 1 : width < 1024 ? 2 : width < 1280 ? 3 : 4;

		if ( length === this.length ) return;
		this.length = length;

		const { links, grid } = this.elements;
		this.columns = Array.from( { length }, () => document.createElement( 'grid-column' ) );

		const items = Array.from( links ).reverse();

		// const objects = {

		// 	1: [ 1, 4, 11, 13, 17 ],
		// 	2: [ 1, 4, 6, 11, 16 ],
		// 	3: [ 1, 2, 10, 14, 18 ],
		// 	4: [ 1, 3, 11, 13, 17 ]

		// };

		const quotes = {

			1: [ 1, 7, 10, 18 ],
			2: [ 1, 7, 10, 17 ],
			3: [ 2, 7, 12, 17 ],
			4: [ 1, 7, 12, 18 ]

		};

		// this.elements.objects.forEach( ( object, index ) => {

		// 	const position = objects[ length ][ index ];
		// 	if ( ! position ) return;
		// 	items.splice( position, 0, object );

		// } );

		this.elements.quotes.forEach( ( object, index ) => {

			const position = quotes[ length ][ index ];
			if ( ! position ) return;
			items.splice( position, 0, object );

		} );

		items.forEach( ( item, index ) => {

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

			@media ( max-width: 650px ) {
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
		}

		`;

		return html`

		<projects-grid #grid>
			${ Application.content.grid.map( Item.render ) }
			${ Application.content.quotes.map( Item.render ) }
		</projects-grid>

		`;

		// Removed 3d objects in projects list page, to include it again, add following commented line in the html above after quotes.
		// ${ Application.content.objects.map( Item.render ) }

	}

}

Array.prototype.shuffle = function () {

	for ( let i = this.length - 1; i > 0; i-- ) {

		const j = Math.floor( Math.random() * ( i + 1 ) );
		[ this[ i ], this[ j ] ] = [ this[ j ], this[ i ] ];

	}

	return this;

};

customElements.define( 'projects-grid', Grid );
