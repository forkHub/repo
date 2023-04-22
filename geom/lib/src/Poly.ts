namespace ha.geom {
	export class PolyObj {
		private vs: IPoint2D[] = [];

		constructor(vs: IPoint2D[]) {
			vs.forEach((item) => {
				this.vs.push(item);
			});
		}
	}

	class PlP {

	}

	export class Poly {
		private static pp: PlP = new PlP();

		static buat(p: IPoint2D[]): PolyObj {
			this.pp;
			return new PolyObj(p);
		}
	}


	const Pl: Poly = Poly;
	Pl;
}