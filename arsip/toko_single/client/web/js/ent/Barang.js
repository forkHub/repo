import { Id } from "../comp/Id.js";
export class Barang {
    _id;
    _nama;
    _deskripsi;
    _harga;
    constructor() {
        this._id = Id.id;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get harga() {
        return this._harga;
    }
    set harga(value) {
        this._harga = value;
    }
    get deskripsi() {
        return this._deskripsi;
    }
    set deskripsi(value) {
        this._deskripsi = value;
    }
    get nama() {
        return this._nama;
    }
    set nama(value) {
        this._nama = value;
    }
}
