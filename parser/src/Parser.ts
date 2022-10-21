
namespace ha.parse {
	export class Leksikal {
		readonly kataCadangan: string[] = [];
		readonly binopOpr: string[] = [];

		async pecah(str: string): Promise<void> {

			console.group('pecah');
			ha.parse.Kons.dataStr = str;

			while (Kons.dataStr.length > 0) {
				let char: string = Kons.dataStr.charAt(0);

				//string ""
				if (char == '\"') {
					let str2: string = this.ambilString(Kons.dataStr);
					// Kons.kata.push(str2);
					token.push({
						nama: Kons.TEKS,
						nilai: [str2],
						token: []
					});
					Kons.dataStr = Kons.dataStr.slice(str2.length);
				}

				//string '
				else if (this.ambilStringQuoteSatu()) {

				}

				//komentar
				else if (this.ambilKomentar()) {

				}

				//komentar segaris
				else if (this.ambilReg(/^\/\/.*/, '')) {

				}

				//angka => minus titik minus-titik
				else if (this.ambilReg(/^[0-9]*\.*[0-9]+/, Kons.ANGKA)) {

				}

				else if (this.ambilCadangan(this.binopOpr, Kons.OPR)) {

				}

				else if (this.ambilCadangan(this.kataCadangan, Kons.KATA_CADANGAN)) {

				}

				//kata include kata.dot
				else if (this.checkHuruf(char)) {
					let str2: string = this.ambilHuruf(Kons.dataStr);
					token.push({
						nama: Kons.KATA,
						nilai: [str2],
						token: []
					})
					Kons.dataStr = Kons.dataStr.slice(str2.length);
				}

				//simbol
				else if (this.checkSimbol(char)) {
					token.push({
						nama: char,
						nilai: [char],
						token: []
					})
					Kons.dataStr = Kons.dataStr.slice(1);
				}

				//ignore
				else if (!this.checkSimbol(char)) {
					Kons.dataStr = Kons.dataStr.slice(1);
				}

				else {
					console.log(ha.parse.renderToken(token));
					console.log(Kons.dataStr);
					throw Error('');
				}

			}

			console.groupEnd();
		}

		private ambilKomentar(): boolean {
			if (Kons.dataStr.slice(0, 2) != '/*') return false;

			let idx: number;

			idx = Kons.dataStr.indexOf('*/', 2);

			if (idx < 0) return false;

			console.log('komentar: ' + Kons.dataStr.slice(0, idx + 2));

			Kons.dataStr = Kons.dataStr.slice(idx + 2);

			console.log(Kons.dataStr);

			return true;
		}

		private ambilReg(reg: RegExp, namaToken: string = ''): boolean {
			let hsl: RegExpMatchArray = (Kons.dataStr.match(reg));

			if (hsl && hsl.length > 0) {
				Kons.dataStr = Kons.dataStr.slice(hsl[0].length);
				if (namaToken != '') {
					token.push({
						nama: namaToken,
						nilai: [hsl[0]],
						token: []
					})
				}
				return true;
			}

			return false;
		}

		private ambilStringQuoteSatu(): boolean {
			return this.ambilReg(/^'[a-zA-Z_][\.a-zA-Z0-9_$%#@]*'/, Kons.TEKS);
		}

		private ambilCadangan(dataCadangan: string[], namaToken: string): boolean {

			for (let i: number = 0; i < dataCadangan.length; i++) {

				let item: string = dataCadangan[i].toLowerCase();
				let str: string = Kons.dataStr.slice(0, item.length).toLowerCase();

				if (item == str) {
					let tokenBaru: IToken = {
						nama: namaToken,
						nilai: [item],
						token: []
					}

					if (namaToken == Kons.KATA_CADANGAN) {
						tokenBaru.nama = item;
					}

					token.push(tokenBaru)

					Kons.dataStr = Kons.dataStr.slice(item.length);
					return true;
				}
				else {
					// debugLog(item + ' / ' + str);
				}

			}

			return false;
		}

