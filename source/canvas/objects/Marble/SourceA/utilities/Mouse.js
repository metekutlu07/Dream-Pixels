export default function () {

	function Mouse() {

		_classCallCheck( this, Mouse );

		this.mouseMoved = false;
		this.coords = new three__WEBPACK_IMPORTED_MODULE_0__[ 'Vector2' ]();
		this.coords_old = new three__WEBPACK_IMPORTED_MODULE_0__[ 'Vector2' ]();
		this.diff = new three__WEBPACK_IMPORTED_MODULE_0__[ 'Vector2' ]();
		this.timer = null;
		this.count = 0;

	}

	_createClass( Mouse, [ {
		key: 'init',
		value: function init() {

			document.body.addEventListener( 'mousemove', this.onDocumentMouseMove.bind( this ), false );
			document.body.addEventListener( 'touchstart', this.onDocumentTouchStart.bind( this ), false );
			document.body.addEventListener( 'touchmove', this.onDocumentTouchMove.bind( this ), false );

		}
	}, {
		key: 'setCoords',
		value: function setCoords( x, y ) {

			const _this = this;

			if ( this.timer ) clearTimeout( this.timer );
			this.coords.set( x / _Common__WEBPACK_IMPORTED_MODULE_1__[ 'default' ].width * 2 - 1, -( y / _Common__WEBPACK_IMPORTED_MODULE_1__[ 'default' ].height ) * 2 + 1 );
			this.mouseMoved = true;
			this.timer = setTimeout( function () {

				_this.mouseMoved = false;

			}, 100 );

		}
	}, {
		key: 'onDocumentMouseMove',
		value: function onDocumentMouseMove( event ) {

			this.setCoords( event.clientX, event.clientY );

		}
	}, {
		key: 'onDocumentTouchStart',
		value: function onDocumentTouchStart( event ) {

			if ( event.touches.length === 1 ) {

				// event.preventDefault();
				this.setCoords( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

			}

		}
	}, {
		key: 'onDocumentTouchMove',
		value: function onDocumentTouchMove( event ) {

			if ( event.touches.length === 1 ) {

				// event.preventDefault();
				this.setCoords( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

			}

		}
	}, {
		key: 'update',
		value: function update() {

			this.diff.subVectors( this.coords, this.coords_old );
			this.coords_old.copy( this.coords );
			if ( this.coords_old.x === 0 && this.coords_old.y === 0 ) this.diff.set( 0, 0 );

		}
	} ] );

	return Mouse;

}
