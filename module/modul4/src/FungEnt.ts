// import { IStmt2 as StmtObj, StmtObj } from "./StmtEnt.js";
// import { VarIsiList } from "./VarIsiList.js";

import { IStmt2, StmtObj } from "./StmtEnt";

export interface IFungsi {
    id: number;
    parentId: number;
    nama: string;
    stmtAr: StmtObj[];
}

class StmtList {
    private _list: StmtObj[] = [];
    private _ditambah: (stmt: StmtObj) => void;
    private _diedit: (stmt: StmtObj) => void;
    private _dihapus: (stmt: StmtObj) => void;

    public get diedit(): (stmt: StmtObj) => void {
        return this._diedit;
    }
    public set diedit(value: (stmt: StmtObj) => void) {
        this._diedit = value;
    }

    public get ditambah(): (stmt: StmtObj) => void {
        return this._ditambah;
    }
    public set ditambah(value: (stmt: StmtObj) => void) {
        this._ditambah = value;
    }

    public get list(): StmtObj[] {
        return this._list;
    }

    tambah(m: StmtObj): void {
        this._list.push(m);

        setTimeout(() => {
            this.ditambah(m);
        }, 0);
    }

    edit(stmt: StmtObj): void {
        setTimeout(() => {
            this._diedit(stmt);
        }, 0);
    }

    getById(id: number): StmtObj {
        return this.list.find((item) => {
            return item.id == id;
        });
    }

    hapus(m: StmtObj): void {
        this._list = this.list.filter((item) => {
            console.log('hapus ' + m.id);
            return item.id != m.id;
        });

        setTimeout(() => {
            this._dihapus(m);
        }, 0);
    }

    getByParentId(id: number): StmtObj[] {
        return this._list.filter((item: StmtObj) => {
            return item.parentId == id;
        });
    }

    getAll(): StmtObj[] {
        return this._list.slice();
    }

    toObj(): IStmt2[] {
        return [];
    }

    fromObj(obj: StmtObj[]): void {
        //TODO:
        obj;
    }


}

class FungList {
    // readonly stmtList: StmtList = new StmtList();
    readonly tableName: string = 'ha.modul.fungsi';

    private _list: FungObj[] = [];

    getAll(): FungObj[] {
        return this._list.slice();
    }

    loadData(): void {
        try {
            let str: string = window.localStorage.getItem(this.tableName);
            let list: IFungsi[] = JSON.parse(str);
            this._list = [];
            list.forEach((m: IFungsi) => {
                this._list.push(new FungObj(m.id, m.nama, m.parentId)); //TODO:
            })
        }
        catch (e) {
            console.warn(e);
        }
    }

    save(): void {
        let data: IFungsi[] = [];
        this._list.forEach((item: FungObj) => {
            data.push(item.toObj(item));
        });

        window.localStorage.setItem(this.tableName, JSON.stringify(data));
    }

    tambah(m: FungObj): void {
        this._list.push(m);
        this.save();
        setTimeout(() => {
            this.ditambah(m);
        }, 0);
    }

    edit(): void {
        this.save();
        setTimeout(() => {
            this._diedit();
        }, 0);
    }

    getById(id: number): FungObj {
        return this._list.find((item) => {
            return item.id == id;
        });
    }

    hapus(m: FungObj): void {
        this._list = this._list.filter((item) => {
            console.log('hapus ' + m.id);
            return item.id != m.id;
        });
        this.save();

        setTimeout(() => {
            this.dihapus(m);
        }, 0);
    }

    getByNoparent(): FungObj[] {
        return this._list.filter((item: FungObj) => {
            return item.parentId == 0
        });
    }

    getByParentId(id: number): FungObj[] {
        return this._list.filter((item: FungObj) => {
            return item.parentId == id;
        });
    }

    private _ditambah: (m: IFungsi) => void;
    public get ditambah(): (m: IFungsi) => void {
        return this._ditambah;
    }
    public set ditambah(value: (m: IFungsi) => void) {
        this._ditambah = value;
    }
    private _dihapus: (m: IFungsi) => void;
    public get dihapus(): (m: IFungsi) => void {
        return this._dihapus;
    }
    public set dihapus(value: (m: IFungsi) => void) {
        this._dihapus = value;
    }
    private _diedit: () => void;
    public get diedit(): () => void {
        return this._diedit;
    }
    public set diedit(value: () => void) {
        this._diedit = value;
    }
}
export const fungList: FungList = new FungList();

export class FungObj implements IFungsi {
    readonly stmtList: StmtList = new StmtList();

    //TODO: stmts
    constructor(id: number, nama: string, parentId: number) {
        this._id = id;
        this._nama = nama;
        this._parentId = parentId;
    }

    toObj(m: FungObj): IFungsi {
        return {
            id: m.id,
            nama: m.nama,
            parentId: m.parentId,
            // stmtAr: m.stmtList
            stmtAr: [] //TODO:
        }
    }

    // private static _stmt: Stmt
    // public static get stmt(): Stmt {
    //     return _stmt;
    // }

    private _stmtAr: StmtObj[] = [];
    public get stmtAr(): StmtObj[] {
        return this._stmtAr;
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    private _parentId: number;
    public get parentId(): number {
        return this._parentId;
    }
    public set parentId(value: number) {
        this._parentId = value;
    }
    private _nama: string;
    public get nama(): string {
        return this._nama;
    }
    public set nama(value: string) {
        this._nama = value;
    }
}

