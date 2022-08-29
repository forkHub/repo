//TODO: final
class Validator {
    VAL_ANGKA = 1;
    VAL_TEKS = 2;
    VAL_PASS = 3;
    VAL_EMAIL = 5;
    VAL_USERNAME = 5;
    VAL_WA = 5;
    SAN_ESC = 6;
    field_nama = '';
    field_panjang_min = '';
    field_panjang_max = '';
    ERR_PASS = 'Password mengandung karakter yang tidak diperbolehkan';
    ERR_PANJANG_MIN = `Panjang minimal ${this.field_nama} adalah ${this.field_panjang_min}`;
    ERR_PANJANG_MAX = `Panjang minimal ${this.field_nama} adalah ${this.field_panjang_max}`;
    checkUserNameErr(value, msg) {
        if (!this.checkUserName(value)) {
            throw Error(msg);
        }
    }
    checkAngkaErr(value, msg) {
        if (!this.checkAngka(value)) {
            throw Error(msg);
        }
    }
    checkEmailErr(value, msg = 'Email tidak valid') {
        if (!this.checkEmail(value)) {
            throw Error(msg);
        }
    }
    checkWaErr(value, msg = 'No Wa Tidak valid') {
        if (!this.checkWa(value)) {
            throw Error(msg);
        }
    }
    checkPassError(value, msg) {
        if (!this.checkPassword(value)) {
            throw Error(msg);
        }
    }
    checkUserName(value) {
        let reg = /[0-9A-Za-z._!@#]+/;
        let hasil = value.match(reg);
        if (!hasil)
            return false;
        if (hasil.length > 1)
            return false;
        if (hasil[0] != value)
            return false;
        return true;
    }
    checkAngka(value) {
        let reg = /[0-9]+/;
        let hasil = value.match(reg);
        if (!hasil)
            return false;
        if (hasil.length > 1)
            return false;
        if (hasil[0] != value)
            return false;
        return true;
    }
    checkWa(value) {
        let reg = /62[0-9]+/;
        let hasil = value.match(reg);
        if (!hasil)
            return false;
        if (hasil.length > 1)
            return false;
        if (hasil[0] != value)
            return false;
        return true;
    }
    checkPassword(pass) {
        let reg = /[A-Za-z0-9_.!]+/;
        let hasil = pass.match(reg);
        if (!hasil)
            return false;
        if (hasil.length > 1)
            return false;
        if (hasil[0] != pass)
            return false;
        return true;
    }
    checkEmail(email) {
        email;
        return true; //TODO:
    }
    checkMin(str, min) {
        if (!str)
            return false;
        if (str.length == 0)
            return false;
        if (str.length < min)
            return false;
        return true;
    }
    escape(str) {
        let hasil = str;
        while (hasil.indexOf("<") > -1) {
            hasil = hasil.replace("<", "&lt;");
        }
        while (hasil.indexOf(">") > -1) {
            hasil = hasil.replace(">", "&gt;");
        }
        return hasil;
    }
    sanitize(data, tipe) {
        let hasil = data;
        for (let i = 0; i < tipe.length; i++) {
            let t = tipe[i];
            if (this.SAN_ESC == t) {
                hasil = escape(hasil);
            }
        }
        return hasil;
    }
    vs(data, vtipe, stipe, nama, min = -1, max = 999999) {
        let hasil = data;
        hasil = this.sanitize(hasil, stipe);
        this.validate(hasil, vtipe, nama, min, max);
        return hasil;
    }
    validate(data, tipe, nama, min = -1, max = 999999) {
        this.field_panjang_min = min + '';
        this.field_panjang_max = max + '';
        this.field_nama = nama;
        if (min > 0) {
            this.field_panjang_min = min + '';
            if (data.length < min)
                throw Error(this.ERR_PANJANG_MIN);
        }
        if (max < 999999) {
            this.field_panjang_max = max + '';
            if (data.length > max)
                throw Error(this.ERR_PANJANG_MAX);
        }
        for (let i = 0; i < tipe.length; i++) {
            let n = tipe[i];
            if (this.VAL_ANGKA == n) {
            }
            if (this.VAL_EMAIL == n) {
            }
            if (this.VAL_PASS == n) {
            }
            if (this.VAL_TEKS == n) {
            }
            if (this.VAL_PASS == n) {
            }
            if (this.VAL_WA == n) {
            }
            if (this.VAL_USERNAME == n) {
            }
        }
    }
}
export var v = new Validator();
