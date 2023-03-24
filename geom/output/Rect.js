import { Point } from "./Point.js";
import { Segment } from "./Segment.js";
export class Rect {
    static create(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        let r = {};
        r.vs = [];
        r.vs.push(Point.create(x1, y1));
        r.vs.push(Point.create(x2, y1));
        r.vs.push(Point.create(x2, y2));
        r.vs.push(Point.create(x1, y2));
        r.segs = [];
        r.segs.push(Segment.create(r.vs[0], r.vs[1]));
        r.segs.push(Segment.create(r.vs[1], r.vs[2]));
        r.segs.push(Segment.create(r.vs[2], r.vs[3]));
        r.segs.push(Segment.create(r.vs[3], r.vs[0]));
        return r;
    }
    static copy(r) {
        // console.log('copy:');
        // console.log(r.vs);
        // let hasil: IRect = ha.Rect.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
        let hasil = Rect.create();
        Rect.copyInfo(r, hasil);
        // console.log(hasil.vs);
        return hasil;
    }
    static copyInfo(r1, r2) {
        for (let i = 0; i < r1.segs.length; i++) {
            Segment.copy(r1.segs[i], r2.segs[i]);
        }
    }
    static collideBound(r1, r2) {
        // console.debug('collide bound');
        if (Rect.maxX(r1) < Rect.minX(r2)) {
            // console.debug('maxX gagal');
            return false;
        }
        // console.log('maxx ' + ha.Rect.maxX(r1));
        // console.log('minx ' + ha.Rect.minX(r2));
        if (Rect.minX(r1) > Rect.maxX(r2)) {
            // console.debug('min x gagal');
            return false;
        }
        if (Rect.maxY(r1) < Rect.minY(r2)) {
            // console.debug('max y gagal');
            return false;
        }
        if (Rect.minY(r1) > Rect.maxY(r2)) {
            // console.debug('min y gagal');
            return false;
        }
        return true;
    }
    static collide(r1, r2) {
        let bound = Rect.collideBound(r1, r2);
        if (!bound)
            return false;
        for (let i = 0; i < r1.segs.length; i++) {
            for (let j = 0; j < r2.segs.length; j++) {
                if (Segment.collide(r1.segs[i], r2.segs[j])) {
                    return true;
                }
            }
        }
        return false;
    }
    static collideDotBound(r, d) {
        if (d.x < Rect.minX(r)) {
            // console.log('minx failed');
            return false;
        }
        if (d.x > Rect.maxX(r)) {
            // console.log('maxX failed');
            // console.log(d);
            // console.log(ha.Rect.maxX(r));
            // console.log(r.vs);
            return false;
        }
        if (d.y < Rect.minY(r)) {
            // console.log('minY failed');
            return false;
        }
        if (d.y > Rect.maxY(r)) {
            // console.log('maxY failed');
            return false;
        }
        return true;
    }
    static collideDot(r, x, y) {
        let r2 = Rect.copy(r);
        let p = Point.create(x, y);
        let d = Segment.deg(r2.segs[0]);
        let pRot = r2.vs[0];
        if (!Rect.collideDotBound(r, p)) {
            return false;
        }
        Rect.rotate(r2, -d, pRot.x, pRot.y, false);
        Point.putarPoros(p, pRot.x, pRot.y, -d);
        if (!Rect.collideDotBound(r2, p)) {
            // console.log('collide bound 2 failed');
            // console.log('deg ' + d);
            // console.log('rect');
            // console.log(r2);
            return false;
        }
        return true;
    }
    static minX(r) {
        let x = r.vs[0].x;
        r.vs.forEach((item) => {
            if (item.x < x)
                x = item.x;
        });
        return x;
    }
    static maxX(r) {
        let x = r.vs[0].x;
        r.vs.forEach((item) => {
            if (item.x > x)
                x = item.x;
        });
        return x;
    }
    static minY(r) {
        let y = r.vs[0].y;
        r.vs.forEach((item) => {
            if (item.y < y)
                y = item.y;
        });
        return y;
    }
    static maxY(r) {
        let y = r.vs[0].y;
        r.vs.forEach((item) => {
            if (item.y > y)
                y = item.y;
        });
        return y;
    }
    // static scale(r: IRect): void {
    // 	r;
    // }
    static translate(rect, x, y) {
        rect.vs.forEach((v) => {
            v.x += x;
            v.y += y;
        });
    }
    static rotate(r, deg, xc = 0, yc, copy = true) {
        let r2;
        if (copy) {
            r2 = Rect.copy(r);
        }
        else {
            r2 = r;
        }
        r2.vs.forEach((p) => {
            Point.putarPoros(p, xc, yc, deg);
        });
        return r2;
    }
}
//# sourceMappingURL=Rect.js.map