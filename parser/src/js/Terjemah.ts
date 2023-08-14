namespace ha.parse.js {
	export class Terjemah {
		static readonly kedalaman: string[] = [];
		static readonly kurungStak: number[] = [];
		static readonly kontek: string[] = [];
		private static kontekBinopMin: boolean = false;
		private static tab: number = 0;

		static async terjemah(data: IToken): Promise<string> {
			let hasil: string = '';

			this.kedalaman.push(data.nama);

			if (data.nama == Kons.STMT) {
				console.log('');
			}
			console.log('terjemah ' + data.nama);

			if (data.nilai.length > 0) {
				let kata: string = data.nilai[0];

				if (data.nama == Kons.OPR) {
					hasil += ' ' + kata + ' ';
				}
				else {
					hasil += this.terjemahKata(kata);
				}

				// if (kata == '{') {
				// 	hasil += '\n';
				// }
				// else if (kata == '}') {
				// 	hasil += '\n';
				// }

			}

			else if (data.token.length > 0) {
				hasil += await this.terjemahGenerik(data);
			}

			else {
				throw Error('item belum di kerjakan: ' + data.nama);
			}

			this.kedalaman.pop();
			return hasil;
		}

		private static async terjemahGenerik(data: IToken): Promise<string> {
			let hasil: string = '';

			if (data.nama == Kons.FOR_STMT) {

				let varIsi: IToken[] = [];
				let varIsiStr: string;
				this.getVarIsi(data, varIsi);
				varIsiStr = await this.terjemah(varIsi[0]);

				let binop: IToken[] = [];
				this.getToken(data, binop, Kons.BINOP);

				this.kontek.push(data.nama);

				let hasil: string = this.spasiTab() + 'for ' + varIsiStr + ' to ' + (await this.terjemah(binop[0].token[2])) + '';

				let kr: IToken[] = [];
				this.getToken(data, kr, '{}');
				hasil += await this.terjemah(kr[0]);

				return hasil;
			}

			if (data.nama == Kons.BINOP) {
				if (data.token.length == 2) {
					let hasil: string = '';
					hasil += await this.terjemah(data.token[0]);
					hasil += ' ';
					this.kontekBinopMin = true;
					hasil += await this.terjemah(data.token[1]);
					this.kontekBinopMin = false;

					return hasil;
				}
			}

			if (data.nama == Kons.MIN) {
				if (this.kontekBinopMin) {
					debugger;
					let hasil: string = '';
					hasil += await this.terjemah(data.token[0]);
					hasil += ' ';
					hasil += await this.terjemah(data.token[1]);
					return hasil;
				}
			}

			for (let i: number = 0; i < data.token.length; i++) {
				hasil += await this.terjemah(data.token[i]);
			}

			return hasil;
		}

		private static spasiTab(): string {
			let hasil: string = '';

			for (let i: number = 0; i < this.tab; i++) {
				hasil += '    ';
			}

			return hasil;
		}

		private static terjemahKata(kata: string): string {

			if (kata == '=') {
				return ' = ';
			}

			if (kata == 'while') {
				this.kontek.push(kata);
			}

			if (kata == 'else') {
				this.kontek.push(kata);
			}

			if (kata == 'else if') {
				this.kontek.push(kata);
				return 'ElseIf '
			}

			if (kata == '(') {
				this.kurungStak.push(0);
				console.log('push: ' + this.kurungStak.length);
			}

			if (kata == ')') {
				this.kurungStak.pop();
				console.log('pop: ' + this.kurungStak.length);
			}

			if (kata == '{') {
				this.tab++;

				if (this.kontek.length > 0) {
					let kontekStr = this.kontek[this.kontek.length - 1];
					if (kontekStr == 'function') {
						return '\n';
					}
					else if (kontekStr == 'while') {
						return '\n';
					}
					else if (kontekStr == 'else if') {
						return '\n';
					}
					else if (kontekStr == 'else') {
						return '\n';
					}
					else if (kontekStr == Kons.FOR_STMT) {
						return '\n';
					}
					else if (kontekStr == 'if') {
						return ' Then\n';
					}
				}
			}

			if (kata == '}') {
				this.tab--;

				let kstr: string = this.kontek.pop();
				if (kstr == 'if') {
					return this.spasiTab() + 'EndIf\n';
				}
				else if (kstr == 'while') {
					return this.spasiTab() + 'Wend\n';
				}
				else if (kstr == 'else if') {
					return '\n';
				}
				else if (kstr == 'else') {
					return this.spasiTab() + 'EndIf\n';
				}
				else if (kstr == Kons.FOR_STMT) {
					return this.spasiTab() + 'Next\n';
				}
				else if (kstr == 'function') {
					return this.spasiTab() + 'EndFunction\n';
				}
			}

			if (kata == 'function') {
				this.kontek.push(kata);
				return this.spasiTab() + 'Function ';
			}

			if (kata == 'if') {
				this.kontek.push(kata);
				return this.spasiTab() + 'If ';
			}

			if (kata == ';') {
				console.log('stack lengh ' + this.kurungStak.length);

				// debugger;
				if (this.kurungStak.length > 0) {
					return '; ';
				}
				else {
					return '\n';
				}
			}

			//check spasi
			let spasi: boolean = this.checkSpasi(kata)
			if (spasi) {
				kata += ' ';
			}

			kata = this.spasiTab() + kata;

			return kata;
		}

		private static checkSpasi(kata: string): boolean {
			for (let i: number = 0; i < leksikal.kataCadangan.length; i++) {
				if (kata == leksikal.kataCadangan[i]) {
					if (kata == 'true') return false;
					if (kata == 'false') return false;
					return true;
				}
			}

			if (kata == ',') return true;

			return false;
		}

		private static getVarIsi(token: IToken, hasil: IToken[]): void {
			this.getToken(token, hasil, Kons.VAR_ISI);
		}

		private static getToken(tokenSumber: IToken, hasil: IToken[], namaToken: string): void {
			if (hasil.length > 0) {
				return;
			}

			if (tokenSumber.nama == namaToken) {
				hasil.push(tokenSumber);
				return;
			}

			for (let i: number = 0; i < tokenSumber.token.length; i++) {
				this.getToken(tokenSumber.token[i], hasil, namaToken);
			}
		}
	}
}
