
///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>

/**
 * IMAGE
 */

//TODO: test
const CreateImage = (w: number = 32, h: number = 32, frameW: number = 32, frameH: number = 32): IBuffer => {
	let canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
	let img: IBuffer;
	canvas.width = w;
	canvas.height = h;

	let rect: IRect = ha.rect.create(0, 0, frameW, frameH);

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
		rect: rect
	}

	return img;
}

const CopyImage = (src: IBuffer): IBuffer => {
	return {
		canvas: src.canvas,
		ctx: src.ctx,
		frameH: src.frameH,
		frameW: src.frameW,
		handleX: src.handleX,
		handleY: src.handleY,
		height: src.height,
		img: src.img,
		isAnim: src.isAnim,
		rect: ha.rect.copy(src.rect),
		rotation: src.rotation,
		scaleX: src.scaleX,
		scaleY: src.scaleY,
		width: src.width
	}
}

/* TODO [next]:
 * skip drawing outside
 * image blitting
*/
const DrawImage = (img: IBuffer, x: number = 0, y: number = 0, frame: number = 0) => {
	let ctx: CanvasRenderingContext2D = ha_blitz.main.canvasAktif.ctx;
	let jmlH: number;
	let jmlV: number;
	let frameX: number;
	let frameY: number;
	// let rect: IRect = img.rect;

	jmlH = Math.floor(img.width / img.frameW);
	jmlV = Math.floor(img.height / img.frameH);

	frameX = (frame % jmlH);
	frameY = Math.floor(frame / jmlV);

	frameX *= img.frameW;
	frameY *= img.frameH;

	frameX = Math.floor(frameX);
	frameY = Math.floor(frameY);

	let x2: number = Math.floor(x);
	let y2: number = Math.floor(y);

	let w2: number = Math.floor(img.frameW * img.scaleX);
	let h2: number = Math.floor(img.frameH * img.scaleY);

	x2 -= (img.handleX);
	y2 -= (img.handleY);

	if (img.rotation != 0) {
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(img.rotation * (Math.PI / 180));
		ctx.drawImage(img.img, frameX, frameY, img.frameW, img.frameH, - img.handleX, -img.handleY, w2, h2);
		ctx.restore();
	}
	else {
		ctx.drawImage(img.canvas, frameX, frameY, img.frameW, img.frameH, x2, y2, w2, h2);
	}

}

//TODO: test
const GrabImage = (img: IBuffer, x: number = 0, y: number = 0) => {
	img.ctx.drawImage(ha_blitz.main.canvasAktif.canvas, x, y, img.width, img.height, 0, 0, img.width, img.height);
}

const HandleImage = (img: IBuffer, x: number = 0, y: number = 0) => {
	img.handleX = x;
	img.handleY = y;
}

const ImageWidth = (img: IBuffer): number => { return img.frameW * img.scaleX; };
const ImageHeight = (img: IBuffer): number => { return img.frameH * img.scaleY; };
const ImageXHandle = (img: IBuffer): number => { return img.handleX; };
const ImageYHandle = (img: IBuffer): number => { return img.handleY; };

//TODO:
const ImageOverlap = () => { };

const ImageCollide = (img1: IBuffer, x1: number, y1: number, img2: IBuffer, x2: number, y2: number): boolean => {
	ha_blitz.image.resetImageRect(img1);
	ha_blitz.image.rectToImageTransform(img1, x1, y1);

	ha_blitz.image.resetImageRect(img2);
	ha_blitz.image.rectToImageTransform(img2, x2, y2);

	return ha.rect.collide(img1.rect, img2.rect);
};

const ImageDotCollide = (img1: IBuffer, x1: number, y1: number, x2: number, y2: number): boolean => {
	ha_blitz.image.resetImageRect(img1);
	ha_blitz.image.rectToImageTransform(img1, x1, y1);

	return ha.rect.collideDot(img1.rect, x2, y2);
};

//
const ImageBoundOverlap = (): boolean => {
	return false; //TODO:
}

const MidHandle = (img: IBuffer) => {
	img.handleX = Math.floor((img.frameW * img.scaleX) / 2);
	img.handleY = Math.floor((img.frameH * img.scaleY) / 2);
}

const LoadImage = async (url: string): Promise<IBuffer> => {
	let img: HTMLImageElement = await ha_blitz.image.loadImage(url);
	let canvas: HTMLCanvasElement = document.createElement('canvas');
	let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
	let rect: IRect;

	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;
	ctx.drawImage(img, 0, 0);

	rect = ha.rect.create(0, 0, img.naturalWidth, img.naturalHeight);

	return {
		img: img,
		width: img.naturalWidth,
		height: img.naturalHeight,
		frameH: img.naturalHeight,
		frameW: img.naturalWidth,
		// width2: img.naturalWidth,
		// height2: img.naturalHeight,
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
}

const LoadAnimImage = async (url: string, fw: number = 32, fh: number = 32): Promise<IBuffer> => {
	let img: HTMLImageElement = await ha_blitz.image.loadImage(url);
	let canvas: HTMLCanvasElement = document.createElement('canvas');
	let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
	let rect: IRect;

	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;
	ctx.drawImage(img, 0, 0);

	rect = ha.rect.create(0, 0, fw, fh);

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
		rect: rect
	}
}

const TileImage = (img: IBuffer, x: number = 0, y: number = 0, frame: number = 0) => {
	let jmlH: number = 0;
	let jmlV: number = 0;

	let w2: number = Math.floor(img.frameW * img.scaleX);
	let h2: number = Math.floor(img.frameH * img.scaleY);

	while (x < 0) {
		x += w2;
	}

	while (y < 0) {
		y += h2;
	}

	x -= w2;
	y -= h2;

	frame = Math.floor(frame);

	jmlH = Math.ceil((ha_blitz.main.canvasAktif.width + Math.abs(x)) / w2);
	jmlV = Math.ceil((ha_blitz.main.canvasAktif.height + Math.abs(y)) / h2);

	for (let i: number = 0; i < jmlH; i++) {
		for (let j: number = 0; j < jmlV; j++) {
			DrawImage(img, x + (i * w2), y + (j * h2), frame);
		}
	}
}

const ResizeImage = (img: IBuffer, w: number = 1, h: number = 1) => {
	img.scaleX = Math.floor(w) / img.frameW;
	img.scaleY = Math.floor(h) / img.frameH;
	console.log(img);
}

const RotateImage = (img: IBuffer, degree: number = 0) => {
	img.rotation = degree;
}

const ScaleImage = (img: IBuffer, xScale: number = 1, yScale: number = 1) => {
	img.scaleX = xScale;
	img.scaleY = yScale;
}

const GetPixel = (x: number = 0, y: number = 0): number[] => {
	try {
		let data: Uint8ClampedArray = ha_blitz.main.canvasAktif.ctx.getImageData(x, y, 1, 1).data;

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
const SetColor = (r: number = 255, g: number = 255, b: number = 255, a: number = 1) => {
	Color(r, g, b, a);
}

const SetPixel = (x: number = 0, y: number = 0) => {
	ha_blitz.main.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

//TODO: next
const ImagePivot = () => { }

const BackgroundImage = () => { }
const MainLayer = () => { }

const CreateLayer = () => { }
const LayerZ = () => { }


//ignored
//const TFormImage = () => { }
//const FeeImage = () => { }
//const DrawImageRect = () => { }
//const ImageBuffer = () => { }