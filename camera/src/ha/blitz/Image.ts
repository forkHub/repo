namespace ha.blitz {
	class Image {
		loadImage = async (url: string): Promise<HTMLImageElement> => {
			return new Promise((resolve, reject): void => {
				let image2: HTMLImageElement = document.createElement('img');

				image2.onload = () => {
					resolve(image2);
				}

				image2.src = url;

				image2.onerror = (e) => {
					console.error('error loading image: ' + url);
					reject(e);
				}

			});
		}

		resetImageRect(img: IBuffer): void {
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

		rectToImageTransform(image: IBuffer, x: number, y: number): void {
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
			ha.rect.translate(rect, x, y);
			ha.rect.translate(rect, -image.handleX, -image.handleY);

			//rotate
			ha.rect.rotate(rect, image.rotation, x, y);
		}

	}

	export var image: Image = new Image();
}