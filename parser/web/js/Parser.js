let tokenCtr = 0;
class Leksikal {
    constructor() {
        this.kataCadangan = [];
        this.binopOpr = [];
    }
    async pecah(str) {
        console.group('pecah');
        Kons.dataStr = str;
        while (Kons.dataStr.length > 0) {
            let char = Kons.dataStr.charAt(0);
            //string ""
            if (char == '\"') {
                let str2 = this.ambilString(Kons.dataStr);
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
            else if (this.ambilKomentar()) {
            }
            //komentar segaris
            else if (this.ambilReg(/^\/\/.*/, '')) {
            }
            //angka => minus titik minus-titik
            else if (this.ambilReg(/^[0-9]*\.*[0-9]+/, Kons.ANGKA)) {
            }
            else if (this.ambilCadangan(this.binopOpr, Kons.OPR)) {
            }
            else if (this.ambilCadangan(this.kataCadangan, Kons.KATA_CADANGAN)) {
            }
            //kata include kata.dot
            else if (this.checkHuruf(char)) {
                let str2 = this.ambilHuruf(Kons.dataStr);
                token.push({
                    nama: Kons.KATA,
                    nilai: [str2],
                    token: []
                });
                Kons.dataStr = Kons.dataStr.slice(str2.length);
            }
            //simbol
            else if (this.checkSimbol(char)) {
                token.push({
                    nama: char,
                    nilai: [char],
                    token: []
                });
                Kons.dataStr = Kons.dataStr.slice(1);
            }
            //ignore
            else if (!this.checkSimbol(char)) {
                Kons.dataStr = Kons.dataStr.slice(1);
            }
            else {
                console.log(renderToken(token));
                console.log(Kons.dataStr);
                throw Error('');
            }
        }
        debugGroup('');
    }
    ambilKomentar() {
        if (Kons.dataStr.slice(0, 2) != '/*')
            return false;
        let idx;
        idx = Kons.dataStr.indexOf('*/', 2);
        if (idx < 0)
            return false;
        console.log('komentar: ' + Kons.dataStr.slice(0, idx + 2));
        Kons.dataStr = Kons.dataStr.slice(idx + 2);
        console.log(Kons.dataStr);
        return true;
    }
    ambilReg(reg, namaToken = '') {
        let hsl = (Kons.dataStr.match(reg));
        if (hsl && hsl.length > 0) {
            Kons.dataStr = Kons.dataStr.slice(hsl[0].length);
            if (namaToken != '') {
                token.push({
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
        return this.ambilReg(/^'[a-zA-Z_][\.a-zA-Z0-9_$%#@]*'/, Kons.TEKS);
    }
    ambilCadangan(dataAr, namaToken) {
        for (let i = 0; i < dataAr.length; i++) {
            let item = dataAr[i].toLowerCase();
            let str = Kons.dataStr.slice(0, item.length);
            if (item == str) {
                let tokenBaru = {
                    nama: namaToken,
                    nilai: [item],
                    token: []
                };
                if (namaToken == Kons.KATA_CADANGAN) {
                    tokenBaru.nama = item;
                }
                token.push(tokenBaru);
                Kons.dataStr = Kons.dataStr.slice(item.length);
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
            debugLog('data: ' + str.slice(0, 100));
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
class Grammar {
    static async check() {
        let batas = 0;
        while (true) {
            debugGroupCollapsed('check grammar, ctr: ' + tokenCtr);
            let hasil = await this.check_grammar();
            debugGroupEnd();
            if (hasil) {
                tokenCtr = 0;
                if (token.length == 1)
                    break;
            }
            else {
                // debugLog('check grammar gak ada hasil')
                tokenCtr++;
                if (tokenCtr >= token.length) {
                    debugOn();
                    debugLog('HABIS');
                    break;
                }
            }
            batas++;
            if (batas > 5000)
                break;
        }
        debugOn();
        debugLog('selesai:');
        debugLog(this.renderToken(token));
    }
    static async check_grammar() {
        let adaTokenBaru = false;
        debugOff();
        // console.group('check token dengan rumus yang ada, ctr: ' + tokenCtr);
        for (let i = 0; i < grammarAr.length; i++) {
            debugGroupCollapsed('check rumus, idx ' + i);
            let hasil = await this.check_rumus(grammarAr[i].rumus);
            debugGroupEnd();
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
        debugLog('[0]: ' + this.renderToken(token.slice(Math.max(tokenCtr - 1, 0), tokenCtr + 5)), true);
        //lolos
        //packaging
        // debugOff();
        // debugGroup('token baru');
        // debugLog('check token pada ctr ' + tokenCtr + ' cocok dengan rumus: ' + grammarAr[i].nama);
        // buat token
        let tokenBaru = {
            nama: grammarAr[i].nama,
            nilai: [],
            token: []
        };
        let rl = grammarAr[i].rumus[1].length;
        for (let j = 0; j < rl; j++) {
            tokenBaru.token.push(token[tokenCtr + j]);
        }
        // debugger;
        let kiri = token.slice(0, tokenCtr);
        let kanan = token.slice(tokenCtr + grammarAr[i].rumus[1].length);
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
        while (token.length > 0) {
            token.pop();
        }
        this.tambah(token, kiri);
        this.tambah(token, [tokenBaru]);
        this.tambah(token, kanan);
        // debugLog('token: ' + this.renderToken(token));
        // debugGroupEnd();
        // tokenCtr = 0;
        // debugGroup();
        debugLog('[1]: ' + this.renderToken(token.slice(Math.max(tokenCtr - 1, 0), tokenCtr + 5)), true);
        debugLog('', true);
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
    static async check_rumus(rumus, caseSensitif = false) {
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
        debugLog('check awal');
        for (let i = 0; i < rumusAwal.length; i++) {
            if (tokenCtr > 0) {
                let namaToken = token[tokenCtr - 1].nama;
                let rumusAwalTeks = rumusAwal[i];
                if (!caseSensitif) {
                    namaToken = namaToken.toLowerCase();
                    rumusAwalTeks = rumusAwalTeks.toLowerCase();
                }
                if (namaToken == rumusAwalTeks) {
                    debugLog('awal salah, token: ' + token[tokenCtr - 1].nama);
                    return false;
                }
                else {
                    debugLog('awal gak di check');
                }
            }
        }
        //check inti
        debugLog('check inti');
        for (let i = 0; i < inti.length; i++) {
            if (tokenCtr + i >= token.length) {
                return false;
            }
            if (token[tokenCtr + i].nama != inti[i]) {
                debugLog('token tidak sama, token: ' + token[tokenCtr + i].nama + '/rumus: ' + inti[i]);
                return false;
            }
        }
        //check akhir
        debugLog('check akhir');
        if (tokenCtr + inti.length < token.length) {
            let idx = tokenCtr + inti.length;
            for (let i = 0; i < akhir.length; i++) {
                if (token[idx].nama == akhir[i]) {
                    debugLog('akhir cocok return false');
                    return false;
                }
            }
        }
        else {
            debugLog('check akhir gak di check: tokenCtr ' + tokenCtr + '/dataStr pjg: ' + token.length);
        }
        // debugGroup();
        return true;
    }
}
