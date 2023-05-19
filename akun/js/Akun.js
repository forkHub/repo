import { Baru } from "./Baru.js";
import { Db } from "./Db.js";
import { Util } from "./Util.js";
import { Template } from "./Template.js";
import { Edit } from "./Edit.js";
import { Menu } from "./menu/Menu.js";
import { LapSemua } from "./lapSemua/LapSemua.js";
import { Dialog } from "./Dialog.js";
export class Akun {
    constructor() {
        Akun.inst = this;
        this._baru = new Baru();
        this._db = new Db();
        this._lapSemua = new LapSemua();
        this._edit = new Edit();
        this._template = new Template();
        this._menu = new Menu();
        this._daftarCont = Util.getEl(document.body, 'div.cont div.daftar-cont');
        this._dialog = new Dialog();
        this.init();
    }
    init() {
        this.baru.init();
        this.baru.attach(Util.getEl(document.body, 'div.baru-cont'));
        this._lapSemua.init();
        this._edit.init();
        this.load();
        this._lapSemua.refresh();
        this._menu.init();
        this.debug();
        this._dialog.attach(document.body);
        this._dialog.hide();
    }
    belumSelesai() {
        this._dialog.setAsOK();
        this._dialog.teks = 'Fitur ini masih dalam pengembangan';
        this._dialog.show();
    }
    import() {
        console.log('import');
        this.belumSelesai();
    }
    simpan() {
        window.localStorage.setItem('data', this._db.toString());
        console.log(this._db.toString());
    }
    load() {
        let dataStr;
        dataStr = window.localStorage.getItem('data');
        if (dataStr) {
            this._db.fromString(dataStr);
            // console.log('data ' + dataStr);
        }
        else {
            console.log('data not availble');
        }
    }
    test() {
        let date = new Date();
        let time = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        let date2 = new Date(time);
        console.log(date);
        console.log(time);
        console.log(date2);
    }
    debug() {
    }
    get lapSemua() {
        return this._lapSemua;
    }
    get db() {
        return this._db;
    }
    get baru() {
        return this._baru;
    }
    get daftarCont() {
        return this._daftarCont;
    }
    static get inst() {
        return Akun._inst;
    }
    static set inst(value) {
        Akun._inst = value;
    }
    get template() {
        return this._template;
    }
    get edit() {
        return this._edit;
    }
    get menu() {
        return this._menu;
    }
    get dialog() {
        return this._dialog;
    }
    set dialog(value) {
        this._dialog = value;
    }
}
new Akun();
