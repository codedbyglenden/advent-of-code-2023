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

		const data = [
			'two1nine',
			'eightwothree',
			'abcone2threexyz',
			'xtwone3four',
			'4nineeightseven2',
			'zoneight234',
			'7pqrstsixteen',
		];

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

		const numbersAsWords = [
			'one',
			'two',
			'three',
			'four',
			'five',
			'six',
			'seven',
			'eight',
			'nine',
		];

		// We have to account for number words that merge into each other. e.g. twone should be 2 & 1.
		const forwards = numbersAsWords.join('|');
		const backwards = numbersAsWords.join('|').split('').reverse().join('');

		// Regex now matches words and numbers.
		let regex = new RegExp(`\\d|${forwards}`, 'g');
		let lastRegex = new RegExp(`\\d|${backwards}`, 'g');

		// Find numbers in a string and return them as an array.
		const numbers = randomString.match(regex);
		const lastNumbers = randomString.split('').reverse().join('').match(lastRegex);

		let firstNumber = numbers[0];
		let lastNumber  = lastNumbers[0].split('').reverse().join(''); // This number is backwards so reverse it again.

		// Return the numeric value of the word, if it is a word.
		firstNumber = this.numberOrWord( firstNumber, numbersAsWords );
		lastNumber = this.numberOrWord( lastNumber, numbersAsWords );

		return parseInt( firstNumber + lastNumber );
	}

	/**
	 * Takes in a number or a word & return the number as a number
	 */
	numberOrWord( number, words ) {
		const foundAsWord = words.findIndex( (word) => number === word );
		return String( foundAsWord > -1 ? foundAsWord + 1 : number );
	}
}

// Initiate class.
new index( 'test.txt' );