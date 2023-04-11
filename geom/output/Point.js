import { Transform } from "./Transform.js";
export class Point {
    static create(x = 0, y = 0) {
        return {
            x: x,
            y: y
        };
    }
    static copy(p1, p2) {
        p2.x = p1.x;
        p2.y = p1.y;
    }
    static clone(p) {
        let h = Point.create(p.x, p.y);
        return h;
    }
    static sama(p1, p2) {
        if (false == Transform.equal(p1.x, p2.x))
            return false;
        if (false == Transform.equal(p1.y, p2.y))
            return false;
        return true;
    }
    static putarPoros(p, xc = 0, yc = 0, deg = 0) {
        Transform.rotateRel(p.x, p.y, xc, yc, deg);
        p.x = Transform.lastX;
        p.y = Transform.lastY;
    }
    static posDist(p, xt, yt, jrk) {
        let jrkA;
        let i;
        let j;
        let rasio;
        let hasil = Point.create();
        //jarak sekarang
        jrkA = Transform.jarak(p.x, p.y, xt, yt);
        i = xt - p.x;
        j = yt - p.y;
        rasio = jrkA / jrk;
        hasil.x = i * rasio;
        hasil.y = j * rasio;
        hasil.x = xt - hasil.x;
        hasil.y = yt - hasil.y;
        return hasil;
    }
    static posPolar(jarak, sudut, xt, yt) {
        let hasil = Point.create();
        hasil.x = jarak * Math.cos(sudut * Transform.DEG2RAD);
        hasil.y = jarak * Math.sin(sudut * Transform.DEG2RAD);
        hasil.x += xt;
        hasil.y += yt;
        return hasil;
    }
}
//# sourceMappingURL=Point.js.map