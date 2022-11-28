"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let file = process.argv.slice(2)[0];
let output = process.argv.slice(2)[1];
let buff = fs_1.default.readFileSync(file, 'utf-8');
let hasil = '';
buff.split(/\r?\n/).forEach((str) => {
    str = str.trim();
    hasil += str;
});
//tulis ke file
fs_1.default.writeFileSync(output, hasil);
