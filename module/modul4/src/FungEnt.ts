import { IStmt2, StmtObj } from "./StmtEnt.js";
// import { VarIsiList } from "./VarIsiList.js";

export interface IFungsi {
    id: number;
    parentId: number;
    nama: string;
    stmtAr: IStmt2[];
}

class StmtList {
    private _list: IStmt2[] = [];
    private _ditambah: (stmt: IStmt2) => void;
    private _diedit: (stmt: IStmt2) => void;
    private _dihapus: (stmt: IStmt2) => void;

    public get diedit(): (stmt: IStmt2) => void {
        return this._diedit;
    }
    public set diedit(value: (stmt: IStmt2) => void) {
        this._diedit = value;
    }

    public get ditambah(): (stmt: IStmt2) => void {
        return this._ditambah;
    }
    public set ditambah(value: (stmt: IStmt2) => void) {
        this._ditambah = value;
    }

    public get list(): IStmt2[] {
        return this._list;
    }

    tambah(m: IStmt2): void {
        this._list.push(m);

        setTimeout(() => {
            this.ditambah(m);
        }, 0);
    }

    edit(stmt: IStmt2): void {
        setTimeout(() => {
            this._diedit(stmt);
        }, 0);
    }

    getById(id: number): IStmt2 {
        return this.list.find((item) => {
            return item.id == id;
        });
    }

    hapus(m: IStmt2): void {
        this._list = this.list.filter((item) => {
            console.log('hapus ' + m.id);
            return item.id != m.id;
        });

        setTimeout(() => {
            this._dihapus(m);
        }, 0);
    }

    getByParentId(id: number): IStmt2[] {
        return this._list.filter((item: IStmt2) => {
            return item.parentId == id;
        });
    }


    getAll(): IStmt2[] {
        return this._list.slice();
    }
}

class FungList {
    readonly stmtList: StmtList = new StmtList();
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




    toObj(m: IFungsi): IFungsi {
        return {
            id: m.id,
            nama: m.nama,
            parentId: m.parentId,
            stmtAr: StmtObj.toObjAr(m.stmtAr)
        }
    }

    // private static _stmt: Stmt
    // public static get stmt(): Stmt {
    //     return _stmt;
    // }

    private _stmtAr: IStmt2[] = [];
    public get stmtAr(): IStmt2[] {
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

