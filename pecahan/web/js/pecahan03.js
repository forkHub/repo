/**
 * membandingkan pecahan berpenyebut sama
 */
var p3;
(function (p3) {
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
    p3.mulai = mulai;
    //buat pecahan berpenyebut sama
    //boleh sama pecahannya dengan yang sudah ada
    //penyebut minimal 2
    function buatSoal() {
        let hasil;
        let penyebut = Math.floor(Math.random() * 9) + 2;
        hasil = {
            pecahan: []
        };
        hasil.pecahan[0] = Pecahan.buat(0, Math.floor(Math.random() * 10) + 1, penyebut);
        hasil.pecahan[1] = Pecahan.buat(0, Math.floor(Math.random() * 10) + 1, penyebut);
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
})(p3 || (p3 = {}));
p3.mulai();
