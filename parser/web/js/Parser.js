class Parser {
    kata = [];
    kataCadangan = [];
    dataStr = '';
    pecah(str) {
        console.group('pecah');
        let ctr = 0;
        this.dataStr = str;
        while (this.dataStr.length > 0) {
            let char = this.dataStr.charAt(0);
            //string
            if (char == '\"') {
                let str2 = this.ambilString(this.dataStr);
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
                let str2 = this.ambilAngka(this.dataStr);
                this.kata.push(str2);
                this.dataStr = this.dataStr.slice(str2.length);
            }
            //cadangan
            else if (this.ambilCadangan()) {
            }
            //kata include kata.dot
            else if (this.checkHuruf(char)) {
                let str2 = this.ambilHuruf(this.dataStr);
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
    ambilReg(reg) {
        let hsl = (this.dataStr.match(reg));
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
    ambilStringQuoteSatu() {
        return this.ambilReg(/^'[a-zA-Z_][\.a-zA-Z0-9_$%#@]*'/);
    }
    ambilCadangan() {
        for (let i = 0; i < this.kataCadangan.length; i++) {
            let item = this.kataCadangan[i].toLowerCase();
            let str = this.dataStr.slice(0, item.length);
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
    checkAngka(char) {
        let hasil;
        hasil = char >= "0" && char <= "9";
        return hasil;
    }
    //ambil angka dengan data dimulai dari angka
    ambilAngka(str) {
        let hasil = '';
        let angkaReg = /^[0-9]*\.?[0-9]+/;
        let hsl = (str.match(angkaReg));
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
