export default function ( _ShaderPass ) {

	_inherits( Divergence, _ShaderPass );

	const _super = _createSuper( Divergence );

	function Divergence( simProps ) {

		let _this;

		_classCallCheck( this, Divergence );

		_super.call( this, {
			material: {
				vertexShader: _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_0__[ 'default' ],
				fragmentShader: _glsl_sim_pressure_frag__WEBPACK_IMPORTED_MODULE_1__[ 'default' ],
				uniforms: {
					boundarySpace: {
						value: simProps.boundarySpace
					},
					pressure: {
						value: simProps.src_p.texture
					},
					velocity: {
						value: simProps.src_v.texture
					},
					px: {
						value: simProps.cellScale
					},
					dt: {
						value: simProps.dt
					}
				}
			},
			output: simProps.dst
		} );

		_this.init();

		return _this;

	}

	_createClass( Divergence, [ {
		key: 'update',
		value: function update( _ref ) {

			const vel = _ref.vel,
				pressure = _ref.pressure;
			this.uniforms.velocity.value = vel.texture;
			this.uniforms.pressure.value = pressure.texture;

			_get( _getPrototypeOf( Divergence.prototype ), 'update', this ).call( this );

		}
	} ] );

	return Divergence;

}( _ShaderPass__WEBPACK_IMPORTED_MODULE_2__[ 'default' ] );
