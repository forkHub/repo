var ha_blitz;
(function (ha_blitz) {
    class Main {
        static _fps = 1000 / 30;
        static _origin;
        static _canvasAr = [];
        static _canvasAktif;
        static buatCanvas(canvasEl) {
            let canvas = {
                canvas: canvasEl,
                ctx: canvasEl.getContext('2d'),
                height: canvasEl.height,
                scaleX: 1,
                scaleY: 1,
                width: canvasEl.width,
                frameH: canvasEl.height,
                frameW: canvasEl.width,
                handleX: 0,
                handleY: 0,
                img: null,
                isAnim: false,
                rotation: 0,
                rect: ha.Rect.create(),
                load: true
            };
            return canvas;
        }
        static init(canvasBelakang, canvasDepan) {
            let canvas = this.buatCanvas(canvasBelakang);
            this._canvasAr.push(canvas);
            canvas = this.buatCanvas(canvasDepan);
            this._canvasAr.push(canvas);
            ha_blitz.Main.canvasAktif = canvas;
        }
        static Bersih = (r = 0, g = 0, b = 0, alpha = 1) => {
            let ctx = ha_blitz.Main.canvasAktif.ctx;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.fillRect(0, 0, ha_blitz.Main.canvasAktif.width, ha_blitz.Main.canvasAktif.height);
        };
        static Color = (r = 0, g = 0, b = 0, a = 1) => {
            let ctx = ha_blitz.Main.canvasAktif.ctx;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        };
        static Grafis = (width = 320, height = 240, gl = true, pixel = true) => {
            let canvas = ha_blitz.Main.canvasAktif;
            canvas.canvas.width = width;
            canvas.canvas.height = height;
            canvas.width = width;
            canvas.height = height;
            if (gl) {
                ha_blitz.Main.canvasAktif.canvas.classList.add('gl');
            }
            else {
                ha_blitz.Main.canvasAktif.canvas.classList.remove('gl');
            }
            if (pixel) {
                ha_blitz.Main.canvasAktif.canvas.classList.add('pixel');
            }
            // ha_blitz.Main.windowResize();
        };
        static Garis = (x1, y1, x2, y2) => {
            let ctx = ha_blitz.Main.canvasAktif.ctx;
            x1 = Math.floor(x1);
            y1 = Math.floor(y1);
            x2 = Math.floor(x2);
            y2 = Math.floor(y2);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        };
        static Kotak = (x1, y1, x2, y2) => {
            let ctx = ha_blitz.Main.canvasAktif.ctx;
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        };
        static SetBuffer = (buffer) => {
            ha_blitz.Main.canvasAktif = buffer;
        };
        static get canvasAktif() {
            return this._canvasAktif;
        }
        static set canvasAktif(value) {
            this._canvasAktif = value;
        }
        static get canvasAr() {
            return this._canvasAr;
        }
        static set canvasAr(value) {
            this._canvasAr = value;
        }
        static get origin() {
            return this._origin;
        }
        static set origin(value) {
            this._origin = value;
        }
        static get fps() {
            return this._fps;
        }
        static set fps(value) {
            this._fps = value;
        }
    }
    ha_blitz.Main = Main;
})(ha_blitz || (ha_blitz = {}));
var ha_blitz;
(function (ha_blitz) {
    class Image {
        // readonly daftar: IGambar[] = [];
        static buatGambar(w = 32, h = 32, frameW = 32, frameH = 32) {
            let canvas = document.createElement('canvas');
            let img;
            canvas.width = w;
            canvas.height = h;
            let rect = ha.Rect.create(0, 0, frameW, frameH);
            img = {
                width: w,
                height: h,
                img: null,
                frameH: frameH,
                frameW: frameW,
                handleX: 0,
                handleY: 0,
                rotation: 0,
                isAnim: false,
                scaleX: 1,
                scaleY: 1,
                canvas: canvas,
                ctx: canvas.getContext('2d'),
                rect: rect,
                load: true
            };
            return img;
        }
        static panjangGambar(gbr) { return gbr.frameW * gbr.scaleX; }
        ;
        static lebarGambar(gbr) { return gbr.frameH * gbr.scaleY; }
        ;
        static handleXGambar(gbr) { return gbr.handleX; }
        ;
        static handleYGambar(gbr) { return gbr.handleY; }
        ;
        //TODO:
        static gambarOverlap(gbr1, x1, y1, gbr2, x2, y2) {
            GambarTabrakan(gbr1, x1, y1, gbr2, x2, y2);
        }
        ;
        static gambarTabrakan(gbr1, x1, y1, gbr2, x2, y2) {
            ha_blitz.image.resetImageRect(gbr1);
            ha_blitz.image.rectToImageTransform(gbr1, x1, y1);
            ha_blitz.image.resetImageRect(gbr2);
            ha_blitz.image.rectToImageTransform(gbr2, x2, y2);
            return ha.Rect.collide(gbr1.rect, gbr2.rect);
        }
        ;
        static dotDidalamGambar(gbr1, x1, y1, x2, y2) {
            ha_blitz.image.resetImageRect(gbr1);
            ha_blitz.image.rectToImageTransform(gbr1, x1, y1);
            return ha.Rect.collideDot(gbr1.rect, x2, y2);
        }
        ;
        static async muatGambarAnimasi(url, fw = 32, fh = 32) {
            let img = await ha_blitz.image.loadImage(url);
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let rect;
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            rect = ha.Rect.create(0, 0, fw, fh);
            return {
                img: img,
                width: img.naturalWidth,
                height: img.naturalHeight,
                frameH: fw,
                frameW: fh,
                // width2: w,
                // height2: h,
                isAnim: true,
                handleX: 0,
                handleY: 0,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                ctx: ctx,
                canvas: canvas,
                rect: rect,
                load: true
            };
        }
        static gambarUbin(gbr, x = 0, y = 0, frame = 0) {
            let jmlH = 0;
            let jmlV = 0;
            let w2 = Math.floor(gbr.frameW * gbr.scaleX);
            let h2 = Math.floor(gbr.frameH * gbr.scaleY);
            while (x < 0) {
                x += w2;
            }
            while (y < 0) {
                y += h2;
            }
            x -= w2;
            y -= h2;
            frame = Math.floor(frame);
            jmlH = Math.ceil((ha_blitz.Main.canvasAktif.width + Math.abs(x)) / w2);
            jmlV = Math.ceil((ha_blitz.Main.canvasAktif.height + Math.abs(y)) / h2);
            for (let i = 0; i < jmlH; i++) {
                for (let j = 0; j < jmlV; j++) {
                    TaruhGambar(gbr, x + (i * w2), y + (j * h2), frame);
                }
            }
        }
        static putarGambar(gbr, sudut = 0) {
            gbr.rotation = sudut;
        }
        static skalaGambar(gbr, skalaX = 1, skalaY = 1) {
            gbr.scaleX = skalaX;
            gbr.scaleY = skalaY;
        }
        static ambilPiksel(x = 0, y = 0) {
            try {
                let data = ha_blitz.Main.canvasAktif.ctx.getImageData(x, y, 1, 1).data;
                let hasil = [];
                hasil.push(data[0]);
                hasil.push(data[1]);
                hasil.push(data[2]);
                hasil.push(data[3]);
                return hasil;
            }
            catch (e) {
                console.error(e);
            }
            return [0, 0, 0];
        }
        //TODO: dep
        static setWarna(r = 255, g = 255, b = 255, a = 1) {
            let ctx = ha_blitz.Main.canvasAktif.ctx;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        }
        static setPiksel(x = 0, y = 0) {
            ha_blitz.Main.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
        }
        static posisiHandleGambar(gbr, x = 0, y = 0) {
            gbr.handleX = x;
            gbr.handleY = y;
        }
        static grabGambar(gbr, x = 0, y = 0) {
            gbr.ctx.drawImage(ha_blitz.Main.canvasAktif.canvas, x, y, gbr.width, gbr.height, 0, 0, gbr.width, gbr.height);
        }
        // static copyGambar(src: IGambar): IGambar {
        // 	return {
        // 		canvas: src.canvas,
        // 		ctx: src.ctx,
        // 		frameH: src.frameH,
        // 		frameW: src.frameW,
        // 		handleX: src.handleX,
        // 		handleY: src.handleY,
        // 		height: src.height,
        // 		img: src.img,
        // 		isAnim: src.isAnim,
        // 		rect: ha.Rect.copy(src.rect),
        // 		rotation: src.rotation,
        // 		scaleX: src.scaleX,
        // 		scaleY: src.scaleY,
        // 		width: src.width,
        // 		load: src.load
        // 	}
        // }
        static async muat(url) {
            let img = await ha_blitz.image.loadImage(url);
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let rect;
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);
            let gbr = {
                img: img,
                width: img.naturalWidth,
                height: img.naturalHeight,
                frameH: img.naturalHeight,
                frameW: img.naturalWidth,
                isAnim: false,
                handleX: 0,
                handleY: 0,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                ctx: ctx,
                canvas: canvas,
                rect: rect,
                load: true
            };
            // ha_blitz.image.daftar.push(gbr);
            return gbr;
        }
        static muatAsync(url) {
            let img = document.createElement('img'); //ha_blitz.image.loadImageAsync(url, () => { }, () => { });
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let rect;
            rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);
            let gbr = {
                img: img,
                width: img.naturalWidth,
                height: img.naturalHeight,
                frameH: img.naturalHeight,
                frameW: img.naturalWidth,
                isAnim: false,
                handleX: 0,
                handleY: 0,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                ctx: ctx,
                canvas: canvas,
                rect: rect,
                load: false
            };
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                gbr.rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);
                // rect.
            };
            img.onerror = () => {
                console.log('gagal load image, url ' + url);
                //TODO: default image
            };
            img.src = url;
            // ha_blitz.image.daftar.push(gbr);
            return gbr;
        }
        static gambar(gbr, x = 0, y = 0, frame = 0) {
            let ctx = ha_blitz.Main.canvasAktif.ctx;
            let jmlH;
            let jmlV;
            let frameX;
            let frameY;
            // let rect: IRect = img.rect;
            jmlH = Math.floor(gbr.width / gbr.frameW);
            jmlV = Math.floor(gbr.height / gbr.frameH);
            frameX = (frame % jmlH);
            frameY = Math.floor(frame / jmlV);
            frameX *= gbr.frameW;
            frameY *= gbr.frameH;
            frameX = Math.floor(frameX);
            frameY = Math.floor(frameY);
            let x2 = Math.floor(x);
            let y2 = Math.floor(y);
            let w2 = Math.floor(gbr.frameW * gbr.scaleX);
            let h2 = Math.floor(gbr.frameH * gbr.scaleY);
            x2 -= (gbr.handleX);
            y2 -= (gbr.handleY);
            if (gbr.rotation != 0) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(gbr.rotation * (Math.PI / 180));
                ctx.drawImage(gbr.img, frameX, frameY, gbr.frameW, gbr.frameH, -gbr.handleX, -gbr.handleY, w2, h2);
                ctx.restore();
            }
            else {
                ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, x2, y2, w2, h2);
            }
        }
        handleTengah = (gbr) => {
            gbr.handleX = Math.floor((gbr.frameW * gbr.scaleX) / 2);
            gbr.handleY = Math.floor((gbr.frameH * gbr.scaleY) / 2);
        };
        /**
         * Ubah Ukuran Gambar
         * @param gbr
         * @param w
         * @param h
         */
        ukuranGambar(gbr, w, h) {
            gbr.scaleX = Math.floor(w) / gbr.frameW;
            gbr.scaleY = Math.floor(h) / gbr.frameH;
        }
        // loadImageAsync = (url: string, ok: () => void, error: () => void): HTMLImageElement => {
        // 	let image2: HTMLImageElement = document.createElement('img');
        // 	image2.src = url;
        // 	image2.onload = () => {
        // 		ok();
        // 	}
        // 	image2.onerror = (e) => {
        // 		error();
        // 	}
        // 	return image2;
        // }
        loadImage = async (url) => {
            return new Promise((resolve, reject) => {
                let image2 = document.createElement('img');
                image2.onload = () => {
                    resolve(image2);
                };
                image2.src = url;
                image2.onerror = (e) => {
                    reject(e);
                };
            });
        };
        resetImageRect(img) {
            let rect = img.rect;
            let p;
            p = rect.vs[0];
            p.x = 0;
            p.y = 0;
            p = rect.vs[1];
            p.x = img.frameW;
            p.y = 0;
            p = rect.vs[2];
            p.x = img.frameW;
            p.y = img.frameH;
            p = rect.vs[3];
            p.x = 0;
            p.y = img.frameH;
        }
        rectToImageTransform(image, x, y) {
            let rect = image.rect;
            let p;
            let x2 = image.frameW * image.scaleX;
            let y2 = image.frameH * image.scaleY;
            //scale
            p = rect.vs[1];
            p.x = x2;
            p.y = 0;
            p = rect.vs[2];
            p.x = x2;
            p.y = y2;
            p = rect.vs[3];
            p.x = 0;
            p.y = y2;
            //translate
            ha.Rect.translate(rect, x, y);
            ha.Rect.translate(rect, -image.handleX, -image.handleY);
            //rotate
            ha.Rect.rotate(rect, image.rotation, x, y);
        }
    }
    ha_blitz.Image = Image;
    ha_blitz.image = new Image();
})(ha_blitz || (ha_blitz = {}));
///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
/**
 * IMAGE
 */
