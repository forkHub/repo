///<reference path="Point.ts"/>

class Geom {
	private static readonly RAD2DEG: number = 180.0 / Math.PI;
	private static readonly DEG2RAD: number = Math.PI / 180.0;

	private static _hasil: IPoint = new Point();
	public static get hasil(): IPoint {
		return Geom._hasil;
	}

	constructor() {
		Geom.RAD2DEG; //TODO:
	}

	static rotateRel(p: IPoint, t: IPoint, deg: number = 10): void {
		let xr: number = p.x - t.x;
		let yr: number = p.y - t.y;
		let x1: number;
		let y1: number;

		deg *= this.DEG2RAD;

		x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
		y1 = xr * Math.sin(deg) + yr * Math.cos(deg);

		this._hasil.x = x1 + t.x;
		this._hasil.y = y1 + t.y;

		// console.group('rotasi');
		// console.log(p);
		// console.log(this._hasil);
		// console.groupEnd();
	}

}