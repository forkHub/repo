"use strict";
window.onload = () => {
    Grafis(600, 800);
    const p = Panah.buat();
    p.spr = Muat('./gbr/kotak.png', true);
    Handle(p.spr, 16, 16);
    p.spr2 = Copy(p.spr);
    Handle(p.spr2, 16, 16);
    function update() {
        Bersih();
        gambarPanah();
        Gambar(p.spr2);
        Gambar(p.spr);
        window.requestAnimationFrame(update);
    }
    function gambarPanah() {
        let ctx = Kontek();
        ctx.beginPath();
        ctx.moveTo(PosisiX(p.spr), PosisiY(p.spr));
        ctx.lineTo(PosisiX(p.spr2), PosisiY(p.spr2));
        ctx.stroke();
    }
    window.requestAnimationFrame(update);
};
class PanahObj {
    _x1 = 0;
    _y1 = 0;
    _x2 = 0;
    _y2 = 0;
    _spr;
    _spr2;
    get spr2() {
        return this._spr2;
    }
    set spr2(value) {
        this._spr2 = value;
    }
    get spr() {
        return this._spr;
    }
    set spr(value) {
        this._spr = value;
    }
    get x1() {
        return this._x1;
    }
    set x1(value) {
        this._x1 = value;
    }
    get y1() {
        return this._y1;
    }
    set y1(value) {
        this._y1 = value;
    }
    get x2() {
        return this._x2;
    }
    set x2(value) {
        this._x2 = value;
    }
    get y2() {
        return this._y2;
    }
    set y2(value) {
        this._y2 = value;
    }
}
class Panah {
    static list = [];
    static buat() {
        let p;
        p = new PanahObj();
        this.list.push(p);
        return p;
    }
}
