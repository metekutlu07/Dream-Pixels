export default function () {

	function Controls( params ) {

		_classCallCheck( this, Controls );

		this.params = params;
		this.init();

	}

	_createClass( Controls, [ {
		key: 'init',
		value: function init() {

			this.gui = new dat_gui__WEBPACK_IMPORTED_MODULE_0__[ 'GUI' ]( {
				width: 300
			} );
			this.gui.add( this.params, 'mouse_force', 20, 200 );
			this.gui.add( this.params, 'cursor_size', 10, 200 );
			this.gui.add( this.params, 'isViscous' );
			this.gui.add( this.params, 'viscous', 0, 500 );
			this.gui.add( this.params, 'iterations_viscous', 1, 32 );
			this.gui.add( this.params, 'iterations_poisson', 1, 32 );
			this.gui.add( this.params, 'dt', 1 / 200, 1 / 30 );
			this.gui.add( this.params, 'BFECC' );
			this.gui.close();

		}
	} ] );

	return Controls;

}
