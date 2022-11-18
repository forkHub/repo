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
			soals.push(buatSoal());
		}

		renderSoal(soals[0]);
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

		//TODO: reimplement
		// if (Pecahan.checkLebihBesar(hasil.pecahan[0], hasil.pecahan[1])) {
		// 	hasil.jawaban = '>';
		// }
		// else if (Pecahan.checkSetara(hasil.pecahan[0], hasil.pecahan[1])) {
		// 	hasil.jawaban = '=';
		// }
		// else {
		// 	hasil.jawaban = '<';
		// }

		return hasil;
	}

}

p5.mulai();
