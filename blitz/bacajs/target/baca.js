"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let file = process.argv.slice(2)[0];
let buff = fs_1.default.readFileSync(file, 'utf-8');
let hasil = '';
buff.split(/\r?\n/).forEach((str) => {
    if (tambahEnterSebelum(str)) {
        hasil += '\n';
    }
    hasil += str;
    hasil += '\n';
    if (tambahEnterSesudah(str)) {
        hasil += '\n';
    }
});
//tulis ke file
fs_1.default.writeFileSync(process.argv.slice(2)[1], hasil);
function tambahEnterSesudah(str) {
    if (str.indexOf('Grafis(') > -1)
        return true;
    return false;
}
function tambahEnterSebelum(str) {
    if (str.indexOf('function') > -1)
        return true;
    if (str.indexOf('if (') > -1)
        return true;
    if (str.indexOf('else if (') > -1)
        return true;
    if (str.indexOf('else {') > -1)
        return true;
    if (str.indexOf('for (let') > -1)
        return true;
    return false;
}
