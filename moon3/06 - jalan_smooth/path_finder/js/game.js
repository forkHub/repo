///<reference path="js/easel.d.ts"/>
var fg;
///<reference path="js/easel.d.ts"/>
(function (fg) {
    class Game {
        constructor() {
            this._map = [];
            this.posAwal = new createjs.Point();
            this.pathCont = new createjs.Container();
            this.sedangJalan = false;
            this.ruteJalan = [];
            this.jalanIdx = 0;
            this.langkahIdx = 0;
            this.langkahTotal = 10;
            this.initMap();
            this.initPathFinding();
            this.initStage();
            this.pathCont.mouseChildren = false;
            this.pathCont.mouseEnabled = false;
            this.posAwal = new createjs.Point(2, 2);
            // this.posAkhir = new createjs.Point(2, 2);
            this.ruteJalan = [[2, 2]];
            this.drawChar();
            this.drawWall();
            this.stage.update();
            createjs.Ticker.on("tick", this.update.bind(this));
        }
        initStage() {
            this.stage = new createjs.Stage("canvas");
            this.stage.on("click", this.stageOnClick.bind(this));
            let shape = new createjs.Shape();
            shape.graphics.beginFill("#eeeeee");
            shape.graphics.rect(0, 0, 320, 240);
            this.stage.addChild(shape);
        }
        stageOnClick(evt) {
            if (!this.sedangJalan) {
                this.ruteJalan = this.pf.find(this.posAwal.x, this.posAwal.y, Math.floor(evt.stageX / 32), Math.floor(evt.stageY / 32));
                if (this.ruteJalan.length > 0) {
                    this.sedangJalan = true;
                    this.jalanIdx = 0;
                    let pos;
                    pos = this.ruteJalan[this.ruteJalan.length - 1];
                    this.posAwal.x = pos[0];
                    this.posAwal.y = pos[1];
                    console.log(this.ruteJalan);
                }
            }
        }
        langkahUpdate() {
            if (this.sedangJalan) {
                this.langkahIdx++;
                if (this.langkahIdx >= this.langkahTotal) {
                    this.jalanIdx++;
                    this.langkahIdx = 0;
                    if (this.jalanIdx >= this.ruteJalan.length - 1) {
                        this.sedangJalan = false;
                        this.jalanIdx = this.ruteJalan.length - 1;
                    }
                    else {
                    }
                }
                else {
                }
                this.drawChar();
            }
        }
        update(evt) {
            this.langkahUpdate();
            this.stage.update(evt);
        }
        initPathFinding() {
            this.pf = new fg.PathFinder();
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
        initMap() {
            this._map = [
                "XXXXXXXXXX",
                "X        X",
                "X    X   X",
                "X    X   X",
                "X    X   X",
                "X        X",
                "XXXXXXXXXX",
            ];
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
        drawChar() {
            let bmp;
            let pos = new createjs.Point();
            let pos2 = new createjs.Point();
            let langkah = new createjs.Point();
            pos.x = this.ruteJalan[this.jalanIdx][0] * 32;
            pos.y = this.ruteJalan[this.jalanIdx][1] * 32;
            if (this.jalanIdx < this.ruteJalan.length - 1) {
                pos2.x = this.ruteJalan[this.jalanIdx + 1][0] * 32;
                pos2.y = this.ruteJalan[this.jalanIdx + 1][1] * 32;
                langkah.x = (this.langkahIdx / this.langkahTotal) * (pos2.x - pos.x);
                langkah.y = (this.langkahIdx / this.langkahTotal) * (pos2.y - pos.y);
            }
            this.pathCont.removeAllChildren();
            bmp = new createjs.Bitmap(document.querySelector("img#bola"));
            bmp.regX = 8;
            bmp.regY = 8;
            bmp.x = pos.x + langkah.x + 16;
            bmp.y = pos.y + langkah.y + 16;
            this.pathCont.addChild(bmp);
            this.stage.addChild(this.pathCont);
        }
    }
    fg.Game = Game;
})(fg || (fg = {}));
var fg;
(function (fg) {
    class PFCell {
        constructor() {
            this._dist = 0;
            this._parentIdx = -1;
            this._x = 0;
            this._y = 0;
            this._g = 0;
            this._idx = -1;
            this._open = true;
            // protected _dir: number = 0;
            this._h = 0;
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
        get parentIdx() {
            return this._parentIdx;
        }
        set parentIdx(value) {
            this._parentIdx = value;
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
        // public get dir(): number {
        // 	return this._dir;
        // }
        // public set dir(value: number) {
        // 	this._dir = value;
        // }
        get g() {
            return this._g;
        }
        set g(value) {
            this._g = value;
        }
        get parent() {
            return this._parent;
        }
        set parent(value) {
            this._parent = value;
        }
        get h() {
            return this._h;
        }
        set h(value) {
            this._h = value;
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
            if (cellRes.parentIdx == -1)
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
                if (cellTemp.idx == cell.parentIdx) {
                    cellParent = cellTemp;
                }
                else {
                    //console.log("no match ");
                    //console.log(cellTemp.idx + "/" + cell.parentIdx);
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
        //TODO: manhattan mode
        cellCreate(parent, i, j, targetX, targetY) {
            let cell;
            cell = new fg.PFCell();
            cell.x = i;
            cell.y = j;
            cell.open = true;
            cell.idx = this._cells.length;
            if (parent) {
                cell.parent = parent;
                cell.parentIdx = parent.idx;
                cell.g = parent.g + 1;
            }
            else {
                cell.parent = null;
                cell.parentIdx = -1;
                cell.g = 0;
            }
            cell.h = Math.abs(targetX - i) + Math.abs(targetY - j);
            cell.dist = cell.h;
            // cell.dir = dir;
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
