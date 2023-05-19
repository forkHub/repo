import { Util } from "./Util.js";
import { Akun } from "./Akun.js";
import { JournalRow } from "./JournalRow.js";
export class Baru {
    constructor() {
        this.el = null;
        this.okTbl = null;
        this.desc = null;
        this.jml = null;
        this.el = document.querySelector('template').content.querySelector('div.form-baru').cloneNode(true);
        this.okTbl = Util.getEl(this.el, "button.ok");
        this.okTbl.onclick = this.okClick.bind(this);
        this.desc = Util.getEl(this.el, "textarea.deskripsi");
        this.jml = Util.getEl(this.el, 'input.jml');
    }
    init() {
        this.db = Akun.inst.db;
        // this.desc.onfocus = () => {
        // 	this.desc.select();
        // }
        // this.jml.onfocus = () => {
        // 	this.jml.select();
        // }
    }
    okClick() {
        let journal;
        let dialog = Akun.inst.dialog;
        if (!(parseInt(this.jml.value) > 0)) {
            dialog.setAsOK();
            dialog.show();
            dialog.teks = 'Jumlah harus diisi dengan benar!';
            return;
        }
        if (this.desc.value == '') {
            dialog.setAsOK();
            dialog.show();
            dialog.teks = 'Deskripsi tidak boleh kosong !';
            return;
        }
        journal = new JournalRow();
        journal.desc = this.desc.value;
        journal.jumlah = parseInt(this.jml.value);
        this.db.insert(journal);
        Akun.inst.lapSemua.refresh();
        Akun.inst.simpan();
        this.desc.value = '';
        this.jml.value = '';
    }
    attach(cont) {
        cont.appendChild(this.el);
    }
    update() {
    }
}
