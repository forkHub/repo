namespace ha.be {

	//internal
	export class Segment {

		static create(v1: IPoint2D = { x: 0, y: 0 }, v2: IPoint2D = { x: 0, y: 0 }): ISegment {
			return {
				v1: v1,
				v2: v2
			}
		}

		static boundCollide(seg1: ISegment, seg2: ISegment): boolean {
			if (Segment.maxX(seg1) < Segment.minX(seg2)) return false;
			if (Segment.minX(seg1) > Segment.maxX(seg2)) return false;

			if (Segment.maxY(seg1) < Segment.minY(seg2)) return false;
			if (Segment.minY(seg1) > Segment.maxY(seg2)) return false;

			return true;
		}

		static collide(seg1: ISegment, seg2: ISegment): boolean {
			let bound: boolean = Segment.boundCollide(seg1, seg2);
			if (!bound) return false;

			// let deg: number = Segment.deg(seg2);
			let seg2Copy: ISegment = Segment.clone(seg2);
			let seg1Copy: ISegment = Segment.clone(seg1);
			let deg: number = Segment.deg(seg2);

			Segment.rotate(seg2Copy, -deg, seg2.v1.x, seg2.v1.y);
			Segment.rotate(seg1Copy, -deg, seg2.v1.x, seg2.v1.y);

			if (!Segment.boundCollide(seg1Copy, seg2Copy)) return false;

			Segment.translate(seg1Copy, -seg2.v1.x, -seg2.v1.y);
			Segment.translate(seg2Copy, -seg2.v1.x, -seg2.v1.y);

			if (!Segment.crossHor(seg1Copy)) {
				return false;
			}

			let idx: number = Segment.xHorIdx(seg1Copy);
			let x: number = Segment.getXAtIdx(seg1Copy, idx);

			if (x > Segment.maxX(seg2Copy)) return false;
			if (x < Segment.minX(seg2Copy)) return false;

			return true;
		}

		static copy(seg1: ISegment, seg2: ISegment): void {
			Point.copy(seg1.v1, seg2.v2);
			Point.copy(seg1.v2, seg2.v2);
		}

		static clone(seg: ISegment): ISegment {
			return {
				v1: Point.clone(seg.v1),
				v2: Point.clone(seg.v2)
			}
		}

		static crossHor(seg: ISegment): boolean {
			if (Segment.maxY(seg) > 0) {
				if (Segment.minY(seg) < 0) {
					return true;
				}
			}

			return false;
		}

		static deg(line: ISegment): number {
			let j: number = line.v2.y - line.v1.y;
			let i: number = line.v2.x - line.v1.x;

			return Transform.sudut(i, j);
		}

		static getXAtIdx(seg: ISegment, idx: number): number {
			return seg.v1.x + (idx * Segment.vecI(seg));
		}

		static getYAtIdx(seg: ISegment, idx: number): number {
			return seg.v1.y + (idx * Segment.vecJ(seg));
		}

		static vecI(seg: ISegment): number {
			return seg.v2.x - seg.v1.x;
		}

		static vecJ(seg: ISegment): number {
			return seg.v2.y - seg.v1.y;
		}

		static rotate(seg: ISegment, deg: number = 0, xc: number = 0, yc: number = 0): void {
			Point.putarPoros(seg.v1, xc, yc, deg);
			Point.putarPoros(seg.v2, xc, yc, deg);
		}

		static minX(seg: ISegment): number {
			return Math.min(seg.v1.x, seg.v2.x);
		}

		static maxX(seg: ISegment): number {
			return Math.max(seg.v1.x, seg.v2.x);
		}

		static minY(seg: ISegment): number {
			return Math.min(seg.v1.y, seg.v2.y);
		}

		static maxY(seg: ISegment): number {
			return Math.max(seg.v1.y, seg.v2.y);
		}

		static translate(seg: ISegment, x: number = 0, y: number = 0) {
			seg.v1.x += x;
			seg.v1.y += y;
			seg.v2.x += x;
			seg.v2.y += y;
		}

		//tested
		static xHorIdx(seg: ISegment): number {
			if (!Segment.crossHor(seg)) return NaN;

			let idx: number = 0;
			idx = (0 - seg.v1.y) / (seg.v2.y - seg.v1.y)

			return idx;
		}
	}

}