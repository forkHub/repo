
namespace ha {
	export class B64 {
		readonly angka: string = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890+=`;
		readonly basis: number = 64;

		dec2b64(n: number): string {
			let sisaBagi: number = 0;
			let hasilBagi: number = 0;
			let hasil: string = '';

			sisaBagi = n % 64;
			hasilBagi = Math.floor(n / this.basis);
			hasil = this.angka.charAt(sisaBagi) + '';

			while (hasilBagi > this.basis) {
				sisaBagi = hasilBagi % this.basis;
				hasilBagi = Math.floor(hasilBagi / this.basis);
				hasil = this.angka.charAt(sisaBagi) + '' + hasil;
			}

			if (hasilBagi > 0) {
				hasil = this.angka.charAt(hasilBagi) + '' + hasil;
			}

			return hasil;
		}

		b642dec(ns: string): number {
			// let ns: string = n + '';
			let pj: number = ns.length;
			let hasil: number = 0;

			for (let i: number = 0; i < pj; i++) {
				let char: string = ns.charAt(i);
				let charN: number = this.angka.indexOf(char);

				charN = charN * (Math.pow(this.basis, pj - i - 1));
				// console.log('i ' + i + '/pow ' + (pj - i - 1) + '/charN ' + charN);

				hasil += charN;
			}

			return hasil;
		}

	}
}