namespace fg {
    export class MainChar {

        static readonly BERDIRI: number = 1;
        static readonly JALAN: number = 2;

        private pf: fg.PathFinder;
        private pfHelper: fg.PFHelper;
        private ruteJalan: Array<any> = [];
        private _pos: fg.Point = new fg.Point();
        private _map: Array<string> = [];
        private _view: createjs.Container = new createjs.Container();
        private animation: createjs.Sprite;
        private state: number = 1;

        constructor() {
            this.initPathFinder();
            this.initAnim();
        }

        initAnim(): void {
            let data = {
                images: [document.getElementById("jalan")],
                frames: { width: 32, height: 32 },
                animations: {
                    berdiri: 1,
                    jalan: {
                        frames: [0, 1, 2, 1],
                        speed: .5
                    }
                }
            };

            let spriteSheet: createjs.SpriteSheet = new createjs.SpriteSheet(data);
            this.animation = new createjs.Sprite(spriteSheet, "berdiri");
            this._view.addChild(this.animation);
            this._view.mouseEnabled = false;
        }

        initPathFinder() {
            this.pf = new fg.PathFinder();
            this.pfHelper = new PFHelper();
            this.pfHelper.langkahTotal = 10;
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

        jalanKePos(i: number, j: number): void {
            if (!this.pfHelper.sedangJalan) {
                this.ruteJalan = this.pf.find(Math.floor(this._pos.x / 32), Math.floor(this._pos.y / 32), i, j);
                if (this.ruteJalan.length > 0) {
                    this.pfHelper.start(this.ruteJalan);
                    this.animation.gotoAndPlay("jalan");
                    this.state = MainChar.JALAN;
                }
            }
        }

        updateView(): void {
            this._view.x = this._pos.x;
            this._view.y = this._pos.y;
        }

        update(): void {
            if (this.state == MainChar.BERDIRI) {
            }
            else {
                this.pfHelper.update();
                this._pos.x = this.pfHelper.pos.x;
                this._pos.y = this.pfHelper.pos.y;

                if (!this.pfHelper.sedangJalan) {
                    this.state = MainChar.BERDIRI;
                    this.animation.gotoAndStop("berdiri");
                }
            }

            this.updateView();
        }

        public get map(): Array<string> {
            return this._map;
        }
        public set map(value: Array<string>) {
            this._map = value;
        }

        public get pos(): fg.Point {
            return this._pos;
        }
        public set pos(value: fg.Point) {
            this._pos = value;
        }

        public get view(): createjs.Container {
            return this._view;
        }

        public set view(value: createjs.Container) {
            this._view = value;
        }

    }
}
