/**
 * membandingkan pecahan campuran
 * dengan penyebut sama
 */
namespace p6 {
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
		let s1: number = 0;
		let s2: number = 0;
		let b1: number = 0;
		let b2: number = 0;
		let a: number = 0;

		s1 = Math.floor(Math.random() * 5) + 2;
		s2 = s1;

		//buat s2 yang tidak sama dengan s1;
		// while (true) {
		// 	s2 = Math.floor(Math.random() * 5) + 2;
		// 	console.log(s2 + '-' + s1)
		// 	if (s2 != s1) {
		// 		break;
		// 	}
		// }

		//buat b1 yang tidak habis dibagi s1
		while (true) {
			b1 = Math.floor(Math.random() * 10) + 1;
			if (b1 % s1 != 0) {
				break;
			}
			debugger;
		}

		//buat b2 yang tidak habis dibagi s2
		while (true) {
			b2 = Math.floor(Math.random() * 10) + 1;
			if (b2 % s2 != 0) {
				break;
			}
		}

		hasil = {
			pecahan: []
		};

		a = Math.floor(Math.random() * 5) + 1;
		hasil.pecahan.push(Pecahan.buat(a, b1, s1));
		hasil.pecahan.push(Pecahan.buat(a, b2, s2));

		let p1: IPecahan = hasil.pecahan[0];
		let p2: IPecahan = hasil.pecahan[1];

		if (p1.dec < p2.dec) {
			hasil.jawaban = '<';
		}
		else if (p1.dec > p2.dec) {
			hasil.jawaban = '>';
		}
		else if (p1.dec == p2.dec) {
			hasil.jawaban = '=';
		}
		else {
			debugger;
			throw Error();
		}

		return hasil;

		// let hasil: ISoal;
		// let angka: number = Math.floor(Math.random() * 5) + 1;
		// let kurang: boolean = Math.floor(Math.random() * 2) == 1;
		// let pecahan: IPecahan = Pecahan.buatAcak(angkMaks);

		// if (kurang) {
		// 	pecahan.angka = angka - 1;
		// }
		// else {
		// 	pecahan.angka = angka + 1;
		// }


		// hasil = {
		// 	pecahan: []
		// };

		// hasil.pecahan[0] = pecahan;
		// hasil.pecahan[1] = angka;

		// if (Math.floor(Math.random() * 2) == 1) {
		// 	let p: any;

		// 	p = hasil.pecahan[0];
		// 	hasil.pecahan[0] = hasil.pecahan[1];
		// 	hasil.pecahan[1] = p;
		// }

		// let p1: number;
		// let p2: number;

		// if (typeof (hasil.pecahan[0]) == 'number') {
		// 	p1 = (hasil.pecahan[0]);
		// }
		// else {
		// 	p1 = (hasil.pecahan[0] as IPecahan).dec;
		// }

		// if (typeof (hasil.pecahan[1]) == 'number') {
		// 	p2 = hasil.pecahan[1];
		// }
		// else {
		// 	p2 = (hasil.pecahan[1] as IPecahan).dec;
		// }

		// let a = typeof (hasil.pecahan[0]);
		// let b = typeof (hasil.pecahan[1]);

		// a; b; //

		// if (p1 < p2) {
		// 	hasil.jawaban = '<';
		// }
		// else if (p1 > p2) {
		// 	hasil.jawaban = '>';
		// }
		// else if (p1 == p2) {
		// 	hasil.jawaban = '=';
		// }
		// else {
		// 	debugger;
		// 	throw Error();
		// }

		// console.log(hasil.pecahan[0]);
		// console.log(hasil.pecahan[1]);
		// console.log(hasil.jawaban);

		// return hasil;
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

p6.mulai();
