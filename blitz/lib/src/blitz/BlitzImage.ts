
///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>

/**
 * IMAGE
 */

//TODO: test
const BuatGambar = (w: number = 32, h: number = 32, frameW: number = 32, frameH: number = 32): IGambar => {
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
		rect: rect
	}

	return img;
}

const CopyGambar = (src: IGambar): IGambar => {
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
		rect: ha.Rect.copy(src.rect),
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
const TaruhGambar = (gbr: IGambar, x: number = 0, y: number = 0, frame: number = 0) => {
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

//TODO: test - dihapus
const GrabGambar = (gbr: IGambar, x: number = 0, y: number = 0) => {
	gbr.ctx.drawImage(ha_blitz.main.canvasAktif.canvas, x, y, gbr.width, gbr.height, 0, 0, gbr.width, gbr.height);
}

const PosisiHandleGambar = (gbr: IGambar, x: number = 0, y: number = 0) => {
	gbr.handleX = x;
	gbr.handleY = y;
}

//dibuat set dan get
const PanjangGambar = (gbr: IGambar): number => { return gbr.frameW * gbr.scaleX; };
const LebarGambar = (gbr: IGambar): number => { return gbr.frameH * gbr.scaleY; };
const HandleXGambar = (gbr: IGambar): number => { return gbr.handleX; };
const HandleYGambar = (gbr: IGambar): number => { return gbr.handleY; };

//TODO:
const GambarOverlap = (gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number) => {
	GambarTabrakan(gbr1, x1, y1, gbr2, x2, y2);
};

const GambarTabrakan = (gbr1: IGambar, x1: number, y1: number, gbr2: IGambar, x2: number, y2: number): boolean => {
	ha_blitz.image.resetImageRect(gbr1);
	ha_blitz.image.rectToImageTransform(gbr1, x1, y1);

	ha_blitz.image.resetImageRect(gbr2);
	ha_blitz.image.rectToImageTransform(gbr2, x2, y2);

	return ha.Rect.collide(gbr1.rect, gbr2.rect);
};

const DotDidalamGambar = (gbr1: IGambar, x1: number, y1: number, x2: number, y2: number): boolean => {
	ha_blitz.image.resetImageRect(gbr1);
	ha_blitz.image.rectToImageTransform(gbr1, x1, y1);

	return ha.Rect.collideDot(gbr1.rect, x2, y2);
};

const HandleTengah = (gbr: IGambar) => {
	gbr.handleX = Math.floor((gbr.frameW * gbr.scaleX) / 2);
	gbr.handleY = Math.floor((gbr.frameH * gbr.scaleY) / 2);
}

const MuatGambar = async (url: string): Promise<IGambar> => {
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

const MuatGambarAnimasi = async (url: string, fw: number = 32, fh: number = 32): Promise<IGambar> => {
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
		rect: rect
	}
}

const GambarUbin = (gbr: IGambar, x: number = 0, y: number = 0, frame: number = 0) => {
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

	jmlH = Math.ceil((ha_blitz.main.canvasAktif.width + Math.abs(x)) / w2);
	jmlV = Math.ceil((ha_blitz.main.canvasAktif.height + Math.abs(y)) / h2);

	for (let i: number = 0; i < jmlH; i++) {
		for (let j: number = 0; j < jmlV; j++) {
			TaruhGambar(gbr, x + (i * w2), y + (j * h2), frame);
		}
	}
}

const ResizeGambar = (gbr: IGambar, w: number = 1, h: number = 1) => {
	gbr.scaleX = Math.floor(w) / gbr.frameW;
	gbr.scaleY = Math.floor(h) / gbr.frameH;
	console.log(gbr);
}

const PutarGambar = (gbr: IGambar, sudut: number = 0) => {
	gbr.rotation = sudut;
}

const SkalaGambar = (gbr: IGambar, skalaX: number = 1, skalaY: number = 1) => {
	gbr.scaleX = skalaX;
	gbr.scaleY = skalaY;
}

const AmbilPiksel = (x: number = 0, y: number = 0): number[] => {
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
const SetWarna = (r: number = 255, g: number = 255, b: number = 255, a: number = 1) => {
	let ctx: CanvasRenderingContext2D = ha_blitz.main.canvasAktif.ctx;
	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
	ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

const SetPikel = (x: number = 0, y: number = 0) => {
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