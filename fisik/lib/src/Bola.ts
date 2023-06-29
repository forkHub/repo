namespace ha.fb {

	class Id {
		private _id: number = 0;

		public get id(): number {
			this._id++;
			return this._id;
		}

	}

	/**
	 * 
	 */
	export class BolaObj {
		private _r: number = 10;
		private _x: number = 0;
		private _y: number = 0;
		private _groupId: number = 0;

		public get groupId(): number {
			return this._groupId;
		}
		public set groupId(value: number) {
			this._groupId = value;
		}

		public get y(): number {
			return this._y;
		}
		public set y(value: number) {
			this._y = value;
		}

		public get x(): number {
			return this._x;
		}
		public set x(value: number) {
			this._x = value;
		}

		public get r(): number {
			return this._r;
		}
		public set r(value: number) {
			this._r = value;
		}
	}

	class Bola {
		readonly bolaAr: BolaObj[] = [];

		constructor() {

		}

		update(): void {
			for (let i: number = 0; i < this.bolaAr.length; i++) {
				for (let j: number = i + 1; j < this.bolaAr.length; j++) {
					let b1 = this.bolaAr[i];
					let b2 = this.bolaAr[j];
					this.geser(b1, b2);
				}
			}
		}

		/**
		 * check apakah dua bola bersinggungan
		 * @param b1 
		 * @param b2 
		 * @returns boolean 
		 */
		singgung(b1: BolaObj, b2: BolaObj): boolean {

			let jrk: number = ha.geom.Transform.jarak(b1.x, b1.y, b2.x, b2.y);
			let jrkMin: number = b1.r + b2.r;
			// let jrkAbs: number = Math.abs(jrk - jrkMin);

			if (jrkMin > jrk) {
				return true;
			}

			return false;
		}

		/**
		 * geser bola bila bersinggungan
		 * @param b1 
		 * @param b2 
		 * @returns 
		 */
		geser(b1: BolaObj, b2: BolaObj): void {
			if (b1.groupId == b2.groupId) return;
			if (!this.singgung(b1, b2)) return;

			// console.group('geser');
			// console.log(b1.x, b1.y, b2.x, b2.y);

			//jarak hor dan ver
			let hor: number = b2.x - b1.x;
			let ver: number = b2.y - b1.y;
			// console.log('hor: ', hor, '/ver: ', ver);

			//posisi tengah
			let tengahX = hor / 2 + b1.x;
			let tengahY = ver / 2 + b1.y;
			// console.log('tengah x: ', tengahX, '/tengah y: ', tengahY);

			let jrkMin: number = b1.r + b2.r + 1;
			let jrk: number = ha.geom.Transform.jarak(b1.x, b1.y, b2.x, b2.y);
			let ratio: number;

			if (jrk > jrkMin) {
				ratio = jrk / jrkMin;
			}
			else {
				ratio = (jrkMin / jrk);

				//geser b2
				let hor2: number;
				let ver2: number;

				hor2 = b2.x - tengahX;
				ver2 = b2.y - tengahY;
				hor2 *= ratio;
				ver2 *= ratio;

				b2.x = tengahX + hor2;
				b2.y = tengahY + ver2;
				// console.log('b2 pos: ', b2.x, b2.y);

				//geser b1
				hor2 = b1.x - tengahX;
				ver2 = b1.y - tengahY;
				hor2 *= ratio;
				ver2 *= ratio;

				b1.x = tengahX + hor2;
				b1.y = tengahY + ver2;
				// console.log('b1 pos: ', b1.x, b1.y);
				// console.groupEnd();
			}

			// console.log('jrk min: ', jrkMin, '/jrk : ', jrk, '/ratio: ', ratio);
		}

		buatBola(): BolaObj {
			let hsl: BolaObj = new BolaObj();

			this.bolaAr.push(hsl);

			return hsl;
		}

	}

	export const bola: Bola = new Bola();
	export const id: Id = new Id();
}