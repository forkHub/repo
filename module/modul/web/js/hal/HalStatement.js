"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul) {
        class HalStatement {
            tampil() {
                this.daftarView = ha.comp.Util.getEl('halaman daftar');
                sessionObj.idDipilih = sessionObj.daftarModul[0].id;
                this.render();
                modul.menu.ganti(KONTEK_MODUL, ha.comp.Util.getEl('menu'));
            }
            render() {
                console.group('render, jml ' + sessionObj.daftarModul.length);
                while (this.daftarView.firstChild) {
                    this.daftarView.removeChild(this.daftarView.firstChild);
                }
                sessionObj.daftarModul.forEach((item) => {
                    if (item.view)
                        item.view.detach();
                    let view = new modul.ItemView();
                    view.judul.innerHTML = item.nama;
                    view.attach(this.daftarView);
                    item.view = view;
                    if (sessionObj.idDipilih == item.id) {
                        view.dipilih();
                    }
                    item.view.elHtml.onclick = () => {
                        sessionObj.daftarModul.forEach((item) => {
                            item.view.tidakDipilih();
                        });
                        item.view.dipilih();
                        sessionObj.idDipilih = item.id;
                    };
                });
                console.groupEnd();
            }
        }
        modul.halStatement = new HalStatement();
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
