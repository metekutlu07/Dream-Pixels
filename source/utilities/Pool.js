export default class Pool {

	static create( Module, onReset ) {

		const pool = new Pool( Module, { onReset } );
		Module.get = () => pool.get();
		Module.release = function () { pool.release( ...arguments ) };

	}

	constructor( prototype, { onReset, maxSize = 100 } = {} ) {

		this.prototype = prototype;
		this.onReset = onReset;
		this.maxSize = maxSize;

		this.clear();

	}

	clear() {

		this.items = [];
		this.availables = [];

	}

	reset() {

		this.release( ...this.items );

	}

	release() {

		for ( const item of arguments ) {

			if ( this.items.indexOf( item ) > -1 )
				this.availables.push( item );

		}

	}

	get() {

		if ( this.items.length > this.maxSize ) this.onMaxSizeReached();

		const item = this.availables.pop() || new this.prototype();
		if ( this.items.indexOf( item ) === -1 ) this.items.push( item );
		else if ( this.onReset ) this.onReset( item );

		return item;

	}

	onMaxSizeReached() {

		throw new Error( `${ this.prototype.name } pool has exceed its size` );

	}

}
