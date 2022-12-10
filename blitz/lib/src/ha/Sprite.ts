///<reference path="./Image.ts"/>

/** SPRITE.TS */
namespace ha {
	export class Sprite implements ISprite {
		static readonly daftar: ISprite[] = [];

		private _buff: IGambar;
		private _x: number = 0;
		private _y: number = 0;
		private _dragged: boolean = false;
		private _down: boolean = false;
		private _hit: number = 0;
		private _dragStartY: number = 0;
		private _dragStartX: number = 0;
		private _dragable: boolean = false;
		private _url: string;
		private _tipeDrag: number;
		private _sudutTekanAwal: number;
		private _sudutAwal: number;

		constructor(buffer: IGambar, dragable: boolean = false) {
			this.buffer = buffer;
			this.dragable = dragable;
		}

		//library
		static copy(sprS: ISprite): ISprite {
			if (sprS.buffer.isAnim) {
				return ha.Sprite.muatAnimasiAsyncKanvas(sprS.url, sprS.buffer.frameW, sprS.buffer.frameH, sprS.dragable, sprS.buffer.canvas, sprS.tipeDrag);
			}
			else {
				return ha.Sprite.muatAsyncBerbagiKanvas(sprS.url, sprS.dragable, sprS.buffer.canvas, sprS.tipeDrag)
			}
		}

		static panjang(spr: ISprite, pj?: number): number {
			return ha.Image.panjang(spr.buffer, pj);
		}

		static lebar(spr: ISprite, lb?: number): number {
			return ha.Image.lebar(spr.buffer, lb);
		}

		static alpha(spr: ISprite, alpha?: number): number {
			if (typeof (alpha) == 'number') {
				spr.buffer.alpha = alpha / 100;
			}

			return spr.buffer.alpha;
		}

		static rotasi(spr: ISprite, sudut?: number): number {
			if (spr && (typeof (sudut) == 'number')) {
				spr.buffer.rotasi = sudut;
			}

			return spr.buffer.rotasi;
		}

		static posisi(spr: ISprite, x: number = 0, y: number = 0) {
			spr.x = x;
			spr.y = y;
		}

		static posisiX(spr: ISprite, x: number | null | undefined = null): number {
			if (typeof (x) == 'number') {
				spr.x = x;
			}

			return spr.x;
		}

		static posisiY(spr: ISprite, y: number | null | undefined = null): number {
			if (typeof (y) == 'number') {
				spr.y = y;
			}

			return spr.y;
		}

		static handle(spr: ISprite, x: number = 0, y: number = 0): void {
			if (spr) {
				spr.buffer.handleX = x;
				spr.buffer.handleY = y;
			}

			return
		}

		static gambarSemua() {
			for (let i: number = 0; i < ha.Sprite.daftar.length; i++) {
				let item: ISprite = ha.Sprite.daftar[i];
				ha.Sprite.gambar(item);
			}
		}

		static tabrakan(spr: ISprite, spr2: ISprite): boolean {
			return ha.Image.tabrakan(spr.buffer, ha.Sprite.posisiX(spr), ha.Sprite.posisiY(spr), spr2.buffer, ha.Sprite.posisiX(spr2), ha.Sprite.posisiY(spr2))
		}

		private static muatAnimasiAsyncKanvas(
			url: string,
			pf: number,
			lf: number,
			bisaDiDrag: boolean = false,
			canvas: HTMLCanvasElement,
			tipeDrag: number): ISprite {

			let img: IGambar = ha.Image.muatAnimAsyncCanvas(url, pf, lf, canvas);
			return ha.Sprite.buatPrivate(img, bisaDiDrag, url, tipeDrag);
		}

		static muatAnimasiAsync(url: string, pf: number, lf: number, bisaDiDrag: boolean = false, tipeDrag: number = 0): ISprite {
			let img: IGambar = ha.Image.muatAnimAsync(url, pf, lf);
			return ha.Sprite.buatPrivate(img, bisaDiDrag, url, tipeDrag);
		}

