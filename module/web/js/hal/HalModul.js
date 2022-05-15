"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul) {
        class HalModul {
            daftarView;
            tampil() {
                sessionObj = modul.session.load();
                this.daftarView = ha.comp.Util.getEl('halaman daftar');
                sessionObj.modulDipilih = daftarModul[0];
                this.render();
                modul.menu.ganti(KONTEK_MODUL, ha.comp.Util.getEl('menu'));
            }
            render() {
                console.group('render, jml ' + daftarModul.length);
                while (this.daftarView.firstChild) {
                    this.daftarView.removeChild(this.daftarView.firstChild);
                }
                //render item
                daftarModul.forEach((item) => {
                    if (item.view)
                        item.view.detach();
                    let view = new modul.ItemView();
                    view.judul.innerHTML = item.nama;
                    view.attach(this.daftarView);
                    item.view = view;
                    if (sessionObj.modulDipilih == item) {
                        view.dipilih();
                    }
                    // this.items.push(item);
                    //tambahkan item event
                    item.view.elHtml.onclick = () => {
                        //reset pilih
                        daftarModul.forEach((item) => {
                            item.view.tidakDipilih();
                        });
                        //pilih item sekarang
                        item.view.dipilih();
                        sessionObj.modulDipilih = item;
                    };
                });
                console.groupEnd();
            }
        }
        modul.HalModul = HalModul;
        modul.halModul = new HalModul();
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
