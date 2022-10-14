class Kons {
    static readonly ANGKA: string = '_angka_';
    static readonly TEKS: string = '_teks_';
    static readonly EXP: string = '_exp_';
    static readonly KOM_AWAL: string = '_/*_';
    static readonly KOM_AKHIR: string = '_*/_';
    static readonly KOMENTAR: string = '_komentar_';
    static readonly SIMBOL: string = '_simbol_';

    private static _dataStr: string = '';
    // static readonly kata: string[] = [];

    public static get dataStr(): string {
        return this._dataStr;
    }
    public static set dataStr(value: string) {
        this._dataStr = value;
    }
}