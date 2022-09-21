export default class Performance extends HTMLElement {

	onConnected() {

		this.length = 40;
		this.frameCount = 0;

		this.deltaTimes = new Array( this.length );
		this.frameCounts = new Array( this.length );
		this.previousTime = performance.now();
		this.needsUpdate = true;

	}

	onPreFrame() {

		this.startTime = performance.now();

	}

	onPostRender() {

		if ( ! this.elements ) return;

		this.frameCount++;

		const currentTime = performance.now();
		const deltaTime = currentTime - this.startTime;

		this.onDrawGraph( 'ms', deltaTime.toFixed( 1 ), this.deltaTimes );

		this.deltaTimes.push( deltaTime );
		this.deltaTimes.shift();

		if ( currentTime - 1e3 >= this.previousTime ) {

			const elapsedTime = currentTime - this.previousTime;
			const frameCount = Math.round( ( this.frameCount * 1e3 ) / elapsedTime );

			this.onDrawGraph( 'fps', frameCount, this.frameCounts );

			this.frameCounts.push( this.frameCount );
			this.frameCounts.shift();

			this.frameCount = 0;
			this.previousTime = currentTime;

		}

	}

	onDrawGraph( type, currentValue, lastValues ) {

		if ( ! this.needsUpdate ) return;

		const { values, titles } = this.elements;
		const index = type === 'fps' ? 0 : 1;
		titles[ index ].textContent = `${ currentValue } ${ type } `;

		Array
			.from( values[ index ].children )
			.forEach( ( node, index ) => {

				const value = lastValues[ index ];
				const scale = type === 'fps' ? value / 240 : value * .1;
				node.style.transform = `scaleY( ${ scale } )`;

			} );

	}

	static render() {

		css`

		editor-performance {
			display: flex;
			align-self: flex-start;
			font-size: 11px;

			& graph-container {
				position: relative;
				width: 80px;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				text-align: left;
				border-radius: 5px;

				&:not(:last-child) {
					margin-right: .5em;
				}
			}

			& graph-title {
				display: block;
				z-index: 1;
				margin: 0;
				font-weight: normal;
				position: absolute;
				top: 5px;
				left: 8px;
			}

			& graph-values {
				position: relative;
				overflow: hidden;
				width: 100%;
				height: 50px;
				border: 1px solid var( --border-color );
				border-radius: 5px;
				display: flex;
				align-content: stretch;
				opacity: .5;

				& span {
					height: 100%;
					width: 100%;
					background-color: var( --border-color );
					transform: scaleY( 0 );
					transform-origin: bottom;
				}

			}
		}

		`;

		const length = 40;
		const graph = html`

		<graph-container>
			<graph-title #titles>-</graph-title>
			<graph-values #values>
				${ html`<span></span>`.repeat( length ) }
			</graph-values>
		</graph-container>

		`;

		return html`

		<editor-performance>
			${ graph.repeat( 2 ) }
		</editor-performance>

		`;

	}

}

customElements.define( 'editor-performance', Performance );
