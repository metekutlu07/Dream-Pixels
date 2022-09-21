import List from './List';
import Header from './Header';

export default class Editor extends List {

	onConnected() {

		super.onConnected();

		this.add( Application.store );

	}

	onKeyDown( parameters ) {

		if ( parameters.code !== 'KeyE' ) return;
		this.toggleAttribute( 'visible' );

	}

	static render() {

		css`

		editor-block {

			--font-color: #2c3e50;
			--border-color: #ddd;
			--select-color: #dee6ed;
			--background-color: #eee;
			--slider-thumb-color: #eee;
			--highlight-color: #f1c40f;
			--true-color: #1abc9c;
			--false-color: #ee5253;

			position: fixed;
			top: 20px;
			right: 20px;
			max-height: calc( 100% - 40px );
			margin: 0;
			overflow: auto;
			min-width: 350px;
			padding: 15px;
			background-color: var( --background-color );
			border-radius: 10px;
			border: 1px solid var( --border-color );
			color: var( --font-color );
			visibility: hidden;
			z-index: 25;
			display: none;

			font-size: 12px;
			font-family: var( --font-family-c );

			&[ dark ] {
				--font-color: #eeeeee;
				--border-color: #4a4a4a;
				--select-color: #dee6ed;
				--background-color: rgba( 28, 27, 32, .95 );
				--slider-thumb-color: rgba( 28, 27, 32, 1 );
			}

			&[ open ] {
				visibility: visible;
			}

			&[ visible ] {
				display: block;
			}

			& > editor-list::before {
				display: none !important;
			}

			& output {
				color: var( --highlight-color );
				text-align: right;
				font-weight: 400;
			}

		}

		`;

		return html`

		<editor-block dark>
			${ Header }
		</editor-block>

		`;

	}

}

customElements.define( 'editor-block', Editor );
