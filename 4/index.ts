import { promises } from 'fs';
const readFile = promises.readFile;

let passports:Array<Passport> = [];
let valid = 0;

(async ()=>{
    let input = (await readFile('./input')).toString()
        .replaceAll('\r', '')   // Clean it up
        .split('\n\n'); // And split by for each passport
    input.forEach(passportText => {
        let parsed = passportText.match(/(byr|iyr|eyr|hgt|hcl|ecl|pid|cid):([a-z0-9#]+)/g);
        let passport:Passport = {
            byr: undefined,
            iyr: undefined,
            eyr: undefined,
            hgt: undefined,
            hcl: undefined,
            ecl: undefined,
            pid: undefined,
            cid: undefined,
        };
        for (const field of parsed) {
            let divider = field.indexOf(':');
            let key = field.substr(0, divider);
            let value = field.substr(divider + 1);
            if (value.match(/^[0-9]+$/) && key !== 'pid') {
                passport[key] = parseInt(value);
            } else {
                passport[key] = value;
            }
        }
        passports.push(passport);
        let byrValid = passport.byr !== undefined &&
                passport.byr >= 1920 &&
                passport.byr <= 2002;
        let iyrValid = passport.iyr !== undefined &&
                passport.iyr >= 2010 &&
                passport.iyr <= 2020;
        let eyrValid = passport.eyr !== undefined &&
                passport.eyr >= 2020 &&
                passport.eyr <= 2030;
        let hgtValid = passport.hgt !== undefined && typeof passport.hgt == 'string' &&
                (passport.hgt.substr(passport.hgt.length - 2) == 'cm' ?
                    parseInt(passport.hgt) >= 150 && parseInt(passport.hgt) <= 193
                  : parseInt(passport.hgt) >= 59 && parseInt(passport.hgt) <= 76
                );
        let hclValid = passport.hcl !== undefined && typeof passport.hcl == 'string' &&
                passport.hcl.match(/^#[0-9a-f]{6}$/) != null;
        let eclValid = passport.ecl !== undefined &&
                passport.ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/) != null;
        let pidValid = passport.pid !== undefined &&
                passport.pid.match(/^[0-9]{9}$/) != null;
        let isValid = 
            byrValid &&
            iyrValid &&
            eyrValid &&
            hgtValid &&
            hclValid &&
            eclValid &&
            pidValid;
        // if (!isValid) {
            // console.log(passport, {byrValid, iyrValid, eyrValid, hgtValid, hclValid, eclValid, pidValid}, isValid);
        // }
        // if (typeof passport.hgt == 'string' && passport.hgt.slice(-2) == 'in')
            console.log(pidValid ? '✅' : '❌', passport.pid);
        if (isValid) {
            valid++;
        }
    });
    console.log(valid, input.length);
})();

type Passport = {
    byr?:number
    iyr?:number
    eyr?:number
    hgt?:string
    hcl?:string
    ecl?:string
    pid?:string
    cid?:number
}