class ValueObj implements IValue {

    private _tipeValue: "teks" | "angka" | "ar_angka" | "ar_teks";
    private _value: string;
    private _id: number;
    private _ket: string;
    private _indukId: number;
    private _type: string;
    private _nama: string;

    constructor(id: number, indukId: number, ket: string, nama: string, tipeValue: "teks" | "angka" | "ar_angka" | "ar_teks", type: string, value: string) {
        this._id = id;
        this._indukId = indukId;
        this.ket = ket;
        this.nama = nama;
        this.tipeValue = tipeValue;
        this.type = type;
        this.value = value;
    }

    public get tipeValue(): "teks" | "angka" | "ar_angka" | "ar_teks" {
        return this._tipeValue;
    }

    public set tipeValue(value: "teks" | "angka" | "ar_angka" | "ar_teks") {
        this._tipeValue = value;
    }

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this._value = value;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get indukId(): number {
        return this._indukId;
    }

    public set indukId(value: number) {
        this._indukId = value;
    }

    public get type(): string {
        return this._type;
    }

    public set type(value: string) {
        this._type = value;
    }

    public get nama(): string {
        return this._nama;
    }

    public set nama(value: string) {
        this._nama = value;
    }

    public get ket(): string {
        return this._ket;
    }

    public set ket(value: string) {
        this._ket = value;
    }

}