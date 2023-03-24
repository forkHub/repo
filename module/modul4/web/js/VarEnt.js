export class VariableObj {
    static tableName = 'ha.modul.variable';
    static list = [];
    static _ditambah;
    static _dihapus;
    static _diedit;
    static get diedit() {
        return VariableObj._diedit;
    }
    static set diedit(value) {
        VariableObj._diedit = value;
    }
    static get dihapus() {
        return VariableObj._dihapus;
    }
    static set dihapus(value) {
        VariableObj._dihapus = value;
    }
    static get ditambah() {
        return this._ditambah;
    }
    static set ditambah(value) {
        this._ditambah = value;
    }
    constructor(id, nama, parentId, type) {
        this._id = id;
        this._nama = nama;
        this._parentId = parentId;
        this._parentType = type;
    }
    static getAll() {
        return this.list.slice();
    }
    static loadData() {
        try {
            let str = window.localStorage.getItem(VariableObj.tableName);
            let list = JSON.parse(str);
            this.list = [];
            list.forEach((m) => {
                this.list.push(new VariableObj(m.id, m.nama, m.parentId, m.parentType));
            });
        }
        catch (e) {
            console.warn(e);
            // let modul: VariableObj = new VariableObj(Id.id, 'root', 0);
            // VariableObj.list = [];
            // VariableObj.list.push(modul);
            // VariableObj.save();
        }
    }
    static save() {
        let data = [];
        this.list.forEach((item) => {
            data.push(VariableObj.toObj(item));
        });
        window.localStorage.setItem(VariableObj.tableName, JSON.stringify(data));
    }
    static toObj(m) {
        return {
            id: m.id,
            nama: m.nama,
            parentId: m.parentId,
            parentType: m.parentType
        };
    }
    static tambah(m) {
        this.list.push(m);
        this.save();
        setTimeout(() => {
            this.ditambah(m);
        }, 0);
    }
    static edit() {
        this.save();
        setTimeout(() => {
            this._diedit();
        }, 0);
    }
    static getById(id) {
        return this.list.find((item) => {
            return item.id == id;
        });
    }
    static hapus(m) {
        this.list = this.list.filter((item) => {
            console.log('hapus ' + m.id);
            return item.id != m.id;
        });
        this.save();
        setTimeout(() => {
            this.dihapus(m);
        }, 0);
    }
    static getByNoparent() {
        return this.list.filter((item) => {
            return item.parentId == 0;
        });
    }
    static getByParentId(id) {
        return this.list.filter((item) => {
            return item._parentId == id;
        });
    }
    _parentType;
    get parentType() {
        return this._parentType;
    }
    set parentType(value) {
        this._parentType = value;
    }
    _id;
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    _parentId;
    get parentId() {
        return this._parentId;
    }
    set parentId(value) {
        this._parentId = value;
    }
    _nama;
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
}
