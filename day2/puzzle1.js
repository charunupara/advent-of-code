const fs = require('fs');
const { forEach } = require('lodash');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const criteria = {
    'red': 12,
    'green': 13,
    'blue': 14,
}

const playRound = round => {
    let result = true;
    const draws = round.split(',');

    forEach(draws, draw => {
        const cleanDraw = draw.slice(1, draw.length).split(' ');

        const drawCount = parseInt(cleanDraw[0]);
        const drawColor = cleanDraw[1];

        if (drawCount > criteria[drawColor]) { 
            result = false;
            return false;
        }
    })

    return result;
}

const isGamePossible = game => {
    let result = true;
    const cleanGame = game.split(':');
    const rounds = cleanGame[1].split(';');

    forEach(rounds, round => {
        if (playRound(round) === false) { 
            result = false;
            return false;
        }
    })

    return result;
}

const main = () => {
    let sum = 0;
    forEach(input, game => {
        const gameInfo = game.split(':')[0];
        const gameNum = parseInt(gameInfo.slice(4, gameInfo.length))
        if (isGamePossible(game)) sum += gameNum;
    })

    console.log(sum);
}

main();