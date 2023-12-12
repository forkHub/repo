///<reference path="./Image.ts"/>

namespace ha.be {

	export class Spr implements ISpr {
		static readonly daftar: ISpr[] = [];
		private static _ctrDraw: number = 0;

		public static get ctrDraw(): number {
			return Spr._ctrDraw;
		}
		public static set ctrDraw(value: number) {
			Spr._ctrDraw = value;
		}

		private _buff: IGbr;
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

		constructor(buffer: IGbr, dragable: boolean = false) {
			this.buff = buffer;
			this.dragable = dragable;
		}

		/**
		 * 
		 * @param spr 
		 * @returns 
		 */
		static kontek(spr: ISpr): CanvasRenderingContext2D {
			return spr.buff.ctx;
		}

		/**
		 * 
		 * @param sprS {ISpr} sprite 
		 * @param onload {() => void} optional, fungsi yang dipanggil sprite selesai dimuat
		 * @returns 
		 */
		static Copy(sprS: ISpr, onload?: () => void): ISpr {
			if (!onload) {
				onload = () => { };
			}

			if (sprS.buff.isAnim) {
				console.debug('copy sprite anim');
				console.debug(sprS);
				return Spr.muatAnimasiAsyncKanvas(sprS.url, sprS.buff.frameW, sprS.buff.frameH, sprS.dragable, sprS.buff.canvas, sprS.tipeDrag);
			}
			else {
				return Spr.muatAsyncBerbagiKanvas(sprS.url, sprS.dragable, sprS.buff.canvas, sprS.tipeDrag, onload)
			}
		}

		/**
		 * 
		 * @param spr 
		 * @returns 
		 */
		static Dimuat(spr: ISpr): boolean {
			return spr.buff.load;
		}

