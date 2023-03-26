import { BaseComponent } from "../comp/BaseComponent.js";
import { fungList, FungObj } from "../FungEnt.js";

export class FungView extends BaseComponent {
    private static list: FungView[] = [];

    private _item: FungObj;
    private namaEl: HTMLElement;
    private hapusTbl: HTMLButtonElement;
    private editTbl: HTMLButtonElement;
    private lihatTbl: HTMLButtonElement;

    constructor(item: FungObj) {
        super();
        this._elHtml = this.getTemplate('div.fung-entry');
        this._item = item;

        this.namaEl = this.getEl('div.nama');
        this.hapusTbl = this.getEl('button.hapus') as HTMLButtonElement;
        this.editTbl = this.getEl('button.edit') as HTMLButtonElement;
        this.lihatTbl = this.getEl('button.lihat') as HTMLButtonElement;

        this.namaEl.innerText = this._item.nama;

        this.editTbl.onclick = () => {
            // console.log('edit');
            this.editKlik();
        }

        this.hapusTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            this.hapusDiKlik();
        }

        this.lihatTbl.onclick = (e: MouseEvent) => {
            e.stopPropagation();
            window.top.location.href = 'edit_fungsi.html?id=' + this.item.id;
        }
    }

    private hapusDiKlik(): void {

        let b: boolean = confirm('dihapus?');

        if (b) {
            fungList.hapus(this.item);
        }
    }

    private editKlik(): void {
        let nama: string = prompt('nama: ' + this.item.nama);
        if (nama) {
            this.item.nama = nama;
            fungList.edit();
        }
    }

    static tambah(cont: HTMLDivElement, item: FungObj): void {
        let view: FungView = new FungView(item);
        view.attach(cont);
        this.list.push(view);
    }

    // static destroy(): void {

    // }

    // static reload(): void {
    //     // ModulView.dipilih = null;
    //     // while (this.list.length > 0) {
    //     //     let item: ModulView = this.list.pop();
    //     //     item.destroy();
    //     // }

    //     //reselect
    // }

    static getById(id: number): FungView {
        return this.list.find((item: FungView) => {
            return item.item.id == id;
        })
    }

    public get item(): FungObj {
        return this._item;
    }
}