import { BaseComponent2 } from "../BaseComponent2.js";
import { Akun } from "../Akun.js";
export class Export extends BaseComponent2 {
    constructor() {
        super();
        this._el = Akun.inst.template.menuItem;
        this.button = this.getEl('button');
        this.button.innerText = 'Tambah ke Home';
        this.button.onclick = () => {
            this.onClick();
        };
    }
    onClick() {
        let db = Akun.inst.db;
        let list = Akun.inst.lapSemua.listView;
        console.log('hapus data');
        db.removeAll();
        list.clear();
    }
}
