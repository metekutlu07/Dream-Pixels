
export default Common = /*#__PURE__*/function () {

	function Common() {

		_classCallCheck( this, Common );

		this.width = null;
		this.height = null;
		this.aspect = this.width / this.height;
		this.isMobile = false;
		this.breakpoint = 768;
		this.fboWidth = null;
		this.fboHeight = null;
		this.resizeFunc = this.resize.bind( this );
		this.time = 0;
		this.delta = 0;

	}

	_createClass( Common, [ {
		key: 'init',
		value: function init() {

			this.pixelRatio = window.devicePixelRatio;
			this.resize();
			this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__[ 'WebGLRenderer' ]( {
				antialias: true,
				alpha: true
			} );
			this.renderer.autoClear = false;
			this.renderer.setSize( this.width, this.height );
			this.renderer.setClearColor( 0x000000 );
			this.renderer.setPixelRatio( this.pixelRatio );
			this.clock = new three__WEBPACK_IMPORTED_MODULE_0__[ 'Clock' ]();
			this.clock.start();

		}
	}, {
		key: 'resize',
		value: function resize() {

			this.width = window.innerWidth; // document.body.clientWidth;

			this.height = window.innerHeight;
			this.aspect = this.width / this.height;
			if ( this.renderer ) this.renderer.setSize( this.width, this.height );

		}
	}, {
		key: 'update',
		value: function update() {

			this.delta = this.clock.getDelta(); // Math.min(0.01, this.clock.getDelta());

			this.time += this.delta;

		}
	} ] );

	return Common;

}();
