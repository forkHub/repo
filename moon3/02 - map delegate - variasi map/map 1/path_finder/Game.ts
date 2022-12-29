namespace fg {
	export class Game {

		private pf: fg.PathFinder;
		private _map: Array<Number> = [];

		constructor() {
			let res: Array<any> = [];

			this.initMap();
			this.initPathFinding();

			res = this.pf.find(2, 2, 7, 2);
			console.log(JSON.stringify(res));
		}


		initPathFinding(): void {
			this.pf = new fg.PathFinder();
			this.pf.checkCanMoveToPos = (x: number, y: number): Boolean => {
				let px: number = 10;
				let py: number = 7;
				let idx: number = (y * px) + x;

				if (x < 0) {
					return false;
				}
				if (y < 0) {
					return false;
				}

				if (x >= px) {
					return false;
				}

				if (y >= py) {
					return false;
				}

				if (this._map[idx] == 0) {
					return true;
				}
				else {
					return false;
				}
			}

		}


		initMap(): void {

			this._map = [
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				1, 0, 0, 0, 0, 1, 0, 0, 0, 1,
				1, 0, 0, 0, 0, 1, 0, 0, 0, 1,
				1, 0, 0, 0, 0, 1, 0, 0, 0, 1,
				1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1
			];

		}

	}
}