		private checkSimbol(char: string): boolean {
			if (char == ' ') return false;
			if (char == '\t') return false;
			if (char == '\r') return false;
			if (char == '\n') return false;

			return true;
		}

		private checkHuruf(char: string): boolean {
			if (char >= "A" && char <= "Z") return true;
			if (char >= "a" && char <= "z") return true;
			return false;
		}

		//ambil kata include kata.dot
		private ambilHuruf(str: string) {
			let hasil: string = '';
			let hurufReg: RegExp = /^[a-zA-Z_][\.a-zA-Z0-9_$%#@]*/;
			let hsl: RegExpMatchArray = (str.match(hurufReg));

			if (hsl) {
				hasil = hsl + '';
			}
			else {
				ha.parse.debugLog('data: ' + str.slice(0, 100));
				throw Error('huruf tidak cocok');
			}

			return hasil;
		}

		//ambil simbol

		private ambilString(str: string): string {
			let hasil: string;

			let idx: number = str.indexOf('"', 1);
			if (idx > 0) {
				hasil = str.slice(0, idx + 1);
			}
			else {
				throw Error('string unterminated');
			}

			return hasil;
		}
	}

	export class Grammar {
		static async check(): Promise<void> {
			let batas: number = 0;

			while (true) {

				debugGroupCollapsed('check grammar, ctr: ' + tokenCtr);
				let hasil: boolean = await this.check_grammar();
				ha.parse.debugGroupEnd();

				if (hasil) {
					tokenCtr = 0;
					if (token.length == 1) break;
				} else {
					// debugLog('check grammar gak ada hasil')
					tokenCtr++;
					if (tokenCtr >= token.length) {
						ha.parse.debugOn();
						ha.parse.debugLog('HABIS');
						break;
					}
				}

				batas++;
				if (batas > 5000) break;
			}

			ha.parse.debugOn();
			ha.parse.debugLog('selesai:');
			ha.parse.debugLog(this.renderToken(token));
		}

		private static async check_grammar(): Promise<boolean> {
			let adaTokenBaru: boolean = false;

			debugOff();

			// console.group('check token dengan rumus yang ada, ctr: ' + tokenCtr);
			for (let i: number = 0; i < grammarAr.length; i++) {

				debugGroupCollapsed('check rumus, idx ' + i)
				let hasil: boolean = await this.check_rumus(grammarAr[i].rumus);
				debugGroupEnd();

				if (hasil) {
					this.tokenBaru(i);
					adaTokenBaru = true;
					return true;
				}
			}


			// debugGroup();
			return adaTokenBaru;
		}

		private static tokenBaru(i: number): void {

			// debugLog('token: ' + grammarAr[i].nama + '/index rumus: ' + i, true);
			debugLog('[0]: ' + this.renderToken(token.slice(Math.max(tokenCtr - 1, 0), tokenCtr + 5)), true);

			//lolos
			//packaging
			// debugOff();
			// debugGroup('token baru');
			// debugLog('check token pada ctr ' + tokenCtr + ' cocok dengan rumus: ' + grammarAr[i].nama);

			// buat token
			let tokenBaru: IToken = {
				nama: grammarAr[i].nama,
				nilai: [],
				token: []
			}

			let rl: number = grammarAr[i].rumus[1].length;
			for (let j: number = 0; j < rl; j++) {
				tokenBaru.token.push(token[tokenCtr + j]);
			}
			// debugger;

			let kiri: IToken[] = token.slice(0, tokenCtr);
			let kanan: IToken[] = token.slice(tokenCtr + grammarAr[i].rumus[1].length);

			// debugOn();
			// debugGroupCollapsed('')
			// debugLog('token:');
			// debugLog(this.renderToken(token));
			// debugLog('kiri:');
			// debugLog(this.renderToken(kiri));
			// debugLog('kanan:');
			// debugLog(this.renderToken(kanan));
			// debugLog('token baru:');
			// debugLog(this.renderToken([tokenBaru]));
			// debugLog(tokenBaru);
			// debugGroupEnd();
			// debugOff();

			while (token.length > 0) {
				token.pop();
			}

			this.tambah(token, kiri);
			this.tambah(token, [tokenBaru]);
			this.tambah(token, kanan);

			// debugLog('token: ' + this.renderToken(token));
			// debugGroupEnd();

			// tokenCtr = 0;
			// debugGroup();
			debugLog('[1]: ' + this.renderToken(token.slice(Math.max(tokenCtr - 1, 0), tokenCtr + 5)), true);
			debugLog('', true);
		}

