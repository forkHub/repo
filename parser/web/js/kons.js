class Kons {
    static ANGKA = '_angka_';
    static TEKS = '_teks_';
    static EXP = '_exp_';
    static KOM_AWAL = '_/*_';
    static KOM_AKHIR = '_*/_';
    static KOMENTAR = '_komentar_';
    static SIMBOL = '_simbol_';
    static _dataStr = '';
    // static readonly kata: string[] = [];
    static get dataStr() {
        return this._dataStr;
    }
    static set dataStr(value) {
        this._dataStr = value;
    }
}
