import { Util } from "../Util.js";
import { Hapus } from "./Hapus.js";
import { Export } from "./Export.js";
import { MenuButton } from "./MenuButton.js";
import { Akun } from "../Akun.js";
export class Menu {
    constructor() {
        this.menuEL = null;
        this.menuEL = Util.getEl(document.body, 'div.header div.menu-cont');
        this.button = Util.getEl(document.body, "div.header > button.menu");
    }
    init() {
        this.hide();
        this.button.onclick = () => {
            let display = this.menuEL.style.display;
            if (display == 'none') {
                this.show();
            }
            else if (display == 'block') {
                this.hide();
            }
            else {
                throw new Error();
            }
        };
        this.menuEL.appendChild((new Hapus()).el);
        this.menuEL.appendChild((new Export).el);
        this.menuEL.appendChild(MenuButton.create("Import", () => {
            Akun.inst.import();
            this.hide();
        }, this).el);
        this.menuEL.appendChild(MenuButton.create("Lap. Mingguan", () => {
            Akun.inst.belumSelesai();
            this.hide();
        }, this).el);
        this.menuEL.appendChild(MenuButton.create("Lap. Bulanan", () => {
            Akun.inst.belumSelesai();
            this.hide();
        }, this).el);
        this.menuEL.appendChild(MenuButton.create("Laporan Harian", () => {
            Akun.inst.belumSelesai();
            this.hide();
        }, this).el);
    }
    hide() {
        this.menuEL.style.display = 'none';
    }
    show() {
        this.menuEL.style.display = 'block';
    }
}
