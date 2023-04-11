import { BaseComponent } from "../comp/BaseComponent.js";
import { VariableObj } from "../VarEnt.js";
export class VarView extends BaseComponent {
    static list = [];
    // private static dipilih: VarView = null;
    _item;
    namaEl;
    hapusTbl;
    editTbl;
    get item() {
        return this._item;
    }
    constructor(item) {
        super();
        this._elHtml = this.getTemplate('div.entry');
        this._item = item;
        this.namaEl = this.getEl('div.nama');
        this.hapusTbl = this.getEl('button.hapus');
        this.editTbl = this.getEl('button.edit');
        this.namaEl.innerText = this._item.nama;
        this.editTbl.onclick = () => {
            // console.log('edit');
            this.editKlik();
        };
        this.hapusTbl.onclick = (e) => {
            e.stopPropagation();
            this.hapusDiKlik();
        };
        // this._elHtml.onclick = (e: MouseEvent) => {
        //     e.stopPropagation();
        //     if (VarView.dipilih) {
        //         VarView.dipilih.dipilih(false);
        //     }
        //     VarView.dipilih = this;
        //     this.dipilih(true);
        // }
    }
    hapusDiKlik() {
        let b = confirm('dihapus?');
        if (b) {
            VariableObj.hapus(this.item);
            // this._item = null;
            // this.destroy();
            // VarView.dipilih = null;
            // if (!VarView.getById(store.dipilih)) {
            //     store.dipilih = 0
            // };
        }
    }
    editKlik() {
        let nama = prompt('nama: ' + this.item.nama);
        if (nama) {
            this.item.nama = nama;
            VariableObj.edit();
        }
    }
    // dipilih(dipilih: boolean) {
    //     //TODO:
    //     dipilih;
    // }
    static tambah(cont, item) {
        let view = new VarView(item);
        view.attach(cont);
        this.list.push(view);
    }
    static destroy() {
    }
    static reload() {
        // ModulView.dipilih = null;
        // while (this.list.length > 0) {
        //     let item: ModulView = this.list.pop();
        //     item.destroy();
        // }
        //reselect
    }
    static getById(id) {
        return this.list.find((item) => {
            return item.item.id == id;
        });
    }
}
