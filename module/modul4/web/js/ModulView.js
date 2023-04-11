import { BaseComponent } from "./comp/BaseComponent.js";
import { store } from "./hal_module.js";
import { ModulObj } from "./modulEnt.js";
export class ModulView extends BaseComponent {
    static list = [];
    _item;
    namaEl;
    anakEl;
    expandTbl;
    lihatTbl;
    hapusTbl;
    editTbl;
    elCont;
    get item() {
        return this._item;
    }
    constructor(item) {
        super();
        this._elHtml = this.getTemplate('div.modul-item');
        this._item = item;
        this.namaEl = this.getEl('div.nama');
        this.expandTbl = this.getEl('button.expand');
        this.anakEl = this.getEl('div.anak');
        this.lihatTbl = this.getEl('button.lihat');
        this.hapusTbl = this.getEl('button.hapus');
        this.editTbl = this.getEl('button.edit');
        this.elCont = this.getEl('div.el-cont');
        this.namaEl.innerText = this._item.nama;
        this.editTbl.onclick = () => {
            // console.log('edit');
            this.editKlik();
        };
        this.hapusTbl.onclick = (e) => {
            e.stopPropagation();
            this.hapusKlik();
        };
        this.lihatTbl.onclick = () => {
            console.debug('lihat klik');
            this.lihatKlik();
        };
        this.expandTbl.onclick = () => {
            console.debug('expand click');
        };
        this._elHtml.onclick = (e) => {
            e.stopPropagation();
            if (store.dipilih) {
                ModulView.getById(store.dipilih)?.dipilih(false);
            }
            store.dipilih = this.item.id;
            this.dipilih(true);
        };
        //load anak
        ModulObj.getByParentId(this.item.id).forEach((item) => {
            ModulView.tambah(this.anakEl, item);
        });
    }
    lihatKlik() {
        window.top.location.href = "edit_modul.html?id=" + this._item.id;
    }
    hapusKlik() {
        let b = confirm('dihapus');
        if (b) {
            ModulObj.hapus(this.item);
            this._item = null;
            this.destroy();
            if (!ModulView.getById(store.dipilih)) {
                store.dipilih = 0;
            }
            ;
        }
    }
    editKlik() {
        let nama = prompt('nama: ' + this.item.nama);
        if (nama) {
            this.item.nama = nama;
            ModulObj.edit();
        }
    }
    dipilih(dipilih) {
        if (dipilih) {
            this.elCont.classList.add('dipilih');
        }
        else {
            this.elCont.classList.remove('dipilih');
        }
    }
    static tambah(cont, item) {
        let view = new ModulView(item);
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
