class Parser {
    readonly kata: string[] = [];
    readonly kataCadangan: string[] = [];
    private dataStr: string = '';

    pecah(str: string): void {
        console.group('pecah');
        let ctr: number = 0;
        this.dataStr = str;

        while (this.dataStr.length > 0) {
            let char: string = this.dataStr.charAt(0);

            //string
            if (char == '\"') {
                let str2: string = this.ambilString(this.dataStr);
                this.kata.push(str2);
                this.dataStr = this.dataStr.slice(str2.length);
            }

            //string '
            else if (this.ambilStringQuoteSatu()) {

            }

            //angka => minus titik
            else if (this.ambilReg(/^[+-]*[0-9]*\.*[0-9]+/)) {

            }

            //angka minus
            //angka minus titik
            //angka .

            //angka
            else if (this.checkAngka(char)) {
                let str2: string = this.ambilAngka(this.dataStr);
                this.kata.push(str2);
                this.dataStr = this.dataStr.slice(str2.length);
            }

            //cadangan
            else if (this.ambilCadangan()) {

            }

            //kata include kata.dot
            else if (this.checkHuruf(char)) {
                let str2: string = this.ambilHuruf(this.dataStr);
                this.kata.push(str2);
                this.dataStr = this.dataStr.slice(str2.length);
            }

            else {
                //validate
                if (this.checkSimbol(char)) {
                    this.kata.push(char);
                }
                this.dataStr = this.dataStr.slice(1);
            }

            ctr++;
            if (ctr > 100) {
                console.log('break');
                console.log('data str: ' + this.dataStr);
                break;
            }

        }

        console.groupEnd();
    }

    private ambilReg(reg: RegExp): boolean {
        let hsl: RegExpMatchArray = (this.dataStr.match(reg));

        if (hsl && hsl.length > 0) {
            console.log('ambil reg; ' + hsl[0]);
            console.log('data str: ' + this.dataStr);
            this.kata.push(hsl[0]);
            this.dataStr = this.dataStr.slice(hsl[0].length);
            console.log('data str: ' + this.dataStr);
            return true;
        }

        return false;
    }


    private ambilStringQuoteSatu(): boolean {
        return this.ambilReg(/^'[a-zA-Z_][\.a-zA-Z0-9_$%#@]*'/);
    }

    private ambilCadangan(): boolean {

        for (let i: number = 0; i < this.kataCadangan.length; i++) {

            let item: string = this.kataCadangan[i].toLowerCase();
            let str: string = this.dataStr.slice(0, item.length)

            if (item == str) {
                this.kata.push(item);
                this.dataStr = this.dataStr.slice(item.length);
                console.log(item + ' / ' + str + ' /oke ' + this.dataStr);
                return true;
            }
            else {
                // console.log(item + ' / ' + str);
            }

        }

        return false;
    }

    private checkSimbol(char: string): boolean {
        if (char == ' ') return false;
        if (char == '\t') return false;
        if (char == '\r') return false;
        if (char == '\n') return false;

        return true;
    }

    private checkHuruf(char: string): boolean {
        if (char >= "A" && char <= "Z") return true;
        if (char >= "a" && char <= "z") return true;
        return false;
    }

    private checkAngka(char: string): boolean {
        let hasil: boolean;

        hasil = char >= "0" && char <= "9";

        return hasil;
    }

    //ambil angka dengan data dimulai dari angka
    private ambilAngka(str: string): string {
        let hasil: string = '';
        let angkaReg: RegExp = /^[0-9]*\.?[0-9]+/;
        let hsl: RegExpMatchArray = (str.match(angkaReg));

        if (hsl) {
            hasil = hsl + '';
        }
        else {
            console.log('data: ' + str.slice(0, 100));
            throw Error('angka tidak cocok');
        }

        return hasil;
    }

    //ambil angka dengan data dimulai dari titik

    //ambil kata include kata.dot
    private ambilHuruf(str: string) {
        let hasil: string = '';
        let hurufReg: RegExp = /^[a-zA-Z_][\.a-zA-Z0-9_$%#@]*/;
        let hsl: RegExpMatchArray = (str.match(hurufReg));

        if (hsl) {
            hasil = hsl + '';
        }
        else {
            console.log('data: ' + str.slice(0, 100));
            throw Error('huruf tidak cocok');
        }

        return hasil;
    }

    //ambil simbol

    private ambilString(str: string): string {
        let hasil: string;

        let idx: number = str.indexOf('"', 1);
        if (idx > 0) {
            hasil = str.slice(0, idx + 1);
        }
        else {
            throw Error('string unterminated');
        }

        return hasil;
    }
}