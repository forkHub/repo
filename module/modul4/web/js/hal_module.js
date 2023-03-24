import { Id } from "./comp/Id.js";
import { Util } from "./comp/Util.js";
import { ModulObj } from "./modulEnt.js";
import { ModulView } from "./ModulView.js";
let btnTambah = Util.getEl('button.tambah');
let daftarEl = Util.getEl('div.daftar');
class Store {
    table = 'ha.modul.store';
    _dipilih = 0;
    get dipilih() {
        return this._dipilih;
    }
    set dipilih(value) {
        this._dipilih = value;
    }
    reload() {
        try {
            let obj = JSON.parse(window.localStorage.getItem(this.table));
            this._dipilih = obj.dipilih;
        }
        catch (e) {
            console.warn(e);
        }
    }
    save() {
        let obj = {
            dipilih: this.dipilih
        };
        window.localStorage.setItem(this.table, JSON.stringify(obj));
    }
}
export const store = new Store();
reload();
btnTambah.onclick = () => {
    let nama = prompt('nama modul:');
    let modul;
    let parentId;
    parentId = store.dipilih ? store.dipilih : 0;
    modul = new ModulObj(Id.id, nama, parentId);
    ModulObj.tambah(modul);
};
ModulObj.modulDitambah = (_m) => {
    refresh();
};
ModulObj.dihapus = (_m) => {
    refresh();
};
ModulObj.diedit = () => {
    refresh();
};
function refresh() {
    window.location.reload();
}
function reload() {
    ModulObj.loadData();
    ModulView.reload();
    ModulObj.getByNoparent().forEach((item) => {
        ModulView.tambah(daftarEl, item);
    });
}
