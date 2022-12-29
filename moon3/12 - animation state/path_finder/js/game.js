///<reference path="js/easel.d.ts"/>
var fg;
(function (fg) {
    class Game {
        constructor() {
            this._map = Data.map;
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
        }
        stageOnClick(evt) {
            this.mainChar.jalanKePos(Math.floor(evt.stageX / 32), Math.floor(evt.stageY / 32));
        }
        update(evt) {
            this.mainChar.update();
            this.stage.update(evt);
        }
        drawWall() {
            let i, j;
            let bmp;
            for (j = 0; j < this._map.length; j++) {
                for (i = 0; i < this._map[j].length; i++) {
                    if (this._map[j].charAt(i) == "X") {
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
            this._map = [];
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
                    berdiri: 1,
                    jalan: {
                        frames: [0, 1, 2, 1],
                        speed: .5
                    }
                }
            };
            let spriteSheet = new createjs.SpriteSheet(data);
            this.animation = new createjs.Sprite(spriteSheet, "berdiri");
            this._view.addChild(this.animation);
            this._view.mouseEnabled = false;
        }
        initPathFinder() {
            this.pf = new fg.PathFinder();
            this.pfHelper = new fg.PFHelper();
            this.pfHelper.langkahTotal = 10;
            this.pf.checkCanMoveToPos = (x, y) => {
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
            };
        }
        jalanKePos(i, j) {
            if (!this.pfHelper.sedangJalan) {
                this.ruteJalan = this.pf.find(Math.floor(this._pos.x / 32), Math.floor(this._pos.y / 32), i, j);
                if (this.ruteJalan.length > 0) {
                    this.pfHelper.start(this.ruteJalan);
                    this.animation.gotoAndPlay("jalan");
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
        get map() {
            return this._map;
        }
        set map(value) {
            this._map = value;
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
    }
    MainChar.BERDIRI = 1;
    MainChar.JALAN = 2;
    fg.MainChar = MainChar;
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
///<reference path="./PFCell.ts"/>
var fg;
///<reference path="./PFCell.ts"/>
(function (fg) {
    class PathFinder {
        constructor() {
            this._cells = [];
            this._maxCells = 100;
            this._cells = [];
        }
        //dipakai saat algorithma selesai
        getCellTerdekatKeTarget(cells, tx, ty) {
            let dist = 1000;
            let distTemp = 0;
            let cellRes = null;
            cells.forEach(cell => {
                distTemp = Math.abs(cell.x - tx) + Math.abs(cell.y - ty);
                if (distTemp < dist) {
                    cellRes = cell;
                    dist = distTemp;
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
                console.log("no parent");
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
            if ((i == tx) && (j == ty))
                return true;
            return false;
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
            if (this.cellPosPossible(cellCr.x, cellCr.y - 1, this._cells)) {
                this._cells.push(this.cellCreate(cellCr, cellCr.x, cellCr.y - 1, tx, ty));
            }
            //right
            if (this.cellPosPossible(cellCr.x + 1, cellCr.y, this._cells)) {
                this._cells.push(this.cellCreate(cellCr, cellCr.x + 1, cellCr.y, tx, ty));
            }
            //down
            if (this.cellPosPossible(cellCr.x, cellCr.y + 1, this._cells)) {
                this._cells.push(this.cellCreate(cellCr, cellCr.x, cellCr.y + 1, tx, ty));
            }
            //left
            if (this.cellPosPossible(cellCr.x - 1, cellCr.y, this._cells)) {
                this._cells.push(this.cellCreate(cellCr, cellCr.x - 1, cellCr.y, tx, ty));
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
                    cellCr = this.getCellTerdekatKeTarget(this._cells, tx, ty);
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
                    cellCr = this.getCellTerdekatKeTarget(this._cells, tx, ty);
                    if (cellCr) {
                        res.unshift(cellCr);
                        this.buildPath(cellCr, res);
                    }
                    return res;
                }
            }
        }
        cellExistsAtPos(ix, jx, cells) {
            let res = false;
            cells.forEach(cell => {
                if (cell.x == ix && cell.y == jx) {
                    res = true;
                }
            });
            return res;
        }
        cellPosPossible(ix, jx, cells) {
            if (this.cellExistsAtPos(ix, jx, cells)) {
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
        get checkCanMoveToPos() {
            return this._checkCanMoveToPos;
        }
        get maxCells() {
            return this._maxCells;
        }
        set maxCells(value) {
            this._maxCells = value;
        }
    }
    fg.PathFinder = PathFinder;
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
            this._pos.x = data[0][0] * this._cellWidth;
            this._pos.y = data[0][1] * this._cellHeight;
        }
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
        update() {
            if (this._sedangJalan) {
                this._langkahIdx++;
                if (this._langkahIdx >= this._langkahTotal) {
                    this.jalanIdx++;
                    this._langkahIdx = 0;
                    if (this.jalanIdx >= this.ruteJalan.length - 1) {
                        this._sedangJalan = false;
                        this.jalanIdx = this.ruteJalan.length - 1;
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
    }
    fg.PFHelper = PFHelper;
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
