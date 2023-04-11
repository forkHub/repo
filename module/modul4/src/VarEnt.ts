export type ParentType = 'modul' | 'fungsi';

export interface IVariable {
    id: number;
    parentId: number;
    parentType: ParentType,
    nama: string;
}

export class VariableObj implements IVariable {
    private static readonly tableName: string = 'ha.modul.variable';
    private static list: VariableObj[] = [];
    private static _ditambah: (m: VariableObj) => void;
    private static _dihapus: (m: VariableObj) => void;
    private static _diedit: () => void;

    public static get diedit(): () => void {
        return VariableObj._diedit;
    }
    public static set diedit(value: () => void) {
        VariableObj._diedit = value;
    }

    public static get dihapus(): (m: VariableObj) => void {
        return VariableObj._dihapus;
    }

    public static set dihapus(value: (m: VariableObj) => void) {
        VariableObj._dihapus = value;
    }

    public static get ditambah(): (m: VariableObj) => void {
        return this._ditambah;
    }
    public static set ditambah(value: (m: VariableObj) => void) {
        this._ditambah = value;
    }

    constructor(id: number, nama: string, parentId: number, type: ParentType) {
        this._id = id;
        this._nama = nama;
        this._parentId = parentId;
        this._parentType = type;
    }

    static getAll(): VariableObj[] {
        return this.list.slice();
    }

    static loadData(): void {
        try {
            let str: string = window.localStorage.getItem(VariableObj.tableName);
            let list: IVariable[] = JSON.parse(str);
            this.list = [];
            list.forEach((m: IVariable) => {
                this.list.push(new VariableObj(m.id, m.nama, m.parentId, m.parentType));
            })
        }
        catch (e) {
            console.warn(e);
            // let modul: VariableObj = new VariableObj(Id.id, 'root', 0);
            // VariableObj.list = [];
            // VariableObj.list.push(modul);
            // VariableObj.save();
        }
    }

    static save(): void {
        let data: IVariable[] = [];
        this.list.forEach((item: VariableObj) => {
            data.push(VariableObj.toObj(item));
        });

        window.localStorage.setItem(VariableObj.tableName, JSON.stringify(data));
    }

    static toObj(m: VariableObj): IVariable {
        return {
            id: m.id,
            nama: m.nama,
            parentId: m.parentId,
            parentType: m.parentType
        }
    }

    static tambah(m: VariableObj): void {
        this.list.push(m);
        this.save();
        setTimeout(() => {
            this.ditambah(m);
        }, 0);
    }

    static edit(): void {
        this.save();
        setTimeout(() => {
            this._diedit();
        }, 0);
    }

    static getById(id: number): VariableObj {
        return this.list.find((item) => {
            return item.id == id;
        });
    }

    static hapus(m: VariableObj): void {
        this.list = this.list.filter((item) => {
            console.log('hapus ' + m.id);
            return item.id != m.id;
        });
        this.save();

        setTimeout(() => {
            this.dihapus(m);
        }, 0);
    }

    static getByNoparent(): VariableObj[] {
        return this.list.filter((item: IVariable) => {
            return item.parentId == 0
        });
    }

    static getByParentId(id: number): VariableObj[] {
        return this.list.filter((item: VariableObj) => {
            return item._parentId == id;
        });
    }

    private _parentType: ParentType;
    public get parentType(): ParentType {
        return this._parentType;
    }
    public set parentType(value: ParentType) {
        this._parentType = value;
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