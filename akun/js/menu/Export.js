import { BaseComponent2 } from "../BaseComponent2.js";
import { Akun } from "../Akun.js";
export class Export extends BaseComponent2 {
    constructor() {
        super();
        this._el = Akun.inst.template.menuItem;
        this.button = this.getEl('button');
        this.button.innerText = 'Export';
        this.button.onclick = () => {
            this.onClick();
        };
    }
    onClick() {
        Akun.inst.menu.hide();
        Akun.inst.belumSelesai();
    }
}
