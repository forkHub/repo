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
        let lapSemua = Akun.inst.lapSemua;
        let menu = Akun.inst.menu;
        let dialog = Akun.inst.dialog;
        menu.hide();
        dialog.setAsYN();
        dialog.teks = 'Apa Anda yakin akan menghapus data ini?<br/>Ini akan bersifat permanent';
        dialog.show();
        console.log('dialog show');
        console.log(dialog.el.style.display);
        console.log(dialog.el.parentElement);
        dialog.onClick = () => {
            if (dialog.hasil == 1) {
                console.log('hapus data');
                db.removeAll();
                lapSemua.refresh();
                Akun.inst.simpan();
            }
        };
    }
}
