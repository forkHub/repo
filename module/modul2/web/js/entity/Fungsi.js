class Fungsi {
    constructor(id, judul) {
        this._id = id;
        this._judul = judul;
    }
    static toObj(obj) {
        return {
            id: obj.id,
            judul: obj.judul,
            param: obj.param,
            stmt: obj.stmt,
        };
    }
    static fromObj(obj) {
        let hasil = new Fungsi(obj.id, obj.judul);
        //param
        obj.param.forEach((id) => {
            hasil.param.push(id);
        });
        //stmt
        obj.stmt.forEach((id) => {
            hasil.stmt.push(id);
        });
        return hasil;
    }
    static hapus(id) {
        for (let i = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].id == id) {
                this.daftar.splice(i, 1);
            }
        }
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
    static buat(judul) {
        let hasil = new Fungsi(ha.comp.Util.id(), judul);
        this.daftar.push(hasil);
        return hasil;
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
