class Util {
    static async load(f: File): Promise<string> {
        f;
        return '';
    }

    static checkDiRange(char: string, str: string): boolean {
        let kode: number = char.charCodeAt(0);

        for (let i: number = 0; i < str.length; i++) {
            if (Math.abs(str.charCodeAt(i) - kode) >= 64) {
                return false;
            }
        }

        return true;
    }

    static getMin(str: string): number {
        let min: number = 99999;

        for (let i: number = 0; i < str.length; i++) {
            let code: number = str.charCodeAt(i);

            if (code < min) {
                min = code;
            }
        }

        return min;
    }

    static str2Str64Metadata(hasil: string): string {
        let data: IData = Convert.str2Data(hasil);
        let strHasil: string = Convert.data2Str64Metadata(data);

        // console.log(data);
        // console.log(strHasil);

        return strHasil;
    }


    data2Str64Metadata(data: IData): string {
        let hasil: string;

        hasil = this.b64Char.slice(data.l, data.l + 1) + this.angka2b64(data.min) + data.str;

        return hasil;
    }



}

class Convert {
    private static readonly b64Char: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    static str2b64(str: string, min: number): string {
        let hasil: string = '';

        for (let i: number = 0; i < str.length; i++) {
            let char: string = str.charAt(i);
            let code: number = char.charCodeAt(0);

            code = code - min;
            hasil += this.b64Char.slice(code, code + 1);
        }

        return hasil;
    }

    static str2Data(str: string): IData {
        let hasil: IData;
        let min: number = 9999;

        min = Util.getMin(str)

        hasil = {
            l: str.length,
            min: min,
            str: str,
            charMin: String.fromCharCode(min)
        }

        hasil.str = this.str2b64(hasil.str, hasil.min);

        return hasil;
    }

}

class Base642 {
    private readonly b64Char: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';


    decode(str: string): string {
        let hasil: string = '';
        let l: number;
        let ls: string;
        let min: number;
        let teks: string;
        let teks2: string;

        //get l
        ls = str.slice(0, 1);
        l = this.b642Angka(ls);
        str = str.slice(1);

        //get min
        min = this.b642Angka(str.slice(0, 2));
        str = str.slice(2);
        teks = str.slice(0, l);
        str = str.slice(l);

        //decode
        teks2 = '';
        for (let i: number = 0; i < teks.length; i++) {
            let char: string = teks.charAt(i);
            let code: number = char.charCodeAt(i);

            code += min;
            teks2 += String.fromCharCode(code);
        }

        hasil += teks2;



        return hasil;
    }

    encode(str: string): string {
        let hasil: string = '';
        let hasil64: string = '';

        console.log('parse: ' + str);

        for (let i: number = 0; i < str.length; i++) {
            let char: string = str.slice(i, i + 1);
            if (Util.checkDiRange(char, hasil) && hasil.length < 63) {
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



    angka2b64(n: number): string {
        let hasil: string = '';
        let kali: number = 0;
        let sisa: number = 0;

        kali = Math.floor(n / 64);
        sisa = n % 64;

        hasil = this.b64Char.slice(sisa, sisa + 1);
        hasil = this.b64Char.slice(kali, kali + 1) + hasil;

        return hasil;
    }

    b642Angka(str: string): number {
        if (str.length == 1) {
            return this.b64Char.indexOf(str.charAt(0));
        }
        else {
            let kali: number = this.b64Char.indexOf(str.charAt(0)) * 64;
            kali += this.b64Char.indexOf(str.charAt(1));
            return kali;
        }
    }

    private str2b64(str: string, min: number): string {
        let hasil: string = '';

        for (let i: number = 0; i < str.length; i++) {
            let char: string = str.charAt(i);
            let code: number = char.charCodeAt(0);

            code = code - min;
            hasil += this.b64Char.slice(code, code + 1);
        }

        return hasil;
    }





}

let b2: Base642 = new Base642();
b2.encode('ABCDEFGHIJKLMNOPQRSTUVWXYZ@?><;:=abcdefghijklmnopqrstuvwxyz1234567890');
