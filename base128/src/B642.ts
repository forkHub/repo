import fs from 'fs';

interface IData {
    str64: string,
    str00: string,
    min: number,
    l: number,
    charMin?: string,
    str64L: number,
    str00L: number
}

class Base642F {
    encode(f: string, ft: string): void {
        let fileStr: string = fs.readFileSync(f, 'utf-8');
        let hasilStr: string = b64a.encode(fileStr);
        fs.writeFileSync(ft, hasilStr);
    }

    decode(f: string, ft: string): void {
        let fileStr: string = fs.readFileSync(f, 'utf-8');
        let hasilStr: string = b64a.decode(fileStr);
        fs.writeFileSync(ft, hasilStr);
    }

    compress(): void {
        //
    }
}

class Base128 {

    private readonly b64CharSet: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';

    encode(str: string): string {
        let groupStr: string = '';
        // let dataAr: IData[] = [];
        let groupAr: string[] = [];

        // console.log('parse: ' + str);

        for (let i: number = 0; i < str.length; i++) {
            let char: string = str.slice(i, i + 1);

            if (this.checkDiRange(char, groupStr) && groupStr.length <= 127) {
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

        //statistik
        let sukses: number = 0;
        let gagal: number = 0;
        for (let i: number = 0; i < groupAr.length; i++) {
            let str: string = groupAr[i] as string;
            if (str.length >= 24) {
                sukses++;
            }
            else {
                gagal++;
            }
        }
        console.log('sukses: ' + sukses + '/gagal: ' + gagal);

        // //group to data
        // groupAr.forEach((item: string) => {
        //     let data: IData = this.str2Data(item);
        //     dataAr.push(data);
        // })

        //debug data
        // console.log('data:');
        // dataAr.forEach((data: IData) => {
        //     if (data.str00.length != data.str64.length) {
        //         throw new Error('');
        //     }
        //     console.log(data);
        // })

        //combine data
        // let hasilAkhir: string = '';
        // for (let i: number = 0; i < dataAr.length; i++) {
        //     let data: IData = dataAr[i] as IData;
        //     hasilAkhir += this.data2B64(data);
        // }

        // console.log('encode: ' + hasilAkhir);

        // return hasilAkhir;
        return '';
    }

    decode(str: string): string {
        let hasil: string = '';
        let l: number;
        let min: number;
        let str64: string;
        let teksDecode: string;
        let char: string;

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
            for (let i: number = 0; i < str64.length; i++) {
                let char64: string;
                let charStr: string;

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

    compress(str64: string): string {
        let bin: string = '';
        let binStr: string = '';
        let byteStr: string = '';

        // console.log('compress');

        //char to binary
        // console.log('to binary');
        for (let i: number = 0; i < str64.length; i++) {
            let charCode: number;

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
            let char8: string;
            let charCode: number

            char8 = binStr.slice(0, 8);
            char8 = (char8 + '0000000000').slice(0, 8);

            if (char8.length < 8) {
                throw Error('')
            }

            // console.log('char 8: ' + char8);

            charCode = parseInt(char8, 2)
            // console.log('char code: ' + charCode);

            byteStr += String.fromCharCode(charCode);
            // console.log('byteStr: ' + byteStr);

            binStr = binStr.slice(8);
        }

        // console.log('');

        return byteStr;
    }

    decompress(byteStr: string): string {
        let binStr: string = ''
        let str64: string = '';

        // console.log('decode:')

        //byte to binary
        for (let i: number = 0; i < byteStr.length; i++) {

            let char: string = byteStr.charAt(i);
            // console.log('char: ' + char);

            let charCode: number = char.charCodeAt(0);
            // console.log('char code: ' + charCode);

            let bin: string;
            bin = ('0000000' + Number(charCode).toString(2));
            bin = bin.slice(bin.length - 8);

            // console.log('bin ' + bin);

            binStr += bin;
            // console.log('bin str: ' + binStr);
        }
        // console.log('bin str: ' + binStr);

        //to char
        while (binStr.length > 0) {
            let char6: string;
            char6 = binStr.slice(0, 6);
            binStr = binStr.slice(6);

            if (char6.length == 6) {
                let idx: number = parseInt(char6, 2);

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

    data2B64(data: IData): string {
        let hasil: string;

        hasil = this.b64CharSet.slice(data.l, data.l + 1) + this.angka2b64(data.min) + data.str64;

        return hasil;
    }

    private getMin(str: string): number {
        let min: number = 99999;

        for (let i: number = 0; i < str.length; i++) {
            let code: number = str.charCodeAt(i);

            if (code < min) {
                min = code;
            }
        }

        return min;
    }

    str2Data(str: string): IData {
        let hasil: IData;
        let min: number = 9999;

        // console.log('str to data: ' + str);

        min = this.getMin(str)

        hasil = {
            l: str.length,
            min: min,
            str00: str,
            str64: '',
            charMin: String.fromCharCode(min),
            str00L: str.length,
            str64L: 0
        }

        hasil.str64 = this.str2b64(hasil.str00, hasil.min);

        return hasil;
    }

    private checkDiRange(char: string, str: string): boolean {
        let str2: string = str + char;
        let kodeMin: number = this.getMin(str2);

        for (let i: number = 0; i < str2.length; i++) {
            let kodeChar: number = str2.charCodeAt(i);
            let gap: number = Math.abs(kodeChar - kodeMin);

            if (gap >= 127) {
                return false;
            }
        }

        return true;
    }

    private angka2b64(n: number): string {
        let hasil: string = '';
        let kali: number = 0;
        let sisa: number = 0;

        kali = Math.floor(n / 64);
        sisa = n % 64;

        hasil = this.b64CharSet.slice(sisa, sisa + 1);
        hasil = this.b64CharSet.slice(kali, kali + 1) + hasil;

        return hasil;
    }

    private b642Angka(str: string): number {
        if (str.length == 1) {
            return this.b64CharSet.indexOf(str.charAt(0));
        }
        else {
            let kali: number = this.b64CharSet.indexOf(str.charAt(0)) * 64;
            kali += this.b64CharSet.indexOf(str.charAt(1));
            return kali;
        }
    }

    private str2b64(str: string, min: number): string {
        let hasil: string = '';

        for (let i: number = 0; i < str.length; i++) {
            let char: string = str.charAt(i);
            let code: number = char.charCodeAt(0);
            let char64: string;
            let codeOffset: number;

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

    private b64Char2StrChar(b64Char: string, offset: number): string {
        let code64: number;

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

export var b64af: Base642F = new Base642F();
export var b64a: Base128 = new Base128();
