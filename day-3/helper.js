import { mapSize } from "./constants";

class NumberPosition {
    constructor() {
        this.xStart = -1;
        this.xEnd = -1;
        this.y = -1;
        this.number = 0;
        this.numberStr = '';
    }

	/**
	 * Insert a number to this class.
	 * @param {*} x The x axis pos.
	 * @param {*} y The y axis pos.
	 * @param {*} num The number we are adding.
	 */
    insertNumber( x, y, num ) {

		// If this is the first init of the class.
		if ( -1 === this.xStart ) {
            this.xStart = x;
        }

        this.y = y;
        this.xEnd = x;
        this.numberStr += num;
        this.number = parseInt( this.numberStr );
    }

	isAdjacent(map) {
        for ( let x = this.xStart; x <= this.xEnd; x++ ) {

			// Left.
            if (x > 0 && map[this.y * mapSize + (x - 1)] > 0) return true;

			// Right
			if (x < mapSize && map[this.y * mapSize + (x + 1)] > 0) return true;

			// Up.
            if (this.y > 0 && map[(this.y - 1) * mapSize + x] > 0) return true;

			// Down.
            if (this.y < mapSize && map[(this.y + 1) * mapSize + x] > 0) return true;

			// Diagonally up-left.
            if (this.y > 0 && x > 0 && map[(this.y - 1) * mapSize + (x - 1)] > 0) return true;

			// Diagonally up-right
            if (this.y > 0 && x < mapSize && map[(this.y - 1) * mapSize + (x + 1)] > 0) return true;

			// Diagonally Down-left.
            if (this.y < mapSize && x > 0 && map[(this.y + 1) * mapSize + (x - 1)] > 0) return true;

			// Diagonally down-right
            if (this.y < mapSize && x < mapSize && map[(this.y + 1) * mapSize + (x + 1)] > 0) return true;
        }

        return false;
    }

	getNumber() {
        return parseInt( this.number );
    }
}

export {
	NumberPosition,
};