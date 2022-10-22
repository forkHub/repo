class Modul {
    constructor(id, judul) {
        this.sub = [];
        this.variable = [];
        this.fungsi = [];
        this._judul = judul;
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get judul() {
        return this._judul;
    }
    set judul(value) {
        this._judul = value;
    }
    static buat(judul) {
        let hasil;
        hasil = new Modul(ha.comp.Util.id(), judul);
        this.daftar.push(hasil);
        return hasil;
    }
    static getId(id) {
        let hasil;
        this.daftar.forEach((item) => {
            if (item.id == id) {
                hasil = item;
            }
        });
        return hasil;
    }
    static getAktif() {
        return this.getId(Kontek.modulId);
    }
    static induk(modul) {
        let hasil;
        this.daftar.forEach((item) => {
            if (item.sub.indexOf(modul.id) >= 0) {
                hasil = item;
            }
        });
        return hasil;
    }
    static keUtama(modul) {
        //TODO:
        return modul;
    }
    static hapus(id) {
        for (let i = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].id == id) {
                this.daftar.splice(i, 1);
            }
        }
    }
    static toObj(modul) {
        return {
            id: modul.id,
            judul: modul.judul,
            variable: modul.variable,
            sub: modul.sub,
            fungsi: modul.fungsi
        };
    }
    static fromObj(obj) {
        let hasil = new Modul(obj.id, obj.judul);
        if (obj.variable) {
            obj.variable.forEach((n) => {
                hasil.variable.push(n);
            });
        }
        if (obj.sub) {
            obj.sub.forEach((n) => {
                hasil.sub.push(n);
            });
        }
        if (obj.fungsi) {
            obj.fungsi.forEach((id) => {
                hasil.fungsi.push(id);
            });
        }
        return hasil;
    }
    static load(data) {
        while (this.daftar.length > 0) {
            this.daftar.pop();
        }
        data.forEach((item) => {
            if (item.type == 'modul') {
                this.daftar.push(this.fromObj(JSON.parse(item.data)));
            }
        });
    }
}
Modul.daftar = [];
