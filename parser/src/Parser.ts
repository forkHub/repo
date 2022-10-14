let tokenCtr: number = 0;

class Parser {
    readonly kataCadangan: string[] = [];

    pecah(str: string): void {

        console.group('pecah');
        let ctr: number = 0;
        Kons.dataStr = str;

        while (Kons.dataStr.length > 0) {
            let char: string = Kons.dataStr.charAt(0);

            //string ""
            if (char == '\"') {
                let str2: string = this.ambilString(Kons.dataStr);
                // Kons.kata.push(str2);
                token.push({
                    nama: Kons.TEKS,
                    nilai: [str2],
                    token: []
                });
                Kons.dataStr = Kons.dataStr.slice(str2.length);
            }

            //string '
            else if (this.ambilStringQuoteSatu()) {

            }

            //komentar
            else if (this.ambilReg(/^\/\*.*/, Kons.KOM_AWAL)) {

            }

            //komentar tutup
            else if (this.ambilReg(/^\*\//, Kons.KOM_AKHIR)) {

            }

            //komentar segaris
            else if (this.ambilReg(/^\/\/.*/, Kons.KOMENTAR)) {

            }


            //angka => minus titik minus-titik
            else if (this.ambilReg(/^[+-]*[0-9]*\.*[0-9]+/, Kons.ANGKA)) {

            }

            //cadangan
            else if (this.ambilCadangan()) {

            }

            //kata include kata.dot
            else if (this.checkHuruf(char)) {
                let str2: string = this.ambilHuruf(Kons.dataStr);
                // Kons.kata.push(str2);
                Kons.dataStr = Kons.dataStr.slice(str2.length);
            }

            else {
                //validate
                if (this.checkSimbol(char)) {
                    // Kons.kata.push(char);
                    token.push({
                        nama: Kons.SIMBOL,
                        nilai: [char],
                        token: []
                    })
                }
                Kons.dataStr = Kons.dataStr.slice(1);
            }

            ctr++;
            if (ctr > 1000) {
                console.log('break');
                // console.log('data str: ' + Kons.dataStr);
                break;
            }

        }

        console.groupEnd();
    }

    private ambilReg(reg: RegExp, namaToken: string): boolean {
        let hsl: RegExpMatchArray = (Kons.dataStr.match(reg));

        if (hsl && hsl.length > 0) {
            // Kons.kata.push(hsl[0]);
            Kons.dataStr = Kons.dataStr.slice(hsl[0].length);
            token.push({
                nama: namaToken,
                nilai: [hsl[0]],
                token: []
            })
            return true;
        }

        return false;
    }

    private ambilStringQuoteSatu(): boolean {
        return this.ambilReg(/^'[a-zA-Z_][\.a-zA-Z0-9_$%#@]*'/, Kons.TEKS);
    }

    private ambilCadangan(): boolean {

        for (let i: number = 0; i < parser.kataCadangan.length; i++) {

            let item: string = parser.kataCadangan[i].toLowerCase();
            let str: string = Kons.dataStr.slice(0, item.length)

            if (item == str) {
                // Kons.kata.push(item);
                Kons.dataStr = Kons.dataStr.slice(item.length);
                // console.log(item + ' / ' + str + ' /oke ' + Kons.dataStr);
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

class Grammar {
    static check(): void {
        let batas: number = 0;

        while (true) {
            this.check_grammar();
            // break;

            batas++;
            if (batas > 30) break;
        }
    }

    private static check_grammar(): boolean {

        console.group('check token dengan rumus yang ada, ctr: ' + tokenCtr);
        for (let i: number = 0; i < grammar.length; i++) {

            if (this.check_rumus(tokenCtr, grammar[i].rumus)) {

                //lolos
                //packaging
                console.log('check token pada ctr ' + tokenCtr + ' cocok dengan rumus: ' + grammar[i].nama);

                // buat token
                let tokenBaru: IToken = {
                    nama: grammar[i].nama,
                    nilai: [],
                    token: []
                }

                let rl: number = grammar[i].rumus.length;
                for (let i: number = 0; i < rl - 2; i++) {
                    tokenBaru.token.push(token[tokenCtr + i]);
                }

                let kiri: IToken[] = token.slice(0, i);
                let kanan: IToken[] = token.slice(i + grammar[i].rumus.length - 2);

                console.groupCollapsed()
                console.log('token:');
                console.log(this.renderToken(token));
                console.log('kiri:');
                console.log(this.renderToken(kiri));
                console.log('kanan:');
                console.log(this.renderToken(kanan));
                console.log('token baru:');
                console.log(this.renderToken([tokenBaru]));
                console.groupEnd();

                while (token.length > 0) {
                    token.pop();
                }

                this.tambah(token, kiri);
                this.tambah(token, [tokenBaru]);
                this.tambah(token, kanan);

                console.log('token: ' + this.renderToken(token));

                tokenCtr = 0;
                console.groupEnd();
                return true;
            }
        }

        console.log('gak ada yang cocok');
        console.groupEnd();

        tokenCtr++;
        if (tokenCtr >= token.length) {
            console.log('HABIS');
            return false;
        }

        console.groupEnd();
        return true;
    }

    private static renderToken(token: IToken[]): string {
        let hasil: string = '';

        token.forEach((item: IToken) => {
            hasil += item.nama;
            hasil += ' ';
        })

        return hasil;
    }

    private static tambah(sumber: IToken[], tambahan: IToken[]) {
        tambahan.forEach((item: IToken) => {
            sumber.push(item);
        });
    }

    private static check_rumus(mulai: number, rumus: string[][]): boolean {
        let awal: string[] = rumus[0];
        let inti: string[][] = rumus.slice(1, rumus.length - 1);
        let akhir: string[] = rumus[rumus.length - 1]

        console.groupCollapsed('check token = rumus');
        console.log('rumus:');
        console.log(rumus);
        console.log('awal ');
        console.log(awal);
        console.log('inti:');
        console.log(inti);
        console.log('akhir:');
        console.log(akhir);
        console.log('mulai: ' + mulai);

        //check awal
        console.log('check awal');
        if (this.cocok(token[mulai].nama, awal)) {
            console.groupEnd();
            return false;
        }

        //check inti
        console.log('check inti');
        for (let i: number = 0; i < inti.length; i++) {
            if (!this.cocok(token[mulai + i].nama, inti[i])) {
                console.groupEnd();
                return false;
            }
        }

        //check akhir
        console.log('check akhir');
        if (mulai + rumus.length <= token.length - 1) {
            if (this.cocok(token[mulai + rumus.length].nama, akhir)) {
                console.groupEnd();
                return false;
            }
        }

        console.groupEnd();
        return true;
    }

    private static cocok(diCheck: string, check: string[]) {

        console.group('cocok:');
        console.log('check:');
        console.log(check);
        console.log('dicheck: ' + diCheck);

        for (let i: number = 0; i < check.length; i++) {

            console.log('check: idx ' + i + '/value: ' + check[i]);

            if (diCheck == check[i]) {

                console.log('hasil: true');
                console.groupEnd();
                return true;
            }
        }

        console.log('hasil: false');
        console.groupEnd();
        return false;
    }
}