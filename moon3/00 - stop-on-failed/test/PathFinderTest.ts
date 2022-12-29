///<reference path="../path_finder/js/Game.d.ts"/>
namespace fg {
    export class PathFinderTest {
        private pf: PathFinder = new PathFinder();

        private _map: Array<any> = [];
        public get map(): Array<any> {
            return this._map;
        }
        public set map(value: Array<any>) {
            this._map = value;
        }

        constructor() {
            this.init();
            this.testCheckCanMoveToPos();
            this.testCellPossible();
        }

        testCellPossible(): void {
            this.assert(this.pf.cellPosPossible(0, 0, []) == false, "cell is blocked at 0, 0");
        }

        testCheckCanMoveToPos(): void {
            this.assert(this.pf.checkCanMoveToPos(0, 0) == false, "cannot move to 0, 0");
            this.assert(this.pf.checkCanMoveToPos(1, 1) == true, "can move to 1, 1");
            this.assert(this.pf.checkCanMoveToPos(0, 4) == false, "cannot move to 0, 4");
            this.assert(this.pf.checkCanMoveToPos(-1, -1) == false, "cannot move to -1, -1");
            this.assert(this.pf.checkCanMoveToPos(0, 5) == false, "cannot move to 0, 5");
        }

        assert(b: Boolean, msg: string): void {
            if (!b) {
                throw new Error(msg);
            }
        }

        init() {
            this._map = [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ];

            this._map = this.mapReverse();

            this.pf.checkCanMoveToPos = (x: number, y: number): Boolean => {
                if (x < 0) {
                    return false;
                }
                if (y < 0) {
                    return false;
                }

                if (x >= this._map.length) {
                    return false;
                }

                if (y >= this._map[0].length) {
                    return false;
                }

                if (this._map[x][y] == 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }

        mapReverse(): Array<any> {
            let res: Array<any> = [];
            let i, j: number;

            for (i = 0; i < this._map.length; i++) {
                for (j = 0; j < this._map[0].length; j++) {
                    if (!res[j]) res[j] = [];
                    res[j][i] = this._map[i][j];
                }
            }

            return res;
        }





    }
}