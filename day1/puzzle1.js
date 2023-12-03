const fs = require('fs');
const { forEach, reduce, map } = require('lodash');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

// 54nzzddht8ninelrkkseightseven6

const isInt = char => {
    const int = parseInt(char);
    return !isNaN(int)
}

const processLine = line => {
    let foundFirstNum = false;
    let secondInt = '';
    let numString = '';

    forEach(line, char => {
        if (!foundFirstNum) {
            if (isInt(char)) {
                foundFirstNum = true;
                numString += char;
            }
        } else {
            if (isInt(char)) {
                secondInt = char;
            }
        }
    })

    secondInt = secondInt ? secondInt : numString;
    numString += secondInt;

    return parseInt(numString) ? parseInt(numString) : 0;
};

const main = () => {
    const nums = map(input, line => processLine(line));
    console.log(nums[nums.length-1]);
    const result = reduce(nums, (sum, num) => {
        return sum + num;
    }, 0);


    return result;
}

const result = main();

console.log(result);

