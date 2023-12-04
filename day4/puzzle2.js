const fs = require('fs');
const { compact, intersection, forEach, reduce } = require('lodash');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const cardsDict = {};

const initialize = () => {
    for (let i = 0; i < input.length; i++) {
        cardsDict[i] = 1;
    }

    return cardsDict;
}

const processLine = (line, index) => {
    const firstSplit = line.split(":");
    const cards = firstSplit[1].split("|")
    const winningCard = compact(cards[0].split(" "));
    const myCards = compact(cards[1].split(" "));

    const cardsIWon = intersection(winningCard, myCards);

    const nextCards = index + cardsIWon.length

    for (let i = index + 1; i < nextCards + 1; i++) {
        cardsDict[i] += 1
    }
    
}

const main = () => {
    initialize();
    forEach(input, (line, index) => {
        for (let i = 0; i < cardsDict[index]; i++) {
            processLine(line, index);
        }
    });

    const result = reduce(Object.values(cardsDict), (sum, num) => {
        return sum + num
    }, 0)

    console.log(result);
}

main();