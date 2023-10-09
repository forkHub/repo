class PanahObj {

    private _x1 = 0;
    private _y1 = 0;
    private _x2 = 0;
    private _y2 = 0;
    private _spr: ISprite;
    private _spr2: ISprite;

    public get spr2(): ISprite {
        return this._spr2;
    }
    public set spr2(value: ISprite) {
        this._spr2 = value;
    }

    public get spr(): ISprite {
        return this._spr;
    }
    public set spr(value: ISprite) {
        this._spr = value;
    }

    public get x1() {
        return this._x1;
    }
    public set x1(value) {
        this._x1 = value;
    }
    public get y1() {
        return this._y1;
    }
    public set y1(value) {
        this._y1 = value;
    }
    public get x2() {
        return this._x2;
    }
    public set x2(value) {
        this._x2 = value;
    }
    public get y2() {
        return this._y2;
    }
    public set y2(value) {
        this._y2 = value;
    }
}

class Panah {
    static readonly list: PanahObj[] = [];

    static buat(): PanahObj {
        let p: PanahObj;

        p = new PanahObj();
        this.list.push(p);

        return p;
    }
}