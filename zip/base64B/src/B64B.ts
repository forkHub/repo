import fs from 'fs';

class Base642F {
    encode(f: string, ft: string): void {
        let fileStr: string = fs.readFileSync(f, 'ascii');
        console.log('file len: ' + fileStr.length);
        let hasilStr: string = b64b.encode(fileStr);
        fs.writeFileSync(ft, hasilStr);
    }

    decode(f: string, ft: string): void {
        let fileStr: string = fs.readFileSync(f, 'ascii');
        let hasilStr: string = b64b.decode(fileStr);
        fs.writeFileSync(ft, hasilStr);
    }

    compress(): void {
        //
    }
}

class Base64B {
    private readonly b64CharSet: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';

    toHeader(n: number): number {
        let nAnd: number = 0;
        let nShift: number = 0;

        nAnd = n & 192;
        nShift = nAnd >> 6;

        if (nShift > 3) {

            console.log(n);
            console.log(nAnd);
            console.log(nShift);

            throw Error();
        }

        return n;
    }

    toContent(n: number): number {
        n = n & 63;

        if (n > 63) {
            throw Error('');
        }

        return n;
    }

    encode(str: string): string {
        let groupHeader: number[] = [];
        let groupB64: number[] = [];
        let hasil: string = '';

        for (let i: number = 0; i < str.length; i++) {
            let char: string = str.slice(i, i + 1);

            groupHeader.push(this.toHeader(char.charCodeAt(0)));
            groupB64.push(this.toContent(char.charCodeAt(0)));
        }

        // console.log('b64 len ' + groupB64.length);

        hasil = '';

        //header to bin
        let headerBin: string = '';
        groupHeader.forEach((item: number) => {
            let bin: string;
            bin = item.toString(2);
            headerBin += bin;
        });

        //bin to char64
        let pad: number = 0;
        while (headerBin.length > 0) {
            let char: string;

            char = headerBin.slice(0, 6);
            headerBin = headerBin.slice(6);

            if (char.length < 6) {
                pad = 6 - char.length;
                char = '00000000' + char;
                char = char.slice(char.length - 6);
            }
        }



        //content to b64 string
        groupB64.forEach((item: number) => {
            let str: string;
            str = this.b64CharSet.slice(item, item + 1);

            if (str == '') {
                throw new Error('');
            }

            hasil += str;
        });

        return hasil;
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
export var b64b: Base64B = new Base64B();
