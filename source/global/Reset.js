export default class Reset {

	static render() {

		css`

		html,
		body,
		p,
		ol,
		ul,
		li,
		dl,
		dt,
		dd,
		blockquote,
		figure,
		fieldset,
		legend,
		textarea,
		pre,
		iframe,
		form,
		hr,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin: 0;
			padding: 0;
			position: relative;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-size: 100%;
			font-weight: normal;
		}

		ul {
			list-style: none;
		}

		button,
		input,
		select,
		textarea {
			margin: 0;
		}

		html {
			box-sizing: border-box;
			touch-action: manipulation;
			-webkit-tap-highlight-color: transparent;
		}

		*,
		*::before,
		*::after {
			box-sizing: inherit;
		}

		img,
		video {
			max-width: 100%;
			height: auto;
		}

		iframe {
			border: 0;
		}

		table {
			border-spacing: 0;
			border-collapse: collapse;
		}

		td,
		th {
			padding: 0;
		}

		td:not( [ align ] ),
		th:not( [ align ] ) {
			text-align: left;
		}

		a {
			text-decoration: none;
		}

		img {
			display: block;

			&[ alt="" ],
			&:not( [ alt ] ) {
				border: 1px dashed red;
			}

		}

		button {
			padding: 0;
			background: none;
			border: 0;
			outline: none;
			font-family: inherit;
		}

		input[ type=number ] {
			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				margin: 0;
				appearance: none;
			}
		}

		::-ms-clear {
			display: none;
		}

		`;

		return '';

	}

}
