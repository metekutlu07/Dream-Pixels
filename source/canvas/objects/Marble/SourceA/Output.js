export default function () {

	function Output() {

		_classCallCheck( this, Output );

		this.init();

	}

	_createClass( Output, [ {
		key: 'init',
		value: function init() {

			this.simulation = new _Simulation__WEBPACK_IMPORTED_MODULE_2__[ 'default' ]();
			this.scene = new three__WEBPACK_IMPORTED_MODULE_1__[ 'Scene' ]();
			this.camera = new three__WEBPACK_IMPORTED_MODULE_1__[ 'Camera' ]();
			this.output = new three__WEBPACK_IMPORTED_MODULE_1__[ 'Mesh' ]( new three__WEBPACK_IMPORTED_MODULE_1__[ 'PlaneBufferGeometry' ]( 2, 2 ), new three__WEBPACK_IMPORTED_MODULE_1__[ 'RawShaderMaterial' ]( {
				vertexShader: _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_3__[ 'default' ],
				fragmentShader: _glsl_sim_color_frag__WEBPACK_IMPORTED_MODULE_4__[ 'default' ],
				uniforms: {
					velocity: {
						value: this.simulation.fbos.vel_0.texture
					},
					boundarySpace: {
						value: new three__WEBPACK_IMPORTED_MODULE_1__[ 'Vector2' ]()
					}
				}
			} ) );
			this.scene.add( this.output );

		}
	}, {
		key: 'addScene',
		value: function addScene( mesh ) {

			this.scene.add( mesh );

		}
	}, {
		key: 'resize',
		value: function resize() {

			this.simulation.resize();

		}
	}, {
		key: 'render',
		value: function render() {

			_Common__WEBPACK_IMPORTED_MODULE_0__[ 'default' ].renderer.setRenderTarget( null );
			_Common__WEBPACK_IMPORTED_MODULE_0__[ 'default' ].renderer.render( this.scene, this.camera );

		}
	}, {
		key: 'update',
		value: function update() {

			this.simulation.update();
			this.render();

		}
	} ] );

	return Output;

}
