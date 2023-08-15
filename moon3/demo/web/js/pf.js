var ha;
(function (ha) {
    var pf;
    (function (pf) {
        class PFCell {
            constructor() {
                this._dist = 0;
                this._x = 0;
                this._y = 0;
                this._idx = -1;
                this._open = true;
            }
            PFCell() { }
            destroy() {
                this._parent = null;
            }
            toStringRef() {
                return "[" + this._x + "-" + this._y + "]";
            }
            get dist() {
                return this._dist;
            }
            set dist(value) {
                this._dist = value;
            }
            get x() {
                return this._x;
            }
            set x(value) {
                this._x = value;
            }
            get y() {
                return this._y;
            }
            set y(value) {
                this._y = value;
            }
            get idx() {
                return this._idx;
            }
            set idx(value) {
                this._idx = value;
            }
            get open() {
                return this._open;
            }
            set open(value) {
                this._open = value;
            }
            get parent() {
                return this._parent;
            }
            set parent(value) {
                this._parent = value;
            }
        }
        pf.PFCell = PFCell;
    })(pf = ha.pf || (ha.pf = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var pf;
    (function (pf) {
        class PFHelper {
            constructor() {
                this.ruteJalan = [];
                this._cellWidth = 32;
                this._cellHeight = 32;
                this._langkahTotal = 3;
                this._langkahIdx = 0;
                this.jalanIdx = 0;
                this._pos = new pf.Point();
                this.posTemp = new pf.Point();
                this._arah = PFHelper.BAWAH;
                this._sedangJalan = false;
            }
            reset() {
                this._sedangJalan = false;
            }
            start(data) {
                if (data.length == 0) {
                    throw new Error();
                }
                this.ruteJalan = data;
                this._sedangJalan = true;
                this.jalanIdx = 0;
                this.updateArah();
                this._pos.x = data[0][0] * this._cellWidth;
                this._pos.y = data[0][1] * this._cellHeight;
            }
            updateArah() {
                let x1;
                let y1;
                let x2;
                let y2;
                if (this.jalanIdx >= this.ruteJalan.length - 1) {
                    return;
                }
                x1 = this.ruteJalan[this.jalanIdx][0];
                y1 = this.ruteJalan[this.jalanIdx][1];
                x2 = this.ruteJalan[this.jalanIdx + 1][0];
                y2 = this.ruteJalan[this.jalanIdx + 1][1];
                // console.log("x2 " + x2 + '/y2 ' + y2 + '/x1 ' + x1 + '/y1 ' + y1);
                // console.log(y1 + '-' + x1 + '/' + y2 + '-' + x2);
                if (x1 == x2) {
                    if (y1 > y2) {
                        this._arah = PFHelper.ATAS;
                        return;
                    }
                    else if (y1 < y2) {
                        this._arah = PFHelper.BAWAH;
                        return;
                    }
                }
                else if (y1 == y2) {
                    if (x1 > x2) {
                        this._arah = PFHelper.KIRI;
                        return;
                    }
                    else if (x1 < x2) {
                        this._arah = PFHelper.KANAN;
                        return;
                    }
                }
                else if (x1 > x2) {
                    //kiri - atas
                    if (y1 > y2) {
                        this._arah = PFHelper.KIRI_ATAS;
                        // console.log('kiri atas');
                        return;
                    }
                    //kiri - bawah
                    else if (y1 < y2) {
                        this._arah = PFHelper.KIRI_BAWAH;
                        return;
                    }
                }
                else if (x1 < x2) {
                    //kanan-atas
                    if (y1 > y2) {
                        this._arah = PFHelper.KANAN_ATAS;
                        return;
                    }
                    //kanan-bawah
                    else if (y1 < y2) {
                        this._arah = PFHelper.KANAN_BAWAH;
                        // console.log('kanan bawah');
                        return;
                    }
                }
                throw new Error();
            }
            // console.log("WARN: arah tidak terdefinisi x1 " + x1 + '/y1 ' + y1 + '/x2' + x2 + '/y2 ' + y2);
            // console.log('rute jalan: ' + this.ruteJalan);
            // console.log('jalan idx ' + this.jalanIdx);
            updatePos() {
                this._pos.x = this.ruteJalan[this.jalanIdx][0] * this._cellWidth;
                this._pos.y = this.ruteJalan[this.jalanIdx][1] * this._cellHeight;
                if (this.jalanIdx < this.ruteJalan.length - 1) {
                    this.posTemp.x = this.ruteJalan[this.jalanIdx + 1][0] * this._cellWidth;
                    this.posTemp.y = this.ruteJalan[this.jalanIdx + 1][1] * this._cellHeight;
                    this._pos.x = this._pos.x + (this._langkahIdx / this._langkahTotal) * (this.posTemp.x - this._pos.x);
                    this._pos.y = this._pos.y + (this._langkahIdx / this._langkahTotal) * (this.posTemp.y - this._pos.y);
                }
            }
            // private gantiCell(): boolean {
            //     return true;
            // }
            update() {
                if (this._sedangJalan) {
                    this._langkahIdx++;
                    if (this._langkahIdx >= this._langkahTotal) {
                        this._langkahIdx = 0;
                        this.jalanIdx++;
                        if (this.jalanIdx >= this.ruteJalan.length - 1) {
                            this._sedangJalan = false;
                            this.jalanIdx = this.ruteJalan.length - 1;
                        }
                        this.updateArah();
                        // console.log('hasil arah ' + this._arah);
                        if (this._updateArahCallBack) {
                            this._updateArahCallBack();
                        }
                    }
                    this.updatePos();
                }
            }
            get cellWidth() {
                return this._cellWidth;
            }
            set cellWidth(value) {
                this._cellWidth = value;
            }
            get cellHeight() {
                return this._cellHeight;
            }
            set cellHeight(value) {
                this._cellHeight = value;
            }
            get langkahTotal() {
                return this._langkahTotal;
            }
            set langkahTotal(value) {
                this._langkahTotal = value;
            }
            get pos() {
                return this._pos;
            }
            set pos(value) {
                this._pos = value;
            }
            get sedangJalan() {
                return this._sedangJalan;
            }
            get arah() {
                return this._arah;
            }
            set arah(value) {
                this._arah = value;
            }
            get updateArahCallBack() {
                return this._updateArahCallBack;
            }
            set updateArahCallBack(value) {
                this._updateArahCallBack = value;
            }
        }
        PFHelper.ATAS = 1;
        PFHelper.KANAN = 2;
        PFHelper.BAWAH = 3;
        PFHelper.KIRI = 4;
        PFHelper.KANAN_ATAS = 5;
        PFHelper.KANAN_BAWAH = 6;
        PFHelper.KIRI_ATAS = 7;
        PFHelper.KIRI_BAWAH = 8;
        pf.PFHelper = PFHelper;
    })(pf = ha.pf || (ha.pf = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var pf;
    (function (pf) {
        class PathFinder {
            constructor() {
                this._cells = [];
                this._maxCells = 100;
                this._flBlocked = 0;
                this._flDiagonal = false;
                this._cells = [];
                this._flBlocked = PathFinder.BL_STOP;
            }
            //dipakai saat algorithma selesai
            getCellTerdekatKeTarget(tx, ty) {
                let jarakTerdekat = 1000;
                let jarakSementara = 0;
                let cellRes = null;
                this._cells.forEach((cell) => {
                    jarakSementara = Math.abs(cell.x - tx) + Math.abs(cell.y - ty);
                    if (jarakSementara < jarakTerdekat) {
                        cellRes = cell;
                        jarakTerdekat = jarakSementara;
                    }
                });
                //tidak termasuk cell paling atas
                if (cellRes.parent == null)
                    cellRes = null;
                return cellRes;
            }
            buildPath(cell, res) {
                let i = 0;
                let cellTemp;
                let cellParent;
                let len;
                //cari parent dari cell yang sedang di check
                len = this._cells.length;
                for (i = 0; i < len; i++) {
                    cellTemp = this._cells[i];
                    if (cell.parent && cellTemp.idx == cell.parent.idx) {
                        cellParent = cellTemp;
                    }
                }
                //parent gak ada, cell adalah cell awal, return;
                if (cellParent == null) {
                    // console.log("no parent");
                    return;
                }
                //hasilnya di masukkan ke let res
                //urutan dibalik
                //bila parent adalah cell awal return
                res.unshift(cellParent);
                if (cellParent.idx == -1) {
                    return;
                }
                else {
                    this.buildPath(cellParent, res);
                }
            }
            cellCreate(parent, i, j, targetX, targetY) {
                let cell;
                cell = new pf.PFCell();
                cell.x = i;
                cell.y = j;
                cell.open = true;
                cell.idx = this._cells.length;
                if (parent) {
                    cell.parent = parent;
                }
                else {
                    cell.parent = null;
                }
                cell.dist = Math.abs(targetX - i) + Math.abs(targetY - j);
                return cell;
            }
            resToArray(res) {
                let ar = [];
                res.forEach((cell) => {
                    ar.push([cell.x, cell.y]);
                });
                return ar;
            }
            cari(sx, sy, tx, ty) {
                let res = new Array();
                let resAr;
                while (this._cells.length > 0) {
                    this._cells.pop();
                }
                res = this.getPath(sx, sy, tx, ty);
                resAr = this.resToArray(res);
                while (res.length > 0) {
                    res.pop();
                }
                return resAr;
            }
            checkSampaiTujuan(charX, charY, tx, ty) {
                if (this._checkSampai != null) {
                    return this._checkSampai(charX, charY, tx, ty);
                }
                else {
                    if (charX == tx && charY == ty)
                        return true;
                    return false;
                }
            }
            getOpenCell() {
                let i;
                let cell;
                let maxLen;
                let cellTemp;
                let len = 0;
                maxLen = 10000;
                len = this._cells.length - 1;
                for (i = len; i >= 0; i--) {
                    cell = this._cells[i];
                    if (cell.open) {
                        if (cell.dist < maxLen) {
                            cellTemp = cell;
                            maxLen = cell.dist;
                        }
                    }
                }
                return cellTemp;
            }
            cellOpen(cellCr, tx, ty) {
                //up
                if (this.cellPosPossible(cellCr.x, cellCr.y - 1)) {
                    this._cells.push(this.cellCreate(cellCr, cellCr.x, cellCr.y - 1, tx, ty));
                }
                //right
                if (this.cellPosPossible(cellCr.x + 1, cellCr.y)) {
                    this._cells.push(this.cellCreate(cellCr, cellCr.x + 1, cellCr.y, tx, ty));
                }
                //down
                if (this.cellPosPossible(cellCr.x, cellCr.y + 1)) {
                    this._cells.push(this.cellCreate(cellCr, cellCr.x, cellCr.y + 1, tx, ty));
                }
                //left
                if (this.cellPosPossible(cellCr.x - 1, cellCr.y)) {
                    this._cells.push(this.cellCreate(cellCr, cellCr.x - 1, cellCr.y, tx, ty));
                }
                //kanan atas
                if (this.cellPosPossible(cellCr.x + 1, cellCr.y - 1)) {
                    this._cells.push(this.cellCreate(cellCr, cellCr.x + 1, cellCr.y - 1, tx, ty));
                }
                //kanan bawah
                if (this.cellPosPossible(cellCr.x + 1, cellCr.y + 1)) {
                    this._cells.push(this.cellCreate(cellCr, cellCr.x + 1, cellCr.y + 1, tx, ty));
                }
                //kiri atas
                if (this.cellPosPossible(cellCr.x - 1, cellCr.y - 1)) {
                    this._cells.push(this.cellCreate(cellCr, cellCr.x - 1, cellCr.y - 1, tx, ty));
                }
                //kiri bawah
                if (this.cellPosPossible(cellCr.x - 1, cellCr.y + 1)) {
                    this._cells.push(this.cellCreate(cellCr, cellCr.x - 1, cellCr.y + 1, tx, ty));
                }
            }
            getPath(sx, sy, tx, ty) {
                let cellCr;
                let res = new Array();
                if (sx == tx && sy == ty) {
                    return res;
                }
                //cell pertama
                this._cells.push(this.cellCreate(null, sx, sy, tx, ty));
                while (true) {
                    if (this._cells.length >= this._maxCells) {
                        if (this._flBlocked == PathFinder.BL_STOP) {
                            return [];
                        }
                        else if (this._flBlocked == PathFinder.BL_TERDEKAT) {
                            cellCr = this.getCellTerdekatKeTarget(tx, ty);
                        }
                        else {
                            throw new Error();
                        }
                        if (cellCr) {
                            res.unshift(cellCr);
                            this.buildPath(cellCr, res);
                        }
                        return res;
                    }
                    cellCr = this.getOpenCell();
                    if (cellCr) {
                        cellCr.open = false;
                        if (this.checkSampaiTujuan(cellCr.x, cellCr.y, tx, ty)) {
                            res.unshift(cellCr);
                            this.buildPath(cellCr, res);
                            return res;
                        }
                        this.cellOpen(cellCr, tx, ty);
                    }
                    else {
                        if (this._flBlocked == PathFinder.BL_STOP) {
                            return [];
                        }
                        else if (this._flBlocked == PathFinder.BL_TERDEKAT) {
                            cellCr = this.getCellTerdekatKeTarget(tx, ty);
                        }
                        else {
                            throw new Error();
                        }
                        if (cellCr) {
                            res.unshift(cellCr);
                            this.buildPath(cellCr, res);
                        }
                        return res;
                    }
                }
            }
            cellExistsAtPos(ix, jx) {
                let res = false;
                this._cells.forEach((cell) => {
                    if (cell.x == ix && cell.y == jx) {
                        res = true;
                    }
                });
                return res;
            }
            cellPosPossible(ix, jx) {
                if (this.cellExistsAtPos(ix, jx)) {
                    return false;
                }
                //check block
                if (this._checkCanMoveToPos) {
                    if (this._checkCanMoveToPos(ix, jx) == false) {
                        return false;
                    }
                }
                return true;
            }
            set checkCanMoveToPos(f) {
                this._checkCanMoveToPos = f;
            }
            get maxCells() {
                return this._maxCells;
            }
            set maxCells(value) {
                this._maxCells = value;
            }
            set flBlocked(value) {
                this._flBlocked = value;
            }
            get flDiagonal() {
                return this._flDiagonal;
            }
            set flDiagonal(value) {
                this._flDiagonal = value;
            }
            set checkSampai(value) {
                this._checkSampai = value;
            }
        }
        /**
         * aksi yang diambil saat jalan terblock
         * 1. berhenti
         * 2. cari posisi terdekat dan ganti target ke posisi tersebut
         */
        PathFinder.BL_STOP = 1;
        PathFinder.BL_TERDEKAT = 2;
        pf.PathFinder = PathFinder;
    })(pf = ha.pf || (ha.pf = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var pf;
    (function (pf) {
        class Point {
            constructor(i, j) {
                this.x = i;
                this.y = j;
            }
        }
        pf.Point = Point;
    })(pf = ha.pf || (ha.pf = {}));
})(ha || (ha = {}));
