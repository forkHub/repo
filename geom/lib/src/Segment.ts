namespace ha.geom {
	export class Garis {

		static create(v1: IPoint2D = { x: 0, y: 0 }, v2: IPoint2D = { x: 0, y: 0 }): IGaris {
			return {
				v1: v1,
				v2: v2
			}
		}

		static destroy(g1: IGaris): void {
			g1.v1 = null;
			g1.v2 = null;
		}

		static hadapAtas(g: IGaris): boolean {
			return g.v2.y > g.v1.y;

			// if (Garis.maxY(garis) > Garis.minY(garis)) {
			// 	return true;
			// 	// debugger;
			// }

			// // debugger;
			// return false;
		}

		/**
		 * tukar posisi point
		 * @param g 
		 * @param klon 
		 * @returns 
		 */
		static tukarPosisi(g: IGaris, klon: boolean): IGaris {
			let g1: IGaris = g;

			g1 = g;
			if (klon) g1 = Garis.klon(g1);

			Point.tukarPosisi(g1.v1, g1.v2);
			return g1;
		}

		static kananPos(g: IGaris, xt: number, yt: number): boolean {
			let gc: IGaris = Garis.klon(g);
			let p: IPoint2D = Point.create(xt, yt);
			let sdt: number = 0;

			gc = Garis.keAtas(gc, false);
			sdt = Garis.sudut(gc);

			gc = Garis.putar(gc, -sdt, gc.v1.x, gc.v1.y, false);
			Point.putarPoros(p, gc.v1.x, gc.v1.y, 0, false);

			p;

			return false;
		}

		static keAtas(garis: IGaris, klon: boolean): IGaris {
			if (this.hadapAtas(garis)) {
				if (klon) {
					return Garis.klon(garis);
				}
				else {
					return garis;
				}
			}

			// debugger;
			let gc = garis;
			if (klon) gc = Garis.klon(garis);
			return Garis.tukarPosisi(gc, klon);
		}

		// static putarKeX(garis: IGaris, klon: boolean): IGaris {
		// 	let gc: IGaris;
		// 	let sudut: number;

		// 	gc = garis;
		// 	if (klon) gc = Garis.klon(gc);

		// 	gc = Garis.keAtas(gc, false);
		// 	sudut = Garis.sudut(gc);

		// 	Garis.putar(gc, -sudut, gc.v1.x, gc.v1.y, false);

		// 	return gc;
		// }

		static boundCollide(seg1: IGaris, seg2: IGaris): boolean {
			if (Garis.maxX(seg1) < Garis.minX(seg2)) return false;
			if (Garis.minX(seg1) > Garis.maxX(seg2)) return false;

			if (Garis.maxY(seg1) < Garis.minY(seg2)) return false;
			if (Garis.minY(seg1) > Garis.maxY(seg2)) return false;

			return true;
		}

		static tabrakan(g1: IGaris, g2: IGaris): boolean {
			let g1c: IGaris;
			let g2c: IGaris;

			if (Garis.boundCollide(g1, g2) == false) {
				return false;
			}

			//g1 melewati horizontal saat diputar relatif ke g2
			g1c = Garis.klon(g1);
			g2c = Garis.klon(g2);

			Garis.keAtas(g2c, false);
			let sudut: number = Garis.sudut(g2c);

			Garis.putar(g2c, -sudut, g2c.v1.x, g2c.v1.y, false);
			Garis.putar(g1c, -sudut, g2c.v1.x, g2c.v2.y, false);


			//g2 melewati horizontal saat diputar relatif ke g1


			return false; //TODO:
		}

		static collide2(seg1: IGaris, seg2: IGaris): boolean {
			let bound: boolean = Garis.boundCollide(seg1, seg2);
			if (!bound) return false;

			// let deg: number = ha.Segment.deg(seg2);
			let seg2Copy: IGaris = Garis.klon(seg2);
			let seg1Copy: IGaris = Garis.klon(seg1);
			let deg: number = Garis.sudut(seg2);

			Garis.putar(seg2Copy, -deg, seg2.v1.x, seg2.v1.y, false);
			Garis.putar(seg1Copy, -deg, seg2.v1.x, seg2.v1.y, false);

			if (!Garis.boundCollide(seg1Copy, seg2Copy)) return false;

			Garis.pindah(seg1Copy, -seg2.v1.x, -seg2.v1.y);
			Garis.pindah(seg2Copy, -seg2.v1.x, -seg2.v1.y);

			if (!Garis.melewatiGarisX(seg1Copy)) {
				return false;
			}

			let idx: number = Garis.xHorIdx(seg1Copy);
			let x: number = Garis.getXAtIdx(seg1Copy, idx);

			if (x > Garis.maxX(seg2Copy)) return false;
			if (x < Garis.minX(seg2Copy)) return false;

			return true;
		}

		/**
		 * mengkopy dari garis sumber ke garis target
		 * @param gs garis sumber
		 * @param gt garis target
		 */
		static copy(gs: IGaris, gt: IGaris): void {
			Point.copyPosisi(gs.v1, gt.v2);
			Point.copyPosisi(gs.v2, gt.v2);
		}

		/**
		 * klone garis
		 * @param garis 
		 * @returns 
		 */
		static klon(garis: IGaris): IGaris {
			return {
				v1: Point.clone(garis.v1),
				v2: Point.clone(garis.v2)
			}
		}

		static melewatiGarisX(seg: IGaris): boolean {
			if (Garis.maxY(seg) > 0) {
				if (Garis.minY(seg) < 0) {
					return true;
				}
			}

			return false;
		}

		static melewatiGarisY(seg: IGaris): boolean {
			if (Garis.minX(seg) < 0) {
				if (Garis.maxX(seg) > 0) {
					return true;
				}
			}
			return false;
		}

		/**
		 * menghitung sudut dari garis
		 * @param garis - garis
		 * @returns sudut
		 */
		static sudut(garis: IGaris): number {
			let j: number = garis.v2.y - garis.v1.y;
			let i: number = garis.v2.x - garis.v1.x;

			return Transform.deg(i, j);
		}

		/**
		 * menghasilkan posisi x dari vecI(), pada idx tertentu
		 * 
		 * @param garis garis
		 * @param idx posisi (0-1)
		 * @returns 
		 */
		static getXAtIdx(garis: IGaris, idx: number): number {
			return garis.v1.x + (idx * Garis.vecI(garis));
		}

		/**
		 * menghasilkan posisi y dari vecY(), pada idx tertentu
		 * 
		 * @param garis garis
		 * @param idx posisi (0-1)
		 * @returns 
		 */
		static getYAtIdx(seg: IGaris, idx: number): number {
			return seg.v1.y + (idx * Garis.vecJ(seg));
		}

		/**
		 * menghasilkan panjang pada sumbu x
		 * @param garis garis
		 * @returns 
		 */
		static vecI(garis: IGaris): number {
			return garis.v2.x - garis.v1.x;
		}

		static vecJ(garis: IGaris): number {
			return garis.v2.y - garis.v1.y;
		}

		/**
		 * memutar garis
		 * @param g garis
		 * @param sdt sudut perputaran
		 * @param xc posisi tengah x
		 * @param yc posisi tengah y
		 */
		static putar(g: IGaris, sdt: number = 0, xc: number = 0, yc: number = 0, klon: boolean): IGaris {
			let gc: IGaris;

			gc = g;
			if (klon) gc = Garis.klon(gc);

			Point.putarPoros(gc.v1, xc, yc, sdt, false);
			Point.putarPoros(gc.v2, xc, yc, sdt, false);

			return gc;
		}

		/**
		 * putar garis agar sejajar sumbu X
		 * @param g garis
		 * @param klon apakah akan mengklone garis sebelum diputar
		 * @returns garis yang sudah di putar
		 */
		static putarKeHor(g: IGaris, klon: boolean): IGaris {
			let sdt: number;
			let gc: IGaris;

			gc = g;
			if (klon) gc = Garis.klon(g);

			Garis.keAtas(gc, false);
			sdt = Garis.sudut(gc);
			Garis.putar(gc, -sdt, gc.v1.x, gc.v1.y, false);

			return gc;
		}

		static minX(garis: IGaris): number {
			return Math.min(garis.v1.x, garis.v2.x);
		}

		static maxX(garis: IGaris): number {
			return Math.max(garis.v1.x, garis.v2.x);
		}

		static minY(garis: IGaris): number {
			return Math.min(garis.v1.y, garis.v2.y);
		}

		static maxY(garis: IGaris): number {
			return Math.max(garis.v1.y, garis.v2.y);
		}

		static pindah(garis: IGaris, x: number = 0, y: number = 0) {
			garis.v1.x += x;
			garis.v1.y += y;
			garis.v2.x += x;
			garis.v2.y += y;
		}

		//tested
		static xHorIdx(garis: IGaris): number {
			if (!Garis.melewatiGarisX(garis)) return NaN;

			let idx: number = 0;
			idx = (0 - garis.v1.y) / (garis.v2.y - garis.v1.y)

			return idx;
		}
	}

	//alias
	// export const Garis: typeof Segment = Segment;
}