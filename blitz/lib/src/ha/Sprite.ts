
///<reference path="./Image.ts"/>

/** SPRITE.TS */
namespace ha {
	export class Sprite implements ISprite {
		static readonly daftar: ISprite[] = [];

		private _buffer: IGambar;
		private _x: number = 0;
		private _y: number = 0;
		private _dragged: boolean = false;
		private _down: boolean = false;
		private _hit: number = 0;
		private _dragStartY: number = 0;
		private _dragStartX: number = 0;
		private _dragable: boolean = false;

		constructor(buffer: IGambar, dragable: boolean = false) {
			this.buffer = buffer;
			this.dragable = dragable;
		}

		static rotasi(sprite: ISprite, sudut?: number): number {
			if (sprite && (typeof (sudut) == 'number')) {
				sprite.buffer.rotation = sudut;
			}

			return sprite.buffer.rotation;
		}

		static posisi(sprite: ISprite, x: number = 0, y: number = 0) {
			sprite.x = x;
			sprite.y = y;
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

		static muatAnimasiAsync(url: string, pf: number, lf: number, bisaDiDrag: boolean = false): ISprite {
			let img: IGambar = ha.Image.muatGambarAnimasiAsync(url, pf, lf);
			return ha.Sprite.buat(img, bisaDiDrag);
		}

		static muatAsync(url: string, dragable = false): ISprite {
			let img: IGambar = ha.Image.muatAsync(url);
			console.log(img);
			return ha.Sprite.buat(img, dragable);
		}

		// static async muat(url: string, dragable = false): Promise<ISprite> {
		//     let img: IGambar = await ha.Image.muat(url);
		//     return this.buat(img, dragable);
		// }

		static ukuranGambar(gbr: ISprite, w: number, h: number): void {
			ha.image.ukuranGambar(gbr.buffer, w, h);
		}

		// static handleTengah(gbr: ISprite): void {
		//     ha.image.handleTengah(gbr.buffer);
		// }

		static buat(image: IGambar, dragable: boolean = false): ISprite {
			let hasil: ISprite;

			hasil = new Sprite(image, dragable);
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

		static posisiPolar(sprite: ISprite, sudut: number, jarak: number, x2: number, y2: number): void {
			let p: IPoint2D = ha.Point.posPolar(jarak, sudut, x2, y2);
			sprite.x = p.x;
			sprite.y = p.y;
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
			return this._buffer;
		}
		public set buffer(value: IGambar) {
			this._buffer = value;
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
}