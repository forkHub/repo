namespace fg {
    export class Map {
        readonly map: Array<string> = [];

        getCellValue(i: number, j: number): number {
            if (this.map[j].charAt(i) == "X") {
                return 1;
            }
            return 0;
        }

        setMap(maps: string[]) {
            while (this.map.length > 0) {
                this.map.pop();
            }

            maps.forEach((item: string) => {
                this.map.push(item);
            })
        }

        isPassable(x: number, y: number): boolean {
            if (x < 0) {
                return false;
            }
            if (y < 0) {
                return false;
            }

            if (x >= this.map[y].length) {
                return false;
            }

            if (y >= this.map.length) {
                return false;
            }

            if (this.map[y].charAt(x) == " ") {
                return true;
            }
            else {
                return false;
            }

        }

        public get width(): number {
            return this.map[0].length;
        }

        public get height(): number {
            return this.map.length;
        }

    }
}