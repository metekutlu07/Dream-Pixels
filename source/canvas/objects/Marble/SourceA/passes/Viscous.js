export default function ( _ShaderPass ) {

	_inherits( Viscous, _ShaderPass );

	const _super = _createSuper( Viscous );

	function Viscous( simProps ) {

		let _this;

		_classCallCheck( this, Viscous );

		_super.call( this, {
			material: {
				vertexShader: _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_0__[ 'default' ],
				fragmentShader: _glsl_sim_viscous_frag__WEBPACK_IMPORTED_MODULE_1__[ 'default' ],
				uniforms: {
					boundarySpace: {
						value: simProps.boundarySpace
					},
					velocity: {
						value: simProps.src.texture
					},
					velocity_new: {
						value: simProps.dst_.texture
					},
					v: {
						value: simProps.viscous
					},
					px: {
						value: simProps.cellScale
					},
					dt: {
						value: simProps.dt
					}
				}
			},
			output: simProps.dst,
			output0: simProps.dst_,
			output1: simProps.dst
		} );

		_this.init();

		return _this;

	}

	_createClass( Viscous, [ {
		key: 'update',
		value: function update( _ref ) {

			const viscous = _ref.viscous,
				iterations = _ref.iterations,
				dt = _ref.dt;
			let fbo_in, fbo_out;
			this.uniforms.v.value = viscous;

			for ( let i = 0; i < iterations; i++ ) {

				if ( i % 2 == 0 ) {

					fbo_in = this.props.output0;
					fbo_out = this.props.output1;

				} else {

					fbo_in = this.props.output1;
					fbo_out = this.props.output0;

				}

				this.uniforms.velocity_new.value = fbo_in.texture;
				this.props.output = fbo_out;
				this.uniforms.dt.value = dt;

				_get( _getPrototypeOf( Viscous.prototype ), 'update', this ).call( this );

			}

			return fbo_out;

		}
	} ] );

	return Viscous;

}( _ShaderPass__WEBPACK_IMPORTED_MODULE_2__[ 'default' ] );
