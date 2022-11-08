/**
 * membandingkan pecahan berpenyebut sama
 */
namespace p3 {
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

    //buat pecahan berpenyebut sama
    //boleh sama pecahannya dengan yang sudah ada
    //penyebut minimal 2
    function buatSoal(): ISoal {
        let hasil: ISoal;
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

}

p3.mulai();