///<reference path="js/easel.d.ts"/>
declare var Data;

namespace fg {
    export class Game {
        private stage: createjs.Stage;
        private pathCont: createjs.Container = new createjs.Container();
        private mainChar: fg.MainChar;
        private _map: Array<string> = Data.map;

        constructor() {

            this.initStage();

            this.pathCont.mouseChildren = false;
            this.pathCont.mouseEnabled = false;

            this.mainChar = new MainChar();
            this.mainChar.pos.x = 2 * 32;
            this.mainChar.pos.y = 2 * 32;
            this.mainChar.map = this._map;

            this.drawChar();
            this.drawWall();
            this.stage.update();

            createjs.Ticker.on("tick", this.update.bind(this));
        }

        initStage(): void {
            this.stage = new createjs.Stage("canvas");
            this.stage.on("click", this.stageOnClick.bind(this));

            //background
            let shape: createjs.Shape = new createjs.Shape();
            shape.graphics.beginFill("#eeeeee");
            shape.graphics.rect(0, 0, 320, 240);
            this.stage.addChild(shape);
        }

        stageOnClick(evt: createjs.MouseEvent) {
            this.mainChar.jalanKePos(Math.floor(evt.stageX / 32), Math.floor(evt.stageY / 32));
        }

        update(evt: createjs.TickerEvent): void {
            this.mainChar.update();
            this.drawChar();
            this.stage.update(evt);
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

            bmp.x = this.mainChar.pos.x + 16;
            bmp.y = this.mainChar.pos.y + 16;

            this.pathCont.addChild(bmp);
            this.stage.addChild(this.pathCont);
        }
    }
}