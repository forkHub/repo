var fg;
(function (fg) {
    class MainChar {
        static BERDIRI = 1;
        static JALAN = 2;
        pf = new fg.PathFinder();
        pfHelper = new fg.PFHelper();
        ruteJalan = [];
        pos = new fg.Point();
        _map = new fg.Map();
        get map() {
            return this._map;
        }
        set map(value) {
            this._map = value;
        }
        view = MuatAnimasi('./gbr/jln.png', 32, 32);
        seqs = [];
        state = 1;
        constructor() {
            this.initPathFinder();
        }
        initPathFinder() {
            this.pf.flBlocked = fg.PathFinder.BL_TERDEKAT;
            this.pfHelper.langkahTotal = 10;
            this.pf.checkCanMoveToPos = (x, y) => {
                return this.map.isPassable(x, y);
            };
            this.pf.checkSampai = (i, j, tx, ty) => {
                var jrkX;
                var jrkY;
                jrkX = Math.abs(tx - i);
                jrkY = Math.abs(ty - j);
                return (jrkX < 3) && (jrkY < 3);
            };
            this.pfHelper.updateArahCallBack = () => {
                this.updateAnim();
            };
        }
        updateAnim() {
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
        jalanKePos(i, j) {
            if (!this.pfHelper.sedangJalan) {
                this.ruteJalan = this.pf.cari(Math.floor(this.pos.x / 32), Math.floor(this.pos.y / 32), i, j);
                if (this.ruteJalan.length > 0) {
                    this.pfHelper.start(this.ruteJalan);
                    this.updateAnim();
                    this.state = MainChar.JALAN;
                }
            }
        }
        updateView() {
            this.view.x = this.pos.x;
            this.view.y = this.pos.y;
        }
        update() {
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
    fg.MainChar = MainChar;
})(fg || (fg = {}));