		private static renderToken(token: IToken[]): string {
			let hasil: string = '';

			token.forEach((item: IToken) => {
				hasil += item.nama;
				hasil += ' ';
			})

			return hasil;
		}

		private static tambah(sumber: IToken[], tambahan: IToken[]) {
			tambahan.forEach((item: IToken) => {
				sumber.push(item);
			});
		}

		private static async check_rumus(rumus: string[][], caseSensitif: boolean = true): Promise<boolean> {
			let rumusAwal: string[] = rumus[0];
			let inti: string[] = rumus[1];
			let akhir: string[] = rumus[2]

			// debugOff();
			// debugGroupCollapsed('check token = rumus');
			// debugLog('rumus:');
			// debugLog(rumus);
			// debugLog('awal ');
			// debugLog(rumusAwal);
			// debugLog('inti:');
			// debugLog(inti);
			// debugLog('akhir:');
			// debugLog(akhir);
			// debugLog('mulai: ' + tokenCtr);
			// debugGroupEnd();


			//check awal
			debugLog('check awal');
			for (let i: number = 0; i < rumusAwal.length; i++) {
				if (tokenCtr > 0) {
					let namaToken: string = token[tokenCtr - 1].nama;
					let rumusAwalTeks: string = rumusAwal[i]

					if (!caseSensitif) {
						namaToken = namaToken.toLowerCase();
						rumusAwalTeks = rumusAwalTeks.toLowerCase();
					}

					if (namaToken == rumusAwalTeks) {
						debugLog('awal salah, token: ' + token[tokenCtr - 1].nama);
						return false;
					}
					else {
						debugLog('awal gak di check');
					}
				}
			}

			//check inti
			debugLog('check inti');
			for (let i: number = 0; i < inti.length; i++) {

				if (tokenCtr + i >= token.length) {
					return false;
				}

				let namaToken: string = token[tokenCtr + i].nama;
				let namaInti: string = inti[i];

				if (!caseSensitif) {
					namaToken = namaToken.toLowerCase();
					namaInti = namaInti.toLowerCase();
				}

				if (namaToken != namaInti) {
					debugLog('token tidak sama, token: ' + token[tokenCtr + i].nama + '/rumus: ' + inti[i]);
					return false;
				}

			}

			//check akhir
			debugLog('check akhir');

			if (tokenCtr + inti.length < token.length) {
				let idx: number = tokenCtr + inti.length;
				for (let i: number = 0; i < akhir.length; i++) {

					let namaToken = token[idx].nama;
					let namaAkhir = akhir[i];

					if (!caseSensitif) {
						namaAkhir = namaAkhir.toLowerCase();
						namaToken = namaToken.toLowerCase();
					}

					if (namaToken == namaAkhir) {
						debugLog('akhir cocok return false');
						return false;
					}

				}
			}
			else {
				debugLog('check akhir gak di check: tokenCtr ' + tokenCtr + '/dataStr pjg: ' + token.length);
			}

			// debugGroup();
			return true;
		}

	}

	export let tokenCtr: number = 0;
	export const parser: Leksikal = new Leksikal();
}
