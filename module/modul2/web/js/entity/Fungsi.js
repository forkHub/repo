class Fungsi {
    constructor(id, judul) {
        this.variable = [];
        this.stmt = [];
        this.param = [];
        this._id = id;
        this._judul = judul;
    }
    static load(data) {
        while (this.daftar.length > 0) {
            this.daftar.pop();
        }
        data.forEach((data) => {
            if (data.type == FUNGSI) {
                let obj = JSON.parse(data.data);
                let fungsi = this.fromObj(obj);
                this.daftar.push(fungsi);
            }
        });
    }
    static toObj(obj) {
        return {
            id: obj.id,
            judul: obj.judul,
            param: obj.param,
            stmt: obj.stmt,
            variable: obj.variable
        };
    }
    static fromObj(obj) {
        let hasil = new Fungsi(obj.id, obj.judul);
        //param
        if (obj.param) {
            obj.param.forEach((id) => {
                hasil.param.push(id);
            });
        }
        //variable
        if (obj.variable) {
            obj.variable.forEach((id) => {
                hasil.variable.push(id);
            });
        }
        //stmt
        if (obj.stmt) {
            obj.stmt.forEach((id) => {
                hasil.stmt.push(id);
            });
        }
        return hasil;
    }
    static hapus(id) {
        for (let i = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].id == id) {
                this.daftar.splice(i, 1);
            }
        }
    }
    static getDipilih() {
        return this.getId(Kontek.fungsiId);
    }
    static getId(id) {
        let hasil;
        this.daftar.forEach((item) => {
            if (item.id == id) {
                hasil = item;
            }
        });
        if (!hasil) {
            throw Error('fungsi tidak ketemu, id ' + id);
        }
        return hasil;
    }
    static buat(judul) {
        let hasil = new Fungsi(ha.comp.Util.id(), judul);
        this.daftar.push(hasil);
        return hasil;
    }
    static toData(data) {
        Fungsi.daftar.forEach((item) => {
            data.push(Data.toObj(new Data(item.id, FUNGSI, JSON.stringify(Fungsi.toObj(item)))));
        });
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
}
Fungsi.daftar = [];
