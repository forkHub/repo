var ha;
(function (ha) {
    class Line2D {
        createLine(m, b) {
            return {
                b: b,
                m: m,
                y: 0
            };
        }
        lineCrossPos(line, line2) {
            line;
            line2;
            return null;
        }
    }
    ha.line = new Line2D();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Point {
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
            let h = this.create(p.x, p.y);
            return h;
        }
        static equal(p1, p2) {
            if (false == ha.Transform.equal(p1.x, p2.x))
                return false;
            if (false == ha.Transform.equal(p1.y, p2.y))
                return false;
            return true;
        }
        static rotateRel(p, xc = 0, yc = 0, deg = 0) {
            ha.Transform.rotateRel(p.x, p.y, xc, yc, deg);
            p.x = ha.Transform.lastX;
            p.y = ha.Transform.lastY;
        }
        static posDist(p, xt, yt, jrk) {
            let jrkA;
            let i;
            let j;
            let rasio;
            let hasil = Point.create();
            jrkA = ha.Transform.dist(p.x, p.y, xt, yt);
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
            let hasil;
            hasil.x = jarak * Math.cos(sudut * ha.Transform.DEG2RAD);
            hasil.y = jarak * Math.sin(sudut * ha.Transform.DEG2RAD);
            hasil.x += xt;
            hasil.y += yt;
            return hasil;
        }
    }
    ha.Point = Point;
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Rect {
        static create(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
            let r = {};
            r.vs = [];
            r.vs.push(ha.Point.create(x1, y1));
            r.vs.push(ha.Point.create(x2, y1));
            r.vs.push(ha.Point.create(x2, y2));
            r.vs.push(ha.Point.create(x1, y2));
            r.segs = [];
            r.segs.push(ha.Segment.create(r.vs[0], r.vs[1]));
            r.segs.push(ha.Segment.create(r.vs[1], r.vs[2]));
            r.segs.push(ha.Segment.create(r.vs[2], r.vs[3]));
            r.segs.push(ha.Segment.create(r.vs[3], r.vs[0]));
            return r;
        }
        static copy(r) {
            let hasil = this.create();
            this.copyInfo(r, hasil);
            return hasil;
        }
        static copyInfo(r1, r2) {
            for (let i = 0; i < r1.segs.length; i++) {
                ha.Segment.copy(r1.segs[i], r2.segs[i]);
            }
        }
        static collideBound(r1, r2) {
            if (this.maxX(r1) < this.minX(r2)) {
                return false;
            }
            if (this.minX(r1) > this.maxX(r2)) {
                return false;
            }
            if (this.maxY(r1) < this.minY(r2)) {
                return false;
            }
            if (this.minY(r1) > this.maxY(r2)) {
                return false;
            }
            return true;
        }
        static collide(r1, r2) {
            let bound = this.collideBound(r1, r2);
            if (!bound)
                return false;
            for (let i = 0; i < r1.segs.length; i++) {
                for (let j = 0; j < r2.segs.length; j++) {
                    if (ha.Segment.collide(r1.segs[i], r2.segs[j])) {
                        return true;
                    }
                }
            }
            return false;
        }
        static collideDotBound(r, d) {
            if (d.x < this.minX(r)) {
                return false;
            }
            if (d.x > this.maxX(r)) {
                return false;
            }
            if (d.y < this.minY(r)) {
                return false;
            }
            if (d.y > this.maxY(r)) {
                return false;
            }
            return true;
        }
        static collideDot(r, x, y) {
            let r2 = Rect.copy(r);
            let p = ha.Point.create(x, y);
            let d = ha.Segment.deg(r2.segs[0]);
            let pRot = r2.vs[0];
            if (!this.collideDotBound(r, p)) {
                return false;
            }
            Rect.rotate(r2, -d, pRot.x, pRot.y);
            ha.Point.rotateRel(p, pRot.x, pRot.y, -d);
            if (!this.collideDotBound(r2, p)) {
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
        static scale(r) {
            r;
        }
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
                ha.Point.rotateRel(p, xc, yc, deg);
            });
            return r2;
        }
    }
    ha.Rect = Rect;
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Segment {
        static create(v1 = { x: 0, y: 0 }, v2 = { x: 0, y: 0 }) {
            return {
                v1: v1,
                v2: v2
            };
        }
        static boundCollide(seg1, seg2) {
            if (this.maxX(seg1) < this.minX(seg2))
                return false;
            if (this.minX(seg1) > this.maxX(seg2))
                return false;
            if (this.maxY(seg1) < this.minY(seg2))
                return false;
            if (this.minY(seg1) > this.maxY(seg2))
                return false;
            return true;
        }
        static collide(seg1, seg2) {
            let bound = this.boundCollide(seg1, seg2);
            if (!bound)
                return false;
            let seg2Copy = this.clone(seg2);
            let seg1Copy = this.clone(seg1);
            let deg = this.deg(seg2);
            this.rotate(seg2Copy, -deg, seg2.v1.x, seg2.v1.y);
            this.rotate(seg1Copy, -deg, seg2.v1.x, seg2.v1.y);
            if (!this.boundCollide(seg1Copy, seg2Copy))
                return false;
            this.translate(seg1Copy, -seg2.v1.x, -seg2.v1.y);
            this.translate(seg2Copy, -seg2.v1.x, -seg2.v1.y);
            if (!this.crossHor(seg1Copy)) {
                return false;
            }
            let idx = this.xHorIdx(seg1Copy);
            let x = this.getXAtIdx(seg1Copy, idx);
            if (x > this.maxX(seg2Copy))
                return false;
            if (x < this.minX(seg2Copy))
                return false;
            return true;
        }
        static copy(seg1, seg2) {
            ha.Point.copy(seg1.v1, seg2.v2);
            ha.Point.copy(seg1.v2, seg2.v2);
        }
        static clone(seg) {
            return {
                v1: ha.Point.clone(seg.v1),
                v2: ha.Point.clone(seg.v2)
            };
        }
        static crossHor(seg) {
            if (this.maxY(seg) > 0) {
                if (this.minY(seg) < 0) {
                    return true;
                }
            }
            return false;
        }
        static deg(line) {
            let j = line.v2.y - line.v1.y;
            let i = line.v2.x - line.v1.x;
            return ha.Transform.deg(i, j);
        }
        static getXAtIdx(seg, idx) {
            return seg.v1.x + (idx * this.vecI(seg));
        }
        static getYAtIdx(seg, idx) {
            return seg.v1.y + (idx * this.vecJ(seg));
        }
        static vecI(seg) {
            return seg.v2.x - seg.v1.x;
        }
        static vecJ(seg) {
            return seg.v2.y - seg.v1.y;
        }
        static rotate(seg, deg = 0, xc = 0, yc = 0) {
            ha.Point.rotateRel(seg.v1, xc, yc, deg);
            ha.Point.rotateRel(seg.v2, xc, yc, deg);
        }
        static minX(seg) {
            return Math.min(seg.v1.x, seg.v2.x);
        }
        static maxX(seg) {
            return Math.max(seg.v1.x, seg.v2.x);
        }
        static minY(seg) {
            return Math.min(seg.v1.y, seg.v2.y);
        }
        static maxY(seg) {
            return Math.max(seg.v1.y, seg.v2.y);
        }
        static translate(seg, x = 0, y = 0) {
            seg.v1.x += x;
            seg.v1.y += y;
            seg.v2.x += x;
            seg.v2.y += y;
        }
        static xHorIdx(seg) {
            if (!this.crossHor(seg))
                return NaN;
            let idx = 0;
            idx = (0 - seg.v1.y) / (seg.v2.y - seg.v1.y);
            return idx;
        }
    }
    ha.Segment = Segment;
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Transform {
        static RAD2DEG = 180.0 / Math.PI;
        static DEG2RAD = Math.PI / 180.0;
        static _lastX = 0;
        static _lastY = 0;
        static get lastX() {
            return this._lastX;
        }
        static get lastY() {
            return this._lastY;
        }
        static equal(n1, n2, toleransi = 1) {
            if (Math.abs(n1 - n2) <= toleransi)
                return true;
            return false;
        }
        static quadDeg2(x, y, deg) {
            if (x == 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x > 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x < 0) {
                if (y == 0) {
                    return 180;
                }
                else if (y > 0) {
                    return 180 - Math.abs(deg);
                }
                else if (y < 0) {
                    return 180 + Math.abs(deg);
                }
            }
            throw Error();
        }
        static deg(x, y) {
            let l;
            let sin;
            l = Math.sqrt(x * x + y * y);
            if (l == 0) {
                l = .00001;
            }
            sin = y / l;
            sin = Math.asin(sin);
            sin *= this.RAD2DEG;
            sin = this.quadDeg2(x, y, sin);
            sin = this.normalizeDeg(sin);
            return sin;
        }
        static normalizeDeg(deg) {
            while (deg >= 360) {
                deg -= 360;
            }
            while (deg <= -360) {
                deg += 360;
            }
            if (deg < 0)
                deg = 360 + deg;
            return deg;
        }
        static degDistMax(angleS = 0, angleT) {
            angleS = this.normalizeDeg(angleS);
            angleT = this.normalizeDeg(angleT);
            let deg = this.degDistMin(angleS, angleT);
            if (deg >= 0) {
                return -(360 - deg);
            }
            else {
                return (360 - Math.abs(deg));
            }
        }
        static degDistMin(angleS = 0, angleT) {
            angleS = this.normalizeDeg(angleS);
            angleT = this.normalizeDeg(angleT);
            if (angleT >= angleS) {
                if (angleT - angleS > 180) {
                    return -(angleS + 360 - angleT);
                }
                else {
                    return angleT - angleS;
                }
            }
            else {
                if (angleS - angleT >= 180) {
                    return 360 + angleT - angleS;
                }
                else {
                    return angleT - angleS;
                }
            }
        }
        static dist(x, y, xt, yt) {
            let pjx = xt - x;
            let pjy = yt - y;
            return Math.sqrt(pjx * pjx + pjy * pjy);
        }
        static rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
            let xr = x - xt;
            let yr = y - yt;
            let x1;
            let y1;
            deg *= this.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            this._lastX = x1 + xt;
            this._lastY = y1 + yt;
        }
    }
    ha.Transform = Transform;
})(ha || (ha = {}));
