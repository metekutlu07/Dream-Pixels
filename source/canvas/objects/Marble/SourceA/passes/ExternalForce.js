export default function ( _ShaderPass ) {

	_inherits( ExternalForce, _ShaderPass );

	const _super = _createSuper( ExternalForce );

	function ExternalForce( simProps ) {

		let _this;

		_classCallCheck( this, ExternalForce );

		_super.call( this, { output: simProps.dst } );

		_this.init( simProps );

		return _this;

	}

	_createClass( ExternalForce, [ {
		key: 'init',
		value: function init( simProps ) {

			_get( _getPrototypeOf( ExternalForce.prototype ), 'init', this ).call( this );

			const mouseG = new three__WEBPACK_IMPORTED_MODULE_4__[ 'PlaneBufferGeometry' ]( 1, 1 );
			const mouseM = new three__WEBPACK_IMPORTED_MODULE_4__[ 'RawShaderMaterial' ]( {
				vertexShader: _glsl_sim_mouse_vert__WEBPACK_IMPORTED_MODULE_0__[ 'default' ],
				fragmentShader: _glsl_sim_externalForce_frag__WEBPACK_IMPORTED_MODULE_1__[ 'default' ],
				blending: three__WEBPACK_IMPORTED_MODULE_4__[ 'AdditiveBlending' ],
				uniforms: {
					px: {
						value: simProps.cellScale
					},
					force: {
						value: new three__WEBPACK_IMPORTED_MODULE_4__[ 'Vector2' ]( 0.0, 0.0 )
					},
					center: {
						value: new three__WEBPACK_IMPORTED_MODULE_4__[ 'Vector2' ]( 0.0, 0.0 )
					},
					scale: {
						value: new three__WEBPACK_IMPORTED_MODULE_4__[ 'Vector2' ]( simProps.cursor_size, simProps.cursor_size )
					}
				}
			} );
			this.mouse = new three__WEBPACK_IMPORTED_MODULE_4__[ 'Mesh' ]( mouseG, mouseM );
			this.scene.add( this.mouse );

		}
	}, {
		key: 'update',
		value: function update( props ) {

			const forceX = _Mouse__WEBPACK_IMPORTED_MODULE_3__[ 'default' ].diff.x / 2 * props.mouse_force;
			const forceY = _Mouse__WEBPACK_IMPORTED_MODULE_3__[ 'default' ].diff.y / 2 * props.mouse_force;
			const cursorSizeX = props.cursor_size * props.cellScale.x;
			const cursorSizeY = props.cursor_size * props.cellScale.y;
			const centerX = Math.min( Math.max( _Mouse__WEBPACK_IMPORTED_MODULE_3__[ 'default' ].coords.x, -1 + cursorSizeX + props.cellScale.x * 2 ), 1 - cursorSizeX - props.cellScale.x * 2 );
			const centerY = Math.min( Math.max( _Mouse__WEBPACK_IMPORTED_MODULE_3__[ 'default' ].coords.y, -1 + cursorSizeY + props.cellScale.y * 2 ), 1 - cursorSizeY - props.cellScale.y * 2 );
			const uniforms = this.mouse.material.uniforms;
			uniforms.force.value.set( forceX, forceY );
			uniforms.center.value.set( centerX, centerY );
			uniforms.scale.value.set( props.cursor_size, props.cursor_size );

			_get( _getPrototypeOf( ExternalForce.prototype ), 'update', this ).call( this );

		}
	} ] );

	return ExternalForce;

}( _ShaderPass__WEBPACK_IMPORTED_MODULE_2__[ 'default' ] );
