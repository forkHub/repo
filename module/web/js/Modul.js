"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul_1) {
        var modul;
        (function (modul_2) {
            function getModul(id) {
                let hasil;
                for (let i = 0; i < sessionObj.daftarModul.length; i++) {
                    if (sessionObj.daftarModul[i].id == id) {
                        hasil = sessionObj.daftarModul[i];
                        return hasil;
                    }
                }
                return null;
            }
            modul_2.getModul = getModul;
            function varBaru(nama, type) {
                let varObj;
                console.group('tambah variable, nama: ' + nama);
                varObj = {
                    modul: "",
                    nama: nama,
                    tipe: TYPE_VAR,
                    view: null,
                    id: (new Date()).getTime() + ''
                };
                type;
                sessionObj.daftarVar.push(varObj);
                console.groupEnd();
            }
            modul_2.varBaru = varBaru;
            function modulBaru() {
                let judul = window.prompt("judul:");
                sessionObj.daftarModul.push({
                    nama: judul,
                    tipe: "modul",
                    modul: "",
                    id: (new Date()).getTime() + ''
                });
                modul_1.session.simpan();
                modul_1.halModul.render();
            }
            modul_2.modulBaru = modulBaru;
            function hapusModul(modul) {
                for (let i = 0; i < sessionObj.daftarModul.length; i++) {
                    if (sessionObj.daftarModul[i] == modul) {
                        sessionObj.daftarModul.splice(i, 1)[0];
                    }
                }
            }
            modul_2.hapusModul = hapusModul;
            function updateModul(judul) {
                if (!sessionObj.idDipilih)
                    return;
                getModul(sessionObj.idDipilih).nama = judul;
            }
            modul_2.updateModul = updateModul;
            function fungsiBaru(nama) {
                sessionObj.daftarFungsi.push({
                    id: (new Date()).getTime() + "",
                    nama: nama,
                    tipe: TYPE_FUNGSI,
                    tipeReturn: "string",
                    modul: ""
                });
            }
            modul_2.fungsiBaru = fungsiBaru;
        })(modul = modul_1.modul || (modul_1.modul = {}));
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
