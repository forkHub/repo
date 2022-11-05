
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
					// console.log(item + ' / ' + str);
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
				console.log('data: ' + str.slice(0, 100));
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

				console.groupCollapsed('check grammar, ctr: ' + tokenDataCtr);
				let hasil: boolean = await this.check_grammar();
				console.groupEnd();

				if (hasil) {
					tokenDataCtr = 0;
					if (token.length == 1) {
						break;
					}

				} else {
					// console.log('check grammar gak ada hasil')
					tokenDataCtr++;
					if (tokenDataCtr >= token.length) {
						ha.parse.debugOn();
						console.log('HABIS');
						break;
					}
				}

				batas++;
				if (batas > 5000) break;
			}

			ha.parse.debugOn();
			console.log('selesai:');
			console.log(this.renderToken(token));
		}

		// private static renderRumus(rumus: string[][]): void {
		// 	rumus;

		// }

		private static async check_grammar(): Promise<boolean> {
			let adaTokenBaru: boolean = false;

			// console.group('check token dengan rumus yang ada, ctr: ' + tokenCtr);
			for (let i: number = 0; i < grammarAr.length; i++) {

				console.groupCollapsed('check rumus, idx ' + i + '/rumus ' + grammarAr[i].rumus);
				let hasil: boolean = await this.check_rumus(grammarAr[i].rumus);
				console.groupEnd();

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

			// console.log('token: ' + grammarAr[i].nama + '/index rumus: ' + i, true);
			console.log('[0]: ' + this.renderToken(token.slice(Math.max(tokenDataCtr - 1, 0), tokenDataCtr + 5)), true);

			//lolos
			//packaging
			// debugOff();
			// debugGroup('token baru');
			// console.log('check token pada ctr ' + tokenCtr + ' cocok dengan rumus: ' + grammarAr[i].nama);

			// buat token
			let tokenBaru: IToken = {
				nama: grammarAr[i].nama,
				nilai: [],
				token: []
			}

			let rl: number = grammarAr[i].rumus[1].length;
			for (let j: number = 0; j < rl; j++) {
				tokenBaru.token.push(token[tokenDataCtr + j]);
			}
			// debugger;

			let kiri: IToken[] = token.slice(0, tokenDataCtr);
			let kanan: IToken[] = token.slice(tokenDataCtr + grammarAr[i].rumus[1].length);

			// debugOn();
			// debugGroupCollapsed('')
			// console.log('token:');
			// console.log(this.renderToken(token));
			// console.log('kiri:');
			// console.log(this.renderToken(kiri));
			// console.log('kanan:');
			// console.log(this.renderToken(kanan));
			// console.log('token baru:');
			// console.log(this.renderToken([tokenBaru]));
			// console.log(tokenBaru);
			// debugGroupEnd();
			// debugOff();

			while (token.length > 0) {
				token.pop();
			}

			this.tambah(token, kiri);
			this.tambah(token, [tokenBaru]);
			this.tambah(token, kanan);

			// console.log('token: ' + this.renderToken(token));
			// debugGroupEnd();

			// tokenCtr = 0;
			// debugGroup();
			console.log('[1]: ' + this.renderToken(token.slice(Math.max(tokenDataCtr - 1, 0), tokenDataCtr + 5)), true);
			console.log('', true);
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
			// console.log('rumus:');
			// console.log(rumus);
			// console.log('awal ');
			// console.log(rumusAwal);
			// console.log('inti:');
			// console.log(inti);
			// console.log('akhir:');
			// console.log(akhir);
			// console.log('mulai: ' + tokenCtr);
			// debugGroupEnd();


			//check awal
			console.log('check awal');
			for (let i: number = 0; i < rumusAwal.length; i++) {

				if (tokenDataCtr > 0) {
					let namaToken: string = token[tokenDataCtr - 1].nama;
					let rumusAwalTeks: string = rumusAwal[i]

					if (!caseSensitif) {
						namaToken = namaToken.toLowerCase();
						rumusAwalTeks = rumusAwalTeks.toLowerCase();
					}

					if (namaToken == rumusAwalTeks) {
						console.log('awal salah, token: ' + namaToken + '/rumus token: ' + rumusAwalTeks);
						return false;
					}
					else {
						console.log('awal gak di check');
					}
				}
			}

			//check inti
			console.log('check inti');
			for (let i: number = 0; i < inti.length; i++) {

				if (tokenDataCtr + i >= token.length) {
					console.log('token index lebih, tokenCtr: ' + tokenDataCtr + '/i: ' + i + '/token.length: ' + token.length);
					return false;
				}

				let namaToken: string = token[tokenDataCtr + i].nama;
				let namaInti: string = inti[i];

				if (!caseSensitif) {
					namaToken = namaToken.toLowerCase();
					namaInti = namaInti.toLowerCase();
				}

				console.log('nama token ' + namaToken);
				console.log('namaInti ' + namaInti);
				console.log('tokenCtr ' + tokenDataCtr);
				console.log('i: ' + i);

				if (namaToken != namaInti) {
					console.log('token tidak sama, token: ' + namaToken + '/rumus: ' + namaInti + '/i: ' + i);
					return false;
				}

			}

			//check akhir
			console.log('check akhir');

			if (tokenDataCtr + inti.length < token.length) {
				let idx: number = tokenDataCtr + inti.length;
				for (let i: number = 0; i < akhir.length; i++) {

					let namaToken = token[idx].nama;
					let namaAkhir = akhir[i];

					if (!caseSensitif) {
						namaAkhir = namaAkhir.toLowerCase();
						namaToken = namaToken.toLowerCase();
					}

					if (namaToken == namaAkhir) {
						console.log('akhir cocok return false');
						return false;
					}

				}
			}
			else {
				console.log('check akhir gak di check: tokenCtr ' + tokenDataCtr + '/dataStr pjg: ' + token.length);
			}

			// debugGroup();
			return true;
		}

	}

	export let tokenDataCtr: number = 0;
	export const parser: Leksikal = new Leksikal();
}
