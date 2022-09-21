"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let fileStr = fs_1.default.readFileSync('index.html', "utf-8");
let content = '';
//ambil script
while (true) {
    let tag = ambilScriptTag(fileStr);
    if (tag != '') {
        content = fs_1.default.readFileSync(ambilScriptUrl(tag), 'utf-8');
        fileStr = fileStr.replace(/<script.*<\/script>/, content);
    }
    else {
        break;
    }
}
function ambilScriptTag(src) {
    let reg = /<script.*<\/script>/.exec(src);
    let hasil = '';
    if (reg) {
        hasil = reg[0];
    }
    return hasil;
}
function ambilScriptUrl(src) {
    let regSrc = /".*"/.exec(src);
    if (regSrc) {
        let str = regSrc[0].slice(1);
        str = str.slice(0, str.length - 1);
        return str;
    }
    throw Error('');
}
