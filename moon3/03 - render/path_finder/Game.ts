///<reference path="js/easel.d.ts"/>
namespace fg {
    export class Game {

        private pf: fg.PathFinder;
        private _map: Array<string> = [];
        private stage: createjs.Stage;

        constructor() {
            let res: Array<any> = [];

            this.initMap();
            this.initPathFinding();
            this.initStage();

            res = this.pf.find(2, 2, 7, 2);

            this.stage.clear();
            this.drawWall();
            this.drawPath(res);
            this.stage.update();
        }

        initStage(): void {
            this.stage = new createjs.Stage("canvas");

            let shape: createjs.Shape = new createjs.Shape();
            shape.graphics.beginFill("#eeeeee");
            shape.graphics.rect(0, 0, 320, 240);
            this.stage.addChild(shape);
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
                "XXXXXXXXXX"
            ];

        }

        drawWall() {
            let i, j: number;
            let bmp: createjs.Bitmap;

            for (j = 0; j < this._map.length; j++) {
                for (i = 0; i < this._map[j].length; i++) {
                    if (this._map[j].charAt(i) == "X") {
                        bmp = new createjs.Bitmap(document.querySelector("img#box"));
                        bmp.x = i * 32;
                        bmp.y = j * 32;
                        this.stage.addChild(bmp);
                    }
                }
            }
        }

        drawPath(paths: Array<any>): void {
            let bmp: createjs.Bitmap;

            paths.forEach((obj) => {
                bmp = new createjs.Bitmap(document.querySelector("img#bola"));
                bmp.regX = 8;
                bmp.regY = 8;
                bmp.x = obj[0] * 32 + 16;
                bmp.y = obj[1] * 32 + 16;
                this.stage.addChild(bmp);
            })
        }
    }
}