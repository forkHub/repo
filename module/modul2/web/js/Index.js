const VARIABLE = 'variable';
const FUNGSI = 'fungsi';
const MODUL = 'modul';
function buatDefault() {
    Modul.buat('utama');
    Data.simpan();
    Kontek.modulId = Modul.daftar[0].id;
}
//init
try {
    Data.load();
    Modul.load(Data.data);
    Fungsi.load(Data.data);
    Variable.load(Data.data);
    if (Modul.daftar.length > 0) {
        Kontek.modulId = Modul.daftar[0].id;
    }
    else {
        buatDefault();
    }
    HalModul.load();
    HalModul.init();
}
catch (e) {
    console.log(e);
    //buat baru
    buatDefault();
    HalModul.load();
    HalModul.init();
}
