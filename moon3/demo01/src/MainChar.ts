namespace fg {
    export class MainChar {

        static readonly BERDIRI: number = 1;
        static readonly JALAN: number = 2;

        readonly pf: fg.PathFinder = new fg.PathFinder();
        readonly pfHelper: fg.PFHelper = new fg.PFHelper();
        readonly pos: fg.Point = new fg.Point();


        private ruteJalan: Array<any> = [];


        private _map: Map = new fg.Map();
        public get map(): Map {
            return this._map;
        }
        public set map(value: Map) {
            this._map = value;
        }

        readonly view: ISprite = MuatAnimasi('./gbr/jln.png', 32, 32);
        readonly seqs: Sequence[] = [];

        private state: number = 1;

        constructor() {
            this.initPathFinder();
        }

        initPathFinder() {
            this.pf.flBlocked = PathFinder.BL_TERDEKAT;
            this.pfHelper.langkahTotal = 10;
            this.pf.checkCanMoveToPos = (x: number, y: number): boolean => {
                return this.map.isPassable(x, y);
            }

            this.pf.checkSampai = (i: number, j: number, tx: number, ty: number): boolean => {
                var jrkX: number;
                var jrkY: number;

                jrkX = Math.abs(tx - i);
                jrkY = Math.abs(ty - j);

                if (jrkX == 0) {
                    if (jrkY <= 1) {
                        return true;
                    }
                }

                if (jrkY == 0) {
                    if (jrkX <= 1) {
                        return true;
                    }
                }

                return false;
            }

            this.pfHelper.updateArahCallBack = () => {
                this.updateAnim();
            }
        }

        updateAnim(): void {
            /*
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
            }*/
        }

        jalanKePos(i: number, j: number): void {
            if (!this.pfHelper.sedangJalan) {
                this.ruteJalan = this.pf.cari(Math.floor(this.pos.x / 32), Math.floor(this.pos.y / 32), i, j);
                if (this.ruteJalan.length > 0) {
                    this.pfHelper.start(this.ruteJalan);
                    this.updateAnim();
                    this.state = MainChar.JALAN;
                }
            }
        }

        updateView(): void {
            this.view.x = this.pos.x;
            this.view.y = this.pos.y;
        }

        update(): void {
            if (this.state == MainChar.BERDIRI) {
            }
            else {
                this.pfHelper.update();
                this.pos.x = this.pfHelper.pos.x;
                this.pos.y = this.pfHelper.pos.y;

                if (!this.pfHelper.sedangJalan) {
                    this.state = MainChar.BERDIRI;
                    // this.animation.gotoAndStop("berdiri");
                }
            }

            this.updateView();
        }

    }
}
