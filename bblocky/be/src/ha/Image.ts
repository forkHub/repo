namespace ha.be {

	class Gbr implements IGbr {
		img: HTMLImageElement;
		canvas: HTMLCanvasElement;
		ctx: CanvasRenderingContext2D;
		frameW: number = 32;
		frameH: number = 32;
		private _rotasi: number = 0;
		alpha: number = 100;
		isAnim: boolean = false;
		rect: IKotak = new Kotak();
		load: boolean = false;
		panjang: number = 0;
		lebar: number = 0;
		panjangDiSet: boolean = false;
		lebarDiSet: boolean = false;
		handleX: number = 0;
		handleY: number = 0;
		ratioX?: number = 1;
		ratioY?: number = 1;
		klikKum: number = 0;

		private _ctrIdx: number = 0;
		public get ctrIdx(): number {
			return this._ctrIdx;
		}
		public set ctrIdx(value: number) {
			this._ctrIdx = value;
		}

		public get rotasi(): number {
			return this._rotasi;
		}
		public set rotasi(value: number) {
			// console.debug('set value: ' + value);
			this._rotasi = value;
		}
	}

	export class Img {
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

		static buatBagiCanvas(canvas: HTMLCanvasElement, w: number = 32, h: number = 32, frameW: number = 32, frameH: number = 32): IGbr {
			let img: IGbr;

			canvas.width = w;
			canvas.height = h;

			let rect: IKotak = ha.be.Kotak.buat(0, 0, frameW, frameH);

			img = new Gbr();
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

		// static gambarRect(spr: ISprite) {
		// 	Image.resetRect(spr.buffer);
		// 	Image.rectToImageTransform(spr.buffer, spr.x, spr.y);

		// 	let ctx: CanvasRenderingContext2D = Be.canvasAktif.ctx;
		// 	let rect: IKotak = spr.buffer.rect;

		// 	ctx.beginPath();
		// 	ctx.strokeStyle = "#ffffff";
		// 	ctx.lineWidth = 5;
		// 	ctx.moveTo(rect.vs[0].x, rect.vs[0].y);
		// 	ctx.lineTo(rect.vs[1].x, rect.vs[1].y);
		// 	ctx.lineTo(rect.vs[2].x, rect.vs[2].y);
		// 	ctx.lineTo(rect.vs[3].x, rect.vs[3].y);
		// 	ctx.moveTo(rect.vs[0].x, rect.vs[0].y);
		// 	ctx.stroke();
		// }

		// static buat(w: number = 32, h: number = 32, frameW: number = 32, frameH: number = 32): IGambar {
		// 	let canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;

		// 	return Image.buatBagiCanvas(canvas, w, h, frameW, frameH);
		// 	// let img: IGambar;

		// 	// canvas.width = w;
		// 	// canvas.height = h;

		// 	// let rect: IRect = ha.be.Rect.create(0, 0, frameW, frameH);

		// 	// img = {
		// 	// 	panjang: w,
		// 	// 	lebar: h,
		// 	// 	img: null,
		// 	// 	frameH: frameH,
		// 	// 	frameW: frameW,
		// 	// 	handleX: 0,
		// 	// 	handleY: 0,
		// 	// 	rotasi: 0,
		// 	// 	alpha: 1,
		// 	// 	isAnim: false,
		// 	// 	// scaleX: 1,
		// 	// 	// scaleY: 1,
		// 	// 	canvas: canvas,
		// 	// 	ctx: canvas.getContext('2d'),
		// 	// 	rect: rect,
		// 	// 	load: true,
		// 	// 	panjangDiSet: true,
		// 	// 	lebarDiSet: true
		// 	// }

		// 	// return img;
		// }

		static panjang(gbr: IGbr, pj?: number): number {
			if (typeof pj == 'number') {
				gbr.panjang = pj;
				gbr.panjangDiSet = true;
			}

			return gbr.panjang;
		};

		static lebar(gbr: IGbr, lb?: number): number {
			if (typeof lb == 'number') {
				gbr.lebar = lb;
				gbr.lebarDiSet = true;
			}

			return gbr.lebar;
		};

		//static handleX(gbr: IGambar): number { return gbr.handleX; };

		//static handleY(gbr: IGambar): number { return gbr.handleY; };

		static tabrakan(gbr1: IGbr, x1: number, y1: number, gbr2: IGbr, x2: number, y2: number): boolean {
			Img.resetRect(gbr1);
			Img.rectToImageTransform(gbr1, x1, y1);

			Img.resetRect(gbr2);
			Img.rectToImageTransform(gbr2, x2, y2);

			return ha.be.Kotak.collide(gbr1.rect, gbr2.rect);
		};

		static dotDidalamGambar(gbr1: IGbr, x1: number, y1: number, x2: number, y2: number): boolean {
			Img.resetRect(gbr1);
			Img.rectToImageTransform(gbr1, x1, y1);

			return ha.be.Kotak.collideDot(gbr1.rect, x2, y2);
		};

		static muatAnimAsync(url: string, fw: number, fh: number): IGbr {
			let canvas: HTMLCanvasElement = document.createElement('canvas');

			return Img.muatAnimAsyncCanvas(url, fw, fh, canvas);
		}

		static muatAnimAsyncCanvas(url: string, fw: number, fh: number, canvas: HTMLCanvasElement): IGbr {
			let img: HTMLImageElement = document.createElement('img'); //;
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: IKotak;

			rect = ha.be.Kotak.buat(0, 0, fw, fh);

			let gbr: IGbr = new Gbr();
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
			}

			img.onerror = () => {
				console.warn('gagal load image, url ' + url);
				//TODO: default image
			}

			let img2: HTMLImageElement = ha.be.cache.getGbr(url);
			if (img2) {
				imgOnLoad(img2);
			}
			else {
				img.src = url;
			}

			function imgOnLoad(img: HTMLImageElement) {
				// console.log('img anim load ' + url);
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

		static muatAsync(url: string, onload: () => void): IGbr {
			let kanvas: HTMLCanvasElement = document.createElement('canvas');

			return Img.muatAsyncKanvas(url, kanvas, onload);
		}

		static muatAsyncKanvas(url: string, canvas: HTMLCanvasElement, onload: () => void): IGbr {
			let img: HTMLImageElement = document.createElement('img');
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: IKotak;

			rect = ha.be.Kotak.buat(0, 0, img.naturalWidth, img.naturalHeight);

			let gbr: IGbr = {
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
				lebarDiSet: false,
				ctrIdx: 0
			}

			img.onload = () => {
				onload();
				imgOnLoad(img);
			}

			img.onerror = () => {
				console.warn('gagal load image, url ' + url);
				//TODO: default image
			}

			let img2: HTMLImageElement = ha.be.cache.getGbr(url);
			if (img2) {
				imgOnLoad(img2);
			}
			else {
				img.src = url;
			}

			function imgOnLoad(img: HTMLImageElement): void {
				canvas.width = img.naturalWidth;
				canvas.height = img.naturalHeight;
				ctx.drawImage(img, 0, 0);
				gbr.rect = ha.be.Kotak.buat(0, 0, img.naturalWidth, img.naturalHeight);

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

		static gambarUbin(gbr: IGbr, x: number = 0, y: number = 0, frame: number = 0) {
			let jmlH: number = 0;
			let jmlV: number = 0;

			if (gbr.load == false) return;

			let w2: number = Math.floor(gbr.panjang);
			let h2: number = Math.floor(gbr.lebar);

			while (x < 0) {
				x += w2;
			}

			while (x > 0) {
				x -= w2;
			}

			//posisi gambar dimulai dari sebelum titik 0,0
			while (y < 0) {
				y += h2;
			}

			while (y > 0) {
				y -= h2;
			}

			x -= w2;
			y -= h2;

			frame = Math.floor(frame);

			jmlH = Math.ceil((Be.canvasAktif.panjang + Math.abs(x)) / w2);
			jmlV = Math.ceil((Be.canvasAktif.lebar + Math.abs(y)) / h2);

			for (let i: number = 0; i < jmlH; i++) {
				for (let j: number = 0; j < jmlV; j++) {
					Img.gambar(gbr, x + (i * w2), y + (j * h2), frame);
				}
			}
		}

		// static putarGambar(gbr: IGambar, sudut: number = 0) {
		// 	gbr.rotasi = sudut;
		// }

		/**
		 * mengambil pixel di layar
		 * @param x posisi x
		 * @param y posisi y
		 * @returns (Uint8ClampedArray) 
		 */
		static AmbilPiksel(x: number = 0, y: number = 0): number[] {
			try {
				let data: Uint8ClampedArray = Be.canvasAktif.ctx.getImageData(x, y, 1, 1).data;

				let hasil: number[] = [];

				hasil.push(data[0]);
				hasil.push(data[1]);
				hasil.push(data[2]);
				hasil.push(data[3]);

				Be.merah = data[0];
				Be.hijau = data[1];
				Be.biru = data[2];
				Be.transparan = data[3];
				Be.Warna(Be.merah, Be.hijau, Be.biru, Be.transparan);

				return hasil;
			}
			catch (e) {
				// console.error(e);
			}

			return [0, 0, 0];
		}

		/**
		 * 
		 * @param x 
		 * @param y 
		 */
		static SetPiksel(x: number = 0, y: number = 0) {
			Be.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
		}

		// static handle(gbr: IGambar, x: number = 0, y: number = 0) {
		// 	gbr.handleX = x;
		// 	gbr.handleY = y;
		// }

		// static grabGambar(gbr: IGambar, x: number = 0, y: number = 0) {
		// 	gbr.ctx.drawImage(Be.canvasAktif.canvas, x, y, gbr.panjang, gbr.lebar, 0, 0, gbr.panjang, gbr.lebar);
		// }

		static gambar(gbr: IGbr, x: number = 0, y: number = 0, frame: number = 0) {
			let ctx: CanvasRenderingContext2D = Be.canvasAktif.ctx;
			let jmlH: number = 0;
			let jmlV: number = 0;
			let frameX: number = 0;
			let frameY: number = 0;

			// let rect: IRect = img.rect;

			if (gbr.load == false) return;

			gbr.ctrIdx = ha.be.Spr.ctrDraw++;
			frame = Math.floor(frame);

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

			let x2: number = Math.floor(x);
			let y2: number = Math.floor(y);

			let w2: number = Math.floor(gbr.panjang);
			let h2: number = Math.floor(gbr.lebar);

			x2 -= (gbr.handleX);
			y2 -= (gbr.handleY);

			if (gbr.rotasi != 0) {
				ctx.save();
				ctx.translate(x, y);
				ctx.rotate(gbr.rotasi * (Math.PI / 180));
				ctx.globalAlpha = gbr.alpha;
				ctx.drawImage(gbr.img, frameX, frameY, gbr.frameW, gbr.frameH, - gbr.handleX, -gbr.handleY, w2, h2);
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
		static ukuran(gbr: IGbr, w: number = 32, h: number = 32): void {
			gbr.panjang = w;
			gbr.lebar = h;
			gbr.panjangDiSet = true;
			gbr.lebarDiSet = true;
		}

		public static resetRect(img: IGbr): void {
			let rect: IKotak = img.rect;
			let p: IV2D;

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

		static rectToImageTransform(image: IGbr, x: number, y: number): void {
			let rect: IKotak = image.rect;
			let p: IV2D;
			let x2: number = image.panjang
			let y2: number = image.lebar;

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
			ha.be.Kotak.translate(rect, x, y);
			ha.be.Kotak.translate(rect, -image.handleX, -image.handleY);

			//rotate
			ha.be.Kotak.rotate(rect, image.rotasi, x, y, false);
		}

	}

}