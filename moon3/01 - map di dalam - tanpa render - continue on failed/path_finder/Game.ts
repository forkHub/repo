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
            this.pf.map = this._map;
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