export default function () {

	/**
   * Initialize a new event bus instance.
   */
	function EventBus() {

		_classCallCheck( this, EventBus );

		this.bus = document.createElement( 'fakeelement' );

	}
	/**
   * Add an event listener.
   */


	_createClass( EventBus, [ {
		key: 'on',
		value: function on( event, callback ) {

			this.bus.addEventListener( event, callback );

		}
		/**
     * Remove an event listener.
     */

	}, {
		key: 'off',
		value: function off( event, callback ) {

			this.bus.removeEventListener( event, callback );

		}
		/**
     * Dispatch an event.
     */

	}, {
		key: 'emit',
		value: function emit( event ) {

			const detail = arguments.length > 1 && arguments[ 1 ] !== undefined ? arguments[ 1 ] : {};
			this.bus.dispatchEvent( new CustomEvent( event, {
				detail: detail
			} ) );

		}
	} ] );

	return EventBus;

}
