"use strict";
var ha;
(function (ha) {
    var modul;
    (function (modul) {
        var menu;
        (function (menu_1) {
            function ganti(kontek, cont) {
                let menu = [];
                menu = getMenuByContext(kontek);
                menu.forEach((item) => {
                    item.view = buatTombol(item.nama);
                    item.view.onclick = () => {
                        console.log("item on click");
                        item.klik();
                    };
                    cont.appendChild(item.view);
                });
            }
            menu_1.ganti = ganti;
            function buatTombol(label) {
                let tombol;
                tombol = document.createElement("button");
                tombol.innerText = label;
                return tombol;
            }
            function getMenuByContext(kontek) {
                let hasil = [];
                menuData.forEach((item) => {
                    if (item.kontek == kontek) {
                        hasil.push(item);
                    }
                });
                return hasil;
            }
        })(menu = modul.menu || (modul.menu = {}));
    })(modul = ha.modul || (ha.modul = {}));
})(ha || (ha = {}));
