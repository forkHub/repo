let daftarModul: IModul[] = [
    {
        nama: 'item 1',
        tipe: "modul",
        modul: "",
    },
    {
        nama: 'item 2',
        tipe: "modul",
        modul: "",
    }
];

let menuStmt: IMenu[] = [
    {
        nama: "tambah var",
        kontek: KONTEK_STMT,
        klik: () => {
            ha.modul.statement.tambahVar();
        },
        view: null
    },

]

let menuModul: IMenu[] = [
    {
        nama: "tambah",
        kontek: KONTEK_MODUL,
        klik: () => {
            ha.modul.modul.tambah();
        },
        view: null
    },
    {
        nama: "hapus",
        kontek: KONTEK_MODUL,
        klik: () => {
            ha.modul.modul.hapus();
        },
        view: null
    },
    {
        nama: "update",
        kontek: KONTEK_MODUL,
        klik: () => {
            ha.modul.modul.hapus();
        },
        view: null
    },
    {
        nama: "statement",
        kontek: KONTEK_MODUL,
        klik: () => {
            ha.modul.statement.tambahVar();
        },
        view: null
    },
]

let menuData: IMenu[] = []

menuData = menuData.concat(menuModul);
menuData = menuData.concat(menuStmt);

// let itemDipilih: IItem;
let daftarVariable: IVar[] = [];

let sessionObj: ISession = {
    modulDipilih: null
}

