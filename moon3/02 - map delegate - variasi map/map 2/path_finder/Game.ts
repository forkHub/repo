namespace fg {
	export class Game {

		private pf: fg.PathFinder;
		private _map: Array<Array<number>> = [];

		constructor() {
			let res: Array<any> = [];

			this.initMap();
			this.initPathFinding();

			res = this.pf.find(2, 2, 7, 2);
			console.log(res);
		}


		initPathFinding(): void {
			this.pf = new fg.PathFinder();
			this.pf.checkCanMoveToPos = (x: number, y: number): Boolean => {
				if (x < 0) {
					return false;
				}
				if (y < 0) {
					return false;
				}

				if (x >= this._map[0].length) {
					return false;
				}

				if (y >= this._map.length) {
					return false;
				}

				if (this._map[y][x] == 1) {
					return true;
				}
				else {
					return false;
				}
			}

		}


		initMap(): void {
			this._map = [
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
				[1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
				[1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
				[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			]

			// this._map = [
			//     "XXXXXXXXXX",
			//     "X        X",
			//     "X    X   X",
			//     "X    X   X",
			//     "X    X   X",
			//     "X        X",
			//     "XXXXXXXXXX",
			// ];

		}





	}
}