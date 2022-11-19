function tombolTutupKlik(): void {
	window.top.location.href = urlHalUtama;
}

function buatSoal(soal1Pecahan: boolean = false, soal2Pecahan: boolean = false): ISoal {
	let soal: ISoal = {
		pecahan: []
	};

	if (soal1Pecahan) {
		let p: IPecahan = Pecahan.buatCampuran(angkMaks)
		Pecahan.keBentukCampuran(p);
		soal.pecahan.push(p);
	}
	else {
		soal.pecahan.push(Pecahan.buatAcak(angkMaks));
	}

	if (soal2Pecahan) {
		let p: IPecahan = Pecahan.buatCampuran(angkMaks)
		Pecahan.keBentukCampuran(p);
		soal.pecahan.push(p);
	}
	else {
		soal.pecahan.push(Pecahan.buatAcak(angkMaks));
	}


	if (Pecahan.checkSetara(Pecahan.clone(soal.pecahan[0]), Pecahan.clone(soal.pecahan[1]))) {
		soal.jawaban = '=';
	}
	else if (Pecahan.checkLebihBesar(Pecahan.clone(soal.pecahan[0]), Pecahan.clone(soal.pecahan[1]))) {
		soal.jawaban = '>';
	}
	else {
		soal.jawaban = '<';
	}

	return soal;
}

let renderSoal: (soal: ISoal) => void;
renderSoal = (soal: ISoal): void => {
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
		HalSelesai.tampil(document.body, Math.floor((jmlBenar / (jmlBenar + jmlSalah)) * 100)).catch((e) => {
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

	console.log('check soal:');
	console.log(soal);
	console.log('soal idx ' + soalIdx);
	console.log('jawaban: ' + jawaban);

	if (soal.jawaban == jawaban) {
		ha.comp.dialog.tampil(`
			Jawaban Benar!<br/>
		`);

		ha.comp.dialog.okTbl.onclick = () => {
			ha.comp.dialog.detach();
			jmlBenar++;
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
			renderSoal(soals[soalIdx]);
			pg.progress(Math.floor((soalIdx / soals.length) * 100));
			jmlSalah++;
		}
	}

}

function tombolLebihDariKlik(): void {
	console.group();
	checkSoal('>');
	console.groupEnd();
}

function tombolSamaDenganKlik(): void {
	checkSoal('=');
}

function tombolKurangDariKlik(): void {
	checkSoal('<');
}

const pg: ProgressBar = new ProgressBar();
const soals: ISoal[] = [];

let soalIdx: number = 0;
let el: HTMLElement = ha.comp.Util.getEl('div.hal-soal');
let jmlBenar: number = 0;
let jmlSalah: number = 0;

const soal1Cont: HTMLElement = ha.comp.Util.getEl('div.soal-1');
const soal2Cont: HTMLElement = ha.comp.Util.getEl('div.soal-2');

interface ISoal {
	pecahan?: any[] | IPecahan[];
	jawaban?: string;
}
