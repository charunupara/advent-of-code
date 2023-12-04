const fs = require('fs');
const { forEach, reduce } = require('lodash');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

// for each line, I want to find all the digits and store whether it's adjacent to a symbol


/*
    [i-1][j]
    [i+1][j]
    [i][j-1]
    [i][j+1]
    [i-1][j-1]
    [i-1][j+1]
    [i+1][j-1]
    [i+1][j+1]
*/

const isIndicesValid = (i, j) => {
    return (i >= 0 && i < input.length) && (j >= 0 && j < input[i].length) 
}


const isAdjacentToSymbol = (i, j) => {
    // if indices valid for each adjacent is valid, does the adjacent indices correspond to a symbol
    let result = false;


    if (isIndicesValid(i-1, j)) {
        result = input[i-1][j] !== '.' && !(parseInt(input[i-1][j]) >= 0)
        if (result) return result
    } 
    if (isIndicesValid(i+1, j)) {
        result = input[i+1][j] !== '.' && !(parseInt(input[i+1][j]) >= 0)
        if (result) return result
    }  
    if (isIndicesValid(i, j-1)) {
        result = input[i][j-1]!== '.' && !(parseInt(input[i][j-1]) >= 0)
        if (result) return result
    } 
    if (isIndicesValid(i, j+1)) {
        result = input[i][j+1] !== '.' && !(parseInt(input[i][j+1]) >= 0)
        if (result) return result
    } 
    if (isIndicesValid(i-1, j-1)) {
        result = input[i-1][j-1]!== '.' && !(parseInt(input[i-1][j-1]) >= 0)
        if (result) return result
    } 
    if (isIndicesValid(i-1, j+1)) {
        result = input[i-1][j+1] !== '.' && !(parseInt(input[i-1][j+1]) >= 0)
        if (result) return result
    } 
    if (isIndicesValid(i+1, j-1)) {
        result = input[i+1][j-1]!== '.' && !(parseInt(input[i+1][j-1]) >= 0)
        if (result) return result
    } 
    if (isIndicesValid(i+1, j+1)) {
        result = input[i+1][j+1] !== '.' && !(parseInt(input[i+1][j+1]) >= 0)
        if (result) return result 
    }

    return false;
}   

const readLine = (line, lineNumber) => {
    let lineResult = [];

    let i = 0;

    while (i < line.length) {
        const curChar = line[i];
        if (!parseInt(curChar) && curChar !== '0') {
            i += 1;
        } else {
            let j = i;
            let adjacent = false;
            let curString = ""
            while (j < line.length && parseInt(line[j]) >= 0) {
                j += 1;
            }

            for (let k = i; k < j; k++) {
                curString += line[k]
                
                if (isAdjacentToSymbol(lineNumber, k)) {
                    adjacent = true;
                }
            }

            if (adjacent) {
                lineResult.push(parseInt(curString))
            }

            i += j-i;
        }
    }

    return lineResult;
}

const main = () => {
    let sum = 0;
    forEach(input, (line, index) => {
        const lineResult = readLine(line, index);
        const toAdd = reduce(lineResult, (sum, num) => {
            return sum + num
        }, 0)
        
        sum += toAdd;
    })

    console.log(sum)

}

main();