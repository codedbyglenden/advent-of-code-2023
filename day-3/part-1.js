import {readFileMultidimensional} from '@lib/helpers';

import { NumberPosition } from './helper';

import { mapSize } from './constants';

/**
 * Code class.
 */
class index {

	/**
	 * Class setup.
	 */
	constructor( fileName ) {
		this.data = [];
		this.count = 0;

		if ( '' === fileName ) {
			return;
		}

		this.initialise( fileName );
	}

	async initialise( fileName ) {

		// New read function.
		this.data = await readFileMultidimensional( fileName );

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

		let characters = new Map();
		characters.set( '*', 1 );
		characters.set( '/', 2 );
		characters.set( '@', 3 );
		characters.set( '&', 4 );
		characters.set( '$', 5 );
		characters.set( '=', 6 );
		characters.set( '#', 7 );
		characters.set( '-', 8 );
		characters.set( '+', 9 );
		characters.set( '%', 10 );

		let newChars = [];

		let map = new Array(mapSize * mapSize).fill(0);

		let list = [];
		let numberPos = null;

		for ( let y = 0; y < this.data.length; y++ ) {
			const line = this.data[y];

			for (let x = 0; x < line.length; x++) {
				const character = line[x];

				// If it's a number.
				if ( this.isNumber( character ) ) {
					if ( null === numberPos ) {
						numberPos = new NumberPosition();
					}

					numberPos.insertNumber(x, y, character);
				} else {

					if ( '.' !== character ) {
						newChars.push( character );
					}

					//	If the number has ended push it.
					if ( null !== numberPos ) {
						list.push( numberPos );
					}

					// Reset number pos.
					numberPos = null;

					// If special character replace in 0 grid.
					if ( characters.get( character ) ) {
						map[y * mapSize + x] = characters.get(character);
					}
				}
			}
		}

		let count = 0;

		// console.log( list )

		for (let index = 0; index < list.length; index++) {
			const item = list[index];
			if ( item.isAdjacent( map ) ) {

				count += item.getNumber();
			}
		}

		// console.log( Array.from(new Set(newChars)) )
		// console.log(count)
	}

	isNumber(e) {
		return !isNaN(parseFloat(e)) && isFinite(e);
	}

	showMap(map) {
		for (let y = 0; y < mapSize; y++) {
			let line = '';
			for (let x = 0; x < mapSize; x++) {
				if ( 0 === map[y * mapSize + x]) {
					line += '.';
				} else {
					line += map[y * mapSize + x];
				}
			}
			console.log(line);
		}
	}
}

// Initiate class.
new index( 'test.txt' );