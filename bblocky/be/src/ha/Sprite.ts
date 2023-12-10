///<reference path="./Image.ts"/>

namespace ha.be {

	export class Sprite implements ISprite {
		static readonly daftar: ISprite[] = [];
		private static _ctrDraw: number = 0;

		public static get ctrDraw(): number {
			return Sprite._ctrDraw;
		}
		public static set ctrDraw(value: number) {
			Sprite._ctrDraw = value;
		}

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
		private _inputId: number;


		public get inputId(): number {
			return this._inputId;
		}
		public set inputId(value: number) {
			this._inputId = value;
		}

		constructor(buffer: IGambar, dragable: boolean = false) {
			this.buffer = buffer;
			this.dragable = dragable;
		}

		/**
		 * 
		 * @param spr 
		 * @returns 
		 */
		static kontek(spr: ISprite): CanvasRenderingContext2D {
			return spr.buffer.ctx;
		}

		/**
		 * 
		 * @param sprS {ISprite} sprite 
		 * @param onload {() => void} optional, fungsi yang dipanggil sprite selesai dimuat
		 * @returns 
		 */
		static Copy(sprS: ISprite, onload?: () => void): ISprite {
			if (!onload) {
				onload = () => { };
			}

			if (sprS.buffer.isAnim) {
				console.debug('copy sprite anim');
				console.debug(sprS);
				return Sprite.muatAnimasiAsyncKanvas(sprS.url, sprS.buffer.frameW, sprS.buffer.frameH, sprS.dragable, sprS.buffer.canvas, sprS.tipeDrag);
			}
			else {
				return Sprite.muatAsyncBerbagiKanvas(sprS.url, sprS.dragable, sprS.buffer.canvas, sprS.tipeDrag, onload)
			}
		}

		/**
		 * 
		 * @param spr 
		 * @returns 
		 */
		static Dimuat(spr: ISprite): boolean {
			return spr.buffer.load;
		}

		/**
		 * 
		 * @param spr 
		 * @returns 
		 */
		static StatusDrag(spr: ISprite): boolean {
			let hasil: boolean = false;

			this.daftar.forEach((item: ISprite) => {
				if (spr == item) {
					hasil = spr.dragged;
					return;
				}
			});

			return hasil;
		}

		/**
		 * 
		 * @param spr 
		 * @param pj 
		 * @returns 
		 */
		static Panjang(spr: ISprite, pj?: number): number {
			return Image.panjang(spr.buffer, pj);
		}

		/**
		 * 
		 * @param spr 
		 * @param lb 
		 * @returns 
		 */
		static Lebar(spr: ISprite, lb?: number): number {
			return Image.lebar(spr.buffer, lb);
		}

		/**
		 * 
		 * @param spr 
		 * @param alpha 
		 * @returns 
		 */
		static Alpha(spr: ISprite, alpha?: number): number {
			if (typeof (alpha) == 'number') {
				spr.buffer.alpha = alpha / 100;
			}

			return spr.buffer.alpha;
		}

		/**
		 * 
		 * @param spr 
		 * @param sudut 
		 * @returns 
		 */
		static Rotasi(spr: ISprite, sudut?: number): number {
			if (spr && (typeof (sudut) == 'number')) {
				spr.buffer.rotasi = sudut;
			}

			return spr.buffer.rotasi;
		}

		/**
		 * 
		 * @param spr 
		 * @param x 
		 * @param y 
		 */
		static Posisi(spr: ISprite, x: number = 0, y: number = 0) {
			spr.x = x;
			spr.y = y;
		}

		/**
		 * 
		 * @param spr 
		 * @param x 
		 * @returns 
		 */
		static PosisiX(spr: ISprite, x: number | null | undefined = null): number {
			if (typeof (x) == 'number') {
				spr.x = x;
			}

			return spr.x;
		}

		/**
		 * 
		 * @param spr 
		 * @param y 
		 * @returns 
		 */
		static PosisiY(spr: ISprite, y: number | null | undefined = null): number {
			if (typeof (y) == 'number') {
				// debugger;
				spr.y = y;
			}

			return spr.y;
		}

		/**
		 * 
		 * @param spr 
		 * @returns 
		 */
		static Bound(spr: ISprite): IKotak {
			Image.resetRect(spr.buffer);
			Image.rectToImageTransform(spr.buffer, spr.x, spr.y);
			return spr.buffer.rect;
		}

		//TODO:boundx, boundy, boundX2, boundY2

		/**
		 * 
		 * @param spr 
		 * @param x 
		 * @param y 
		 * @returns 
		 */
		static Handle(spr: ISprite, x: number = 0, y: number = 0): void {
			if (spr) {
				spr.buffer.handleX = x;
				spr.buffer.handleY = y;
			}

			return
		}

		/**
		 * 
		 */
		static GambarSemua() {
			for (let i: number = 0; i < Sprite.daftar.length; i++) {
				let item: ISprite = Sprite.daftar[i];
				Sprite.Gambar(item);
			}
		}

