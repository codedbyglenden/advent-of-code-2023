/**
 * File contains helper functions for advent of code.
 */
import {promises as fsPromises} from 'fs';

/**
 * Read the file & return each line as a new array item.
 * @param {*} filename
 * @returns {array}
 */
export const asyncReadFile = async (filename) => {
    try {
        const contents = await fsPromises.readFile(filename, 'utf-8');
        const arr = contents.split(/\r?\n/);
        return arr;
    } catch (err) {
        console.log(err);
    }
};

/**
 * Read the file & return each line as a new array item, and each character in a line into an array.
 * @param {*} filename
 * @returns {array}
 */
export const readFileMultidimensional = async (filename) => {
    try {
        const contents = await fsPromises.readFile(filename, 'utf-8');
        const lines = contents.split(/\r?\n/);
        const arr = lines.map(line => line.split('')); // Split each line into characters
        return arr;
    } catch (err) {
        console.log(err);
    }
};