namespace ha.geom {
	/**
	 * menghitung geometri relative terhadap titik 0
	 */
	export class Transform {
		static readonly RAD2DEG: number = 180.0 / Math.PI;
		static readonly DEG2RAD: number = Math.PI / 180.0;

		private static _lastX: number = 0;
		private static _lastY: number = 0;

		public static get lastX(): number {
			return Transform._lastX;
		}
		public static get lastY(): number {
			return Transform._lastY;
		}

		static sama(n1: number, n2: number, toleransi: number = 1): boolean {
			if (Math.abs(n1 - n2) <= toleransi) return true;
			return false;
		}

		private static quadDeg2(x: number, y: number, deg: number): number {
			if (x == 0) {
				if (y == 0) {
					return deg;
				}
				else if (y > 0) {
					return deg;
				}
				else if (y < 0) {
					return 360 - Math.abs(deg);
				}
			}
			else if (x > 0) {
				if (y == 0) {
					return deg;
				}
				else if (y > 0) {
					return deg;
				}
				else if (y < 0) {
					return 360 - Math.abs(deg);
				}
			}
			else if (x < 0) {
				if (y == 0) {
					return 180;
				}
				else if (y > 0) {
					return 180 - Math.abs(deg);
				}
				else if (y < 0) {
					return 180 + Math.abs(deg);
				}
			}

			throw Error();
		}

		static sudut(x: number, y: number): number {
			let l: number;
			let sin: number;

			l = Math.sqrt(x * x + y * y);
			if (l == 0) {
				l = .00001;
			}

			sin = y / l;
			sin = Math.asin(sin);
			sin *= Transform.RAD2DEG;
			sin = Transform.quadDeg2(x, y, sin);
			sin = Transform.normalizeDeg(sin);

			return sin;
		}

		private static normalizeDeg(deg: number): number {

			while (deg >= 360) {
				deg -= 360;
			}

			while (deg <= -360) {
				deg += 360;
			}

			if (deg < 0) deg = 360 + deg;

			return deg;
		}

		//TODO: refaktor
		static degDistMax(angleS: number = 0, angleT: number): number {
			angleS = Transform.normalizeDeg(angleS);
			angleT = Transform.normalizeDeg(angleT);

			let deg: number = Transform.degDistMin(angleS, angleT);
			if (deg >= 0) {
				return -(360 - deg);
			}
			else {
				return (360 - Math.abs(deg));
			}
		}

		//TODO: refaktor
		static degDistMin(angleS: number = 0, angleT: number): number {
			angleS = Transform.normalizeDeg(angleS);
			angleT = Transform.normalizeDeg(angleT);

			if (angleT >= angleS) {
				if (angleT - angleS > 180) {
					return -(angleS + 360 - angleT);
				}
				else {
					return angleT - angleS;
				}
			}
			else {
				if (angleS - angleT >= 180) {
					return 360 + angleT - angleS;
				}
				else {
					return angleT - angleS;
				}
			}
		}

		//TODO: refaktor
		static jarak(x: number, y: number, xt: number, yt: number): number {
			let pjx: number = xt - x;
			let pjy: number = yt - y;
			return Math.sqrt(pjx * pjx + pjy * pjy);
		}

		//TODO: refaktor
		static rotateRel(x: number = 0, y: number = 0, xt: number = 0, yt: number = 0, deg: number = 10): void {
			let xr: number = x - xt;
			let yr: number = y - yt;
			let x1: number;
			let y1: number;

			deg *= Transform.DEG2RAD;

			x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
			y1 = xr * Math.sin(deg) + yr * Math.cos(deg);

			Transform._lastX = x1 + xt;
			Transform._lastY = y1 + yt;
		}

		static posPolar(jrk: number, sdt: number): void {
			let sdtrad: number = sdt * Transform.DEG2RAD;
			Transform._lastX = Math.cos(sdtrad) * jrk;
			Transform._lastY = Math.sin(sdtrad) * jrk;
		}

		//dorong
		//tarik

	}
}
