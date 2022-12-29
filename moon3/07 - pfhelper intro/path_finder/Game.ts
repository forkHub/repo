///<reference path="js/easel.d.ts"/>
namespace fg {
    export class Game {

        private pf: fg.PathFinder;
        private pfHelper: fg.PFHelper;
        private _map: Array<string> = [];
        private stage: createjs.Stage;
        private posAwal: createjs.Point = new createjs.Point();
        private pathCont: createjs.Container = new createjs.Container();
        private ruteJalan: Array<any> = [];

        constructor() {

            this.initMap();
            this.initPathFinding();
            this.initStage();

            this.pathCont.mouseChildren = false;
            this.pathCont.mouseEnabled = false;

            this.posAwal = new createjs.Point(2, 2);
            this.pfHelper.pos.x = 2 * 32;
            this.pfHelper.pos.y = 2 * 32;
            this.drawChar();
            this.drawWall();
            this.stage.update();

            createjs.Ticker.on("tick", this.update.bind(this));
        }

        initStage(): void {
            this.stage = new createjs.Stage("canvas");
            this.stage.on("click", this.stageOnClick.bind(this));

            let shape: createjs.Shape = new createjs.Shape();
            shape.graphics.beginFill("#eeeeee");
            shape.graphics.rect(0, 0, 320, 240);
            this.stage.addChild(shape);
        }

        stageOnClick(evt: createjs.MouseEvent) {
            if (!this.pfHelper.sedangJalan) {

                this.ruteJalan = this.pf.find(this.posAwal.x, this.posAwal.y, Math.floor(evt.stageX / 32), Math.floor(evt.stageY / 32));
                if (this.ruteJalan.length > 0) {
                    this.pfHelper.start(this.ruteJalan);

                    let pos: Array<any>;
                    pos = this.ruteJalan[this.ruteJalan.length - 1];
                    this.posAwal.x = pos[0];
                    this.posAwal.y = pos[1];
                    console.log(this.ruteJalan);
                }
            }
        }

        langkahUpdate(): void {
            if (this.pfHelper.sedangJalan) {
                this.pfHelper.update();

                this.drawChar();
            }
        }

        update(evt: createjs.TickerEvent): void {
            this.langkahUpdate();
            this.stage.update(evt);
        }

        initPathFinding(): void {
            this.pfHelper = new fg.PFHelper();
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

        drawChar(): void {
            let bmp: createjs.Bitmap;

            this.pathCont.removeAllChildren();
            bmp = new createjs.Bitmap(document.querySelector("img#bola"));
            bmp.regX = 8;
            bmp.regY = 8;

            bmp.x = this.pfHelper.pos.x + 16;
            bmp.y = this.pfHelper.pos.y + 16;

            this.pathCont.addChild(bmp);
            this.stage.addChild(this.pathCont);
        }
    }
}