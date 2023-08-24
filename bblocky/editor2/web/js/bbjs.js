"use strict";
//Stop
//DebugLog
var ha;
(function (ha) {
    var bbjs;
    (function (bbjs) {
        class Debug {
            static Obj(n) {
                console.log(bbjs.List.Ambil(n));
            }
            static Stop() {
                //TODO:
            }
            static Play() {
                //TODO:
            }
        }
        bbjs.Debug = Debug;
    })(bbjs = ha.bbjs || (ha.bbjs = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var bbjs;
    (function (bbjs) {
        class General {
            static Graphics = (width = 240, height = 320, canvas = null, fullScreen = true, handleInput = true) => {
                Grafis(width, height, canvas, fullScreen, handleInput);
            };
            static SetBuffer = Kontek;
            static GetColor = AmbilPiksel;
            static ColorRed = Merah;
            static ColorGreen = Hijau;
            static ColorBlue = Biru;
            static WritePixel = SetPiksel;
            static GraphicsBuffer = Kontek;
            static Color = Warna;
            static Cls = Bersih;
            static Plot = SetPiksel;
            static Line = Garis;
            static Rect = Kotak;
            static Update() {
                //TODO: next update all sprite based on its state, moving, animation, etc
            }
        }
        bbjs.General = General;
    })(bbjs = ha.bbjs || (ha.bbjs = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var bbjs;
    (function (bbjs) {
        class Id {
            static _id = Date.now();
            static getId() {
                Id._id++;
                return Id._id;
            }
        }
        bbjs.Id = Id;
    })(bbjs = ha.bbjs || (ha.bbjs = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var bbjs;
    (function (bbjs) {
        class Sprite {
            //load biasa
            //load dragable
            //load rotasi
            static LoadSprite = (url, mode = 0) => {
                let spr = Muat(url);
                let n = bbjs.List.TambahSprite(spr);
                this.setDragMode(n, mode);
                return n;
            };
            static getDragMode(n) {
                let spr = bbjs.List.Ambil(n);
                return spr.tipeDrag;
            }
            static setDragMode(n, mode) {
                let spr = bbjs.List.Ambil(n);
                if (0 == mode) {
                    spr.dragable = false;
                    spr.tipeDrag = 0;
                }
                else {
                    spr.tipeDrag = mode;
                    spr.dragable = true;
                }
            }
            static CopySprite = (n) => {
                let spr = Copy(bbjs.List.AmbilSprite(n));
                return bbjs.List.TambahSprite(spr);
            };
            static LoadAnimSprite = (url, frameWidth = 32, frameHeight = 32) => {
                let spr = MuatAnimasi(url, frameWidth, frameHeight, false, 0);
                return bbjs.List.TambahSprite(spr);
            };
            static SpriteBuffer = (n) => {
                return SpriteKontek(bbjs.List.AmbilSprite(n));
            };
            /*
             * DrawSprite(n)
             * DrawSprite(n, frame)
             * DrawSprite(n, x, y)
             */
            static DrawSprite = (n, x, y, frame) => {
                let spr = bbjs.List.AmbilSprite(n);
                //n,x,y
                if (bbjs.Util.checkParam([n, x, y])) {
                    Posisi(spr, x, y);
                }
                //n, frame
                if (bbjs.Util.checkParam([n, x])) {
                    frame = 0;
                }
                Gambar(bbjs.List.AmbilSprite(n), frame);
            };
            static TileSprite = Ubin;
            static HandleSprite = Handle;
            static ResizeSprite = Ukuran;
            static RotateSprite = Rotasi;
            static SpriteWidth = Panjang;
            static SpriteHeight = Lebar;
            static SpritesCollide = Tabrakan;
        }
        bbjs.Sprite = Sprite;
    })(bbjs = ha.bbjs || (ha.bbjs = {}));
})(ha || (ha = {}));
/**
 * posisi jarak
 * posisi orbit
 * posisi mendekat
 * posisi menjauh
 *
 * sudut mendekat
 * sudut menjauh
 * sudut literal
 * sudut putar n derajat
 *
 * gerak maju
 * gerak mundur
 * gerak kiri
 * gerak kanan
 *
 */ 
var ha;
(function (ha) {
    var bbjs;
    (function (bbjs) {
        class List {
            static list = [];
            static TambahSprite(obj) {
                //TODO: convert ke sprite 2
                let obj2 = obj;
                obj2.tile = false;
                let id = bbjs.Id.getId();
                List.list.push({
                    id: id,
                    obj: obj2,
                    type: 'sprite'
                });
                return id;
            }
            static Ambil(id) {
                for (let i = 0; i < List.list.length; i++) {
                    if (List.list[i].id == id)
                        return List.list[i].obj;
                }
                console.warn('object , id: ' + id + 'tidak ketemu');
                return null;
            }
            static AmbilSprite(id) {
                return List.Ambil(id);
            }
        }
        bbjs.List = List;
    })(bbjs = ha.bbjs || (ha.bbjs = {}));
})(ha || (ha = {}));
// Pi
// Int
// Float
// Floor
// Ceil
// Sgn
// Abs
// Mod
// Sqr
// Sin
// Cos
// Tan
// ASin
// ACos
// ATan
// ATan2
// Exp
// Log
// Log10
// Xor
// Shl
// Shr
// Sar
// Rnd
// Rand
// SeedRnd
// RndSeed
var ha;
(function (ha) {
    var bbjs;
    (function (bbjs) {
        class ProsessObj {
            _state = 0;
            get state() {
                return this._state;
            }
            set state(value) {
                this._state = value;
            }
            _mulai;
            get mulai() {
                return this._mulai;
            }
            set mulai(value) {
                this._mulai = value;
            }
            _proses;
            get proses() {
                return this._proses;
            }
            set proses(value) {
                this._proses = value;
            }
            _selesai;
            get selesai() {
                return this._selesai;
            }
            set selesai(value) {
                this._selesai = value;
            }
        }
        bbjs.ProsessObj = ProsessObj;
        class Proses {
            static daftar = [];
            static create() {
                let hsl = new ProsessObj();
                return hsl;
            }
            static update() {
                this.daftar.forEach((item) => {
                    if (0 == item.state) {
                        if (item.mulai)
                            item.mulai();
                        item.state++;
                    }
                    else if (1 == item.state) {
                        item.proses();
                    }
                    else if (2 == item.state) {
                        if (item.selesai)
                            item.selesai();
                        item.state = 3;
                    }
                    else if (3 == item.state) {
                        //kosong
                    }
                    else {
                        console.warn('state salah');
                    }
                });
            }
        }
        bbjs.Proses = Proses;
    })(bbjs = ha.bbjs || (ha.bbjs = {}));
})(ha || (ha = {}));
/*
Str
Left
Right
Mid
Replace
Instr
Upper
Lower
Trim
LSet
RSet
Chr
Asc
Len
Hex
Bin
*/ 
// Print
// Write
// Locate
// Text
// LoadFont
// SetFont
// FreeFont
// FontWidth
// FontHeight
// StringWidth
// StringHeight
var ha;
(function (ha) {
    var bbjs;
    (function (bbjs) {
        class Util {
            static checkParam(p) {
                for (let i = 0; i < p.length; i++) {
                    let item = p[i];
                    if (item == undefined)
                        return false;
                }
                return true;
            }
        }
        bbjs.Util = Util;
    })(bbjs = ha.bbjs || (ha.bbjs = {}));
})(ha || (ha = {}));
