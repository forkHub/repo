namespace fg {
    export class Game {

        private pf: fg.PathFinder;
        private map: Array<string> = [];

        constructor() {
            let res: Array<any> = [];

            this.initMap();
            this.initPathFinding();

            res = this.pf.find(2, 2, 7, 2);
            console.log(res);

            res = this.pf.find(0, 0, 7, 0);
            console.log(res);

            res = this.pf.find(0, 0, 17, 17);
            console.log(res);

            res = this.pf.find(2, 2, 5, 2);
            console.log(res);
        }

        initPathFinding(): void {
            this.pf = new fg.PathFinder();
            this.pf.map = this.map;
        }

        initMap(): void {

            this.map = [
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