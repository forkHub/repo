///<reference path="../ha/blitz/Main.ts"/>
///<reference path="../ha/blitz/Image.ts"/>

/*
 * 	GRAPHICS
 */

//TODO: dipindahin ke tempat yang bener

const Bersih = (r: number = 0, g: number = 0, b: number = 0, alpha: number = 1): void => {
	let ctx: CanvasRenderingContext2D = ha_blitz.main.canvasAktif.ctx;
	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
	ctx.fillRect(0, 0, ha_blitz.main.canvasAktif.width, ha_blitz.main.canvasAktif.height);
}

const BackBuffer = () => { }

const Color = (r: number = 0, g: number = 0, b: number = 0, a: number = 1) => {
	let ctx: CanvasRenderingContext2D = ha_blitz.main.canvasAktif.ctx;
	ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
	ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
}

const WarnaMerah = () => { }
const ColorBlue = () => { }
const ColorGreen = () => { }

const ClsColor = () => { }

const CopyPixel = () => { }

const CopyRect = () => { }

const FrontBuffer = () => { }

const GetColor = () => { }

const Grafis = (width: number = 320, height: number = 240, gl: boolean = true, pixel: boolean = true): void => {
	let canvas: IGambar = ha_blitz.main.canvasAktif;

	canvas.canvas.width = width;
	canvas.canvas.height = height;
	canvas.width = width;
	canvas.height = height;

	if (gl) {
		ha_blitz.main.canvasAktif.canvas.classList.add('gl');
	}
	else {
		ha_blitz.main.canvasAktif.canvas.classList.remove('gl');
	}

	if (pixel) {
		ha_blitz.main.canvasAktif.canvas.classList.add('pixel');
	}

	// ha_blitz.main.windowResize();
}

const GraphicsBuffer = () => { }

const Garis = (x1: number, y1: number, x2: number, y2: number) => {
	let ctx: CanvasRenderingContext2D = ha_blitz.main.canvasAktif.ctx;
	x1 = Math.floor(x1);
	y1 = Math.floor(y1);
	x2 = Math.floor(x2);
	y2 = Math.floor(y2);
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

//TODO
const Origin = () => { }

const Oval = () => { }

const Kotak = (x1: number, y1: number, x2: number, y2: number) => {
	let ctx: CanvasRenderingContext2D = ha_blitz.main.canvasAktif.ctx;
	ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
}

const SetBuffer = (buffer: IGambar) => {
	ha_blitz.main.canvasAktif = buffer
}


//TODO: dep
const WritePixel = () => { }
const ReadPixel = () => { }
const Plot = () => { }