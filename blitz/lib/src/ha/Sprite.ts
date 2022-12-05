
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

		public get url(): string {
			return this._url;
		}
		public set url(value: string) {
			this._url = value;
		}

		constructor(buffer: IGambar, dragable: boolean = false) {
			this.buffer = buffer;
			this.dragable = dragable;
		}

		static copy(sprS: ISprite): ISprite {
			if (sprS.buffer.isAnim) {
				return ha.Sprite.muatAnimasiAsyncKanvas(sprS.url, sprS.buffer.frameW, sprS.buffer.frameH, sprS.dragable, sprS.buffer.canvas);
			}
			else {
				return ha.Sprite.muatAsyncBerbagiKanvas(sprS.url, sprS.dragable, sprS.buffer.canvas)
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

		static muatAnimasiAsyncKanvas(url: string, pf: number, lf: number, bisaDiDrag: boolean = false, canvas: HTMLCanvasElement): ISprite {
			let img: IGambar = ha.Image.muatAnimAsyncCanvas(url, pf, lf, canvas);
			return ha.Sprite.buat(img, bisaDiDrag, url);
		}

		static muatAnimasiAsync(url: string, pf: number, lf: number, bisaDiDrag: boolean = false): ISprite {
			let img: IGambar = ha.Image.muatAnimAsync(url, pf, lf);
			return ha.Sprite.buat(img, bisaDiDrag, url);
		}

		static muatAsyncBerbagiKanvas(url: string, dragable = false, canvas: HTMLCanvasElement): ISprite {
			let img: IGambar = ha.Image.muatAsyncKanvas(url, canvas);
			return ha.Sprite.buat(img, dragable, url);
		}

		static muatAsync(url: string, dragable = false): ISprite {
			let img: IGambar = ha.Image.muatAsync(url);
			return ha.Sprite.buat(img, dragable, url);
		}

		static ukuran(gbr: ISprite, w: number, h: number): void {
			ha.Image.ukuran(gbr.buffer, w, h);
		}

		static buat(image: IGambar, dragable: boolean = false, url: string): ISprite {
			let hasil: ISprite;

			hasil = new Sprite(image, dragable);
			hasil.url = url;
			this.daftar.push(hasil);

			console.log('buat sprite');

			return hasil;
		}

		static inputDown(pos: any): void {
			ha.Sprite.daftar.forEach((item: ISprite) => {
				item.down = false;
			});

			//sprite down
			for (let i: number = ha.Sprite.daftar.length - 1; i >= 0; i--) {
				let item: ISprite;

				item = ha.Sprite.daftar[i];

				if (ha.Image.dotDidalamGambar(item.buffer, item.x, item.y, pos.x, pos.y)) {
					item.down = true;
					item.dragStartX = pos.x - item.x;
					item.dragStartY = pos.y - item.y
					return;
				}
			}
		}

		static inputMove(pos: any): void {
			ha.Sprite.daftar.forEach((item: ISprite) => {

				if (item.down && item.dragable) {
					item.dragged = true;
					item.x = pos.x - item.dragStartX
					item.y = pos.y - item.dragStartY
				}
			});
		}

		static inputUp(): void {
			ha.Sprite.daftar.forEach((item: ISprite) => {
				if (item.down) {
					item.hit++;
				}

				item.down = false;
				item.dragged = false;
			});
		}

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
}