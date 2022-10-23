export default function ( _ShaderPass ) {

	_inherits( Advection, _ShaderPass );

	const _super = _createSuper( Advection );

	function Advection( simProps ) {

		let _this;

		_classCallCheck( this, Advection );

		_super.call( this, {
			material: {
				vertexShader: _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_0__[ 'default' ],
				fragmentShader: _glsl_sim_advection_frag__WEBPACK_IMPORTED_MODULE_2__[ 'default' ],
				uniforms: {
					boundarySpace: { value: simProps.cellScale },
					px: { value: simProps.cellScale },
					fboSize: { value: simProps.fboSize },
					velocity: { value: simProps.src.texture },
					dt: { value: simProps.dt },
					isBFECC: { value: true }
				}
			},
			output: simProps.dst
		} );

		_this.init();

		return _this;

	}

	_createClass( Advection, [ {
		key: 'init',
		value: function init() {

			_get( _getPrototypeOf( Advection.prototype ), 'init', this ).call( this );

			this.createBoundary();

		}
	}, {
		key: 'createBoundary',
		value: function createBoundary() {

			const boundaryG = new three__WEBPACK_IMPORTED_MODULE_4__[ 'BufferGeometry' ]();
			const vertices_boundary = new Float32Array( [// left
				-1, -1, 0, -1, 1, 0, // top
				-1, 1, 0, 1, 1, 0, // right
				1, 1, 0, 1, -1, 0, // bottom
				1, -1, 0, -1, -1, 0 ] );
			boundaryG.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_4__[ 'BufferAttribute' ]( vertices_boundary, 3 ) );
			const boundaryM = new three__WEBPACK_IMPORTED_MODULE_4__[ 'RawShaderMaterial' ]( {
				vertexShader: _glsl_sim_line_vert__WEBPACK_IMPORTED_MODULE_1__[ 'default' ],
				fragmentShader: _glsl_sim_advection_frag__WEBPACK_IMPORTED_MODULE_2__[ 'default' ],
				uniforms: this.uniforms
			} );
			this.line = new three__WEBPACK_IMPORTED_MODULE_4__[ 'LineSegments' ]( boundaryG, boundaryM );
			this.scene.add( this.line );

		}
	}, {
		key: 'update',
		value: function update( _ref ) {

			const dt = _ref.dt,
				isBounce = _ref.isBounce,
				BFECC = _ref.BFECC;
			this.uniforms.dt.value = dt;
			this.line.visible = isBounce;
			this.uniforms.isBFECC.value = BFECC;

			_get( _getPrototypeOf( Advection.prototype ), 'update', this ).call( this );

		}
	} ] );

	return Advection;

}( _ShaderPass__WEBPACK_IMPORTED_MODULE_3__[ 'default' ] );
