import { BaseComponent } from "../comp/BaseComponent.js";
import { fungList } from "../FungEnt.js";
export class FungView extends BaseComponent {
    static list = [];
    _item;
    namaEl;
    hapusTbl;
    editTbl;
    lihatTbl;
    constructor(item) {
        super();
        this._elHtml = this.getTemplate('div.fung-entry');
        this._item = item;
        this.namaEl = this.getEl('div.nama');
        this.hapusTbl = this.getEl('button.hapus');
        this.editTbl = this.getEl('button.edit');
        this.lihatTbl = this.getEl('button.lihat');
        this.namaEl.innerText = this._item.nama;
        this.editTbl.onclick = () => {
            // console.log('edit');
            this.editKlik();
        };
        this.hapusTbl.onclick = (e) => {
            e.stopPropagation();
            this.hapusDiKlik();
        };
        this.lihatTbl.onclick = (e) => {
            e.stopPropagation();
            window.top.location.href = 'edit_fungsi.html?id=' + this.item.id;
        };
    }
    hapusDiKlik() {
        let b = confirm('dihapus?');
        if (b) {
            fungList.hapus(this.item);
        }
    }
    editKlik() {
        let nama = prompt('nama: ' + this.item.nama);
        if (nama) {
            this.item.nama = nama;
            fungList.edit();
        }
    }
    static tambah(cont, item) {
        let view = new FungView(item);
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
    static getById(id) {
        return this.list.find((item) => {
            return item.item.id == id;
        });
    }
    get item() {
        return this._item;
    }
}
