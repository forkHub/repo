let file: string = "abcabcabcabcabcabcd";

let char = file.slice(0, 1);
file = file.slice(1);
let pattern = new Set<string>();
let repeat = new Set<string>();
let pattern2: [string, number][] = [];
let cBreak: number = 0;

while (true) {

    // console.group("loop");
    // console.log("char " + char);

    cBreak++;
    if (cBreak > 1000) {
        console.log("circuit break");
        break;
    }

    if (pattern.has(char)) {
        repeat.add(char);

        if (file.length == 0) {
            break;
        }

        char += file.slice(0, 1);
        file = file.slice(1);

    } else {
        pattern.add(char);
        console.log('add: ' + char);

        if (file.length == 0) {
            break;
        }

        char = file.slice(0, 1);
        file = file.slice(1);
    }
    // console.groupEnd();
}

console.log("Patterns:", Array.from(pattern));
console.log("Repeat:", Array.from(repeat));
