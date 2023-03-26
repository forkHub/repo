import { StmtObj } from "./StmtEnt.js";
class StmtList {
    _list = [];
    _ditambah;
    _diedit;
    _dihapus;
    get diedit() {
        return this._diedit;
    }
    set diedit(value) {
        this._diedit = value;
    }
    get ditambah() {
        return this._ditambah;
    }
    set ditambah(value) {
        this._ditambah = value;
    }
    get list() {
        return this._list;
    }
    tambah(m) {
        this._list.push(m);
        setTimeout(() => {
            this.ditambah(m);
        }, 0);
    }
    edit(stmt) {
        setTimeout(() => {
            this._diedit(stmt);
        }, 0);
    }
    getById(id) {
        return this.list.find((item) => {
            return item.id == id;
        });
    }
    hapus(m) {
        this._list = this.list.filter((item) => {
            console.log('hapus ' + m.id);
            return item.id != m.id;
        });
        setTimeout(() => {
            this._dihapus(m);
        }, 0);
    }
    getByParentId(id) {
        return this._list.filter((item) => {
            return item.parentId == id;
        });
    }
    getAll() {
        return this._list.slice();
    }
}
class FungList {
    stmtList = new StmtList();
    tableName = 'ha.modul.fungsi';
    _list = [];
    getAll() {
        return this._list.slice();
    }
    loadData() {
        try {
            let str = window.localStorage.getItem(this.tableName);
            let list = JSON.parse(str);
            this._list = [];
            list.forEach((m) => {
                this._list.push(new FungObj(m.id, m.nama, m.parentId)); //TODO:
            });
        }
        catch (e) {
            console.warn(e);
        }
    }
    save() {
        let data = [];
        this._list.forEach((item) => {
            data.push(item.toObj(item));
        });
        window.localStorage.setItem(this.tableName, JSON.stringify(data));
    }
    tambah(m) {
        this._list.push(m);
        this.save();
        setTimeout(() => {
            this.ditambah(m);
        }, 0);
    }
    edit() {
        this.save();
        setTimeout(() => {
            this._diedit();
        }, 0);
    }
    getById(id) {
        return this._list.find((item) => {
            return item.id == id;
        });
    }
    hapus(m) {
        this._list = this._list.filter((item) => {
            console.log('hapus ' + m.id);
            return item.id != m.id;
        });
        this.save();
        setTimeout(() => {
            this.dihapus(m);
        }, 0);
    }
    getByNoparent() {
        return this._list.filter((item) => {
            return item.parentId == 0;
        });
    }
    getByParentId(id) {
        return this._list.filter((item) => {
            return item.parentId == id;
        });
    }
    _ditambah;
    get ditambah() {
        return this._ditambah;
    }
    set ditambah(value) {
        this._ditambah = value;
    }
    _dihapus;
    get dihapus() {
        return this._dihapus;
    }
    set dihapus(value) {
        this._dihapus = value;
    }
    _diedit;
    get diedit() {
        return this._diedit;
    }
    set diedit(value) {
        this._diedit = value;
    }
}
export const fungList = new FungList();
export class FungObj {
    stmtList = new StmtList();
    //TODO: stmts
    constructor(id, nama, parentId) {
        this._id = id;
        this._nama = nama;
        this._parentId = parentId;
    }
    toObj(m) {
        return {
            id: m.id,
            nama: m.nama,
            parentId: m.parentId,
            stmtAr: StmtObj.toObjAr(m.stmtAr)
        };
    }
    // private static _stmt: Stmt
    // public static get stmt(): Stmt {
    //     return _stmt;
    // }
    _stmtAr = [];
    get stmtAr() {
        return this._stmtAr;
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