		private static muatAsyncBerbagiKanvas(
			url: string,
			dragable = false,
			canvas: HTMLCanvasElement,
			tipeDrag: number): ISprite {

			let img: IGambar = ha.Image.muatAsyncKanvas(url, canvas);
			return ha.Sprite.buatPrivate(img, dragable, url, tipeDrag);
		}

		static muatAsync(url: string, dragable = false, tipeDrag: number = 0): ISprite {
			let img: IGambar = ha.Image.muatAsync(url);
			let spr: ISprite = ha.Sprite.buatPrivate(img, dragable, url, tipeDrag);
			return spr;
		}

		static ukuran(gbr: ISprite, w: number, h: number): void {
			ha.Image.ukuran(gbr.buffer, w, h);
		}

		private static buatPrivate(
			image: IGambar,
			dragable: boolean = false,
			url: string,
			tipeDrag: number): ISprite {

			let hasil: ISprite;

			hasil = new Sprite(image, dragable);
			hasil.tipeDrag = tipeDrag;
			hasil.url = url;
			this.daftar.push(hasil);

			console.log('buat sprite');

			return hasil;
		}

		// static inputDown(pos: any): void {
		// 	sprite2.inputDown(pos);
		// }

		// static inputMove(pos: any): void {
		// 	sprite2.inputMove(pos);
		// }

		// static inputUp(): void {
		// 	sprite2.inputUp();
		// }

		static gambar(sprite: ISprite, frame?: number): void {
			ha.Image.gambar(sprite.buffer, sprite.x, sprite.y, frame);
		}

		static posisiPolar(sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number, skalaX: number = 1, skalaY: number = 1): void {
			let p: IPoint2D = ha.Point.posPolar(jarak, sudut, x2, y2);

			p.y -= y2;
			p.y *= skalaY;
			p.y += y2;

			p.x -= x2;
			p.x *= skalaX;
			p.x += x2;

			sprite.x = p.x;
			sprite.y = p.y;
		}

		static ubin(spr: ISprite, x: number = 0, y: number = 0, frame: number = 0) {
			ha.Image.gambarUbin(spr.buffer, x, y, frame);
		}

		static semuaDiLoad(): boolean {
			let hasil: boolean = true;

			ha.Sprite.daftar.forEach((item: ISprite) => {
				if (!item.buffer.load) {
					hasil = false;
				}
			})

			return hasil;
		}

		public get dragStartX(): number {
			return this._dragStartX;
		}
		public set dragStartX(value: number) {
			this._dragStartX = value;
		}
		public get dragStartY(): number {
			return this._dragStartY;
		}
		public set dragStartY(value: number) {
			this._dragStartY = value;
		}

		public get dragged(): boolean {
			return this._dragged;
		}
		public set dragged(value: boolean) {
			this._dragged = value;
		}
		public get buffer(): IGambar {
			return this._buff;
		}
		public set buffer(value: IGambar) {
			this._buff = value;
		}
		public get x(): number {
			return this._x;
		}
		public set x(value: number) {
			this._x = value;
		}
		public get y(): number {
			return this._y;
		}
		public set y(value: number) {
			this._y = value;
		}

		public get hit(): number {
			return this._hit;
		}
		public set hit(value: number) {
			this._hit = value;
		}
		public get down(): boolean {
			return this._down;
		}
		public set down(value: boolean) {
			this._down = value;
		}
		public get dragable(): boolean {
			return this._dragable;
		}
		public set dragable(value: boolean) {
			this._dragable = value;
		}
		public get sudutAwal(): number {
			return this._sudutAwal;
		}
		public set sudutAwal(value: number) {
			this._sudutAwal = value;
		}

		public get sudutTekanAwal(): number {
			return this._sudutTekanAwal;
		}
		public set sudutTekanAwal(value: number) {
			this._sudutTekanAwal = value;
		}

		public get tipeDrag(): number {
			return this._tipeDrag;
		}
		public set tipeDrag(value: number) {
			this._tipeDrag = value;
		}

		public get url(): string {
			return this._url;
		}
		public set url(value: string) {
			this._url = value;
		}

	}

}

interface ISprite {
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
	tipeDrag: number; //0 drag, 1 rotasi, 2 skew (todo)
	sudutTekanAwal: number
	sudutAwal: number
}