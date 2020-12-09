import { promises } from 'fs';
const readFile = promises.readFile;

(async ()=>{
    let instructions = (await readFile('./input')).toString().replaceAll('\r', '').split('\n');
    
    for (var instruction in instructions) {
        let newInstructions = instructions.concat();

        let jmp = newInstructions[instruction].startsWith('jmp');
        let nop = newInstructions[instruction].startsWith('nop');
        if ( jmp || nop ) {
            if (jmp) {
                newInstructions[instruction] = newInstructions[instruction].replace('jmp', 'nop');
            } 
            if (nop) {
                newInstructions[instruction] = newInstructions[instruction].replace('nop', 'jmp');
            }
            console.log(newInstructions[instruction]);
            try {
                let accumulator = run(newInstructions);
                console.log(accumulator);
                break;
            } catch (e) {
                console.warn(e);
            }
        }
    }
})();

function run(instructions:Array<string>) {

    let usage:Array<boolean>;
    let instPointer = 0;
    let accumulator = 0;

    usage = new Array<boolean>(instructions.length);

    while (true) {
        if (usage[instPointer]) {
            throw 'infinite';
        }
        if (instPointer == instructions.length) {
            break;
        }
        usage[instPointer] = true;

        let instruction = instructions[instPointer].match(/([a-z]{3}) ([+-][0-9]+)/);
        let operation = instruction[1];
        let argument = parseInt(instruction[2]);
        let isJump = false;

        // console.log(`${instPointer}\t=> ${operation} ${argument}\t| ${accumulator}`);

        switch (operation) {
            case 'acc':
                accumulator += argument;
                break;
            
            case 'jmp':
                instPointer += argument;
                isJump = true;
                break;

            case 'nop':
                break;
            
            default:
                throw 'Unknown Operation';
        }

        if (!isJump) {
            instPointer++;
        }
    }
    return accumulator;
}