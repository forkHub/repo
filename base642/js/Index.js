"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Base642 {
    constructor() {
        this.b64Char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    }
    load(f) {
        return __awaiter(this, void 0, void 0, function* () {
            f;
            return '';
        });
    }
    parse(str) {
        let hasil = '';
        let hasil64 = '';
        console.log('parse: ' + str);
        // console.log('check ' + this.b64Char.length);
        for (let i = 0; i < str.length; i++) {
            let char = str.slice(i, i + 1);
            if (this.checkDiRange(char, hasil)) {
                hasil += char;
            }
            else {
                hasil64 += this.str2Str64Metadata(hasil);
                hasil = char;
            }
        }
        hasil64 += this.str2Str64Metadata(hasil);
        console.log('hasil: ' + hasil64);
        console.log('ratio: ' + ((hasil64.length - str.length) / str.length) * 100);
        return hasil;
    }
    str2Str64Metadata(hasil) {
        let data = this.str2Data(hasil);
        let strHasil = this.data2Str64Metadata(data);
        // console.log(data);
        // console.log(strHasil);
        return strHasil;
    }
    data2Str64Metadata(data) {
        let hasil;
        hasil = this.b64Char.slice(data.l, data.l + 1) + this.angka2b64(data.min) + data.str;
        return hasil;
    }
    angka2b64(n) {
        let hasil = '';
        let kali = 0;
        let sisa = 0;
        kali = Math.floor(n / 64);
        sisa = n % 64;
        hasil = this.b64Char.slice(sisa, sisa + 1);
        hasil = this.b64Char.slice(kali, kali + 1) + hasil;
        return hasil;
    }
    str2b64(str, min) {
        let hasil = '';
        for (let i = 0; i < str.length; i++) {
            let char = str.charAt(i);
            let code = char.charCodeAt(0);
            code = code - min;
            hasil += this.b64Char.slice(code, code + 1);
        }
        return hasil;
    }
    str2Data(str) {
        let hasil;
        let min = 9999;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < min) {
                min = code;
            }
        }
        hasil = {
            l: str.length,
            min: min,
            str: str,
            charMin: String.fromCharCode(min)
        };
        hasil.str = this.str2b64(hasil.str, hasil.min);
        return hasil;
    }
    checkDiRange(char, str) {
        let kode = char.charCodeAt(0);
        for (let i = 0; i < str.length; i++) {
            if (Math.abs(str.charCodeAt(i) - kode) >= 64) {
                return false;
            }
        }
        return true;
    }
}
let b2 = new Base642();
b2.parse('ABCDEFGHIJKLMNOPQRSTUVWXYZ@?><;:=abcdefghijklmnopqrstuvwxyz1234567890');
