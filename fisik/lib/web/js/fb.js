var ha;
(function (ha) {
    var fb;
    (function (fb) {
        class BentukObj {
            _id = 0;
            bola = [];
            get id() {
                return this._id;
            }
            set id(value) {
                this._id = value;
            }
        }
        class Bentuk {
            list = [];
            buat(str = []) {
                let h = new BentukObj();
                this.bola(h, str);
                this.list.push(h);
                return h;
            }
            bola(bentuk, strAr) {
                console.log(strAr);
                for (let y = 0; y < strAr.length; y++) {
                    let str2 = strAr[y];
                    console.log(str2);
                    for (let x = 0; x < str2.length; x++) {
                        let char = str2[x].toLowerCase();
                        if ('x' == char) {
                            let bl = fb.bola.buatBola();
                            bl.r = 16;
                            bl.x = x * 32;
                            bl.y = y * 32;
                            fb.kt.buat(bentuk.bola[0], bl);
                            fb.kt.buat(bentuk.bola[this.bola.length - 1], bl);
                            bentuk.bola.push(bl);
                        }
                    }
                }
            }
            debug(bl, ctx) {
                bl.bola.forEach((b) => {
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
                    ctx.stroke();
                });
            }
        }
        fb.bentuk = new Bentuk();
    })(fb = ha.fb || (ha.fb = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var fb;
    (function (fb) {
        class Id {
            _id = 0;
            get id() {
                return this._id;
            }
        }
        /**
         *
         */
        class BolaObj {
            _r = 10;
            _x = 0;
            _y = 0;
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
        fb.BolaObj = BolaObj;
        class Bola {
            bolaAr = [];
            constructor() {
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
        fb.bola = new Bola();
        fb.id = new Id();
    })(fb = ha.fb || (ha.fb = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var fb;
    (function (fb) {
        class KonstrainObj {
            constructor(b1, b2) {
                this.b1 = b1;
                this.b2 = b2;
                this.jrk = ha.geom.Transform.jarak(this.b1.x, this.b1.y, this.b2.x, this.b2.y);
            }
            _id;
            get id() {
                return this._id;
            }
            set id(value) {
                this._id = value;
            }
            _b1;
            get b1() {
                return this._b1;
            }
            set b1(value) {
                this._b1 = value;
            }
            _b2;
            get b2() {
                return this._b2;
            }
            set b2(value) {
                this._b2 = value;
            }
            _jrk = 0;
            get jrk() {
                return this._jrk;
            }
            set jrk(value) {
                this._jrk = value;
            }
        }
        /**
         *
         */
        class Konstrain {
            list = [];
            /**
             * cari konstrain berdasarkan bola
             * @param b bola
             * @returns
             */
            getByBola(b) {
                return this.list.find((item) => {
                    return (item.b1 == b || item.b2 == b);
                });
            }
            /**
             * menghitung ulang jarak konstrain
             */
            refresh(obj) {
                obj.jrk = ha.geom.Transform.jarak(obj.b1.x, obj.b1.y, obj.b2.x, obj.b2.y);
            }
            /**
             * geser bola berdasarkan konstrain
             * @param b1 bola
             * @param b2 bola yang digeser
             * @returns
             */
            geser(obj, b1, b2) {
                let jrk2Bola;
                let gap;
                let sdt;
                console.group('geser');
                jrk2Bola = ha.geom.Transform.jarak(b1.x, b1.y, b2.x, b2.y);
                gap = jrk2Bola - obj.jrk;
                console.log('jrk bola: ', jrk2Bola, 'gap: ', gap, 'jrk k', obj.jrk);
                if (Math.abs(gap) < .5) {
                    console.groupEnd();
                    return;
                }
                gap /= 2;
                sdt = ha.geom.Transform.deg(b2.x - b1.x, b2.y - b1.y);
                ha.geom.Transform.posPolar(obj.jrk + (gap), sdt);
                console.log('pos polar, x:', ha.geom.Transform.lastX, 'y:', ha.geom.Transform.lastY);
                let b2x = b2.x;
                let b2y = b2.y;
                b2.x = b1.x + ha.geom.Transform.lastX;
                b2.y = b1.y + ha.geom.Transform.lastY;
                b1.x = b2x - ha.geom.Transform.lastX;
                b1.y = b2y - ha.geom.Transform.lastY;
                console.log('x ' + b2.x, 'y ' + b2.y);
                console.groupEnd();
            }
            /**
             * update konstrain
             */
            update(obj) {
                this.geser(obj, obj.b1, obj.b2);
                this.geser(obj, obj.b2, obj.b1);
            }
            buat(b1, b2) {
                let h = new KonstrainObj(b1, b2);
                this.list.push(h);
                return h;
            }
        }
        fb.kt = new Konstrain();
    })(fb = ha.fb || (ha.fb = {}));
})(ha || (ha = {}));
