///<reference path="Geom.ts"/>
///<reference path="Point.ts"/>

class Dot implements IDot {
	private static _daftar: IDot[] = [];
	private static _onTambah: () => void;
	private static _dipilih: number;
	private static _target: number;
	// private static posRel: IPoint = new Point();

	private _pos: IPoint;
	private _id: number = 0;
	private _indukId: number = 0;
	private _skala: IPoint;
	private _rotasi: number = 0;
	private _posGlobal: IPoint;
	private _skalaGlobal: IPoint;
	private _rotasiGlobal: number;

	constructor() {
		this._pos = new Point();
		this._id = Id.id;
		this._posGlobal = new Point();
		this._skalaGlobal = new Point();
		this._rotasiGlobal = 0;
		this._skala = new Point();
		this._skala.x = 1;
		this._skala.y = 1;
	}

	static hapusPivot(dot: IDot): void {
		Dot.lokal2global(dot);

		dot.pos.x = dot.posGlobal.x;
		dot.pos.y = dot.posGlobal.y;

		dot.skala.x = dot.skalaGlobal.x;
		dot.skala.y = dot.skalaGlobal.y;

		dot.rotasi = dot.rotasiGlobal;

		dot.indukId = 0;

		// this._daftar.forEach((item: IDot) => {
		// 	if (item.indukId == dot.id) {
		// 		this.setPivot(item.id, dot.id);
		// 	}
		// })
	}

	static setPivot(id1: number, id2: number): void {
		if (id1 == id2) {
			console.log('batal');
			return;
		}

		let dot: IDot = Dot.getById(id1);
		let dot2: IDot = Dot.getById(id2);
		let posRelX: number = 0;
		let posRelY: number = 0;

		Dot.hapusPivot(dot);

		Dot.lokal2global(dot2);
		Dot.lokal2global(dot);

		console.group('set pivot, src: ' + id1 + '/target: ' + id2);
		console.log(dot);
		console.log(dot2);

		//putaran posisi
		Geom.rotateRel(dot.posGlobal, dot2.posGlobal, -dot2.rotasiGlobal);
		// console.log('rotasi ' + -dot2.rotasi);

		dot.posGlobal.x = Geom.hasil.x;
		dot.posGlobal.y = Geom.hasil.y;

		//skala posisi
		posRelX = dot.posGlobal.x - dot2.posGlobal.x;
		posRelY = dot.posGlobal.y - dot2.posGlobal.y;

		posRelX /= dot2.skalaGlobal.x;
		posRelY /= dot2.skalaGlobal.y;

		//posisi
		dot.pos.x = posRelX;
		dot.pos.y = posRelY;

		//skala relative
		dot.skala.x = dot.skalaGlobal.x / dot2.skalaGlobal.x;
		dot.skala.y = dot.skalaGlobal.y / dot2.skalaGlobal.y;

		dot.rotasi = dot.rotasiGlobal - dot2.rotasiGlobal;

		dot.indukId = id2;

		console.groupEnd();

		//update child
		this._daftar.forEach((item: IDot) => {
			if (item.indukId == id1) {
				this.setPivot(item.id, id1);
			}
		})
	}

	private static lokal2global(dot: IDot) {

		dot.posGlobal.x = dot.pos.x;
		dot.posGlobal.y = dot.pos.y;

		dot.skalaGlobal.x = dot.skala.x;
		dot.skalaGlobal.y = dot.skala.y;

		dot.rotasiGlobal = dot.rotasi;

		if (dot.indukId > 0) {
			let dot2: IDot = this.getById(dot.indukId);

			Dot.lokal2global(dot2);

			//skala posisi
			dot.posGlobal.x *= dot2.skalaGlobal.x;
			dot.posGlobal.y *= dot2.skalaGlobal.y;

			dot.posGlobal.x += dot2.posGlobal.x;
			dot.posGlobal.y += dot2.posGlobal.y;

			//rotasi posisi
			Geom.rotateRel(dot.posGlobal, dot2.posGlobal, dot2.rotasiGlobal);
			dot.posGlobal.x = Geom.hasil.x;
			dot.posGlobal.y = Geom.hasil.y;

			//skala global
			dot.skalaGlobal.x = dot.skala.x * dot2.skalaGlobal.x;
			dot.skalaGlobal.y = dot.skala.y * dot2.skalaGlobal.y;

			//rotasi global
			dot.rotasiGlobal = dot.rotasi + dot2.rotasiGlobal;
		}
	}

