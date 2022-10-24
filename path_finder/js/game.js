///<reference path="js/easel.d.ts"/>
var fg;
(function (fg) {
    class Game {
        constructor() {
            this._map = new fg.Map();
            this.initStage();
            this.drawWall();
            this.mainChar = new fg.MainChar();
            this.mainChar.pos.x = 2 * 32;
            this.mainChar.pos.y = 2 * 32;
            this.mainChar.updateView();
            this.mainChar.map = this._map;
            this.stage.addChild(this.mainChar.view);
            this.stage.update();
        }
        initStage() {
            this.stage = new createjs.Stage("canvas");
            this.stage.on("click", this.stageOnClick.bind(this));
            //background
            let shape = new createjs.Shape();
            shape.graphics.beginFill("#eeeeee");
            shape.graphics.rect(0, 0, 320, 240);
            this.stage.addChild(shape);
            createjs.Ticker.on("tick", this.update.bind(this));
            //this.update.bind(this);
        }
        stageOnClick(evt) {
            this.mainChar.jalanKePos(Math.floor(evt.stageX / 32), Math.floor(evt.stageY / 32));
        }
        update(evt) {
            this.mainChar.update();
            this.stage.update(evt);
        }
        drawWall() {
            let bmp;
            for (let j = 0; j < this._map.height; j++) {
                for (let i = 0; i < this._map.width; i++) {
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
    fg.Game = Game;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class MainChar {
        constructor() {
            this.ruteJalan = [];
            this._pos = new fg.Point();
            this._view = new createjs.Container();
            this.state = 1;
            this.initPathFinder();
            this.initAnim();
        }
        initAnim() {
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
            let spriteSheet = new createjs.SpriteSheet(data);
            this.animation = new createjs.Sprite(spriteSheet, "jalanka");
            this._view.addChild(this.animation);
            this._view.mouseEnabled = false;
        }
        initPathFinder() {
            this.pf = new fg.PathFinder();
            this.pf.flBlocked = fg.PathFinder.BL_TERDEKAT;
            this.pfHelper = new fg.PFHelper();
            this.pfHelper.langkahTotal = 10;
            this.pf.checkCanMoveToPos = (x, y) => {
                return this._map.isPassable(x, y);
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
            // console.log('arah ' + this.pfHelper.arah);
            if (this.pfHelper.arah == fg.PFHelper.ATAS && (this.animation.currentAnimation != "jalanat")) {
                this.animation.gotoAndPlay("jalanat");
            }
            else if (this.pfHelper.arah == fg.PFHelper.KANAN && (this.animation.currentAnimation != "jalanka")) {
                this.animation.gotoAndPlay("jalanka");
            }
            else if (this.pfHelper.arah == fg.PFHelper.BAWAH && (this.animation.currentAnimation != "jalanba")) {
                this.animation.gotoAndPlay("jalanba");
            }
            else if (this.pfHelper.arah == fg.PFHelper.KIRI && (this.animation.currentAnimation != "jalanki")) {
                this.animation.gotoAndPlay("jalanki");
            }
            else if (this.pfHelper.arah == fg.PFHelper.KANAN_ATAS && (this.animation.currentAnimation != "jalankaat")) {
                this.animation.gotoAndPlay("jalankaat");
            }
            else if (this.pfHelper.arah == fg.PFHelper.KANAN_BAWAH && (this.animation.currentAnimation != "jalankaba")) {
                // console.log('anim jalan kanan bawah');
                this.animation.gotoAndPlay("jalankaba");
            }
            else if (this.pfHelper.arah == fg.PFHelper.KIRI_ATAS && (this.animation.currentAnimation != "jalankiat")) {
                // console.log('anim jalan kiri atas');
                this.animation.gotoAndPlay("jalankiat");
            }
            else if (this.pfHelper.arah == fg.PFHelper.KIRI_BAWAH && (this.animation.currentAnimation != "jalankiba")) {
                this.animation.gotoAndPlay("jalankiba");
            }
        }
        jalanKePos(i, j) {
            if (!this.pfHelper.sedangJalan) {
                this.ruteJalan = this.pf.find(Math.floor(this._pos.x / 32), Math.floor(this._pos.y / 32), i, j);
                if (this.ruteJalan.length > 0) {
                    this.pfHelper.start(this.ruteJalan);
                    this.updateAnim();
                    this.state = MainChar.JALAN;
                }
            }
        }
        updateView() {
            this._view.x = this._pos.x;
            this._view.y = this._pos.y;
        }
        update() {
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
        get pos() {
            return this._pos;
        }
        set pos(value) {
            this._pos = value;
        }
        get view() {
            return this._view;
        }
        set view(value) {
            this._view = value;
        }
        set map(value) {
            this._map = value;
        }
    }
    MainChar.BERDIRI = 1;
    MainChar.JALAN = 2;
    fg.MainChar = MainChar;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class Map {
        constructor() {
            this._map = Data.map;
        }
        getCellValue(i, j) {
            if (this._map[j].charAt(i) == "X") {
                return 1;
            }
            return 0;
        }
        isPassable(x, y) {
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
        get width() {
            return this._map[0].length;
        }
        get height() {
            return this._map.length;
        }
    }
    fg.Map = Map;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class PFCell {
        constructor() {
            this._dist = 0;
            this._x = 0;
            this._y = 0;
            this._idx = -1;
            this._open = true;
        }
        PFCell() {
        }
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
    fg.PFCell = PFCell;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class PFHelper {
        constructor() {
            this.ruteJalan = [];
            this._cellWidth = 32;
            this._cellHeight = 32;
            this._langkahTotal = 3;
            this._langkahIdx = 0;
            this.jalanIdx = 0;
            this._pos = new fg.Point();
            this.posTemp = new fg.Point();
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
        gantiCell() {
            return true;
        }
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
    fg.PFHelper = PFHelper;
})(fg || (fg = {}));
///<reference path="./PFCell.ts"/>
var fg;
///<reference path="./PFCell.ts"/>
(function (fg) {
    class PathFinder {
        constructor() {
            this._cells = [];
            this._maxCells = 100;
            this._flBlocked = 0;
            this._flDiagonal = false;
            this._cells = [];
            this._flBlocked = PathFinder.BL_STOPPED;
        }
        //dipakai saat algorithma selesai
        getCellTerdekatKeTarget(tx, ty) {
            let jarakTerdekat = 1000;
            let jarakSementara = 0;
            let cellRes = null;
            this._cells.forEach(cell => {
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
                if (cell.parent && (cellTemp.idx == cell.parent.idx)) {
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
            cell = new fg.PFCell();
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
            res.forEach(cell => {
                ar.push([cell.x, cell.y]);
            });
            return ar;
        }
        find(sx, sy, tx, ty) {
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
        checkSampaiTujuan(i, j, tx, ty) {
            if (this._checkSampai != null) {
                return this._checkSampai(i, j, tx, ty);
            }
            else {
                if ((i == tx) && (j == ty))
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
            if ((sx == tx) && (sy == ty)) {
                return res;
            }
            //cell pertama
            this._cells.push(this.cellCreate(null, sx, sy, tx, ty));
            while (true) {
                if ((this._cells.length >= this._maxCells)) {
                    if (this._flBlocked == PathFinder.BL_STOPPED) {
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
                    if (this._flBlocked == PathFinder.BL_STOPPED) {
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
            this._cells.forEach(cell => {
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
    PathFinder.BL_STOPPED = 1;
    PathFinder.BL_TERDEKAT = 2;
    fg.PathFinder = PathFinder;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class Point {
        constructor(i, j) {
            this.x = i;
            this.y = j;
        }
    }
    fg.Point = Point;
})(fg || (fg = {}));