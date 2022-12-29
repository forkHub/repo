///<reference path="js/easel.d.ts"/>
declare var Data: any;

namespace fg {
    export class Game {
        private stage: createjs.Stage;
        private mainChar: fg.MainChar;
        private _map: Map = new fg.Map();

        constructor() {
            this.initStage();
            this.drawWall();

            this.mainChar = new MainChar();
            this.mainChar.pos.x = 2 * 32;
            this.mainChar.pos.y = 2 * 32;
            this.mainChar.updateView();
            this.mainChar.map = this._map;
            this.stage.addChild(this.mainChar.view);

            this.stage.update();
        }

        initStage(): void {
            this.stage = new createjs.Stage("canvas");
            this.stage.on("click", this.stageOnClick.bind(this));

            //background
            let shape: createjs.Shape = new createjs.Shape();
            shape.graphics.beginFill("#eeeeee");
            shape.graphics.rect(0, 0, 320, 240);
            this.stage.addChild(shape);

            createjs.Ticker.on("tick", this.update.bind(this));
            //this.update.bind(this);
        }

        stageOnClick(evt: createjs.MouseEvent) {
            this.mainChar.jalanKePos(Math.floor(evt.stageX / 32), Math.floor(evt.stageY / 32));
        }

        update(evt: createjs.TickerEvent): void {
            this.mainChar.update();
            this.stage.update(evt);
        }

        drawWall() {
            let bmp: createjs.Bitmap;

            for (let j:number = 0; j < this._map.height; j++) {
                for (let i:number = 0; i < this._map.width; i++) {
                    if (this._map.getCellValue(i, j) == 1) {
                        bmp = new createjs.Bitmap(document.querySelector("img#box"));
                        bmp.x = i * 32;
                        bmp.y = j * 32;
                        this.stage.addChild(bmp);
                    }
                }
            }
        }

    }
}