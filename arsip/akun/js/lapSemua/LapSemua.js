import { BaseComponent2 } from "../BaseComponent2.js";
import { ListView } from "./ListView.js";
import { Akun } from "../Akun.js";
import { Util } from "../Util.js";
export class LapSemua extends BaseComponent2 {
    constructor() {
        super();
        this._listView = null;
        this._listCont = null;
        this.totalEl = null;
        console.log('init');
        this._listView = new ListView();
    }
    refresh() {
        console.log('refresh');
        this.totalEl.innerText = Util.tambahTitik(this._db.total() + '');
        this._listView.refresh();
    }
    init() {
        this._db = Akun.inst.db;
        this._el = Akun.inst.template.lapSemua;
        this._listCont = this.getEl('div.daftar');
        this.totalEl = this.getEl('div.total span.total');
        this.attach(Akun.inst.daftarCont);
        this._listView.init();
    }
    get db() {
        return this._db;
    }
    get listCont() {
        return this._listCont;
    }
    get listView() {
        return this._listView;
    }
    set listView(value) {
        this._listView = value;
    }
}
