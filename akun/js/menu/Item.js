import { BaseComponent2 } from "../BaseComponent2";
import { Akun } from "../Akun";
export class Item extends BaseComponent2 {
    constructor(label) {
        super();
        this._button = null;
        this.label = label;
    }
    init() {
        this._el = Akun.inst.template.menuItem;
        this._button = this.getEl('button');
        this._button.innerText = this.label;
    }
    get button() {
        return this._button;
    }
    set button(value) {
        this._button = value;
    }
}