		/**
		 * 
		 * @param spr 
		 * @returns 
		 */
		static StatusDrag(spr: ISpr): boolean {
			let hasil: boolean = false;

			this.daftar.forEach((item: ISpr) => {
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
		static Panjang(spr: ISpr, pj?: number): number {
			return Img.panjang(spr.buff, pj);
		}

		/**
		 * 
		 * @param spr 
		 * @param lb 
		 * @returns 
		 */
		static Lebar(spr: ISpr, lb?: number): number {
			return Img.lebar(spr.buff, lb);
		}

		/**
		 * 
		 * @param spr 
		 * @param alpha 
		 * @returns 
		 */
		static Alpha(spr: ISpr, alpha?: number): number {
			if (typeof (alpha) == 'number') {
				spr.buff.alpha = alpha / 100;
			}

			return spr.buff.alpha;
		}

		/**
		 * 
		 * @param spr 
		 * @param sudut 
		 * @returns 
		 */
		static Rotasi(spr: ISpr, sudut?: number): number {
			if (spr && (typeof (sudut) == 'number')) {
				spr.buff.rotasi = sudut;
			}

			return spr.buff.rotasi;
		}

		/**
		 * 
		 * @param spr 
		 * @param x 
		 * @param y 
		 */
		static Posisi(spr: ISpr, x: number = 0, y: number = 0) {
			spr.x = x;
			spr.y = y;
		}

		/**
		 * 
		 * @param spr 
		 * @param x 
		 * @returns 
		 */
		static PosisiX(spr: ISpr, x: number | null | undefined = null): number {
			if (typeof (x) == 'number') {
				spr.x = x;
			}

			return spr.x;
		}

		/**
		 * 
		 * @param s 
		 * @param y 
		 * @returns 
		 */
		static PosisiY(s: ISpr, y: number | null | undefined = null): number {
			if (typeof (y) == 'number') {
				// debugger;
				s.y = y;
			}

			return s.y;
		}

		/**
		 * 
		 * @param s 
		 * @returns 
		 */
		static Bound(s: ISpr): IKotak {
			Img.resetRect(s.buff);
			Img.rectToImageTransform(s.buff, s.x, s.y);
			return s.buff.rect;
		}

		//TODO:boundx, boundy, boundX2, boundY2

		/**
		 * 
		 * @param s 
		 * @param x 
		 * @param y 
		 * @returns 
		 */
		static Handle(s: ISpr, x: number = 0, y: number = 0): void {
			if (s) {
				s.buff.handleX = x;
				s.buff.handleY = y;
			}
		}

		static HandleX(s: ISpr): number { return s.buff.handleX; }
		static HandleY(s: ISpr): number { return s.buff.handleY; }

		/**
		 * 
		 */
		static GambarSemua() {
			for (let i: number = 0; i < Spr.daftar.length; i++) {
				let item: ISpr = Spr.daftar[i];
				Spr.Gambar(item);
			}
		}

		/**
		 * 
		 * @param spr 
		 * @param spr2 
		 * @returns 
		 */
		static Tabrakan(spr: ISpr, spr2: ISpr): boolean {
			return Img.tabrakan(spr.buff, Spr.PosisiX(spr), Spr.PosisiY(spr), spr2.buff, Spr.PosisiX(spr2), Spr.PosisiY(spr2))
		}

		static TabrakanXY(spr: ISpr, x1: number, y1: number, spr2: ISpr, x2: number, y2: number): boolean {
			return Img.tabrakan(spr.buff, x1, y1, spr2.buff, x2, y2)
		}

		private static muatAnimasiAsyncKanvas(
			url: string,
			pf: number,
			lf: number,
			bisaDiDrag: boolean,
			canvas: HTMLCanvasElement,
			tipeDrag: number): ISpr {

			let img: IGbr = Img.muatAnimAsyncCanvas(url, pf, lf, canvas);
			return Spr.buatPrivate(img, bisaDiDrag, url, tipeDrag);
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
		static MuatAnimasi(url: string, pf: number, lf: number, bisaDiDrag: boolean = false, tipeDrag: number = 0): ISpr {
			let img: IGbr = Img.muatAnimAsync(url, pf, lf);
			return Spr.buatPrivate(img, bisaDiDrag, url, tipeDrag);
		}

		private static muatAsyncBerbagiKanvas(
			url: string,
			dragable = false,
			canvas: HTMLCanvasElement,
			tipeDrag: number,
			onload: () => void): ISpr {

			let img: IGbr = Img.muatAsyncKanvas(url, canvas, onload);
			return Spr.buatPrivate(img, dragable, url, tipeDrag);
		}

		/**
		 * 
		 * @param url 
		 * @param bisaDiDrag 
		 * @param tipeDrag 
		 * @returns 
		 */
		static async MuatAsync(url: string, bisaDiDrag = false, tipeDrag: number = 0): Promise<ISpr> {
			return new Promise((resolve, _reject) => {
				let hasil: ISpr = Spr.Muat(url, bisaDiDrag, tipeDrag, () => {
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
		static Muat(url: string, bisaDiDrag: boolean = false, tipeDrag: number = 0, onload?: () => void): ISpr {
			if (!onload) onload = () => { };
			let img: IGbr = Img.muatAsync(url, onload);
			let spr: ISpr = Spr.buatPrivate(img, bisaDiDrag, url, tipeDrag);
			return spr;
		}

		/**
		 * 
		 * @param gbr 
		 * @param w 
		 * @param h 
		 */
		static Ukuran(gbr: ISpr, w: number, h: number): void {
			Img.ukuran(gbr.buff, w, h);
		}

		private static buatPrivate(
			image: IGbr,
			dragable: boolean = false,
			url: string,
			tipeDrag: number): ISpr {

			let hasil: ISpr;

			hasil = new Spr(image, dragable);
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
		static Gambar(sprite: ISpr, frame?: number): void {
			if (sprite == null) {
				this.GambarSemua();
				return;
			}
			Img.gambar(sprite.buff, sprite.x, sprite.y, frame);
		}

		/**
		 * 
		 * @param sprite 
		 * @param x 
		 * @param y 
		 * @param frame 
		 * @returns 
		 */
		static GambarXY(sprite: ISpr, x: number, y: number, frame?: number): void {
			Img.gambar(sprite.buff, x, y, frame);
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
		static posisiPolar(sprite: ISpr, sudut: number, jarak: number, x2: number, y2: number, skalaX: number = 1, skalaY: number = 1): void {
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
		static Ubin(spr: ISpr, x: number = 0, y: number = 0, frame: number = 0) {
			Img.gambarUbin(spr.buff, x, y, frame);
		}

		/**
		 * 
		 * @param spr 
		 * @returns 
		 */
		static StatusMuat(spr?: ISpr): boolean {
			let hasil: boolean = true;

			if (spr && spr.buff) {
				return spr.buff.load;
			}

			Spr.daftar.forEach((item: ISpr) => {
				if (!item.buff.load) {
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
		public get buff(): IGbr {
			return this._buff;
		}
		public set buff(value: IGbr) {
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

