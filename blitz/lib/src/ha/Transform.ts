namespace ha {

	export class Transform {
		static readonly RAD2DEG: number = 180.0 / Math.PI;
		static readonly DEG2RAD: number = Math.PI / 180.0;

		private static _lastX: number = 0;
		private static _lastY: number = 0;

		public static get lastX(): number {
			return this._lastX;
		}
		public static get lastY(): number {
			return this._lastY;
		}

		static equal(n1: number, n2: number, toleransi: number = 1): boolean {
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

		static deg(x: number, y: number): number {
			let l: number;
			let sin: number;

			l = Math.sqrt(x * x + y * y);
			if (l == 0) {
				l = .00001;
			}

			sin = y / l;
			sin = Math.asin(sin);
			sin *= this.RAD2DEG;
			sin = this.quadDeg2(x, y, sin);
			sin = this.normalizeDeg(sin);

			return sin;
		}

		static normalizeDeg(deg: number): number {

			while (deg >= 360) {
				deg -= 360;
			}

			while (deg <= -360) {
				deg += 360;
			}

			if (deg < 0) deg = 360 + deg;

			return deg;
		}

		static degDistMax(angleS: number = 0, angleT: number): number {
			angleS = this.normalizeDeg(angleS);
			angleT = this.normalizeDeg(angleT);

			let deg: number = this.degDistMin(angleS, angleT);
			if (deg >= 0) {
				return -(360 - deg);
			}
			else {
				return (360 - Math.abs(deg));
			}
		}

		static degDistMin(angleS: number = 0, angleT: number): number {
			angleS = this.normalizeDeg(angleS);
			angleT = this.normalizeDeg(angleT);

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

		static jarak(x: number, y: number, xt: number, yt: number): number {
			let pjx: number = xt - x;
			let pjy: number = yt - y;
			return Math.sqrt(pjx * pjx + pjy * pjy);
		}

		static rotateRel(x: number = 0, y: number = 0, xt: number = 0, yt: number = 0, deg: number = 10): void {
			let xr: number = x - xt;
			let yr: number = y - yt;
			let x1: number;
			let y1: number;

			deg *= this.DEG2RAD;

			x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
			y1 = xr * Math.sin(deg) + yr * Math.cos(deg);

			this._lastX = x1 + xt;
			this._lastY = y1 + yt;
		}
	}
}
