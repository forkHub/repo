
/**
 * INTERFACE 
*/



interface IKotak {
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
	type: EInput;
	timerStart: number;
	timerEnd: number;
	id: number;	//TODO: mungkin bisa dihapus
	dragJml: number;
	dragSelesaiJml: number;
	tapJml: number;
	upJml: number;
}

interface IGbr {
	//share-ble
	img: HTMLImageElement;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	frameW: number;
	frameH: number;
	rotasi: number;
	alpha: number;
	isAnim: boolean;
	rect: IKotak;
	load: boolean;
	ctrIdx: number;		//index counter buat drawing

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

interface IAudio {
	src: string;
	loaded: boolean;
	sound: HTMLAudioElement;
	playedCount: number;
}

interface ISpr {
	buff: IGbr,
	x: number,
	y: number,
	dragable: boolean
	dragged: boolean
	down: boolean

	//TODO:
	jmlHit?: number,
	jmlup?: number,
	jmlStartDrag?: number,
	jmlEndDrag?: number,

	dragStartX: number
	dragStartY: number
	url: string

	//
	tipeDrag: number; //1 drag, 2 rotasi, 3 skew (todo)
	sudutTekanAwal: number
	sudutAwal: number
	inputId: number
}