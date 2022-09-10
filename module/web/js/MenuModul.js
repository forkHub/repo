"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul) {
        class MenuModul {
            get tblTambah() {
                return ha.comp.Util.getEl('button.tambah');
            }
            get blHapus() {
                return ha.comp.Util.getEl('button.hapus');
            }
            get tblUpdate() {
                return ha.comp.Util.getEl('button.update');
            }
            get tblSub() {
                return ha.comp.Util.getEl('button.sub');
            }
            constructor() {
            }
            init() {
                //klik sub
                this;
                //klik update
                this.tblUpdate.onclick = () => {
                    if (!itemDipilih)
                        return;
                    let judul = window.prompt("judul:");
                    itemDipilih.view.judul.innerHTML = judul;
                };
                //tambah click
                this.tblTambah.onclick = () => {
                    let judul = window.prompt("judul:");
                    //tambah item
                    daftarModul.push({
                        nama: judul,
                        tipe: "modul",
                        modul: "",
                        // indukId: ""
                    });
                    //render ulang itemnya
                    modul.halModul.render();
                };
                //hapus click
                this.blHapus.onclick = () => {
                    if (daftarModul.length <= 0) {
                        console.log('item kosong');
                        return;
                    }
                    let konfirm = window.confirm('hapus');
                    if (konfirm) {
                        //hapus data
                        for (let i = 0; i < daftarModul.length; i++) {
                            if (daftarModul[i] == itemDipilih) {
                                daftarModul.splice(i, 1);
                            }
                        }
                        if (daftarModul.length > 0) {
                            daftarModul[0].view.dipilih();
                            itemDipilih = daftarModul[0];
                        }
                        else {
                            itemDipilih = null;
                        }
                        //render ulang
                        modul.halModul.render();
                    }
                };
            }
        }
        modul.menuModul = new MenuModul();
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
