import { promises } from 'fs';
const readFile = promises.readFile;

const xDiff = 3;
const yDiff = 1;

(async ()=>{
    let input = (await readFile('./input')).toString().split('\n');
    input = input.map(val => val.charAt(val.length - 1) == '\r' ? val.slice(0, -1) : val);
    let array = input.map(val => val.split(''));
    console.log(array);
    let count = 0;
    for (let y = yDiff; y < array.length; y += yDiff) {
        let x = y * (xDiff / yDiff) % array[0].length;
        console.log(`Position: (${x}, ${y})`);
        if (array[y][x] == '#') {
            count++;
        }
    }
    console.log(count);
})();