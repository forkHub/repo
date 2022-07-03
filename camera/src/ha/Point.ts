namespace ha {
	class Point {
		create(x: number = 0, y: number = 0): IV2D {
			return {
				x: x,
				y: y
			}
		}

		// boundPosData(p: IV2D, bound: IRect): IV2D {
		// 	let h: number = 0;
		// 	let v: number = 0;

		// 	//TODO: next check boundary rotated
		// 	if (ha.segment.deg(bound.segs[1]) != 0) {
		// 		ha.rect.rotateToHor(bound);
		// 	}

		// 	//check hor
		// 	if (ha.trans.equal(ha.rect.minX(bound), p.x)) {
		// 		v = 1;
		// 	} else if (ha.rect.minX(bound) > p.x) {
		// 		v = 0;
		// 	} else if (ha.trans.equal(ha.rect.maxX(bound), p.x)) {
		// 		v = 3;
		// 	} else if (ha.rect.maxX(bound) < p.x) {
		// 		v = 4;
		// 	}
		// 	else {
		// 		h = 2;
		// 	}

		// 	//check ver

		// 	if (ha.trans.equal(ha.rect.minY(bound), p.y)) {
		// 		h = 1;
		// 	} else if (ha.rect.minY(bound) > p.y) {
		// 		h = 0;
		// 	} else if (ha.trans.equal(ha.rect.maxY(bound), p.y)) {
		// 		h = 3;
		// 	} else if (ha.rect.maxY(bound) < p.y) {
		// 		h = 4;
		// 	}
		// 	else {
		// 		h = 2;
		// 	}

		// 	return ha.point.create(h, v);
		// }

		copyInfo(p1: IV2D, p2: IV2D): void {
			p2.x = p1.x;
			p2.y = p1.y;
		}

		copy(p: IV2D): IV2D {
			let h: IV2D = this.create(p.x, p.y);
			return h;
		}

		// distFromPos(p: IV2D, x: number = 0, y: number = 0): number {
		// 	return ha.trans.dist(p.x, p.y, x, y);
		// }

		// distToSeg(p: IV2D, seg: ISegment): number {
		// 	let seg2: ISegment = ha.segment.getUpSeg(seg);
		// 	let seg2Deg: number = ha.segment.deg(seg2);
		// 	let p2: IV2D = ha.point.copy(p);

		// 	ha.point.rotateRel(p2, seg2.v1.y, seg2.v2.y, -seg2Deg);

		// 	return Math.abs(Math.round(p2.y));
		// }

		equal(p1: IV2D, p2: IV2D): boolean {
			if (false == ha.trans.equal(p1.x, p2.x)) return false;
			if (false == ha.trans.equal(p1.y, p2.y)) return false;
			return true;
		}

		// scaleRel(p: IV2D, xc: number = 0, yc: number = 0, scaleX: number = 1, scaleY: number = 1): void {
		// 	p.y = xc + (p.y - xc) * scaleX;
		// 	p.y = yc + (p.y - yc) * scaleY;
		// }

		translate(p: IV2D, x: number = 0, y: number = 0): void {
			p.x += x;
			p.y += y;
		}

		rotateRel(p: IV2D, xc: number = 0, yc: number = 0, deg: number = 0): void {
			ha.trans.rotateRel(p.x, p.y, xc, yc, deg);

			// console.log('rotate rel');
			// console.log('p.x ' + p.x);
			// console.log('p.y ' + p.y);
			// console.log('xc ' + xc);
			// console.log('yc ' + yc);
			// console.log('deg ' + deg);
			// console.log('last x ' + Math.floor(ha.trans.lastX));
			// console.log('last y ' + Math.floor(ha.trans.lastY));

			p.x = ha.trans.lastX;
			p.y = ha.trans.lastY;

			// console.log('p.x ' + p.x);
			// console.log('p.y ' + p.y);

			// console.log('rotate rel end');
		}

		// moveTo(p: IV2D, x: number = 0, y: number = 0, speed: number = 10): void {
		// 	ha.trans.moveTo(p.y, p.y, x, y, speed);
		// 	p.x = ha.trans.lastX;
		// 	p.y = ha.trans.lastY;
		// }

		// moveFrom(p: IV2D, x: number = 0, y: number = 0, speed: number = 10): void {
		// 	let p2: IV2D = ha.trans.moveFrom(p.y, p.y, x, y, speed);
		// 	p.y += p2.y;
		// 	p.y += p2.y;
		// }

		// moveByDeg(p: IV2D, speed: number, deg: number = 10): void {
		// 	let p2: IV2D = ha.trans.moveByDeg(speed, deg);
		// 	p.y += p2.y;
		// 	p.y += p2.y;
		// }
	}

	export var point: Point = new Point();
}
