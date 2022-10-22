"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul) {
        class Session {
            constructor() {
                this.key = "ha.mobile.editor";
            }
            daftarVarObj() {
                let hasil = [];
                sessionObj.daftarVar.forEach((item) => {
                    hasil.push({
                        id: item.id,
                        modul: item.modul,
                        nama: item.nama,
                        tipe: item.tipe,
                        view: null
                    });
                });
                return hasil;
            }
            daftarModulObj() {
                let hasil = [];
                sessionObj.daftarModul.forEach((item) => {
                    hasil.push({
                        id: item.id,
                        modul: item.modul,
                        nama: item.nama,
                        tipe: item.tipe,
                        view: null
                    });
                });
                return hasil;
            }
            daftarFungsiObj() {
                let hasil = [];
                sessionObj.daftarFungsi.forEach((fungsi) => {
                    hasil.push({
                        id: fungsi.id,
                        modul: fungsi.modul,
                        nama: fungsi.nama,
                        tipe: fungsi.tipe,
                        tipeReturn: fungsi.tipeReturn
                    });
                });
                return hasil;
            }
            toObj() {
                let hasil;
                hasil = {
                    daftarModul: this.daftarModulObj(),
                    daftarVar: this.daftarVarObj(),
                    idDipilih: null,
                    daftarFungsi: this.daftarFungsiObj()
                };
                return hasil;
            }
            simpan() {
                console.group('simpan');
                let dataStr = JSON.stringify(this.toObj());
                window.localStorage.setItem(this.key, dataStr);
                console.groupEnd();
            }
            load() {
                console.log("load session");
                try {
                    let dataStr = window.localStorage.getItem(this.key);
                    let ses;
                    if (!dataStr || dataStr == "") {
                        throw Error('kosong');
                    }
                    ses = JSON.parse(dataStr);
                    return ses;
                }
                catch (e) {
                    console.error(e);
                    return {
                        idDipilih: daftarModul[0].id,
                        daftarModul: daftarModul,
                        daftarVar: [],
                        daftarFungsi: []
                    };
                }
            }
        }
        modul.session = new Session();
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
