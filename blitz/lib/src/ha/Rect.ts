namespace ha {
	export class Rect {

		static create(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0): IRect {
			let r: IRect = {}
			r.vs = [];
			r.vs.push(ha.Point.create(x1, y1));
			r.vs.push(ha.Point.create(x2, y1));
			r.vs.push(ha.Point.create(x2, y2));
			r.vs.push(ha.Point.create(x1, y2));

			r.segs = [];
			r.segs.push(ha.Segment.create(r.vs[0], r.vs[1]));
			r.segs.push(ha.Segment.create(r.vs[1], r.vs[2]));
			r.segs.push(ha.Segment.create(r.vs[2], r.vs[3]));
			r.segs.push(ha.Segment.create(r.vs[3], r.vs[0]));

			return r;
		}

		static copy(r: IRect): IRect {
			// console.log('copy:');
			// console.log(r.vs);

			// let hasil: IRect = ha.Rect.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
			let hasil: IRect = ha.Rect.create();
			ha.Rect.copyInfo(r, hasil);

			// console.log(hasil.vs);

			return hasil;
		}

		static copyInfo(r1: IRect, r2: IRect): void {
			for (let i: number = 0; i < r1.segs.length; i++) {
				ha.Segment.copy(r1.segs[i], r2.segs[i]);
			}
		}

		static collideBound(r1: IRect, r2: IRect): boolean {
			// console.debug('collide bound');

			if (ha.Rect.maxX(r1) < ha.Rect.minX(r2)) {
				// console.debug('maxX gagal');
				return false;
			}

			// console.log('maxx ' + ha.Rect.maxX(r1));
			// console.log('minx ' + ha.Rect.minX(r2));

			if (ha.Rect.minX(r1) > ha.Rect.maxX(r2)) {
				// console.debug('min x gagal');
				return false;
			}

			if (ha.Rect.maxY(r1) < ha.Rect.minY(r2)) {
				// console.debug('max y gagal');
				return false;
			}

			if (ha.Rect.minY(r1) > ha.Rect.maxY(r2)) {
				// console.debug('min y gagal');
				return false;
			}

			return true;
		}

		static collide(r1: IRect, r2: IRect): boolean {
			let bound: boolean = ha.Rect.collideBound(r1, r2);
			if (!bound) return false;

			for (let i: number = 0; i < r1.segs.length; i++) {
				for (let j: number = 0; j < r2.segs.length; j++) {
					if (ha.Segment.collide(r1.segs[i], r2.segs[j])) {
						return true;
					}
				}
			}

			return false;
		}

		static collideDotBound(r: IRect, d: IPoint2D): boolean {
			if (d.x < ha.Rect.minX(r)) {
				// console.log('minx failed');
				return false;
			}

			if (d.x > ha.Rect.maxX(r)) {
				// console.log('maxX failed');
				// console.log(d);
				// console.log(ha.Rect.maxX(r));
				// console.log(r.vs);
				return false;
			}

			if (d.y < ha.Rect.minY(r)) {
				// console.log('minY failed');
				return false;
			}

			if (d.y > ha.Rect.maxY(r)) {
				// console.log('maxY failed');
				return false;
			}

			return true;
		}

		static collideDot(r: IRect, x: number, y: number): boolean {
			let r2: IRect = Rect.copy(r);
			let p: IPoint2D = ha.Point.create(x, y);
			let d: number = ha.Segment.deg(r2.segs[0]);
			let pRot: IPoint2D = r2.vs[0];

			if (!ha.Rect.collideDotBound(r, p)) {
				return false;
			}

			Rect.rotate(r2, -d, pRot.x, pRot.y, false);
			ha.Point.putarPoros(p, pRot.x, pRot.y, -d);

			if (!ha.Rect.collideDotBound(r2, p)) {
				// console.log('collide bound 2 failed');
				// console.log('deg ' + d);
				// console.log('rect');
				// console.log(r2);
				return false;
			}

			return true;
		}

		static minX(r: IRect): number {
			let x: number = r.vs[0].x;

			r.vs.forEach((item: IPoint2D) => {
				if (item.x < x) x = item.x
			})

			return x;
		}

		static maxX(r: IRect): number {
			let x: number = r.vs[0].x;

			r.vs.forEach((item: IPoint2D) => {
				if (item.x > x) x = item.x
			})

			return x;
		}

		static minY(r: IRect): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: IPoint2D) => {
				if (item.y < y) y = item.y
			})

			return y;
		}

		static maxY(r: IRect): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: IPoint2D) => {
				if (item.y > y) y = item.y
			})

			return y;
		}

		// static scale(r: IRect): void {
		// 	r;
		// }

		static translate(rect: IRect, x: number, y: number): void {
			rect.vs.forEach((v: IPoint2D) => {
				v.x += x;
				v.y += y;
			})
		}

		static rotate(r: IRect, deg: number, xc: number = 0, yc: number, copy: boolean = true): IRect {
			let r2: IRect;

			if (copy) {
				r2 = Rect.copy(r);
			}
			else {
				r2 = r;
			}

			r2.vs.forEach((p: IPoint2D) => {
				ha.Point.putarPoros(p, xc, yc, deg);
			});

			return r2;
		}


	}

	// export var rect: Rect = new Rect();
}