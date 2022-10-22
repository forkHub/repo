"use strict";
let daftarModul = [
    {
        nama: 'item 1',
        tipe: "modul",
        modul: "",
        id: "0"
    },
    {
        nama: 'item 2',
        tipe: "modul",
        modul: "",
        id: "1"
    }
];
let daftarFungsi = [];
let menuStmt = [
    {
        nama: "tambah var",
        kontek: KONTEK_STMT,
        klik: () => {
            ha.modul.statement.tambahVar();
        },
        view: null
    },
];
let menuModul = [
    {
        nama: "tambah modul",
        kontek: KONTEK_MODUL,
        klik: () => {
            ha.modul.modul.modulBaru();
        },
        view: null
    },
    {
        nama: "tambah var",
        kontek: KONTEK_MODUL,
        klik: () => {
            console.log('tambah var');
            ha.modul.halModul.tambahVar();
        },
        view: null
    },
    {
        nama: "tambah fungsi",
        kontek: KONTEK_MODUL,
        klik: () => {
            console.log('tambah fungsi');
            ha.modul.halModul.tambahFungsi();
        },
        view: null
    },
    {
        nama: "hapus",
        kontek: KONTEK_MODUL,
        klik: () => {
            if (sessionObj.daftarModul.length <= 0) {
                console.log('item kosong');
                return;
            }
            if (sessionObj.idDipilih == null) {
                console.log('tidak ada item dipilih');
                return;
            }
            if (ha.modul.modul.getModul(sessionObj.idDipilih).tipe != TYPE_MODUL) {
                console.log('bukan modul yang dipilih');
                return;
            }
            let konfirm = window.confirm('hapus modul ?');
            if (konfirm) {
                let modul = ha.modul.modul.getModul(sessionObj.idDipilih);
                modul.view.detach();
                ha.modul.modul.hapusModul(modul);
                if (sessionObj.daftarModul.length > 0) {
                    sessionObj.daftarModul[0].view.dipilih();
                    sessionObj.idDipilih = sessionObj.daftarModul[0].id;
                }
                else {
                    sessionObj.idDipilih = null;
                }
                ha.modul.halModul.render();
                ha.modul.session.simpan();
            }
        },
        view: null
    },
    {
        nama: "update",
        kontek: KONTEK_MODUL,
        klik: () => {
            let judul = window.prompt('nama modul:');
            ha.modul.modul.updateModul(judul);
            ha.modul.session.simpan();
            ha.modul.halModul.render();
        },
        view: null
    },
    {
        nama: "masuk",
        kontek: KONTEK_MODUL,
        klik: () => {
            console.log('masuk');
        },
        view: null
    },
];
let menuData = [];
menuData = menuData.concat(menuModul);
menuData = menuData.concat(menuStmt);
let sessionObj = {
    idDipilih: null,
    daftarModul: daftarModul,
    daftarVar: [],
    daftarFungsi: []
};
let blok;
