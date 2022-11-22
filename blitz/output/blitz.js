var ha;
(function (ha) {
    //TODO: beberapa perintah harus mengecheck apakah kanvas sudah di init, dan coba lagi kalau belum bisa
    class Main {
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
                // scaleX: 1,
                // scaleY: 1,
                panjang: canvasEl.width,
                frameH: canvasEl.height,
                frameW: canvasEl.width,
                handleX: 0,
                handleY: 0,
                img: null,
                isAnim: false,
                rotation: 0,
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
            let canvas = this.buatCanvas(canvasBelakang);
            this._canvasAr.push(canvas);
            canvas = this.buatCanvas(canvasDepan);
            this._canvasAr.push(canvas);
            ha.Main.canvasAktif = canvas;
        }
        static Bersih() {
            let ctx = ha.Main.canvasAktif.ctx;
            // ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.fillRect(0, 0, ha.Main.canvasAktif.panjang, ha.Main.canvasAktif.lebar);
        }
        static warna(r = 0, g = 0, b = 0, a = 255) {
            this.merah = r;
            this.biru = b;
            this.hijau = g;
            this.transparan = a / 255;
            this.updateWarna();
        }
        static updateWarna() {
            let ctx = ha.Main.canvasAktif.ctx;
            ctx.fillStyle = `rgba(${this.merah}, ${this.hijau}, ${this.biru}, ${this.transparan})`;
            ctx.strokeStyle = `rgba(${this.merah}, ${this.hijau}, ${this.biru}, ${this.transparan})`;
        }
        static Hijau(a = 0) {
            if (typeof (a) == 'number') {
                this.hijau = a;
                this.updateWarna();
            }
            return this.hijau;
        }
        static Merah(a = 0) {
            if (typeof (a) == 'number') {
                this.merah = a;
                this.updateWarna();
            }
            return this.merah;
        }
        static Biru(a = 0) {
            if (typeof (a) == 'number') {
                this.biru = a;
                this.updateWarna();
            }
            return this.biru;
        }
        static Transparan(a = 0) {
            if (typeof (a) == 'number') {
                this.transparan = a / 255;
                this.updateWarna();
            }
            return this.transparan;
        }
        static Grafis(width = 320, height = 240) {
            let canvas = ha.Main.canvasAktif;
            //check canvas sudah diinit atau belum
            // if (!canvas) {
            // 	if (canvas2) {
            // 		this.init(canvas,)
            // 	}
            // 	// return;
            // 	// setTimeout(() => {
            // 	// 	ha.Main.Grafis(width, height);
            // 	// }, 0);
            // 	// console.log('failed');
            // 	// return;
            // }
            // console.log('ok');
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
            // if (canvas2) {
            // 	ha.Main.canvasAktif.canvas.classList.add('gl');
            // }
            // else {
            // 	ha.Main.canvasAktif.canvas.classList.remove('gl');
            // }
            // if (skalaOtomatis) {
            // 	ha.Main.canvasAktif.canvas.classList.add('pixel');
            // }
            // ha_blitz.Main.windowResize();
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
        static Kotak(x1, y1, x2, y2) {
            let ctx = ha.Main.canvasAktif.ctx;
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        }
        static SetBuffer(buffer) {
            ha.Main.canvasAktif = buffer;
        }
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
        static get skalaOtomatis() {
            return Main._skalaOtomatis;
        }
        static set skalaOtomatis(value) {
            Main._skalaOtomatis = value;
        }
    }
    Main._fps = 0;
    Main._canvasAr = [];
    Main._skalaOtomatis = true;
    Main.merah = 0;
    Main.hijau = 0;
    Main.biru = 0;
    Main.transparan = 0;
    ha.Main = Main;
})(ha || (ha = {}));
var ha;
(function (ha) {
    //TODO: harus ada setter and getter buat object gambar
    class Image {
        // readonly daftar: IGambar[] = [];
        static buatGambar(w = 32, h = 32, frameW = 32, frameH = 32) {
            let canvas = document.createElement('canvas');
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
                rotation: 0,
                isAnim: false,
                // scaleX: 1,
                // scaleY: 1,
                canvas: canvas,
                ctx: canvas.getContext('2d'),
                rect: rect,
                load: true,
                panjangDiSet: true,
                lebarDiSet: true
            };
            return img;
        }
        static panjangGambar(gbr) { return gbr.panjang; }
        ;
        static lebarGambar(gbr) { return gbr.lebar; }
        ;
        static handleXGambar(gbr) { return gbr.handleX; }
        ;
        static handleYGambar(gbr) { return gbr.handleY; }
        ;
        //TODO:
        static gambarOverlap(gbr1, x1, y1, gbr2, x2, y2) {
            ha.Image.gambarTabrakan(gbr1, x1, y1, gbr2, x2, y2);
        }
        ;
        static gambarTabrakan(gbr1, x1, y1, gbr2, x2, y2) {
            ha.Image.resetImageRect(gbr1);
            ha.Image.rectToImageTransform(gbr1, x1, y1);
            ha.Image.resetImageRect(gbr2);
            ha.Image.rectToImageTransform(gbr2, x2, y2);
            return ha.Rect.collide(gbr1.rect, gbr2.rect);
        }
        ;
        static dotDidalamGambar(gbr1, x1, y1, x2, y2) {
            ha.Image.resetImageRect(gbr1);
            ha.Image.rectToImageTransform(gbr1, x1, y1);
            return ha.Rect.collideDot(gbr1.rect, x2, y2);
        }
        ;
        //
        // static async muatGambarAnimasi(url: string, fw: number = 32, fh: number = 32): Promise<IGambar> {
        // 	let img: HTMLImageElement = await ha.image.loadImage(url);
        // 	let canvas: HTMLCanvasElement = document.createElement('canvas');
        // 	let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        // 	let rect: IRect;
        // 	canvas.width = img.naturalWidth;
        // 	canvas.height = img.naturalHeight;
        // 	ctx.drawImage(img, 0, 0);
        // 	rect = ha.Rect.create(0, 0, fw, fh);
        // 	return {
        // 		img: img,
        // 		panjang: img.naturalWidth,
        // 		lebar: img.naturalHeight,
        // 		frameH: fw,
        // 		frameW: fh,
        // 		// width2: w,
        // 		// height2: h,
        // 		isAnim: true,
        // 		handleX: 0,
        // 		handleY: 0,
        // 		rotation: 0,
        // 		// scaleX: 1,
        // 		// scaleY: 1,
        // 		ctx: ctx,
        // 		canvas: canvas,
        // 		rect: rect,
        // 		load: true,
        // 		panjangDiSet: true,
        // 		lebarDiSet: true
        // 	}
        // }
        static muatGambarAnimasiAsync(url, fw = 32, fh = 32) {
            let img = document.createElement('img'); //;
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let rect;
            // canvas.width = img.naturalWidth;
            // canvas.height = img.naturalHeight;
            // ctx.drawImage(img, 0, 0);
            rect = ha.Rect.create(0, 0, fw, fh);
            let gbr = {
                img: img,
                panjang: img.naturalWidth,
                lebar: img.naturalHeight,
                frameH: fw,
                frameW: fh,
                // width2: w,
                // height2: h,
                isAnim: true,
                handleX: 0,
                handleY: 0,
                rotation: 0,
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
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                // gbr.rect = ha.Rect.create(0, 0, fw, fh);
                gbr.load = true;
                if (!gbr.panjangDiSet) {
                    gbr.panjang = img.naturalWidth;
                    gbr.panjangDiSet = true;
                }
                if (!gbr.lebarDiSet) {
                    gbr.lebarDiSet = true;
                    gbr.lebar = img.naturalHeight;
                }
                // gbr.lebar = img.naturalHeight;
                // gbr.frameH = img.naturalHeight;
                // gbr.frameW = img.naturalWidth;
                // console.log(gbr);
            };
            img.onerror = () => {
                console.log('gagal load image, url ' + url);
                //TODO: default image
            };
            img.src = url;
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
                panjang: img.naturalWidth,
                lebar: img.naturalHeight,
                frameH: img.naturalHeight,
                frameW: img.naturalWidth,
                isAnim: false,
                handleX: 0,
                handleY: 0,
                rotation: 0,
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
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                gbr.rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);
                gbr.load = true;
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
                // console.log(gbr);
                console.log('gambar di load');
            };
            img.onerror = () => {
                console.log('gagal load image, url ' + url);
                //TODO: default image
            };
            img.src = url;
            // ha_blitz.image.daftar.push(gbr);
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
            debugger;
            for (let i = 0; i < jmlH; i++) {
                for (let j = 0; j < jmlV; j++) {
                    ha.Image.gambar(gbr, x + (i * w2), y + (j * h2), frame);
                }
            }
        }
        static putarGambar(gbr, sudut = 0) {
            gbr.rotation = sudut;
        }
        // static skalaGambar(gbr: IGambar, skalaX: number = 1, skalaY: number = 1) {
        // 	gbr.scaleX = skalaX;
        // 	gbr.scaleY = skalaY;
        // }
        static ambilPiksel(x = 0, y = 0) {
            try {
                let data = ha.Main.canvasAktif.ctx.getImageData(x, y, 1, 1).data;
                let hasil = [];
                hasil.push(data[0]);
                hasil.push(data[1]);
                hasil.push(data[2]);
                hasil.push(data[3]);
                ha.Main.warna(data[0], data[1], data[2], data[3]);
                return hasil;
            }
            catch (e) {
                console.error(e);
            }
            return [0, 0, 0];
        }
        //TODO: dep
        // static setWarna(r: number = 255, g: number = 255, b: number = 255, a: number = 1) {
        // 	let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;
        // 	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        // 	ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        // }
        static setPiksel(x = 0, y = 0) {
            ha.Main.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
        }
        static posisiHandleGambar(gbr, x = 0, y = 0) {
            gbr.handleX = x;
            gbr.handleY = y;
        }
        static grabGambar(gbr, x = 0, y = 0) {
            gbr.ctx.drawImage(ha.Main.canvasAktif.canvas, x, y, gbr.panjang, gbr.lebar, 0, 0, gbr.panjang, gbr.lebar);
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
        static async tungguLoad() {
            return new Promise((resolve, reject) => {
                resolve;
                reject;
            });
        }
        // static async muat(url: string): Promise<IGambar> {
        // 	let img: HTMLImageElement = await ha.image.loadImage(url);
        // 	let canvas: HTMLCanvasElement = document.createElement('canvas');
        // 	let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        // 	let rect: IRect;
        // 	canvas.width = img.naturalWidth;
        // 	canvas.height = img.naturalHeight;
        // 	ctx.drawImage(img, 0, 0);
        // 	rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);
        // 	let gbr: IGambar = {
        // 		img: img,
        // 		panjang: img.naturalWidth,
        // 		lebar: img.naturalHeight,
        // 		frameH: img.naturalHeight,
        // 		frameW: img.naturalWidth,
        // 		isAnim: false,
        // 		handleX: 0,
        // 		handleY: 0,
        // 		rotation: 0,
        // 		// scaleX: 1,
        // 		// scaleY: 1,
        // 		ctx: ctx,
        // 		canvas: canvas,
        // 		rect: rect,
        // 		load: true
        // 	}
        // 	// ha_blitz.image.daftar.push(gbr);
        // 	return gbr;
        // }
        static gambar(gbr, x = 0, y = 0, frame = 0) {
            let ctx = ha.Main.canvasAktif.ctx;
            let jmlH = 0;
            let jmlV = 0;
            let frameX = 0;
            let frameY = 0;
            // let rect: IRect = img.rect;
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
            // debugger;
        }
        // handleTengah = (gbr: IGambar) => {
        // 	gbr.handleX = Math.floor(gbr.panjang / 2);
        // 	gbr.handleY = Math.floor(gbr.lebar / 2);
        // }
        /**
         * Ubah Ukuran Gambar
         * @param gbr
         * @param w
         * @param h
         */
        static ukuranGambar(gbr, w, h) {
            // gbr.scaleX = Math.floor(w) / gbr.frameW;
            // gbr.scaleY = Math.floor(h) / gbr.frameH;
            gbr.panjang = w;
            gbr.lebar = h;
            gbr.panjangDiSet = true;
            gbr.lebarDiSet = true;
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
        // async loadImage(url: string): Promise<HTMLImageElement> {
        // 	return new Promise((resolve, reject): void => {
        // 		let image2: HTMLImageElement = document.createElement('img');
        // 		image2.onload = () => {
        // 			resolve(image2);
        // 		}
        // 		image2.src = url;
        // 		image2.onerror = (e) => {
        // 			reject(e);
        // 		}
        // 	});
        // }
        static resetImageRect(img) {
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
            ha.Rect.translate(rect, x, y);
            ha.Rect.translate(rect, -image.handleX, -image.handleY);
            //rotate
            ha.Rect.rotate(rect, image.rotation, x, y, false);
        }
    }
    ha.Image = Image;
    // export var image: Image = new Image();
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
        static rotasi(sprite, sudut) {
            if (sprite && (typeof (sudut) == 'number')) {
                sprite.buffer.rotation = sudut;
            }
            return sprite.buffer.rotation;
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
            return ha.Image.gambarTabrakan(spr.buffer, ha.Sprite.posisiX(spr), ha.Sprite.posisiY(spr), spr2.buffer, ha.Sprite.posisiX(spr2), ha.Sprite.posisiY(spr2));
        }
        static muatAnimasiAsync(url, pf, lf, bisaDiDrag = false) {
            let img = ha.Image.muatGambarAnimasiAsync(url, pf, lf);
            return ha.Sprite.buat(img, bisaDiDrag);
        }
        static muatAsync(url, dragable = false) {
            let img = ha.Image.muatAsync(url);
            console.log(img);
            return ha.Sprite.buat(img, dragable);
        }
        // static async muat(url: string, dragable = false): Promise<ISprite> {
        //     let img: IGambar = await ha.Image.muat(url);
        //     return this.buat(img, dragable);
        // }
        static ukuranGambar(gbr, w, h) {
            ha.Image.ukuranGambar(gbr.buffer, w, h);
        }
        // static handleTengah(gbr: ISprite): void {
        //     ha.image.handleTengah(gbr.buffer);
        // }
        static buat(image, dragable = false) {
            let hasil;
            hasil = new Sprite(image, dragable);
            this.daftar.push(hasil);
            console.log('buat sprite');
            return hasil;
        }
        static inputDown(pos) {
            ha.Sprite.daftar.forEach((item) => {
                item.down = false;
            });
            //sprite down
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
    Sprite.daftar = [];
    ha.Sprite = Sprite;
})(ha || (ha = {}));
/** INPUT.TS */
var ha;
(function (ha) {
    class Input {
        constructor() {
            this._inputs = []; //any input,
            this._event = new EventHandler();
            this.pos = (cx, cy, buffer, canvasScaleX, canvasScaleY) => {
                let rect = buffer.canvas.getBoundingClientRect();
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
                // e.preventDefault();
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
                //sprite	
                //sprite move
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
                ha.Sprite.daftar.forEach((item) => {
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
            // console.log('copy:');
            // console.log(r.vs);
            // let hasil: IRect = this.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
            let hasil = this.create();
            this.copyInfo(r, hasil);
            // console.log(hasil.vs);
            return hasil;
        }
        static copyInfo(r1, r2) {
            for (let i = 0; i < r1.segs.length; i++) {
                ha.Segment.copy(r1.segs[i], r2.segs[i]);
            }
        }
        static collideBound(r1, r2) {
            // console.debug('collide bound');
            if (this.maxX(r1) < this.minX(r2)) {
                // console.debug('maxX gagal');
                return false;
            }
            // console.log('maxx ' + this.maxX(r1));
            // console.log('minx ' + this.minX(r2));
            if (this.minX(r1) > this.maxX(r2)) {
                // console.debug('min x gagal');
                return false;
            }
            if (this.maxY(r1) < this.minY(r2)) {
                // console.debug('max y gagal');
                return false;
            }
            if (this.minY(r1) > this.maxY(r2)) {
                // console.debug('min y gagal');
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
                // console.log('minx failed');
                return false;
            }
            if (d.x > this.maxX(r)) {
                // console.log('maxX failed');
                // console.log(d);
                // console.log(this.maxX(r));
                // console.log(r.vs);
                return false;
            }
            if (d.y < this.minY(r)) {
                // console.log('minY failed');
                return false;
            }
            if (d.y > this.maxY(r)) {
                // console.log('maxY failed');
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
            ha.Point.putarPoros(p, pRot.x, pRot.y, -d);
            if (!this.collideDotBound(r2, p)) {
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
                ha.Point.putarPoros(p, xc, yc, deg);
            });
            return r2;
        }
    }
    ha.Rect = Rect;
    // export var rect: Rect = new Rect();
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
            // let deg: number = this.deg(seg2);
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
        //tested
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
/**
 * BLIJS
 */
var ha;
(function (ha) {
    class Blijs {
        /**
         * Setup Blitz Edu
         * @param panjang (angka) panjang dari kanvas
         * @param lebar (angka) lebar dari kanvs
         * @param canvas (HTMLCanvasElement) referensi ke kanvas
         * @param skalaOtomatis (boolean) apakah akan men-skala kanvas mengikuti ukuran layar
         * @returns
         */
        static init(panjang = 320, lebar = 240, canvas = null, skalaOtomatis = true) {
            //coba cari canvas
            if (!canvas)
                canvas = document.body.querySelector('canvas');
            if (!canvas) {
                console.log('gagal init');
                return;
            }
            ha.Blijs.skalaOtomatis = skalaOtomatis;
            //sudah diinisialisasi atau belum
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
                setTimeout(() => {
                    if (ha.Blijs.skalaOtomatis) {
                        ha.Blijs.windowResize();
                    }
                }, 100);
                // let _window: any = window;
                setTimeout(() => {
                    ha.Blijs.repeat();
                    // if (typeof _window.Mulai__ == "function") {
                    // 	console.log('window start function called');
                    // 	_window.Mulai()
                    // 		.then(() => {
                    // 			this.repeat();
                    // 		})
                    // 		.catch((e: Error) => {
                    // 			console.error(e);
                    // 		})
                    // }
                    // else {
                    // 	console.warn('start not found');
                    // 	this.repeat();
                    // }
                }, 0);
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
                _window.update();
                //TODO: post loop
            }
        }
        static repeat() {
            //check semua image sudah diload
            ha.Blijs.loop();
            setTimeout(() => {
                requestAnimationFrame(() => {
                    ha.Blijs.repeat();
                });
            }, ha.Main.fps);
        }
        static windowResize() {
            // console.debug('window on resize');
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
    ha.Blijs = Blijs;
})(ha || (ha = {}));
// setTimeout(() => {
// 	ha.Blijs.init()
// }, 0);
var ha;
(function (ha) {
    class Transform {
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
            deg *= this.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            this._lastX = x1 + xt;
            this._lastY = y1 + yt;
        }
    }
    Transform.RAD2DEG = 180.0 / Math.PI;
    Transform.DEG2RAD = Math.PI / 180.0;
    Transform._lastX = 0;
    Transform._lastY = 0;
    ha.Transform = Transform;
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
///<reference path="./Route.ts"/>
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
// const TungguInput = async (): Promise<void> => {
// 	while (true) {
// 		if (InputHit() > 0) return;
// 		Jeda(30);
// 	}
// }
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
// const TungguKeyb = async (kode: string = ""): Promise<void> => {
// 	console.log('wait key: ' + kode);
// 	let ulang: boolean = true;
// 	while (ulang) {
// 		if (KeybHit(kode) > 0) ulang = false;
// 		await Jeda(30);
// 	}
// 	console.log('wait key end');
// }
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
///<reference path="./Route.ts"/>
/*
 * 	GRAPHICS
 */
const Bersih = ha.Main.Bersih;
/**
 * Setup Blitz Edu
 * @param panjang (angka) panjang dari kanvas
 * @param lebar (angka) lebar dari kanvs
 * @param canvas (HTMLCanvasElement) referensi ke kanvas
 * @param skalaOtomatis (boolean) apakah akan men-skala kanvas mengikuti ukuran layar
 * @returns
 */
const Grafis = ha.Blijs.init;
const Warna = ha.Main.warna;
const Merah = ha.Main.Merah;
const Hijau = ha.Main.Hijau;
const Biru = ha.Main.Biru;
const Transparan = ha.Main.Transparan;
const AmbilPiksel = ha.Main.warna;
const SetPiksel = ha.Main.warna;
const Garis = ha.Main.Garis;
const Kotak = ha.Main.Kotak;
const SetBuffer = ha.Main.SetBuffer;
// const GraphicsBuffer = () => { }
// const Origin = () => { }
// const Oval = () => { }
// const WritePixel = () => { }
// const ReadPixel = () => { }
// const Plot = () => { }
// const ClsColor = () => { }
// const CopyPixel = () => { }
// const CopyRect = () => { }
// const FrontBuffer = () => { }
// const BackBuffer = () => { }
///<reference path="../ha/Main.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="./Route.ts"/>
/** BLITZ-SPRITE.TS */
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
const MuatAnimasi = ha.Sprite.muatAnimasiAsync;
const Tabrakan = ha.Sprite.tabrakan;
const PosisiJarakSprite = () => { };
const Copy = () => { };
const PosisiHandle = () => { };
const Panjang = () => { };
const Lebar = () => { };
const HandleX = () => { };
const HandleY = () => { };
const Overlap = () => { };
const DotDiDalam = () => { };
const Ubin = ha.Sprite.ubin;
const Skala = () => { };
const Piksel = () => { };
///<reference path="../ha/Main.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="./Route.ts"/>
// const Jeda = async (m: number = 0): Promise<void> => {
// 	return new Promise((resolve, _reject) => {
// 		setTimeout(() => {
// 			resolve();
// 		}, m);
// 	})
// }
const FPS = ha.Main.Fps;
//TODO: dihapus
//TODO: kemungkinan diganti buat nyesuain sama blitz
// const Dim = (...args: any[]): any[] => {
// 	if (0 == args.length) {
// 		return [];
// 	}
// 	else if (1 == args.length) {
// 		let hasil: any[] = [];
// 		for (let i: number = 0; i < args[0]; i++) {
// 			hasil[i] = {}
// 		}
// 		return hasil;
// 	}
// 	else if (2 == args.length) {
// 		if (typeof args[1] == 'number') {
// 			let hasil: any[] = [];
// 			for (let i: number = 0; i < args[0]; i++) {
// 				hasil[i] = [];
// 				for (let j: number = 0; j < args[1]; j++) {
// 					hasil[i][j] = {}
// 				}
// 			}
// 			return hasil;
// 		}
// 		else if (typeof args[1] == 'function') {
// 			let hasil: any[] = [];
// 			for (let i: number = 0; i < args[0]; i++) {
// 				hasil[i] = {}
// 				args[1](hasil[i]);
// 			}
// 			return hasil;
// 		}
// 		else if (typeof args[1] == 'object') {
// 			let hasil: any[] = [];
// 			for (let i: number = 0; i < args[0]; i++) {
// 				try {
// 					hasil[i] = JSON.parse(JSON.stringify(args[1]));
// 				}
// 				catch (e) {
// 					console.error(e);
// 					hasil[i] = {}
// 				}
// 			}
// 			return hasil;
// 		}
// 		else {
// 			throw new Error('second argument is invalid, expected number or function or object');
// 		}
// 	}
// 	else if (3 == args.length) {
// 		if (typeof args[2] == 'function') {
// 			let hasil: any[] = [];
// 			for (let i: number = 0; i < args[0]; i++) {
// 				hasil[i] = [];
// 				for (let j: number = 0; j < args[1]; j++) {
// 					hasil[i][j] = {}
// 					args[2](hasil[i][j])
// 				}
// 			}
// 			return hasil;
// 		}
// 		else if (typeof args[2] == 'object') {
// 			let hasil: any[] = [];
// 			for (let i: number = 0; i < args[0]; i++) {
// 				hasil[i] = [];
// 				for (let j: number = 0; j < args[1]; j++) {
// 					hasil[i][j] = JSON.parse(JSON.stringify(args[2]));
// 				}
// 			}
// 			return hasil;
// 		}
// 		else {
// 			throw Error('expecting third argument is a function or object');
// 		}
// 	}
// 	else {
// 		throw Error('arguments invalid, expected max arguments: 3');
// 	}
// }
// const Millisecs = (): number => {
// 	return Date.now();
// }
/**
 * TEXTS
 */ 
/**
 * INTERFACE
*/
/**
 * INTERFACE
*/
