
const fs = require('fs');
const { compact, intersection, forEach } = require('lodash');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');


//const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const processLine = line => {
    const firstSplit = line.split(":");
    const cards = firstSplit[1].split("|")
    const winningCard = compact(cards[0].split(" "));
    const myCards = compact(cards[1].split(" "));

    const cardsIWon = intersection(winningCard, myCards);
    console.log(line);
    console.log(cardsIWon);
    console.log(2 ** (cardsIWon.length - 1));

    return parseInt(2 ** (cardsIWon.length - 1));
}

const main = () => {
    let sum = 0;
    forEach(input, line => {
        sum += processLine(line);
    });

    console.log(sum);
}

main();