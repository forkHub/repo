class Pecahan {
    _angka = 0;
    _pembilang = 0;
    _penyebut = 0;
    constructor(a, bilang, sebut) {
        this.angka = a;
        this.pembilang = bilang;
        this.penyebut = sebut;
    }
    static clone(p) {
        return {
            angka: p.angka,
            pembilang: p.pembilang,
            penyebut: p.penyebut
        };
    }
    static skala(p, n) {
        if (!this.checkCampuran(p)) {
            p.pembilang *= n;
            p.penyebut *= n;
        }
        else {
            this.keBentukBiasa(p);
            p.pembilang *= n;
            p.penyebut *= n;
            this.keBentukCampuran(p);
        }
        return p;
    }
    static checkCampuran(p) {
        return (p.angka > 0);
    }
    static toDesimal(p) {
        return p.pembilang / p.penyebut;
    }
    static checkSama(p1, p2) {
        this.keBentukBiasa(p1);
        this.keBentukBiasa(p2);
        if (this.toDesimal(p1) != this.toDesimal(p2))
            return false;
        return true;
    }
    static render(p) {
        let view;
        let strEl = `
			<div class='disp-inline-block'>
				<div class='pecahan disp-flex padding-4'>
					<div class='angka tengah-tengah text-align-center padding-4'>
						<span></span>
					</div> 
					<div class='pecahan2 padding-4'>
						<div class='pembilang text-align-center'>
							<span></span>
						</div>
						<div class='garis'>
							<hr/>
						</div>
						<div class='penyebut text-align-center'>
							<span></span>
						</div>
					</div>
				</div>
			</div>`;
        view = ha.comp.Util.createEl(strEl);
        view.querySelector('div.pembilang span').innerHTML = p.pembilang + '';
        view.querySelector('div.penyebut span').innerHTML = p.penyebut + '';
        view.querySelector('div.angka span').innerHTML = (p.angka != 0 ? p.angka : '') + '';
        return view;
    }
    static lebihBesar(p1, p2) {
        this.keBentukBiasa(p1);
        this.keBentukBiasa(p2);
        let a1 = p1.pembilang * p2.penyebut;
        let a2 = p2.pembilang * p1.penyebut;
        return a1 > a2;
    }
    static buatAcak(mak = 100) {
        let pembilang;
        let penyebut;
        pembilang = Math.floor(Math.random() * mak) + 1;
        penyebut = Math.floor(Math.random() * mak) + 1;
        return this.buat(0, pembilang, penyebut);
    }
    static keBentukCampuran(p) {
        if (p.angka > 0)
            return p;
        p.angka = Math.floor(p.pembilang / p.penyebut);
        p.pembilang = p.pembilang % p.penyebut;
        return p;
    }
    static keBentukBiasa(p) {
        if (p.angka == 0)
            return p;
        p.pembilang = p.penyebut * p.angka + p.pembilang;
        return p;
    }
    static buatCampuran(mak = 30) {
        let p;
        while (true) {
            p = this.buatAcak(mak);
            if (p.pembilang < p.penyebut) {
                let pembilang = p.pembilang;
                p.pembilang = p.penyebut;
                p.penyebut = pembilang;
            }
            if (p.pembilang % p.penyebut != 0) {
                break;
            }
        }
        return p;
    }
    static buatAcakBanyakTidakBerulang(jml, mak = 0) {
        let hasil = [];
        for (let i = 0; i < jml; i++) {
            hasil.push(this.buatAcakTidakBerulang(mak, hasil));
        }
        return hasil;
    }
    static buatAcakTidakBerulang(mak = 10, sudahAda = []) {
        let hasil;
        let sama;
        while (true) {
            hasil = this.buatAcak(mak);
            //check sama
            sama = false;
            sudahAda.forEach((item) => {
                if (Pecahan.checkSama(item, hasil)) {
                    sama = true;
                }
            });
            if (!sama) {
                break;
            }
        }
        return hasil;
    }
    static buat(a, b, s) {
        let hasil;
        hasil = new Pecahan(a, b, s);
        return hasil;
    }
    get angka() {
        return this._angka;
    }
    set angka(value) {
        this._angka = value;
    }
    get pembilang() {
        return this._pembilang;
    }
    set pembilang(value) {
        if (value > 30) {
            ha.comp.Util.stackTrace();
        }
        this._pembilang = value;
    }
    get penyebut() {
        return this._penyebut;
    }
    set penyebut(value) {
        if (value > 30) {
            ha.comp.Util.stackTrace();
        }
        this._penyebut = value;
    }
}