const BuatGambar = ha_blitz.Image.buatGambar;
// const CopyGambar = ha_blitz.Image.copyGambar;
const TaruhGambar = ha_blitz.Image.gambar;
const GrabGambar = ha_blitz.Image.grabGambar; //TODO: test - dihapus
const PosisiHandleGambar = ha_blitz.Image.posisiHandleGambar;
const PanjangGambar = ha_blitz.Image.panjangGambar;
const LebarGambar = ha_blitz.Image.lebarGambar;
const HandleXGambar = ha_blitz.Image.handleXGambar;
const HandleYGambar = ha_blitz.Image.handleYGambar;
const GambarOverlap = ha_blitz.Image.gambarOverlap;
const GambarTabrakan = ha_blitz.Image.gambarTabrakan;
const DotDidalamGambar = ha_blitz.Image.dotDidalamGambar;
const MuatGambar = ha_blitz.Image.muat;
const MuatGambarAnimasi = ha_blitz.Image.muatGambarAnimasi;
const GambarUbin = ha_blitz.Image.gambarUbin;
const ResizeGambar = ha_blitz.image.ukuranGambar;
const PutarGambar = ha_blitz.Image.putarGambar;
const SkalaGambar = ha_blitz.Image.skalaGambar;
const AmbilPiksel = ha_blitz.Image.ambilPiksel;
const SetWarna = ha_blitz.Image.setWarna;
const SetPiksel = ha_blitz.Image.setPiksel;
//TODO: next
const ImagePivot = () => { };
const BackgroundImage = () => { };
const MainLayer = () => { };
const CreateLayer = () => { };
const LayerZ = () => { };
///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
/*
 * BLITZ-INPUT.TS
 */
