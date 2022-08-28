import { Id } from "../comp/Id.js";

export class Barang implements IBarang {
    private _id: number;
    private _nama: string;
    private _deskripsi: string;
    private _harga: number;

    constructor() {
        this._id = Id.id;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get harga(): number {
        return this._harga;
    }
    public set harga(value: number) {
        this._harga = value;
    }

    public get deskripsi(): string {
        return this._deskripsi;
    }
    public set deskripsi(value: string) {
        this._deskripsi = value;
    }

    public get nama(): string {
        return this._nama;
    }
    public set nama(value: string) {
        this._nama = value;
    }

}