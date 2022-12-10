
/**
 * INTERFACE 
*/

interface IRect {
	vs?: IV2D[],
	segs?: ISegment[]
}

interface ISegment {
	v1: IV2D,
	v2: IV2D
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

interface IGambar {
	//share-ble
	img: HTMLImageElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	frameW: number;
	frameH: number;
	rotasi: number;
	alpha: number;
	isAnim: boolean;
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

//geom, redundant
interface IPoint2D {
	x: number,
	y: number
}