//TODO: promise
const Prompt = (m, def) => {
    let hasil = window.prompt(m, def);
    return hasil;
};
const InputHit = () => {
    let hit = ha.input.inputGlobal.hit;
    ha.input.inputGlobal.hit = 0;
    return hit;
};
const TungguInput = async () => {
    while (true) {
        if (InputHit() > 0)
            return;
        Jeda(30);
    }
};
const InputX = () => {
    return ha.input.inputGlobal.x;
};
const InputY = () => {
    return ha.input.inputGlobal.y;
};
const InputGeserX = () => {
    return ha.input.inputGlobal.xDrag;
};
const InputGeserY = () => {
    return ha.input.inputGlobal.yDrag;
};
const FlushInput = () => {
    ha.input.flush();
};
const Pencet = () => {
    return ha.input.inputGlobal.isDown;
};
const Geser = () => {
    return ha.input.inputGlobal.isDrag;
};
/**
 * 	KEYBOARD
 */
const FlushKeys = () => {
    ha.input.flushByInput(ha.input.keybGlobal);
    ha.input.flushByType('keyb');
};
const GetKey = () => {
    return ha.input.keybGlobal.key;
};
const KeybDiPencet = (key = '') => {
    if ("" == key) {
        return ha.input.keybGlobal.isDown;
    }
    else {
        let input = ha.input.getInput(key, 'keyb');
        if (input) {
            return input.isDown;
        }
        return false;
    }
};
const KeybHit = (key = '') => {
    if ("" == key) {
        let n = ha.input.keybGlobal.hit;
        ha.input.keybGlobal.hit = 0;
        return (n);
    }
    else {
        let input = ha.input.getInput(key, 'keyb');
        let n = 0;
        if (input) {
            n = input.hit;
            input.hit = 0;
        }
        return n;
    }
};
const TungguKeyb = async (kode = "") => {
    console.log('wait key: ' + kode);
    let ulang = true;
    while (ulang) {
        if (KeybHit(kode) > 0)
            ulang = false;
        await Jeda(30);
    }
    console.log('wait key end');
};
/**
 * MOUSE dihapus
 */
