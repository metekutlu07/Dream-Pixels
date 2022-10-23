export default function () {

	function Simulation( props ) {

		_classCallCheck( this, Simulation );

		this.props = props;
		this.fbos = {
			vel_0: null,
			vel_1: null,
			// for calc next velocity with viscous
			vel_viscous0: null,
			vel_viscous1: null,
			// for calc pressure
			div: null,
			// for calc poisson equation
			pressure_0: null,
			pressure_1: null
		};
		this.options = {
			iterations_poisson: 32,
			iterations_viscous: 32,
			mouse_force: 20,
			resolution: 0.5,
			cursor_size: 100,
			viscous: 30,
			isBounce: false,
			dt: 0.014,
			isViscous: false,
			BFECC: true
		};

		new _Controls__WEBPACK_IMPORTED_MODULE_3__[ 'default' ]( this.options );
		this.fboSize = new three__WEBPACK_IMPORTED_MODULE_2__[ 'Vector2' ]();
		this.cellScale = new three__WEBPACK_IMPORTED_MODULE_2__[ 'Vector2' ]();
		this.boundarySpace = new three__WEBPACK_IMPORTED_MODULE_2__[ 'Vector2' ]();
		this.init();

	}

	_createClass( Simulation, [ {
		key: 'init',
		value: function init() {

			this.calcSize();
			this.createAllFBO();
			this.createShaderPass();

		}
	}, {
		key: 'createAllFBO',
		value: function createAllFBO() {

			const type = /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ? three__WEBPACK_IMPORTED_MODULE_2__[ 'HalfFloatType' ] : three__WEBPACK_IMPORTED_MODULE_2__[ 'FloatType' ];

			for ( const key in this.fbos ) {

				this.fbos[ key ] = new three__WEBPACK_IMPORTED_MODULE_2__[ 'WebGLRenderTarget' ]( this.fboSize.x, this.fboSize.y, {
					type: type
				} );

			}

		}
	}, {
		key: 'createShaderPass',
		value: function createShaderPass() {

			this.advection = new _Advection__WEBPACK_IMPORTED_MODULE_4__[ 'default' ]( {
				cellScale: this.cellScale,
				fboSize: this.fboSize,
				dt: this.options.dt,
				src: this.fbos.vel_0,
				dst: this.fbos.vel_1
			} );
			this.externalForce = new _ExternalForce__WEBPACK_IMPORTED_MODULE_5__[ 'default' ]( {
				cellScale: this.cellScale,
				cursor_size: this.options.cursor_size,
				dst: this.fbos.vel_1
			} );
			this.viscous = new _Viscous__WEBPACK_IMPORTED_MODULE_6__[ 'default' ]( {
				cellScale: this.cellScale,
				boundarySpace: this.boundarySpace,
				viscous: this.options.viscous,
				src: this.fbos.vel_1,
				dst: this.fbos.vel_viscous1,
				dst_: this.fbos.vel_viscous0,
				dt: this.options.dt
			} );
			this.divergence = new _Divergence__WEBPACK_IMPORTED_MODULE_7__[ 'default' ]( {
				cellScale: this.cellScale,
				boundarySpace: this.boundarySpace,
				src: this.fbos.vel_viscous0,
				dst: this.fbos.div,
				dt: this.options.dt
			} );
			this.poisson = new _Poisson__WEBPACK_IMPORTED_MODULE_8__[ 'default' ]( {
				cellScale: this.cellScale,
				boundarySpace: this.boundarySpace,
				src: this.fbos.div,
				dst: this.fbos.pressure_1,
				dst_: this.fbos.pressure_0
			} );
			this.pressure = new _Pressure__WEBPACK_IMPORTED_MODULE_9__[ 'default' ]( {
				cellScale: this.cellScale,
				boundarySpace: this.boundarySpace,
				src_p: this.fbos.pressure_0,
				src_v: this.fbos.vel_viscous0,
				dst: this.fbos.vel_0,
				dt: this.options.dt
			} );

		}
	}, {
		key: 'calcSize',
		value: function calcSize() {

			const width = Math.round( this.options.resolution * _Common__WEBPACK_IMPORTED_MODULE_1__[ 'default' ].width );
			const height = Math.round( this.options.resolution * _Common__WEBPACK_IMPORTED_MODULE_1__[ 'default' ].height );
			const px_x = 1.0 / width;
			const px_y = 1.0 / height;
			this.cellScale.set( px_x, px_y );
			this.fboSize.set( width, height );

		}
	}, {
		key: 'resize',
		value: function resize() {

			this.calcSize();

			for ( const key in this.fbos ) {

				this.fbos[ key ].setSize( this.fboSize.x, this.fboSize.y );

			}

		}
	}, {
		key: 'update',
		value: function update() {

			if ( this.options.isBounce ) {

				this.boundarySpace.set( 0, 0 );

			} else {

				this.boundarySpace.copy( this.cellScale );

			}

			this.advection.update( this.options );
			this.externalForce.update( {
				cursor_size: this.options.cursor_size,
				mouse_force: this.options.mouse_force,
				cellScale: this.cellScale
			} );
			let vel = this.fbos.vel_1;

			if ( this.options.isViscous ) {

				vel = this.viscous.update( {
					viscous: this.options.viscous,
					iterations: this.options.iterations_viscous,
					dt: this.options.dt
				} );

			}

			this.divergence.update( {
				vel: vel
			} );
			const pressure = this.poisson.update( {
				iterations: this.options.iterations_poisson
			} );
			this.pressure.update( {
				vel: vel,
				pressure: pressure
			} );

		}
	} ] );

	return Simulation;

}
