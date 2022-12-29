var fg;
(function (fg) {
    class Assert {
        static assertTrue(b, msg) {
            if (!b) {
                throw new Error(msg);
            }
            else {
                console.log("assert true");
            }
        }
    }
    fg.Assert = Assert;
})(fg || (fg = {}));
///<reference path="../path_finder/js/Game.d.ts"/>
var fg;
///<reference path="../path_finder/js/Game.d.ts"/>
(function (fg) {
    class PathFinderTest {
        constructor() {
            this.pf = new fg.PathFinder();
            this._map = [];
            this.init();
            this.testCheckCanMoveToPos();
            this.testCellPossible();
        }
        get map() {
            return this._map;
        }
        set map(value) {
            this._map = value;
        }
        testCellPossible() {
            this.assert(this.pf.cellPosPossible(0, 0, []) == false, "cell is blocked at 0, 0");
        }
        testCheckCanMoveToPos() {
            this.assert(this.pf.checkCanMoveToPos(0, 0) == false, "cannot move to 0, 0");
            this.assert(this.pf.checkCanMoveToPos(1, 1) == true, "can move to 1, 1");
            this.assert(this.pf.checkCanMoveToPos(0, 4) == false, "cannot move to 0, 4");
            this.assert(this.pf.checkCanMoveToPos(-1, -1) == false, "cannot move to -1, -1");
            this.assert(this.pf.checkCanMoveToPos(0, 5) == false, "cannot move to 0, 5");
        }
        assert(b, msg) {
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
            this.pf.checkCanMoveToPos = (x, y) => {
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
            };
        }
        mapReverse() {
            let res = [];
            let i, j;
            for (i = 0; i < this._map.length; i++) {
                for (j = 0; j < this._map[0].length; j++) {
                    if (!res[j])
                        res[j] = [];
                    res[j][i] = this._map[i][j];
                }
            }
            return res;
        }
    }
    fg.PathFinderTest = PathFinderTest;
})(fg || (fg = {}));
///<reference path="../path_finder/js/Game.d.ts"/>
///<reference path="Assert.ts"/>
var fg;
///<reference path="../path_finder/js/Game.d.ts"/>
///<reference path="Assert.ts"/>
(function (fg) {
    class PFHelperTest {
        // private _map: Array<any> = [];
        constructor() {
            this.test();
            this.pfTest = new fg.PathFinderTest();
            this.pfTest.init();
            // this._map = this.pfTest.map;
        }
        test() {
            this.testUpdate();
        }
        testUpdate() {
            let i;
            let data = [];
            // this.pf = new PathFinder();
            this.pfh = new fg.PFHelper();
            this.pfh.gridWidth = 10;
            this.pfh.gridHeight = 10;
            this.pfh.stepCount = 10;
            this.pfh.start([
                [0, 0],
                [0, 1]
            ]);
            for (i = 0; i < 60; i++) {
                if (this.pfh.aktif) {
                    this.pfh.update();
                    data.push([Math.floor(this.pfh.pos.x), Math.floor(this.pfh.pos.y)]);
                }
            }
            fg.Assert.assertTrue(JSON.stringify(data) === "[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10]]");
        }
    }
    fg.PFHelperTest = PFHelperTest;
})(fg || (fg = {}));
