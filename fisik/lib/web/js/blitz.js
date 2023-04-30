var ha;
(function (ha) {
    var be;
    (function (be) {
        class Main {
            //TODOL ganti agar bisa gonta-ganti kontek
            //parameternya adalah sprite/canvas/kontex
            //tujuannya agar bisa diedit langsung oleh perintah kontek yang lain
            static Kontek(spr) {
                let spr2 = spr;
                if (spr2 && spr2.buffer && spr2.buffer.ctx) {
                    return spr2.buffer.ctx;
                }
                let spr3 = spr;
                if (spr3 && spr3.getContext instanceof Function) {
                    return spr3.getContext('2d');
                }
                return Main.canvasAktif.ctx;
            }
            static Fps(n) {
                Main.fps = Math.floor(1000 / n);
                if (n >= 60) {
                    Main.fps = 0;
                }
            }
            static buatCanvas(canvasEl) {
                let canvas = {
                    canvas: canvasEl,
                    ctx: canvasEl.getContext('2d'),
                    lebar: canvasEl.height,
                    // scaleX: 1,
                    // scaleY: 1,
                    panjang: canvasEl.width,
                    frameH: canvasEl.height,
                    frameW: canvasEl.width,
                    handleX: 0,
                    handleY: 0,
                    img: null,
                    isAnim: false,
                    rotasi: 0,
                    alpha: 1,
                    rect: be.Rect.create(),
                    load: true,
                    panjangDiSet: true,
                    lebarDiSet: true,
                    ratioX: 1,
                    ratioY: 1
                };
                return canvas;
            }
            static init(canvasBelakang, canvasDepan) {
                let canvas = Main.buatCanvas(canvasBelakang);
                Main._canvasAr.push(canvas);
                canvas = Main.buatCanvas(canvasDepan);
                Main._canvasAr.push(canvas);
                Main.canvasAktif = canvas;
            }
            static backupWarna() {
                Main.warnaBackup.b = Main.biru;
                Main.warnaBackup.h = Main.hijau;
                Main.warnaBackup.m = Main.merah;
                Main.warnaBackup.t = Main.transparan;
            }
            static restoreWarna() {
                Main.biru = Main.warnaBackup.b;
                Main.hijau = Main.warnaBackup.h;
                Main.merah = Main.warnaBackup.m;
                Main.transparan = Main.warnaBackup.t;
                Main.updateStyleWarna();
            }
            static Bersih(m = 0, h = 0, b = 0, t = 100) {
                let ctx = Main.canvasAktif.ctx;
                Main.backupWarna();
                ctx.fillStyle = `rgba(${m}, ${h}, ${b}, ${t / 100})`;
                ctx.fillRect(0, 0, Main.canvasAktif.panjang, Main.canvasAktif.lebar);
                Main.restoreWarna();
            }
            static Warna(r = 0, g = 0, b = 0, a = 100) {
                let h = Main;
                h.merah = r;
                h.biru = b;
                h.hijau = g;
                h.transparan = a / 100;
                h.updateStyleWarna();
            }
            static updateStyleWarna() {
                let ctx = Main.canvasAktif.ctx;
                ctx.fillStyle = `rgba(${Main.merah}, ${Main.hijau}, ${Main.biru}, ${Main.transparan})`;
            }
            static Hijau() {
                return Main.hijau;
            }
            static Merah() {
                return Main.merah;
            }
            static Biru() {
                return Main.biru;
            }
            static Transparan() {
                return Math.floor(Main.transparan * 100);
            }
            static Kanvas() {
                return Main.canvasAktif.canvas;
            }
            static Grafis(p = 320, l = 240, ubahStyle) {
                let canvas = Main.canvasAktif;
                canvas.canvas.width = p;
                canvas.canvas.height = l;
                if (ubahStyle) {
                    canvas.canvas.style.width = p + 'px';
                    canvas.canvas.style.height = l + 'px';
                    canvas.canvas.style.padding = '0px';
                    canvas.canvas.style.margin = '0px';
                }
                //TODO: coba di check
                canvas.panjang = p;
                canvas.lebar = l;
                setTimeout(() => {
                    if (be.Blijs.skalaOtomatis) {
                        be.Blijs.windowResize();
                    }
                    else {
                    }
                }, 0);
                // if (canvas2) {
                // 	Main.canvasAktif.canvas.classList.add('gl');
                // }
                // else {
                // 	Main.canvasAktif.canvas.classList.remove('gl');
                // }
                // if (skalaOtomatis) {
                // 	Main.canvasAktif.canvas.classList.add('pixel');
                // }
                // ha_blitz.Main.windowResize();
            }
            static Garis(x1, y1, x2, y2) {
                let ctx = Main.canvasAktif.ctx;
                x1 = Math.floor(x1);
                y1 = Math.floor(y1);
                x2 = Math.floor(x2);
                y2 = Math.floor(y2);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
            //kotak
            static Kotak(x1, y1, x2, y2, isi = false, garis = true, rotasi = 0) {
                let ctx = Main.canvasAktif.ctx;
                //TODO: rotasi
                rotasi;
                if (isi) {
                    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
                }
                if (garis) {
                    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
                }
            }
            static Oval(x = 0, y = 0, radius, skalaX = 1, skalaY = .5, rotasi = 0) {
                let ctx = Main.canvasAktif.ctx;
                // save state
                ctx.save();
                // translate context
                ctx.translate(x, y);
                ctx.rotate(rotasi * (Math.PI / 180));
                // scale context horizontally
                ctx.scale(skalaX, skalaY);
                // draw circle which will be stretched into an oval
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
                // restore to original state
                ctx.restore();
                // apply styling
                // ctx.fillStyle = '#8ED6FF';
                // ctx.fill();
                // ctx.lineWidth = 5;
                // ctx.strokeStyle = 'black';
                ctx.stroke();
                // ctx.beginPath();
                // ctx.moveTo(x - w / 2, y);
                // ctx.quadraticCurveTo(x - w / 2, y + h / 2, x, y + h / 2);
                // ctx.quadraticCurveTo(x + w / 2, y + h / 2, x + w / 2, y);
                // ctx.quadraticCurveTo(x + w / 2, y - h / 2, x, y - h / 2);
                // ctx.quadraticCurveTo(x - w / 2, y - h / 2, x - w / 2, y);
                // ctx.stroke();
            }
            static SetBuffer(buffer) {
                Main.canvasAktif = buffer;
            }
            static get canvasAktif() {
                return Main._canvasAktif;
            }
            static set canvasAktif(value) {
                Main._canvasAktif = value;
            }
            static get canvasAr() {
                return Main._canvasAr;
            }
            static set canvasAr(value) {
                Main._canvasAr = value;
            }
            static get origin() {
                return Main._origin;
            }
            static set origin(value) {
                Main._origin = value;
            }
            static get fps() {
                return Main._fps;
            }
            static set fps(value) {
                Main._fps = value;
            }
            static get skalaOtomatis() {
                return Main._skalaOtomatis;
            }
            static set skalaOtomatis(value) {
                Main._skalaOtomatis = value;
            }
            static get merah() {
                return Main._merah;
            }
            static set merah(value) {
                Main._merah = value;
            }
            static get hijau() {
                return Main._hijau;
            }
            static set hijau(value) {
                Main._hijau = value;
            }
            static get biru() {
                return Main._biru;
            }
            static set biru(value) {
                Main._biru = value;
            }
            static get transparan() {
                return Main._transparan;
            }
            static set transparan(value) {
                Main._transparan = value;
            }
        }
        Main._fps = 0;
        Main._canvasAr = [];
        Main._skalaOtomatis = true;
        Main._merah = 0;
        Main._hijau = 0;
        Main._biru = 0;
        Main._transparan = 0;
        Main.warnaBackup = {
            m: 0,
            b: 0,
            h: 0,
            t: 1
        };
        be.Main = Main;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Gambar {
            constructor() {
                this.frameW = 32;
                this.frameH = 32;
                this._rotasi = 0;
                this.alpha = 100;
                this.isAnim = false;
                this.rect = new be.Rect();
                this.load = false;
                this.panjang = 0;
                this.lebar = 0;
                this.panjangDiSet = false;
                this.lebarDiSet = false;
                this.handleX = 0;
                this.handleY = 0;
                this.ratioX = 1;
                this.ratioY = 1;
            }
            get rotasi() {
                return this._rotasi;
            }
            set rotasi(value) {
                console.debug('set value: ' + value);
                this._rotasi = value;
            }
        }
        class Image {
            // private static buatObj(
            // 	img: HTMLImageElement,
            // 	w: number,
            // 	h: number,
            // 	frameH: number,
            // 	frameW: number,
            // 	canvas: HTMLCanvasElement,
            // 	rect: IRect
            // ): IGambar {
            // 	let gbr: IGambar = new Gambar();
            // 	gbr.panjang = w;
            // 	gbr.lebar = h;
            // 	gbr.img = img;
            // 	gbr.frameH = frameH;
            // 	gbr.frameW = frameW;
            // 	gbr.handleX = 0;
            // 	gbr.handleY = 0;
            // 	gbr.alpha = 1;
            // 	gbr.isAnim = false;
            // 	gbr.canvas = canvas;
            // 	gbr.ctx = canvas.getContext('2d');
            // 	gbr.rect = rect;
            // 	gbr.load = false;
            // 	gbr.panjangDiSet = false;
            // 	gbr.lebarDiSet = false;
            // 	return gbr;
            // }
            static buatBagiCanvas(canvas, w = 32, h = 32, frameW = 32, frameH = 32) {
                let img;
                canvas.width = w;
                canvas.height = h;
                let rect = ha.be.Rect.create(0, 0, frameW, frameH);
                img = new Gambar();
                img.load = true;
                img.panjang = w;
                img.lebar = h;
                img.img = null;
                img.frameH = frameH;
                img.frameW = frameW;
                img.handleX = 0;
                img.handleY = 0;
                img.alpha = 1;
                img.isAnim = false;
                img.canvas = canvas;
                img.ctx = canvas.getContext('2d');
                img.rect = rect;
                img.load = true;
                img.panjangDiSet = true;
                img.lebarDiSet = true;
                // img = {
                // 	set rotasi(n: number) {
                // 		console.debug('[xxx] set rotasi: ' + n);
                // 		this.rotasi = n;
                // 	},
                // 	get rotasi(): number {
                // 		return this.rotasi;
                // 	}
                // }
                return img;
            }
            static gambarRect(spr) {
                Image.resetRect(spr.buffer);
                Image.rectToImageTransform(spr.buffer, spr.x, spr.y);
                let ctx = be.Main.canvasAktif.ctx;
                let rect = spr.buffer.rect;
                ctx.beginPath();
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 5;
                ctx.moveTo(rect.vs[0].x, rect.vs[0].y);
                ctx.lineTo(rect.vs[1].x, rect.vs[1].y);
                ctx.lineTo(rect.vs[2].x, rect.vs[2].y);
                ctx.lineTo(rect.vs[3].x, rect.vs[3].y);
                ctx.moveTo(rect.vs[0].x, rect.vs[0].y);
                ctx.stroke();
            }
            static buat(w = 32, h = 32, frameW = 32, frameH = 32) {
                let canvas = document.createElement('canvas');
                return Image.buatBagiCanvas(canvas, w, h, frameW, frameH);
                // let img: IGambar;
                // canvas.width = w;
                // canvas.height = h;
                // let rect: IRect = ha.be.Rect.create(0, 0, frameW, frameH);
                // img = {
                // 	panjang: w,
                // 	lebar: h,
                // 	img: null,
                // 	frameH: frameH,
                // 	frameW: frameW,
                // 	handleX: 0,
                // 	handleY: 0,
                // 	rotasi: 0,
                // 	alpha: 1,
                // 	isAnim: false,
                // 	// scaleX: 1,
                // 	// scaleY: 1,
                // 	canvas: canvas,
                // 	ctx: canvas.getContext('2d'),
                // 	rect: rect,
                // 	load: true,
                // 	panjangDiSet: true,
                // 	lebarDiSet: true
                // }
                // return img;
            }
            static panjang(gbr, pj) {
                if (typeof pj == 'number') {
                    gbr.panjang = pj;
                    gbr.panjangDiSet = true;
                }
                return gbr.panjang;
            }
            ;
            static lebar(gbr, lb) {
                if (typeof lb == 'number') {
                    gbr.lebar = lb;
                    gbr.lebarDiSet = true;
                }
                return gbr.lebar;
            }
            ;
            static handleX(gbr) { return gbr.handleX; }
            ;
            static handleY(gbr) { return gbr.handleY; }
            ;
            static tabrakan(gbr1, x1, y1, gbr2, x2, y2) {
                Image.resetRect(gbr1);
                Image.rectToImageTransform(gbr1, x1, y1);
                Image.resetRect(gbr2);
                Image.rectToImageTransform(gbr2, x2, y2);
                return ha.be.Rect.collide(gbr1.rect, gbr2.rect);
            }
            ;
            static dotDidalamGambar(gbr1, x1, y1, x2, y2) {
                Image.resetRect(gbr1);
                Image.rectToImageTransform(gbr1, x1, y1);
                return ha.be.Rect.collideDot(gbr1.rect, x2, y2);
            }
            ;
            static muatAnimAsync(url, fw, fh) {
                let canvas = document.createElement('canvas');
                return Image.muatAnimAsyncCanvas(url, fw, fh, canvas);
            }
            static muatAnimAsyncCanvas(url, fw, fh, canvas) {
                let img = document.createElement('img'); //;
                let ctx = canvas.getContext('2d');
                let rect;
                rect = ha.be.Rect.create(0, 0, fw, fh);
                let gbr = new Gambar();
                gbr.isAnim = true;
                gbr.img = img;
                gbr.panjang = img.naturalWidth;
                gbr.lebar = img.naturalHeight;
                gbr.frameH = fh;
                gbr.frameW = fw;
                gbr.isAnim = true;
                gbr.handleX = 0;
                gbr.handleY = 0;
                gbr.rotasi = 0;
                gbr.alpha = 1;
                gbr.ctx = ctx;
                gbr.canvas = canvas;
                gbr.rect = rect;
                gbr.load = false;
                gbr.panjangDiSet = false;
                gbr.lebarDiSet = false;
                // let gbr: IGambar = {
                // 	img: img,
                // 	panjang: img.naturalWidth,
                // 	lebar: img.naturalHeight,
                // 	frameH: fh,
                // 	frameW: fw,
                // 	isAnim: true,
                // 	handleX: 0,
                // 	handleY: 0,
                // 	rotasi: 0,
                // 	alpha: 1,
                // 	ctx: ctx,
                // 	canvas: canvas,
                // 	rect: rect,
                // 	load: false,
                // 	panjangDiSet: false,
                // 	lebarDiSet: false
                // }
                img.onload = () => {
                    imgOnLoad(img);
                };
                img.onerror = () => {
                    console.log('gagal load image, url ' + url);
                    //TODO: default image
                };
                let img2 = ha.be.cache.getGbr(url);
                if (img2) {
                    imgOnLoad(img2);
                }
                else {
                    img.src = url;
                }
                function imgOnLoad(img) {
                    console.log('img anim load ' + url);
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    ctx.drawImage(img, 0, 0);
                    gbr.load = true;
                    if (!gbr.panjangDiSet) {
                        gbr.panjang = fw;
                        gbr.panjangDiSet = true;
                    }
                    if (!gbr.lebarDiSet) {
                        gbr.lebarDiSet = true;
                        gbr.lebar = fh;
                    }
                    ha.be.cache.setFile(url, img);
                }
                return gbr;
            }
            static muatAsync(url) {
                let canvas = document.createElement('canvas');
                return Image.muatAsyncKanvas(url, canvas);
            }
            static muatAsyncKanvas(url, canvas) {
                let img = document.createElement('img'); //ha_blitz.image.loadImageAsync(url, () => { }, () => { });
                let ctx = canvas.getContext('2d');
                let rect;
                rect = ha.be.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);
                let gbr = {
                    img: img,
                    panjang: img.naturalWidth,
                    lebar: img.naturalHeight,
                    frameH: img.naturalHeight,
                    frameW: img.naturalWidth,
                    isAnim: false,
                    handleX: 0,
                    handleY: 0,
                    rotasi: 0,
                    alpha: 1,
                    // scaleX: 1,
                    // scaleY: 1,
                    ctx: ctx,
                    canvas: canvas,
                    rect: rect,
                    load: false,
                    panjangDiSet: false,
                    lebarDiSet: false
                };
                img.onload = () => {
                    imgOnLoad(img);
                };
                img.onerror = () => {
                    console.log('gagal load image, url ' + url);
                    //TODO: default image
                };
                let img2 = ha.be.cache.getGbr(url);
                if (img2) {
                    imgOnLoad(img2);
                }
                else {
                    img.src = url;
                }
                function imgOnLoad(img) {
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    ctx.drawImage(img, 0, 0);
                    gbr.rect = ha.be.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);
                    gbr.load = true;
                    gbr.img = img;
                    if (!gbr.panjangDiSet) {
                        gbr.panjangDiSet = true;
                        gbr.panjang = img.naturalWidth;
                    }
                    if (!gbr.lebarDiSet) {
                        gbr.lebar = img.naturalHeight;
                        gbr.lebarDiSet = true;
                    }
                    gbr.frameH = img.naturalHeight;
                    gbr.frameW = img.naturalWidth;
                    ha.be.cache.setFile(url, img);
                }
                return gbr;
            }
            static gambarUbin(gbr, x = 0, y = 0, frame = 0) {
                let jmlH = 0;
                let jmlV = 0;
                if (gbr.load == false)
                    return;
                let w2 = Math.floor(gbr.panjang);
                let h2 = Math.floor(gbr.lebar);
                while (x < 0) {
                    x += w2;
                }
                while (y < 0) {
                    y += h2;
                }
                x -= w2;
                y -= h2;
                frame = Math.floor(frame);
                jmlH = Math.ceil((be.Main.canvasAktif.panjang + Math.abs(x)) / w2);
                jmlV = Math.ceil((be.Main.canvasAktif.lebar + Math.abs(y)) / h2);
                for (let i = 0; i < jmlH; i++) {
                    for (let j = 0; j < jmlV; j++) {
                        Image.gambar(gbr, x + (i * w2), y + (j * h2), frame);
                    }
                }
            }
            static putarGambar(gbr, sudut = 0) {
                gbr.rotasi = sudut;
            }
            static AmbilPiksel(x = 0, y = 0) {
                try {
                    let data = be.Main.canvasAktif.ctx.getImageData(x, y, 1, 1).data;
                    let hasil = [];
                    hasil.push(data[0]);
                    hasil.push(data[1]);
                    hasil.push(data[2]);
                    hasil.push(data[3]);
                    be.Main.merah = data[0];
                    be.Main.hijau = data[1];
                    be.Main.biru = data[2];
                    be.Main.transparan = data[3];
                    be.Main.Warna(be.Main.merah, be.Main.hijau, be.Main.biru, be.Main.transparan);
                    return hasil;
                }
                catch (e) {
                    // console.error(e);
                }
                return [0, 0, 0];
            }
            static SetPiksel(x = 0, y = 0) {
                be.Main.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
            }
            static handle(gbr, x = 0, y = 0) {
                gbr.handleX = x;
                gbr.handleY = y;
            }
            static grabGambar(gbr, x = 0, y = 0) {
                gbr.ctx.drawImage(be.Main.canvasAktif.canvas, x, y, gbr.panjang, gbr.lebar, 0, 0, gbr.panjang, gbr.lebar);
            }
            static gambar(gbr, x = 0, y = 0, frame = 0) {
                let ctx = be.Main.canvasAktif.ctx;
                let jmlH = 0;
                let jmlV = 0;
                let frameX = 0;
                let frameY = 0;
                // let rect: IRect = img.rect;
                if (gbr.load == false)
                    return;
                jmlH = Math.floor(gbr.img.naturalWidth / gbr.frameW);
                jmlV = Math.floor(gbr.img.naturalHeight / gbr.frameH);
                // console.log('jmlH ' + jmlH);
                // console.log('nw: ' + gbr.img.naturalWidth);
                // console.log('fw: ' + gbr.frameW);
                // debugger;
                frameX = (frame % jmlH);
                frameY = Math.floor(frame / jmlV);
                frameX *= gbr.frameW;
                frameY *= gbr.frameH;
                frameX = Math.floor(frameX);
                frameY = Math.floor(frameY);
                let x2 = Math.floor(x);
                let y2 = Math.floor(y);
                let w2 = Math.floor(gbr.panjang);
                let h2 = Math.floor(gbr.lebar);
                x2 -= (gbr.handleX);
                y2 -= (gbr.handleY);
                if (gbr.rotasi != 0) {
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(gbr.rotasi * (Math.PI / 180));
                    ctx.globalAlpha = gbr.alpha;
                    ctx.drawImage(gbr.img, frameX, frameY, gbr.frameW, gbr.frameH, -gbr.handleX, -gbr.handleY, w2, h2);
                    ctx.restore();
                }
                else {
                    ctx.save();
                    ctx.globalAlpha = gbr.alpha;
                    ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, x2, y2, w2, h2);
                    ctx.restore();
                }
                // debugger;
            }
            /**
             * Ubah Ukuran Gambar
             * @param gbr
             * @param w
             * @param h
             */
            static ukuran(gbr, w = 32, h = 32) {
                gbr.panjang = w;
                gbr.lebar = h;
                gbr.panjangDiSet = true;
                gbr.lebarDiSet = true;
            }
            static resetRect(img) {
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
            static rectToImageTransform(image, x, y) {
                let rect = image.rect;
                let p;
                let x2 = image.panjang;
                let y2 = image.lebar;
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
                ha.be.Rect.translate(rect, x, y);
                ha.be.Rect.translate(rect, -image.handleX, -image.handleY);
                //rotate
                ha.be.Rect.rotate(rect, image.rotasi, x, y, false);
            }
        }
        be.Image = Image;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
///<reference path="./Image.ts"/>
/** SPRITE.TS */
var ha;
(function (ha) {
    class Sprite {
        constructor(buffer, dragable = false) {
            this._x = 0;
            this._y = 0;
            this._dragged = false;
            this._down = false;
            this._hit = 0;
            this._dragStartY = 0;
            this._dragStartX = 0;
            this._dragable = false;
            this.buffer = buffer;
            this.dragable = dragable;
        }
        get inputId() {
            return this._inputId;
        }
        set inputId(value) {
            this._inputId = value;
        }
        //library
        static copy(sprS) {
            if (sprS.buffer.isAnim) {
                console.debug('copy sprite anim');
                console.debug(sprS);
                return ha.Sprite.muatAnimasiAsyncKanvas(sprS.url, sprS.buffer.frameW, sprS.buffer.frameH, sprS.dragable, sprS.buffer.canvas, sprS.tipeDrag);
            }
            else {
                return ha.Sprite.muatAsyncBerbagiKanvas(sprS.url, sprS.dragable, sprS.buffer.canvas, sprS.tipeDrag);
            }
        }
        static statusDrag(spr) {
            let hasil = false;
            this.daftar.forEach((item) => {
                if (spr == item) {
                    hasil = spr.dragged;
                    return;
                }
            });
            return hasil;
        }
        static panjang(spr, pj) {
            return ha.be.Image.panjang(spr.buffer, pj);
        }
        static lebar(spr, lb) {
            return ha.be.Image.lebar(spr.buffer, lb);
        }
        static alpha(spr, alpha) {
            if (typeof (alpha) == 'number') {
                spr.buffer.alpha = alpha / 100;
            }
            return spr.buffer.alpha;
        }
        static rotasi(spr, sudut) {
            if (spr && (typeof (sudut) == 'number')) {
                spr.buffer.rotasi = sudut;
            }
            return spr.buffer.rotasi;
        }
        static posisi(spr, x = 0, y = 0) {
            spr.x = x;
            spr.y = y;
        }
        static posisiX(spr, x = null) {
            if (typeof (x) == 'number') {
                spr.x = x;
            }
            return spr.x;
        }
        static posisiY(spr, y = null) {
            if (typeof (y) == 'number') {
                // debugger;
                spr.y = y;
            }
            return spr.y;
        }
        static handle(spr, x = 0, y = 0) {
            if (spr) {
                spr.buffer.handleX = x;
                spr.buffer.handleY = y;
            }
            return;
        }
        static gambarSemua() {
            for (let i = 0; i < ha.Sprite.daftar.length; i++) {
                let item = ha.Sprite.daftar[i];
                ha.Sprite.gambar(item);
            }
        }
        static tabrakan(spr, spr2) {
            return ha.be.Image.tabrakan(spr.buffer, ha.Sprite.posisiX(spr), ha.Sprite.posisiY(spr), spr2.buffer, ha.Sprite.posisiX(spr2), ha.Sprite.posisiY(spr2));
        }
        static muatAnimasiAsyncKanvas(url, pf, lf, bisaDiDrag, canvas, tipeDrag) {
            let img = ha.be.Image.muatAnimAsyncCanvas(url, pf, lf, canvas);
            return ha.Sprite.buatPrivate(img, bisaDiDrag, url, tipeDrag);
        }
        static muatAnimasiAsync(url, pf, lf, bisaDiDrag = false, tipeDrag = 0) {
            let img = ha.be.Image.muatAnimAsync(url, pf, lf);
            return ha.Sprite.buatPrivate(img, bisaDiDrag, url, tipeDrag);
        }
        static muatAsyncBerbagiKanvas(url, dragable = false, canvas, tipeDrag) {
            let img = ha.be.Image.muatAsyncKanvas(url, canvas);
            return ha.Sprite.buatPrivate(img, dragable, url, tipeDrag);
        }
        static muatAsync(url, bisaDiDrag = false, tipeDrag = 0) {
            let img = ha.be.Image.muatAsync(url);
            let spr = ha.Sprite.buatPrivate(img, bisaDiDrag, url, tipeDrag);
            return spr;
        }
        static ukuran(gbr, w, h) {
            ha.be.Image.ukuran(gbr.buffer, w, h);
        }
        static buatPrivate(image, dragable = false, url, tipeDrag) {
            let hasil;
            hasil = new Sprite(image, dragable);
            hasil.tipeDrag = tipeDrag;
            hasil.url = url;
            if (hasil.dragable) {
                if (hasil.tipeDrag == 0) {
                    hasil.tipeDrag = 1;
                }
            }
            this.daftar.push(hasil);
            console.debug('buat sprite');
            console.debug(hasil);
            return hasil;
        }
        static gambar(sprite, frame) {
            ha.be.Image.gambar(sprite.buffer, sprite.x, sprite.y, frame);
        }
        static posisiPolar(sprite, sudut, jarak, x2, y2, skalaX = 1, skalaY = 1) {
            let p = ha.be.Point.posPolar(jarak, sudut, x2, y2);
            p.y -= y2;
            p.y *= skalaY;
            p.y += y2;
            p.x -= x2;
            p.x *= skalaX;
            p.x += x2;
            sprite.x = p.x;
            sprite.y = p.y;
        }
        static ubin(spr, x = 0, y = 0, frame = 0) {
            ha.be.Image.gambarUbin(spr.buffer, x, y, frame);
        }
        static statusMuat(spr) {
            let hasil = true;
            if (spr && spr.buffer) {
                return spr.buffer.load;
            }
            ha.Sprite.daftar.forEach((item) => {
                if (!item.buffer.load) {
                    hasil = false;
                }
            });
            return hasil;
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
            return this._buff;
        }
        set buffer(value) {
            this._buff = value;
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
        get sudutAwal() {
            return this._sudutAwal;
        }
        set sudutAwal(value) {
            this._sudutAwal = value;
        }
        get sudutTekanAwal() {
            return this._sudutTekanAwal;
        }
        set sudutTekanAwal(value) {
            this._sudutTekanAwal = value;
        }
        get tipeDrag() {
            return this._tipeDrag;
        }
        set tipeDrag(value) {
            this._tipeDrag = value;
        }
        get url() {
            return this._url;
        }
        set url(value) {
            this._url = value;
        }
    }
    Sprite.daftar = [];
    ha.Sprite = Sprite;
})(ha || (ha = {}));
/** INPUT.TS */
var EInput;
(function (EInput) {
    EInput["TOUCH"] = "touch";
    EInput["MOUSE"] = "mouse";
    EInput["KEYB"] = "keyb";
    EInput["DEF"] = "";
})(EInput || (EInput = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Input {
            constructor() {
                this._inputs = []; //any input,
                this._event = new EventHandler();
                this.pos = (cx, cy, buffer) => {
                    let rect = buffer.canvas.getBoundingClientRect();
                    let canvasScaleX = parseInt(window.getComputedStyle(buffer.canvas).width) / buffer.canvas.width;
                    let canvasScaleY = parseInt(window.getComputedStyle(buffer.canvas).height) / buffer.canvas.height;
                    let poslx = Math.floor((cx - rect.x) / canvasScaleX);
                    let posly = Math.floor((cy - rect.y) / canvasScaleY);
                    return {
                        x: poslx,
                        y: posly
                    };
                };
                this._touchGlobal = this.buatInputDefault();
                this._mouseGlobal = this.buatInputDefault();
                this._keybGlobal = this.buatInputDefault();
                this._inputGlobal = this.buatInputDefault();
                this._touchGlobal.type = EInput.TOUCH;
                this._keybGlobal.type = EInput.KEYB;
                this._mouseGlobal.type = EInput.MOUSE;
            }
            InputType() {
                return be.input.inputGlobal.type;
            }
            InputHit() {
                let hit = be.input.inputGlobal.hit;
                be.input.inputGlobal.hit = 0;
                return hit;
            }
            InputX() {
                return be.input.inputGlobal.x;
            }
            InputY() {
                return be.input.inputGlobal.y;
            }
            GeserX() {
                return be.input.inputGlobal.xDrag;
            }
            GeserY() {
                return be.input.inputGlobal.yDrag;
            }
            FlushInput() {
                be.input.flush();
            }
            Pencet() {
                return be.input.inputGlobal.isDown;
            }
            Geser() {
                return be.input.inputGlobal.isDrag;
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
                buffer.canvas.style.touchAction = 'none';
                buffer.canvas.onpointerdown = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    let pos = ha.be.input.pos(e.clientX, e.clientY, buffer);
                    let key = this.getMouseKeyId(e);
                    let input = ha.be.input.baru(key, e.pointerType);
                    ha.be.input.event.down(input, key, e.pointerType, pos);
                    ha.be.input.event.down(this._inputGlobal, key, e.pointerType, pos);
                    if ("mouse" == e.pointerType)
                        ha.be.input.event.down(this._mouseGlobal, key, EInput.MOUSE, pos);
                    if ("touch" == e.pointerType)
                        ha.be.input.event.down(this._touchGlobal, key, EInput.TOUCH, pos);
                    ha.sprite2.inputDown(pos, e.pointerId);
                };
                buffer.canvas.onpointermove = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    let pos = ha.be.input.pos(e.clientX, e.clientY, buffer);
                    let key = this.getMouseKeyId(e);
                    let input = this.baru(key, e.pointerType);
                    ha.be.input.event.move(input, buffer, e);
                    ha.be.input.event.move(this.inputGlobal, buffer, e);
                    if (e.pointerType == 'touch')
                        ha.be.input.event.move(ha.be.input.touchGlobal, buffer, e);
                    if (e.pointerType == 'mouse')
                        ha.be.input.event.move(ha.be.input.mouseGlobal, buffer, e);
                    //sprite
                    ha.sprite2.inputMove(pos, e.pointerId);
                };
                buffer.canvas.onpointerout = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    let key = ha.be.input.getMouseKeyId(e);
                    let input = ha.be.input.baru(key, e.pointerType);
                    ha.be.input.event.up(input);
                    ha.be.input.event.up(ha.be.input.inputGlobal);
                    if (e.pointerType == 'touch')
                        ha.be.input.event.up(ha.be.input.touchGlobal);
                    if (e.pointerType == 'mouse')
                        ha.be.input.event.up(ha.be.input.mouseGlobal);
                };
                buffer.canvas.onpointercancel = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                };
                buffer.canvas.onpointerup = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    let key = this.getMouseKeyId(e);
                    let input = this.baru(key, e.pointerType);
                    ha.be.input.event.up(input);
                    ha.be.input.event.up(this.inputGlobal);
                    if (e.pointerType == 'touch')
                        ha.be.input.event.up(ha.be.input.touchGlobal);
                    if (e.pointerType == 'mouse')
                        ha.be.input.event.up(ha.be.input.mouseGlobal);
                    //sprite up
                    //sprite hit
                    ha.Sprite.daftar.forEach((item) => {
                        if (e.pointerId == item.inputId) {
                            if (item.down) {
                                item.hit++;
                            }
                            item.down = false;
                            item.dragged = false;
                        }
                    });
                };
                window.onkeydown = (e) => {
                    // e.stopPropagation();
                    // e.preventDefault();
                    let input = ha.be.input.baru(e.key + '', EInput.KEYB);
                    ha.be.input.event.down(input, e.key, EInput.KEYB, ha.be.Point.create());
                    ha.be.input.event.down(this.inputGlobal, e.key, EInput.KEYB, ha.be.Point.create());
                    ha.be.input.event.down(this._keybGlobal, e.key, EInput.KEYB, ha.be.Point.create());
                    // console.log('keydown');
                };
                window.onkeyup = (e) => {
                    // e.stopPropagation();
                    let input = ha.be.input.baru(e.key + '', EInput.KEYB);
                    ha.be.input.event.up(input);
                    ha.be.input.event.up(this.inputGlobal);
                    ha.be.input.event.up(this._keybGlobal);
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
                    type: EInput.DEF,
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
                input.type = EInput.DEF;
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
                let pos = ha.be.input.pos(e.clientX, e.clientY, buffer);
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
            up(input) {
                input.isDown = false;
                input.isDrag = false;
                input.timerEnd = Date.now();
                input.isTap = ((input.timerEnd - input.timerStart) < 500);
            }
        }
        be.input = new Input();
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
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
                let h = Point.create(p.x, p.y);
                return h;
            }
            static sama(p1, p2) {
                if (false == ha.Transform.equal(p1.x, p2.x))
                    return false;
                if (false == ha.Transform.equal(p1.y, p2.y))
                    return false;
                return true;
            }
            static putarPoros(p, xc = 0, yc = 0, deg = 0) {
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
                //jarak sekarang
                jrkA = ha.Transform.jarak(p.x, p.y, xt, yt);
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
                hasil.x = jarak * Math.cos(sudut * ha.Transform.DEG2RAD);
                hasil.y = jarak * Math.sin(sudut * ha.Transform.DEG2RAD);
                hasil.x += xt;
                hasil.y += yt;
                return hasil;
            }
        }
        be.Point = Point;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Rect {
            static create(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
                let r = {};
                r.vs = [];
                r.vs.push(be.Point.create(x1, y1));
                r.vs.push(be.Point.create(x2, y1));
                r.vs.push(be.Point.create(x2, y2));
                r.vs.push(be.Point.create(x1, y2));
                r.segs = [];
                r.segs.push(be.Segment.create(r.vs[0], r.vs[1]));
                r.segs.push(be.Segment.create(r.vs[1], r.vs[2]));
                r.segs.push(be.Segment.create(r.vs[2], r.vs[3]));
                r.segs.push(be.Segment.create(r.vs[3], r.vs[0]));
                return r;
            }
            static copy(r) {
                // console.log('copy:');
                // console.log(r.vs);
                // let hasil: IRect = Rect.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
                let hasil = Rect.create();
                Rect.copyInfo(r, hasil);
                // console.log(hasil.vs);
                return hasil;
            }
            static copyInfo(r1, r2) {
                for (let i = 0; i < r1.segs.length; i++) {
                    be.Segment.copy(r1.segs[i], r2.segs[i]);
                }
            }
            static collideBound(r1, r2) {
                // console.debug('collide bound');
                if (Rect.maxX(r1) < Rect.minX(r2)) {
                    // console.debug('maxX gagal');
                    return false;
                }
                // console.log('maxx ' + Rect.maxX(r1));
                // console.log('minx ' + Rect.minX(r2));
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
                        if (be.Segment.collide(r1.segs[i], r2.segs[j])) {
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
                    // console.log(Rect.maxX(r));
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
                let p = be.Point.create(x, y);
                let d = be.Segment.deg(r2.segs[0]);
                let pRot = r2.vs[0];
                if (!Rect.collideDotBound(r, p)) {
                    return false;
                }
                Rect.rotate(r2, -d, pRot.x, pRot.y, false);
                be.Point.putarPoros(p, pRot.x, pRot.y, -d);
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
                    be.Point.putarPoros(p, xc, yc, deg);
                });
                return r2;
            }
        }
        be.Rect = Rect;
        // export var rect: Rect = new Rect();
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Segment {
            static create(v1 = { x: 0, y: 0 }, v2 = { x: 0, y: 0 }) {
                return {
                    v1: v1,
                    v2: v2
                };
            }
            static boundCollide(seg1, seg2) {
                if (Segment.maxX(seg1) < Segment.minX(seg2))
                    return false;
                if (Segment.minX(seg1) > Segment.maxX(seg2))
                    return false;
                if (Segment.maxY(seg1) < Segment.minY(seg2))
                    return false;
                if (Segment.minY(seg1) > Segment.maxY(seg2))
                    return false;
                return true;
            }
            static collide(seg1, seg2) {
                let bound = Segment.boundCollide(seg1, seg2);
                if (!bound)
                    return false;
                // let deg: number = Segment.deg(seg2);
                let seg2Copy = Segment.clone(seg2);
                let seg1Copy = Segment.clone(seg1);
                let deg = Segment.deg(seg2);
                Segment.rotate(seg2Copy, -deg, seg2.v1.x, seg2.v1.y);
                Segment.rotate(seg1Copy, -deg, seg2.v1.x, seg2.v1.y);
                if (!Segment.boundCollide(seg1Copy, seg2Copy))
                    return false;
                Segment.translate(seg1Copy, -seg2.v1.x, -seg2.v1.y);
                Segment.translate(seg2Copy, -seg2.v1.x, -seg2.v1.y);
                if (!Segment.crossHor(seg1Copy)) {
                    return false;
                }
                let idx = Segment.xHorIdx(seg1Copy);
                let x = Segment.getXAtIdx(seg1Copy, idx);
                if (x > Segment.maxX(seg2Copy))
                    return false;
                if (x < Segment.minX(seg2Copy))
                    return false;
                return true;
            }
            static copy(seg1, seg2) {
                be.Point.copy(seg1.v1, seg2.v2);
                be.Point.copy(seg1.v2, seg2.v2);
            }
            static clone(seg) {
                return {
                    v1: be.Point.clone(seg.v1),
                    v2: be.Point.clone(seg.v2)
                };
            }
            static crossHor(seg) {
                if (Segment.maxY(seg) > 0) {
                    if (Segment.minY(seg) < 0) {
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
                return seg.v1.x + (idx * Segment.vecI(seg));
            }
            static getYAtIdx(seg, idx) {
                return seg.v1.y + (idx * Segment.vecJ(seg));
            }
            static vecI(seg) {
                return seg.v2.x - seg.v1.x;
            }
            static vecJ(seg) {
                return seg.v2.y - seg.v1.y;
            }
            static rotate(seg, deg = 0, xc = 0, yc = 0) {
                be.Point.putarPoros(seg.v1, xc, yc, deg);
                be.Point.putarPoros(seg.v2, xc, yc, deg);
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
            //tested
            static xHorIdx(seg) {
                if (!Segment.crossHor(seg))
                    return NaN;
                let idx = 0;
                idx = (0 - seg.v1.y) / (seg.v2.y - seg.v1.y);
                return idx;
            }
        }
        be.Segment = Segment;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
/**
 * BLIJS
 */
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Blijs {
            static get inputStatus() {
                return Blijs._inputStatus;
            }
            static set inputStatus(value) {
                Blijs._inputStatus = value;
            }
            /**
             * Setup Blitz Edu
             * @param panjang (angka) panjang dari kanvas
             * @param lebar (angka) lebar dari kanvs
             * @param canvas (HTMLCanvasElement) referensi ke kanvas
             * @param skalaOtomatis (boolean) apakah akan men-skala kanvas mengikuti ukuran layar
             * @returns
             */
            static Grafis(panjang = 320, lebar = 240, canvas = null, skalaOtomatis = true, input = true) {
                //coba cari canvas
                if (!canvas) {
                    canvas = document.body.querySelector('canvas');
                }
                if (!canvas) {
                    document.body.appendChild(document.createElement('canvas'));
                }
                ha.be.Blijs.skalaOtomatis = skalaOtomatis;
                ha.be.Blijs._inputStatus = input;
                //sudah diinisialisasi atau belum
                if (ha.be.Main.canvasAktif) {
                    console.warn('init lebih dari sekali');
                    ha.be.Main.Grafis(panjang, lebar, ha.be.Blijs.skalaOtomatis);
                }
                else {
                    console.log('inisialisasi');
                    ha.be.Main.init(canvas, canvas);
                    ha.be.Main.Grafis(panjang, lebar, ha.be.Blijs.skalaOtomatis);
                    if (input) {
                        ha.be.input.init(ha.be.Main.canvasAktif);
                    }
                    if (ha.be.Blijs.skalaOtomatis) {
                        window.onresize = () => {
                            if (ha.be.Blijs.skalaOtomatis) {
                                ha.be.Blijs.windowResize();
                            }
                        };
                    }
                    if (ha.be.Blijs.skalaOtomatis) {
                        ha.be.Blijs.windowResize();
                    }
                    setTimeout(() => {
                        if (ha.be.Blijs.skalaOtomatis) {
                            ha.be.Blijs.windowResize();
                        }
                    }, 100);
                    setTimeout(() => {
                        ha.be.Blijs.repeat();
                    }, 0);
                    //font default
                    ha.be.Teks.font("12px sans-serif");
                    ha.be.Teks.rata("center");
                    ha.be.Main.Warna(255, 255, 255, 100);
                    ha.be.Main.canvasAktif.ctx.strokeStyle = "#ffffff";
                }
            }
            static loop() {
                let _window = window;
                if (typeof (_window.Loop) == 'function') {
                    //TODO: pre loop
                    _window.Loop();
                    //TODO: post loop
                }
                else if (typeof (_window.Update) == 'function') {
                    //TODO: pre loop
                    _window.Update();
                    //TODO: post loop
                }
            }
            static repeat() {
                //check semua image sudah diload
                ha.be.Blijs.loop();
                setTimeout(() => {
                    // requestAnimationFrame(() => {
                    // 	ha.be.Blijs.repeat();
                    // });
                    requestAnimationFrame(ha.be.Blijs.repeat);
                }, ha.be.Main.fps);
            }
            static windowResize() {
                // console.debug('window on resize');
                let canvas = ha.be.Main.canvasAktif.canvas;
                let cp = ha.be.Main.canvasAktif.canvas.width;
                let cl = ha.be.Main.canvasAktif.canvas.height;
                let wp = window.innerWidth;
                let wl = window.innerHeight;
                let ratio = Math.min((wp / cp), (wl / cl));
                let cp2 = Math.floor(cp * ratio);
                let cl2 = Math.floor(cl * ratio);
                ha.be.Main.canvasAktif.ratioX = ratio;
                ha.be.Main.canvasAktif.ratioY = ratio;
                canvas.style.position = 'fixed';
                canvas.style.zIndex = '9999';
                canvas.style.width = cp2 + 'px';
                canvas.style.height = cl2 + 'px';
                canvas.style.top = ((wl - cl2) / 2) + 'px';
                canvas.style.left = ((wp - cp2) / 2) + 'px';
                // console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
            }
            static get skalaOtomatis() {
                return Blijs._skalaOtomatis;
            }
            static set skalaOtomatis(value) {
                Blijs._skalaOtomatis = value;
            }
        }
        Blijs._skalaOtomatis = true;
        Blijs._inputStatus = true;
        be.Blijs = Blijs;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
// setTimeout(() => {
// 	ha.be.Blijs.init()
// }, 0);
var ha;
(function (ha) {
    class Transform {
        static get lastX() {
            return ha.Transform._lastX;
        }
        static get lastY() {
            return ha.Transform._lastY;
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
            sin *= ha.Transform.RAD2DEG;
            sin = ha.Transform.quadDeg2(x, y, sin);
            sin = ha.Transform.normalizeDeg(sin);
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
            angleS = ha.Transform.normalizeDeg(angleS);
            angleT = ha.Transform.normalizeDeg(angleT);
            let deg = ha.Transform.degDistMin(angleS, angleT);
            if (deg >= 0) {
                return -(360 - deg);
            }
            else {
                return (360 - Math.abs(deg));
            }
        }
        static degDistMin(angleS = 0, angleT) {
            angleS = ha.Transform.normalizeDeg(angleS);
            angleT = ha.Transform.normalizeDeg(angleT);
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
            deg *= ha.Transform.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            ha.Transform._lastX = x1 + xt;
            ha.Transform._lastY = y1 + yt;
        }
    }
    Transform.RAD2DEG = 180.0 / Math.PI;
    Transform.DEG2RAD = Math.PI / 180.0;
    Transform._lastX = 0;
    Transform._lastY = 0;
    ha.Transform = Transform;
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Teks {
            static get ctx() {
                return be.Main.canvasAktif.ctx;
            }
            static font(font = '30px Arial') {
                Teks.ctx.font = font;
            }
            static rata(rata = "left") {
                Teks.ctx.textAlign = rata;
            }
            static tulis(teks, x, y, warna = true, garis = false) {
                if (warna) {
                    Teks.ctx.fillText(teks, x, y);
                }
                if (garis) {
                    Teks.ctx.strokeText(teks, x, y);
                }
            }
        }
        be.Teks = Teks;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Route {
            static ukuran(obj, w = 32, h = 32) {
                if ("teks" == obj) {
                    //TODO: ukuran teks
                }
                else {
                    ha.Sprite.ukuran(obj, w, h);
                }
            }
        }
        be.Route = Route;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
///<reference path="../ha/Main.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Sprite.ts"/>
///<reference path="../ha/Input.ts"/>
///<reference path="../ha/Point.ts"/>
///<reference path="../ha/Rect.ts"/>
///<reference path="../ha/Segment.ts"/>
///<reference path="../ha/Blijs.ts"/>
///<reference path="../ha/Transform.ts"/>
///<reference path="../ha/Teks.ts"/>
///<reference path="../ha/Route.ts"/>
///<reference path="./Route.ts"/>
/**
 * shortcut buat perintah input
 * BLITZ-INPUT.TS
 */
const InputHit = ha.be.input.InputHit;
const InputX = ha.be.input.InputX;
const InputY = ha.be.input.InputY;
const GeserX = ha.be.input.GeserX;
const GeserY = ha.be.input.GeserY;
const FlushInput = ha.be.input.FlushInput;
const Pencet = ha.be.input.Pencet;
const Geser = ha.be.input.Geser;
const InputType = ha.be.input.InputType;
/**
 * 	KEYBOARD (di tunda/dihapus)
 */
const FlushKeys = () => {
    ha.be.input.flushByInput(ha.be.input.keybGlobal);
    ha.be.input.flushByType('keyb');
};
const GetKey = () => {
    return ha.be.input.keybGlobal.key;
};
const KeybDiPencet = (key = '') => {
    if ("" == key) {
        return ha.be.input.keybGlobal.isDown;
    }
    else {
        let input = ha.be.input.getInput(key, 'keyb');
        if (input) {
            return input.isDown;
        }
        return false;
    }
};
const KeybHit = (key = '') => {
    if ("" == key) {
        let n = ha.be.input.keybGlobal.hit;
        ha.be.input.keybGlobal.hit = 0;
        return (n);
    }
    else {
        let input = ha.be.input.getInput(key, 'keyb');
        let n = 0;
        if (input) {
            n = input.hit;
            input.hit = 0;
        }
        return n;
    }
};
// /**
//  * INTERFACE
// */
// interface ILine {
// 	y: number,
// 	m: number,
// 	b: number
// }
// interface IRect {
// 	vs?: IV2D[],
// 	segs?: ISegment[]
// }
// interface ISegment {
// 	v1: IV2D,
// 	v2: IV2D
// }
// interface ITimer {
// 	endTime: number;
// 	startTime: number;
// 	time: number;
// 	aktif: boolean;
// }
// // interface IInput {
// // 	xStart: number;
// // 	yStart: number;
// // 	xDrag: number;
// // 	yDrag: number;
// // 	x: number;
// // 	y: number;
// // 	isDrag: boolean;
// // 	isDown: boolean;
// // 	isTap: boolean;
// // 	// isHit: boolean;
// // 	hit: number;
// // 	key: string;
// // 	type: string;
// // 	timerStart: number;
// // 	timerEnd: number;
// // 	id: number;	//TODO: mungkin bisa dihapus
// // }
// interface IInputData {
// 	type?: string;	//keyboard, touch, mouse
// 	key?: string;	//kode keyb, tombol mouse
// }
// //geom
// interface IV2D {
// 	x: number,
// 	y: number
// }
// interface ITransform {
// 	pos: IV2D,
// 	scale: IV2D,
// 	rotation: number
// }
///<reference path="./Route.ts"/>
/*
 * 	GRAPHICS
 */
const Bersih = ha.be.Main.Bersih;
const Grafis = ha.be.Blijs.Grafis;
const Warna = ha.be.Main.Warna;
const Merah = ha.be.Main.Merah;
const Hijau = ha.be.Main.Hijau;
const Biru = ha.be.Main.Biru;
const Transparan = ha.be.Main.Transparan;
const AmbilPiksel = ha.be.Image.AmbilPiksel;
const SetPiksel = ha.be.Image.SetPiksel;
const Kontek = ha.be.Main.Kontek;
const Kanvas = ha.be.Main.Kanvas;
const Garis = ha.be.Main.Garis;
const Kotak = ha.be.Main.Kotak;
const Oval = ha.be.Main.Oval;
///<reference path="../ha/Main.ts"/>
///<reference path="../ha/Image.ts"/>
const Sudut = ha.Transform.deg;
///<reference path="./Route.ts"/>
/** BLITZ-SPRITE.TS */
// const Buat = ha.Sprite.buat;
const Muat = ha.Sprite.muatAsync;
const MuatAnimasi = ha.Sprite.muatAnimasiAsync;
const StatusMuat = ha.Sprite.statusMuat;
const Posisi = ha.Sprite.posisi;
const Ukuran = ha.Sprite.ukuran;
const PosisiPolar = ha.Sprite.posisiPolar;
const Gambar = ha.Sprite.gambar;
const GambarSemua = ha.Sprite.gambarSemua;
const PosisiX = ha.Sprite.posisiX;
const PosisiY = ha.Sprite.posisiY;
const Handle = ha.Sprite.handle;
const Rotasi = ha.Sprite.rotasi;
const Alpha = ha.Sprite.alpha;
const Tabrakan = ha.Sprite.tabrakan;
const StatusDrag = ha.Sprite.statusDrag;
const Panjang = ha.Sprite.panjang;
const Lebar = ha.Sprite.lebar;
const Copy = ha.Sprite.copy;
const Ubin = ha.Sprite.ubin;
//status drag
//type drag
///<reference path="../ha/Main.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="./Route.ts"/>
const FPS = ha.be.Main.Fps;
///<reference path="../ha/Route.ts"/>
/**
 * TEXTS
 */
var Font = ha.be.Teks.font;
var Tulis = ha.be.Teks.tulis;
var Rata = ha.be.Teks.rata;
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Cache {
            constructor() {
                this.files = [];
            }
            getGbr(url) {
                for (let i = 0; i < this.files.length; i++) {
                    if (this.files[i].url == url) {
                        console.log('ambil dari cache: ' + url);
                        return this.files[i].img;
                    }
                }
                return null;
            }
            setFile(url, img) {
                let img2;
                img2 = this.getGbr(url);
                if (img2) {
                    return;
                }
                console.log('cache: ' + url);
                this.files.push({
                    url: url,
                    img: img
                });
            }
        }
        be.cache = new Cache();
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
/**
 * INTERFACE
*/
var ha;
(function (ha) {
    let TypeDrag;
    (function (TypeDrag) {
        TypeDrag[TypeDrag["drag"] = 1] = "drag";
        TypeDrag[TypeDrag["rotasi"] = 2] = "rotasi";
    })(TypeDrag || (TypeDrag = {}));
    class Sprite2 {
        inputDown(pos, id) {
            console.debug('input down');
            // ha.Sprite.daftar.forEach((item: ISprite) => {
            // 	item.down = false;
            // });
            //sprite down
            for (let i = ha.Sprite.daftar.length - 1; i >= 0; i--) {
                let item;
                item = ha.Sprite.daftar[i];
                if (ha.be.Image.dotDidalamGambar(item.buffer, item.x, item.y, pos.x, pos.y)) {
                    item.down = true;
                    item.dragStartX = pos.x - item.x;
                    item.dragStartY = pos.y - item.y;
                    item.inputId = id;
                    item.sudutTekanAwal = ha.Transform.deg(pos.x - item.x, pos.y - item.y);
                    item.sudutAwal = item.buffer.rotasi;
                    return;
                }
            }
        }
        inputMove(pos, pointerId) {
            ha.Sprite.daftar.forEach((item) => {
                if (item.down && item.dragable && (item.inputId == pointerId)) {
                    item.dragged = true;
                    if (item.tipeDrag == TypeDrag.drag) {
                        item.x = pos.x - item.dragStartX;
                        item.y = pos.y - item.dragStartY;
                    }
                    else if (item.tipeDrag == TypeDrag.rotasi) {
                        //TODO: peruban sudut
                        let sudut2 = ha.Transform.deg(pos.x - item.x, pos.y - item.y);
                        let perbedaan = sudut2 - item.sudutTekanAwal;
                        item.buffer.rotasi = item.sudutAwal + perbedaan;
                        // console.debug('item drag move');
                        // console.debug('sudut ptr: ' + sudut2);
                        // console.debug('perbedaan: ' + perbedaan);
                        // console.debug('item rotasi: ' + item.buffer.rotasi);
                    }
                }
            });
        }
        inputUp() {
            ha.Sprite.daftar.forEach((item) => {
                if (item.down) {
                    item.hit++;
                }
                if (item.dragged) {
                    console.log('input up: item rotasi ' + item.buffer.rotasi);
                }
                item.down = false;
                item.dragged = false;
            });
        }
    }
    ha.sprite2 = new Sprite2();
})(ha || (ha = {}));
//# sourceMappingURL=blitz.js.map