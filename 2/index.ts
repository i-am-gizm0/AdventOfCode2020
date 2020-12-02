import { promises } from 'fs';
const readFile = promises.readFile;

(async ()=>{
    const input = (await readFile('./input')).toString().split('\n');
    
    let valid = 0;
    input.forEach(val1 => {
        const parts = val1.split(':');
        const rule = parts[0].split(' ');
        const occurances = rule[0];
        const letter = rule[1];
        let pw:string;
        if (parts[1].charAt(parts[1].length - 1) == '\n') {
            pw = parts[1].slice(1, -1);
        } else {
            pw = parts[1].substr(1);
        }
        const range = getRange(occurances);
        const a = pw.charAt(range.min - 1) == letter;
        const b = pw.charAt(range.max - 1) == letter;
        if ( (a && !b) || (!a && b)) {
        // if (inRange(countLetter(pw, letter), range.min, range.max)) {
            valid++;
        }
    });
    console.log(valid);
})();

const getRange = (occurances:string) => {
    const dividerPosition = occurances.indexOf('-');
    let min = parseInt(occurances.substr(0, dividerPosition));
    let max = parseInt(occurances.substr(dividerPosition + 1));
    return {min, max};
}

const inRange = (val:number, min:number, max:number) => {
    return val >= min && val <= max;
}

const countLetter = (string:string, letter:string) => {
    let x = 0;
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) == letter) {
            x++;
        }
    }
    return x;
};