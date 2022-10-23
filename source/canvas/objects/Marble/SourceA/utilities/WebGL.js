export default function () {

	function Webgl( props ) {

		_classCallCheck( this, Webgl );

		this.props = props;
		_Common__WEBPACK_IMPORTED_MODULE_0__[ 'default' ].init();
		_Mouse__WEBPACK_IMPORTED_MODULE_2__[ 'default' ].init();
		this.init();
		this.loop();
		window.addEventListener( 'resize', this.resize.bind( this ) );

	}

	_createClass( Webgl, [ {
		key: 'init',
		value: function init() {

			this.props.$wrapper.prepend( _Common__WEBPACK_IMPORTED_MODULE_0__[ 'default' ].renderer.domElement );
			this.output = new _Output__WEBPACK_IMPORTED_MODULE_1__[ 'default' ]();

		}
	}, {
		key: 'resize',
		value: function resize() {

			_Common__WEBPACK_IMPORTED_MODULE_0__[ 'default' ].resize();
			this.output.resize();

		}
	}, {
		key: 'render',
		value: function render() {

			_Mouse__WEBPACK_IMPORTED_MODULE_2__[ 'default' ].update();
			_Common__WEBPACK_IMPORTED_MODULE_0__[ 'default' ].update();
			this.output.update();

		}
	}, {
		key: 'loop',
		value: function loop() {

			this.render();
			requestAnimationFrame( this.loop.bind( this ) );

		}
	} ] );

	return Webgl;

}
