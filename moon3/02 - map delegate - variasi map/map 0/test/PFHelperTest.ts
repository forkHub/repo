///<reference path="../path_finder/js/Game.d.ts"/>
///<reference path="Assert.ts"/>
namespace fg {
    export class PFHelperTest {

        private pfh: PFHelper;
        // private pf: PathFinder;
        private pfTest: PathFinderTest;
        // private _map: Array<any> = [];

        constructor() {
            this.test();
            this.pfTest = new PathFinderTest();
            this.pfTest.init();
            // this._map = this.pfTest.map;
        }

        test(): void {
            this.testUpdate();
        }

        testUpdate() {
            let i: number;
            let data: Array<any> = [];

            // this.pf = new PathFinder();

            this.pfh = new PFHelper();
            this.pfh.gridWidth = 10;
            this.pfh.gridHeight = 10;
            this.pfh.stepCount = 10;
            this.pfh.start(
                [
                    [0, 0],
                    [0, 1]
                ]);

            for (i = 0; i < 60; i++) {
                if (this.pfh.aktif) {
                    this.pfh.update();
                    data.push([Math.floor(this.pfh.pos.x), Math.floor(this.pfh.pos.y)]);
                }
            }

            Assert.assertTrue(JSON.stringify(data) === "[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10]]");

        }



    }
}