class Variable {
    constructor(id, judul) {
        this._id = id;
        this._judul = judul;
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
        let hasil = new Variable(ha.comp.Util.id(), judul);
        this.daftar.push(hasil);
        return hasil;
    }
    static toObj(obj) {
        return {
            id: obj.id,
            judul: obj.judul
        };
    }
    static fromObj(obj) {
        return new Variable(obj.id, obj.judul);
    }
    static load(data) {
        while (this.daftar.length > 0) {
            this.daftar.pop();
        }
        data.forEach((data) => {
            if (data.type == 'variable') {
                let obj = JSON.parse(data.data);
                let variable = this.fromObj(obj);
                this.daftar.push(variable);
            }
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
Variable.daftar = [];
