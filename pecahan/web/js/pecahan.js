class Pecahan {
    _angka = 0;
    _pembilang = 0;
    _penyebut = 0;
    _dec;
    constructor(a, bilang, sebut) {
        this.angka = a;
        this.pembilang = bilang;
        this.penyebut = sebut;
        if (a == 0) {
            this._dec = this.pembilang / this.penyebut;
        }
        else {
            this._dec = (this.penyebut * this.angka + this.pembilang) / this.penyebut;
        }
    }
    static clone(p) {
        return {
            angka: p.angka,
            pembilang: p.pembilang,
            penyebut: p.penyebut,
            dec: p.dec
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
    static checkSetara(p1, p2) {
        return p1.dec == p2.dec;
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
    static checkLebihBesar(p1, p2) {
        return p1.dec > p2.dec;
    }
    static buatAcak(mak = 100) {
        let pembilang;
        let penyebut;
        pembilang = Math.floor(Math.random() * (mak - 1)) + 1;
        penyebut = Math.floor(Math.random() * (mak - 1)) + 1;
        return this.buat(0, pembilang, penyebut);
    }
    static toString(p) {
        return p.angka + " " + p.pembilang + '/' + p.penyebut;
    }
    static keBentukCampuran(p) {
        if (p.angka > 0)
            return p;
        if (p.penyebut > p.pembilang)
            return p;
        console.log(this.toString(p));
        p.angka = Math.floor(p.pembilang / p.penyebut);
        p.pembilang = p.pembilang % p.penyebut;
        console.log(this.toString(p));
        console.log('');
        return p;
    }
    static tukar(p) {
        let a;
        this.keBentukBiasa(p);
        a = p.pembilang;
        p.pembilang = p.penyebut;
        p.penyebut = a;
        p.dec = p.pembilang / p.penyebut;
        return p;
    }
    static keBentukBiasa(p) {
        if (p.angka == 0)
            return p;
        console.log(this.toString(p));
        p.pembilang = (p.penyebut * p.angka) + p.pembilang;
        p.angka = 0;
        console.log(this.toString(p));
        console.log('');
        return p;
    }
    static buatCampuran(mak = 30) {
        let p;
        while (true) {
            p = this.buatAcak(mak);
            if (p.pembilang < p.penyebut) {
                this.tukar(p);
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
                if (Pecahan.checkSetara(item, hasil)) {
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
    get dec() {
        return this._dec;
    }
    set dec(p) {
        this._dec = p;
    }
}
