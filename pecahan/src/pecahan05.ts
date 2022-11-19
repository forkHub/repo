/**
 * membandingkan pecahan 
 * dengan angka
 */
namespace p5 {
	export function mulai(): void {
		document.body.querySelector('div.progress-cont').appendChild(pg.el);

		while (soals.length > 0) {
			soals.pop();
		}

		for (let i: number = 0; i < jmlSoal; i++) {
			console.group();
			soals.push(buatSoal());
			console.groupEnd();
		}

		console.group();
		renderSoal(soals[0]);
		console.groupEnd();

		pg.progress(0);
	}

	function buatSoal(): ISoal {
		let hasil: ISoal;
		let angka: number = Math.floor(Math.random() * 5) + 1;
		let kurang: boolean = Math.floor(Math.random() * 2) == 1;
		let pecahan: IPecahan = Pecahan.buatAcak(angkMaks);

		if (kurang) {
			pecahan.angka = angka - 1;
		}
		else {
			pecahan.angka = angka + 1;
		}


		hasil = {
			pecahan: []
		};

		hasil.pecahan[0] = pecahan;
		hasil.pecahan[1] = angka;

		if (Math.floor(Math.random() * 2) == 1) {
			let p: any;

			p = hasil.pecahan[0];
			hasil.pecahan[0] = hasil.pecahan[1];
			hasil.pecahan[1] = p;
		}

		let p1: number;
		let p2: number;

		if (typeof (hasil.pecahan[0]) == 'number') {
			p1 = (hasil.pecahan[0]);
		}
		else {
			p1 = (hasil.pecahan[0] as IPecahan).dec;
		}

		if (typeof (hasil.pecahan[1]) == 'number') {
			p2 = hasil.pecahan[1];
		}
		else {
			p2 = (hasil.pecahan[1] as IPecahan).dec;
		}

		let a = typeof (hasil.pecahan[0]);
		let b = typeof (hasil.pecahan[1]);

		a; b; //

		if (p1 < p2) {
			hasil.jawaban = '<';
		}
		else if (p1 > p2) {
			hasil.jawaban = '>';
		}
		else if (p1 == p2) {
			hasil.jawaban = '=';
		}
		else {
			debugger;
			throw Error();
		}

		console.log(hasil.pecahan[0]);
		console.log(hasil.pecahan[1]);
		console.log(hasil.jawaban);

		return hasil;
	}

}

renderSoal = (soal: ISoal) => {
	soal1Cont.innerHTML = '';
	soal2Cont.innerHTML = '';

	console.log(soal);
	console.log(typeof (soal.pecahan[0]));
	console.log(typeof (soal.pecahan[1]));

	if (typeof (soal.pecahan[0]) == 'number') {
		soal1Cont.innerHTML = `<div>${soal.pecahan[0]}</div>`;
	}
	else {
		soal1Cont.appendChild(Pecahan.render(soal.pecahan[0]));
	}

	if (typeof (soal.pecahan[1]) == 'number') {
		soal2Cont.innerHTML = `<div>${soal.pecahan[1]}</div>`;
	}
	else {
		soal2Cont.appendChild(Pecahan.render(soal.pecahan[1]));
	}

}

p5.mulai();
