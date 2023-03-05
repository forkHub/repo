var fg;
(function (fg) {
    class MainChar {
        static BERDIRI = 1;
        static JALAN = 2;
        pf = new fg.PathFinder();
        pfHelper = new fg.PFHelper();
        pos = new fg.Point();
        ruteJalan = [];
        _map = new fg.Map();
        get map() {
            return this._map;
        }
        set map(value) {
            this._map = value;
        }
        view = MuatAnimasi('./gbr/jln.png', 32, 32);
        state = 1;
        constructor() {
            this.initPathFinder();
        }
        initPathFinder() {
            this.pf.flBlocked = fg.PathFinder.BL_TERDEKAT;
            this.pfHelper.langkahTotal = 10;
            // this.pfHelper.
            this.pf.checkCanMoveToPos = (x, y) => {
                return this.map.isPassable(x, y);
            };
            this.pf.checkSampai = (i, j, tx, ty) => {
                var jrkX;
                var jrkY;
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
            };
        }
        jalanKePos(i, j) {
            if (!this.pfHelper.sedangJalan) {
                this.ruteJalan = this.pf.cari(Math.floor(this.pos.x / 32), Math.floor(this.pos.y / 32), i, j);
                if (this.ruteJalan.length > 0) {
                    this.pfHelper.start(this.ruteJalan);
                    // this.updateAnim();
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
                //kosong
            }
            else {
                this.pfHelper.update();
                this.pos.x = this.pfHelper.pos.x;
                this.pos.y = this.pfHelper.pos.y;
                if (!this.pfHelper.sedangJalan) {
                    this.state = MainChar.BERDIRI;
                }
            }
            this.updateView();
        }
    }
    fg.MainChar = MainChar;
})(fg || (fg = {}));
