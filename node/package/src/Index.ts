import fs from "fs";

let fileStr: string = fs.readFileSync('index.html', "utf-8");
let script: string[] = [];
let scriptSrc: string[] = [];

// console.log(fileStr);

//ambil script
while (true) {
    let reg: RegExpExecArray = /<script.*<\/script>/.exec(fileStr);

    if (reg) {
        let scriptStr: string = reg[0];
        script.push(reg[0]);
        fileStr = fileStr.replace(/<script.*<\/script>/, "<__script__>");

        //ambil src
        let regSrc: RegExpExecArray = /".*"/.exec(scriptStr);

        if (regSrc) {
            let str: string = regSrc[0].slice(1);
            str = str.slice(0, str.length - 1);
            scriptSrc.push(str);
        }
    }
    else {
        break;
    }
}

//ambil src
console.log(scriptSrc);
