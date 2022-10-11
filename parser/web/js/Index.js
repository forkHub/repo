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
                this.dataStr = this.dataStr.slice(str2.length + 1);
            }
            //angka
            else if (this.checkAngka(char)) {
                let str2 = this.ambilAngka(this.dataStr);
                this.kata.push(str2);
                this.dataStr = this.dataStr.slice(str2.length + 1);
            }
            //cadangan
            else if (this.ambilCadangan()) {
            }
            //kata
            else if (this.checkHuruf(char)) {
                let str2 = this.ambilHuruf(this.dataStr);
                this.kata.push(str2);
                this.dataStr = this.dataStr.slice(str2.length + 1);
            }
            else {
                //validate
                if (this.checkSimbol(char)) {
                    this.kata.push(char);
                    this.dataStr = this.dataStr.slice(1);
                }
            }
            ctr++;
            if (ctr > 10) {
                break;
            }
        }
        console.groupEnd();
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
                console.log(item + ' / ' + str);
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
    //ambil kata
    ambilHuruf(str) {
        let hasil = '';
        let hurufReg = /^[a-zA-Z_][a-zA-Z0-9_$%#@]*/;
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
const parser = new Parser();
// parser.kataCadangan.push('kata-kata');
parser.kataCadangan.push('><');
parser.kataCadangan.push('[{');
parser.pecah('=>/?><[{ ]}');
console.log(parser.kata);
