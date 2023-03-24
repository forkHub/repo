import { Id } from "./comp/Id.js";

export interface IModul {
    id: number;
    parentId: number;
    nama: string;
}

export class ModulObj implements IModul {
    private static readonly tableName: string = 'ha.modul.modul';
    private static list: ModulObj[] = [];
    private static _modulDitambah: (m: ModulObj) => void;
    private static _dihapus: (m: ModulObj) => void;
    private static _diedit: () => void;

    public static get diedit(): () => void {
        return ModulObj._diedit;
    }
    public static set diedit(value: () => void) {
        ModulObj._diedit = value;
    }

    public static get dihapus(): (m: ModulObj) => void {
        return ModulObj._dihapus;
    }

    public static set dihapus(value: (m: ModulObj) => void) {
        ModulObj._dihapus = value;
    }

    public static get modulDitambah(): (m: ModulObj) => void {
        return this._modulDitambah;
    }
    public static set modulDitambah(value: (m: ModulObj) => void) {
        this._modulDitambah = value;
    }

    constructor(id: number, nama: string, parentId: number) {
        this._id = id;
        this._nama = nama;
        this._parentId = parentId;
    }

    static getAll(): ModulObj[] {
        return this.list.slice();
    }

    static loadData(): void {
        try {
            let str: string = window.localStorage.getItem(ModulObj.tableName);
            let list: IModul[] = JSON.parse(str);
            this.list = [];
            list.forEach((m: IModul) => {
                this.list.push(new ModulObj(m.id, m.nama, m.parentId));
            })
        }
        catch (e) {
            console.warn(e);
            let modul: ModulObj = new ModulObj(Id.id, 'root', 0);
            ModulObj.list = [];
            ModulObj.list.push(modul);
            ModulObj.save();
        }
    }

    static save(): void {
        let data: IModul[] = [];
        this.list.forEach((item: ModulObj) => {
            data.push(ModulObj.toObj(item));
        });

        window.localStorage.setItem(ModulObj.tableName, JSON.stringify(data));
    }

    static toObj(m: ModulObj): IModul {
        return {
            id: m.id,
            nama: m.nama,
            parentId: m.parentId
        }
    }

    static tambah(m: ModulObj): void {
        this.list.push(m);
        this.save();
        setTimeout(() => {
            this.modulDitambah(m);
        }, 0);
    }

    static edit(): void {
        this.save();
        setTimeout(() => {
            this._diedit();
        }, 0);
    }

    static hapus(m: ModulObj): void {
        this.list = this.list.filter((item) => {
            console.log('hapus ' + m.id);
            return item.id != m.id;
        });
        this.save();

        setTimeout(() => {
            this.dihapus(m);
        }, 0);
    }

    static getByNoparent(): ModulObj[] {
        return this.list.filter((item: IModul) => {
            return item.parentId == 0
        });
    }

    static getByParentId(id: number): ModulObj[] {
        return this.list.filter((item: ModulObj) => {
            return item._parentId == id;
        });
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