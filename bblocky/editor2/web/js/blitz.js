"use strict";
//Stop
//DebugLog
var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class General {
            static Graphics = (width = 240, height = 320, canvas = null, fullScreen = true, handleInput = true) => {
                Grafis(width, height, canvas, fullScreen, handleInput);
            };
            static SetBuffer = (context) => {
                Kontek(context);
            };
            static GetColor = (x = 0, y = 0) => {
                AmbilPiksel(x, y);
            };
            static ColorRed = () => {
                return Merah();
            };
            static ColorGreen = () => {
                return Hijau();
            };
            static ColorBlue = Biru;
            static WritePixel = SetPiksel;
            static GraphicsBuffer = Kontek;
            static Color = Warna;
            static Cls = Bersih;
            static Plot = SetPiksel;
            static Line = Garis;
            static Rect = Kotak;
        }
        blitz.General = General;
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Id {
            static _id = Date.now();
            static getId() {
                Id._id++;
                return Id._id;
            }
        }
        blitz.Id = Id;
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Sprite {
            //load biasa
            //load dragable
            //load rotasi
            static LoadSprite = (url, dragable = false, mode = 1) => {
                let spr = Muat(url, dragable, mode, () => { });
                blitz.List.Tambah(spr);
            };
            static getDragMode(n) {
                let spr = blitz.List.Ambil(n);
                return spr.tipeDrag;
            }
            static setDragMode(n, mode) {
                let spr = blitz.List.Ambil(n);
                if (0 == mode) {
                    spr.dragable = false;
                    spr.tipeDrag = 0;
                }
                else {
                    spr.tipeDrag = mode;
                    spr.dragable = true;
                }
            }
            static CopySprite = Copy;
            static LoadAnimSprite = MuatAnimasi;
            static SpriteBuffer = SpriteKontek;
            static DrawSprite = Gambar;
            static TileSprite = Ubin;
            static HandleSprite = Handle;
            static ResizeSprite = Ukuran;
            static RotateSprite = Rotasi;
            static SpriteWidth = Panjang;
            static SpriteHeight = Lebar;
            static SpritesOverlap = Tabrakan;
            static SpritesCollide = Tabrakan;
            static RectsOverlap = Tabrakan;
            static SpriteRectOverlap = Tabrakan;
            static SpriteRectCollide = Tabrakan;
        }
        blitz.Sprite = Sprite;
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class List {
            static list = [];
            static Tambah(obj) {
                List.list.push({
                    id: blitz.Id.getId(),
                    obj: obj
                });
            }
            static Ambil(id) {
                for (let i = 0; i < List.list.length; i++) {
                    if (List.list[i].id == id)
                        return List.list[i];
                }
                return null;
            }
            static AmbilSprite(id) {
                return List.Ambil(id);
            }
        }
        blitz.List = List;
    })(blitz = ha.blitz || (ha.blitz = {}));
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
