const CELL_IDX = 0;
const CELL_X = 1;
const CELL_Y = 2;
const CELL_BUKA = 3;
const CELL_PARENT_IDX = 4;
const CELL_JARAK = 5;
let _cells = [];
let _callMax = 100;
let _peta = [];
function pfTelusur(cell, res) {
    let i = 0;
    let cellTemp = null;
    let cellParent = null;
    let len;
    //cari parent dari cell yang sedang di check
    len = _cells.length;
    for (i = 0; i < len; i++) {
        cellTemp = _cells[i];
        if (cell[CELL_PARENT_IDX] > -1 && (cellTemp[CELL_IDX] == _cells[cell[CELL_PARENT_IDX]][CELL_IDX])) {
            cellParent = cellTemp;
        }
    }
    //parent gak ada, cell adalah cell awal, return;
    if (cellParent == null) {
        console.log("pencarian selesai cell target adalah cell awal");
        return;
    }
    //hasilnya di masukkan ke let res
    //urutan dibalik
    //bila parent adalah cell awal return
    res.unshift(cellParent);
    if (cellParent[CELL_IDX] == -1) {
        return;
    }
    else {
        pfTelusur(cellParent, res);
    }
}
function pfBuatCell(parent, i, j, targetX, targetY) {
    let cell = [];
    cell[CELL_X] = i;
    cell[CELL_Y] = j;
    cell[CELL_BUKA] = 1;
    cell[CELL_IDX] = _cells.length;
    if (parent) {
        cell[CELL_PARENT_IDX] = parent[CELL_IDX];
    }
    else {
        cell[CELL_PARENT_IDX] = -1;
    }
    cell[CELL_JARAK] = Math.abs(targetX - i) + Math.abs(targetY - j);
    return cell;
}
function pfRes2Array(res) {
    let ar = [];
    res.forEach(cell => {
        ar.push([cell[CELL_X], cell[CELL_Y]]);
    });
    return ar;
}
function pfCariJalan(sx, sy, tx, ty) {
    let res = [];
    let resAr;
    while (_cells.length > 0) {
        _cells.pop();
    }
    res = pfCariJalan2(sx, sy, tx, ty);
    resAr = pfRes2Array(res);
    while (res.length > 0) {
        res.pop();
    }
    return resAr;
}
function pfCheckSampaiTujuan(i, j, tx, ty) {
    if ((i == tx) && (j == ty))
        return true;
    return false;
}
function pfCariCellTerbuka() {
    let i = 0;
    let cell = [];
    let maxLen;
    let cellTemp;
    let len = 0;
    maxLen = 10000;
    len = _cells.length - 1;
    for (i = len; i >= 0; i--) {
        cell = _cells[i];
        if (1 == cell[CELL_BUKA]) {
            if (cell[CELL_JARAK] < maxLen) {
                cellTemp = cell;
                maxLen = cell[CELL_JARAK];
            }
        }
    }
    return cellTemp;
}
function pfBukaCell(cellCr, tx, ty) {
    //up
    if (pfPosBisa(cellCr[CELL_X], cellCr[CELL_Y] - 1)) {
        _cells.push(pfBuatCell(cellCr, cellCr[CELL_X], cellCr[CELL_Y] - 1, tx, ty));
    }
    //right
    if (pfPosBisa(cellCr[CELL_X] + 1, cellCr[CELL_Y])) {
        _cells.push(pfBuatCell(cellCr, cellCr[CELL_X] + 1, cellCr[CELL_Y], tx, ty));
    }
    //down
    if (pfPosBisa(cellCr[CELL_X], cellCr[CELL_Y] + 1)) {
        _cells.push(pfBuatCell(cellCr, cellCr[CELL_X], cellCr[CELL_Y] + 1, tx, ty));
    }
    //left
    if (pfPosBisa(cellCr[CELL_X] - 1, cellCr[CELL_Y])) {
        _cells.push(pfBuatCell(cellCr, cellCr[CELL_X] - 1, cellCr[CELL_Y], tx, ty));
    }
}
function pfCariJalan2(sx, sy, tx, ty) {
    let cellCr;
    let res = new Array();
    if ((sx == tx) && (sy == ty)) {
        return res;
    }
    //cell pertama
    _cells.push(pfBuatCell(null, sx, sy, tx, ty));
    while (true) {
        if ((_cells.length >= _callMax)) {
            return [];
        }
        cellCr = pfCariCellTerbuka();
        if (cellCr) {
            cellCr[CELL_BUKA] = -1;
            if (pfCheckSampaiTujuan(cellCr[CELL_X], cellCr[CELL_Y], tx, ty)) {
                res.unshift(cellCr);
                pfTelusur(cellCr, res);
                return res;
            }
            pfBukaCell(cellCr, tx, ty);
        }
        else {
            return [];
        }
    }
}
function pfCheckCellAda(ix, jx) {
    let res = false;
    _cells.forEach(cell => {
        if (cell[CELL_X] == ix && cell[CELL_Y] == jx) {
            res = true;
        }
    });
    return res;
}
function pfBisaJalan(x, y) {
    if (x < 0) {
        return false;
    }
    if (y < 0) {
        return false;
    }
    if (x >= _peta[y].length) {
        return false;
    }
    if (y >= _peta.length) {
        return false;
    }
    if (_peta[y].charAt(x) == " ") {
        return true;
    }
    else {
        return false;
    }
}
function pfPosBisa(ix, jx) {
    if (pfCheckCellAda(ix, jx)) {
        return false;
    }
    //check block
    if (pfBisaJalan(ix, jx) == false) {
        return false;
    }
    return true;
}
