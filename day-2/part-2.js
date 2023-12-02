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

	// 12 red.
	// 13 green.
	// 14 blue

	// we are adding the selected ids, not adding the total number of games.

	/**
	 * Loop the array items and add them up.
	 */
	loopData() {

		const bagOfItems = {
			red : 12,
			green: 13,
			blue: 14,
		};

		let isAllowedGame = true;
		let allowedGameIds = [];
		let gameIdCount = 0;

		let powerOfGames = [];

		let totalGamePower = 0;


		// 1 blue, 2 green;
		// 3 green, 4 blue, 1 red;
		// 1 green, 1 blue


		// The power of a game is the lowest number of each item * by each other

		// In the above example this is: 4 * 1 * 3 = 12;


		this.data.forEach(( lineOfData, lineIndex ) => {

			const initialSplit = lineOfData.split(':');

			const gameId = initialSplit[0].split('Game ')[1];

			const games = initialSplit[1].split(';');

			const lowestObjCount = {
				red: 0,
				green: 0,
				blue: 0,
			}

			outer: for (let index = 0; index < games.length; index++) {
				const game = games[index];

				// key values.
				const valuesInGame = game.split(',');

				for (let x = 0; x < valuesInGame.length; x++) {
					const valueInGame = valuesInGame[x];

					const numbers = valueInGame.split(' ')

					// The count of the item
					const number = numbers[1];

					// The item colour.
					const category = numbers[2];

					if ( lowestObjCount[category] < number ) {
						lowestObjCount[category] = parseInt( number );
					}
				}
			}

			const powerOfGame = lowestObjCount['red'] * lowestObjCount['blue'] * lowestObjCount['green'];

			powerOfGames.push( powerOfGame );
		});

		powerOfGames.forEach( (gamePower) => {
			totalGamePower = totalGamePower + gamePower;
		})

		this.count = totalGamePower;
	}
}

// Initiate class.
new index( 'test.txt' );