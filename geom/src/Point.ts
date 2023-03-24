import { Transform } from "./Transform.js";

interface IPoint2D {
	x: number,
	y: number
}

export class Point {

	static create(x: number = 0, y: number = 0): IPoint2D {
		return {
			x: x,
			y: y
		}
	}

	static copy(p1: IPoint2D, p2: IPoint2D): void {
		p2.x = p1.x;
		p2.y = p1.y;
	}

	static clone(p: IPoint2D): IPoint2D {
		let h: IPoint2D = Point.create(p.x, p.y);
		return h;
	}

	static sama(p1: IPoint2D, p2: IPoint2D): boolean {
		if (false == Transform.equal(p1.x, p2.x)) return false;
		if (false == Transform.equal(p1.y, p2.y)) return false;
		return true;
	}

	static putarPoros(p: IPoint2D, xc: number = 0, yc: number = 0, deg: number = 0): void {
		Transform.rotateRel(p.x, p.y, xc, yc, deg);

		p.x = Transform.lastX;
		p.y = Transform.lastY;

	}

	static posDist(p: IPoint2D, xt: number, yt: number, jrk: number): IPoint2D {
		let jrkA: number;
		let i: number;
		let j: number;
		let rasio: number;
		let hasil: IPoint2D = Point.create();

		//jarak sekarang
		jrkA = Transform.jarak(p.x, p.y, xt, yt);
		i = xt - p.x;
		j = yt - p.y;

		rasio = jrkA / jrk;

		hasil.x = i * rasio;
		hasil.y = j * rasio;

		hasil.x = xt - hasil.x;
		hasil.y = yt - hasil.y;

		return hasil;
	}

	static posPolar(jarak: number, sudut: number, xt: number, yt: number): IPoint2D {
		let hasil: IPoint2D = Point.create();

		hasil.x = jarak * Math.cos(sudut * Transform.DEG2RAD);
		hasil.y = jarak * Math.sin(sudut * Transform.DEG2RAD);

		hasil.x += xt;
		hasil.y += yt;

		return hasil;
	}
}
