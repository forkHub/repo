import { Util } from "../comp/Util.js";
export class HalBeranda {
    static _view;
    static daftarCont;
    static get view() {
        return this._view;
    }
    static set view(value) {
        this._view = value;
    }
    static async load() {
        let str = await Util.Ajax2('get', './template/Beranda.html', '');
        this._view = Util.createEl(str);
        this.daftarCont = Util.getEl("div.daftar-cont", this._view);
    }
    static baru(barang) {
        let view;
        let viewEl = Util.getEl("div.item.template", this._view).cloneNode(true);
        console.log(viewEl);
        view = new Item(viewEl);
        view.barang = barang;
        // view.tblBeli.onclick = (e: MouseEvent) => {
        //     e.stopPropagation();
        //     //tambah ke keranjang //TODO:
        // }
        this.daftarCont.appendChild(view.view);
        console.log(this.daftarCont);
    }
}
class Item {
    _view;
    _barang;
    namaEl;
    ketEl;
    hargaEl;
    constructor(view) {
        this._view = view;
        this._view.classList.remove('template');
    }
    get barang() {
        return this._barang;
    }
    set barang(value) {
        this._barang = value;
    }
    get view() {
        return this._view;
    }
    set view(value) {
        this._view = value;
    }
}
