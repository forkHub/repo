var ha;
(function (ha) {
    var geom;
    (function (geom) {
        class Point {
            static create(x = 0, y = 0) {
                return {
                    x: x,
                    y: y
                };
            }
            /**
             * menukar posisi antara dua point
             * @param p1
             * @param p2
             */
            static tukarPosisi(p1, p2) {
                let t = Point.clone(p1);
                p1.x = p2.x;
                p1.y = p2.y;
                p2.x = t.x;
                p2.y = t.y;
                // console.log(JSON.stringify(p1));
                // console.log(JSON.stringify(p2));
                // console.groupEnd();
            }
            static copyPosisi(ps, pt) {
                pt.x = ps.x;
                pt.y = ps.y;
            }
            static clone(p) {
                let h = Point.create(p.x, p.y);
                return h;
            }
            static sama(p1, p2) {
                if (false == geom.Transform.equal(p1.x, p2.x))
                    return false;
                if (false == geom.Transform.equal(p1.y, p2.y))
                    return false;
                return true;
            }
            static putarPoros(p, xc = 0, yc = 0, deg = 0, klon) {
                let p1;
                p1 = p;
                if (klon)
                    p1 = Point.create(p.x, p.y);
                geom.Transform.rotateRel(p1.x, p1.y, xc, yc, deg);
                p1.x = geom.Transform.lastX;
                p1.y = geom.Transform.lastY;
                return p1;
            }
            //menghasilkan posisi pada jarak tertentu 
            static posDist(p, xt, yt, jrk) {
                let jrkA;
                let i;
                let j;
                let rasio;
                let hasil = Point.create();
                //jarak sekarang
                jrkA = geom.Transform.jarak(p.x, p.y, xt, yt);
                i = xt - p.x;
                j = yt - p.y;
                rasio = jrkA / jrk;
                hasil.x = i * rasio;
                hasil.y = j * rasio;
                //hasi global
                hasil.x = xt - hasil.x;
                hasil.y = yt - hasil.y;
                return hasil;
            }
            //menghasilkan posisi pada sudut dan jarak tertentu
            static posPolar(jarak, sudut, xt, yt) {
                let hasil = Point.create();
                geom.Transform.posPolar(jarak, sudut);
                hasil.x = geom.Transform.lastX + xt;
                hasil.y = geom.Transform.lastY + yt;
                return hasil;
            }
        }
        geom.Point = Point;
    })(geom = ha.geom || (ha.geom = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var geom;
    (function (geom) {
        class PolyObj {
            constructor(vs) {
                this.vs = [];
                vs.forEach((item) => {
                    this.vs.push(item);
                });
            }
        }
        geom.PolyObj = PolyObj;
        class PlP {
        }
        class Poly {
            static buat(p) {
                this.pp;
                return new PolyObj(p);
            }
        }
        Poly.pp = new PlP();
        geom.Poly = Poly;
        const Pl = Poly;
        Pl;
    })(geom = ha.geom || (ha.geom = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var geom;
    (function (geom) {
        class Rect {
            static create(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
                let r = {};
                r.vs = [];
                r.vs.push(geom.Point.create(x1, y1));
                r.vs.push(geom.Point.create(x2, y1));
                r.vs.push(geom.Point.create(x2, y2));
                r.vs.push(geom.Point.create(x1, y2));
                r.segs = [];
                r.segs.push(geom.Garis.create(r.vs[0], r.vs[1]));
                r.segs.push(geom.Garis.create(r.vs[1], r.vs[2]));
                r.segs.push(geom.Garis.create(r.vs[2], r.vs[3]));
                r.segs.push(geom.Garis.create(r.vs[3], r.vs[0]));
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
                    geom.Garis.copy(r1.segs[i], r2.segs[i]);
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
                        if (geom.Garis.collide2(r1.segs[i], r2.segs[j])) {
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
                let p = geom.Point.create(x, y);
                let d = geom.Garis.sudut(r2.segs[0]);
                let pRot = r2.vs[0];
                if (!Rect.collideDotBound(r, p)) {
                    return false;
                }
                Rect.rotate(r2, -d, pRot.x, pRot.y, false);
                geom.Point.putarPoros(p, pRot.x, pRot.y, -d, false);
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
                    geom.Point.putarPoros(p, xc, yc, deg, false);
                });
                return r2;
            }
        }
        geom.Rect = Rect;
    })(geom = ha.geom || (ha.geom = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var geom;
    (function (geom) {
        class GP {
            /**
             * apakah sebuah garis berada di sebelah kanan titik
             * @param g
             * @param xt
             * @param yt
             * @returns
             */
            kananPos(g, xt, yt) {
                let gc = Garis.klon(g);
                let p = geom.Point.create(xt, yt);
                let sdt = 0;
                let hasil = false;
                //garis putar ke atas
                gc = Garis.keAtas(gc, false);
                //sudut untuk mutar ke hor
                sdt = Garis.sudut(gc);
                //putar ke hor
                gc = Garis.putar(gc, -sdt, gc.v1.x, gc.v1.y, false);
                geom.Point.putarPoros(p, gc.v1.x, gc.v1.y, 0, false);
                if (p.y > gc.v1.y)
                    hasil = true;
                Garis.destroy(gc);
                return hasil;
            }
        }
        class Garis {
            /**
             * buat garis object
             * @param v1
             * @param v2
             * @returns
             */
            static create(v1 = { x: 0, y: 0 }, v2 = { x: 0, y: 0 }) {
                return {
                    v1: v1,
                    v2: v2
                };
            }
            /**
             * hapus garis dari memory
             * @param g
             */
            static destroy(g) {
                g.v1 = null;
                g.v2 = null;
            }
            /**
             * check apakah garis menghadap ke atas
             * @param g
             * @returns
             */
            static hadapAtas(g) {
                return g.v2.y > g.v1.y;
            }
            static posIdx(g, idx = 1) {
                let p = geom.Point.create();
                p.x = geom.G.vecI(g) * idx + g.v1.x;
                p.y = geom.G.vecJ(g) * idx + g.v1.y;
                return p;
            }
            /**
             * tukar posisi point
             * @param g
             * @param klon
             * @returns
             */
            static tukarPosisi(g, klon) {
                let g1 = g;
                g1 = g;
                if (klon)
                    g1 = Garis.klon(g1);
                geom.Point.tukarPosisi(g1.v1, g1.v2);
                return g1;
            }
            static keAtas(garis, klon) {
                if (this.hadapAtas(garis)) {
                    if (klon) {
                        return Garis.klon(garis);
                    }
                    else {
                        return garis;
                    }
                }
                // debugger;
                let gc = garis;
                if (klon)
                    gc = Garis.klon(garis);
                return Garis.tukarPosisi(gc, klon);
            }
            /**
             * menghasilkan posisi x dari vecI(), pada idx tertentu
             *
             * @param garis garis
             * @param idx posisi (0-1)
             * @returns
             */
            static getXAtIdx(garis, idx) {
                return garis.v1.x + (idx * Garis.vecI(garis));
            }
            /**
             * menghasilkan posisi y dari vecY(), pada idx tertentu
             *
             * @param garis garis
             * @param idx posisi (0-1)
             * @returns
             */
            static getYAtIdx(seg, idx) {
                return seg.v1.y + (idx * Garis.vecJ(seg));
            }
            /**
             * memutar garis
             * @param g garis
             * @param sdt sudut perputaran
             * @param xc posisi pusat putaran x
             * @param yc posisi pusat putaran y
             */
            static putar(g, sdt = 0, xc = 0, yc = 0, klon) {
                let gc;
                gc = g;
                if (klon)
                    gc = Garis.klon(gc);
                geom.Point.putarPoros(gc.v1, xc, yc, sdt, false);
                geom.Point.putarPoros(gc.v2, xc, yc, sdt, false);
                return gc;
            }
            /**
             * putar garis agar sejajar sumbu X
             * @param g garis
             * @param klon apakah akan mengklone garis sebelum diputar
             * @returns garis yang sudah di putar
             */
            static putarKeHor(g, klon) {
                let sdt;
                let gc;
                gc = g;
                if (klon)
                    gc = Garis.klon(g);
                Garis.keAtas(gc, false);
                sdt = Garis.sudut(gc);
                Garis.putar(gc, -sdt, gc.v1.x, gc.v1.y, false);
                return gc;
            }
            static minX(garis) {
                return Math.min(garis.v1.x, garis.v2.x);
            }
            static maxX(garis) {
                return Math.max(garis.v1.x, garis.v2.x);
            }
            static minY(garis) {
                return Math.min(garis.v1.y, garis.v2.y);
            }
            static maxY(garis) {
                return Math.max(garis.v1.y, garis.v2.y);
            }
            static pindah(garis, x = 0, y = 0) {
                garis.v1.x += x;
                garis.v1.y += y;
                garis.v2.x += x;
                garis.v2.y += y;
            }
            //tested
            static xHorIdx(garis) {
                if (!Garis.melewatiGarisX(garis))
                    return NaN;
                let idx = 0;
                idx = (0 - garis.v1.y) / (garis.v2.y - garis.v1.y);
                return idx;
            }
            /**
             * mengkopy dari garis sumber ke garis target
             * @param gs garis sumber
             * @param gt garis target
             */
            static copy(gs, gt) {
                geom.Point.copyPosisi(gs.v1, gt.v2);
                geom.Point.copyPosisi(gs.v2, gt.v2);
            }
            /**
             * klone garis
             * @param garis
             * @returns
             */
            static klon(garis) {
                return {
                    v1: geom.Point.clone(garis.v1),
                    v2: geom.Point.clone(garis.v2)
                };
            }
            /**
             * menghitung sudut dari garis
             * @param garis - garis
             * @returns sudut
             */
            static sudut(garis) {
                let j = garis.v2.y - garis.v1.y;
                let i = garis.v2.x - garis.v1.x;
                return geom.Transform.deg(i, j);
            }
            /**
             * menghasilkan panjang pada sumbu x
             * @param garis garis
             * @returns
             */
            static vecI(garis) {
                return garis.v2.x - garis.v1.x;
            }
            static vecJ(garis) {
                return garis.v2.y - garis.v1.y;
            }
            /** putar garis
             *
             */
            static putarGaris(gs, sdt, klon) {
                let g = gs[0];
                gs.forEach((item) => {
                    Garis.putar(item, sdt, g.v1.x, g.v1.y, klon);
                });
            }
            /** GARIS - POINT
             * ==============
            */
            /**
             * apakah sebuah garis berada di sebelah kanan titik
             * @param g
             * @param xt
             * @param yt
             * @returns
             */
            static kananPos(g, xt, yt) {
                return this.gp.kananPos(g, xt, yt);
            }
            /** GARIS - GARIS
             * ==============
            */
            static boundCollide(g1, g2) {
                if (Garis.maxX(g1) < Garis.minX(g2))
                    return false;
                if (Garis.minX(g1) > Garis.maxX(g2))
                    return false;
                if (Garis.maxY(g1) < Garis.minY(g2))
                    return false;
                if (Garis.minY(g1) > Garis.maxY(g2))
                    return false;
                return true;
            }
            static _tabrakan(g1, g2) {
                let g1c;
                let g2c;
                let sudut;
                let x;
                let y;
                g1c = Garis.klon(g1);
                g2c = Garis.klon(g2);
                Garis.keAtas(g1c, false);
                sudut = Garis.sudut(g1c);
                x = g1c.v1.x;
                y = g1c.v1.y;
                Garis.putar(g2c, -sudut, x, y, false);
                Garis.putar(g1c, -sudut, x, y, false);
                if (!Garis.boundCollide(g1c, g2c))
                    return false;
                return true;
            }
            static tabrakan(g1, g2) {
                if (Garis.boundCollide(g1, g2) == false) {
                    return false;
                }
                if (!Garis._tabrakan(g1, g2))
                    return false;
                if (!Garis._tabrakan(g2, g1))
                    return false;
                return true;
            }
            //TODO: dep
            static collide2(g, seg2) {
                let bound = Garis.boundCollide(g, seg2);
                if (!bound)
                    return false;
                // let deg: number = ha.Segment.deg(seg2);
                let seg2Copy = Garis.klon(seg2);
                let seg1Copy = Garis.klon(g);
                let deg = Garis.sudut(seg2);
                Garis.putar(seg2Copy, -deg, seg2.v1.x, seg2.v1.y, false);
                Garis.putar(seg1Copy, -deg, seg2.v1.x, seg2.v1.y, false);
                if (!Garis.boundCollide(seg1Copy, seg2Copy))
                    return false;
                Garis.pindah(seg1Copy, -seg2.v1.x, -seg2.v1.y);
                Garis.pindah(seg2Copy, -seg2.v1.x, -seg2.v1.y);
                if (!Garis.melewatiGarisX(seg1Copy)) {
                    return false;
                }
                let idx = Garis.xHorIdx(seg1Copy);
                let x = Garis.getXAtIdx(seg1Copy, idx);
                if (x > Garis.maxX(seg2Copy))
                    return false;
                if (x < Garis.minX(seg2Copy))
                    return false;
                return true;
            }
            static melewatiGarisX(g, y = 0) {
                if (Garis.maxY(g) > y) {
                    if (Garis.minY(g) < y) {
                        return true;
                    }
                }
                return false;
            }
            static melewatiGarisY(g) {
                if (Garis.minX(g) < 0) {
                    if (Garis.maxX(g) > 0) {
                        return true;
                    }
                }
                return false;
            }
        }
        Garis.gp = new GP();
        geom.Garis = Garis;
        //alias
        geom.G = Garis;
    })(geom = ha.geom || (ha.geom = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var geom;
    (function (geom) {
        class Transform {
            static get lastX() {
                return Transform._lastX;
            }
            static get lastY() {
                return Transform._lastY;
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
                sin *= Transform.RAD2DEG;
                sin = Transform.quadDeg2(x, y, sin);
                sin = Transform.normalizeDeg(sin);
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
                angleS = Transform.normalizeDeg(angleS);
                angleT = Transform.normalizeDeg(angleT);
                let deg = Transform.degDistMin(angleS, angleT);
                if (deg >= 0) {
                    return -(360 - deg);
                }
                else {
                    return (360 - Math.abs(deg));
                }
            }
            static degDistMin(angleS = 0, angleT) {
                angleS = Transform.normalizeDeg(angleS);
                angleT = Transform.normalizeDeg(angleT);
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
            static jarak(x, y, xt, yt) {
                let pjx = xt - x;
                let pjy = yt - y;
                return Math.sqrt(pjx * pjx + pjy * pjy);
            }
            static rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
                let xr = x - xt;
                let yr = y - yt;
                let x1;
                let y1;
                deg *= Transform.DEG2RAD;
                x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
                y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
                Transform._lastX = x1 + xt;
                Transform._lastY = y1 + yt;
            }
            static posPolar(jrk, sdt) {
                let sdtrad = sdt * Transform.DEG2RAD;
                Transform._lastX = Math.cos(sdtrad) * jrk;
                Transform._lastY = Math.sin(sdtrad) * jrk;
            }
        }
        Transform.RAD2DEG = 180.0 / Math.PI;
        Transform.DEG2RAD = Math.PI / 180.0;
        Transform._lastX = 0;
        Transform._lastY = 0;
        geom.Transform = Transform;
    })(geom = ha.geom || (ha.geom = {}));
})(ha || (ha = {}));
