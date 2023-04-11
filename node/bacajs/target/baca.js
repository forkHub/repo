"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let file = process.argv.slice(2)[0];
let buff = fs_1.default.readFileSync(file, 'utf-8');
let hasil = '';
// let statusEnter: boolean = false;
let statusKomentSekarang = false;
let statusKomentSebelum = false;
let barisKosong = false;
buff.split(/\n/).forEach((str) => {
    updateStatusKomentar(str);
    // console.log(str);
    if (str.length == 0) {
        // console.log('baris kosong')
        barisKosong = true;
    }
    else {
        // console.log('baris tidak kosong')
        barisKosong = false;
    }
    if (tambahEnterSebelum(str)) {
        // console.log('tambah enter');
        hasil += '\n';
        // statusEnter = true; 
    }
    else {
        // statusEnter = false;
    }
    hasil += str;
    if (!barisKosong) {
        hasil += '\n';
    }
    if (tambahEnterSesudah(str)) {
        hasil += '\n';
    }
});
let ctr = 0;
while (ctr < 100) {
    ctr++;
    // hasil.replace(/\r?\n\r?\n\r?\n/, '\n');
}
//tulis ke file
fs_1.default.writeFileSync(process.argv.slice(2)[1], hasil);
function tambahEnterSesudah(str) {
    if (str.indexOf('Grafis(') > -1)
        return true;
    return false;
}
function updateStatusKomentar(str) {
    statusKomentSebelum = statusKomentSekarang;
    if (str.trim().slice(0, 2) == '//') {
        statusKomentSekarang = true;
    }
    else {
        statusKomentSekarang = false;
    }
    // console.log('update status komentar');
    // console.log('str ' + str);
    // console.log('sebelum ' + statusKomentSebelum);
    // console.log('sekarang ' + statusKomentSekarang);
    // console.log('');
}
function tambahEnterSebelum(str) {
    if (barisKosong) {
        // console.log('tidak tambah enter sebelum');
        return false;
    }
    if (statusKomentSebelum == false) {
        if (str.indexOf('//') > -1)
            return true;
        if (str.indexOf('/*') > -1)
            return true;
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
    }
    return false;
}
