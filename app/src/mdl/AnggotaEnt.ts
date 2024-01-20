/**
 * list of entity
 * Dialog
 * Anggota
 * 
 */

export interface IAnggota {
    id: string,
    nama: string
}

export class AnggotaObj implements IAnggota {
    private _id: string;
    private _nama: string;

    constructor(id: string, nama: string) {
        this._id = id;
        this._nama = nama;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get nama(): string {
        return this._nama;
    }
    public set nama(value: string) {
        this._nama = value;
    }
}

class AnggotaEnt {
    private readonly list: AnggotaObj[] = [];

    def() {
        this.list;//TODO:
    }

    async daftar(): Promise<IAnggota[]> {
        return [];
    }
}

export const anggotaEnt = new AnggotaEnt();