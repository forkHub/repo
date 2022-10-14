class Kons {
    static ANGKA = 'angka';
    static TEKS = 'teks';
    static EXP = 'exp';
    static KOM_AWAL = '/*';
    static KOM_AKHIR = '*/';
    static KOMENTAR = 'komentar';
    static OPR = 'opr';
    static SIMBOL = 'simbol';
    static BINOP = 'binop';
    static _dataStr = '';
    // static readonly kata: string[] = [];
    static get dataStr() {
        return this._dataStr;
    }
    static set dataStr(value) {
        this._dataStr = value;
    }
}
