export type TypeStmt = 'var_isi';

export interface IVarIsi {
    varId: number,
    expId: number
}

export interface IStmt2 {
    id: number;
    parentId: number,
    type: string,
    varIsi: IVarIsi,
}

export class StmtObj implements IStmt2 {

    constructor(id: number, parentId: number) {
        this._id = id;
        this._parentId = parentId;
    }

    static toObjAr(src: IStmt2[]): IStmt2[] {
        let ar: IStmt2[] = [];
        src.forEach((item) => {
            ar.push(StmtObj.toObj(item));
        });
        return ar;
    }

    static toObj(m: IStmt2): IStmt2 {
        return {
            id: m.id,
            type: m.type,
            parentId: m.parentId,
            varIsi: m.varIsi    //TODO:

            // draft: m.draft
            // type:m.
            // parentType: m.parentType
        }
    }

    private _id: number = 0;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    private _parentId: number = 0;
    public get parentId(): number {
        return this._parentId;
    }
    public set parentId(value: number) {
        this._parentId = value;
    }
    private _nama: string = '';
    public get nama(): string {
        return this._nama;
    }
    public set nama(value: string) {
        this._nama = value;
    }
    private _type: TypeStmt = 'var_isi';
    public get type(): TypeStmt {
        return this._type;
    }
    public set type(value: TypeStmt) {
        this._type = value;
    }
    private _draft: boolean = false;
    public get draft(): boolean {
        return this._draft;
    }
    public set draft(value: boolean) {
        this._draft = value;
    }
    private _varIsi: IVarIsi;
    public get varIsi(): IVarIsi {
        return this._varIsi;
    }
    public set varIsi(value: IVarIsi) {
        this._varIsi = value;
    }
}

export class VarIsi implements IVarIsi {
    private _varId: number;
    public get varId(): number {
        return this._varId;
    }
    public set varId(value: number) {
        this._varId = value;
    }

    private _expId: number;
    public get expId(): number {
        return this._expId;
    }
    public set expId(value: number) {
        this._expId = value;
    }

    toObj(): IVarIsi {
        return {
            varId: this.varId,
            expId: this.expId
        }
    }

    fromObj(item: IVarIsi) {
        this.expId = item.expId;
        this.varId = item.varId;
    }

}