class MainChar {
    constructor() {
        this.ruteJalan = [];
        this.state = 1;
    }
    get pos() {
        return this._pos;
    }
    get map() {
        return this._map;
    }
    set map(value) {
        this._map = value;
    }
    get view() {
        return this._view;
    }
    init() {
        this.pFind = new ha.pf.PathFinder();
        this.pfHelper = new ha.pf.PFHelper();
        this._pos = new ha.pf.Point();
        this._view = MuatAnimasi('./gbr/jln.png', 32, 32);
        this.initPathFinder();
    }
    initPathFinder() {
        this.pFind.flBlocked = ha.pf.PathFinder.BL_TERDEKAT;
        this.pfHelper.langkahTotal = 10;
        // this.pfHelper.
        this.pFind.checkCanMoveToPos = (x, y) => {
            return this.map.isPassable(x, y);
        };
        this.pFind.checkSampai = (i, j, tx, ty) => {
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
            this.ruteJalan = this.pFind.cari(Math.floor(this.pos.x / 32), Math.floor(this.pos.y / 32), i, j);
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
MainChar.BERDIRI = 1;
MainChar.JALAN = 2;
