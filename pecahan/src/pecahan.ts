namespace pecahan {
	export class Pecahan implements IPecahan {
		private _angka: number = 0;
		private _pembilang: number = 0;
		private _penyebut: number = 0;

		constructor(a: number, b: number, s: number) {
			this._angka = a;
			this._pembilang = b;
			this._penyebut = s;
		}

		skala(p: IPecahan, n: number): void {
			if (p.angka <= 0) {
				p.pembilang *= n;
				p.penyebut *= n;
			}
			else {
				//TODO:
			}
		}

		static create(a: number, b: number, s: number): IPecahan {
			let hasil: IPecahan;

			hasil = new Pecahan(a, b, s);

			return hasil;
		}

		public get angka(): number {
			return this._angka;
		}
		public set angka(value: number) {
			this._angka = value;
		}
		public get pembilang(): number {
			return this._pembilang;
		}
		public set pembilang(value: number) {
			this._pembilang = value;
		}
		public get penyebut(): number {
			return this._penyebut;
		}
		public set penyebut(value: number) {
			this._penyebut = value;
		}

	}


	interface IPecahan {
		angka: number,
		pembilang: number,
		penyebut: number
	}
}