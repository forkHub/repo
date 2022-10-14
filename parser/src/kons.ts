class Kons {
    static readonly ANGKA: string = 'angka';
    static readonly TEKS: string = 'teks';
    static readonly EXP: string = 'exp';
    static readonly KOM_AWAL: string = '/*';
    static readonly KOM_AKHIR: string = '*/';
    static readonly KOMENTAR: string = 'komentar';
    static readonly OPR: string = 'opr';
    static readonly SIMBOL: string = 'simbol';
    static readonly BINOP: string = 'binop';

    private static _dataStr: string = '';
    // static readonly kata: string[] = [];

    public static get dataStr(): string {
        return this._dataStr;
    }
    public static set dataStr(value: string) {
        this._dataStr = value;
    }
}