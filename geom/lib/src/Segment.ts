namespace ha.geom {
	class GP {
		/**
		 * apakah sebuah garis berada di sebelah kanan titik
		 * @param g 
		 * @param xt 
		 * @param yt 
		 * @returns 
		 */
		kananPos(g: IGaris, xt: number, yt: number): boolean {
			let gc: IGaris = Garis.klon(g);
			let p: IPoint2D = Point.create(xt, yt);
			let sdt: number = 0;
			let hasil: boolean = false;

			//garis putar ke atas
			gc = Garis.keAtas(gc, false);

			//sudut untuk mutar ke hor
			sdt = Garis.sudut(gc);

			//putar ke hor
			gc = Garis.putar(gc, -sdt, gc.v1.x, gc.v1.y, false);
			Point.putarPoros(p, gc.v1.x, gc.v1.y, 0, false);

			if (p.y > gc.v1.y) hasil = true;

			Garis.destroy(gc);
			return hasil;
		}

		//jarak ke point

	}

	export class Garis {
		private static readonly gp: GP = new GP();

		/**
		 * buat garis object
		 * @param v1 
		 * @param v2 
		 * @returns 
		 */
		static create(v1: IPoint2D = { x: 0, y: 0 }, v2: IPoint2D = { x: 0, y: 0 }): IGaris {
			return {
				v1: v1,
				v2: v2
			}
		}

		/**
		 * hapus garis dari memory
		 * @param g 
		 */
		static destroy(g: IGaris): void {
			g.v1 = null;
			g.v2 = null;
		}

		/**
		 * check apakah garis menghadap ke atas
		 * @param g 
		 * @returns 
		 */
		static hadapAtas(g: IGaris): boolean {
			return g.v2.y > g.v1.y;
		}

		static posIdx(g: IGaris, idx: number = 1): IPoint2D {
			let p: IPoint2D = Point.create();
			p.x = G.vecI(g) * idx + g.v1.x;
			p.y = G.vecJ(g) * idx + g.v1.y;

			return p;
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
		 * memutar garis
		 * @param g garis
		 * @param sdt sudut perputaran
		 * @param xc posisi pusat putaran x
		 * @param yc posisi pusat putaran y
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

		/** putar garis
		 * 
		 */
		static putarGaris(gs: IGaris[], sdt: number, klon: boolean): void {
			let g: IGaris = gs[0];

			gs.forEach((item: IGaris) => {
				Garis.putar(item, sdt, g.v1.x, g.v1.y, klon);
			});
		}

		/** GARIS - POINT 
		 * ==============
		*/

		/**
		 * apakah sebuah garis berada di sebelah kanan titik
		 * @param g 
		 * @param xt 
		 * @param yt 
		 * @returns 
		 */
		static kananPos(g: IGaris, xt: number, yt: number): boolean {
			return this.gp.kananPos(g, xt, yt);
		}

		/** GARIS - GARIS 
		 * ==============
		*/
		static boundCollide(g1: IGaris, g2: IGaris): boolean {
			if (Garis.maxX(g1) < Garis.minX(g2)) return false;
			if (Garis.minX(g1) > Garis.maxX(g2)) return false;

			if (Garis.maxY(g1) < Garis.minY(g2)) return false;
			if (Garis.minY(g1) > Garis.maxY(g2)) return false;

			return true;
		}

		static _tabrakan(g1: IGaris, g2: IGaris): boolean {
			let g1c: IGaris;
			let g2c: IGaris;
			let sudut: number;
			let x: number;
			let y: number;

			g1c = Garis.klon(g1);
			g2c = Garis.klon(g2);

			Garis.keAtas(g1c, false);
			sudut = Garis.sudut(g1c);

			x = g1c.v1.x;
			y = g1c.v1.y;

			Garis.putar(g2c, -sudut, x, y, false);
			Garis.putar(g1c, -sudut, x, y, false);

			if (!Garis.boundCollide(g1c, g2c)) return false;

			return true;
		}

		static tabrakan(g1: IGaris, g2: IGaris): boolean {

			if (Garis.boundCollide(g1, g2) == false) {
				return false;
			}

			if (!Garis._tabrakan(g1, g2)) return false;
			if (!Garis._tabrakan(g2, g1)) return false;

			return true;
		}

		//TODO: dep
		static collide2(g: IGaris, seg2: IGaris): boolean {
			let bound: boolean = Garis.boundCollide(g, seg2);
			if (!bound) return false;

			// let deg: number = ha.Segment.deg(seg2);
			let seg2Copy: IGaris = Garis.klon(seg2);
			let seg1Copy: IGaris = Garis.klon(g);
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

		static melewatiGarisX(g: IGaris, y: number = 0): boolean {
			if (Garis.maxY(g) > y) {
				if (Garis.minY(g) < y) {
					return true;
				}
			}

			return false;
		}

		static melewatiGarisY(g: IGaris): boolean {
			if (Garis.minX(g) < 0) {
				if (Garis.maxX(g) > 0) {
					return true;
				}
			}
			return false;
		}

	}

	//alias
	export const G: typeof Garis = Garis;
}