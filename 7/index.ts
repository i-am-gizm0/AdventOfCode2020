import { count } from 'console';
import { promises } from 'fs';
const readFile = promises.readFile;
type Bag = {
    parent: string,
    children: Array<Child>
}
type Child = {
    qty: number,
    name: string
}
let bags:Array<Bag> = [];

(async ()=>{
    let input = (await readFile('./input')).toString().replaceAll('\r', '').split('\n');
    for (var rule of input) {
        let parsedRule = rule.match(/^(.*) bag(?:s?) contain (.*).?$/);
        let childrenArray = parsedRule[2].split(',');
        let thisBag = <Bag>{
            parent: parsedRule[1],
            children: []
        };
        for (var child of childrenArray) {
            let text = child
                .replace('.', '')
                .replace(' bag', '')
                .replace(' bags', '')
                .trim();
            let parsed = text.match(/^([0-9]) (.*)$/);
            if (!parsed)
                continue;
            let count = parsed[1];
            let name = parsed[2];
            thisBag.children.push({
                qty: parseInt(count),
                name
            });
        }
        bags.push(thisBag);
    }
    // Smells like recursion

    // Part 1
    // let parents = findParents('shiny gold');
    // console.log(parents, parents.length);

    // Part 2
    let bagCount = countBags('shiny gold');
    console.log(bagCount);

    // console.log(bags[439]);
})();

function findParents(toFind:string) {
    let parents = [];
    // Recurse through parents to find everything that could include our toFind
    for (var bag of bags) {
        let children = bag.children;
        for (var child of children) {
            if (child.name.includes(toFind)) {
                parents.push(bag.parent);
                parents = parents.concat(findParents(bag.parent));
            }
        }
    }
    // Clean up duplicates
    let uniqueParents = parents.filter((value, index) => parents.indexOf(value) === index);
    return uniqueParents;
}

function countBags(toFind:string) {
    let totalBags = 0;
    let bag = <Bag>undefined;
    for (let b of bags) {
        if (toFind.includes(b.parent)) {
            bag = b;
            break;
        }
    }
    let children = bag?.children;
    if (!children)
        return 1;
    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let qty = child.qty + countBags(child.name) * child.qty;
        totalBags += qty;
    }
    return totalBags;
}