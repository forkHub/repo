"use strict";
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class BaseComponent {
            _template = '';
            _elHtml = document.createElement('div');
            _parent;
            async loadTemplate(f) {
                let http = await comp.Util.Ajax('get', f, '');
                if (200 == http.status) {
                    return http.responseText;
                }
                else {
                    throw new Error(http.responseText);
                }
            }
            destroy() {
                this.detach();
                while (this._elHtml.firstChild) {
                    this._elHtml.removeChild(this._elHtml.firstChild);
                }
                this._elHtml = null;
            }
            attach(parent) {
                parent.appendChild(this._elHtml);
                this._parent = parent;
            }
            detach() {
                if (this._elHtml.parentElement) {
                    this._elHtml.parentElement.removeChild(this._elHtml);
                    return true;
                }
                return false;
            }
            getEl(query) {
                let el;
                el = this._elHtml.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(this._elHtml);
                    console.log(query);
                    throw new Error('query not found ');
                }
            }
            build(temp = '') {
                let div = document.createElement('div');
                let el;
                if (temp && temp != '') {
                    this._template = temp;
                }
                div.innerHTML = this._template;
                el = div.firstElementChild;
                this._elHtml = el;
                if (!this._elHtml) {
                    console.log(div);
                    console.log(this._template);
                    throw new Error('');
                }
            }
            getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
            }
            get elHtml() {
                return this._elHtml;
            }
        }
        comp.BaseComponent = BaseComponent;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
