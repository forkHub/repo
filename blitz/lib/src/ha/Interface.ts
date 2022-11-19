
/**
 * INTERFACE 
*/

//TODO: dihapus
interface IConfig {
	input: IInput;
}

interface ILine {
	y: number,
	m: number,
	b: number
}

interface IRect {
	vs?: IV2D[],
	segs?: ISegment[]
}

interface ISegment {
	v1: IV2D,
	v2: IV2D
}

interface ITimer {
	endTime: number;
	startTime: number;
	time: number;
	aktif: boolean;
}

interface IInput {
	xStart: number;
	yStart: number;
	xDrag: number;
	yDrag: number;
	x: number;
	y: number;
	isDrag: boolean;
	isDown: boolean;
	isTap: boolean;
	hit: number;
	key: string;
	type: string;
	timerStart: number;
	timerEnd: number;
	id: number;	//TODO: mungkin bisa dihapus
}

interface IInputData {
	type?: string;	//keyboard, touch, mouse
	key?: string;	//kode keyb, tombol mouse 
}

// interface ICanvas {
// 	canvas: HTMLCanvasElement;
// 	ctx: CanvasRenderingContext2D;
// 	width: number,
// 	height: number,
// 	scaleX: number,
// 	scaleY: number
// }

interface IGambar {
	img: HTMLImageElement;
	frameW: number;
	frameH: number;
	rotation: number;
	isAnim: boolean;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	rect: IRect;
	load: boolean;

	panjang: number;
	lebar: number;
	panjangDiSet: boolean;
	lebarDiSet: boolean;

	handleX: number;	//dipakai cuman pas saat gambar, dan perhitungan geometri, posisi tetap pakai x
	handleY: number;	//dipakai cuman pas saat gambar

	ratioX?: number,	//buat canvas buffer saat window resize
	ratioY?: number
}

//geom
interface IV2D {
	x: number,
	y: number
}

interface ITransform {
	pos: IV2D,
	scale: IV2D,
	rotation: number
}