
//NOTE: final, lib
class Validator {
	readonly VAL_ANGKA: number = 1;
	readonly VAL_TEKS: number = 2;
	readonly VAL_PASS: number = 3;
	readonly VAL_EMAIL: number = 5;
	readonly VAL_USERNAME: number = 5;
	readonly VAL_WA: number = 5;

	readonly SAN_ESC: number = 6;

	private field_nama: string = '';
	private field_panjang_min: string = '';
	private field_panjang_max: string = '';

	readonly ERR_PASS: string = 'Password mengandung karakter yang tidak diperbolehkan';
	readonly ERR_PANJANG_MIN: string = `Panjang minimal ${this.field_nama} adalah ${this.field_panjang_min}`;
	readonly ERR_PANJANG_MAX: string = `Panjang minimal ${this.field_nama} adalah ${this.field_panjang_max}`;


	escape(str: string): string {
		let hasil: string = str;

		while (hasil.indexOf("<") > -1) {
			hasil = hasil.replace("<", "&lt;");
		}

		while (hasil.indexOf(">") > -1) {
			hasil = hasil.replace(">", "&gt;");
		}

		return hasil;
	}


	checkUserNameErr(value: string, msg: string) {
		if (!this.checkUserName(value)) {
			throw Error(msg);
		}
	}

	checkAngkaErr(value: string, msg: string): number {
		let angka: number = parseInt(value);

		if (!this.checkAngka(angka + '')) {
			throw Error(msg);
		}

		return angka;
	}

	checkWaErr(value: string, msg: string = 'No Wa Tidak valid'): void {
		if (!this.checkWa(value)) {
			throw Error(msg);
		}
	}

	checkEmailErr(value: string, msg: string = 'Email Tidak valid'): void {
		if (!this.checkEmail(value)) {
			throw Error(msg);
		}
	}

	checkPassError(value: string, msg: string): void {
		if (!this.checkPassword(value)) {
			throw Error(msg);
		}
	}

	checkUserName(value: string): boolean {
		let reg: RegExp = /[0-9A-Za-z._!@#]+/
		let hasil: RegExpMatchArray = value.match(reg);

		if (!hasil) return false;
		if (hasil.length > 1) return false;
		if (hasil[0] != value) return false;

		return true
	}

	checkAngka(value: string): boolean {
		let reg: RegExp = /[0-9]+/
		let hasil: RegExpMatchArray = value.match(reg);

		if (!hasil) return false;
		if (hasil.length > 1) return false;
		if (hasil[0] != value) return false;

		return true
	}

	checkEmail(value: string): boolean {
		if (value.indexOf('@') == -1) return false;
		if (value.indexOf('.') == -1) return false;
		return true;
	}

	checkWa(value: string): boolean {
		let reg: RegExp = /62[0-9]+/
		let hasil: RegExpMatchArray = value.match(reg);

		if (!hasil) return false;
		if (hasil.length > 1) return false;
		if (hasil[0] != value) return false;

		return true
	}

	checkPassword(pass: string): boolean {
		let reg: RegExp = /[A-Za-z0-9_.!]+/
		let hasil: RegExpMatchArray = pass.match(reg);

		if (!hasil) return false;
		if (hasil.length > 1) return false;
		if (hasil[0] != pass) return false;

		return true;
	}

	checkMin(str: string, min: number): boolean {
		if (!str) return false;
		if (str.length == 0) return false;
		if (str.length < min) return false;
		return true;
	}

	checkScriptArErr(strAr: string[]): void {
		strAr.forEach((str: string) => {
			this.checkScriptErr(str);
		});
	}

	checkScriptErr(str: string): string {
		if (str.toLowerCase().indexOf('<script') > -1) {
			// console.log('script error');
			// console.log(str);
			throw Error('Akses ditolak');
		}

		if (str.toLowerCase().indexOf('</script>') > -1) {
			// console.log('script error');
			// console.log(str);
			throw Error('Akses ditolak');
		}

		return str;
	}

	validate(data: string, tipe: number[], nama: string, min: number = -1, max: number = 999999): void {
		this.field_panjang_min = min + '';
		this.field_panjang_max = max + '';
		this.field_nama = nama;

		if (min > 0) {
			this.field_panjang_min = min + '';
			if (data.length < min) throw Error(this.ERR_PANJANG_MIN);
		}

		if (max < 999999) {
			this.field_panjang_max = max + '';
			if (data.length > max) throw Error(this.ERR_PANJANG_MAX);
		}

		for (let i: number = 0; i < tipe.length; i++) {
			let n: number = tipe[i];

			if (this.VAL_ANGKA == n) {

			}

			if (this.VAL_EMAIL == n) {

			}

			if (this.VAL_PASS == n) {

			}

			if (this.VAL_TEKS == n) {

			}

			if (this.VAL_PASS == n) {

			}

			if (this.VAL_WA == n) {

			}

			if (this.VAL_USERNAME == n) {

			}

		}

	}

}

export var v: Validator = new Validator();