function tombolTutupKlik() {
    window.top.location.href = urlHalUtama;
}
function buatSoal(soal1Pecahan = false, soal2Pecahan = false) {
    let soal = {
        pecahan: []
    };
    if (soal1Pecahan) {
        let p = Pecahan.buatCampuran(angkMaks);
        Pecahan.keBentukCampuran(p);
        soal.pecahan.push(p);
    }
    else {
        soal.pecahan.push(Pecahan.buatAcak(angkMaks));
    }
    if (soal2Pecahan) {
        let p = Pecahan.buatCampuran(angkMaks);
        Pecahan.keBentukCampuran(p);
        soal.pecahan.push(p);
    }
    else {
        soal.pecahan.push(Pecahan.buatAcak(angkMaks));
    }
    if (Pecahan.checkSama(Pecahan.clone(soal.pecahan[0]), Pecahan.clone(soal.pecahan[1]))) {
        soal.jawaban = '=';
    }
    else if (Pecahan.lebihBesar(Pecahan.clone(soal.pecahan[0]), Pecahan.clone(soal.pecahan[1]))) {
        soal.jawaban = '>';
    }
    else {
        soal.jawaban = '<';
    }
    return soal;
}
function renderSoal(soal) {
    soal1Cont.innerHTML = '';
    soal2Cont.innerHTML = '';
    soal1Cont.appendChild(Pecahan.render(soal.pecahan[0]));
    soal2Cont.appendChild(Pecahan.render(soal.pecahan[1]));
}
function soalMaju() {
    soalIdx++;
    if (soalIdx >= soals.length) {
        //render halaman akhir
        el.parentElement.removeChild(el);
        HalSelesai.tampil(document.body, Math.floor((jmlBenar / (jmlBenar + jmlSalah)) * 100)).catch((e) => {
            console.error(e);
        });
    }
    else {
        //soal berikutnya
        renderSoal(soals[soalIdx]);
        pg.progress(Math.floor((soalIdx / soals.length) * 100));
    }
}
function checkSoal(jawaban) {
    let soal = soals[soalIdx];
    if (soal.jawaban == jawaban) {
        ha.comp.dialog.tampil(`
			Jawaban Benar!<br/>
		`);
        ha.comp.dialog.okTbl.onclick = () => {
            ha.comp.dialog.detach();
            jmlBenar++;
            soalMaju();
        };
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
        };
    }
}
function tombolLebihDariKlik() {
    checkSoal('>');
}
function tombolSamaDenganKlik() {
    checkSoal('=');
}
function tombolKurangDariKlik() {
    checkSoal('<');
}
let pg = new ProgressBar();
let soals = [];
let soalIdx = 0;
let el = ha.comp.Util.getEl('div.hal-soal');
let jmlBenar = 0;
let jmlSalah = 0;
let soal1Cont = ha.comp.Util.getEl('div.soal-1');
let soal2Cont = ha.comp.Util.getEl('div.soal-2');
