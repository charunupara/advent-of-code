const fs = require('fs');
const { forEach, reduce } = require('lodash');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

let adjacencyList = {}

const isIndicesValid = (i, j) => {
    return (i >= 0 && i < input.length) && (j >= 0 && j < input[i].length) 
}


const isAdjacentToSymbol = (i, j) => {
    // if indices valid for each adjacent is valid, does the adjacent indices correspond to a symbol
    let result = false;


    if (isIndicesValid(i-1, j)) {
        result = input[i-1][j] === '*'
        if (result) return [i-1, j]
    }
    if (isIndicesValid(i+1, j)) {
        result = input[i+1][j] === '*'
        if (result) return [i+1, j]
    }  
    if (isIndicesValid(i, j-1)) {
        result = input[i][j-1] === '*'
        if (result) return [i, j-1]
    } 
    if (isIndicesValid(i, j+1)) {
        result = input[i][j+1] === '*'
        if (result) return [i, j+1]
    } 
    if (isIndicesValid(i-1, j-1)) {
        result = input[i-1][j-1] === '*'
        if (result) return [i-1, j-1]
    } 
    if (isIndicesValid(i-1, j+1)) {
        result = input[i-1][j+1] === '*'
        if (result) return [i-1, j+1]
    } 
    if (isIndicesValid(i+1, j-1)) {
        result = input[i+1][j-1] === '*'
        if (result) return [i+1, j-1]
    } 
    if (isIndicesValid(i+1, j+1)) {
        result = input[i+1][j+1] === '*'
        if (result) return [i+1, j+1]
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
            let curString = ""
            let adjacency;
            let adjacent = false;
            while (j < line.length && parseInt(line[j]) >= 0) {
                j += 1;
            }

            for (let k = i; k < j; k++) {

                curString += line[k]
                if (!adjacent) adjacency = isAdjacentToSymbol(lineNumber, k);
                
                if (adjacency) {
                    adjacent = true;
                }
            }
            
            if (adjacency && adjacent) { 
                adjacencyList[adjacency].push(curString);
            }
        
            i += j-i;
        }
    }
}

const initializeAdjacencyList = () => {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === '*') {
                adjacencyList[[i,j]] = []
            }
        }
    }
}

const main = () => {
    initializeAdjacencyList();
    forEach(input, (line, index) => {
        readLine(line, index);
    });

    let result = 0;
    forEach(adjacencyList, (value, key) => {
        const cur = adjacencyList[key];
        let lineResult = 1;
        if(cur.length === 2) {
            lineResult = lineResult * parseInt(cur[0]) * parseInt(cur[1]);
            result += lineResult;
        }
    })

    console.log(result);
}

main();