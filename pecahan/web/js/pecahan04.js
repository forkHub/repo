/**
 * membandingkan pecahan
 * berpenyebut sama
 * bentuk biasa dan campuran
 */
var p4;
(function (p4) {
    function mulai() {
        document.body.querySelector('div.progress-cont').appendChild(pg.el);
        while (soals.length > 0) {
            soals.pop();
        }
        for (let i = 0; i < jmlSoal; i++) {
            soals.push(buatSoal());
        }
        renderSoal(soals[0]);
        pg.progress(0);
    }
    p4.mulai = mulai;
    function buatSoal() {
        let hasil;
        let penyebut = Math.floor(Math.random() * 9) + 2;
        hasil = {
            pecahan: []
        };
        hasil.pecahan[0] = Pecahan.buat(0, Math.floor(Math.random() * 10) + 1, penyebut);
        hasil.pecahan[1] = buatCampuran(penyebut);
        if (Math.floor(Math.random() * 2) == 1) {
            let p;
            p = hasil.pecahan[0];
            hasil.pecahan[0] = hasil.pecahan[1];
            hasil.pecahan[1] = p;
        }
        if (Pecahan.checkLebihBesar(hasil.pecahan[0], hasil.pecahan[1])) {
            hasil.jawaban = '>';
        }
        else if (Pecahan.checkSetara(hasil.pecahan[0], hasil.pecahan[1])) {
            hasil.jawaban = '=';
        }
        else {
            hasil.jawaban = '<';
        }
        return hasil;
    }
    function buatCampuran(penyebut) {
        let hasil;
        while (true) {
            hasil = Pecahan.buat(0, Math.floor(Math.random() * 10) + 1, penyebut);
            if (hasil.pembilang < hasil.penyebut) {
                Pecahan.tukar(hasil);
            }
            if (hasil.pembilang != hasil.penyebut && (hasil.pembilang % hasil.penyebut > 0)) {
                Pecahan.keBentukCampuran(hasil);
                break;
            }
        }
        return hasil;
    }
})(p4 || (p4 = {}));
p4.mulai();
