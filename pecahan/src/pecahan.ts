class Pecahan implements IPecahan {
	private _angka: number = 0;
	private _pembilang: number = 0;
	private _penyebut: number = 0;
	private _dec: number;



	constructor(a: number, bilang: number, sebut: number) {
		this.angka = a;
		this.pembilang = bilang;
		this.penyebut = sebut;

		Pecahan.updateDec(this);
	}

	static updateDec(p: IPecahan): void {
		if (p.angka == 0) {
			p.dec = p.pembilang / p.penyebut;
		}
		else {
			p.dec = (p.penyebut * p.angka + p.pembilang) / p.penyebut;
		}

	}

	static clone(p: IPecahan): IPecahan {
		return {
			angka: p.angka,
			pembilang: p.pembilang,
			penyebut: p.penyebut,
			dec: p.dec
		}
	}

	static skala(p: IPecahan, n: number): IPecahan {

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

	static checkCampuran(p: IPecahan): boolean {
		return (p.angka > 0);
	}

	static checkSetara(p1: IPecahan, p2: IPecahan): boolean {
		return p1.dec == p2.dec;
	}

	static render(p: IPecahan): HTMLElement {
		let view: HTMLElement;
		let strEl: string = `
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

	static checkLebihBesar(p1: IPecahan, p2: IPecahan): boolean {
		return p1.dec > p2.dec;
	}

	static buatAcak(mak: number = 100): IPecahan {
		let pembilang: number;
		let penyebut: number;

		pembilang = Math.floor(Math.random() * (mak - 1)) + 1;
		penyebut = Math.floor(Math.random() * (mak - 1)) + 1;

		return this.buat(0, pembilang, penyebut);
	}

	static toString(p: IPecahan): string {
		return p.angka + " " + p.pembilang + '/' + p.penyebut;
	}

	static keBentukCampuran(p: IPecahan): IPecahan {
		if (p.angka > 0) return p;
		if (p.penyebut > p.pembilang) return p;

		console.log(this.toString(p));

		p.angka = Math.floor(p.pembilang / p.penyebut);
		p.pembilang = p.pembilang % p.penyebut;

		console.log(this.toString(p));
		console.log('');

		return p;
	}

	static tukar(p: IPecahan): IPecahan {
		let a: number;

		this.keBentukBiasa(p);

		a = p.pembilang;
		p.pembilang = p.penyebut;
		p.penyebut = a;

		p.dec = p.pembilang / p.penyebut;
		return p;
	}

	static keBentukBiasa(p: IPecahan): IPecahan {
		if (p.angka == 0) return p;

		console.log(this.toString(p));
		p.pembilang = (p.penyebut * p.angka) + p.pembilang;
		p.angka = 0;
		console.log(this.toString(p));
		console.log('');

		return p;
	}

	static buatCampuran(mak: number = 30): IPecahan {
		let p: IPecahan;

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

	static buatAcakBanyakTidakBerulang(jml: number, mak: number = 0): IPecahan[] {
		let hasil: IPecahan[] = [];

		for (let i: number = 0; i < jml; i++) {
			hasil.push(this.buatAcakTidakBerulang(mak, hasil));
		}

		return hasil;
	}

	static buatAcakTidakBerulang(mak: number = 10, sudahAda: IPecahan[] = []): IPecahan {
		let hasil: IPecahan;
		let sama: boolean;

		while (true) {
			hasil = this.buatAcak(mak);

			//check sama
			sama = false;
			sudahAda.forEach((item: IPecahan) => {
				if (Pecahan.checkSetara(item, hasil)) {
					sama = true;
				}
			})


			if (!sama) {
				break;
			}
		}

		return hasil;
	}

	static buat(a: number, b: number, s: number): IPecahan {
		let hasil: IPecahan;
		hasil = new Pecahan(a, b, s);
		return hasil;
	}

	public get angka(): number {
		return this._angka;
	}
	public set angka(value: number) {
		this._angka = value;
		Pecahan.updateDec(this);
	}

	public get pembilang(): number {
		return this._pembilang;
	}
	public set pembilang(value: number) {
		this._pembilang = value;
		Pecahan.updateDec(this);
	}

	public get penyebut(): number {
		return this._penyebut;
	}
	public set penyebut(value: number) {
		this._penyebut = value;
		Pecahan.updateDec(this);
	}

	public get dec(): number {
		return this._dec;
	}

	public set dec(p: number) {
		this._dec = p;
	}

}


interface IPecahan {
	angka: number,
	pembilang: number,
	penyebut: number,
	dec: number
}