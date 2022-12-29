namespace fg {
    export class MainChar {

        static readonly BERDIRI: number = 1;
        static readonly JALAN: number = 2;

        private pf: fg.PathFinder;
        private pfHelper: fg.PFHelper;
        private ruteJalan: Array<any> = [];
        private _pos: fg.Point = new fg.Point();
        private _map: Map;
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
                    berdiri: 2,
                    jalanka: {
                        frames: [5, 3, 5, 4],
                        speed: .5
                    },
                    jalanba: {
                        frames: [2, 0, 2, 1],
                        speed: .5
                    },
                    jalanat: {
                        frames: [11, 9, 11, 10],
                        speed: .5
                    },
                    jalanki: {
                        frames: [8, 6, 8, 7],
                        speed: .5
                    },
                    jalankaat: {
                        frames: [11, 9, 11, 10],
                        speed: .5
                    },
                    jalankaba: {
                        frames: [17, 15, 17, 16],
                        speed: .5
                    },
                    jalankiat: {
                        frames: [11, 9, 11, 10],
                        speed: .5
                    },
                    jalankiba: {
                        frames: [14, 12, 14, 13],
                        speed: .5
                    }
                }
            };

            let spriteSheet: createjs.SpriteSheet = new createjs.SpriteSheet(data);
            this.animation = new createjs.Sprite(spriteSheet, "jalanka");
            this._view.addChild(this.animation);
            this._view.mouseEnabled = false;
        }

        initPathFinder() {
            this.pf = new fg.PathFinder();
            this.pf.flBlocked = PathFinder.BL_TERDEKAT;
            this.pfHelper = new PFHelper();
            this.pfHelper.langkahTotal = 10;
            this.pf.checkCanMoveToPos = (x: number, y: number): boolean => {
                return this._map.isPassable(x, y);
            }

            this.pf.checkSampai = (i: number, j: number, tx: number, ty: number): boolean => {
                var jrkX: number;
                var jrkY: number;

                jrkX = Math.abs(tx - i);
                jrkY = Math.abs(ty - j);

                return (jrkX < 3) && (jrkY < 3);
            }

            this.pfHelper.updateArahCallBack = () => {
                this.updateAnim();
            }
        }

        updateAnim(): void {
            // console.log('arah ' + this.pfHelper.arah);
            if (this.pfHelper.arah == PFHelper.ATAS && (this.animation.currentAnimation != "jalanat")) {
                this.animation.gotoAndPlay("jalanat");
            }
            else if (this.pfHelper.arah == PFHelper.KANAN && (this.animation.currentAnimation != "jalanka")) {
                this.animation.gotoAndPlay("jalanka");
            }
            else if (this.pfHelper.arah == PFHelper.BAWAH && (this.animation.currentAnimation != "jalanba")) {
                this.animation.gotoAndPlay("jalanba");
            }
            else if (this.pfHelper.arah == PFHelper.KIRI && (this.animation.currentAnimation != "jalanki")) {
                this.animation.gotoAndPlay("jalanki");
            }
            else if (this.pfHelper.arah == PFHelper.KANAN_ATAS && (this.animation.currentAnimation != "jalankaat")) {
                this.animation.gotoAndPlay("jalankaat");
            }
            else if (this.pfHelper.arah == PFHelper.KANAN_BAWAH && (this.animation.currentAnimation != "jalankaba")) {
                // console.log('anim jalan kanan bawah');
                this.animation.gotoAndPlay("jalankaba");
            }
            else if (this.pfHelper.arah == PFHelper.KIRI_ATAS && (this.animation.currentAnimation != "jalankiat")) {
                // console.log('anim jalan kiri atas');
                this.animation.gotoAndPlay("jalankiat");
            }
            else if (this.pfHelper.arah == PFHelper.KIRI_BAWAH && (this.animation.currentAnimation != "jalankiba")) {
                this.animation.gotoAndPlay("jalankiba");
            }
        }

        jalanKePos(i: number, j: number): void {
            if (!this.pfHelper.sedangJalan) {
                this.ruteJalan = this.pf.find(Math.floor(this._pos.x / 32), Math.floor(this._pos.y / 32), i, j);
                if (this.ruteJalan.length > 0) {
                    this.pfHelper.start(this.ruteJalan);
                    this.updateAnim();
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

        public set map(value: Map) {
            this._map = value;
        }

    }
}