//Get Mouse Id of the last pressed mouse
const GetMouse = () => {
    return parseInt(ha.input.mouseGlobal.key);
};
//how many time mouse is hit
const MouseHit = (button = -1) => {
    if (button == -1) {
        //TODO:
    }
    else {
        //TODO:
    }
    return 0;
};
const MouseDown = (key) => {
    key;
    return false;
};
const WaitMouse = () => {
};
const MouseX = () => {
    return 0;
};
const MouseY = () => {
    return 0;
};
const MouseZ = () => {
    return 0;
};
const FlushMouse = () => {
};
//MouseDragX
//MouseDragY
//MouseDragAngle
//MouseUp
/**
 * INTERFACE
*/
///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
/*
 * 	GRAPHICS
 */
const Bersih = ha_blitz.Main.Bersih;
const Color = ha_blitz.Main.Color;
const Grafis = ha_blitz.Main.Grafis;
const Garis = ha_blitz.Main.Garis;
const Kotak = ha_blitz.Main.Kotak;
const SetBuffer = ha_blitz.Main.SetBuffer;
const GraphicsBuffer = () => { };
const Origin = () => { };
const Oval = () => { };
const WritePixel = () => { };
const ReadPixel = () => { };
const Plot = () => { };
const WarnaMerah = () => { };
const ColorBlue = () => { };
const ColorGreen = () => { };
const ClsColor = () => { };
const CopyPixel = () => { };
const CopyRect = () => { };
const FrontBuffer = () => { };
const GetColor = () => { };
const BackBuffer = () => { };
///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
/** SPRITE.TS */
var ha_blitz;
(function (ha_blitz) {
    class Sprite {
        static daftar = [];
        _buffer;
        _x = 0;
        _y = 0;
        _dragged = false;
        _down = false;
        _hit = 0;
        _dragStartY = 0;
        _dragStartX = 0;
        _dragable = false;
        constructor(buffer, dragable = false) {
            this.buffer = buffer;
            this.dragable = dragable;
        }
        static posisi(sprite, x = 0, y = 0) {
            sprite.x = x;
            sprite.y = y;
        }
        static posisiX(spr, x = null) {
            if (typeof (x) == 'number') {
                spr.x = x;
            }
            return spr.x;
        }
        static posisiY(spr, y = null) {
            if (typeof (y) == 'number') {
                spr.y = y;
            }
            return spr.y;
        }
        static gambarSemua() {
            ha_blitz.Sprite.daftar.forEach((item) => {
                this.gambar(item);
            });
        }
        static muatAsync(url, dragable = false) {
            let img = ha_blitz.Image.muatAsync(url);
            return this.buat(img, dragable);
        }
        static async muat(url, dragable = false) {
            let img = await ha_blitz.Image.muat(url);
            return this.buat(img, dragable);
        }
        static ukuranGambar(gbr, w, h) {
            ha_blitz.image.ukuranGambar(gbr.buffer, w, h);
        }
        static handleTengah(gbr) {
            ha_blitz.image.handleTengah(gbr.buffer);
        }
        static buat(image, dragable = false) {
            let hasil;
            hasil = new Sprite(image, dragable);
            this.daftar.push(hasil);
            console.log('buat sprite');
            return hasil;
        }
        static inputDown(pos) {
            ha_blitz.Sprite.daftar.forEach((item) => {
                item.down = false;
            });
            //sprite down
            for (let i = ha_blitz.Sprite.daftar.length - 1; i >= 0; i--) {
                let item;
                item = ha_blitz.Sprite.daftar[i];
                if (DotDidalamGambar(item.buffer, item.x, item.y, pos.x, pos.y)) {
                    item.down = true;
                    item.dragStartX = pos.x - item.x;
                    item.dragStartY = pos.y - item.y;
                    return;
                }
            }
        }
        static inputMove(pos) {
            ha_blitz.Sprite.daftar.forEach((item) => {
                if (item.down && item.dragable) {
                    item.dragged = true;
                    item.x = pos.x - item.dragStartX;
                    item.y = pos.y - item.dragStartY;
                }
            });
        }
        static inputUp() {
            ha_blitz.Sprite.daftar.forEach((item) => {
                if (item.down) {
                    item.hit++;
                }
                item.down = false;
                item.dragged = false;
            });
        }
        static gambar(sprite) {
            TaruhGambar(sprite.buffer, sprite.x, sprite.y);
        }
        static posisiPolar(sprite, sudut, jarak, x2, y2) {
            let p = ha.Point.posPolar(jarak, sudut, x2, y2);
            sprite.x = p.x;
            sprite.y = p.y;
        }
        get dragStartX() {
            return this._dragStartX;
        }
        set dragStartX(value) {
            this._dragStartX = value;
        }
        get dragStartY() {
            return this._dragStartY;
        }
        set dragStartY(value) {
            this._dragStartY = value;
        }
        get dragged() {
            return this._dragged;
        }
        set dragged(value) {
            this._dragged = value;
        }
        get buffer() {
            return this._buffer;
        }
        set buffer(value) {
            this._buffer = value;
        }
        get x() {
            return this._x;
        }
        set x(value) {
            this._x = value;
        }
        get y() {
            return this._y;
        }
        set y(value) {
            this._y = value;
        }
        get hit() {
            return this._hit;
        }
        set hit(value) {
            this._hit = value;
        }
        get down() {
            return this._down;
        }
        set down(value) {
            this._down = value;
        }
        get dragable() {
            return this._dragable;
        }
        set dragable(value) {
            this._dragable = value;
        }
    }
    ha_blitz.Sprite = Sprite;
})(ha_blitz || (ha_blitz = {}));
///<reference path="../ha/blitz/Sprite.ts"/>
/** BLITZ-SPRITE.TS */
const Buat = ha_blitz.Sprite.buat;
const Muat = ha_blitz.Sprite.muatAsync;
const Posisi = ha_blitz.Sprite.posisi;
const Ukuran = ha_blitz.Sprite.ukuranGambar;
const HandleTengah = ha_blitz.Sprite.handleTengah;
const PosisiPolar = ha_blitz.Sprite.posisiPolar;
const Gambar = ha_blitz.Sprite.gambar;
const GambarSemua = ha_blitz.Sprite.gambarSemua;
const PosisiX = ha_blitz.Sprite.posisiX;
const PosisiY = ha_blitz.Sprite.posisiY;
const PosisiJarakSprite = () => { };
const Copy = () => { };
const PosisiHandle = () => { };
const Panjang = () => { };
const Lebar = () => { };
const HandleX = () => { };
const HandleY = () => { };
const Overlap = () => { };
const Tabrakan = () => { };
const DotDiDalam = () => { };
const MuatAnimasi = () => { };
const Ubin = () => { };
const Putar = () => { };
const Skala = () => { };
const Piksel = () => { };
const Warna = () => { };
const Merah = () => { };
const Hijau = () => { };
const Biru = () => { };
///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>
const Jeda = async (m = 0) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve();
        }, m);
    });
};
const FPS = (n) => {
    ha_blitz.Main.fps = Math.floor(1000 / n);
    if (n >= 60) {
        ha_blitz.Main.fps = 0;
    }
};
//TODO: dihapus
//TODO: kemungkinan diganti buat nyesuain sama blitz
const Dim = (...args) => {
    if (0 == args.length) {
        return [];
    }
    else if (1 == args.length) {
        let hasil = [];
        for (let i = 0; i < args[0]; i++) {
            hasil[i] = {};
        }
        return hasil;
    }
    else if (2 == args.length) {
        if (typeof args[1] == 'number') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = [];
                for (let j = 0; j < args[1]; j++) {
                    hasil[i][j] = {};
                }
            }
            return hasil;
        }
        else if (typeof args[1] == 'function') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = {};
                args[1](hasil[i]);
            }
            return hasil;
        }
        else if (typeof args[1] == 'object') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                try {
                    hasil[i] = JSON.parse(JSON.stringify(args[1]));
                }
                catch (e) {
                    console.error(e);
                    hasil[i] = {};
                }
            }
            return hasil;
        }
        else {
            throw new Error('second argument is invalid, expected number or function or object');
        }
    }
    else if (3 == args.length) {
        if (typeof args[2] == 'function') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = [];
                for (let j = 0; j < args[1]; j++) {
                    hasil[i][j] = {};
                    args[2](hasil[i][j]);
                }
            }
            return hasil;
        }
        else if (typeof args[2] == 'object') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = [];
                for (let j = 0; j < args[1]; j++) {
                    hasil[i][j] = JSON.parse(JSON.stringify(args[2]));
                }
            }
            return hasil;
        }
        else {
            throw Error('expecting third argument is a function or object');
        }
    }
    else {
        throw Error('arguments invalid, expected max arguments: 3');
    }
};
const Millisecs = () => {
    return Date.now();
};
/**
 * TEXTS
 */ 
