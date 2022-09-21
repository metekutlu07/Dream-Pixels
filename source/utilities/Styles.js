export default class Styles {

	constructor() {
	}

	get() {

		const string = rules.join( '\n' );
		rules.length = 0;
		return string;

	}

}
