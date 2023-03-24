import { Id } from "./comp/Id.js";
export class ModulObj {
    static tableName = 'ha.modul.modul';
    static list = [];
    static _modulDitambah;
    static _dihapus;
    static _diedit;
    static get diedit() {
        return ModulObj._diedit;
    }
    static set diedit(value) {
        ModulObj._diedit = value;
    }
    static get dihapus() {
        return ModulObj._dihapus;
    }
    static set dihapus(value) {
        ModulObj._dihapus = value;
    }
    static get modulDitambah() {
        return this._modulDitambah;
    }
    static set modulDitambah(value) {
        this._modulDitambah = value;
    }
    constructor(id, nama, parentId) {
        this._id = id;
        this._nama = nama;
        this._parentId = parentId;
    }
    static getAll() {
        return this.list.slice();
    }
    static load() {
        try {
            let str = window.localStorage.getItem(ModulObj.tableName);
            let list = JSON.parse(str);
            this.list = [];
            list.forEach((m) => {
                this.list.push(new ModulObj(m.id, m.nama, m.parentId));
            });
        }
        catch (e) {
            console.warn(e);
            let modul = new ModulObj(Id.id, 'root', 0);
            ModulObj.list = [];
            ModulObj.list.push(modul);
            ModulObj.save();
        }
    }
    static save() {
        let data = [];
        this.list.forEach((item) => {
            data.push(ModulObj.toObj(item));
        });
        window.localStorage.setItem(ModulObj.tableName, JSON.stringify(data));
    }
    static toObj(m) {
        return {
            id: m.id,
            nama: m.nama,
            parentId: m.parentId
        };
    }
    static tambah(m) {
        this.list.push(m);
        this.save();
        setTimeout(() => {
            this.modulDitambah(m);
        }, 0);
    }
    static edit() {
        this.save();
        setTimeout(() => {
            this._diedit();
        }, 0);
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
