import { Id } from "./comp/Id.js";
import { Util } from "./comp/Util.js";
import { ModulObj } from "./modulEnt.js"
import { ModulView } from "./ModulView.js";

let btnTambah: HTMLButtonElement = Util.getEl('button.tambah') as HTMLButtonElement;
let daftarEl: HTMLDivElement = Util.getEl('div.daftar') as HTMLDivElement;


interface IStore {
    dipilih: number
}

class Store implements IStore {
    private table: string = 'ha.modul.store';

    private _dipilih: number = 0;
    public get dipilih(): number {
        return this._dipilih;
    }
    public set dipilih(value: number) {
        this._dipilih = value;
    }

    reload() {
        try {
            let obj: IStore = JSON.parse(window.localStorage.getItem(this.table));
            this._dipilih = obj.dipilih;
        }
        catch (e) {
            console.warn(e);
        }
    }

    save() {
        let obj: IStore = {
            dipilih: this.dipilih
        };
        window.localStorage.setItem(this.table, JSON.stringify(obj));
    }
}
export const store: Store = new Store();

reload();

btnTambah.onclick = () => {
    let nama: string = prompt('nama modul:');
    let modul: ModulObj;
    let parentId: number;

    parentId = store.dipilih ? store.dipilih : 0;
    modul = new ModulObj(Id.id, nama, parentId);
    ModulObj.tambah(modul);
}

ModulObj.modulDitambah = (_m: ModulObj) => {
    refresh();
}

ModulObj.dihapus = (_m: ModulObj) => {
    refresh();
}

ModulObj.diedit = () => {
    refresh()
}

function refresh(): void {
    window.location.reload();
}

function reload(): void {
    ModulObj.loadData();
    ModulView.reload();
    ModulObj.getByNoparent().forEach((item: ModulObj) => {
        ModulView.tambah(daftarEl, item)
    });
}
