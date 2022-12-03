namespace ha {
	//TODO: harus ada setter and getter buat object gambar
	export class Image {
		// readonly daftar: IGambar[] = [];

		static buatBagiCanvas(canvas: HTMLCanvasElement, w: number = 32, h: number = 32, frameW: number = 32, frameH: number = 32): IGambar {
			let img: IGambar;

			canvas.width = w;
			canvas.height = h;

			let rect: IRect = ha.Rect.create(0, 0, frameW, frameH);

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
				// scaleX: 1,
				// scaleY: 1,
				canvas: canvas,
				ctx: canvas.getContext('2d'),
				rect: rect,
				load: true,
				panjangDiSet: true,
				lebarDiSet: true
			}

			return img;
		}

		static buat(w: number = 32, h: number = 32, frameW: number = 32, frameH: number = 32): IGambar {
			let canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;

			return ha.Image.buatBagiCanvas(canvas, w, h, frameW, frameH);
			// let img: IGambar;

			// canvas.width = w;
			// canvas.height = h;

			// let rect: IRect = ha.Rect.create(0, 0, frameW, frameH);

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

		static panjang(gbr: IGambar): number { return gbr.panjang; };
		static lebar(gbr: IGambar): number { return gbr.lebar; };
		static handleX(gbr: IGambar): number { return gbr.handleX; };
		static handleY(gbr: IGambar): number { return gbr.handleY; };

		static tabrakan(gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number): boolean {
			ha.Image.resetRect(gbr1);
			ha.Image.rectToImageTransform(gbr1, x1, y1);

			ha.Image.resetRect(gbr2);
			ha.Image.rectToImageTransform(gbr2, x2, y2);

			return ha.Rect.collide(gbr1.rect, gbr2.rect);
		};

		static dotDidalamGambar(gbr1: IGambar, x1: number, y1: number, x2: number, y2: number): boolean {
			ha.Image.resetRect(gbr1);
			ha.Image.rectToImageTransform(gbr1, x1, y1);

			return ha.Rect.collideDot(gbr1.rect, x2, y2);
		};

		static muatAnimAsync(url: string, fw: number = 32, fh: number = 32): IGambar {
			// let img: HTMLImageElement = document.createElement('img'); //;
			let canvas: HTMLCanvasElement = document.createElement('canvas');
			// let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			// let rect: IRect;

			return ha.Image.muatAnimAsyncCanvas(url, fw, fh, canvas);

			// canvas.width = img.naturalWidth;
			// canvas.height = img.naturalHeight;
			// ctx.drawImage(img, 0, 0);

			// rect = ha.Rect.create(0, 0, fw, fh);

			// let gbr: IGambar = {
			// 	img: img,
			// 	panjang: img.naturalWidth,
			// 	lebar: img.naturalHeight,
			// 	frameH: fw,
			// 	frameW: fh,
			// 	// width2: w,
			// 	// height2: h,
			// 	isAnim: true,
			// 	handleX: 0,
			// 	handleY: 0,
			// 	rotasi: 0,
			// 	alpha: 1,
			// 	// scaleX: 1,
			// 	// scaleY: 1,
			// 	ctx: ctx,
			// 	canvas: canvas,
			// 	rect: rect,
			// 	load: false,
			// 	panjangDiSet: false,
			// 	lebarDiSet: false
			// }

			// img.onload = () => {
			// 	canvas.width = img.naturalWidth;
			// 	canvas.height = img.naturalHeight;
			// 	ctx.drawImage(img, 0, 0);
			// 	// gbr.rect = ha.Rect.create(0, 0, fw, fh);
			// 	gbr.load = true;

			// 	if (!gbr.panjangDiSet) {
			// 		gbr.panjang = img.naturalWidth;
			// 		gbr.panjangDiSet = true;
			// 	}

			// 	if (!gbr.lebarDiSet) {
			// 		gbr.lebarDiSet = true;
			// 		gbr.lebar = img.naturalHeight;
			// 	}
			// }

			// img.onerror = () => {
			// 	console.log('gagal load image, url ' + url);
			// 	//TODO: default image
			// }

			// img.src = url;

			// return gbr;
		}

		static muatAnimAsyncCanvas(url: string, fw: number = 32, fh: number = 32, canvas: HTMLCanvasElement): IGambar {
			let img: HTMLImageElement = document.createElement('img'); //;
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: IRect;

			rect = ha.Rect.create(0, 0, fw, fh);

			let gbr: IGambar = {
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
			}

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
			}

			img.onerror = () => {
				console.log('gagal load image, url ' + url);
				//TODO: default image
			}

			img.src = url;

			return gbr;
		}

		static muatAsync(url: string): IGambar {
			// let img: HTMLImageElement = document.createElement('img'); //ha_blitz.image.loadImageAsync(url, () => { }, () => { });
			let canvas: HTMLCanvasElement = document.createElement('canvas');
			// let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			// let rect: IRect;

			return ha.Image.muatAsyncKanvas(url, canvas);

			// rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);

			// let gbr: IGambar = {
			// 	img: img,
			// 	panjang: img.naturalWidth,
			// 	lebar: img.naturalHeight,
			// 	frameH: img.naturalHeight,
			// 	frameW: img.naturalWidth,
			// 	isAnim: false,
			// 	handleX: 0,
			// 	handleY: 0,
			// 	rotasi: 0,
			// 	alpha: 1,
			// 	// scaleX: 1,
			// 	// scaleY: 1,
			// 	ctx: ctx,
			// 	canvas: canvas,
			// 	rect: rect,
			// 	load: false,
			// 	panjangDiSet: false,
			// 	lebarDiSet: false
			// }

			// img.onload = () => {
			// 	imgOnLoad(img);

			// 	// canvas.width = img.naturalWidth;
			// 	// canvas.height = img.naturalHeight;
			// 	// ctx.drawImage(img, 0, 0);
			// 	// gbr.rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);

			// 	// gbr.load = true;

			// 	// if (!gbr.panjangDiSet) {
			// 	// 	gbr.panjangDiSet = true;
			// 	// 	gbr.panjang = img.naturalWidth;
			// 	// }

			// 	// if (!gbr.lebarDiSet) {
			// 	// 	gbr.lebar = img.naturalHeight;
			// 	// 	gbr.lebarDiSet = true;
			// 	// }

			// 	// gbr.frameH = img.naturalHeight;
			// 	// gbr.frameW = img.naturalWidth;

			// 	// // console.log(gbr);
			// 	// console.log('gambar di load');
			// 	// ha.cache.setFile(url, img);
			// }

			// img.onerror = () => {
			// 	console.log('gagal load image, url ' + url);
			// 	//TODO: default image
			// }

			// let img2: HTMLImageElement = ha.cache.getGbr(url);
			// if (img2) {
			// 	imgOnLoad(img2);
			// }
			// else {
			// 	img.src = url;
			// }

			// function imgOnLoad(img: HTMLImageElement): void {
			// 	canvas.width = img.naturalWidth;
			// 	canvas.height = img.naturalHeight;
			// 	ctx.drawImage(img, 0, 0);
			// 	gbr.rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);

			// 	gbr.load = true;
			// 	gbr.img = img;

			// 	if (!gbr.panjangDiSet) {
			// 		gbr.panjangDiSet = true;
			// 		gbr.panjang = img.naturalWidth;
			// 	}

			// 	if (!gbr.lebarDiSet) {
			// 		gbr.lebar = img.naturalHeight;
			// 		gbr.lebarDiSet = true;
			// 	}

			// 	gbr.frameH = img.naturalHeight;
			// 	gbr.frameW = img.naturalWidth;

			// 	// console.log(gbr);
			// 	// console.log('gambar di load');
			// 	ha.cache.setFile(url, img);
			// }

			// return gbr;
		}

		static muatAsyncKanvas(url: string, canvas: HTMLCanvasElement): IGambar {
			let img: HTMLImageElement = document.createElement('img'); //ha_blitz.image.loadImageAsync(url, () => { }, () => { });
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: IRect;

			rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);

			let gbr: IGambar = {
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
			}

			img.onload = () => {
				imgOnLoad(img);

				// canvas.width = img.naturalWidth;
				// canvas.height = img.naturalHeight;
				// ctx.drawImage(img, 0, 0);
				// gbr.rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);

				// gbr.load = true;

				// if (!gbr.panjangDiSet) {
				// 	gbr.panjangDiSet = true;
				// 	gbr.panjang = img.naturalWidth;
				// }

				// if (!gbr.lebarDiSet) {
				// 	gbr.lebar = img.naturalHeight;
				// 	gbr.lebarDiSet = true;
				// }

				// gbr.frameH = img.naturalHeight;
				// gbr.frameW = img.naturalWidth;

				// // console.log(gbr);
				// console.log('gambar di load');
				// ha.cache.setFile(url, img);
			}

			img.onerror = () => {
				console.log('gagal load image, url ' + url);
				//TODO: default image
			}

			let img2: HTMLImageElement = ha.cache.getGbr(url);
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

				// console.log(gbr);
				// console.log('gambar di load');
				ha.cache.setFile(url, img);
			}

			return gbr;
		}

		static gambarUbin(gbr: IGambar, x: number = 0, y: number = 0, frame: number = 0) {
			let jmlH: number = 0;
			let jmlV: number = 0;

			if (gbr.load == false) return;

			let w2: number = Math.floor(gbr.panjang);
			let h2: number = Math.floor(gbr.lebar);

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

			// debugger;
			for (let i: number = 0; i < jmlH; i++) {
				for (let j: number = 0; j < jmlV; j++) {
					ha.Image.gambar(gbr, x + (i * w2), y + (j * h2), frame);
				}
			}
		}

		static putarGambar(gbr: IGambar, sudut: number = 0) {
			gbr.rotasi = sudut;
		}

		static ambilPiksel(x: number = 0, y: number = 0): number[] {
			try {
				let data: Uint8ClampedArray = ha.Main.canvasAktif.ctx.getImageData(x, y, 1, 1).data;

				let hasil: number[] = [];

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
				// console.error(e);
			}

			return [0, 0, 0];
		}

		//TODO: dep
		// static setWarna(r: number = 255, g: number = 255, b: number = 255, a: number = 1) {
		// 	let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;
		// 	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		// 	ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		// }

		static setPiksel(x: number = 0, y: number = 0) {
			ha.Main.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
		}

		static handle(gbr: IGambar, x: number = 0, y: number = 0) {
			gbr.handleX = x;
			gbr.handleY = y;
		}

		static grabGambar(gbr: IGambar, x: number = 0, y: number = 0) {
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

		// static async tungguLoad(): Promise<void> {
		// 	return new Promise((resolve, reject) => {
		// 		resolve;
		// 		reject
		// 	});
		// }

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

		static gambar(gbr: IGambar, x: number = 0, y: number = 0, frame: number = 0) {
			let ctx: CanvasRenderingContext2D = ha.Main.canvasAktif.ctx;
			let jmlH: number = 0;
			let jmlV: number = 0;
			let frameX: number = 0;
			let frameY: number = 0;
			// let rect: IRect = img.rect;

			if (gbr.load == false) return;

			jmlH = Math.floor(gbr.img.naturalWidth / gbr.frameW);
			jmlV = Math.floor(gbr.img.naturalHeight / gbr.frameH);

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
		static ukuran(gbr: IGambar, w: number = 32, h: number = 32): void {
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

		private static resetRect(img: IGambar): void {
			let rect: IRect = img.rect;
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

		private static rectToImageTransform(image: IGambar, x: number, y: number): void {
			let rect: IRect = image.rect;
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
			ha.Rect.translate(rect, x, y);
			ha.Rect.translate(rect, -image.handleX, -image.handleY);

			//rotate
			ha.Rect.rotate(rect, image.rotasi, x, y, false);
		}

	}

	// export var image: Image = new Image();
}