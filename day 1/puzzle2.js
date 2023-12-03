const fs = require('fs');
const { forEach, reduce, map, keys } = require('lodash');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const numbersMap = {
    'one': 'o1ne',
    'two': 't2wo',
    'three': 't3hree',
    'four': 'f4our',
    'five': 'f5ive',
    'six': 's6ix',
    'seven': 's7even',
    'eight': 'e8ight',
    'nine': 'n9ine'
}


const isSubstringPartOfAKey = substring => {
    const keysList = keys(numbersMap);
    let result = false;

    forEach(keysList, key => {
        if (key.includes(substring) && key !== substring) result = true
    })

    return result;
}


const isInt = char => {
    const int = parseInt(char);
    return !isNaN(int)
}

const transformLine = line => {
    let newLine = line;
    let i = 0;
    let pointer1;
    let pointer2;
    
    while (i < line.length) {
        pointer1 = i;
        pointer2 = i;

        while (isSubstringPartOfAKey(line.substring(pointer1, pointer2)) && pointer2 <= line.length) {
            pointer2 += 1;
        }

        let curSubstring = line.substring(pointer1, pointer2)
        

        if (numbersMap[curSubstring]) {
            newLine = newLine.replace(curSubstring, numbersMap[curSubstring]);
            i += 1;
        } else {
            i += 1;
        }
    }

    return newLine;

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
    const nums1 = map(input, line => transformLine(line));
    const nums = map(nums1, line => processLine(line));
    console.log(nums);
    const result = reduce(nums, (sum, num) => {
        return sum + num;
    }, 0);


    return result;
}

const result = main();
console.log(result)

