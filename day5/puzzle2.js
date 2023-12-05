const fs = require('fs');
const { map, forEach } = require('lodash');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const listOfMaps = ['seed-to-soil map', 'soil-to-fertilizer map', 'fertilizer-to-water map', 'water-to-light map', 'light-to-temperature map', 'temperature-to-humidity map', 'humidity-to-location map'];

const maps = {};


const processMap = (input, inputMaps) => {
    let result;

    forEach(inputMaps, (map, index) => {
        const range = map[2];
        const sourceRange = [map[1], map[1]+range];
        const destinationRange = [map[0], map[0]+range];

        if (input >= sourceRange[0] && input <= sourceRange[1]) {
            const offset = input - sourceRange[0];
            result = destinationRange[0]+offset;
            return false;
        } else if (index < inputMaps.length - 1) {
            return;
        } else {
            result = input;
            return false;
        }
    });
    
    return result;
};

const pipeCalculations = seed => {


    const soils = processMap(seed, maps['seed-to-soil map']);
    const fertilizers = processMap(soils, maps['soil-to-fertilizer map']);
    const water = processMap(fertilizers, maps['fertilizer-to-water map']);
    const light = processMap(water, maps['water-to-light map']);
    const temperature = processMap(light, maps['light-to-temperature map']);
    const humidity = processMap(temperature, maps['temperature-to-humidity map']);
    const locations = processMap(humidity, maps['humidity-to-location map']);

    return locations

}

const compute = seeds => {

    const rangeMap = {}
    let i = 0;
    while (i < seeds.length - 1) {
        rangeMap[seeds[i]] = seeds[i+1];
        i += 2;
    }

    console.log(rangeMap);
    // let minLocation = Infinity;

    // forEach(rangeMap, (value, key) => {
    //     for (let i = 0; i < value; i++) {
    //         minLocation = Math.min(minLocation, pipeCalculations(parseInt(key)+i))
    //     };
    // });

    // console.log(minLocation)

    // return minLocation;
}

const main = () => {

    const seedsLine = input[0];
    const seedsString = seedsLine.substring(7, seedsLine.length);

    const initialSeeds = map(seedsString.split(' '), seed => {
        return parseInt(seed);
    });

    let i = 2;
    while (i < input.length) {
        if (listOfMaps.includes(input[i].slice(0, input[i].length - 1))) {
            let j = i+1;
            while (input[j] && input[j] !== '') {
                const mapLineArray = [];

                map(input[j].split(' '), number => {
                    mapLineArray.push(parseInt(number));
                })

                const key = input[i].slice(0, input[i].length - 1); 
                maps[key] ? maps[key].push(mapLineArray) : maps[key] = [mapLineArray];
                j += 1;
            }
            i += (j+1)-i;
        } else {
            i += 1;
        }
    }
    
    //console.log(expandSeeds(initialSeeds));

    compute(initialSeeds);

    // const soils = processMap(seeds, maps['seed-to-soil map']);
    // const fertilizers = processMap(soils, maps['soil-to-fertilizer map']);
    // const water = processMap(fertilizers, maps['fertilizer-to-water map']);
    // const light = processMap(water, maps['water-to-light map']);
    // const temperature = processMap(light, maps['light-to-temperature map']);
    // const humidity = processMap(temperature, maps['temperature-to-humidity map']);
    // const locations = processMap(humidity, maps['humidity-to-location map']);

    // console.log(Math.min(...locations));


};


main()