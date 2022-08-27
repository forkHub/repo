"use strict";
class HalModule extends ha.comp.BaseComponent {
    constructor() {
        super();
        this._elHtml = this.getTemplate('div.modul-cont div.hal-modul');
        this.setupTombol();
        this.setupMenu();
    }
    setupMenu() {
        this.menu = new ha.comp.MenuPopup();
        this.menu.buatTombol(this.buatTombolTambahVar());
        this.menu.buatTombol({
            label: 'modul',
            f: () => {
                let nama = window.prompt('Nama Modul');
                if (nama) {
                    let modulObj = this.buatModulObj(nama, 0);
                    this.renderModul(modulObj);
                    data.modulAr.push(modulObj);
                    data.simpan();
                }
            }
        });
        this.menu.buatTombol({
            label: 'deklarasi fungsi',
            f: () => {
                let nama = window.prompt('Nama Fungsi');
                if (nama) {
                    let fungObj = this.buatDekFungsiObj(nama, 0);
                    this.renderDekFungsi(fungObj);
                    data.dekFungsiAr.push(fungObj);
                    data.simpan();
                }
            }
        });
    }
    setupTombol() {
        this.menuTbl.onclick = (e) => {
            e.stopPropagation();
            this.menu.view.attach(document.body);
        };
    }
    buatTombolTambahVar() {
        let tombol;
        tombol = {
            label: 'var',
            f: () => {
                let nama;
                nama = window.prompt('Nama:');
                if (nama) {
                    let variable;
                    variable = this.buatVarObj(nama, 0);
                    this.renderVar(variable);
                    data.variableAr.push(variable);
                    data.simpan();
                }
            }
        };
        return tombol;
    }
    renderVar(variable) {
        let view;
        view = new ItemVar(variable);
        view.attach(this.variable);
    }
    renderModul(modul) {
        let view;
        view = new ItemModul(modul);
        view.attach(this.modul);
    }
    renderDekFungsi(fung) {
        let view;
        view = new ItemDekFungsi(fung);
        view.attach(this.modul);
    }
    buatVarObj(nama, indukId) {
        let hasil;
        hasil = {
            id: ha.comp.Util.id(),
            nama: nama,
            indukId: indukId,
            type: TY_VARIABLE,
        };
        return hasil;
    }
    buatModulObj(nama, indukId) {
        return {
            id: ha.comp.Util.id(),
            indukId: indukId,
            nama: nama,
            type: TY_MODUL
        };
    }
    buatDekFungsiObj(nama, indukId) {
        return {
            id: ha.comp.Util.id(),
            indukId: indukId,
            nama: nama,
            type: TY_DEK_FUNGSI
        };
    }
    get menuTbl() {
        return this.getEl('div.menu button');
    }
    get modul() {
        return this.getEl('div.modul');
    }
    get variable() {
        return this.getEl('div.var');
    }
    get deklarasiFungsi() {
        return this.getEl('div.dek-fung');
    }
}
