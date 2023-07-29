import { BaseComponent2 } from "./BaseComponent2.js";
import { Akun } from "./Akun.js";
export class Edit extends BaseComponent2 {
    constructor() {
        super();
        this.okTbl = null;
        this.cancelTbl = null;
        this.desc = null;
        this.jml = null;
        this.journal = null;
        this.tgl = null;
    }
    init() {
        this._el = Akun.inst.template.formEdit;
        this.okTbl = this.getEl('button.ok');
        this.cancelTbl = this.getEl('button.cancel');
        this.desc = this.getEl('textarea.deskripsi');
        this.jml = this.getEl('input.jml');
        this.tgl = this.getEl('input.tanggal');
        this.okTbl.onclick = this.okClick.bind(this);
        this.cancelTbl.onclick = this.cancelClick.bind(this);
        this.desc.onfocus = () => {
            this.desc.select();
        };
        this.jml.onfocus = () => {
            this.jml.select();
        };
        this.attach(document.body.querySelector('div.cont'));
        this.hide();
    }
    cancelClick() {
        this.hide();
    }
    okClick() {
        let list = Akun.inst.lapSemua.listView;
        let date = new Date(this.tgl.value);
        let dateNumber = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
        // console.log('ok click');
        this.journal.desc = this.desc.value;
        this.journal.jumlah = parseInt(this.jml.value);
        this.journal.date = dateNumber;
        list.update();
        this.hide();
        Akun.inst.simpan();
    }
    edit(journal) {
        this.journal = journal;
        this.desc.value = journal.desc;
        this.jml.value = journal.jumlah + '';
        this.tgl.value = journal.date2Input();
        this.show();
    }
}