class HalDepan extends ha.comp.BaseComponent {
    static instObj;
    _listCont;
    cariEl;
    tambahTbl;
    kosong;
    get listCont() {
        return this._listCont;
    }
    constructor() {
        super();
        this._template = `
            <div class='hal-depan padding'>
                <h1>Catatan:</h1>
                <div class='padding'></div>
                <div class='cari-catatan'>
                    <input type='text' class='width-12 cari-note padding border-radius-16' placeholder='cari catatan'>
                </div>
                <div class='padding'></div>
                <div class='list-cont'>
                </div>
            </div>
        `;
        this.build();
        this._listCont = this.getEl('div.list-cont');
        this.cariEl = this.getEl('input.cari-note');
        this.listCont.style.paddingBottom = '72px';
        this.tambahTbl = new TambahTbl(() => {
            this.tambahKlik();
        });
        this.tambahTbl.attach(this._elHtml);
        this.kosong = new Kosong();
        this.kosong.attach(this.listCont);
        this.cariEl.oninput = () => {
            if (this.cariEl.value.length > 0) {
                NoteItem.filter(this.cariEl.value);
            }
            else {
                NoteItem.filterHapus();
            }
            this.updateKosong();
        };
    }
    tambahKlik() {
        console.log('tambah note');
        let note;
        note = Note.buat(Date.now(), '', '');
        HalDepan.inst.detach();
        HalEdit.Inst.edit(note, () => {
            Note.push(note);
            simpan();
            NoteItem.buat(note).attach(this.listCont);
            HalDepan.inst.attach(document.body);
            HalDepan.inst.updateKosong();
        }, () => {
            HalDepan.inst.attach(document.body);
            HalDepan.inst.updateKosong();
        });
    }
    itemKlik(item) {
        HalDepan.inst.detach();
        let copy = Note.clone(item.item);
        HalEdit.Inst.edit(copy, () => {
            item.item.isi = copy.isi;
            item.item.judul = copy.judul;
            item.refresh();
            HalDepan.inst.attach(document.body);
            simpan();
        }, () => {
            HalDepan.inst.attach(document.body);
        });
    }
    updateKosong() {
        this.kosong.update();
    }
    static get inst() {
        if (this.instObj)
            return this.instObj;
        this.instObj = new HalDepan();
        return this.instObj;
    }
}
class HalEdit extends ha.comp.BaseComponent {
    static instObj;
    judulEl;
    isiEl;
    backTbl;
    selesai;
    batal;
    note;
    simpanTbl;
    batalTbl;
    constructor() {
        super();
        this._template = `
            <div class='disp-flex flex-dir-col min-height-12 padding'>
                <div class='edit-note disp-table'>
                    <button type='button' class='disp-cell white-space-no-wrap kembali'>&larr;</button>
                    <div class='disp-cell width-12 padding-kiri'>Edit Note</div>
                </div>
                <div class='padding'></div>
                <div class='disp-flex flex-dir-col flex-grow-1'>
                    <label for='judul'>Judul:</label>
                    <input type='text' name='judul' class='judul padding'/>
                    <div class='padding'></div>
                    <label for='judul'>Isi:</label>
                    <textarea class='flex-grow-1 isi padding' name='isi' rows='20' cols='80'/></textarea>
                    <div class='disp-table padding'>
                        <div class='disp-cell text-align-center'>
                            <button class='simpan'>simpan</button>
                        </div>
                        <div class='disp-cell text-align-center'>
                            <button class='batal'>batal</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.build();
        this.judulEl = this.getEl('input.judul');
        this.isiEl = this.getEl('textarea.isi');
        this.backTbl = this.getEl('button.kembali');
        this.simpanTbl = this.getEl('button.simpan');
        this.batalTbl = this.getEl('button.batal');
        this.judulEl.onchange = () => {
            this.note.judul = this.judulEl.value;
        };
        this.isiEl.onchange = () => {
            this.note.isi = this.isiEl.value;
        };
        this.backTbl.onclick = () => {
            this.klikBack();
        };
        this.batalTbl.onclick = () => {
            this.klikBack();
        };
        this.simpanTbl.onclick = () => {
            this.detach();
            this.selesai();
        };
    }
    klikBack() {
        this.detach();
        this.batal();
    }
    static get Inst() {
        if (this.instObj)
            return this.instObj;
        this.instObj = new HalEdit();
        return this.instObj;
    }
    updateView() {
        this.judulEl.value = this.note.judul;
        this.isiEl.value = this.note.isi;
    }
    edit(note, ok, batal) {
        this.note = note;
        this.updateView();
        this.selesai = ok;
        this.batal = batal;
        this.attach(document.body);
    }
}
window.onload = () => {
    HalDepan.inst.attach(document.body);
    load();
};
function simpan() {
    window.localStorage.setItem('ha.note.data', JSON.stringify(Note.slice()));
}
function load() {
    Note.hapusSemua();
    NoteItem.hapusSemua();
    try {
        let str;
        str = window.localStorage.getItem('ha.note.data');
        if (str) {
            let note = JSON.parse(str);
            note.forEach((item) => {
                Note.push(item);
                NoteItem.buat(item).attach(HalDepan.inst.listCont);
            });
        }
        else {
            console.log('data belum ada');
        }
    }
    catch (e) {
        console.error(e);
        ha.comp.dialog.tampil('Ada kesalahan');
    }
    HalDepan.inst.updateKosong();
}
class Kosong extends ha.comp.BaseComponent {
    constructor() {
        super();
        this._template = `
            <div class='kosong padding'>
                Tidak Ada Data
            </div>
        `;
        this.build();
    }
    update() {
        if (NoteItem.checkKosong()) {
            this.elHtml.style.display = 'block';
        }
        else {
            this.elHtml.style.display = 'none';
        }
    }
}
class Note {
    static daftarNote = [];
    static buat(tgl, judul, isi) {
        let hasil;
        hasil = {
            id: Id.id,
            tgl: tgl,
            judul: judul,
            isi: isi
        };
        return hasil;
    }
    static push(note) {
        this.daftarNote.push(note);
    }
    static clone(note) {
        return {
            id: note.id,
            judul: note.judul,
            isi: note.isi,
            tgl: note.tgl
        };
    }
    static get(id) {
        let hasil;
        this.daftarNote.forEach((item) => {
            if (item.id == id) {
                hasil = item;
            }
        });
        return hasil;
    }
    static hapus(id) {
        this.daftarNote.forEach((item, idx) => {
            if (item.id == id) {
                this.daftarNote.splice(idx, 1);
                return;
            }
        });
    }
    static filter(note, teks) {
        if (note.judul.indexOf(teks) > -1)
            return true;
        if (note.isi.indexOf(teks) > -1)
            return true;
        return false;
    }
    static jml() {
        return this.daftarNote.length;
    }
    static hapusSemua() {
        while (this.daftarNote.length > 0) {
            this.daftarNote.pop();
        }
    }
    static slice() {
        return this.daftarNote.slice();
    }
}
class NoteItem extends ha.comp.BaseComponent {
    _item;
    get item() {
        return this._item;
    }
    tglEl;
    judulEl;
    hapusTbl;
    static daftar = [];
    timer;
    downTime;
    constructor(item) {
        super();
        this._template = `
            <div class='note-item padding user-select-none'>
                <div class='tgl text-align-right'></div>
                <div class='disp-flex'>
                    <div class='judul flex-grow-1 disp-flex align-items-center'></div>
                    <div class='tbl'>
                        <button class='hapus'>🗑</edit>
                    </div>
                </div>
            </div>
        `;
        this.build();
        this.tglEl = this.getEl('div.tgl');
        this.judulEl = this.getEl('div.judul');
        this.hapusTbl = this.getEl('button.hapus');
        this.tglEl.style.fontSize = 'smaller';
        this._item = item;
        this.refresh();
        this._elHtml.onpointerdown = (e) => {
            e.stopPropagation();
            this.timer = setTimeout(() => {
                console.log('on hold event');
                this._elHtml.setAttribute('fase', 'idle');
            }, 1000);
            this.downTime = Date.now();
            console.log('down');
            this._elHtml.setAttribute('fase', 'pencet');
        };
        this._elHtml.onpointerup = (e) => {
            e.stopPropagation();
            clearTimeout(this.timer);
            if ((Date.now() - this.downTime) > 500) {
                console.log('click cancel');
                this._elHtml.setAttribute('fase', 'idle');
            }
            else {
                this._elHtml.setAttribute('fase', 'click');
                this.klik();
            }
        };
        this._elHtml.onclick = () => {
            console.log('on click');
        };
        this.hapusTbl.onclick = (e) => {
            e.stopPropagation();
            let ok = window.confirm('Hapus?');
            if (ok) {
                Note.hapus(this.item.id);
                NoteItem.hapus(this.item);
                this._item = null;
                this.destroy();
                simpan();
                HalDepan.inst.updateKosong();
            }
        };
    }
    klik() {
        HalDepan.inst.detach();
        let copy = Note.clone(this.item);
        HalEdit.Inst.edit(copy, () => {
            this.item.isi = copy.isi;
            this.item.judul = copy.judul;
            this.refresh();
            HalDepan.inst.attach(document.body);
            simpan();
        }, () => {
            HalDepan.inst.attach(document.body);
        });
    }
    static checkKosong() {
        if (this.daftar.length == 0)
            return true;
        for (let i = 0; i < this.daftar.length; i++) {
            if (this.daftar[i].elHtml.style.display != 'none') {
                return false;
            }
        }
        return true;
    }
    refresh() {
        this.tglEl.innerText = this.renderTanggal(this.item.tgl);
        this.judulEl.innerText = this.item.judul;
    }
    renderTanggal(n) {
        let date = new Date(n);
        return (date.getDate() + 1) + '/' + date.getMonth() + '/' + date.getFullYear();
    }
    static hapus(item) {
        this.daftar.forEach((view, idx) => {
            if (view.item == item) {
                this.daftar.splice(idx, 1);
            }
        });
    }
    static buat(item) {
        let hasil;
        hasil = new NoteItem(item);
        this.daftar.push(hasil);
        return hasil;
    }
    static filter(teks) {
        this.daftar.forEach((view) => {
            if (!Note.filter(view.item, teks)) {
                view.elHtml.style.display = 'none';
            }
            else {
                view.elHtml.style.display = 'block';
            }
        });
    }
    static filterHapus() {
        this.daftar.forEach((view) => {
            view.elHtml.style.display = 'block';
        });
    }
    static hapusSemua() {
        while (this.daftar.length > 0) {
            let item = this.daftar.pop();
            item._item = null;
            item.destroy();
        }
    }
}
class TambahTbl extends ha.comp.BaseComponent {
    constructor(klik) {
        super();
        this._template = `
            <div class='tambah-user-tbl user-select-none cursor-pointer'>+</div>
        `;
        this.build();
        this._elHtml.onclick = (e) => {
            e.stopPropagation();
            klik();
        };
    }
}
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Dialog extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='comp dialog'>
					<div class='box'>
						<p class='deskripsi'>Contoh dialog </p>
						<button class="btn btn-primary ok">OK</button>
					</div>
				</div>
				`;
                this.build();
            }
            init() {
                this.detach();
            }
            tampil(pesan = '', def = true) {
                ha.comp.Util.stackTrace();
                this.p.innerHTML = pesan;
                if (def) {
                    this.okTbl.onclick = () => {
                        this.detach();
                    };
                }
                this.attach(document.body);
                this._elHtml.style.display = 'block';
            }
            get okTbl() {
                return this.getEl('button.ok');
            }
            get p() {
                return this.getEl('p');
            }
        }
        comp.dialog = new Dialog();
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
class Id {
    static _base = 0;
    static get id() {
        if (this._base <= 0) {
            this._base = ha.comp.Util.id();
        }
        this._base = this._base + 2;
        return this._base;
    }
}
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Loading extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='loading'>
					<div class='box'>
						<img src=''/>
						<p>Memuat</p> 
					</div>
				</div>
			`;
                this.build();
            }
            tampil() {
                console.log('loading tampil');
                this.attach(document.body);
            }
        }
        comp.loading = new Loading();
        console.log('exporting loading: ' + comp.loading);
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuKontek {
            view = new View();
            constructor() {
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.style.display = 'inline-block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.elHtml.appendChild(button);
            }
        }
        comp.MenuKontek = MenuKontek;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-context'>
				</div>
			`;
                this.build();
                this._elHtml.style.wordBreak = 'no-wrap';
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class MenuPopup {
            view = new View();
            constructor() {
            }
            destroy() {
                this.view.destroy();
            }
            buatTombol2(t) {
                t.forEach((item) => {
                    this.buatTombol(item);
                });
            }
            buatTombol(t) {
                let button = document.createElement('button');
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.style.display = 'block';
                button.style.margin = 'auto';
                button.style.marginBottom = '8px';
                button.textContent = t.label;
                button.onclick = (e) => {
                    e.stopPropagation();
                    this.view.detach();
                    t.f();
                };
                this.view.box.appendChild(button);
            }
        }
        comp.MenuPopup = MenuPopup;
        class View extends comp.BaseComponent {
            constructor() {
                super();
                this._template = `
				<div class='menu-popup' style="position:fixed; top:0px; left:0px; right:0px; bottom:0px; z-index:1000; background-color: rgba(0,0,0,.3)">
					<div class='box cont' style="position:fixed; bottom:0px; left:0px; right:0px">
					</div>
				</div>
			`;
                this.build();
                this.box.style.backgroundColor = 'white';
                this.box.style.padding = '8px';
                this.box.style.textAlign = 'center';
                this._elHtml.onclick = () => {
                    this.detach();
                };
            }
            get box() {
                return this.getEl('div.box.cont');
            }
        }
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Util {
            static sUserId = 'user_id';
            static sLevel = 'level';
            static sFilter = 'filter';
            static storageId = 'xyz.hagarden.tugas';
            static createEl(str) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = str;
                el = div.firstElementChild;
                if (!el) {
                    console.log(div);
                    console.log(str);
                    throw new Error('');
                }
                return el;
            }
            static getTemplate(query) {
                try {
                    let template = document.body.querySelector('template').content;
                    return template.querySelector(query).cloneNode(true);
                }
                catch (e) {
                    console.log('template:' + query);
                    throw Error(e);
                }
            }
            static getEl(query, parent = null, err = true) {
                let el;
                if (!parent)
                    parent = document.body;
                el = parent.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(parent);
                    console.log(query);
                    if (err) {
                        throw new Error('query not found ');
                    }
                    else {
                        return null;
                    }
                }
            }
            static id() {
                return Date.now();
            }
            static async delay(m = 10) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, m);
                });
            }
            static stackTrace() {
                try {
                    throw Error('');
                }
                catch (e) {
                    console.error(e);
                }
            }
            static bersihDiv(div) {
                while (div.firstChild) {
                    div.removeChild(div.firstChild);
                }
            }
            static error(e) {
                console.error(e);
                comp.dialog.tampil(e.message);
            }
            static kirimWa(teks) {
                return "whatsapp://send?text=" + teks;
            }
            static getUrl(url, params) {
                let urlHasil = url;
                console.group('get url');
                console.log('url: ' + url);
                console.log('params: ' + JSON.stringify(params));
                params.forEach((item) => {
                    console.log('reg: ' + urlHasil.search(/\:[a-zA-Z_0-9]+/));
                    urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
                    console.log('item: ' + item);
                    console.log('url: ' + urlHasil);
                });
                console.log('url hasil: ' + urlHasil);
                console.groupEnd();
                return urlHasil;
            }
            static build(temp) {
                let div = document.createElement('div');
                let el;
                div.innerHTML = temp;
                el = div.firstElementChild;
                if (!el) {
                    console.log(div);
                    console.log(temp);
                    throw new Error('');
                }
                return el;
            }
            static async AjaxLogin(type, urlServer, dataStr, loginUrl, pf = null) {
                let xml;
                xml = await this.Ajax(type, urlServer, dataStr, pf);
                if (401 == xml.status) {
                    window.top.location.href = loginUrl;
                    return null;
                }
                else {
                    return xml;
                }
            }
            static async Ajax2(type, url, dataStr, pf = null) {
                let x = await this.Ajax(type, url, dataStr, pf);
                if (x.status == 200 || x.status == 0) {
                    return x.responseText;
                }
                console.log('error status code: ' + x.status);
                throw Error(x.responseText);
            }
            static async Ajax(type, url, dataStr, pf = null) {
                return new Promise((resolve, reject) => {
                    try {
                        console.group('send data');
                        console.log("type " + type);
                        comp.loading.attach(document.body);
                        let xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            comp.loading.detach();
                            resolve(xhr);
                        };
                        xhr.onerror = (e) => {
                            console.log('xhr error');
                            console.log(e);
                            comp.loading.detach();
                            reject(new Error(e.message));
                        };
                        xhr.onprogress = (p) => {
                            if (pf) {
                                pf(p);
                            }
                        };
                        xhr.open(type, url + "", true);
                        xhr.setRequestHeader('Content-type', 'application/json');
                        xhr.send(dataStr);
                        console.groupEnd();
                    }
                    catch (e) {
                        console.log('Util error');
                        console.log(e);
                        comp.loading.detach();
                        reject(new Error(e.message));
                    }
                });
            }
        }
        comp.Util = Util;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
