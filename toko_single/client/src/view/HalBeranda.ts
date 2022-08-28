import { Util } from "../comp/Util.js";

export class HalBeranda {
    private static _view: HTMLElement;
    private static daftarCont: HTMLElement;

    public static get view(): HTMLElement {
        return this._view;
    }
    public static set view(value: HTMLElement) {
        this._view = value;
    }

    static async load(): Promise<void> {
        let str: string = await Util.Ajax2('get', './template/Beranda.html', '');
        this._view = Util.createEl(str);
        this.daftarCont = Util.getEl("div.daftar-cont", this._view);
    }

    static baru(barang: IBarang): void {
        let view: Item;
        let viewEl: HTMLElement = Util.getEl("div.item.template", this._view).cloneNode(true) as HTMLElement;

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
    private _view: HTMLElement;
    private _barang: IBarang;
    private namaEl: HTMLElement;
    private ketEl: HTMLElement;
    private hargaEl: HTMLElement;

    constructor(view: HTMLElement) {
        this._view = view;
        this._view.classList.remove('template');
    }

    public get barang(): IBarang {
        return this._barang;
    }
    public set barang(value: IBarang) {
        this._barang = value;
    }

    public get view(): HTMLElement {
        return this._view;
    }
    public set view(value: HTMLElement) {
        this._view = value;
    }
}