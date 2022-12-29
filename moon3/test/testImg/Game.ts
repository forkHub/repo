///<reference path="js/easel.d.ts"/>
declare var Data: any;

namespace fg {
    export class Game {
        private stage: createjs.Stage;
        private y: number;

        constructor() {
            this.y = 0;
            this.initStage();
            this.loadImg();
            this.loadImg();
            this.loadImg();
            this.loadImg();
            this.loadImg();
            // if (this.y) {};
        }

        loadImg(): void {
            let img: HTMLImageElement = document.createElement('img');

            img.onload = () => {
                let sprite: createjs.Bitmap = new createjs.Bitmap(img);
                sprite.y = this.y;
                this.stage.addChild(sprite);
                this.y += 32;
            }
            img.src = 'images/box.png';
        }

        initStage(): void {
            this.stage = new createjs.Stage("canvas");

            //background
            let shape: createjs.Shape = new createjs.Shape();
            shape.graphics.beginFill("#eeeeee");
            shape.graphics.rect(0, 0, 320, 240);
            this.stage.addChild(shape);

            createjs.Ticker.on("tick", this.update.bind(this));
        }

        update(evt: createjs.TickerEvent): void {
            this.stage.update(evt);
        }


    }
}