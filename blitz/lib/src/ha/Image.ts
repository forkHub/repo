namespace ha_blitz {
	export class Image {
		// readonly daftar: IGambar[] = [];

		static buatGambar(w: number = 32, h: number = 32, frameW: number = 32, frameH: number = 32): IGambar {
			let canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
			let img: IGambar;

			canvas.width = w;
			canvas.height = h;

			let rect: IRect = ha.Rect.create(0, 0, frameW, frameH);

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
			}

			return img;
		}

		static panjangGambar(gbr: IGambar): number { return gbr.frameW * gbr.scaleX; };
		static lebarGambar(gbr: IGambar): number { return gbr.frameH * gbr.scaleY; };
		static handleXGambar(gbr: IGambar): number { return gbr.handleX; };
		static handleYGambar(gbr: IGambar): number { return gbr.handleY; };

		//TODO:
		static gambarOverlap(gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number) {
			GambarTabrakan(gbr1, x1, y1, gbr2, x2, y2);
		};

		static gambarTabrakan(gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number): boolean {
			ha_blitz.image.resetImageRect(gbr1);
			ha_blitz.image.rectToImageTransform(gbr1, x1, y1);

			ha_blitz.image.resetImageRect(gbr2);
			ha_blitz.image.rectToImageTransform(gbr2, x2, y2);

			return ha.Rect.collide(gbr1.rect, gbr2.rect);
		};

		static dotDidalamGambar(gbr1: IGambar, x1: number, y1: number, x2: number, y2: number): boolean {
			ha_blitz.image.resetImageRect(gbr1);
			ha_blitz.image.rectToImageTransform(gbr1, x1, y1);

			return ha.Rect.collideDot(gbr1.rect, x2, y2);
		};

		static async muatGambarAnimasi(url: string, fw: number = 32, fh: number = 32): Promise<IGambar> {
			let img: HTMLImageElement = await ha_blitz.image.loadImage(url);
			let canvas: HTMLCanvasElement = document.createElement('canvas');
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: IRect;

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
			}
		}

		static gambarUbin(gbr: IGambar, x: number = 0, y: number = 0, frame: number = 0) {
			let jmlH: number = 0;
			let jmlV: number = 0;

			let w2: number = Math.floor(gbr.frameW * gbr.scaleX);
			let h2: number = Math.floor(gbr.frameH * gbr.scaleY);

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

			for (let i: number = 0; i < jmlH; i++) {
				for (let j: number = 0; j < jmlV; j++) {
					TaruhGambar(gbr, x + (i * w2), y + (j * h2), frame);
				}
			}
		}

		static putarGambar(gbr: IGambar, sudut: number = 0) {
			gbr.rotation = sudut;
		}

		static skalaGambar(gbr: IGambar, skalaX: number = 1, skalaY: number = 1) {
			gbr.scaleX = skalaX;
			gbr.scaleY = skalaY;
		}

		static ambilPiksel(x: number = 0, y: number = 0): number[] {
			try {
				let data: Uint8ClampedArray = ha_blitz.Main.canvasAktif.ctx.getImageData(x, y, 1, 1).data;

				let hasil: number[] = [];
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
		static setWarna(r: number = 255, g: number = 255, b: number = 255, a: number = 1) {
			let ctx: CanvasRenderingContext2D = ha_blitz.Main.canvasAktif.ctx;
			ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
			ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		}

		static setPiksel(x: number = 0, y: number = 0) {
			ha_blitz.Main.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
		}

		static posisiHandleGambar(gbr: IGambar, x: number = 0, y: number = 0) {
			gbr.handleX = x;
			gbr.handleY = y;
		}

		static grabGambar(gbr: IGambar, x: number = 0, y: number = 0) {
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

		static async muat(url: string): Promise<IGambar> {
			let img: HTMLImageElement = await ha_blitz.image.loadImage(url);
			let canvas: HTMLCanvasElement = document.createElement('canvas');
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: IRect;

			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;
			ctx.drawImage(img, 0, 0);

			rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);

			let gbr: IGambar = {
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
			}

			// ha_blitz.image.daftar.push(gbr);

			return gbr;
		}

		static muatAsync(url: string): IGambar {
			let img: HTMLImageElement = document.createElement('img'); //ha_blitz.image.loadImageAsync(url, () => { }, () => { });
			let canvas: HTMLCanvasElement = document.createElement('canvas');
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: IRect;

			rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);

			let gbr: IGambar = {
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
			}

			img.onload = () => {
				ctx.drawImage(img, 0, 0);
				canvas.width = img.naturalWidth;
				canvas.height = img.naturalHeight;
				gbr.rect = ha.Rect.create(0, 0, img.naturalWidth, img.naturalHeight);
				// rect.
			}

			img.onerror = () => {
				console.log('gagal load image, url ' + url);
				//TODO: default image
			}

			img.src = url;

			// ha_blitz.image.daftar.push(gbr);

			return gbr;
		}

		static gambar(gbr: IGambar, x: number = 0, y: number = 0, frame: number = 0) {
			let ctx: CanvasRenderingContext2D = ha_blitz.Main.canvasAktif.ctx;
			let jmlH: number;
			let jmlV: number;
			let frameX: number;
			let frameY: number;
			// let rect: IRect = img.rect;

			jmlH = Math.floor(gbr.width / gbr.frameW);
			jmlV = Math.floor(gbr.height / gbr.frameH);

			frameX = (frame % jmlH);
			frameY = Math.floor(frame / jmlV);

			frameX *= gbr.frameW;
			frameY *= gbr.frameH;

			frameX = Math.floor(frameX);
			frameY = Math.floor(frameY);

			let x2: number = Math.floor(x);
			let y2: number = Math.floor(y);

			let w2: number = Math.floor(gbr.frameW * gbr.scaleX);
			let h2: number = Math.floor(gbr.frameH * gbr.scaleY);

			x2 -= (gbr.handleX);
			y2 -= (gbr.handleY);

			if (gbr.rotation != 0) {
				ctx.save();
				ctx.translate(x, y);
				ctx.rotate(gbr.rotation * (Math.PI / 180));
				ctx.drawImage(gbr.img, frameX, frameY, gbr.frameW, gbr.frameH, - gbr.handleX, -gbr.handleY, w2, h2);
				ctx.restore();
			}
			else {
				ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, x2, y2, w2, h2);
			}

		}

		handleTengah = (gbr: IGambar) => {
			gbr.handleX = Math.floor((gbr.frameW * gbr.scaleX) / 2);
			gbr.handleY = Math.floor((gbr.frameH * gbr.scaleY) / 2);
		}

		/**
		 * Ubah Ukuran Gambar
		 * @param gbr 
		 * @param w 
		 * @param h 
		 */
		ukuranGambar(gbr: IGambar, w: number, h: number): void {
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

		loadImage = async (url: string): Promise<HTMLImageElement> => {
			return new Promise((resolve, reject): void => {
				let image2: HTMLImageElement = document.createElement('img');

				image2.onload = () => {
					resolve(image2);
				}

				image2.src = url;

				image2.onerror = (e) => {
					reject(e);
				}

			});
		}

		resetImageRect(img: IGambar): void {
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

		rectToImageTransform(image: IGambar, x: number, y: number): void {
			let rect: IRect = image.rect;
			let p: IV2D;
			let x2: number = image.frameW * image.scaleX;
			let y2: number = image.frameH * image.scaleY;

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

	export var image: Image = new Image();
}