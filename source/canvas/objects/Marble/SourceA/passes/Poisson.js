export default function ( _ShaderPass ) {

	_inherits( Divergence, _ShaderPass );

	const _super = _createSuper( Divergence );

	function Divergence( simProps ) {

		let _this;

		_classCallCheck( this, Divergence );

		_super.call( this, {
			material: {
				vertexShader: _glsl_sim_face_vert__WEBPACK_IMPORTED_MODULE_0__[ 'default' ],
				fragmentShader: _glsl_sim_poisson_frag__WEBPACK_IMPORTED_MODULE_1__[ 'default' ],
				uniforms: {
					boundarySpace: {
						value: simProps.boundarySpace
					},
					pressure: {
						value: simProps.dst_.texture
					},
					divergence: {
						value: simProps.src.texture
					},
					px: {
						value: simProps.cellScale
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

	_createClass( Divergence, [ {
		key: 'update',
		value: function update( _ref ) {

			const iterations = _ref.iterations;
			let p_in, p_out;

			for ( let i = 0; i < iterations; i++ ) {

				if ( i % 2 == 0 ) {

					p_in = this.props.output0;
					p_out = this.props.output1;

				} else {

					p_in = this.props.output1;
					p_out = this.props.output0;

				}

				this.uniforms.pressure.value = p_in.texture;
				this.props.output = p_out;

				_get( _getPrototypeOf( Divergence.prototype ), 'update', this ).call( this );

			}

			return p_out;

		}
	} ] );

	return Divergence;

}( _ShaderPass__WEBPACK_IMPORTED_MODULE_2__[ 'default' ] );
