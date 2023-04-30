var ha;
(function (ha) {
    var fb;
    (function (fb_1) {
        class BolaObj {
            constructor() {
                this._r = 10;
                this._x = 0;
                this._y = 0;
            }
            get y() {
                return this._y;
            }
            set y(value) {
                this._y = value;
            }
            get x() {
                return this._x;
            }
            set x(value) {
                this._x = value;
            }
            get r() {
                return this._r;
            }
            set r(value) {
                this._r = value;
            }
        }
        fb_1.BolaObj = BolaObj;
        class Fb {
            constructor() {
                this.bolaAr = [];
            }
            update() {
                for (let i = 0; i < this.bolaAr.length; i++) {
                    for (let j = i + 1; j < this.bolaAr.length; j++) {
                        let b1 = this.bolaAr[i];
                        let b2 = this.bolaAr[j];
                        this.geser(b1, b2);
                    }
                }
            }
            /**
             * check apakah dua bola bersinggungan
             * @param b1
             * @param b2
             * @returns boolean
             */
            singgung(b1, b2) {
                let jrk = ha.geom.Transform.jarak(b1.x, b1.y, b2.x, b2.y);
                let jrkMin = b1.r + b2.r;
                // let jrkAbs: number = Math.abs(jrk - jrkMin);
                if (jrkMin > jrk) {
                    return true;
                }
                return false;
            }
            /**
             * geser bola bila bersinggungan
             * @param b1
             * @param b2
             * @returns
             */
            geser(b1, b2) {
                if (!this.singgung(b1, b2))
                    return;
                // console.group('geser');
                // console.log(b1.x, b1.y, b2.x, b2.y);
                //jarak hor dan ver
                let hor = b2.x - b1.x;
                let ver = b2.y - b1.y;
                // console.log('hor: ', hor, '/ver: ', ver);
                //posisi tengah
                let tengahX = hor / 2 + b1.x;
                let tengahY = ver / 2 + b1.y;
                // console.log('tengah x: ', tengahX, '/tengah y: ', tengahY);
                let jrkMin = b1.r + b2.r + 1;
                let jrk = ha.geom.Transform.jarak(b1.x, b1.y, b2.x, b2.y);
                let ratio;
                if (jrk > jrkMin) {
                    ratio = jrk / jrkMin;
                }
                else {
                    ratio = (jrkMin / jrk);
                    //geser b2
                    let hor2;
                    let ver2;
                    hor2 = b2.x - tengahX;
                    ver2 = b2.y - tengahY;
                    hor2 *= ratio;
                    ver2 *= ratio;
                    b2.x = tengahX + hor2;
                    b2.y = tengahY + ver2;
                    // console.log('b2 pos: ', b2.x, b2.y);
                    //geser b1
                    hor2 = b1.x - tengahX;
                    ver2 = b1.y - tengahY;
                    hor2 *= ratio;
                    ver2 *= ratio;
                    b1.x = tengahX + hor2;
                    b1.y = tengahY + ver2;
                    // console.log('b1 pos: ', b1.x, b1.y);
                    // console.groupEnd();
                }
                // console.log('jrk min: ', jrkMin, '/jrk : ', jrk, '/ratio: ', ratio);
            }
            buatBola() {
                let hsl = new BolaObj();
                this.bolaAr.push(hsl);
                return hsl;
            }
        }
        fb_1.fb = new Fb();
    })(fb = ha.fb || (ha.fb = {}));
})(ha || (ha = {}));
