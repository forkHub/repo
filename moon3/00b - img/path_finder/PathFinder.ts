const CELL_IDX: number = 0;
const CELL_X: number = 1;
const CELL_Y: number = 2;
const CELL_BUKA: number = 3;
const CELL_PARENT_IDX: number = 4;
const CELL_JARAK: number = 5;

let _cells: Array<Array<number>> = [];
let _callMax: number = 100;
let _peta: Array<string> = [];

function pfTelusur(cell: Array<number>, res: Array<Array<Number>>): void {
	let i: number = 0;
	let cellTemp: Array<number> = null;
	let cellParent: Array<number> = null;
	let len: number;

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
		return
	} else {
		pfTelusur(cellParent, res);
	}
}

function pfBuatCell(parent: Array<number>, i: number, j: number, targetX: number, targetY: number): Array<number> {
	let cell: Array<number> = [];

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

function pfRes2Array(res: Array<Array<number>>): Array<any> {
	let ar: Array<any> = [];

	res.forEach(cell => {
		ar.push([cell[CELL_X], cell[CELL_Y]]);
	})

	return ar;
}

function pfCariJalan(sx: number, sy: number, tx: number, ty: number): Array<any> {
	let res: Array<Array<number>> = []
	let resAr: Array<any>;

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

function pfCheckSampaiTujuan(i: number, j: number, tx: number, ty: number): Boolean {
	if ((i == tx) && (j == ty)) return true;
	return false;
}

function pfCariCellTerbuka(): Array<number> {
	let i: number = 0;
	let cell: Array<number> = [];
	let maxLen: number;
	let cellTemp: Array<number>;
	let len: number = 0;

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

function pfBukaCell(cellCr: Array<number>, tx: number, ty: number): void {
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

function pfCariJalan2(sx: number, sy: number, tx: number, ty: number): Array<Array<number>> {
	let cellCr: Array<number>;
	let res: Array<Array<number>> = new Array<Array<number>>();

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

function pfCheckCellAda(ix: number, jx: number): boolean {
	let res: boolean = false;

	_cells.forEach(cell => {
		if (cell[CELL_X] == ix && cell[CELL_Y] == jx) {
			res = true;
		}
	});

	return res;
}

function pfBisaJalan(x: number, y: number): boolean {

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

function pfPosBisa(ix: number, jx: number): Boolean {
	if (pfCheckCellAda(ix, jx)) {
		return false;
	}

	//check block
	if (pfBisaJalan(ix, jx) == false) {
		return false;
	}

	return true;
}