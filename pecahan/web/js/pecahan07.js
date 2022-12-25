/**
 * membandingkan pecahan campuran
 * dengan penyebut campur
 * dengan angka yang sama
 */
var p7;
(function (p7) {
    function mulai() {
        document.body.querySelector('div.progress-cont').appendChild(pg.el);
        while (soals.length > 0) {
            soals.pop();
        }
        for (let i = 0; i < jmlSoal; i++) {
            console.group();
            soals.push(buatSoal());
            console.groupEnd();
        }
        console.group();
        renderSoal(soals[0]);
        console.groupEnd();
        pg.progress(0);
    }
    p7.mulai = mulai;
    function buatSoal() {
        let hasil;
        let sebut1 = 0;
        let sebut2 = 0;
        let bilang1 = 0;
        let bilang2 = 0;
        let a = 0;
        hasil = {
            pecahan: []
        };
        //penyebut bebas
        sebut1 = Math.floor(Math.random() * 5) + 2;
        sebut2 = Math.floor(Math.random() * 5) + 2;
        //pembilang bebas
        //buat b1 yang tidak habis dibagi s1
        while (true) {
            bilang1 = Math.floor(Math.random() * 10) + 1;
            if (bilang1 % sebut1 != 0) {
                break;
            }
            debugger;
        }
        //buat b2 yang tidak habis dibagi s2
        while (true) {
            bilang2 = Math.floor(Math.random() * 10) + 1;
            if (bilang2 % sebut2 != 0) {
                break;
            }
        }
        //bilangan bulat bebas
        a = Math.floor(Math.random() * 5) + 1;
        hasil.pecahan.push(Pecahan.buat(a, bilang1, sebut1));
        a = Math.floor(Math.random() * 5) + 1;
        hasil.pecahan.push(Pecahan.buat(a, bilang2, sebut2));
        let p1 = hasil.pecahan[0];
        let p2 = hasil.pecahan[1];
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
    }
})(p7 || (p7 = {}));
renderSoal = (soal) => {
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
};
p7.mulai();
