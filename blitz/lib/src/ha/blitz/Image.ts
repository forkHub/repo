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

		handleTengah = (gbr: IGambar) => {
			gbr.handleX = Math.floor((gbr.frameW * gbr.scaleX) / 2);
			gbr.handleY = Math.floor((gbr.frameH * gbr.scaleY) / 2);
		}

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