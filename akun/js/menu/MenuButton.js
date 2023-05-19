import { BaseComponent2 } from "../BaseComponent2.js";
import { Akun } from "../Akun.js";
export class MenuButton extends BaseComponent2 {
    static create(label, f, menu) {
        return new MenuButton(label, f, menu);
    }
    constructor(label, f, menu) {
        super();
        this._el = Akun.inst.template.menuItem;
        this.button = this.getEl('button');
        this.button.innerText = label;
        this.button.onclick = () => {
            f();
            menu.hide();
        };
    }
}
