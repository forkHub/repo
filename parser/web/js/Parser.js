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
                        // debugLog(item + ' / ' + str);
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
                    ha.parse.debugLog('data: ' + str.slice(0, 100));
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
                    parse.debugGroupCollapsed('check grammar, ctr: ' + parse.tokenCtr);
                    let hasil = await this.check_grammar();
                    ha.parse.debugGroupEnd();
                    if (hasil) {
                        parse.tokenCtr = 0;
                        if (parse.token.length == 1)
                            break;
                    }
                    else {
                        // debugLog('check grammar gak ada hasil')
                        parse.tokenCtr++;
                        if (parse.tokenCtr >= parse.token.length) {
                            ha.parse.debugOn();
                            ha.parse.debugLog('HABIS');
                            break;
                        }
                    }
                    batas++;
                    if (batas > 5000)
                        break;
                }
                ha.parse.debugOn();
                ha.parse.debugLog('selesai:');
                ha.parse.debugLog(this.renderToken(parse.token));
            }
            static async check_grammar() {
                let adaTokenBaru = false;
                parse.debugOff();
                // console.group('check token dengan rumus yang ada, ctr: ' + tokenCtr);
                for (let i = 0; i < parse.grammarAr.length; i++) {
                    parse.debugGroupCollapsed('check rumus, idx ' + i);
                    let hasil = await this.check_rumus(parse.grammarAr[i].rumus);
                    parse.debugGroupEnd();
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
                // debugLog('token: ' + grammarAr[i].nama + '/index rumus: ' + i, true);
                parse.debugLog('[0]: ' + this.renderToken(parse.token.slice(Math.max(parse.tokenCtr - 1, 0), parse.tokenCtr + 5)), true);
                //lolos
                //packaging
                // debugOff();
                // debugGroup('token baru');
                // debugLog('check token pada ctr ' + tokenCtr + ' cocok dengan rumus: ' + grammarAr[i].nama);
                // buat token
                let tokenBaru = {
                    nama: parse.grammarAr[i].nama,
                    nilai: [],
                    token: []
                };
                let rl = parse.grammarAr[i].rumus[1].length;
                for (let j = 0; j < rl; j++) {
                    tokenBaru.token.push(parse.token[parse.tokenCtr + j]);
                }
                // debugger;
                let kiri = parse.token.slice(0, parse.tokenCtr);
                let kanan = parse.token.slice(parse.tokenCtr + parse.grammarAr[i].rumus[1].length);
                // debugOn();
                // debugGroupCollapsed('')
                // debugLog('token:');
                // debugLog(this.renderToken(token));
                // debugLog('kiri:');
                // debugLog(this.renderToken(kiri));
                // debugLog('kanan:');
                // debugLog(this.renderToken(kanan));
                // debugLog('token baru:');
                // debugLog(this.renderToken([tokenBaru]));
                // debugLog(tokenBaru);
                // debugGroupEnd();
                // debugOff();
                while (parse.token.length > 0) {
                    parse.token.pop();
                }
                this.tambah(parse.token, kiri);
                this.tambah(parse.token, [tokenBaru]);
                this.tambah(parse.token, kanan);
                // debugLog('token: ' + this.renderToken(token));
                // debugGroupEnd();
                // tokenCtr = 0;
                // debugGroup();
                parse.debugLog('[1]: ' + this.renderToken(parse.token.slice(Math.max(parse.tokenCtr - 1, 0), parse.tokenCtr + 5)), true);
                parse.debugLog('', true);
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
                // debugLog('rumus:');
                // debugLog(rumus);
                // debugLog('awal ');
                // debugLog(rumusAwal);
                // debugLog('inti:');
                // debugLog(inti);
                // debugLog('akhir:');
                // debugLog(akhir);
                // debugLog('mulai: ' + tokenCtr);
                // debugGroupEnd();
                //check awal
                parse.debugLog('check awal');
                for (let i = 0; i < rumusAwal.length; i++) {
                    if (parse.tokenCtr > 0) {
                        let namaToken = parse.token[parse.tokenCtr - 1].nama;
                        let rumusAwalTeks = rumusAwal[i];
                        if (!caseSensitif) {
                            namaToken = namaToken.toLowerCase();
                            rumusAwalTeks = rumusAwalTeks.toLowerCase();
                        }
                        if (namaToken == rumusAwalTeks) {
                            parse.debugLog('awal salah, token: ' + parse.token[parse.tokenCtr - 1].nama);
                            return false;
                        }
                        else {
                            parse.debugLog('awal gak di check');
                        }
                    }
                }
                //check inti
                parse.debugLog('check inti');
                for (let i = 0; i < inti.length; i++) {
                    if (parse.tokenCtr + i >= parse.token.length) {
                        return false;
                    }
                    let namaToken = parse.token[parse.tokenCtr + i].nama;
                    let namaInti = inti[i];
                    if (!caseSensitif) {
                        namaToken = namaToken.toLowerCase();
                        namaInti = namaInti.toLowerCase();
                    }
                    if (namaToken != namaInti) {
                        parse.debugLog('token tidak sama, token: ' + parse.token[parse.tokenCtr + i].nama + '/rumus: ' + inti[i]);
                        return false;
                    }
                }
                //check akhir
                parse.debugLog('check akhir');
                if (parse.tokenCtr + inti.length < parse.token.length) {
                    let idx = parse.tokenCtr + inti.length;
                    for (let i = 0; i < akhir.length; i++) {
                        let namaToken = parse.token[idx].nama;
                        let namaAkhir = akhir[i];
                        if (!caseSensitif) {
                            namaAkhir = namaAkhir.toLowerCase();
                            namaToken = namaToken.toLowerCase();
                        }
                        if (namaToken == namaAkhir) {
                            parse.debugLog('akhir cocok return false');
                            return false;
                        }
                    }
                }
                else {
                    parse.debugLog('check akhir gak di check: tokenCtr ' + parse.tokenCtr + '/dataStr pjg: ' + parse.token.length);
                }
                // debugGroup();
                return true;
            }
        }
        parse.Grammar = Grammar;
        parse.tokenCtr = 0;
        parse.parser = new Leksikal();
    })(parse = ha.parse || (ha.parse = {}));
})(ha || (ha = {}));
