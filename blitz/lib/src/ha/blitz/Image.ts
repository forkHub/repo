namespace ha_blitz {
	class Image {
		readonly daftar: IGambar[] = [];

		buat(img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, rect: IRect): IGambar {
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
				rect: rect
			}

			return gbr;
		}

		async muat(url: string): Promise<IGambar> {
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
				rect: rect
			}

			ha_blitz.image.daftar.push(gbr);

			return gbr;
		}

		async muatAsync(url: string): Promise<IGambar> {
			let img: HTMLImageElement;// = await ha_blitz.image.loadImage(url);

			let canvas: HTMLCanvasElement = document.createElement('canvas');
			let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
			let rect: IRect;

			url;//TODO:

			return Promise.resolve().then(() => {
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
					rect: rect
				}

				ha_blitz.image.daftar.push(gbr);

				return gbr;
			});

		}

		gambar = (gbr: IGambar, x: number = 0, y: number = 0, frame: number = 0) => {
			let ctx: CanvasRenderingContext2D = ha_blitz.main.canvasAktif.ctx;
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