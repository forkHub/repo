let pfCells = []; //array tempat menyimpan semua cell yang dibuat
let pfCcellMax = 100; //maksimum cell boleh dibuat
let pfDataPeta = []; //data peta
/**
 * Membuat jalur hasil dengan cara menelusuri balik dari cell terakhir ke pertama
 * @param cell Cell terakhir
 * @param res tempat menampung hasil
 */
function pfTelusurBalik(cell, res) {
    let i = 0;
    let cellTemp = null;
    let cellParent = null;
    let len;
    //cari parent dari cell yang sedang di check
    len = pfCells.length;
    for (i = 0; i < len; i++) {
        cellTemp = pfCells[i];
        // if (cell[PF_CELL_PARENT_IDX] > -1 && (cellTemp.idx == pfCells[cell.parentIdx][PF_CELL_IDX])) {
        // if (cell.parentIdx > -1 && (cellTemp.idx == cell.parentIdx)) {
        if (cell.parent == cellTemp) {
            cellParent = cellTemp;
        }
    }
    //parent gak ada, cell adalah cell awal, kembali;
    if (cellParent == null) {
        console.log("pencarian selesai cell target adalah cell awal");
        return;
    }
    //hasilnya di masukkan ke let res
    //urutan dibalik
    //bila parent adalah cell awal return
    res.unshift(cellParent);
    // if (cellParent.idx == -1) {
    if (cellParent.parent == null) {
        return;
    }
    else {
        pfTelusurBalik(cellParent, res);
    }
}
/**
 * Buat cell baru
 * @param parent Parent cell
 * @param x posisi x
 * @param y posisi y
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfBuatCell(parent, x, y, tx, ty) {
    let cell = {
        x: x,
        y: y,
        buka: 1,
        // idx: pfCells.length,
        // parentIdx: -1,
        jarak: -1,
        parent: parent
    };
    //isi parent bila ada
    // if (parent) {
    // 	cell.parentIdx = parent.idx;
    // }
    //hitung jarak
    cell.jarak = Math.abs(tx - x) + Math.abs(ty - y);
    return cell;
}
/**
 * Merubah hasil kebentuk array yang lebih sederhana
 * @param res Array sumber
 */
function pfRes2Array(res) {
    let ar = [];
    res.forEach(cell => {
        ar.push([cell.x, cell.y]);
    });
    return ar;
}
/**
 * Fungsi utama untuk Cari jalan
 * @param sx posisi awal x
 * @param sy posisi awal y
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfCariJalan3(sx, sy, tx, ty) {
    // let res: Array<IPFCell> = []
    // let resAr: Array<any>;
    //cari jalan
    // res = pfCariJalan2(sx, sy, tx, ty);
    //resAr = pfRes2Array(res);
    return pfCariJalan(sx, sy, tx, ty);
    //bersih-bersih
    //pfCells = [];
    // return resAr;
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
/**
 * Cari cell yang masih terbuka
 */
function pfCariCellTerbuka() {
    let i = 0;
    let cell = null;
    let maxLen;
    let cellTemp;
    let len = 0;
    maxLen = 10000;
    len = pfCells.length - 1;
    for (i = len; i >= 0; i--) {
        cell = pfCells[i];
        if (1 == cell.buka) {
            if (cell.jarak < maxLen) {
                cellTemp = cell;
                maxLen = cell.jarak;
            }
        }
    }
    return cellTemp;
}
/**
 * Buka cell
 * @param cellCr cell sekarang
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfBukaCell(cellCr, tx, ty) {
    //up
    if (pfPosBisa(cellCr.x, cellCr.y - 1)) {
        pfCells.push(pfBuatCell(cellCr, cellCr.x, cellCr.y - 1, tx, ty));
    }
    //right
    if (pfPosBisa(cellCr.x + 1, cellCr.y)) {
        pfCells.push(pfBuatCell(cellCr, cellCr.x + 1, cellCr.y, tx, ty));
    }
    //down
    if (pfPosBisa(cellCr.x, cellCr.y + 1)) {
        pfCells.push(pfBuatCell(cellCr, cellCr.x, cellCr.y + 1, tx, ty));
    }
    //left
    if (pfPosBisa(cellCr.x - 1, cellCr.y)) {
        pfCells.push(pfBuatCell(cellCr, cellCr.x - 1, cellCr.y, tx, ty));
    }
}
/**
 * Proses mencari jalan
 * @param sx posisi sumber x
 * @param sy posisi sumber y
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfCariJalan(sx, sy, tx, ty) {
    let cellCr;
    let res = [];
    pfCells = [];
    //bila posisi tujuan sama dengan awal
    //kembalikan array kosong
    if ((sx == tx) && (sy == ty)) {
        return [];
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
            cellCr.buka = -1;
            //check jika sudah sampai tujuan
            if (pfCheckSampaiTujuan(cellCr.x, cellCr.y, tx, ty)) {
                res.unshift(cellCr);
                pfTelusurBalik(cellCr, res);
                return pfRes2Array(res);
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
        if (cell.x == x && cell.y == y) {
            res = true;
        }
    });
    return res;
}
/**
 * Mengecheck apakah bisa jalan ke posisi tertentu
 * @param x posisi x
 * @param y posisi y
 */
function pfBisaJalan(x, y) {
    //posisi horizontal di luar peta
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
