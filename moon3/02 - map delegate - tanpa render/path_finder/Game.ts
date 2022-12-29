namespace fg {
    export class Game {

        private pf: fg.PathFinder;
        private _map: Array<string> = [];

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

        }


        initMap(): void {

            this._map = [
                "XXXXXXXXXX",
                "X        X",
                "X    X   X",
                "X    X   X",
                "X    X   X",
                "X        X",
                "XXXXXXXXXX",
            ];

        }





    }
}