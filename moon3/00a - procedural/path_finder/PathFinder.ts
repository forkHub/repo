//konstanta untuk index posisi data disimpan
const PF_CELL_IDX: number = 0;
const PF_CELL_X: number = 1;
const PF_CELL_Y: number = 2;
const PF_CELL_BUKA: number = 3;
const PF_CELL_PARENT_IDX: number = 4;
const CELL_JARAK: number = 5;

let pfCells: Array<Array<number>> = [];	//array tempat menyimpan semua cell yang dibuat
let pfCcellMax: number = 100;			//maksimum cell boleh dibuat
let pfDataPeta: Array<string> = [];		//data peta

/**
 * Membuat jalur hasil dengan cara menelusuri balik dari cell terakhir ke pertama
 * @param cell Cell terakhir
 * @param res tempat menampung hasil
 */
function pfTelusurBalik(cell: Array<number>, res: Array<Array<Number>>): void {
	let i: number = 0;
	let cellTemp: Array<number> = null;
	let cellParent: Array<number> = null;
	let len: number;

	//cari parent dari cell yang sedang di check
	len = pfCells.length;
	for (i = 0; i < len; i++) {
		cellTemp = pfCells[i];
		if (cell[PF_CELL_PARENT_IDX] > -1 && (cellTemp[PF_CELL_IDX] == pfCells[cell[PF_CELL_PARENT_IDX]][PF_CELL_IDX])) {
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
	if (cellParent[PF_CELL_IDX] == -1) {
		return
	} else {
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
function pfBuatCell(parent: Array<number>, x: number, y: number, tx: number, ty: number): Array<number> {
	let cell: Array<number> = [];

	cell[PF_CELL_X] = x;
	cell[PF_CELL_Y] = y;
	cell[PF_CELL_BUKA] = 1;
	cell[PF_CELL_IDX] = pfCells.length;

	//isi parent bila ada
	if (parent) {
		cell[PF_CELL_PARENT_IDX] = parent[PF_CELL_IDX];
	}
	else {
		cell[PF_CELL_PARENT_IDX] = -1;
	}

	//hitung jarak
	cell[CELL_JARAK] = Math.abs(tx - x) + Math.abs(ty - y);

	return cell;
}

/**
 * Merubah hasil kebentuk array yang lebih sederhana
 * @param res Array sumber
 */
function pfRes2Array(res: Array<Array<number>>): Array<any> {
	let ar: Array<any> = [];

	res.forEach(cell => {
		ar.push([cell[PF_CELL_X], cell[PF_CELL_Y]]);
	})

	return ar;
}

/**
 * Fungsi utama Cari jalan
 * @param sx posisi awal x
 * @param sy posisi awal y
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfCariJalan(sx: number, sy: number, tx: number, ty: number): Array<any> {
	let res: Array<Array<number>> = []
	let resAr: Array<any>;

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
function pfCheckSampaiTujuan(x: number, y: number, tx: number, ty: number): Boolean {
	if ((x == tx) && (y == ty)) return true;
	return false;
}

/**
 * Cari cell yang masih terbuka
 */
function pfCariCellTerbuka(): Array<number> {
	let i: number = 0;
	let cell: Array<number> = [];
	let maxLen: number;
	let cellTemp: Array<number>;
	let len: number = 0;

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

/**
 * Buka cell
 * @param cellCr cell sekarang
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfBukaCell(cellCr: Array<number>, tx: number, ty: number): void {
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

/**
 * Proses mencari jalan
 * @param sx posisi sumber x
 * @param sy posisi sumber y
 * @param tx posisi target x
 * @param ty posisi target y
 */
function pfCariJalan2(sx: number, sy: number, tx: number, ty: number): Array<Array<number>> {
	let cellCr: Array<number>;
	let res: Array<Array<number>> = new Array<Array<number>>();

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
function pfCheckCellAda(x: number, y: number): boolean {
	let res: boolean = false;

	pfCells.forEach(cell => {
		if (cell[PF_CELL_X] == x && cell[PF_CELL_Y] == y) {
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
function pfBisaJalan(x: number, y: number): boolean {

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
function pfPosBisa(x: number, y: number): Boolean {
	if (pfCheckCellAda(x, y)) {
		return false;
	}

	//check block
	if (pfBisaJalan(x, y) == false) {
		return false;
	}

	return true;
}