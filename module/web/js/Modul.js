"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul_1) {
        var modul;
        (function (modul) {
            function tambah() {
                let judul = window.prompt("judul:");
                //tambah item
                daftarModul.push({
                    nama: judul,
                    tipe: "modul",
                    modul: "",
                    // indukId: ""
                });
                //render ulang itemnya
                modul_1.halModul.render();
            }
            modul.tambah = tambah;
            function hapus() {
                if (daftarModul.length <= 0) {
                    console.log('item kosong');
                    return;
                }
                let konfirm = window.confirm('hapus');
                if (konfirm) {
                    //hapus data
                    for (let i = 0; i < daftarModul.length; i++) {
                        if (daftarModul[i] == sessionObj.modulDipilih) {
                            daftarModul.splice(i, 1);
                        }
                    }
                    if (daftarModul.length > 0) {
                        daftarModul[0].view.dipilih();
                        sessionObj.modulDipilih = daftarModul[0];
                    }
                    else {
                        sessionObj.modulDipilih = null;
                    }
                    //render ulang
                    modul_1.halModul.render();
                }
            }
            modul.hapus = hapus;
            function update() {
                if (!sessionObj.modulDipilih)
                    return;
                let judul = window.prompt("judul:");
                sessionObj.modulDipilih.view.judul.innerHTML = judul;
            }
            modul.update = update;
        })(modul = modul_1.modul || (modul_1.modul = {}));
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
