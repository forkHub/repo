namespace ha.fb {
	export class Konstrain {
		static readonly list: Konstrain[] = [];

		private b1: BolaObj;
		private b2: BolaObj;
		private jrk: number = 0;

		constructor(b1: BolaObj, b2: BolaObj) {
			this.b1 = b1;
			this.b2 = b2;
			this.jrk = ha.geom.Transform.jarak(this.b1.x, this.b1.y, this.b2.x, this.b2.y);
		}

		/**
		 * cari konstrain berdasarkan bola
		 * @param b bola
		 * @returns 
		 */
		static getByBola(b: BolaObj): Konstrain {
			return this.list.find((item) => {
				return (item.b1 == b || item.b2 == b)
			})
		}

		/**
		 * menghitung ulang jarak konstrain
		 */
		refresh(): void {
			this.jrk = ha.geom.Transform.jarak(this.b1.x, this.b1.y, this.b2.x, this.b2.y);
		}

		/**
		 * geser bola berdasarkan konstrain
		 * @param b1 bola
		 * @param b2 bola yang digeser
		 * @returns 
		 */
		geser(b1: BolaObj, b2: BolaObj): void {
			let jrk2Bola: number;
			let gap: number;
			let sdt: number;

			console.group('geser');

			jrk2Bola = ha.geom.Transform.jarak(b1.x, b1.y, b2.x, b2.y);
			gap = jrk2Bola - this.jrk;

			console.log('jrk bola: ', jrk2Bola, 'gap: ', gap, 'jrk k', this.jrk);

			if (Math.abs(gap) < .5) {
				console.groupEnd();
				return;
			}

			gap /= 2;
			sdt = ha.geom.Transform.deg(b2.x - b1.x, b2.y - b1.y);
			ha.geom.Transform.posPolar(this.jrk + (gap), sdt);

			console.log(
				'pos polar, x:', ha.geom.Transform.lastX,
				'y:', ha.geom.Transform.lastY);

			let b2x: number = b2.x;
			let b2y: number = b2.y;

			b2.x = b1.x + ha.geom.Transform.lastX;
			b2.y = b1.y + ha.geom.Transform.lastY;

			b1.x = b2x - ha.geom.Transform.lastX;
			b1.y = b2y - ha.geom.Transform.lastY;

			console.log('x ' + b2.x, 'y ' + b2.y);
			console.groupEnd();
		}

		/**
		 * update konstrain
		 */
		update(): void {
			this.geser(this.b1, this.b2);
			this.geser(this.b2, this.b1);
		}

		static buat(b1: BolaObj, b2: BolaObj): Konstrain {
			let h: Konstrain = new Konstrain(b1, b2);

			Konstrain.list.push(h);

			return h;
		}


	}
}