	static resetDipilih() {
		// ha.comp.Util.stackTrace();
		this._dipilih = null;
	}

	static getById(id: number): IDot {
		let hasil: IDot;

		this._daftar.forEach((item: IDot) => {
			if (item.id == id) {
				hasil = item;
			}
		})

		return hasil;
	}

	static collided(x: number, y: number): number {
		let hasil: number = 0;

		this._daftar.forEach((item: IDot) => {
			if (this.collide(item, x, y)) {
				hasil = item.id;
			}
		})

		// this._dipilih = hasil.id;
		return hasil;
	}

	private static renderBox(ctx: CanvasRenderingContext2D, x: number, y: number, rad: number, clr: string) {
		ctx.beginPath();
		ctx.strokeStyle = (clr);
		ctx.rect(x - rad, y - rad, rad * 2, rad * 2);
		ctx.stroke();

		// ctx.save();
		// ctx.translate(x, y);
		// ctx.rotate(img.rotation * (Math.PI / 180));
		// ctx.drawImage(img.img, frameX, frameY, img.frameW, img.frameH, - img.handleX, -img.handleY, w2, h2);
		// ctx.restore();		

	}

	static render(dot: IDot, ctx: CanvasRenderingContext2D): void {

		this.lokal2global(dot);

		this.renderBox(ctx, dot.posGlobal.x, dot.posGlobal.y, 7, '#000');

		//render dipilih
		if (Dot.dipilih && (dot.id == Dot.dipilih)) {
			this.renderBox(ctx, dot.posGlobal.x, dot.posGlobal.y, 5, '0000ff');
		}

		//render target
		if (Dot._target == dot.id) {
			this.renderBox(ctx, dot.posGlobal.x, dot.posGlobal.y, 5, '#00ff00');
		}
	}

	static buat(x: number, y: number, indukId: number): number {
		let hasil: IDot;

		hasil = new Dot();
		hasil.pos.x = x;
		hasil.pos.y = y;
		hasil.indukId = indukId;

		this._daftar.push(hasil);
		setTimeout(() => {
			this._onTambah();
		}, 0);

		return hasil.id;
	}

	static collide(d: IDot, x: number, y: number): boolean {
		this.lokal2global(d);

		if (Math.abs(d.posGlobal.x - x) < 7) {
			if (Math.abs(d.posGlobal.y - y) < 7) {
				return true;
			}
		}

		return false;
	}

	public get skalaGlobal(): IPoint {
		return this._skalaGlobal;
	}

	public set skalaGlobal(value: IPoint) {
		this._skalaGlobal = value;
	}

	public get rotasiGlobal(): number {
		return this._rotasiGlobal;
	}

	public set rotasiGlobal(value: number) {
		this._rotasiGlobal = value;
	}

	public static get daftar(): IDot[] {
		// console.log(this.daftar);
		return Dot._daftar.slice();
	}

	public get pos(): IPoint {
		return this._pos;
	}

	public set pos(value: IPoint) {
		this._pos = value;
	}

	public static get onTambah(): () => void {
		return Dot._onTambah;
	}
	public static set onTambah(value: () => void) {
		Dot._onTambah = value;
	}
	public static get dipilih(): number {
		return Dot._dipilih;
	}

	public static set dipilih(value: number) {
		Dot._dipilih = value;
	}

	public static get jml(): number {
		return Dot._daftar.length;
	}

	public get id(): number {
		return this._id;
	}

	public static get target(): number {
		return Dot._target;
	}

	public static set target(value: number) {
		Dot._target = value;
	}

	public get indukId(): number {
		return this._indukId;
	}

	public set indukId(value: number) {
		this._indukId = value;
	}

	public get rotasi(): number {
		return this._rotasi;
	}
	public set rotasi(value: number) {
		this._rotasi = value;
	}

	public get skala(): IPoint {
		return this._skala;
	}

	public set skala(value: IPoint) {
		this._skala = value;
	}

	public get posGlobal(): IPoint {
		return this._posGlobal;
	}
	public set posGlobal(value: IPoint) {
		this._posGlobal = value;
	}

}