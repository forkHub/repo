namespace ha.geom {
	export class Point {

		static create(x: number = 0, y: number = 0): IPoint2D {
			return {
				x: x,
				y: y
			}
		}

		/**
		 * menukar posisi antara dua point
		 * @param p1 
		 * @param p2 
		 */
		static tukarPosisi(p1: IPoint2D, p2: IPoint2D) {
			let t: IPoint2D = Point.clone(p1);

			p1.x = p2.x;
			p1.y = p2.y;

			p2.x = t.x;
			p2.y = t.y;

			// console.log(JSON.stringify(p1));
			// console.log(JSON.stringify(p2));
			// console.groupEnd();
		}

		static copyPosisi(ps: IPoint2D, pt: IPoint2D): void {
			pt.x = ps.x;
			pt.y = ps.y;
		}

		static clone(p: IPoint2D): IPoint2D {
			let h: IPoint2D = Point.create(p.x, p.y);
			return h;
		}

		static sama(p1: IPoint2D, p2: IPoint2D): boolean {
			if (false == Transform.sama(p1.x, p2.x)) return false;
			if (false == Transform.sama(p1.y, p2.y)) return false;
			return true;
		}

		static putarPoros(p: IPoint2D, xc: number = 0, yc: number = 0, deg: number = 0, klon: boolean): IPoint2D {
			let p1: IPoint2D;

			p1 = p;
			if (klon) p1 = Point.create(p.x, p.y);

			Transform.rotateRel(p1.x, p1.y, xc, yc, deg);

			p1.x = Transform.lastX;
			p1.y = Transform.lastY;

			return p1;
		}

		//menghasilkan posisi pada jarak tertentu 
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

			//hasi global
			hasil.x = xt - hasil.x;
			hasil.y = yt - hasil.y;

			return hasil;
		}

		//menghasilkan posisi pada sudut dan jarak tertentu
		static posPolar(jarak: number, sudut: number, xt: number, yt: number): IPoint2D {
			let hasil: IPoint2D = Point.create();

			Transform.posPolar(jarak, sudut);

			hasil.x = Transform.lastX + xt;
			hasil.y = Transform.lastY + yt;

			return hasil;
		}

	}
}
