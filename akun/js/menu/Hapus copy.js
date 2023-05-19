import { BaseComponent2 } from "../BaseComponent2.js";
import { Akun } from "../Akun.js";
export class Hapus extends BaseComponent2 {
    constructor() {
        super();
        this._el = Akun.inst.template.menuItem;
        this.button = this.getEl('button');
        this.button.innerText = 'Hapus Data';
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
