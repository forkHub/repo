namespace ha.geom {
	/**
	 * INTERFACE 
	*/

	export interface IPoint2D {
		x: number,
		y: number
	}

	export interface IBound {
		v1: IPoint2D;
		v2: IPoint2D;
	}

	export interface IRect {
		vs?: IV2D[],
		segs?: IGaris[]
	}

	export interface IGaris {
		v1: IV2D,
		v2: IV2D,
		b: BoundObj
	}

	export interface IGambar {
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
	export interface IV2D {
		x: number,
		y: number
	}

	//geom, redundant
	// interface IPoint2D {
	// 	x: number,
	// 	y: number
	// }

	export interface ISprite {
		buffer: IGambar,
		x: number,
		y: number,
		dragable: boolean
		dragged: boolean
		down: boolean
		hit: number
		dragStartX: number
		dragStartY: number
		url: string

		//
		tipeDrag: number; //1 drag, 2 rotasi, 3 skew (todo)
		sudutTekanAwal: number
		sudutAwal: number
		inputId: number
	}
}