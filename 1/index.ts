import { promises } from 'fs';
const readFile = promises.readFile;

(async ()=>{
    const inputStrings = (await readFile('./input')).toString().split('\n');
    const input = [];
    inputStrings.forEach(value => {
        input.push(parseInt(value));
    });
    
    let mult = 0;
    input.forEach(val1 => {
        if (mult == 0)
            input.forEach(val2 => {
                if (mult == 0)
                    input.forEach(val3 => {
                        if (mult == 0 && val1 + val2 + val3 == 2020) {
                            mult = val1 * val2 * val3;
                        }
                    });
            });
    });
    console.log(mult);
})();