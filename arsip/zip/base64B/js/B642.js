"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.b64a = exports.b64af = void 0;
const fs_1 = __importDefault(require("fs"));
class Base642F {
    encode(f, ft) {
        let fileStr = fs_1.default.readFileSync(f, 'utf-8');
        let hasilStr = exports.b64a.encode(fileStr);
        fs_1.default.writeFileSync(ft, hasilStr);
    }
    decode(f, ft) {
        let fileStr = fs_1.default.readFileSync(f, 'utf-8');
        let hasilStr = exports.b64a.decode(fileStr);
        fs_1.default.writeFileSync(ft, hasilStr);
    }
    compress() {
        //
    }
}
class Base642 {
    b64CharSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
    encode(str) {
        let groupStr = '';
        let dataAr = [];
        let groupAr = [];
        // console.log('parse: ' + str);
        for (let i = 0; i < str.length; i++) {
            let char = str.slice(i, i + 1);
            if (this.checkDiRange(char, groupStr) && groupStr.length <= 62) {
                groupStr += char;
            }
            else {
                groupAr.push(groupStr);
                groupStr = char;
            }
        }
        if (groupStr.length > 0) {
            groupAr.push(groupStr);
        }
        // console.log('group ar:');
        // console.log(groupAr);
        //group to data
        groupAr.forEach((item) => {
            let data = this.str2Data(item);
            dataAr.push(data);
        });
        //debug data
        // console.log('data:');
        // dataAr.forEach((data: IData) => {
        //     if (data.str00.length != data.str64.length) {
        //         throw new Error('');
        //     }
        //     console.log(data);
        // })
        //combine data
        let hasilAkhir = '';
        for (let i = 0; i < dataAr.length; i++) {
            let data = dataAr[i];
            hasilAkhir += this.data2B64(data);
        }
        // console.log('encode: ' + hasilAkhir);
        return hasilAkhir;
    }
    decode(str) {
        let hasil = '';
        let l;
        let min;
        let str64;
        let teksDecode;
        let char;
        // console.log('decode:');
        while (str.length > 0) {
            //get len
            char = str.slice(0, 1);
            l = this.b642Angka(char);
            str = str.slice(1);
            //get min
            char = str.slice(0, 2);
            min = this.b642Angka(char);
            str = str.slice(2);
            //teks
            str64 = str.slice(0, l);
            str = str.slice(l);
            //decode
            teksDecode = '';
            for (let i = 0; i < str64.length; i++) {
                let char64;
                let charStr;
                char64 = str64.charAt(i);
                charStr = this.b64Char2StrChar(char64, min);
                teksDecode += charStr;
            }
            //debug
            // let data: IData = {
            //     l: l,
            //     min: min,
            //     str64: str64,
            //     str00: teksDecode,
            //     str00L: teksDecode.length,
            //     str64L: str64.length
            // }
            // console.log(data);
            hasil += teksDecode;
        }
        return hasil;
    }
    compress(str64) {
        let bin = '';
        let binStr = '';
        let byteStr = '';
        // console.log('compress');
        //char to binary
        // console.log('to binary');
        for (let i = 0; i < str64.length; i++) {
            let charCode;
            charCode = this.b64CharSet.indexOf(str64.charAt(i));
            // console.log('char code: ' + charCode);
            bin = Number(charCode).toString(2);
            if (bin.length > 6) {
                throw Error('');
            }
            bin = '00000000' + bin;
            bin = bin.slice(bin.length - 6);
            // console.log('bin: ' + bin);
            binStr += bin;
            // console.log('bin str: ' + binStr);
        }
        //binary to byte
        // console.log('');
        // console.log('to byte');
        while (binStr.length > 0) {
            let char8;
            let charCode;
            char8 = binStr.slice(0, 8);
            char8 = (char8 + '0000000000').slice(0, 8);
            if (char8.length < 8) {
                throw Error('');
            }
            // console.log('char 8: ' + char8);
            charCode = parseInt(char8, 2);
            // console.log('char code: ' + charCode);
            byteStr += String.fromCharCode(charCode);
            // console.log('byteStr: ' + byteStr);
            binStr = binStr.slice(8);
        }
        // console.log('');
        return byteStr;
    }
    decompress(byteStr) {
        let binStr = '';
        let str64 = '';
        // console.log('decode:')
        //byte to binary
        for (let i = 0; i < byteStr.length; i++) {
            let char = byteStr.charAt(i);
            // console.log('char: ' + char);
            let charCode = char.charCodeAt(0);
            // console.log('char code: ' + charCode);
            let bin;
            bin = ('0000000' + Number(charCode).toString(2));
            bin = bin.slice(bin.length - 8);
            // console.log('bin ' + bin);
            binStr += bin;
            // console.log('bin str: ' + binStr);
        }
        // console.log('bin str: ' + binStr);
        //to char
        while (binStr.length > 0) {
            let char6;
            char6 = binStr.slice(0, 6);
            binStr = binStr.slice(6);
            if (char6.length == 6) {
                let idx = parseInt(char6, 2);
                if (idx < 0 || (idx >= 64)) {
                    throw Error('');
                }
                str64 += this.b64CharSet.slice(idx, idx + 1);
            }
            else {
            }
        }
        return str64;
    }
    data2B64(data) {
        let hasil;
        hasil = this.b64CharSet.slice(data.l, data.l + 1) + this.angka2b64(data.min) + data.str64;
        return hasil;
    }
    getMin(str) {
        let min = 99999;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < min) {
                min = code;
            }
        }
        return min;
    }
    str2Data(str) {
        let hasil;
        let min = 9999;
        // console.log('str to data: ' + str);
        min = this.getMin(str);
        hasil = {
            l: str.length,
            min: min,
            str00: str,
            str64: '',
            charMin: String.fromCharCode(min),
            str00L: str.length,
            str64L: 0
        };
        hasil.str64 = this.str2b64(hasil.str00, hasil.min);
        return hasil;
    }
    checkDiRange(char, str) {
        let str2 = str + char;
        let kodeMin = this.getMin(str2);
        for (let i = 0; i < str2.length; i++) {
            let kodeChar = str2.charCodeAt(i);
            let gap = Math.abs(kodeChar - kodeMin);
            if (gap >= 63) {
                return false;
            }
        }
        return true;
    }
    angka2b64(n) {
        let hasil = '';
        let kali = 0;
        let sisa = 0;
        kali = Math.floor(n / 64);
        sisa = n % 64;
        hasil = this.b64CharSet.slice(sisa, sisa + 1);
        hasil = this.b64CharSet.slice(kali, kali + 1) + hasil;
        return hasil;
    }
    b642Angka(str) {
        if (str.length == 1) {
            return this.b64CharSet.indexOf(str.charAt(0));
        }
        else {
            let kali = this.b64CharSet.indexOf(str.charAt(0)) * 64;
            kali += this.b64CharSet.indexOf(str.charAt(1));
            return kali;
        }
    }
    str2b64(str, min) {
        let hasil = '';
        for (let i = 0; i < str.length; i++) {
            let char = str.charAt(i);
            let code = char.charCodeAt(0);
            let char64;
            let codeOffset;
            codeOffset = code - min;
            char64 = this.b64CharSet.slice(codeOffset, codeOffset + 1);
            if (char64 == '') {
                console.log('char: ' + char);
                console.log('code: ' + code);
                console.log('min ' + min);
                throw Error('');
            }
            hasil += char64;
        }
        if (hasil.length != str.length) {
            throw Error('');
        }
        return hasil;
    }
    b64Char2StrChar(b64Char, offset) {
        let code64;
        code64 = this.b64CharSet.indexOf(b64Char);
        if (code64 < 0) {
            throw Error('');
        }
        if (code64 >= 64) {
            throw Error('');
        }
        code64 += offset;
        return String.fromCharCode(code64);
    }
}
exports.b64af = new Base642F();
exports.b64a = new Base642();
