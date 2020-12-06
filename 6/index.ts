import { promises } from 'fs';
const readFile = promises.readFile;

(async ()=>{
    let groups = (await readFile('./input')).toString().replaceAll('\r', '').split('\n\n');
    let answers = 0;
    for (var group of groups) {
        let people = group.split('\n');
        let letters = {};
        let count = 0;
        for (var i = 0; i < group.length; i++) {
            let char = group.charAt(i);
            if (char.match(/[a-z]/) && !(char in letters)) {
                letters[char] = countLetter(group, char);
                if (letters[char] == people.length) {
                    count++;
                }
            }
        }
        // console.log(group, count, '\n');
        answers += count;
    }
    console.log(answers);
})();

const countLetter = (string:string, letter:string) => {
    let x = 0;
    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) == letter) {
            x++;
        }
    }
    return x;
};