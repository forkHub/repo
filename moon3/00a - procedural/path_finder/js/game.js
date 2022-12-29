//konstanta untuk index posisi data disimpan
const PF_CELL_IDX = 0;
const PF_CELL_X = 1;
const PF_CELL_Y = 2;
const PF_CELL_BUKA = 3;
const PF_CELL_PARENT_IDX = 4;
const CELL_JARAK = 5;
let pfCells = []; //array tempat menyimpan semua cell yang dibuat
let pfCcellMax = 100; //maksimum cell boleh dibuat
let pfDataPeta = []; //data peta
function pfTelusurBalik(cell, res) {
    let i = 0;
    let cellTemp = null;
    let cellParent = null;
    let len;
    //cari parent dari cell yang sedang di check
    len = pfCells.length;
    for (i = 0; i < len; i++) {
        cellTemp = pfCells[i];
        if (cell[PF_CELL_PARENT_IDX] > -1 && (cellTemp[PF_CELL_IDX] == pfCells[cell[PF_CELL_PARENT_IDX]][PF_CELL_IDX])) {
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
    if (cellParent[PF_CELL_IDX] == -1) {
        return;
    }
    else {
        pfTelusurBalik(cellParent, res);
    }
}
function pfBuatCell(parent, x, y, tx, ty) {
    let cell = [];
    cell[PF_CELL_X] = x;
    cell[PF_CELL_Y] = y;
    cell[PF_CELL_BUKA] = 1;
    cell[PF_CELL_IDX] = pfCells.length;
    if (parent) {
        cell[PF_CELL_PARENT_IDX] = parent[PF_CELL_IDX];
    }
    else {
        cell[PF_CELL_PARENT_IDX] = -1;
    }
    cell[CELL_JARAK] = Math.abs(tx - x) + Math.abs(ty - y);
    return cell;
}
function pfRes2Array(res) {
    let ar = [];
    res.forEach(cell => {
        ar.push([cell[PF_CELL_X], cell[PF_CELL_Y]]);
    });
    return ar;
}
/**
 * Fungsi utama Cari jalan
 * @param sx posisi awal x
 * @param sy posisi awal y
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfCariJalan(sx, sy, tx, ty) {
    let res = [];
    let resAr;
    //bersih-bersih data
    while (pfCells.length > 0) {
        pfCells.pop();
    }
    //cari jalan
    res = pfCariJalan2(sx, sy, tx, ty);
    resAr = pfRes2Array(res);
    while (res.length > 0) {
        res.pop();
    }
    return resAr;
}
/**
 * Check sampai tujuan
 * @param x posisi x
 * @param y posisi y
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfCheckSampaiTujuan(x, y, tx, ty) {
    if ((x == tx) && (y == ty))
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
    len = pfCells.length - 1;
    for (i = len; i >= 0; i--) {
        cell = pfCells[i];
        if (1 == cell[PF_CELL_BUKA]) {
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
    if (pfPosBisa(cellCr[PF_CELL_X], cellCr[PF_CELL_Y] - 1)) {
        pfCells.push(pfBuatCell(cellCr, cellCr[PF_CELL_X], cellCr[PF_CELL_Y] - 1, tx, ty));
    }
    //right
    if (pfPosBisa(cellCr[PF_CELL_X] + 1, cellCr[PF_CELL_Y])) {
        pfCells.push(pfBuatCell(cellCr, cellCr[PF_CELL_X] + 1, cellCr[PF_CELL_Y], tx, ty));
    }
    //down
    if (pfPosBisa(cellCr[PF_CELL_X], cellCr[PF_CELL_Y] + 1)) {
        pfCells.push(pfBuatCell(cellCr, cellCr[PF_CELL_X], cellCr[PF_CELL_Y] + 1, tx, ty));
    }
    //left
    if (pfPosBisa(cellCr[PF_CELL_X] - 1, cellCr[PF_CELL_Y])) {
        pfCells.push(pfBuatCell(cellCr, cellCr[PF_CELL_X] - 1, cellCr[PF_CELL_Y], tx, ty));
    }
}
function pfCariJalan2(sx, sy, tx, ty) {
    let cellCr;
    let res = new Array();
    //bila posisi tujuan sama dengan awal
    //kembalikan array kosong
    if ((sx == tx) && (sy == ty)) {
        return res;
    }
    //buat cell pertama
    pfCells.push(pfBuatCell(null, sx, sy, tx, ty));
    while (true) {
        //bila jumlah cell yang dihasilkan melebihi maksimum
        //kembalikan array kosong
        if ((pfCells.length >= pfCcellMax)) {
            return [];
        }
        //cari cell yang masih terbuka
        cellCr = pfCariCellTerbuka();
        //bila ada cell yang masih terbuka
        if (cellCr) {
            //ubah status jadi tutup
            cellCr[PF_CELL_BUKA] = -1;
            //check jika sudah sampai tujuan
            if (pfCheckSampaiTujuan(cellCr[PF_CELL_X], cellCr[PF_CELL_Y], tx, ty)) {
                res.unshift(cellCr);
                pfTelusurBalik(cellCr, res);
                return res;
            }
            pfBukaCell(cellCr, tx, ty);
        }
        else {
            return [];
        }
    }
}
/**
 * Check apakah cell sudah ada di daftar, parameter yang dipakai adalah posisi
 * @param x posisi x
 * @param y posisi y
 */
function pfCheckCellAda(x, y) {
    let res = false;
    pfCells.forEach(cell => {
        if (cell[PF_CELL_X] == x && cell[PF_CELL_Y] == y) {
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
    if (x >= pfDataPeta[y].length) {
        return false;
    }
    if (y >= pfDataPeta.length) {
        return false;
    }
    if (pfDataPeta[y].charAt(x) == " ") {
        return true;
    }
    else {
        return false;
    }
}
/**
 * Mengecek apakah posisi (ix, jx) bisa dilalui
 * @param x Posisi x
 * @param y Posisi y
 */
function pfPosBisa(x, y) {
    if (pfCheckCellAda(x, y)) {
        return false;
    }
    //check block
    if (pfBisaJalan(x, y) == false) {
        return false;
    }
    return true;
}
///<reference path='PathFinder.ts'/>
let peta = [];
function mulai() {
    let res = [];
    initPeta();
    res = pfCariJalan(2, 2, 7, 2);
    console.log(res);
    res = pfCariJalan(0, 0, 7, 0);
    console.log(res);
    res = pfCariJalan(0, 0, 17, 17);
    console.log(res);
    res = pfCariJalan(2, 2, 5, 2);
    console.log(res);
}
function initPeta() {
    pfDataPeta = [
        "XXXXXXXXXX",
        "X        X",
        "X    X   X",
        "X    X   X",
        "X    X   X",
        "X        X",
        "XXXXXXXXXX",
    ];
    console.log('init peta');
}
