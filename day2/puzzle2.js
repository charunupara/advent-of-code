const fs = require('fs');
const { forEach, reduce } = require('lodash');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const countColors = (round, curCount) => {

    const draws = round.split(',');

    forEach(draws, draw => {
        const cleanDraw = draw.slice(1, draw.length).split(' ');

        const drawCount = parseInt(cleanDraw[0]);
        const drawColor = cleanDraw[1];

        if (drawCount > curCount[drawColor]) curCount[drawColor] = drawCount;
    })

    return curCount;
}

const leastColorsPerGame = game => {

    let result = {
        'red': 0,
        'green': 0,
        'blue': 0
    }

    const cleanGame = game.split(':');
    const rounds = cleanGame[1].split(';');

    forEach(rounds, round => {
       result = countColors(round, result);
    })


    return reduce(Object.values(result), (res, n) => {
        return res * n
    }, 1);
     
}

const main = () => {

    let sum = 0;
    forEach(input, game => {
        sum += leastColorsPerGame(game)
    });

    console.log(sum);

}

main();