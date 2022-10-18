namespace ha {
	class Rect {

		create(x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0): IRect {
			let r: IRect = {}
			r.vs = [];
			r.vs.push(ha.point.create(x1, y1));
			r.vs.push(ha.point.create(x2, y1));
			r.vs.push(ha.point.create(x2, y2));
			r.vs.push(ha.point.create(x1, y2));

			r.segs = [];
			r.segs.push(ha.segment.createSeg(r.vs[0], r.vs[1]));
			r.segs.push(ha.segment.createSeg(r.vs[1], r.vs[2]));
			r.segs.push(ha.segment.createSeg(r.vs[2], r.vs[3]));
			r.segs.push(ha.segment.createSeg(r.vs[3], r.vs[0]));

			return r;
		}

		copy(r: IRect): IRect {
			// console.log('copy:');
			// console.log(r.vs);

			// let hasil: IRect = this.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
			let hasil: IRect = this.create();
			this.copyInfo(r, hasil);

			// console.log(hasil.vs);

			return hasil;
		}

		copyInfo(r1: IRect, r2: IRect): void {
			for (let i: number = 0; i < r1.segs.length; i++) {
				ha.segment.copyInfo(r1.segs[i], r2.segs[i]);
			}
		}

		collideBound(r1: IRect, r2: IRect): boolean {
			// console.debug('collide bound');

			if (this.maxX(r1) < this.minX(r2)) {
				// console.debug('maxX gagal');
				return false;
			}

			// console.log('maxx ' + this.maxX(r1));
			// console.log('minx ' + this.minX(r2));

			if (this.minX(r1) > this.maxX(r2)) {
				// console.debug('min x gagal');
				return false;
			}

			if (this.maxY(r1) < this.minY(r2)) {
				// console.debug('max y gagal');
				return false;
			}

			if (this.minY(r1) > this.maxY(r2)) {
				// console.debug('min y gagal');
				return false;
			}

			return true;
		}

		collide(r1: IRect, r2: IRect): boolean {
			let bound: boolean = this.collideBound(r1, r2);
			if (!bound) return false;

			for (let i: number = 0; i < r1.segs.length; i++) {
				for (let j: number = 0; j < r2.segs.length; j++) {
					if (ha.segment.collide(r1.segs[i], r2.segs[j])) {
						return true;
					}
				}
			}

			return false;
		}

		collideDotBound(r: IRect, d: IV2D): boolean {
			if (d.x < this.minX(r)) {
				// console.log('minx failed');
				return false;
			}

			if (d.x > this.maxX(r)) {
				// console.log('maxX failed');
				// console.log(d);
				// console.log(this.maxX(r));
				// console.log(r.vs);
				return false;
			}

			if (d.y < this.minY(r)) {
				// console.log('minY failed');
				return false;
			}

			if (d.y > this.maxY(r)) {
				// console.log('maxY failed');
				return false;
			}

			return true;
		}

		collideDot(r: IRect, x: number, y: number): boolean {
			let r2: IRect = ha.rect.copy(r);
			let p: IV2D = ha.point.create(x, y);
			let d: number = ha.segment.deg(r2.segs[0]);
			let pRot: IV2D = r2.vs[0];

			// console.log('d: ' + d);
			// console.log('segment ' + r2.segs[0]);
			// console.log(r2.segs[0]);


			// console.log('rect');
			// console.log(r);
			// console.log(r2);

			if (!this.collideDotBound(r, p)) {
				// console.log('collide bound 1 failed');
				return false;
			}

			ha.rect.rotate(r2, -d, pRot.x, pRot.y);
			ha.point.rotateRel(p, pRot.x, pRot.y, -d);

			if (!this.collideDotBound(r2, p)) {
				// console.log('collide bound 2 failed');
				// console.log('deg ' + d);
				// console.log('rect');
				// console.log(r2);
				return false;
			}

			return true;
		}

		minX(r: IRect): number {
			let x: number = r.vs[0].x;

			r.vs.forEach((item: IV2D) => {
				if (item.x < x) x = item.x
			})

			return x;
		}

		maxX(r: IRect): number {
			let x: number = r.vs[0].x;

			r.vs.forEach((item: IV2D) => {
				if (item.x > x) x = item.x
			})

			return x;
		}

		minY(r: IRect): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: IV2D) => {
				if (item.y < y) y = item.y
			})

			return y;
		}

		maxY(r: IRect): number {
			let y: number = r.vs[0].y;

			r.vs.forEach((item: IV2D) => {
				if (item.y > y) y = item.y
			})

			return y;
		}

		scale(r: IRect): void {
			r;
		}

		translate(rect: IRect, x: number, y: number): void {
			rect.vs.forEach((v: IV2D) => {
				ha.point.translate(v, x, y);
			})
		}

		rotate(r: IRect, deg: number, xc: number = 0, yc: number): void {

			r.vs.forEach((p: IV2D) => {
				ha.point.rotateRel(p, xc, yc, deg);
			});


		}


	}

	export var rect: Rect = new Rect();
}