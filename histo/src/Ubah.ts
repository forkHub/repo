let pj: number = 0;
let lb: number = 0;

let r: number[] = new Array(255);
let g: number[] = new Array(255);
let b: number[] = new Array(255);

let canvasR: HTMLCanvasElement;
let ctxR: CanvasRenderingContext2D;
let ctr: number = 0;

window.onload = () => {
	let canvas: HTMLCanvasElement = document.createElement('canvas');
	let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
	let img: HTMLImageElement = document.getElementById('gbr') as HTMLImageElement;

	canvas.style.width = img.naturalWidth + 'px';
	canvas.style.height = img.naturalHeight + 'px';
	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;

	pj = img.naturalWidth;
	lb = img.naturalHeight;

	document.body.appendChild(canvas);
	ctx.drawImage(img, 0, 0);

	for (let i: number = 0; i < 255; i++) {
		r[i] = 0;
		g[i] = 0;
		b[i] = 0;
	}

	initCanvasHisto();

	histo(ctx)
		.catch((e) => {
			console.error(e);
		});
}

function initCanvasHisto(): void {
	canvasR = document.createElement('canvas');
	ctxR = canvasR.getContext('2d');
	document.body.appendChild(canvasR);

	canvasR.setAttribute('width', '255');
	canvasR.setAttribute('height', '255');
}

async function gambarHisto(ctx: CanvasRenderingContext2D): Promise<void> {

	//cari warna maksimal
	let max: number = 0;
	for (let i: number = 0; i < r.length; i++) {
		if (r[i] > max) max = r[i];
		if (g[i] > max) max = g[i];
		if (b[i] > max) max = b[i];
	}

	ctx.clearRect(0, 0, 255, 255);

	ctx.beginPath();
	ctx.strokeStyle = '#ff0000';
	ctx.moveTo(0, 0);
	for (let i: number = 0; i < r.length; i++) {
		ctx.lineTo(i, 255 - (r[i] / max) * 255);
	}
	ctx.stroke();

	//gambar green
	ctx.beginPath();
	ctx.strokeStyle = '#00ff00';
	ctx.moveTo(0, 0);
	for (let i: number = 0; i < g.length; i++) {
		ctx.lineTo(i, 255 - (g[i] / max) * 255);
	}
	ctx.stroke();

	//gambar blue
	ctx.beginPath();
	ctx.strokeStyle = '#00ff';
	ctx.moveTo(0, 0);
	for (let i: number = 0; i < b.length; i++) {
		ctx.lineTo(i, 255 - (b[i] / max) * 255);
	}
	ctx.stroke();

}


async function histo(ctx: CanvasRenderingContext2D): Promise<void> {
	for (let i: number = 0; i < pj; i++) {
		for (let j: number = 0; j < lb; j++) {
			await proses(ctx, i, j);
		}
	}
}

async function proses(ctx: CanvasRenderingContext2D, i: number, j: number): Promise<void> {
	let warna: ImageData;	//rgba

	warna = ctx.getImageData(i, j, 1, 1);
	r[warna.data[0]]++;
	g[warna.data[1]]++;
	b[warna.data[2]]++;

	ctr++;
	if (ctr > 100) {
		await gambarHisto(ctxR);
		await ha.comp.Util.delay(0);
		ctr = 0;
	}
}