namespace ha {

	//TODO: disederhanakan
	class Transform {
		readonly RAD2DEG: number = 180.0 / Math.PI;
		readonly DEG2RAD: number = Math.PI / 180.0;

		private _lastX: number = 0;
		private _lastY: number = 0;

		public get lastX(): number {
			return this._lastX;
		}
		public get lastY(): number {
			return this._lastY;
		}

		// clamp(n: number, m: number): number {
		// 	let m2 = Math.abs(m);
		// 	let n2 = Math.abs(n);
		// 	let h = Math.min(n2, m2);

		// 	if (n >= 0) return h;
		// 	return -h;
		// }

		create(): ITransform {
			return {
				pos: { x: 0, y: 0 },
				scale: { x: 1, y: 1 },
				rotation: 0
			}
		}

		equal(n1: number, n2: number, tol: number = 1): boolean {
			if (Math.abs(n1 - n2) <= tol) return true;
			// console.log("equal failed " + Math.abs(n1 - n2) + "/" + Math.abs(n1) + "/" + Math.abs(n2));
			return false;
		}

		quadDeg2(x: number, y: number, deg: number): number {
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

		// quadDeg(x: number, y: number): number {
		// 	// console.log('quad x: ' + x + '/y: ' + y);
		// 	if (x == 0) {
		// 		if (y >= 0) {
		// 			return 0; 
		// 		}
		// 		else {
		// 			return 0;
		// 		}
		// 	}
		// 	else if (x > 0) {
		// 		if (y >= 0) {
		// 			return 0;
		// 		}
		// 		else {
		// 			return 0;
		// 		}
		// 	}
		// 	else if (x < 0) {
		// 		if (y > 0) {
		// 			return 90;
		// 		}
		// 		else if (y == 0) {
		// 			return 180;
		// 		}
		// 		else {
		// 			return -90;
		// 		}
		// 	}
		// 	else {
		// 		console.log("error x :" + x + '/y: ' + y);
		// 		throw Error('');
		// 	}
		// }

		deg(x: number, y: number): number {
			let l: number;
			let s: number;

			l = Math.sqrt(x * x + y * y);
			if (l == 0) {
				l = .00001;
			}

			s = y / l;
			s = Math.asin(s);
			s *= this.RAD2DEG;
			// console.log('sudut ' + s);

			s = ha.trans.quadDeg2(x, y, s);
			// console.log('quad ' + s);

			// s = s + q;
			s = this.normalizeDeg(s);

			// console.log('deg x: ' + x + '/y: ' + y + '/hasil: ' + s);

			return s;
		}

		normalizeDeg(deg: number): number {
			// console.log('normalize anggle, input: ' + deg);

			while (deg >= 360) {
				deg -= 360;
			}

			while (deg <= -360) {
				deg += 360;
			}

			if (deg < 0) deg = 360 + deg;

			// console.log('normalize anggle, output: ' + deg);
			return deg;
		}

		degMaxDist(angleS: number = 0, angleT: number): number {
			angleS = this.normalizeDeg(angleS);
			angleT = this.normalizeDeg(angleT);

			let deg: number = this.degMinDist(angleS, angleT);
			if (deg >= 0) {
				return -(360 - deg);
			}
			else {
				return (360 - Math.abs(deg));
			}

			// if (angleT > angleS) {
			// 	if (angleT - angleS > 180) {
			// 		return angleT - angleS;
			// 	}
			// 	else {
			// 		return -(angleS + 360 - angleT);
			// 	}
			// }
			// else {
			// 	if (angleS - angleT > 180) {
			// 		return angleT - angleS;
			// 	}
			// 	else {
			// 		return 360 + angleT - angleS;
			// 	}
			// }
		}

		degMinDist(angleS: number = 0, angleT: number): number {
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

		//TODO: dihapus
		// vectorTo(x: number, y: number, xt: number, yt: number): IV2D {
		// 	let pjx: number = xt - x;
		// 	let pjy: number = yt - y;

		// 	this._lastX = pjx;
		// 	this._lastY = pjy;

		// 	return {
		// 		x: pjx,
		// 		y: pjy
		// 	}
		// }

		//TODO: disederhanakan
		// moveTo(x: number, y: number, xt: number, yt: number, clamp: number): void {
		// 	let pjx: number = xt - x;
		// 	let pjy: number = yt - y;
		// 	let pj: number = this.dist(x, y, xt, yt);
		// 	let perb: number = Math.abs(clamp) / pj;

		// 	this._lastX = x + perb * pjx;
		// 	this._lastY = y + perb * pjy;
		// }

		//TODO: disederhanakan
		// moveFrom(x: number = 0, y: number = 0, xt: number = 0, yt: number = 0, v: number = 0): IV2D {
		// 	let pjx: number = xt - x;
		// 	let pjy: number = yt - y;
		// 	let pj: number = this.dist(x, y, xt, yt);
		// 	let perb: number = Math.abs(v) / pj;

		// 	this._lastX = perb * -pjx;
		// 	this._lastY = perb * -pjy;

		// 	return {
		// 		x: this._lastX,
		// 		y: this._lastY
		// 	}
		// }

		//TODO: disederhankan, dimulai dari 0
		dist(x: number, y: number, xt: number, yt: number): number {
			let pjx: number = xt - x;
			let pjy: number = yt - y;
			return Math.sqrt(pjx * pjx + pjy * pjy);
		}

		rotateRel(x: number = 0, y: number = 0, xt: number = 0, yt: number = 0, deg: number = 10): void {
			let xr: number = x - xt;
			let yr: number = y - yt;
			let x1: number;
			let y1: number;

			// console.group('transform roteate rel:');
			// console.log('xr ' + xr + '/yr ' + yr);
			// console.log('deg ' + deg);

			deg *= ha.trans.DEG2RAD;

			x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
			y1 = xr * Math.sin(deg) + yr * Math.cos(deg);

			// console.log('x1 ' + Math.round(x1) + '/y1 ' + Math.round(y1));

			this._lastX = x1 + xt;
			this._lastY = y1 + yt;

			// console.log('last ' + Math.round(this._lastX) + '/' + Math.round(this._lastY));

			// console.groupEnd();
		}

		//TODO: dihapus
		// rotateFrom(x: number, y: number, tx: number, ty: number, rotNow: number): number {
		// 	let angle: number = this.deg(tx - x, ty - y);
		// 	let angleMin: number = this.degMaxDist(rotNow, angle);
		// 	return angleMin;
		// }

		//TODO: dihapus
		// rotateTo(x: number, y: number, tx: number = 0, ty: number = 0, rotNow: number = 0): number {
		// 	let angle: number = this.deg(tx - x, ty - y);
		// 	let angleMin: number = this.degMinDist(rotNow, angle);
		// 	return angleMin;
		// }



		// moveByDeg(speed: number = 10, deg: number = 10): IV2D {
		// 	deg *= this.DEG2RAD;

		// 	this._lastX = Math.cos(deg) * speed;
		// 	this._lastY = Math.sin(deg) * speed;

		// 	return {
		// 		x: this._lastX,
		// 		y: this._lastY
		// 	}
		// }

	}

	export var trans: Transform = new Transform();
}
