export default class Pool {

	static create( Module, onReset ) {

		const pool = new Pool( Module, { onReset } );
		Module.get = () => pool.get();
		Module.release = () => pool.release( ...arguments );

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

			if ( this.items.includes( item ) )
				this.availables.push( item );

		}

	}

	get() {

		if ( this.items.size > this.maxSize ) this.onMaxSizeReached();

		const item = this.availables.pop() || new this.prototype();
		if ( ! this.items.includes( item ) ) this.items.push( item );
		else if ( this.onReset ) this.onReset( item );

		return item;

	}

	onMaxSizeReached() {

		throw new Error( `${ this.prototype.name } pool has exceed its size` );

	}

}
