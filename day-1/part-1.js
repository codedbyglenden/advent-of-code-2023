import {asyncReadFile} from '@lib/helpers';

/**
 * Code class.
 */
class index {

	/**
	 * Class setu-up.
	 */
	constructor( fileName ) {
		this.data = 0;
		this.count = 0;

		if ( '' === fileName ) {
			return;
		}

		this.initialise( fileName );
	}

	async initialise( fileName ) {
		this.data = await asyncReadFile( fileName );

		// Do something with data here.
		this.loopData();

		this.outputResult();
	}

	outputResult() {
		console.log( `Combined score is: ${this.count}` );
	}

	/**
	 * Loop the array items and add them up.
	 */
	loopData() {
		this.data.forEach(lineOfData => {
			this.count = this.count + this.extractNumbersAndSum( lineOfData );
		});
	}

	/**
	 * Find all of the numbers in a string and return the sum of both numbers.
	 * @param {*} randomString
	 * @returns 
	 */
	extractNumbersAndSum( randomString ) {

		if ( ! randomString ) {
			return 0;
		}

		// Find numbers in a string and return them as an array.
		const numbers = randomString.match(/\d/g);

		// If the number is on it's own then combine with itself.
		if ( numbers.length < 2 ) {
			return parseInt( numbers[0] + numbers[0] );
		}

		return parseInt( numbers[0] + numbers[numbers.length - 1] );
	}
}

// Initiate class.
new index( 'test.txt' );