/** INPUT.TS */
var ha;
(function (ha) {
    class Input {
        _inputs = []; //any input,
        //data untuk simpan state tiap input type
        //tidak support multiple finger
        _touchGlobal; //global touch
        _mouseGlobal; //global mouse
        _keybGlobal; //global keyb
        _inputGlobal; //global input
        _event = new EventHandler();
        constructor() {
            this._touchGlobal = this.buatInputDefault();
            this._mouseGlobal = this.buatInputDefault();
            this._keybGlobal = this.buatInputDefault();
            this._inputGlobal = this.buatInputDefault();
            this._touchGlobal.type = 'touch';
            this._keybGlobal.type = 'keyb';
            this._mouseGlobal.type = 'mouse';
        }
        getMouseKeyId(e) {
            if (e.pointerType == 'touch') {
                return e.pointerId + '';
            }
            else if (e.pointerType == 'mouse') {
                return e.button + '';
            }
            throw Error('');
        }
        init(buffer) {
            console.log('input init');
            console.log('buffer');
            console.log(buffer);
            buffer.canvas.onpointerdown = (e) => {
                e.stopPropagation();
                // e.preventDefault();
                let pos = ha.input.pos(e.clientX, e.clientY, buffer, buffer.scaleX, buffer.scaleY);
                let key = this.getMouseKeyId(e);
                let input = ha.input.baru(key, e.pointerType);
                ha.input.event.down(input, key, e.pointerType, pos);
                ha.input.event.down(this._inputGlobal, key, e.pointerType, pos);
                if ("mouse" == e.pointerType)
                    ha.input.event.down(this._mouseGlobal, key, 'mouse', pos);
                if ("touch" == e.pointerType)
                    ha.input.event.down(this._touchGlobal, key, 'touch', pos);
                ha_blitz.Sprite.inputDown(pos);
            };
            buffer.canvas.onpointermove = (e) => {
                e.stopPropagation();
                let input = this.baru(e.button + '', e.pointerType);
                ha.input.event.move(input, buffer, e);
                ha.input.event.move(this.inputGlobal, buffer, e);
                if (e.pointerType == 'touch')
                    ha.input.event.move(ha.input.touchGlobal, buffer, e);
                if (e.pointerType == 'mouse')
                    ha.input.event.move(ha.input.mouseGlobal, buffer, e);
                //sprite	
                //sprite move
                let pos = ha.input.pos(e.clientX, e.clientY, buffer, buffer.scaleX, buffer.scaleY);
                ha_blitz.Sprite.inputMove(pos);
            };
            buffer.canvas.onpointerout = (e) => {
                e.stopPropagation();
                let input = ha.input.baru(e.button + '', e.pointerType);
                ha.input.event.up(input);
                ha.input.event.up(this.inputGlobal);
                if (e.pointerType == 'touch')
                    ha.input.event.up(ha.input.touchGlobal);
                if (e.pointerType == 'mouse')
                    ha.input.event.up(ha.input.mouseGlobal);
            };
            buffer.canvas.onpointercancel = (e) => {
                e.stopPropagation();
                e.preventDefault();
            };
            buffer.canvas.onpointerup = (e) => {
                e.stopPropagation();
                // console.log('on pointer up');
                let input = ha.input.baru(e.button + '', e.pointerType);
                ha.input.event.up(input);
                ha.input.event.up(this.inputGlobal);
                if (e.pointerType == 'touch')
                    ha.input.event.up(ha.input.touchGlobal);
                if (e.pointerType == 'mouse')
                    ha.input.event.up(ha.input.mouseGlobal);
                //sprite up
                //sprite hit
                ha_blitz.Sprite.daftar.forEach((item) => {
                    if (item.down) {
                        item.hit++;
                    }
                    item.down = false;
                    item.dragged = false;
                    // console.log("item drag end");
                });
            };
            window.onkeydown = (e) => {
                // e.stopPropagation();
                // e.preventDefault();
                let input = ha.input.baru(e.key + '', 'keyb');
                ha.input.event.down(input, e.key, 'keyb', ha.Point.create());
                ha.input.event.down(this.inputGlobal, e.key, 'keyb', ha.Point.create());
                ha.input.event.down(this._keybGlobal, e.key, 'keyb', ha.Point.create());
                console.log('keydown');
            };
            window.onkeyup = (e) => {
                // e.stopPropagation();
                let input = ha.input.baru(e.key + '', 'keyb');
                ha.input.event.up(input);
                ha.input.event.up(this.inputGlobal);
                ha.input.event.up(this._keybGlobal);
            };
        }
        buatInputDefault() {
            return {
                id: 0,
                isDown: false,
                isDrag: false,
                // isHit: false,
                isTap: false,
                key: '',
                timerEnd: 0,
                timerStart: 0,
                type: '',
                x: 0,
                xDrag: 0,
                xStart: 0,
                y: 0,
                yDrag: 0,
                yStart: 0,
                hit: 0
            };
        }
        reset(input) {
            input.id = 0;
            input.isDown = false;
            input.isDrag = false;
            // input.isHit = false;
            input.isTap = false;
            input.key = '';
            input.timerEnd = 0;
            input.timerStart = 0;
            input.type = '';
            input.x = 0;
            input.y = 0;
            input.xDrag = 0;
            input.yDrag = 0;
            input.xStart = 0;
            input.yStart = 0;
        }
        flush() {
            while (this.inputs.length > 0) {
                this.inputs.pop();
            }
            this.flushByInput(this._inputGlobal);
            this.flushByInput(this._mouseGlobal);
            this.flushByInput(this._touchGlobal);
            this.flushByInput(this._keybGlobal);
        }
        flushByType(type) {
            this._inputs.forEach((input) => {
                if (type == input.type) {
                    this.flushByInput(input);
                }
            });
        }
        flushByInput(input) {
            input.isDown = false;
            input.isDrag = false;
            // input.isHit = false;
            input.isTap = false;
            input.hit = 0;
        }
        getInput(key, inputType) {
            let inputHasil;
            for (let i = 0; i < this.inputs.length; i++) {
                let input = this.inputs[i];
                if (input.type == inputType && input.key == key) {
                    inputHasil = input;
                    return inputHasil;
                }
            }
            return inputHasil;
        }
        baru(keyId, inputType) {
            let input = this.getInput(keyId, inputType);
            if (!input) {
                input = {
                    key: keyId,
                    type: inputType,
                    isDown: false,
                    isDrag: false,
                    isTap: false,
                    timerEnd: 0,
                    timerStart: 0,
                    x: 0,
                    xDrag: 0,
                    xStart: 0,
                    y: 0,
                    yDrag: 0,
                    yStart: 0,
                    id: 0,
                    hit: 0
                };
                this.inputs.push(input);
            }
            return input;
        }
        pos = (cx, cy, buffer, canvasScaleX, canvasScaleY) => {
            let rect = buffer.canvas.getBoundingClientRect();
            let poslx = Math.floor((cx - rect.x) / canvasScaleX);
            let posly = Math.floor((cy - rect.y) / canvasScaleY);
            return {
                x: poslx,
                y: posly
            };
        };
        get inputs() {
            return this._inputs;
        }
        get event() {
            return this._event;
        }
        get touchGlobal() {
            return this._touchGlobal;
        }
        get mouseGlobal() {
            return this._mouseGlobal;
        }
        get keybGlobal() {
            return this._keybGlobal;
        }
        get inputGlobal() {
            return this._inputGlobal;
        }
    }
    class EventHandler {
        move(input, buffer, e) {
            let pos = ha.input.pos(e.clientX, e.clientY, buffer, buffer.scaleX, buffer.scaleY);
            input.x = pos.x;
            input.y = pos.y;
            input.id = e.pointerId;
            if (input.isDown) {
                input.isDrag = true;
                input.xDrag = input.x - input.xStart;
                input.yDrag = input.y - input.yStart;
            }
        }
        down(input, key, type, pos) {
            //TODO: refaktor 
            if (!input.isDown) {
                input.hit++;
            }
            input.xStart = pos.x;
            input.yStart = pos.y;
            input.x = pos.x;
            input.y = pos.y;
            input.isDown = true;
            input.isTap = false;
            input.isDrag = false;
            input.key = key;
            input.type = type;
            input.timerStart = Date.now();
        }
        up(input2) {
            input2.isDown = false;
            input2.isDrag = false;
            input2.timerEnd = Date.now();
            input2.isTap = ((input2.timerEnd - input2.timerStart) < 500);
        }
    }
    ha.input = new Input();
})(ha || (ha = {}));
/**
 * INTERFACE
*/
