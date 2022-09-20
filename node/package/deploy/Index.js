"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let fileStr = fs_1.default.readFileSync('index.html', "utf-8");
let script = [];
let scriptSrc = [];
// console.log(fileStr);
//ambil script
while (true) {
    let reg = /<script.*<\/script>/.exec(fileStr);
    if (reg) {
        let scriptStr = reg[0];
        script.push(reg[0]);
        fileStr = fileStr.replace(/<script.*<\/script>/, "<__script__>");
        //ambil src
        let regSrc = /".*"/.exec(scriptStr);
        if (regSrc) {
            let str = regSrc[0].slice(1);
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
