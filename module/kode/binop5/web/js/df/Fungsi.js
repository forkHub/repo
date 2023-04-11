"use strict";
var df;
(function (df) {
    class HalDeklarasiFungsi extends ha.comp.BaseComponent {
        constructor() {
            super();
            this.menu = new ha.comp.MenuPopup();
            this.pilihStmt = new ha.comp.MenuPopup();
            this._elHtml = this.getTemplate("div.hal-fungsi-dek");
            this.menuTbl.onclick = (e) => {
                e.stopPropagation();
                this.menu.view.attach(document.body);
            };
            this.setupMenu();
            this.setupMenuPilihStmt();
        }
        set item(value) {
            this._item = value;
        }
        buatParamObj(nama, indukId, prevIdx) {
            let hasil;
            hasil = {
                id: ha.comp.Util.id(),
                nama: nama,
                indukId: indukId,
                type: TY_PARAM,
                prevIdx: prevIdx
            };
            return hasil;
        }
        tampil() {
            data.variableAr.forEach((item) => {
                if (item.indukId == this._item.id) {
                    let itemView;
                    itemView = new ItemVar(item);
                    itemView.attach(this.daftarVar);
                }
            });
            data.paramAr.forEach((item) => {
                if (item.indukId == this._item.id) {
                    let itemView;
                    itemView = new ItemParam(item);
                    itemView.attach(this.daftarParam);
                }
            });
            data.stmtAr.forEach((item) => {
                if (item.stmtType == STMT_VAR_ISI) {
                }
                else {
                }
            });
        }
        setupMenuPilihStmt() {
            this.pilihStmt.buatTombol({
                label: 'name (arg1, arg2)',
                f: () => {
                    let obj = {
                        id: ha.comp.Util.id(),
                        indukId: this._item.id,
                        nama: 'fungsi',
                        prevIdx: 0,
                        refFungsiIdx: 0,
                        stmtType: STMT_PANGGIL_FUNGSI,
                        type: TY_STMT,
                    };
                    obj;
                }
            });
            this.pilihStmt.buatTombol({
                label: 'nama = exp',
                f: () => {
                    let obj = {
                        id: ha.comp.Util.id(),
                        indukId: this._item.id,
                        nama: '',
                        prevIdx: 0,
                        refVarId: 0,
                        refExpId: 0,
                        stmtType: STMT_VAR_ISI,
                        type: TY_STMT
                    };
                    let view = new ItemVarIsi(obj);
                    view.attach(this.daftarStmt);
                    data.stmtAr.push(obj);
                    data.simpan();
                }
            });
        }
        setupMenu() {
            this.menu.buatTombol({
                label: 'var',
                f: () => {
                    let nama;
                    nama = window.prompt('Nama variable: ');
                    if (nama) {
                        let varObj = data.halModul.buatVarObj(nama, this._item.id);
                        let view;
                        view = new ItemVar(varObj);
                        view.attach(this.daftarVar);
                        data.variableAr.push(varObj);
                        data.simpan();
                    }
                }
            });
            this.menu.buatTombol({
                label: 'param',
                f: () => {
                    let nama = window.prompt('nama parameter:');
                    if (nama) {
                        let paramObj = this.buatParamObj(nama, this._item.id, 0);
                        let paramView = new ItemParam(paramObj);
                        paramView.attach(this.daftarParam);
                        data.paramAr.push(paramObj);
                        data.simpan();
                    }
                }
            });
            this.menu.buatTombol({
                label: 'stmt',
                f: () => {
                    this.menu.view.detach();
                    this.pilihStmt.view.attach(document.body);
                }
            });
        }
        get daftarParam() {
            return this.getEl('div.daftar-param');
        }
        get daftarVar() {
            return this.getEl('div.daftar-var');
        }
        get daftarStmt() {
            return this.getEl('div.daftar-stmt');
        }
        get menuTbl() {
            return this.getEl('div.menu button');
        }
    }
    df.HalDeklarasiFungsi = HalDeklarasiFungsi;
})(df || (df = {}));
