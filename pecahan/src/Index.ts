function buatSoal(): ISoal {
	let soal: ISoal = {
		pecahan: []
	};

	soal.pecahan.push(Pecahan.buatAcak(maks));
	soal.pecahan.push(Pecahan.buatAcak(maks));

	if (Pecahan.checkSama(soal.pecahan[0], soal.pecahan[1])) {
		soal.jawaban = '=';
	}
	else if (Pecahan.lebihBesar(soal.pecahan[0], soal.pecahan[1])) {
		soal.jawaban = '>';
	}
	else {
		soal.jawaban = '<';
	}

	return soal;
}

function renderSoal(soal: ISoal): void {
	soal1Cont.innerHTML = '';
	soal2Cont.innerHTML = '';

	soal1Cont.appendChild(Pecahan.render(soal.pecahan[0]));
	soal2Cont.appendChild(Pecahan.render(soal.pecahan[1]));
}

function soalMaju(): void {
	soalIdx++;

	if (soalIdx >= soals.length) {
		//render halaman akhir
		el.parentElement.removeChild(el);
		HalSelesai.tampil(document.body, Math.floor((nilai / soals.length) * 100)).catch((e) => {
			console.error(e);
		})
	}
	else {
		//soal berikutnya
		renderSoal(soals[soalIdx]);
		pg.progress(Math.floor((soalIdx / soals.length) * 100));
	}

}

function checkSoal(jawaban: string): void {
	let soal: ISoal = soals[soalIdx];

	if (soal.jawaban == jawaban) {
		ha.comp.dialog.tampil(`
			Jawaban Benar!<br/>
		`);
		ha.comp.dialog.okTbl.onclick = () => {
			ha.comp.dialog.detach();
			nilai++;
			soalMaju();
		}
	}
	else {
		ha.comp.dialog.tampil(`
			Jawaban Salah!<br/>
			Jawaban yang benar adalah <br/><br/>
			<span class="font-x-large">${soal.jawaban}</span>
		`);
		ha.comp.dialog.okTbl.onclick = () => {
			ha.comp.dialog.detach();
			soalMaju();
		}
	}

}

function tombolLebihDariKlik(): void {
	checkSoal('>');
}

function tombolSamaDenganKlik(): void {
	checkSoal('=');
}

function tombolKurangDariKlik(): void {
	checkSoal('<');
}

let nilai: number = 0;
let pg: ProgressBar = new ProgressBar();
let soals: ISoal[] = [];
let soalIdx: number = 0;
let el: HTMLElement = ha.comp.Util.getEl('div.hal-soal');
let maks: number = 20;
let jmlSoal: number = 2;

let soal1Cont: HTMLElement = ha.comp.Util.getEl('div.soal-1');
let soal2Cont: HTMLElement = ha.comp.Util.getEl('div.soal-2');

document.body.querySelector('div.progress-cont').appendChild(pg.el);

interface ISoal {
	pecahan?: IPecahan[];
	jawaban?: string;
}

for (let i: number = 0; i < jmlSoal; i++) {
	soals.push(buatSoal());
}

renderSoal(soals[0]);
pg.progress(0);




