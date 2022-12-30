namespace fg {
    export class Map {
        private _map: Array<string> = Data.map;

        getCellValue(i: number, j: number): number {
            if (this._map[j].charAt(i) == "X") {
                return 1;
            }
            return 0;
        }

        isPassable(x: number, y: number): boolean {
            if (x < 0) {
                return false;
            }
            if (y < 0) {
                return false;
            }

            if (x >= this._map[y].length) {
                return false;
            }

            if (y >= this._map.length) {
                return false;
            }

            if (this._map[y].charAt(x) == " ") {
                return true;
            }
            else {
                return false;
            }

        }

        public get width(): number {
            return this._map[0].length;
        }

        public get height(): number {
            return this._map.length;
        }

    }
}