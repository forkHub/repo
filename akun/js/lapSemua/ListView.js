import { Akun } from "../Akun.js";
import { BaseComponent2 } from "../BaseComponent2.js";
import { Util } from "../Util.js";
export class ListView {
    constructor() {
        this._list = [];
        this.db = null;
        this._cont = null;
    }
    init() {
        this._cont = Akun.inst.lapSemua.listCont;
        this.db = Akun.inst.db;
    }
    refresh() {
        this.clear();
        for (let i = 0; i < this.db.list.length; i++) {
            let journal = this.db.list[i];
            let item = new Item(journal);
            item.attach(this._cont);
            this._list.push(item);
        }
    }
    update() {
        for (let i = 0; i < this._list.length; i++) {
            let item;
            item = this._list[i];
            item.update();
        }
    }
    clear() {
        while (this._list.length > 0) {
            let item;
            item = this._list.pop();
            item.destroy();
        }
    }
    get itemAktif() {
        return this._itemAktif;
    }
    set itemAktif(value) {
        this._itemAktif = value;
    }
    get list() {
        return this._list;
    }
}
class Item extends BaseComponent2 {
    constructor(journal) {
        super();
        this.desc = null;
        this.jml = null;
        this.tgl = null;
        // this._el = document.querySelector('template').content.querySelector('div.daftar').cloneNode(true) as HTMLElement;
        this._el = Akun.inst.template.daftar;
        // console.log(this._el);/
        this.desc = Util.getEl(this._el, "div.desc");
        this.jml = Util.getEl(this._el, 'div.jml');
        this.tombolCont = Util.getEl(this._el, 'div.cont');
        this.editTbl = this.getEl('button.edit');
        this.hapusTbl = this.getEl('button.hapus');
        this.tgl = this.getEl('p.tgl');
        this.editTbl.onclick = (event) => {
            event.stopPropagation();
            this.editClick();
            ;
        };
        this.hapusTbl.onclick = (event) => {
            event.stopPropagation();
            this.hapusClick();
        };
        this._journal = journal;
        this.update();
        this._el.onclick = this.onClick.bind(this);
    }
    editClick() {
        let edit = Akun.inst.edit;
        // event.stopPropagation();
        edit.edit(this._journal);
        this.hideTombol();
    }
    hapusClick() {
        let db = Akun.inst.db;
        let lapSemua = Akun.inst.lapSemua;
        db.delete(this._journal);
        lapSemua.refresh();
        Akun.inst.simpan();
        this.hideTombol();
    }
    hideTombol() {
        this.tombolCont.style.display = 'none';
    }
    onClick() {
        let display = this.tombolCont.style.display;
        let itemAktif;
        itemAktif = Akun.inst.lapSemua.listView.itemAktif;
        if (itemAktif) {
            itemAktif.hideTombol();
        }
        if (display == 'none' || display == '') {
            this.tombolCont.style.display = 'block';
        }
        else if (this.tombolCont.style.display == 'block') {
            this.hideTombol();
        }
        else {
            // console.log(this.tombolCont.style.display);
            // console.log(this.tombolCont.style);
            throw new Error(this.tombolCont.style.display);
        }
        Akun.inst.lapSemua.listView.itemAktif = this;
    }
    // private tambahTitik(str: string): string {
    // 	let res: string = '';
    // 	let ctr: number = 0;
    // 	for (let i: number = str.length - 1; i >= 0; i--) {
    // 		let char: string;
    // 		char = str.slice(i, i + 1);
    // 		res = char + res;
    // 		ctr++;
    // 		if (ctr % 3 == 0) {
    // 			res = "." + res;
    // 		}
    // 	}
    // 	if (res.slice(0, 1) == ".") {
    // 		res = res.slice(1, res.length);
    // 	}
    // 	return res;
    // }
    update() {
        this.desc.innerText = this._journal.desc;
        this.jml.innerText = Util.tambahTitik((this._journal.jumlah) + '');
        this.tgl.innerText = this._journal.getDateStr();
    }
}
