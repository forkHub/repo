window.onload = () => {
	buatKalender(9, 2022);
}

function buatKalender(bulan: number, tahun: number): void {
	let date: Date = new Date(Date.now());
	let dateAr: Date[] = [];
	date.setFullYear(tahun, bulan - 1, 1);
	date.setHours(0, 0, 0, 0);
	dateAr.push(date);

	while (true) {
		date = dateAr[0];
		if (date.getDate() != 1) {
			let date2: Date;

			date2 = new Date(date);
			date2.setDate(date2.getDate() - 1);
			console.log(date2);
			dateAr.unshift(date2);
		}
		else {
			break;
		}
	}

	while (true) {
		date = dateAr[dateAr.length - 1];
		let date2 = new Date(date);
		date2.setDate(date2.getDate() + 1);

		if (date2.getMonth() != date.getMonth()) {
			break;
		}
		else {
			dateAr.push(date2);
		}
	}

	for (let i: number = 0; i < 10; i++) {
		tambahAkhir(dateAr);
		tambahAwal(dateAr);
	}

	// console.log(dateAr);
	document.body.appendChild(render(dateAr));

	function tambahAwal(dateAr: Date[]): void {
		let date: Date;

		date = dateAr[0];
		if (0 == date.getDay()) {
			return;
		}
		else {
			let date2: Date = new Date(date);
			date2.setDate(date2.getDate() - 1);
			dateAr.unshift(date2);
		}
	}

	function tambahAkhir(dateAr: Date[]): void {
		let date: Date;

		date = dateAr[dateAr.length - 1];
		if (6 == date.getDay()) {
			return;
		}
		else {
			let date2: Date = new Date(date);
			date2.setDate(date2.getDate() + 1);
			dateAr.push(date2);
		}
	}

	function render(dateAr: Date[]): HTMLElement {
		let hasil: HTMLElement = document.createElement('div');
		let row: HTMLElement;
		hasil.classList.add('kalendar');
		hasil.classList.add('disp-table');

		for (let i: number = 0; i < dateAr.length; i++) {

			if ((i % 7) == 0) {
				row = document.createElement('div');
				row.classList.add('disp-table-row');
				row.classList.add('minggu');
				hasil.appendChild(row);
			}

			let cell: HTMLElement = document.createElement('div');
			cell.classList.add('disp-table-cell');
			cell.classList.add('padding');
			cell.classList.add('tanggal');
			row.appendChild(cell);

			cell.innerText = dateAr[i].getDate() + '';

			// console.log(dateAr[i].getDate());
			// console.log(dateAr[i]);

		}

		return hasil;
	}
}

