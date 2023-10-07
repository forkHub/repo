namespace ha.fb {
	export const JARAK_MIN = .001;

	class KonstrainObj {
		constructor(b1: BolaObj, b2: BolaObj) {
			this.b1 = b1;
			this.b2 = b2;
			this.jrk = ha.geom.Transform.jarak(this.b1.x, this.b1.y, this.b2.x, this.b2.y);
		}

		private _id: number;
		public get id(): number {
			return this._id;
		}
		public set id(value: number) {
			this._id = value;
		}

		private _b1: BolaObj;
		public get b1(): BolaObj {
			return this._b1;
		}
		public set b1(value: BolaObj) {
			this._b1 = value;
		}
		private _b2: BolaObj;
		public get b2(): BolaObj {
			return this._b2;
		}
		public set b2(value: BolaObj) {
			this._b2 = value;
		}
		private _jrk: number = 0;
		public get jrk(): number {
			return this._jrk;
		}
		public set jrk(value: number) {
			this._jrk = value;
		}

	}

	/**
	 * 
	 */
	class Konstrain {
		readonly list: KonstrainObj[] = [];

		/**
		 * cari konstrain berdasarkan bola
		 * @param b bola
		 * @returns 
		 */
		getByBola(b: BolaObj): KonstrainObj {
			return this.list.find((item) => {
				return (item.b1 == b || item.b2 == b)
			})
		}

		checkAda(b1: BolaObj, b2: BolaObj): boolean {
			let kt = this.getByBola(b1);
			if (!kt) return false;

			let kt2 = this.getByBola(b2);
			if (!kt) return false;

			if (kt != kt2) return false;

			return true;
		}

		/**
		 * menghitung ulang jarak konstrain
		 */
		refresh(obj: KonstrainObj): void {
			obj.jrk = ha.geom.Transform.jarak(obj.b1.x, obj.b1.y, obj.b2.x, obj.b2.y);
		}

		/**
		 * geser bola berdasarkan konstrain
		 * @param b1 bola
		 * @param b2 bola yang digeser
		 * @returns 
		 */
		geser(obj: KonstrainObj, b1: BolaObj, b2: BolaObj): void {
			let jrk2Bola: number;
			let gap: number;
			let sdt: number;

			// console.group('geser');

			jrk2Bola = ha.geom.Transform.jarak(b1.x, b1.y, b2.x, b2.y);
			gap = jrk2Bola - obj.jrk;

			// console.log('jrk bola: ', jrk2Bola, 'gap: ', gap, 'jrk k', obj.jrk);

			// if (Math.abs(gap) < JARAK_MIN) {
			// 	// console.groupEnd();
			// 	return;
			// }

			gap /= 2;
			sdt = ha.geom.Transform.sudut(b2.x - b1.x, b2.y - b1.y);
			ha.geom.Transform.posPolar(obj.jrk + (gap), sdt);

			// console.log(
			// 	'pos polar, x:', ha.geom.Transform.lastX,
			// 	'y:', ha.geom.Transform.lastY);

			let b2x: number = b2.x;
			let b2y: number = b2.y;

			b2.x = b1.x + ha.geom.Transform.lastX;
			b2.y = b1.y + ha.geom.Transform.lastY;

			b1.x = b2x - ha.geom.Transform.lastX;
			b1.y = b2y - ha.geom.Transform.lastY;

			// console.log('x ' + b2.x, 'y ' + b2.y);
			// console.groupEnd();
		}

		/**
		 * update konstrain
		 */
		updateObj(obj: KonstrainObj): void {
			this.geser(obj, obj.b1, obj.b2);
			this.geser(obj, obj.b2, obj.b1);
		}

		update(): void {
			this.list.forEach((item) => {
				this.updateObj(item);
			})
		}

		debug(ctx: CanvasRenderingContext2D, offx = 0, offy = 0): void {
			ctx.beginPath();

			this.list.forEach((item) => {
				ctx.moveTo(item.b1.x + offx, item.b1.y + offx);
				ctx.lineTo(item.b2.x + offy, item.b2.y + offy);
				let jrk: number = ha.geom.Transform.jarak(item.b1.x, item.b1.y, item.b2.x, item.b2.y);
				jrk = Math.floor(jrk);

				// ctx.fillText(jrk + "",
				// 	(item.b1.x + (item.b2.x - item.b1.x) / 2) + offx,
				// 	(item.b1.y + (item.b2.y - item.b1.y) / 2) + offy
				// );

			});

			ctx.stroke();
		}

		buat(b1: BolaObj, b2: BolaObj): KonstrainObj {
			let h: KonstrainObj = new KonstrainObj(b1, b2);

			this.list.push(h);

			return h;
		}


	}

	export const kt: Konstrain = new Konstrain();
}