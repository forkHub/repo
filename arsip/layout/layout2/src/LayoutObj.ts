import { ILayout } from "./store";

export class LayoutObj implements ILayout {

    constructor(id: number, nama: string) {
        this._id = id;
        this._nama = nama;
    }

    private _nama: string;
    public get nama(): string {
        return this._nama;
    }
    public set nama(value: string) {
        this._nama = value;
    }

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    private _anak: ILayout[];
    public get anak(): ILayout[] {
        return this._anak;
    }
    public set anak(value: ILayout[]) {
        this._anak = value;
    }
}
