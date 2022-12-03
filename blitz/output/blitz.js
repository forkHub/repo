var ha;
(function (ha) {
    class Main {
        static _fps = 0;
        static _origin;
        static _canvasAr = [];
        static _canvasAktif;
        static _skalaOtomatis = true;
        static _merah = 0;
        static _hijau = 0;
        static _biru = 0;
        static _transparan = 0;
        static warnaBackup = {
            m: 0,
            b: 0,
            h: 0,
            t: 1
        };
        static Fps(n) {
            ha.Main.fps = Math.floor(1000 / n);
            if (n >= 60) {
                ha.Main.fps = 0;
            }
        }
        static buatCanvas(canvasEl) {
            let canvas = {
                canvas: canvasEl,
                ctx: canvasEl.getContext('2d'),
                lebar: canvasEl.height,
                panjang: canvasEl.width,
                frameH: canvasEl.height,
                frameW: canvasEl.width,
                handleX: 0,
                handleY: 0,
                img: null,
                isAnim: false,
                rotasi: 0,
                alpha: 1,
                rect: ha.Rect.create(),
                load: true,
                panjangDiSet: true,
                lebarDiSet: true,
                ratioX: 1,
                ratioY: 1
            };
            return canvas;
        }
        static init(canvasBelakang, canvasDepan) {
            let canvas = ha.Main.buatCanvas(canvasBelakang);
            ha.Main._canvasAr.push(canvas);
            canvas = ha.Main.buatCanvas(canvasDepan);
            ha.Main._canvasAr.push(canvas);
            ha.Main.canvasAktif = canvas;
        }
        static backupWarna() {
            ha.Main.warnaBackup.b = ha.Main.biru;
            ha.Main.warnaBackup.h = ha.Main.hijau;
            ha.Main.warnaBackup.m = ha.Main.merah;
            ha.Main.warnaBackup.t = ha.Main.transparan;
        }
        static restoreWarna() {
            ha.Main.biru = ha.Main.warnaBackup.b;
            ha.Main.hijau = ha.Main.warnaBackup.h;
            ha.Main.merah = ha.Main.warnaBackup.m;
            ha.Main.transparan = ha.Main.warnaBackup.t;
            ha.Main.updateStyleWarna();
        }
        static Bersih(m = 0, h = 0, b = 0, t = 1) {
            let ctx = ha.Main.canvasAktif.ctx;
            ha.Main.backupWarna();
            ctx.fillStyle = `rgba(${m}, ${h}, ${b}, ${t})`;
            ctx.fillRect(0, 0, ha.Main.canvasAktif.panjang, ha.Main.canvasAktif.lebar);
            ha.Main.restoreWarna();
        }
        static warna(r = 0, g = 0, b = 0, a = 1) {
            let h = ha.Main;
            h.merah = r;
            h.biru = b;
            h.hijau = g;
            h.transparan = a;
            h.updateStyleWarna();
        }
        static updateStyleWarna() {
            let ctx = ha.Main.canvasAktif.ctx;
            ctx.fillStyle = `rgba(${ha.Main.merah}, ${ha.Main.hijau}, ${ha.Main.biru}, ${ha.Main.transparan})`;
            ctx.strokeStyle = `rgba(${ha.Main.merah}, ${ha.Main.hijau}, ${ha.Main.biru}, ${ha.Main.transparan})`;
        }
        static Hijau() {
            return ha.Main.hijau;
        }
        static Merah() {
            return ha.Main.merah;
        }
        static Biru() {
            return ha.Main.biru;
        }
        static Transparan() {
            return ha.Main.transparan;
        }
        static Grafis(width = 320, height = 240) {
            let canvas = ha.Main.canvasAktif;
            canvas.canvas.width = width;
            canvas.canvas.height = height;
            canvas.canvas.style.width = width + 'px';
            canvas.canvas.style.height = height + 'px';
            canvas.panjang = width;
            canvas.lebar = height;
            setTimeout(() => {
                if (ha.Blijs.skalaOtomatis) {
                    ha.Blijs.windowResize();
                }
                else {
                }
            }, 0);
        }
        static Garis(x1, y1, x2, y2) {
            let ctx = ha.Main.canvasAktif.ctx;
            x1 = Math.floor(x1);
            y1 = Math.floor(y1);
            x2 = Math.floor(x2);
            y2 = Math.floor(y2);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        static Kotak(x1, y1, x2, y2, isi = false, garis = true, rotasi = 0) {
            let ctx = ha.Main.canvasAktif.ctx;
            rotasi;
            if (isi) {
                ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
            }
            if (garis) {
                ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
            }
        }
        static SetBuffer(buffer) {
            ha.Main.canvasAktif = buffer;
        }
        static get canvasAktif() {
            return ha.Main._canvasAktif;
        }
        static set canvasAktif(value) {
            ha.Main._canvasAktif = value;
        }
        static get canvasAr() {
            return ha.Main._canvasAr;
        }
        static set canvasAr(value) {
            ha.Main._canvasAr = value;
        }
        static get origin() {
            return ha.Main._origin;
        }
        static set origin(value) {
            ha.Main._origin = value;
        }
        static get fps() {
            return ha.Main._fps;
        }
        static set fps(value) {
            ha.Main._fps = value;
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
    ha.Main = Main;
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Image {
        static buatBagiCanvas(canvas, w = 32, h = 32, frameW = 32, frameH = 32) {
            let img;
            canvas.width = w;
            canvas.height = h;
            let rect = ha.Rect.create(0, 0, frameW, frameH);
            img = {
                panjang: w,
                lebar: h,
                img: null,
                frameH: frameH,
                frameW: frameW,
                handleX: 0,
                handleY: 0,
                rotasi: 0,
                alpha: 1,
                isAnim: false,
                canvas: canvas,
                ctx: canvas.getContext('2d'),
                rect: rect,
                load: true,
                panjangDiSet: true,
                lebarDiSet: true
            };
            return img;
        }
        static buat(w = 32, h = 32, frameW = 32, frameH = 32) {
            let canvas = document.createElement('canvas');
            return ha.Image.buatBagiCanvas(canvas, w, h, frameW, frameH);
        }
        static panjang(gbr) { return gbr.panjang; }
        ;
        static lebar(gbr) { return gbr.lebar; }
        ;
        static handleX(gbr) { return gbr.handleX; }
        ;
        static handleY(gbr) { return gbr.handleY; }
        ;
        static tabrakan(gbr1, x1, y1, gbr2, x2, y2) {
            ha.Image.resetRect(gbr1);
            ha.Image.rectToImageTransform(gbr1, x1, y1);
            ha.Image.resetRect(gbr2);
            ha.Image.rectToImageTransform(gbr2, x2, y2);
            return ha.Rect.collide(gbr1.rect, gbr2.rect);
        }
        ;
        static dotDidalamGambar(gbr1, x1, y1, x2, y2) {
            ha.Image.resetRect(gbr1);
            ha.Image.rectToImageTransform(gbr1, x1, y1);
            return ha.Rect.collideDot(gbr1.rect, x2, y2);
        }
        ;
        static muatAnimAsync(url, fw = 32, fh = 32) {
            let canvas = document.createElement('canvas');
            return ha.Image.muatAnimAsyncCanvas(url, fw, fh, canvas);
        }
        static muatAnimAsyncCanvas(url, fw = 32, fh = 32, canvas) {
            let img = document.createElement('img');
            let ctx = canvas.getContext('2d');
            let rect;
            rect = ha.Rect.create(0, 0, fw, fh);
            let gbr = {
                img: img,
                panjang: img.naturalWidth,
                lebar: img.naturalHeight,
                frameH: fw,
                frameW: fh,
                isAnim: true,
                handleX: 0,
                handleY: 0,
                rotasi: 0,
                alpha: 1,
                ctx: ctx,
                canvas: canvas,
                rect: rect,
                load: false,
                panjangDiSet: false,
                lebarDiSet: false
            };
            img.onload = () => {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                gbr.load = true;
                if (!gbr.panjangDiSet) {
                    gbr.panjang = img.naturalWidth;
                    gbr.panjangDiSet = true;
                }
                if (!gbr.lebarDiSet) {
                    gbr.lebarDiSet = true;
                    gbr.lebar = img.naturalHeight;
                }
            };
            img.onerror = () => {
                console.log('gagal load image, url ' + url);
            };
            img.src = url;
            return gbr;
        }
        static muatAsync(url) {
            let canvas = document.createElement('canvas');
            return ha.Image.muatAsyncKanvas(url, canvas);
        }
        static muatAsyncKanvas(url, canvas) {
            let img = document.createElement('img');
            let ctx = canvas.getContext('2d');
            let rect;
            rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);
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
            };
            let img2 = ha.cache.getGbr(url);
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
                gbr.rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);
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
                ha.cache.setFile(url, img);
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
            jmlH = Math.ceil((ha.Main.canvasAktif.panjang + Math.abs(x)) / w2);
            jmlV = Math.ceil((ha.Main.canvasAktif.lebar + Math.abs(y)) / h2);
            for (let i = 0; i < jmlH; i++) {
                for (let j = 0; j < jmlV; j++) {
                    ha.Image.gambar(gbr, x + (i * w2), y + (j * h2), frame);
                }
            }
        }
        static putarGambar(gbr, sudut = 0) {
            gbr.rotasi = sudut;
        }
        static ambilPiksel(x = 0, y = 0) {
            try {
                let data = ha.Main.canvasAktif.ctx.getImageData(x, y, 1, 1).data;
                let hasil = [];
                hasil.push(data[0]);
                hasil.push(data[1]);
                hasil.push(data[2]);
                hasil.push(data[3]);
                ha.Main.merah = data[0];
                ha.Main.hijau = data[1];
                ha.Main.biru = data[2];
                ha.Main.transparan = data[3];
                ha.Main.warna(ha.Main.merah, ha.Main.hijau, ha.Main.biru, ha.Main.transparan);
                return hasil;
            }
            catch (e) {
            }
            return [0, 0, 0];
        }
        static setPiksel(x = 0, y = 0) {
            ha.Main.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
        }
        static handle(gbr, x = 0, y = 0) {
            gbr.handleX = x;
            gbr.handleY = y;
        }
        static grabGambar(gbr, x = 0, y = 0) {
            gbr.ctx.drawImage(ha.Main.canvasAktif.canvas, x, y, gbr.panjang, gbr.lebar, 0, 0, gbr.panjang, gbr.lebar);
        }
        static gambar(gbr, x = 0, y = 0, frame = 0) {
            let ctx = ha.Main.canvasAktif.ctx;
            let jmlH = 0;
            let jmlV = 0;
            let frameX = 0;
            let frameY = 0;
            if (gbr.load == false)
                return;
            jmlH = Math.floor(gbr.img.naturalWidth / gbr.frameW);
            jmlV = Math.floor(gbr.img.naturalHeight / gbr.frameH);
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
        }
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
            p = rect.vs[1];
            p.x = x2;
            p.y = 0;
            p = rect.vs[2];
            p.x = x2;
            p.y = y2;
            p = rect.vs[3];
            p.x = 0;
            p.y = y2;
            ha.Rect.translate(rect, x, y);
            ha.Rect.translate(rect, -image.handleX, -image.handleY);
            ha.Rect.rotate(rect, image.rotasi, x, y, false);
        }
    }
    ha.Image = Image;
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Sprite {
        static daftar = [];
        _buff;
        _x = 0;
        _y = 0;
        _dragged = false;
        _down = false;
        _hit = 0;
        _dragStartY = 0;
        _dragStartX = 0;
        _dragable = false;
        _url;
        get url() {
            return this._url;
        }
        set url(value) {
            this._url = value;
        }
        constructor(buffer, dragable = false) {
            this.buffer = buffer;
            this.dragable = dragable;
        }
        static copy(sprS) {
            if (sprS.buffer.isAnim) {
                return ha.Sprite.muatAnimasiAsyncKanvas(sprS.url, sprS.buffer.frameW, sprS.buffer.frameH, sprS.dragable, sprS.buffer.canvas);
            }
            else {
                return ha.Sprite.muatAsyncBerbagiKanvas(sprS.url, sprS.dragable, sprS.buffer.canvas);
            }
        }
        static panjang(spr) {
            return ha.Image.panjang(spr.buffer);
        }
        static lebar(spr) {
            return ha.Image.lebar(spr.buffer);
        }
        static alpha(spr, alpha) {
            if (typeof (alpha) == 'number') {
                spr.buffer.alpha = alpha / 255;
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
            return ha.Image.tabrakan(spr.buffer, ha.Sprite.posisiX(spr), ha.Sprite.posisiY(spr), spr2.buffer, ha.Sprite.posisiX(spr2), ha.Sprite.posisiY(spr2));
        }
        static muatAnimasiAsyncKanvas(url, pf, lf, bisaDiDrag = false, canvas) {
            let img = ha.Image.muatAnimAsyncCanvas(url, pf, lf, canvas);
            return ha.Sprite.buat(img, bisaDiDrag, url);
        }
        static muatAnimasiAsync(url, pf, lf, bisaDiDrag = false) {
            let img = ha.Image.muatAnimAsync(url, pf, lf);
            return ha.Sprite.buat(img, bisaDiDrag, url);
        }
        static muatAsyncBerbagiKanvas(url, dragable = false, canvas) {
            let img = ha.Image.muatAsyncKanvas(url, canvas);
            return ha.Sprite.buat(img, dragable, url);
        }
        static muatAsync(url, dragable = false) {
            let img = ha.Image.muatAsync(url);
            return ha.Sprite.buat(img, dragable, url);
        }
        static ukuranGambar(gbr, w, h) {
            ha.Image.ukuran(gbr.buffer, w, h);
        }
        static buat(image, dragable = false, url) {
            let hasil;
            hasil = new Sprite(image, dragable);
            hasil.url = url;
            this.daftar.push(hasil);
            console.log('buat sprite');
            return hasil;
        }
        static inputDown(pos) {
            ha.Sprite.daftar.forEach((item) => {
                item.down = false;
            });
            for (let i = ha.Sprite.daftar.length - 1; i >= 0; i--) {
                let item;
                item = ha.Sprite.daftar[i];
                if (ha.Image.dotDidalamGambar(item.buffer, item.x, item.y, pos.x, pos.y)) {
                    item.down = true;
                    item.dragStartX = pos.x - item.x;
                    item.dragStartY = pos.y - item.y;
                    return;
                }
            }
        }
        static inputMove(pos) {
            ha.Sprite.daftar.forEach((item) => {
                if (item.down && item.dragable) {
                    item.dragged = true;
                    item.x = pos.x - item.dragStartX;
                    item.y = pos.y - item.dragStartY;
                }
            });
        }
        static inputUp() {
            ha.Sprite.daftar.forEach((item) => {
                if (item.down) {
                    item.hit++;
                }
                item.down = false;
                item.dragged = false;
            });
        }
        static gambar(sprite, frame) {
            ha.Image.gambar(sprite.buffer, sprite.x, sprite.y, frame);
        }
        static posisiPolar(sprite, sudut, jarak, x2, y2) {
            let p = ha.Point.posPolar(jarak, sudut, x2, y2);
            sprite.x = p.x;
            sprite.y = p.y;
        }
        static ubin(spr, x = 0, y = 0, frame = 0) {
            ha.Image.gambarUbin(spr.buffer, x, y, frame);
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
    }
    ha.Sprite = Sprite;
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Input {
        _inputs = [];
        _touchGlobal;
        _mouseGlobal;
        _keybGlobal;
        _inputGlobal;
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
                e.preventDefault();
                let pos = ha.input.pos(e.clientX, e.clientY, buffer, buffer.ratioX, buffer.ratioY);
                let key = this.getMouseKeyId(e);
                let input = ha.input.baru(key, e.pointerType);
                ha.input.event.down(input, key, e.pointerType, pos);
                ha.input.event.down(this._inputGlobal, key, e.pointerType, pos);
                if ("mouse" == e.pointerType)
                    ha.input.event.down(this._mouseGlobal, key, 'mouse', pos);
                if ("touch" == e.pointerType)
                    ha.input.event.down(this._touchGlobal, key, 'touch', pos);
                ha.Sprite.inputDown(pos);
            };
            buffer.canvas.onpointermove = (e) => {
                e.stopPropagation();
                e.preventDefault();
                let input = this.baru(e.button + '', e.pointerType);
                ha.input.event.move(input, buffer, e);
                ha.input.event.move(this.inputGlobal, buffer, e);
                if (e.pointerType == 'touch')
                    ha.input.event.move(ha.input.touchGlobal, buffer, e);
                if (e.pointerType == 'mouse')
                    ha.input.event.move(ha.input.mouseGlobal, buffer, e);
                let pos = ha.input.pos(e.clientX, e.clientY, buffer, buffer.ratioX, buffer.ratioY);
                ha.Sprite.inputMove(pos);
            };
            buffer.canvas.onpointerout = (e) => {
                e.stopPropagation();
                e.preventDefault();
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
                e.preventDefault();
                let input = ha.input.baru(e.button + '', e.pointerType);
                ha.input.event.up(input);
                ha.input.event.up(this.inputGlobal);
                if (e.pointerType == 'touch')
                    ha.input.event.up(ha.input.touchGlobal);
                if (e.pointerType == 'mouse')
                    ha.input.event.up(ha.input.mouseGlobal);
                ha.Sprite.daftar.forEach((item) => {
                    if (item.down) {
                        item.hit++;
                    }
                    item.down = false;
                    item.dragged = false;
                });
            };
            window.onkeydown = (e) => {
                let input = ha.input.baru(e.key + '', 'keyb');
                ha.input.event.down(input, e.key, 'keyb', ha.Point.create());
                ha.input.event.down(this.inputGlobal, e.key, 'keyb', ha.Point.create());
                ha.input.event.down(this._keybGlobal, e.key, 'keyb', ha.Point.create());
                console.log('keydown');
            };
            window.onkeyup = (e) => {
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
            let pos = ha.input.pos(e.clientX, e.clientY, buffer, buffer.ratioX, buffer.ratioY);
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
            let h = ha.Point.create(p.x, p.y);
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
            let hasil = ha.Point.create();
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
            let hasil = ha.Rect.create();
            ha.Rect.copyInfo(r, hasil);
            return hasil;
        }
        static copyInfo(r1, r2) {
            for (let i = 0; i < r1.segs.length; i++) {
                ha.Segment.copy(r1.segs[i], r2.segs[i]);
            }
        }
        static collideBound(r1, r2) {
            if (ha.Rect.maxX(r1) < ha.Rect.minX(r2)) {
                return false;
            }
            if (ha.Rect.minX(r1) > ha.Rect.maxX(r2)) {
                return false;
            }
            if (ha.Rect.maxY(r1) < ha.Rect.minY(r2)) {
                return false;
            }
            if (ha.Rect.minY(r1) > ha.Rect.maxY(r2)) {
                return false;
            }
            return true;
        }
        static collide(r1, r2) {
            let bound = ha.Rect.collideBound(r1, r2);
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
            if (d.x < ha.Rect.minX(r)) {
                return false;
            }
            if (d.x > ha.Rect.maxX(r)) {
                return false;
            }
            if (d.y < ha.Rect.minY(r)) {
                return false;
            }
            if (d.y > ha.Rect.maxY(r)) {
                return false;
            }
            return true;
        }
        static collideDot(r, x, y) {
            let r2 = Rect.copy(r);
            let p = ha.Point.create(x, y);
            let d = ha.Segment.deg(r2.segs[0]);
            let pRot = r2.vs[0];
            if (!ha.Rect.collideDotBound(r, p)) {
                return false;
            }
            Rect.rotate(r2, -d, pRot.x, pRot.y);
            ha.Point.putarPoros(p, pRot.x, pRot.y, -d);
            if (!ha.Rect.collideDotBound(r2, p)) {
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
                ha.Point.putarPoros(p, xc, yc, deg);
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
            if (ha.Segment.maxX(seg1) < ha.Segment.minX(seg2))
                return false;
            if (ha.Segment.minX(seg1) > ha.Segment.maxX(seg2))
                return false;
            if (ha.Segment.maxY(seg1) < ha.Segment.minY(seg2))
                return false;
            if (ha.Segment.minY(seg1) > ha.Segment.maxY(seg2))
                return false;
            return true;
        }
        static collide(seg1, seg2) {
            let bound = ha.Segment.boundCollide(seg1, seg2);
            if (!bound)
                return false;
            let seg2Copy = ha.Segment.clone(seg2);
            let seg1Copy = ha.Segment.clone(seg1);
            let deg = ha.Segment.deg(seg2);
            ha.Segment.rotate(seg2Copy, -deg, seg2.v1.x, seg2.v1.y);
            ha.Segment.rotate(seg1Copy, -deg, seg2.v1.x, seg2.v1.y);
            if (!ha.Segment.boundCollide(seg1Copy, seg2Copy))
                return false;
            ha.Segment.translate(seg1Copy, -seg2.v1.x, -seg2.v1.y);
            ha.Segment.translate(seg2Copy, -seg2.v1.x, -seg2.v1.y);
            if (!ha.Segment.crossHor(seg1Copy)) {
                return false;
            }
            let idx = ha.Segment.xHorIdx(seg1Copy);
            let x = ha.Segment.getXAtIdx(seg1Copy, idx);
            if (x > ha.Segment.maxX(seg2Copy))
                return false;
            if (x < ha.Segment.minX(seg2Copy))
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
            if (ha.Segment.maxY(seg) > 0) {
                if (ha.Segment.minY(seg) < 0) {
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
            return seg.v1.x + (idx * ha.Segment.vecI(seg));
        }
        static getYAtIdx(seg, idx) {
            return seg.v1.y + (idx * ha.Segment.vecJ(seg));
        }
        static vecI(seg) {
            return seg.v2.x - seg.v1.x;
        }
        static vecJ(seg) {
            return seg.v2.y - seg.v1.y;
        }
        static rotate(seg, deg = 0, xc = 0, yc = 0) {
            ha.Point.putarPoros(seg.v1, xc, yc, deg);
            ha.Point.putarPoros(seg.v2, xc, yc, deg);
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
            if (!ha.Segment.crossHor(seg))
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
    class Blijs {
        static _skalaOtomatis = true;
        static init(panjang = 320, lebar = 240, canvas = null, skalaOtomatis = true) {
            if (!canvas)
                canvas = document.body.querySelector('canvas');
            if (!canvas) {
                console.log('gagal init');
                return;
            }
            ha.Blijs.skalaOtomatis = skalaOtomatis;
            if (ha.Main.canvasAktif) {
                console.warn('init lebih dari sekali');
                ha.Main.Grafis(panjang, lebar);
            }
            else {
                console.log('inisialisasi');
                ha.Main.init(canvas, canvas);
                ha.Main.Grafis(panjang, lebar);
                ha.input.init(ha.Main.canvasAktif);
                window.onresize = () => {
                    if (ha.Blijs.skalaOtomatis) {
                        ha.Blijs.windowResize();
                    }
                };
                if (ha.Blijs.skalaOtomatis) {
                    ha.Blijs.windowResize();
                }
                setTimeout(() => {
                    if (ha.Blijs.skalaOtomatis) {
                        ha.Blijs.windowResize();
                    }
                }, 100);
                setTimeout(() => {
                    ha.Blijs.repeat();
                }, 0);
                ha.Teks.font("16px Arial");
                ha.Teks.rata("center");
                ha.Main.warna(255, 255, 255, 1);
            }
        }
        static loop() {
            let _window = window;
            if (typeof (_window.Loop) == 'function') {
                _window.Loop();
            }
            else if (typeof (_window.Update) == 'function') {
                _window.Update();
            }
        }
        static repeat() {
            ha.Blijs.loop();
            setTimeout(() => {
                requestAnimationFrame(ha.Blijs.repeat);
            }, ha.Main.fps);
        }
        static windowResize() {
            let canvas = ha.Main.canvasAktif.canvas;
            let cp = ha.Main.canvasAktif.canvas.width;
            let cl = ha.Main.canvasAktif.canvas.height;
            let wp = window.innerWidth;
            let wl = window.innerHeight;
            let ratio = Math.min((wp / cp), (wl / cl));
            let cp2 = Math.floor(cp * ratio);
            let cl2 = Math.floor(cl * ratio);
            ha.Main.canvasAktif.ratioX = ratio;
            ha.Main.canvasAktif.ratioY = ratio;
            canvas.style.position = 'fixed';
            canvas.style.zIndex = '9999';
            canvas.style.width = cp2 + 'px';
            canvas.style.height = cl2 + 'px';
            canvas.style.top = ((wl - cl2) / 2) + 'px';
            canvas.style.left = ((wp - cp2) / 2) + 'px';
        }
        static get skalaOtomatis() {
            return Blijs._skalaOtomatis;
        }
        static set skalaOtomatis(value) {
            Blijs._skalaOtomatis = value;
        }
    }
    ha.Blijs = Blijs;
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Transform {
        static RAD2DEG = 180.0 / Math.PI;
        static DEG2RAD = Math.PI / 180.0;
        static _lastX = 0;
        static _lastY = 0;
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
    ha.Transform = Transform;
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Teks {
        static get ctx() {
            return ha.Main.canvasAktif.ctx;
        }
        static font(font = '30px Arial') {
            ha.Teks.ctx.font = font;
        }
        static rata(rata = "left") {
            ha.Teks.ctx.textAlign = rata;
        }
        static tulis(teks, x, y, warna = true, garis = false) {
            if (warna) {
                ha.Teks.ctx.fillText(teks, x, y);
            }
            if (garis) {
                ha.Teks.ctx.strokeText(teks, x, y);
            }
        }
    }
    ha.Teks = Teks;
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Route {
        static ukuran(obj, w = 32, h = 32) {
            if ("teks" == obj) {
            }
            else {
                ha.Sprite.ukuranGambar(obj, w, h);
            }
        }
    }
    ha.Route = Route;
})(ha || (ha = {}));
const Prompt = (m, def) => {
    let hasil = window.prompt(m, def);
    return hasil;
};
const InputHit = () => {
    let hit = ha.input.inputGlobal.hit;
    ha.input.inputGlobal.hit = 0;
    return hit;
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
const GetMouse = () => {
    return parseInt(ha.input.mouseGlobal.key);
};
const MouseHit = (button = -1) => {
    if (button == -1) {
    }
    else {
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
const Bersih = ha.Main.Bersih;
const Grafis = ha.Blijs.init;
const Warna = ha.Main.warna;
const Merah = ha.Main.Merah;
const Hijau = ha.Main.Hijau;
const Biru = ha.Main.Biru;
const Transparan = ha.Main.Transparan;
const AmbilPiksel = ha.Image.ambilPiksel;
const SetPiksel = ha.Image.setPiksel;
const Garis = ha.Main.Garis;
const Kotak = ha.Main.Kotak;
const Sudut = ha.Transform.deg;
const Buat = ha.Sprite.buat;
const Muat = ha.Sprite.muatAsync;
const Posisi = ha.Sprite.posisi;
const Ukuran = ha.Sprite.ukuranGambar;
const PosisiPolar = ha.Sprite.posisiPolar;
const Gambar = ha.Sprite.gambar;
const GambarSemua = ha.Sprite.gambarSemua;
const PosisiX = ha.Sprite.posisiX;
const PosisiY = ha.Sprite.posisiY;
const Handle = ha.Sprite.handle;
const Rotasi = ha.Sprite.rotasi;
const Alpha = ha.Sprite.alpha;
const MuatAnimasi = ha.Sprite.muatAnimasiAsync;
const Tabrakan = ha.Sprite.tabrakan;
const Panjang = ha.Sprite.panjang;
const Lebar = ha.Sprite.lebar;
const Copy = ha.Sprite.copy;
const Ubin = ha.Sprite.ubin;
const FPS = ha.Main.Fps;
var Font = ha.Teks.font;
var Tulis = ha.Teks.tulis;
var Rata = ha.Teks.rata;
var ha;
(function (ha) {
    class Cache {
        files = [];
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
    ha.cache = new Cache();
})(ha || (ha = {}));
