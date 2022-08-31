"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul) {
        class TambahVarView extends ha.comp.BaseComponent {
            get namaInput() {
                return this.getEl('input.nama');
            }
            get tblSimpan() {
                return this.getEl('button.simpan');
            }
            get tblBatal() {
                return this.getEl('button.batal');
            }
            get form() {
                return this.getEl('form');
            }
            constructor() {
                super();
                this._elHtml = this.getTemplate('var-baru');
                this.form.onsubmit = () => {
                    try {
                        ha.modul.modul.varBaru(this.namaInput.value, "");
                        modul.halModul.render();
                        blok.style.display = 'none';
                        this.detach();
                        modul.session.simpan();
                    }
                    catch (e) {
                        console.error(e);
                    }
                    return false;
                };
            }
        }
        class TambahFungsiView extends ha.comp.BaseComponent {
            constructor() {
                super();
                this._elHtml = this.getTemplate('fungsi-baru');
                this.form.onsubmit = () => {
                    try {
                        ha.modul.modul.fungsiBaru(this.namaInput.value);
                        modul.halModul.render();
                        blok.style.display = 'none';
                        this.detach();
                    }
                    catch (e) {
                        console.error(e);
                    }
                    return false;
                };
            }
            get namaInput() {
                return this.getEl('input.nama');
            }
            get tblSimpan() {
                return this.getEl('button.simpan');
            }
            get tblBatal() {
                return this.getEl('button.batal');
            }
            get form() {
                return this.getEl('form');
            }
        }
        class HalModul {
            constructor() {
                this.tambahVarView = new TambahVarView();
                this.tambahFungsiView = new TambahFungsiView();
            }
            tambahVar() {
                blok.style.display = 'block';
                this.tambahVarView.attach(document.body);
            }
            tambahFungsi() {
                blok.style.display = 'block';
                this.tambahFungsiView.attach(document.body);
            }
            tampil() {
                this.daftarModulView = ha.comp.Util.getEl('halaman daftar-modul');
                this.daftarVarView = ha.comp.Util.getEl('halaman daftar-var');
                this.daftarFungsiView = ha.comp.Util.getEl('halaman daftar-fungsi');
                this.renderModul();
                this.renderVar();
                modul.menu.ganti(KONTEK_MODUL, this.menu);
                sessionObj.idDipilih = sessionObj.daftarModul[0].id;
            }
            render() {
                this.renderModul();
                this.renderVar();
                this.renderFungsi();
            }
            resetPilihan() {
                sessionObj.daftarVar.forEach((item) => {
                    item.view.tidakDipilih();
                });
                sessionObj.daftarModul.forEach((item) => {
                    item.view.tidakDipilih();
                });
            }
            renderFungsi() {
                this.daftarFungsiView;
            }
            renderVar() {
                console.group('render var, jml ' + sessionObj.daftarVar.length);
                while (this.daftarVarView.firstChild) {
                    this.daftarVarView.removeChild(this.daftarVarView.firstChild);
                }
                sessionObj.daftarVar.forEach((item) => {
                    let view = new modul.ItemView();
                    view.judul.innerHTML = item.nama;
                    view.attach(this.daftarVarView);
                    item.view = view;
                    if (sessionObj.idDipilih == item.id) {
                        view.dipilih();
                    }
                    item.view.elHtml.onclick = () => {
                        this.resetPilihan();
                        item.view.dipilih();
                        sessionObj.idDipilih = item.id;
                    };
                });
                console.groupEnd();
            }
            renderModul() {
                console.group('render modul, jml ' + sessionObj.daftarModul.length);
                while (this.daftarModulView.firstChild) {
                    this.daftarModulView.removeChild(this.daftarModulView.firstChild);
                }
                sessionObj.daftarModul.forEach((item) => {
                    let view = new modul.ItemView();
                    view.judul.innerHTML = item.nama;
                    view.attach(this.daftarModulView);
                    item.view = view;
                    if (sessionObj.idDipilih == item.id) {
                        view.dipilih();
                    }
                    item.view.elHtml.onclick = () => {
                        this.resetPilihan();
                        item.view.dipilih();
                        sessionObj.idDipilih = item.id;
                    };
                });
                console.groupEnd();
            }
            get menu() {
                return ha.comp.Util.getEl('menu');
            }
        }
        modul.HalModul = HalModul;
        modul.halModul = new HalModul();
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
