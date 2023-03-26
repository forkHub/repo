// import { IVarIsi } from "./StmtEnt.js";


//TODO: dihapus aja
/*
export class VarIsiList {
    private _list: IVarIsi[] = [];
    private _ditambah: (stmt: IVarIsi) => void;
    private _diedit: (stmt: IVarIsi) => void;
    private _dihapus: (stmt: IVarIsi) => void;

    public get diedit(): (stmt: IVarIsi) => void {
        return this._diedit;
    }
    public set diedit(value: (stmt: IVarIsi) => void) {
        this._diedit = value;
    }

    public get ditambah(): (stmt: IVarIsi) => void {
        return this._ditambah;
    }
    public set ditambah(value: (stmt: IVarIsi) => void) {
        this._ditambah = value;
    }

    public get list(): IVarIsi[] {
        return this._list;
    }

    tambah(m: IVarIsi): void {
        this._list.push(m);

        setTimeout(() => {
            this.ditambah(m);
        }, 0);
    }

    edit(stmt: IVarIsi): void {
        setTimeout(() => {
            this._diedit(stmt);
        }, 0);
    }

    // getById(id: number): IVarIsi {
    //     return this.list.find((item) => {
    //         return item.id == id;
    //     });
    // }

    // hapus(m: IVarIsi): void {
    //     this._list = this.list.filter((item) => {
    //         console.log('hapus ' + m.id);
    //         return item.id != m.id;
    //     });

    //     setTimeout(() => {
    //         this._dihapus(m);
    //     }, 0);
    // }

    // getByParentId(id: number): IVarIsi[] {
    //     return this._list.filter((item: IVarIsi) => {
    //         return item.parentId == id;
    //     });
    // }

    getAll(): IVarIsi[] {
        return this._list.slice();
    }

}
*/
