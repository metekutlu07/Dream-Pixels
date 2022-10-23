export default function () {

	function ShaderPass( props ) {

		let _this$props$material;

		_classCallCheck( this, ShaderPass );

		this.props = props;
		this.uniforms = ( _this$props$material = this.props.material ) === null || _this$props$material === void 0 ? void 0 : _this$props$material.uniforms;

	}

	_createClass( ShaderPass, [ {
		key: 'init',
		value: function init() {

			this.scene = new three__WEBPACK_IMPORTED_MODULE_1__[ 'Scene' ]();
			this.camera = new three__WEBPACK_IMPORTED_MODULE_1__[ 'Camera' ]();

			if ( this.uniforms ) {

				this.material = new three__WEBPACK_IMPORTED_MODULE_1__[ 'RawShaderMaterial' ]( this.props.material );
				this.geometry = new three__WEBPACK_IMPORTED_MODULE_1__[ 'PlaneBufferGeometry' ]( 2.0, 2.0 );
				this.plane = new three__WEBPACK_IMPORTED_MODULE_1__[ 'Mesh' ]( this.geometry, this.material );
				this.scene.add( this.plane );

			}

		}
	}, {
		key: 'update',
		value: function update() {

			_Common__WEBPACK_IMPORTED_MODULE_0__[ 'default' ].renderer.setRenderTarget( this.props.output );
			_Common__WEBPACK_IMPORTED_MODULE_0__[ 'default' ].renderer.render( this.scene, this.camera );
			_Common__WEBPACK_IMPORTED_MODULE_0__[ 'default' ].renderer.setRenderTarget( null );

		}
	} ] );

	return ShaderPass;

}
