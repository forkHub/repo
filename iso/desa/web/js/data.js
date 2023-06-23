export var ModeGeser;
(function (ModeGeser) {
    ModeGeser["kosong"] = "kosong";
    ModeGeser["peta"] = "peta";
    ModeGeser["drag"] = "drag";
})(ModeGeser || (ModeGeser = {}));
class Data {
    _ubin; //gambar ubin buat peta
    _modeGeser = ModeGeser.kosong;
    _kursorSpr; // 
    /** area drag terakhir */
    area = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    };
    // /buat viewport
    //untuk menentukan area yang terlihat di layar
    vp = {
        x: -120,
        y: 0,
        dipencet: false,
        xs: 0,
        ys: 0 //posisi y awal viewport saat pointer dipencet
    };
    //digunakan untuk menyimpan proyeksi terakhir dari iso ke layar
    layarPos = {
        x: 0,
        y: 0,
    };
    //digunakan untuk menyimpan hasi proyeksi terakhir
    isoPos = {
        x: 0,
        y: 0,
        xgr: 0,
        ygr: 0
    };
    //TODO: dipakai di PilihArea, kemungkinan dipindah
    isoDrag = {
        status: false,
        // ctr: 0,
        xgr: 0,
        ygr: 0,
        x2gr: 0,
        y2gr: 0 //posisi grid y akhir drag
    };
    get kursorSpr() {
        return this._kursorSpr;
    }
    set kursorSpr(value) {
        this._kursorSpr = value;
    }
    get modeGeser() {
        return this._modeGeser;
    }
    set modeGeser(value) {
        this._modeGeser = value;
    }
    get ubinSpr() {
        return this._ubin;
    }
    set ubinSpr(value) {
        this._ubin = value;
    }
}
export const data = new Data();
