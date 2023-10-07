var ha;
(function (ha) {
    var fb;
    (function (fb) {
        class BentukObj {
            bola = [];
            _id = 0;
            set static(value) {
                this.bola.forEach((item) => {
                    item.statik = value;
                });
            }
            get id() {
                return this._id;
            }
            set id(value) {
                this._id = value;
            }
        }
        class Bentuk {
            list = [];
            geser(b, x, y) {
                b.bola.forEach((item) => {
                    item.x += x;
                    item.y += y;
                });
            }
            buat(str = [], id = 0) {
                let h = new BentukObj();
                this.bola(h, str, id);
                this.konst2(h);
                this.list.push(h);
                return h;
            }
            dekat(b, bl) {
                let h = null;
                let jarak = 999999;
                b.bola.forEach((item) => {
                    if (item == bl)
                        return;
                    let jarak2 = ha.geom.Transform.jarak(item.x, item.y, bl.x, bl.y);
                    let k = fb.kt.checkAda(bl, item);
                    if (k)
                        return;
                    if (jarak2 < jarak) {
                        jarak = jarak2;
                        h = item;
                    }
                });
                return h;
            }
            bola(bentuk, strAr, id) {
                // console.log(strAr);
                for (let y = 0; y < strAr.length; y++) {
                    let str2 = strAr[y];
                    // console.log(str2);
                    for (let x = 0; x < str2.length; x++) {
                        let char = str2[x].toLowerCase();
                        if (' ' != char) {
                            let bl = fb.bola.buatBola();
                            bl.groupId = id;
                            bl.r = 8;
                            bl.x = x * bl.r * 2;
                            bl.y = y * bl.r * 2;
                            bl.label = char;
                            bentuk.bola.push(bl);
                        }
                    }
                }
            }
            konst2(bentuk) {
                for (let i = 0; i < bentuk.bola.length; i++) {
                    for (let j = i + 1; j < bentuk.bola.length; j++) {
                        fb.kt.buat(bentuk.bola[i], bentuk.bola[j]);
                    }
                }
            }
            konst(bentuk) {
                bentuk.bola.forEach((item) => {
                    for (let j = 0; j < 3; j++) {
                        let dekat = this.dekat(bentuk, item);
                        if (dekat) {
                            fb.kt.buat(dekat, item);
                        }
                    }
                    if (bentuk.bola[0]) {
                        fb.kt.buat(bentuk.bola[0], item);
                    }
                    if (bentuk.bola.length > 1) {
                        fb.kt.buat(bentuk.bola[bentuk.bola.length - 1], item);
                    }
                });
            }
            debug(bl, ctx, offx = 0, offy = 0) {
                bl.bola.forEach((b) => {
                    ctx.beginPath();
                    ctx.arc(b.x + offx, b.y + offy, b.r, 0, 2 * Math.PI);
                    ctx.stroke();
                    if (b.statik) {
                        ctx.beginPath();
                        ctx.arc(b.x + offx, b.y + offy, b.r / 3, 0, 2 * Math.PI);
                        ctx.stroke();
                    }
                });
            }
            update() {
                //update semua bentuk
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
                this._id++;
                return this._id;
            }
        }
        /**
         *
         */
        class BolaObj {
            _r = 4;
            _x = 0;
            _y = 0;
            _groupId = 0;
            _label = '';
            _statik = false;
            get statik() {
                return this._statik;
            }
            set statik(value) {
                this._statik = value;
            }
            get label() {
                return this._label;
            }
            set label(value) {
                this._label = value;
            }
            get groupId() {
                return this._groupId;
            }
            set groupId(value) {
                this._groupId = value;
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
        fb.BolaObj = BolaObj;
        class Bola {
            // readonly bolaAr: BolaObj[] = [];
            constructor() {
            }
            // private update(): void {
            // 	for (let i: number = 0; i < this.bolaAr.length; i++) {
            // 		for (let j: number = i + 1; j < this.bolaAr.length; j++) {
            // 			let b1 = this.bolaAr[i];
            // 			let b2 = this.bolaAr[j];
            // 			this.geser(b1, b2);
            // 		}
            // 	}
            // }
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
                // if (b1.groupId == b2.groupId) return;
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
                let hor2;
                let ver2;
                if (jrk > jrkMin) {
                    ratio = jrk / jrkMin;
                }
                else {
                    ratio = (jrkMin / jrk);
                    //geser b2
                    if (!b2.statik) {
                        hor2 = b2.x - tengahX;
                        ver2 = b2.y - tengahY;
                        hor2 *= ratio;
                        ver2 *= ratio;
                        b2.x = tengahX + hor2;
                        b2.y = tengahY + ver2;
                    }
                    //geser b1
                    if (!b1.statik) {
                        hor2 = b1.x - tengahX;
                        ver2 = b1.y - tengahY;
                        hor2 *= ratio;
                        ver2 *= ratio;
                        b1.x = tengahX + hor2;
                        b1.y = tengahY + ver2;
                    }
                }
            }
            buatBola() {
                let hsl = new BolaObj();
                // this.bolaAr.push(hsl);
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
        class Fisik {
            update() {
            }
        }
        fb.Fisik = Fisik;
        fb.fisik = new Fisik();
    })(fb = ha.fb || (ha.fb = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var fb;
    (function (fb) {
        fb.JARAK_MIN = .001;
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
            checkAda(b1, b2) {
                let kt = this.getByBola(b1);
                if (!kt)
                    return false;
                let kt2 = this.getByBola(b2);
                if (!kt)
                    return false;
                if (kt != kt2)
                    return false;
                return true;
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
                jrk2Bola = ha.geom.Transform.jarak(b1.x, b1.y, b2.x, b2.y);
                gap = jrk2Bola - obj.jrk;
                gap /= 2;
                sdt = ha.geom.Transform.sudut(b2.x - b1.x, b2.y - b1.y);
                ha.geom.Transform.posPolar(obj.jrk + (gap), sdt);
                let b2x = b2.x;
                let b2y = b2.y;
                if (!b2.statik) {
                    b2.x = b1.x + ha.geom.Transform.lastX;
                    b2.y = b1.y + ha.geom.Transform.lastY;
                }
                if (!b1.statik) {
                    b1.x = b2x - ha.geom.Transform.lastX;
                    b1.y = b2y - ha.geom.Transform.lastY;
                }
            }
            /**
             * update konstrain
             */
            updateObj(obj) {
                this.geser(obj, obj.b1, obj.b2);
                this.geser(obj, obj.b2, obj.b1);
            }
            update() {
                this.list.forEach((item) => {
                    this.updateObj(item);
                });
            }
            debug(ctx, offx = 0, offy = 0) {
                ctx.beginPath();
                this.list.forEach((item) => {
                    ctx.moveTo(item.b1.x + offx, item.b1.y + offx);
                    ctx.lineTo(item.b2.x + offy, item.b2.y + offy);
                    let jrk = ha.geom.Transform.jarak(item.b1.x, item.b1.y, item.b2.x, item.b2.y);
                    jrk = Math.floor(jrk);
                    // ctx.fillText(jrk + "",
                    // 	(item.b1.x + (item.b2.x - item.b1.x) / 2) + offx,
                    // 	(item.b1.y + (item.b2.y - item.b1.y) / 2) + offy
                    // );
                });
                ctx.stroke();
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