		/**
		 * 
		 * @param spr 
		 * @param spr2 
		 * @returns 
		 */
		static Tabrakan(spr: ISprite, spr2: ISprite): boolean {
			return Image.tabrakan(spr.buffer, Sprite.PosisiX(spr), Sprite.PosisiY(spr), spr2.buffer, Sprite.PosisiX(spr2), Sprite.PosisiY(spr2))
		}

		private static muatAnimasiAsyncKanvas(
			url: string,
			pf: number,
			lf: number,
			bisaDiDrag: boolean,
			canvas: HTMLCanvasElement,
			tipeDrag: number): ISprite {

			let img: IGambar = Image.muatAnimAsyncCanvas(url, pf, lf, canvas);
			return Sprite.buatPrivate(img, bisaDiDrag, url, tipeDrag);
		}

		/**
		 * 
		 * @param url 
		 * @param pf 
		 * @param lf 
		 * @param bisaDiDrag 
		 * @param tipeDrag 
		 * @returns 
		 */
		static MuatAnimasi(url: string, pf: number, lf: number, bisaDiDrag: boolean = false, tipeDrag: number = 0): ISprite {
			let img: IGambar = Image.muatAnimAsync(url, pf, lf);
			return Sprite.buatPrivate(img, bisaDiDrag, url, tipeDrag);
		}

		private static muatAsyncBerbagiKanvas(
			url: string,
			dragable = false,
			canvas: HTMLCanvasElement,
			tipeDrag: number,
			onload: () => void): ISprite {

			let img: IGambar = Image.muatAsyncKanvas(url, canvas, onload);
			return Sprite.buatPrivate(img, dragable, url, tipeDrag);
		}

		/**
		 * 
		 * @param url 
		 * @param bisaDiDrag 
		 * @param tipeDrag 
		 * @returns 
		 */
		static async MuatAsync(url: string, bisaDiDrag = false, tipeDrag: number = 0): Promise<ISprite> {
			return new Promise((resolve, _reject) => {
				let hasil: ISprite = Sprite.Muat(url, bisaDiDrag, tipeDrag, () => {
					resolve(hasil);
				});
			});
		}

		/**
		 * 
		 * @param url (string) url gambar
		 * @param bisaDiDrag 
		 * @param tipeDrag 
		 * @param onload 
		 * @returns 
		 */
		static Muat(url: string, bisaDiDrag: boolean = false, tipeDrag: number = 0, onload?: () => void): ISprite {
			if (!onload) onload = () => { };
			let img: IGambar = Image.muatAsync(url, onload);
			let spr: ISprite = Sprite.buatPrivate(img, bisaDiDrag, url, tipeDrag);
			return spr;
		}

		/**
		 * 
		 * @param gbr 
		 * @param w 
		 * @param h 
		 */
		static Ukuran(gbr: ISprite, w: number, h: number): void {
			Image.ukuran(gbr.buffer, w, h);
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
			if (hasil.dragable) {
				if (hasil.tipeDrag == 0) {
					hasil.tipeDrag = 1;
				}
			}

			this.daftar.push(hasil);

			// console.debug('buat sprite');
			// console.debug(hasil);

			return hasil;
		}

		/**
		 * Menggambar sprite ke layar
		 * @param sprite 
		 * @param frame 
		 */
		static Gambar(sprite: ISprite, frame?: number): void {
			if (sprite == null) {
				this.GambarSemua();
				return;
			}
			Image.gambar(sprite.buffer, sprite.x, sprite.y, frame);
		}

		/**
		 * 
		 * @param sprite 
		 * @param x 
		 * @param y 
		 * @param frame 
		 * @returns 
		 */
		static GambarXY(sprite: ISprite, x: number, y: number, frame?: number): void {
			Image.gambar(sprite.buffer, x, y, frame);
		}

		/**
		 * 
		 * @param sprite 
		 * @param sudut 
		 * @param jarak 
		 * @param x2 
		 * @param y2 
		 * @param skalaX 
		 * @param skalaY 
		 */
		static posisiPolar(sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number, skalaX: number = 1, skalaY: number = 1): void {
			let p: IPoint2D = Point.posPolar(jarak, sudut, x2, y2);

			p.y -= y2;
			p.y *= skalaY;
			p.y += y2;

			p.x -= x2;
			p.x *= skalaX;
			p.x += x2;

			sprite.x = p.x;
			sprite.y = p.y;
		}

		/**
		 * 
		 * @param spr 
		 * @param x 
		 * @param y 
		 * @param frame 
		 */
		static Ubin(spr: ISprite, x: number = 0, y: number = 0, frame: number = 0) {
			Image.gambarUbin(spr.buffer, x, y, frame);
		}

		/**
		 * 
		 * @param spr 
		 * @returns 
		 */
		static StatusMuat(spr?: ISprite): boolean {
			let hasil: boolean = true;

			if (spr && spr.buffer) {
				return spr.buffer.load;
			}

			Sprite.daftar.forEach((item: ISprite) => {
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

