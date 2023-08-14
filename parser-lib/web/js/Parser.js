var ha;
(function (ha) {
    var parse;
    (function (parse) {
        class Leksikal {
            kataCadangan = [];
            binopOpr = [];
            async pecah(str) {
                console.group('pecah');
                ha.parse.Kons.dataStr = str;
                while (parse.Kons.dataStr.length > 0) {
                    let char = parse.Kons.dataStr.charAt(0);
                    //string ""
                    if (char == '\"') {
                        let str2 = this.ambilString(parse.Kons.dataStr);
                        // Kons.kata.push(str2);
                        parse.token.push({
                            nama: parse.Kons.TEKS,
                            nilai: [str2],
                            token: []
                        });
                        parse.Kons.dataStr = parse.Kons.dataStr.slice(str2.length);
                    }
                    //string '
                    else if (this.ambilStringQuoteSatu()) {
                    }
                    //komentar
                    else if (this.ambilKomentar()) {
                    }
                    //komentar segaris
                    else if (this.ambilReg(/^\/\/.*/, '')) {
                    }
                    //angka => minus titik minus-titik
                    else if (this.ambilReg(/^[0-9]*\.*[0-9]+/, parse.Kons.ANGKA)) {
                    }
                    else if (this.ambilCadangan(this.binopOpr, parse.Kons.OPR)) {
                    }
                    else if (this.ambilCadangan(this.kataCadangan, parse.Kons.KATA_CADANGAN)) {
                    }
                    //kata include kata.dot
                    else if (this.checkHuruf(char)) {
                        let str2 = this.ambilHuruf(parse.Kons.dataStr);
                        parse.token.push({
                            nama: parse.Kons.KATA,
                            nilai: [str2],
                            token: []
                        });
                        parse.Kons.dataStr = parse.Kons.dataStr.slice(str2.length);
                    }
                    //simbol
                    else if (this.checkSimbol(char)) {
                        parse.token.push({
                            nama: char,
                            nilai: [char],
                            token: []
                        });
                        parse.Kons.dataStr = parse.Kons.dataStr.slice(1);
                    }
                    //ignore
                    else if (!this.checkSimbol(char)) {
                        parse.Kons.dataStr = parse.Kons.dataStr.slice(1);
                    }
                    else {
                        console.log(ha.parse.renderToken(parse.token));
                        console.log(parse.Kons.dataStr);
                        throw Error('');
                    }
                }
                console.groupEnd();
            }
            ambilKomentar() {
                if (parse.Kons.dataStr.slice(0, 2) != '/*')
                    return false;
                let idx;
                idx = parse.Kons.dataStr.indexOf('*/', 2);
                if (idx < 0)
                    return false;
                console.log('komentar: ' + parse.Kons.dataStr.slice(0, idx + 2));
                parse.Kons.dataStr = parse.Kons.dataStr.slice(idx + 2);
                console.log(parse.Kons.dataStr);
                return true;
            }
            ambilReg(reg, namaToken = '') {
                let hsl = (parse.Kons.dataStr.match(reg));
                if (hsl && hsl.length > 0) {
                    parse.Kons.dataStr = parse.Kons.dataStr.slice(hsl[0].length);
                    if (namaToken != '') {
                        parse.token.push({
                            nama: namaToken,
                            nilai: [hsl[0]],
                            token: []
                        });
                    }
                    return true;
                }
                return false;
            }
            ambilStringQuoteSatu() {
                return this.ambilReg(/^'[a-zA-Z_][\.a-zA-Z0-9_$%#@]*'/, parse.Kons.TEKS);
            }
            ambilCadangan(dataCadangan, namaToken) {
                for (let i = 0; i < dataCadangan.length; i++) {
                    let item = dataCadangan[i].toLowerCase();
                    let str = parse.Kons.dataStr.slice(0, item.length).toLowerCase();
                    if (item == str) {
                        let tokenBaru = {
                            nama: namaToken,
                            nilai: [item],
                            token: []
                        };
                        if (namaToken == parse.Kons.KATA_CADANGAN) {
                            tokenBaru.nama = item;
                        }
                        parse.token.push(tokenBaru);
                        parse.Kons.dataStr = parse.Kons.dataStr.slice(item.length);
                        return true;
                    }
                    else {
                        // console.log(item + ' / ' + str);
                    }
                }
                return false;
            }
            checkSimbol(char) {
                if (char == ' ')
                    return false;
                if (char == '\t')
                    return false;
                if (char == '\r')
                    return false;
                if (char == '\n')
                    return false;
                return true;
            }
            checkHuruf(char) {
                if (char >= "A" && char <= "Z")
                    return true;
                if (char >= "a" && char <= "z")
                    return true;
                return false;
            }
            //ambil kata include kata.dot
            ambilHuruf(str) {
                let hasil = '';
                let hurufReg = /^[a-zA-Z_][\.a-zA-Z0-9_$%#@]*/;
                let hsl = (str.match(hurufReg));
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
            ambilString(str) {
                let hasil;
                let idx = str.indexOf('"', 1);
                if (idx > 0) {
                    hasil = str.slice(0, idx + 1);
                }
                else {
                    throw Error('string unterminated');
                }
                return hasil;
            }
        }
        parse.Leksikal = Leksikal;
        class Grammar {
            static async check() {
                let batas = 0;
                while (true) {
                    console.groupCollapsed('check grammar, ctr: ' + parse.tokenDataCtr);
                    let hasil = await this.check_grammar();
                    console.groupEnd();
                    if (hasil) {
                        parse.tokenDataCtr = 0;
                        if (parse.token.length == 1) {
                            break;
                        }
                    }
                    else {
                        // console.log('check grammar gak ada hasil')
                        parse.tokenDataCtr++;
                        if (parse.tokenDataCtr >= parse.token.length) {
                            ha.parse.debugOn();
                            console.log('HABIS');
                            break;
                        }
                    }
                    batas++;
                    if (batas > 5000)
                        break;
                }
                ha.parse.debugOn();
                console.log('selesai:');
                console.log(this.renderToken(parse.token));
            }
            // private static renderRumus(rumus: string[][]): void {
            // 	rumus;
            // }
            static async check_grammar() {
                let adaTokenBaru = false;
                // console.group('check token dengan rumus yang ada, ctr: ' + tokenCtr);
                for (let i = 0; i < parse.grammarAr.length; i++) {
                    console.groupCollapsed('check rumus, idx ' + i + '/rumus ' + parse.grammarAr[i].rumus);
                    let hasil = await this.check_rumus(parse.grammarAr[i].rumus);
                    console.groupEnd();
                    if (hasil) {
                        this.tokenBaru(i);
                        adaTokenBaru = true;
                        return true;
                    }
                }
                // debugGroup();
                return adaTokenBaru;
            }
            static tokenBaru(i) {
                // console.log('token: ' + grammarAr[i].nama + '/index rumus: ' + i, true);
                console.log('[0]: ' + this.renderToken(parse.token.slice(Math.max(parse.tokenDataCtr - 1, 0), parse.tokenDataCtr + 5)), true);
                //lolos
                //packaging
                // debugOff();
                // debugGroup('token baru');
                // console.log('check token pada ctr ' + tokenCtr + ' cocok dengan rumus: ' + grammarAr[i].nama);
                // buat token
                let tokenBaru = {
                    nama: parse.grammarAr[i].nama,
                    nilai: [],
                    token: []
                };
                let rl = parse.grammarAr[i].rumus[1].length;
                for (let j = 0; j < rl; j++) {
                    tokenBaru.token.push(parse.token[parse.tokenDataCtr + j]);
                }
                // debugger;
                let kiri = parse.token.slice(0, parse.tokenDataCtr);
                let kanan = parse.token.slice(parse.tokenDataCtr + parse.grammarAr[i].rumus[1].length);
                // debugOn();
                // debugGroupCollapsed('')
                // console.log('token:');
                // console.log(this.renderToken(token));
                // console.log('kiri:');
                // console.log(this.renderToken(kiri));
                // console.log('kanan:');
                // console.log(this.renderToken(kanan));
                // console.log('token baru:');
                // console.log(this.renderToken([tokenBaru]));
                // console.log(tokenBaru);
                // debugGroupEnd();
                // debugOff();
                while (parse.token.length > 0) {
                    parse.token.pop();
                }
                this.tambah(parse.token, kiri);
                this.tambah(parse.token, [tokenBaru]);
                this.tambah(parse.token, kanan);
                // console.log('token: ' + this.renderToken(token));
                // debugGroupEnd();
                // tokenCtr = 0;
                // debugGroup();
                console.log('[1]: ' + this.renderToken(parse.token.slice(Math.max(parse.tokenDataCtr - 1, 0), parse.tokenDataCtr + 5)), true);
                console.log('', true);
            }
            static renderToken(token) {
                let hasil = '';
                token.forEach((item) => {
                    hasil += item.nama;
                    hasil += ' ';
                });
                return hasil;
            }
            static tambah(sumber, tambahan) {
                tambahan.forEach((item) => {
                    sumber.push(item);
                });
            }
            static async check_rumus(rumus, caseSensitif = true) {
                let rumusAwal = rumus[0];
                let inti = rumus[1];
                let akhir = rumus[2];
                // debugOff();
                // debugGroupCollapsed('check token = rumus');
                // console.log('rumus:');
                // console.log(rumus);
                // console.log('awal ');
                // console.log(rumusAwal);
                // console.log('inti:');
                // console.log(inti);
                // console.log('akhir:');
                // console.log(akhir);
                // console.log('mulai: ' + tokenCtr);
                // debugGroupEnd();
                //check awal
                console.log('check awal');
                for (let i = 0; i < rumusAwal.length; i++) {
                    if (parse.tokenDataCtr > 0) {
                        let namaToken = parse.token[parse.tokenDataCtr - 1].nama;
                        let rumusAwalTeks = rumusAwal[i];
                        if (!caseSensitif) {
                            namaToken = namaToken.toLowerCase();
                            rumusAwalTeks = rumusAwalTeks.toLowerCase();
                        }
                        if (namaToken == rumusAwalTeks) {
                            console.log('awal salah, token: ' + namaToken + '/rumus token: ' + rumusAwalTeks);
                            return false;
                        }
                        else {
                            console.log('awal gak di check');
                        }
                    }
                }
                //check inti
                console.log('check inti');
                for (let i = 0; i < inti.length; i++) {
                    if (parse.tokenDataCtr + i >= parse.token.length) {
                        console.log('token index lebih, tokenCtr: ' + parse.tokenDataCtr + '/i: ' + i + '/token.length: ' + parse.token.length);
                        return false;
                    }
                    let namaToken = parse.token[parse.tokenDataCtr + i].nama;
                    let namaInti = inti[i];
                    if (!caseSensitif) {
                        namaToken = namaToken.toLowerCase();
                        namaInti = namaInti.toLowerCase();
                    }
                    console.log('nama token ' + namaToken);
                    console.log('namaInti ' + namaInti);
                    console.log('tokenCtr ' + parse.tokenDataCtr);
                    console.log('i: ' + i);
                    if (namaToken != namaInti) {
                        console.log('token tidak sama, token: ' + namaToken + '/rumus: ' + namaInti + '/i: ' + i);
                        return false;
                    }
                }
                //check akhir
                console.log('check akhir');
                if (parse.tokenDataCtr + inti.length < parse.token.length) {
                    let idx = parse.tokenDataCtr + inti.length;
                    for (let i = 0; i < akhir.length; i++) {
                        let namaToken = parse.token[idx].nama;
                        let namaAkhir = akhir[i];
                        if (!caseSensitif) {
                            namaAkhir = namaAkhir.toLowerCase();
                            namaToken = namaToken.toLowerCase();
                        }
                        if (namaToken == namaAkhir) {
                            console.log('akhir cocok return false');
                            return false;
                        }
                    }
                }
                else {
                    console.log('check akhir gak di check: tokenCtr ' + parse.tokenDataCtr + '/dataStr pjg: ' + parse.token.length);
                }
                // debugGroup();
                return true;
            }
        }
        parse.Grammar = Grammar;
        parse.tokenDataCtr = 0;
        parse.parser = new Leksikal();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
